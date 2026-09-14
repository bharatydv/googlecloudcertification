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

## Accounts and progress sync

Accounts are **optional everywhere**. With no Supabase credentials configured
the site runs exactly as it did before they existed: every guide, learning
topic and practice question works signed out, and study progress is kept in the
browser. The sign-in pages say so plainly rather than showing a form that
cannot work, and `GET /api/auth/session` reports `{"configured": false}`.

Switching them on adds email/password and Google sign-in, and mirrors a
learner's roadmap steps, read topics, bookmarks, attempt history and active
days to their account so it follows them between devices.

### Setting it up

1. Create a project at [supabase.com](https://supabase.com) (the free tier is
   enough).
2. In the SQL Editor, paste and run [`supabase/schema.sql`](supabase/schema.sql).
   It creates the one table this app uses and the row level security policies
   that keep each learner's progress to themselves.
3. Under **Authentication -> URL Configuration**, set:

   - Site URL: `https://googlecloudcertification.com`
   - Redirect URLs: `https://googlecloudcertification.com/auth/callback`
     and `http://localhost:3000/auth/callback`

4. For Google sign-in, enable the Google provider under
   **Authentication -> Providers** and give it an OAuth client from the Google
   Cloud console. Skip this and the rest still works — the button simply
   returns an error if pressed.
5. Locally, `cp .env.example .env.local` and fill in the two values from
   **Project Settings -> API**.
6. In production, `bash deploy/azure/set-supabase-env.sh` with the same two
   values exported. It stores the key as a Container Apps secret and rolls out
   a new revision.

Only two variables are ever needed, and neither is `NEXT_PUBLIC_`:

| Variable | Where it comes from |
| --- | --- |
| `SUPABASE_URL` | Project Settings -> API -> Project URL |
| `SUPABASE_ANON_KEY` | Project Settings -> API -> `anon` `public` key |

The `service_role` key is **not used anywhere in this app** and must never be
added. Every query runs as the signed-in user with the anon key, which is what
makes the row level security policies meaningful rather than decorative.

### How it fits together

Nothing talks to Supabase from the browser. Sign-in, sign-up, sign-out and the
progress read/write are all Server Actions or Route Handlers, which is why the
credentials can stay server-side and be read at runtime — one image works in
every environment, and rotating a key does not mean rebuilding it.

- `src/proxy.ts` refreshes the session cookie. It skips the work entirely for
  requests with no Supabase cookie, so anonymous traffic — which is nearly all
  of it — never pays for a token refresh.
- `src/lib/auth/dal.ts` is the only place that answers "who is calling".
- `src/lib/progress.ts` is unchanged in character: localStorage is still the
  working copy, so the UI never waits on the network.
  `src/lib/progress-sync.ts` layers the mirroring on top.
- Local and remote progress are **merged, not overwritten** — see
  `mergeProgress` in `src/lib/progress-state.ts`. Someone who studies signed
  out and then creates an account keeps that work.
- Content pages stay statically generated. The header reads the session from
  the browser precisely so that reading it does not make every page dynamic.

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

#### Custom domain

The site is served at `googlecloudcertification.com`. DNS lives at GoDaddy, so
the records are created by hand there; the script prints exactly what to add,
checks the records have propagated, then binds the hostnames and issues free
Azure-managed certificates.

One GoDaddy-specific step comes first: a Website Builder site was published to
this domain, and while it is connected GoDaddy owns the apex `A` record and the
`www` `CNAME` and reverts edits to them. Disconnect it under Websites +
Marketing -> Settings -> Site Domain before touching DNS.

```bash
bash deploy/azure/custom-domain.sh          # print records, check DNS
bash deploy/azure/custom-domain.sh --bind   # bind once DNS is live
```

The apex uses an A record to the Container Apps environment's static inbound
IP, because DNS forbids a CNAME at a zone apex. That IP survives redeploys and
revisions; it changes only if the environment is deleted and recreated, so
re-run the script after any teardown. `www` is a CNAME and redirects to the
apex via `next.config.ts`, keeping one canonical hostname for search.

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
