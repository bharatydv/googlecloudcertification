#!/usr/bin/env bash
#
# Provision the Compute Engine VM that serves GCP Prep.
#
# Prerequisites (you run these — they need a browser):
#   gcloud auth login
#   gcloud config set project <PROJECT_ID>
#
# Then:
#   bash deploy/create-vm.sh
#
# Safe to re-run: every step checks for existing resources first.

set -euo pipefail

PROJECT="${PROJECT:-$(gcloud config get-value project 2>/dev/null)}"
ZONE="${ZONE:-asia-south1-a}"        # Mumbai. Change to suit your audience.
REGION="${REGION:-${ZONE%-*}}"
VM="${VM:-gcpprep-web}"
MACHINE="${MACHINE:-e2-small}"       # 2 GB RAM — e2-micro OOMs on next build
DISK_SIZE="${DISK_SIZE:-20GB}"
TAG="gcpprep-web"
ADDRESS="${VM}-ip"

say() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }

if [ -z "$PROJECT" ]; then
  echo "No project set. Run: gcloud config set project <PROJECT_ID>" >&2
  exit 1
fi

say "Project ${PROJECT} | zone ${ZONE} | machine ${MACHINE}"

say "Enabling Compute Engine API (no-op if already on)"
gcloud services enable compute.googleapis.com --project "$PROJECT"

# ---------------------------------------------------------------------------
# Static external IP. Reserved separately from the VM so the address survives
# the instance being deleted and recreated — otherwise every rebuild changes
# the IP and breaks your DNS A record.
# ---------------------------------------------------------------------------
say "Reserving static IP ${ADDRESS}"
if ! gcloud compute addresses describe "$ADDRESS" --region "$REGION" --project "$PROJECT" >/dev/null 2>&1; then
  gcloud compute addresses create "$ADDRESS" --region "$REGION" --project "$PROJECT"
fi
IP="$(gcloud compute addresses describe "$ADDRESS" --region "$REGION" --project "$PROJECT" --format='value(address)')"
echo "    address: ${IP}"

# ---------------------------------------------------------------------------
# Firewall. Scoped to the network tag so it applies only to this VM, not to
# everything in the project.
# ---------------------------------------------------------------------------
say "Firewall rule for HTTP/HTTPS"
if ! gcloud compute firewall-rules describe "allow-${TAG}" --project "$PROJECT" >/dev/null 2>&1; then
  gcloud compute firewall-rules create "allow-${TAG}" \
    --project "$PROJECT" \
    --allow tcp:80,tcp:443 \
    --target-tags "$TAG" \
    --description "HTTP/HTTPS to GCP Prep web instances"
fi

# ---------------------------------------------------------------------------
# The instance. No public SSH rule is created — use `gcloud compute ssh`,
# which goes through IAP/OS Login rather than opening port 22 to the world.
# ---------------------------------------------------------------------------
say "Creating instance ${VM}"
if gcloud compute instances describe "$VM" --zone "$ZONE" --project "$PROJECT" >/dev/null 2>&1; then
  echo "    already exists — skipping (use deploy/redeploy.sh to ship new code)"
else
  gcloud compute instances create "$VM" \
    --project "$PROJECT" \
    --zone "$ZONE" \
    --machine-type "$MACHINE" \
    --image-family debian-12 \
    --image-project debian-cloud \
    --boot-disk-size "$DISK_SIZE" \
    --boot-disk-type pd-balanced \
    --tags "$TAG" \
    --address "$IP" \
    --scopes "https://www.googleapis.com/auth/logging.write,https://www.googleapis.com/auth/monitoring.write" \
    --metadata-from-file "startup-script=$(dirname "$0")/startup-script.sh"
fi

cat <<EOF

==> Instance created. The startup script is now installing Node, cloning the
    repo and building — that takes roughly 4-6 minutes on ${MACHINE}.

    Watch progress:
      gcloud compute instances get-serial-port-output ${VM} --zone ${ZONE} | grep startup

    Then open:
      http://${IP}

    Point DNS at it:
      A  @    ${IP}
      A  www  ${IP}

    Once DNS resolves, add TLS:
      gcloud compute ssh ${VM} --zone ${ZONE} --command \\
        'sudo apt-get install -y certbot python3-certbot-nginx && \\
         sudo certbot --nginx -d googlecloudcertification.com -d www.googlecloudcertification.com'

EOF
