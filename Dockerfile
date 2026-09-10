# syntax=docker/dockerfile:1
#
# Production image for GCP Prep, built for Azure Container Apps.
#
# Three stages so the runtime layer carries neither the build toolchain nor the
# dev dependencies: only the standalone server output and the static assets.
# Built remotely by `az acr build`, so no local Docker daemon is required.

# ---------------------------------------------------------------------------
# Dependencies. Split from the build stage so `npm ci` is cached and only
# re-runs when package-lock.json actually changes.
# ---------------------------------------------------------------------------
FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------
FROM node:22-bookworm-slim AS builder
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------------------------------------------------------------------------
# Runtime
# ---------------------------------------------------------------------------
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
# Bind to all interfaces — Container Apps' ingress reaches the container over
# the pod network, so 127.0.0.1 would be unreachable.
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

# `output: standalone` deliberately omits public/ and .next/static — they are
# meant to be CDN-hosted. There is no CDN in front of this, so copy them in and
# let server.js serve them.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
