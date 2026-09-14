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

# Supabase — backs accounts and synced study progress. Leave both empty and the
# site deploys exactly as before: everything works, signed out, with progress in
# the browser. Find these under Project Settings -> API in the Supabase
# dashboard ("Project URL" and the "anon public" key).
#
# Not NEXT_PUBLIC_*, deliberately: Next bakes public vars into the bundle at
# build time, so changing one would mean rebuilding the image. Nothing in this
# app talks to Supabase from the browser, so they are read at runtime instead
# and one image works in every environment.
SUPABASE_URL="${SUPABASE_URL:-}"
SUPABASE_ANON_KEY="${SUPABASE_ANON_KEY:-}"

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

az_() { PYTHONIOENCODING=utf-8 PYTHONUTF8=1 "$AZ" "$@"; }

say() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }

# Build IMAGE_NAME:TAG in ACR, without streaming the remote build log.
#
# `az acr build` normally streams that log to the console. The Next.js build
# prints U+25B2 (the ▲ in its banner) and on Windows the CLI pushes the stream
# through colorama to a cp1252 console, which has no encoding for that
# character — so the log handler raises UnicodeEncodeError and aborts the
# command while the build is still running in Azure. The traceback names
# colorama and never mentions encodings, and PYTHONIOENCODING does not help,
# because the console wrapper has already bound the original encoding.
#
# Queueing with --no-logs removes the stream entirely, so the outcome comes
# from the run status rather than from parsed output. Logs are fetched only on
# failure, which is the only time they are wanted anyway.
acr_build() {
  local run_id status waited=0

  say "Building ${IMAGE_NAME}:${TAG} in ACR"
  run_id="$(az_ acr build --registry "$ACR" \
    --image "${IMAGE_NAME}:${TAG}" \
    --image "${IMAGE_NAME}:latest" \
    --no-logs --query runId -o tsv . | tr -d '\r')"

  if [ -z "$run_id" ]; then
    echo "Could not queue the ACR build." >&2
    return 1
  fi
  echo "    run ${run_id}"

  # Poll rather than block silently: a cold build agent plus a Next build runs
  # several minutes, and a silent wait that long looks like a hang.
  while :; do
    status="$(az_ acr task show-run -r "$ACR" --run-id "$run_id" \
      --query status -o tsv 2>/dev/null | tr -d '\r')"

    case "$status" in
      Succeeded)
        echo "    build succeeded after ${waited}s"
        return 0
        ;;
      Failed|Canceled|Error|Timeout)
        echo "    build ${status}. Last log lines:" >&2
        # Best effort: this reuses the streaming path that can hit the encoding
        # bug, so never let it mask the build failure it is reporting on.
        az_ acr task logs -r "$ACR" --run-id "$run_id" 2>/dev/null | tail -30 >&2 || true
        echo "    full log: az acr task logs -r ${ACR} --run-id ${run_id}" >&2
        return 1
        ;;
    esac

    if [ "$waited" -ge 1800 ]; then
      echo "    build still ${status:-unknown} after 30m; giving up waiting." >&2
      return 1
    fi
    sleep 10
    waited=$((waited + 10))
  done
}

# Push the Supabase settings onto the running app.
#
# The anon key goes in as a Container Apps secret rather than a plain env var.
# It is a public, RLS-constrained key rather than a true secret, but a secret
# reference keeps it out of `az containerapp show` output and out of the
# revision history, which is where credentials get copied from by accident.
apply_supabase_env() {
  if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ]; then
    echo "    Supabase not set — accounts stay switched off (the site works without them)."
    return 0
  fi

  say "Configuring Supabase on ${APP}"
  az_ containerapp secret set -n "$APP" -g "$RESOURCE_GROUP"     --secrets "supabase-anon-key=${SUPABASE_ANON_KEY}" -o none

  # --set-env-vars merges; --replace-env-vars would drop NODE_ENV.
  az_ containerapp update -n "$APP" -g "$RESOURCE_GROUP"     --set-env-vars "SUPABASE_URL=${SUPABASE_URL}"                    "SUPABASE_ANON_KEY=secretref:supabase-anon-key" -o none
  echo "    accounts enabled"
}
