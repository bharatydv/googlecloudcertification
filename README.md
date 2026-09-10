This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deployment

Deploy scripts live in `deploy/`, one folder per cloud.

### Azure (Container Apps)

The app needs a Node.js server — four pages read `searchParams` on the server,
so a static export is not possible without refactoring them. Container Apps
runs that server and scales to zero when idle, so compute costs roughly
nothing at low traffic; the container registry is the only standing charge
(~$5/month on the Basic SKU).

```bash
az login                          # needs a browser, so run it yourself
bash deploy/azure/deploy.sh       # provision: RG, ACR, environment, app
bash deploy/azure/redeploy.sh     # ship a new commit
```

`deploy.sh` is idempotent — re-running it updates rather than duplicates.
Images are built in Azure by `az acr build`, so a local Docker daemon is not
required. Settings (region, sizing, replica counts) are in
`deploy/azure/config.sh` and can be overridden from the environment:

```bash
MIN_REPLICAS=1 bash deploy/azure/deploy.sh   # no cold starts, ~$10-15/month
```

Tear everything down with `az group delete -n gcpprep-rg`.

### Google Cloud (Compute Engine)

A single VM running the app under systemd behind nginx.

```bash
gcloud auth login
gcloud config set project <PROJECT_ID>
bash deploy/gcp/create-vm.sh
bash deploy/gcp/redeploy.sh
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
