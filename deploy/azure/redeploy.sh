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

SUBSCRIPTION="$(az_ account show --query id -o tsv | tr -d '\r')"
if [ -z "$ACR" ]; then
  ACR="gcpprep$(echo "$SUBSCRIPTION" | tr -d '-' | cut -c1-12)"
fi

TAG="$(git rev-parse --short HEAD 2>/dev/null || date +%s)"
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  # The build context is the working tree, not the commit — say so, otherwise
  # the image tag implies a clean checkout it does not contain.
  echo "note: working tree has uncommitted changes; they are included in ${TAG}"
fi

say "Building ${IMAGE_NAME}:${TAG}"
az_ acr build --registry "$ACR" --image "${IMAGE_NAME}:${TAG}" --image "${IMAGE_NAME}:latest" .

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
