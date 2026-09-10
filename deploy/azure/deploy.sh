#!/usr/bin/env bash
#
# Provision GCP Prep on Azure Container Apps.
#
# Why Container Apps: the app needs a Node server (four pages read
# `searchParams` on the server, so a static export is not an option), and
# Container Apps is the only Azure runtime that can serve it for ~nothing —
# it scales to zero when idle, and the monthly free grant covers roughly 100
# hours of active compute. The only standing cost is the container registry,
# about $5/month on the Basic SKU.
#
# Prerequisites (you run this — it needs a browser):
#   az login
#
# Then:
#   bash deploy/azure/deploy.sh
#
# Safe to re-run: every step checks for existing resources first. To ship new
# code to an already-provisioned app, use deploy/azure/redeploy.sh instead.

set -euo pipefail

cd "$(dirname "$0")/../.."
. deploy/azure/config.sh

TAG="$(git rev-parse --short HEAD 2>/dev/null || date +%s)"

# ---------------------------------------------------------------------------
# Account
# ---------------------------------------------------------------------------
if ! az_ account show >/dev/null 2>&1; then
  echo "Not signed in. Run: az login" >&2
  exit 1
fi

SUBSCRIPTION="$(az_ account show --query id -o tsv | tr -d '\r')"
SUB_NAME="$(az_ account show --query name -o tsv | tr -d '\r')"

# ACR names must be globally unique; derive a stable one from the subscription
# so re-running picks the same registry rather than creating a second.
if [ -z "$ACR" ]; then
  ACR="gcpprep$(echo "$SUBSCRIPTION" | tr -d '-' | cut -c1-12)"
fi

say "Subscription ${SUB_NAME} | location ${LOCATION} | registry ${ACR}"

# ---------------------------------------------------------------------------
# The containerapp commands live in an extension on some CLI builds and are
# built in on others. Adding it is a no-op when it is already present.
# ---------------------------------------------------------------------------
say "Ensuring containerapp CLI support"
az_ extension add --name containerapp --upgrade --allow-preview false >/dev/null 2>&1 || true

say "Registering resource providers (no-op if already registered)"
az_ provider register --namespace Microsoft.App --wait
az_ provider register --namespace Microsoft.OperationalInsights --wait
az_ provider register --namespace Microsoft.ContainerRegistry --wait

# ---------------------------------------------------------------------------
# Resource group — one container for everything, so teardown is a single
# `az group delete -n gcpprep-rg`.
# ---------------------------------------------------------------------------
say "Resource group ${RESOURCE_GROUP}"
if ! az_ group show -n "$RESOURCE_GROUP" >/dev/null 2>&1; then
  az_ group create -n "$RESOURCE_GROUP" -l "$LOCATION" -o none
fi

# ---------------------------------------------------------------------------
# Container registry. Admin credentials are enabled so the Container App can
# pull without a role assignment — role propagation is eventually consistent
# and makes first deploys fail intermittently. The registry is private to this
# subscription; rotate with `az acr credential renew` if that ever matters.
# ---------------------------------------------------------------------------
say "Container registry ${ACR}"
if ! az_ acr show -n "$ACR" -g "$RESOURCE_GROUP" >/dev/null 2>&1; then
  az_ acr create -n "$ACR" -g "$RESOURCE_GROUP" -l "$LOCATION" \
    --sku Basic --admin-enabled true -o none
fi

# ---------------------------------------------------------------------------
# Build. `az acr build` uploads the context and builds in Azure, so no local
# Docker daemon is needed — and the build runs on a machine larger than the
# e2-small that needed a swapfile on GCP.
# ---------------------------------------------------------------------------
say "Building image ${IMAGE_NAME}:${TAG} in ACR"
az_ acr build --registry "$ACR" --image "${IMAGE_NAME}:${TAG}" --image "${IMAGE_NAME}:latest" .

ACR_SERVER="$(az_ acr show -n "$ACR" -g "$RESOURCE_GROUP" --query loginServer -o tsv | tr -d '\r')"
ACR_USER="$(az_ acr credential show -n "$ACR" -g "$RESOURCE_GROUP" --query username -o tsv | tr -d '\r')"
ACR_PASS="$(az_ acr credential show -n "$ACR" -g "$RESOURCE_GROUP" --query 'passwords[0].value' -o tsv | tr -d '\r')"

# ---------------------------------------------------------------------------
# Container Apps environment — the shared network/logging boundary the app
# runs inside. Consumption workload profile: billed per second of active use.
# ---------------------------------------------------------------------------
say "Container Apps environment ${CONTAINER_ENV}"
if ! az_ containerapp env show -n "$CONTAINER_ENV" -g "$RESOURCE_GROUP" >/dev/null 2>&1; then
  az_ containerapp env create -n "$CONTAINER_ENV" -g "$RESOURCE_GROUP" -l "$LOCATION" -o none
fi

# ---------------------------------------------------------------------------
# The app itself
# ---------------------------------------------------------------------------
say "Container app ${APP}"
if az_ containerapp show -n "$APP" -g "$RESOURCE_GROUP" >/dev/null 2>&1; then
  echo "    already exists — updating to ${TAG}"
  az_ containerapp update -n "$APP" -g "$RESOURCE_GROUP" \
    --image "${ACR_SERVER}/${IMAGE_NAME}:${TAG}" -o none
else
  az_ containerapp create -n "$APP" -g "$RESOURCE_GROUP" \
    --environment "$CONTAINER_ENV" \
    --image "${ACR_SERVER}/${IMAGE_NAME}:${TAG}" \
    --registry-server "$ACR_SERVER" \
    --registry-username "$ACR_USER" \
    --registry-password "$ACR_PASS" \
    --target-port "$PORT" \
    --ingress external \
    --cpu "$CPU" --memory "$MEMORY" \
    --min-replicas "$MIN_REPLICAS" --max-replicas "$MAX_REPLICAS" \
    --env-vars NODE_ENV=production \
    -o none
fi

FQDN="$(az_ containerapp show -n "$APP" -g "$RESOURCE_GROUP" \
  --query properties.configuration.ingress.fqdn -o tsv | tr -d '\r')"

say "Live at https://${FQDN}"

cat <<TXT

    Health check:
      curl -sI https://${FQDN} | head -1

    Logs:
      az containerapp logs show -n ${APP} -g ${RESOURCE_GROUP} --follow

    Ship new code:
      bash deploy/azure/redeploy.sh

    Custom domain (googlecloudcertification.com). Add these DNS records first,
    then bind — Azure validates ownership via the TXT record:

      CNAME  www   ${FQDN}
      TXT    asuid.www   <value from the command below>

      az containerapp hostname add -n ${APP} -g ${RESOURCE_GROUP} \
        --hostname www.googlecloudcertification.com
      az containerapp ssl upload --help   # or, for a free managed cert:
      az containerapp hostname bind -n ${APP} -g ${RESOURCE_GROUP} \
        --hostname www.googlecloudcertification.com \
        --environment ${CONTAINER_ENV} --validation-method CNAME

    An apex record (googlecloudcertification.com) cannot be a CNAME. Either
    use Azure DNS with an alias record, or redirect apex -> www at your
    registrar.

    Cost: compute is \$0 while idle (min-replicas=${MIN_REPLICAS}) and the monthly
    free grant covers ~100h of active serving. The registry is ~\$5/month.
    Tear the whole thing down with:
      az group delete -n ${RESOURCE_GROUP}

TXT
