import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Emit .next/standalone — a self-contained server.js plus only the traced
  // node_modules. The container image copies that instead of the full
  // dependency tree, which keeps it small enough to cold-start quickly on
  // Container Apps' scale-to-zero.
  output: "standalone",

  // Both googlecloudcertification.com and www.googlecloudcertification.com are
  // bound to the Container App, so both would otherwise serve the whole site
  // and split its search ranking across two sets of URLs. site.url — which
  // feeds metadataBase, the sitemap and robots.txt — names the apex, so send
  // www there permanently rather than letting it serve a duplicate.
  //
  // Done here rather than at the registrar because GoDaddy's forwarding would
  // have to own the www record, and that record has to be the CNAME Azure
  // validates against.
  // Tell the browser to never try this site over plain HTTP again.
  //
  // Container Apps already 301s port 80 to 443, but that redirect only runs
  // *after* an unencrypted request has gone out — which is the moment Chrome
  // paints the "Not secure" label, and is also where a downgrade attack would
  // sit. With HSTS the browser rewrites http:// to https:// itself, so the
  // insecure request is never made after the first visit.
  //
  // No `preload` directive: that submits the domain to a list baked into
  // browser binaries and is slow and awkward to reverse. Add it only when
  // committing to HTTPS-only for this domain and every subdomain, forever.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.googlecloudcertification.com" }],
        destination: "https://googlecloudcertification.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
