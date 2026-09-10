#!/usr/bin/env bash
#
# Ship the latest commit to the running VM.
#
# Pulls, reinstalls, rebuilds and restarts in place. Faster than recreating the
# instance, and the build happens before the restart so a failed build leaves
# the current version serving.
#
#   bash deploy/redeploy.sh

set -euo pipefail

PROJECT="${PROJECT:-$(gcloud config get-value project 2>/dev/null)}"
ZONE="${ZONE:-asia-south1-a}"
VM="${VM:-gcpprep-web}"
APP_DIR="/opt/gcpprep"
APP_USER="gcpprep"

echo "==> Redeploying ${VM} (${ZONE})"

gcloud compute ssh "$VM" --zone "$ZONE" --project "$PROJECT" --command "
  set -euo pipefail
  cd ${APP_DIR}
  echo '--> fetching'
  sudo -u ${APP_USER} git fetch --depth 1 origin master
  sudo -u ${APP_USER} git reset --hard origin/master
  echo '--> installing'
  sudo -u ${APP_USER} npm ci --no-audit --no-fund
  echo '--> building'
  sudo -u ${APP_USER} env NODE_ENV=production npm run build
  echo '--> restarting'
  sudo systemctl restart gcpprep
  sleep 3
  sudo systemctl is-active gcpprep
  curl -sS -o /dev/null -w 'local health: %{http_code}\n' http://127.0.0.1:3000/
"

echo "==> Done"
