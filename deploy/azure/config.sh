#!/usr/bin/env bash
#
# Shared settings for the Azure deployment. Sourced by deploy.sh and
# redeploy.sh; every value can be overridden from the environment, e.g.
#
#   LOCATION=westeurope bash deploy/azure/deploy.sh

# centralindia (Pune) is the closest region to the GCP deployment's
# asia-south1. Container Apps is available there.
LOCATION="${LOCATION:-centralindia}"

# Which subscription to deploy into. Leave empty to use whichever one the CLI
# has active. Set it when the account has several — this account has two named
# "Azure subscription 1", and the active one is not necessarily the intended
# one, so pinning the id is the only way to be sure of what gets billed.
SUBSCRIPTION_ID="${SUBSCRIPTION_ID:-}"

RESOURCE_GROUP="${RESOURCE_GROUP:-gcpprep-rg}"
CONTAINER_ENV="${CONTAINER_ENV:-gcpprep-env}"
APP="${APP:-gcpprep-web}"
IMAGE_NAME="${IMAGE_NAME:-gcpprep}"

# ACR names are global, alphanumeric only, and must be unique across Azure —
# so a suffix is appended from the subscription id on first run. Set ACR
# explicitly to pin your own name.
ACR="${ACR:-}"

# Sized for a content site. 0.5 vCPU / 1 GiB is the smallest pairing Container
# Apps accepts and is ample for serving prerendered pages.
CPU="${CPU:-0.5}"
MEMORY="${MEMORY:-1.0Gi}"

# Scale to zero when idle — this is what keeps the bill at roughly nothing.
# The cost is a cold start (a few seconds) on the first request after a quiet
# period. Set MIN_REPLICAS=1 to trade ~$10-15/month for no cold starts.
MIN_REPLICAS="${MIN_REPLICAS:-0}"
MAX_REPLICAS="${MAX_REPLICAS:-3}"

PORT="${PORT:-3000}"

# Resolve the Azure CLI. The Windows installer does not reliably put az on PATH
# for non-login shells, so fall back to the known install locations.
#
# Test with -f, not -x: the installer ships wbin/az.cmd as mode 644, so an
# executable-bit test rejects a perfectly working CLI. The extensionless `az`
# in the same directory is the sh wrapper and is preferred here.
AZ=""
if command -v az >/dev/null 2>&1; then
  AZ="az"
else
  for _candidate in     "/c/Program Files/Microsoft SDKs/Azure/CLI2/wbin/az"     "/c/Program Files (x86)/Microsoft SDKs/Azure/CLI2/wbin/az"     "/c/Program Files/Microsoft SDKs/Azure/CLI2/wbin/az.cmd"     "/c/Program Files (x86)/Microsoft SDKs/Azure/CLI2/wbin/az.cmd"
  do
    if [ -f "$_candidate" ]; then
      AZ="$_candidate"
      break
    fi
  done
fi

if [ -z "$AZ" ]; then
  echo "Azure CLI not found. Install it: https://aka.ms/installazurecli" >&2
  exit 1
fi

az_() { "$AZ" "$@"; }

say() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
