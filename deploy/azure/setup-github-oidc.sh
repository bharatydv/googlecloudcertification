#!/usr/bin/env bash
#
# One-time setup so GitHub Actions can deploy to Azure without a stored secret.
#
# Creates an Entra app registration, lets it prove its identity with a
# federated credential pinned to this repo and branch, grants it Contributor
# on the resource group only, and writes the (non-secret) identifiers into the
# repo's Actions secrets.
#
# Why this cannot run with the credentials already on this machine: the CLI
# here is signed in as a service principal with no Microsoft Graph permissions,
# so it cannot create an app registration. Sign in as yourself first:
#
#   az login                              # your own account, in a browser
#   bash deploy/azure/setup-github-oidc.sh
#
# Safe to re-run: every step checks for what it is about to create.

set -euo pipefail

cd "$(dirname "$0")/../.."
. deploy/azure/config.sh

REPO="${REPO:-bharatydv/googlecloudcertification}"
BRANCH="${BRANCH:-master}"
APP_REG="${APP_REG:-gcpprep-github-deploy}"

if ! az account show >/dev/null 2>&1; then
  echo "Not signed in. Run: az login" >&2
  exit 1
fi

# A service principal login cannot create app registrations, and the failure
# it produces ("Insufficient privileges") does not say why. Catch it here.
ACCT_TYPE="$(az account show --query user.type -o tsv | tr -d '\r')"
if [ "$ACCT_TYPE" != "user" ]; then
  echo "Signed in as a ${ACCT_TYPE}, which cannot create app registrations." >&2
  echo "Run 'az login' with your own account and try again." >&2
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "The GitHub CLI (gh) is required to set the repo secrets." >&2
  exit 1
fi

SUBSCRIPTION="$(az account show --query id -o tsv | tr -d '\r')"
TENANT="$(az account show --query tenantId -o tsv | tr -d '\r')"

if [ -z "$ACR" ]; then
  ACR="$(az acr list -g "$RESOURCE_GROUP" --query '[0].name' -o tsv | tr -d '\r')"
fi

say "Repo ${REPO} | branch ${BRANCH} | resource group ${RESOURCE_GROUP}"

# ---------------------------------------------------------------------------
# App registration + its service principal
# ---------------------------------------------------------------------------
say "App registration ${APP_REG}"
CLIENT_ID="$(az ad app list --display-name "$APP_REG" --query '[0].appId' -o tsv | tr -d '\r')"
if [ -z "$CLIENT_ID" ]; then
  CLIENT_ID="$(az ad app create --display-name "$APP_REG" --query appId -o tsv | tr -d '\r')"
  echo "    created ${CLIENT_ID}"
else
  echo "    exists ${CLIENT_ID}"
fi

if ! az ad sp show --id "$CLIENT_ID" >/dev/null 2>&1; then
  az ad sp create --id "$CLIENT_ID" -o none
fi

# ---------------------------------------------------------------------------
# Federated credential. This is what replaces a client secret: GitHub signs a
# token describing the workflow, and Entra accepts it only when the subject
# matches exactly — this repo, this branch. A token minted for any other repo,
# branch or a fork's pull request will not be accepted.
# ---------------------------------------------------------------------------
say "Federated credential"
SUBJECT="repo:${REPO}:ref:refs/heads/${BRANCH}"
if az ad app federated-credential list --id "$CLIENT_ID" \
     --query "[?subject=='${SUBJECT}'] | [0].id" -o tsv 2>/dev/null | grep -q .; then
  echo "    already present for ${SUBJECT}"
else
  az ad app federated-credential create --id "$CLIENT_ID" --parameters "{
    \"name\": \"github-${BRANCH}\",
    \"issuer\": \"https://token.actions.githubusercontent.com\",
    \"subject\": \"${SUBJECT}\",
    \"audiences\": [\"api://AzureADTokenExchange\"]
  }" -o none
  echo "    created for ${SUBJECT}"
fi

# ---------------------------------------------------------------------------
# Permissions. Scoped to the resource group, not the subscription: the deploy
# only ever builds in this ACR and updates this container app.
# ---------------------------------------------------------------------------
say "Role assignment"
SCOPE="/subscriptions/${SUBSCRIPTION}/resourceGroups/${RESOURCE_GROUP}"
if az role assignment list --assignee "$CLIENT_ID" --scope "$SCOPE" \
     --query "[?roleDefinitionName=='Contributor'] | [0].id" -o tsv 2>/dev/null | grep -q .; then
  echo "    Contributor already granted on ${RESOURCE_GROUP}"
else
  # The SP can take a moment to become visible to the RBAC service after
  # creation, so allow a few retries rather than failing the whole script.
  for i in 1 2 3 4 5; do
    if az role assignment create --assignee "$CLIENT_ID" \
         --role Contributor --scope "$SCOPE" -o none 2>/dev/null; then
      echo "    granted Contributor on ${RESOURCE_GROUP}"
      break
    fi
    [ "$i" = 5 ] && { echo "    could not grant role" >&2; exit 1; }
    sleep 10
  done
fi

# ---------------------------------------------------------------------------
# Hand the identifiers to GitHub. None of these are credentials — the trust is
# the federated credential above — but they are stored as secrets to keep the
# subscription and tenant ids out of public workflow logs.
# ---------------------------------------------------------------------------
say "Writing repo secrets"
gh secret set AZURE_CLIENT_ID       --repo "$REPO" --body "$CLIENT_ID"
gh secret set AZURE_TENANT_ID       --repo "$REPO" --body "$TENANT"
gh secret set AZURE_SUBSCRIPTION_ID --repo "$REPO" --body "$SUBSCRIPTION"
gh secret set AZURE_ACR             --repo "$REPO" --body "$ACR"
echo "    AZURE_CLIENT_ID / AZURE_TENANT_ID / AZURE_SUBSCRIPTION_ID / AZURE_ACR"

cat <<TXT

    Done. Push to ${BRANCH} (or merge a PR into it) and .github/workflows/
    deploy.yml will build in ACR and roll out.

    Watch a run with:
      gh run watch --repo ${REPO}

TXT
