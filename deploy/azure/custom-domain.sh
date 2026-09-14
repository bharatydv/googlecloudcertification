#!/usr/bin/env bash
#
# Bind googlecloudcertification.com (apex + www) to the Container App.
#
# Run it with no arguments to print the DNS records that must exist at the
# registrar, then run it again once they have propagated to do the binding:
#
#   bash deploy/azure/custom-domain.sh          # show records + check DNS
#   bash deploy/azure/custom-domain.sh --bind   # add hostnames, issue certs
#
# Safe to re-run: hostnames already bound are skipped.
#
# Why the apex needs an A record: DNS forbids a CNAME on a zone apex, so the
# apex points at the Container Apps environment's static inbound IP instead.
# That IP belongs to the environment, not the app — it survives revisions and
# redeploys, and only changes if the environment itself is deleted and
# recreated. www can use a CNAME, which needs no such care.

set -euo pipefail

cd "$(dirname "$0")/../.."
. deploy/azure/config.sh

APEX_DOMAIN="${APEX_DOMAIN:-googlecloudcertification.com}"
WWW_DOMAIN="www.${APEX_DOMAIN}"

BIND=0
[ "${1:-}" = "--bind" ] && BIND=1

if ! az_ account show >/dev/null 2>&1; then
  echo "Not signed in. Run: az login" >&2
  exit 1
fi

if [ -n "$SUBSCRIPTION_ID" ]; then
  az_ account set --subscription "$SUBSCRIPTION_ID"
fi

# ---------------------------------------------------------------------------
# The three values the DNS records are built from.
# ---------------------------------------------------------------------------
FQDN="$(az_ containerapp show -n "$APP" -g "$RESOURCE_GROUP" \
  --query properties.configuration.ingress.fqdn -o tsv | tr -d '\r')"
STATIC_IP="$(az_ containerapp env show -n "$CONTAINER_ENV" -g "$RESOURCE_GROUP" \
  --query properties.staticIp -o tsv | tr -d '\r')"
VERIFY_ID="$(az_ containerapp show -n "$APP" -g "$RESOURCE_GROUP" \
  --query properties.customDomainVerificationId -o tsv | tr -d '\r')"

if [ -z "$FQDN" ] || [ -z "$STATIC_IP" ] || [ -z "$VERIFY_ID" ]; then
  echo "Could not read app/environment details. Has deploy.sh been run?" >&2
  exit 1
fi

cat <<TXT

    DNS records to create at the registrar (GoDaddy, for this domain).
    Host values are written as most registrars want them: relative to the
    zone, with @ meaning the apex itself.

      Type   Host        Value
      ----   ----        -----
      A      @           ${STATIC_IP}
      TXT    asuid       ${VERIFY_ID}
      CNAME  www         ${FQDN}
      TXT    asuid.www   ${VERIFY_ID}

    A GoDaddy Website Builder site may be published to this domain. While it
    is connected, GoDaddy owns the @ A record and the www CNAME and will
    revert edits to them, so disconnect it first:

      My Products -> Websites + Marketing -> Settings -> Site Domain,
      and move it back to its free *.godaddysites.com subdomain.

    Then delete the leftover A record on @ and the CNAME on www before adding
    the records above — a leftover will keep answering alongside the new one.

TXT

# ---------------------------------------------------------------------------
# Pre-flight DNS check. Azure's own error when a record is missing is opaque,
# so check first and say exactly which record is not visible yet.
# ---------------------------------------------------------------------------
dns_lookup() {
  local type="$1" name="$2" server="$3"
  if command -v dig >/dev/null 2>&1; then
    dig +short "$type" "$name" "@${server}" 2>/dev/null | tr -d '"'
  else
    nslookup -type="$type" "$name" "$server" 2>/dev/null | tr -d '\r"'
  fi
}

# Ask the zone's own nameserver, not a public resolver.
#
# Public resolvers cache each record TYPE separately, so after the registrar
# publishes a change one type can still serve the old answer while another
# serves the new one — 8.8.8.8 reported this zone's www CNAME as unchanged for
# an hour while already resolving www to the new target. Gating the bind on
# that produces false "MISSING" verdicts for records that are in fact live.
# Azure validates against authoritative data, so that is what has to be right.
auth_ns() {
  if command -v dig >/dev/null 2>&1; then
    dig +short NS "$APEX_DOMAIN" @8.8.8.8 2>/dev/null | sed 's/\.$//' | head -1
  else
    nslookup -type=NS "$APEX_DOMAIN" 8.8.8.8 2>/dev/null | tr -d '\r' \
      | sed -n 's/.*nameserver = //p' | sed 's/\.$//' | head -1
  fi
}

