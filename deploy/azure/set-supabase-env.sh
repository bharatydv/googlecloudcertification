#!/usr/bin/env bash
#
# Switch accounts on (or rotate the key) for the running Container App.
#
# The site deploys and runs perfectly well without this — every guide, topic
# and practice question works signed out, with progress kept in the browser.
# Run this once you have a Supabase project and want sign-in and cross-device
# progress sync.
#
#   SUPABASE_URL=https://xxxx.supabase.co \
#   SUPABASE_ANON_KEY=eyJhbGci... \
#   bash deploy/azure/set-supabase-env.sh
#
# Before running, apply supabase/schema.sql in the Supabase SQL editor, and set
# the redirect URLs under Authentication -> URL Configuration:
#
#   Site URL:      https://googlecloudcertification.com
#   Redirect URLs: https://googlecloudcertification.com/auth/callback
#                  http://localhost:3000/auth/callback
#
# Updating env vars creates a new revision, so the change rolls out the same
# way a deploy does — the previous revision keeps serving until the new one
# passes its health probe.

set -euo pipefail

cd "$(dirname "$0")/../.."
. deploy/azure/config.sh

if [ -z "${SUPABASE_URL}" ] || [ -z "${SUPABASE_ANON_KEY}" ]; then
  echo "Set SUPABASE_URL and SUPABASE_ANON_KEY. See the header of this file." >&2
  exit 1
fi

if ! az_ account show >/dev/null 2>&1; then
  echo "Not signed in. Run: az login" >&2
  exit 1
fi

if [ -n "$SUBSCRIPTION_ID" ]; then
  az_ account set --subscription "$SUBSCRIPTION_ID"
fi

if ! az_ containerapp show -n "$APP" -g "$RESOURCE_GROUP" >/dev/null 2>&1; then
  echo "Container app ${APP} not found. Run deploy/azure/deploy.sh first." >&2
  exit 1
fi

apply_supabase_env

FQDN="$(az_ containerapp show -n "$APP" -g "$RESOURCE_GROUP" \
  --query properties.configuration.ingress.fqdn -o tsv | tr -d '\r')"

say "Verifying"
# Reports what the app itself thinks, which is the only answer that matters.
curl -sS --max-time 60 "https://${FQDN}/api/auth/session"
echo

cat <<TXT

    "configured":true  -> accounts are live; try https://${FQDN}/signup
    "configured":false -> the app is not seeing the variables; check
                          az containerapp show -n ${APP} -g ${RESOURCE_GROUP} \
                            --query properties.template.containers[0].env

TXT
