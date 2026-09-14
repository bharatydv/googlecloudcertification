#!/usr/bin/env bash
#
# Ship the current commit to the running Container App.
#
# Builds a new image tagged with the git SHA and points the app at it. Container
# Apps creates a new revision and shifts traffic once it passes its health
# probe, so a broken build leaves the previous revision serving.
#
#   bash deploy/azure/redeploy.sh

set -euo pipefail

cd "$(dirname "$0")/../.."
. deploy/azure/config.sh

if ! az_ account show >/dev/null 2>&1; then
  echo "Not signed in. Run: az login" >&2
  exit 1
fi

if [ -n "$SUBSCRIPTION_ID" ]; then
  az_ account set --subscription "$SUBSCRIPTION_ID"
fi

SUBSCRIPTION="$(az_ account show --query id -o tsv | tr -d '\r')"
if [ -z "$ACR" ]; then
  ACR="gcpprep$(echo "$SUBSCRIPTION" | tr -d '-' | cut -c1-12)"
fi

TAG="$(git rev-parse --short HEAD 2>/dev/null || date +%s)"
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  # The build context is the working tree, not the commit, so the commit SHA
  # alone is the wrong tag twice over. It claims a clean checkout the image
  # does not contain — and worse, the app is usually already running that exact
  # tag, and `containerapp update` creates no new revision when the image
  # string is unchanged. The build then overwrites the tag in the registry, the
  # rollout reports success, and the previous code keeps serving with nothing
  # anywhere saying so. A unique suffix forces a real revision.
  TAG="${TAG}-dirty-$(date +%s)"
  echo "note: uncommitted changes are included; tagging ${TAG}"
fi

acr_build

ACR_SERVER="$(az_ acr show -n "$ACR" -g "$RESOURCE_GROUP" --query loginServer -o tsv | tr -d '\r')"

say "Rolling out to ${APP}"
az_ containerapp update -n "$APP" -g "$RESOURCE_GROUP" \
  --image "${ACR_SERVER}/${IMAGE_NAME}:${TAG}" -o none

FQDN="$(az_ containerapp show -n "$APP" -g "$RESOURCE_GROUP" \
  --query properties.configuration.ingress.fqdn -o tsv | tr -d '\r')"

say "Verifying"
# min-replicas=0 means this request may also be paying for a cold start.
CODE="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 60 "https://${FQDN}/" || echo failed)"
echo "    https://${FQDN} -> ${CODE}"

if [ "$CODE" != "200" ]; then
  echo "    not healthy — check: az containerapp logs show -n ${APP} -g ${RESOURCE_GROUP}" >&2
  exit 1
fi

say "Done"