READY=1
check() {
  local type="$1" name="$2" want="$3" label="$4"
  if dns_lookup "$type" "$name" "$NS" | grep -qF "$want"; then
    printf '    ok      %s\n' "$label"
  else
    printf '    MISSING %s\n' "$label"
    READY=0
  fi
}

NS="$(auth_ns)"
if [ -z "$NS" ]; then
  echo "Could not find the authoritative nameserver for ${APEX_DOMAIN}." >&2
  exit 1
fi

say "Checking DNS at ${NS} (authoritative)"
check A     "$APEX_DOMAIN"         "$STATIC_IP" "A     ${APEX_DOMAIN} -> ${STATIC_IP}"
check TXT   "asuid.${APEX_DOMAIN}" "$VERIFY_ID" "TXT   asuid.${APEX_DOMAIN}"
check CNAME "$WWW_DOMAIN"          "$FQDN"      "CNAME ${WWW_DOMAIN} -> ${FQDN}"
check TXT   "asuid.${WWW_DOMAIN}"  "$VERIFY_ID" "TXT   asuid.${WWW_DOMAIN}"

if [ "$READY" -eq 0 ]; then
  echo
  echo "Some records are missing at the nameserver. Create them, then re-run." >&2
  exit 1
fi

# Binding does not depend on this — Azure resolves authoritatively — but a
# stale public cache is why the site can keep serving the old page for a while
# after a successful bind, which otherwise looks like a failed deploy.
if ! dns_lookup A "$APEX_DOMAIN" 8.8.8.8 | grep -qF "$STATIC_IP"; then
  echo
  echo "    note: public resolvers still have the previous apex address cached."
  echo "          Binding works regardless; browsers follow once the TTL expires."
fi

if [ "$BIND" -eq 0 ]; then
  echo
  echo "DNS looks right. Bind with: bash deploy/azure/custom-domain.sh --bind"
  exit 0
fi

# ---------------------------------------------------------------------------
# Bind. The validation method is dictated by the record type, and Azure is
# strict about the pairing: an apex reached by an A record must use HTTP
# validation, a subdomain reached by a CNAME must use CNAME validation.
#
# Do not use TXT for the apex. The CLI accepts it and the certificate sits at
# provisioningState=Pending with error=None forever, because TXT validation
# waits on an ACME challenge record that this flow never publishes. The asuid
# TXT record proves domain ownership for `hostname add`; it is not what the
# certificate validates against.
#
# Each bind issues a free Azure-managed certificate and renews it
# automatically. HTTP validation needs the app publicly reachable on port 80
# from DigiCert's validators, which external ingress already satisfies.
# ---------------------------------------------------------------------------
bind_host() {
  local host="$1" method="$2" state

  # Two steps, in this order. `hostname bind` issues the managed certificate,
  # and the certificate cannot be created until the hostname already exists on
  # an app in the environment — doing only the bind fails with
  # RequireCustomHostnameInEnvironment. `hostname add` is what registers it.
  state="$(az_ containerapp hostname list -n "$APP" -g "$RESOURCE_GROUP"     --query "[?name=='${host}'].bindingType | [0]" -o tsv 2>/dev/null | tr -d '
')"

  if [ "$state" = "SniEnabled" ]; then
    echo "    ${host} already bound — skipping"
    return
  fi

  if [ -z "$state" ] || [ "$state" = "None" ]; then
    echo "    adding ${host}"
    az_ containerapp hostname add -n "$APP" -g "$RESOURCE_GROUP"       --hostname "$host" -o none
  fi

  echo "    binding ${host} (${method} validation)"
  az_ containerapp hostname bind -n "$APP" -g "$RESOURCE_GROUP"     --hostname "$host"     --environment "$CONTAINER_ENV"     --validation-method "$method"     -o none
}

say "Binding hostnames"
bind_host "$APEX_DOMAIN" HTTP
bind_host "$WWW_DOMAIN"  CNAME

# Certificate issuance is asynchronous — the bind returns before the managed
# cert is live, so the first https request can fail for a few minutes.
say "Verifying"
for host in "$APEX_DOMAIN" "$WWW_DOMAIN"; do
  # curl's own -w already prints 000 on a failed connection, so no fallback
  # echo here -- adding one concatenates and prints "000000".
  code="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 60 "https://${host}/" 2>/dev/null || true)"
  printf '    https://%s -> %s\n' "$host" "$code"
done

cat <<TXT

    If a request above returned 000 or a TLS error, the managed certificate is
    still being issued. Give it a few minutes and re-check:

      az containerapp hostname list -n ${APP} -g ${RESOURCE_GROUP} -o table

    www redirects to the apex in next.config.ts, so both names serve but only
    ${APEX_DOMAIN} is canonical.

TXT
