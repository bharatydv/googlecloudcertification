#!/usr/bin/env bash
#
# Compute Engine startup script for GCP Prep.
#
# Runs as root on every boot. It is idempotent: re-running it re-clones the
# repo and rebuilds, so `gcloud compute instances reset` is a valid way to
# redeploy the latest commit.
#
# Log output goes to the serial console and /var/log/syslog:
#   gcloud compute instances get-serial-port-output <vm> --zone <zone>

set -euo pipefail

REPO="https://github.com/bharatydv/googlecloudcertification.git"
BRANCH="master"
APP_DIR="/opt/gcpprep"
APP_USER="gcpprep"
NODE_MAJOR="22"
PORT="3000"

log() { echo "[startup] $(date -Is) $*"; }

# ---------------------------------------------------------------------------
# Swap. `next build` peaks well above 1 GB; without swap it is OOM-killed on
# the smaller e2 machine types and the whole deploy fails silently.
# ---------------------------------------------------------------------------
if [ ! -f /swapfile ]; then
  log "creating 2G swapfile"
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >>/etc/fstab
fi

# ---------------------------------------------------------------------------
# Packages
# ---------------------------------------------------------------------------
log "installing packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y --no-install-recommends curl git ca-certificates nginx

if ! command -v node >/dev/null 2>&1; then
  log "installing Node ${NODE_MAJOR}"
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi
log "node $(node -v), npm $(npm -v)"

# ---------------------------------------------------------------------------
# Application user — the service must not run as root.
# ---------------------------------------------------------------------------
if ! id -u "$APP_USER" >/dev/null 2>&1; then
  useradd --system --create-home --shell /usr/sbin/nologin "$APP_USER"
fi

# ---------------------------------------------------------------------------
# Source + build
# ---------------------------------------------------------------------------
log "cloning ${BRANCH}"
rm -rf "$APP_DIR"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$APP_DIR"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

log "installing dependencies"
cd "$APP_DIR"
sudo -u "$APP_USER" npm ci --no-audit --no-fund

log "building"
sudo -u "$APP_USER" env NODE_ENV=production npm run build

# ---------------------------------------------------------------------------
# systemd service
# ---------------------------------------------------------------------------
log "writing systemd unit"
cat >/etc/systemd/system/gcpprep.service <<UNIT
[Unit]
Description=GCP Prep (Next.js)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=${APP_USER}
WorkingDirectory=${APP_DIR}
Environment=NODE_ENV=production
Environment=PORT=${PORT}
Environment=HOSTNAME=127.0.0.1
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=5

# Hardening — the app needs no write access outside its own tree.
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=true
ReadWritePaths=${APP_DIR}

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable gcpprep
systemctl restart gcpprep

# ---------------------------------------------------------------------------
# nginx reverse proxy. Terminates :80 and forwards to Next on 127.0.0.1:3000,
# so the Node process is never exposed directly.
# ---------------------------------------------------------------------------
log "configuring nginx"
cat >/etc/nginx/sites-available/gcpprep <<'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    # Next emits immutable, content-hashed asset filenames.
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/gcpprep /etc/nginx/sites-enabled/gcpprep
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl reload nginx || systemctl restart nginx

log "deploy complete — listening on :80"
