import type { LearnTopic } from "@/types";

export const networkingTopics: LearnTopic[] = [
  {
    slug: "vpc",
    title: "Virtual Private Cloud (VPC)",
    category: "networking",
    summary:
      "Your private network in the cloud: subnets, routes, firewall rules, peering and shared VPC.",
    oneLiner:
      "A VPC is your own private network inside the provider's infrastructure — you decide the address ranges, who can reach what, and how it connects to everything else.",
    readingWords: 1200,
    updated: "2026-08-21",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "A VPC is a virtual network. Resources placed in it can communicate using private addresses, isolated from other customers and from the public internet unless you deliberately allow it.",
          },
          {
            type: "p",
            text: "One property makes Google Cloud's VPC distinctive and it changes how you design: the network itself is global. A single VPC spans every region, with subnets belonging to specific regions inside it. Resources in different regions on the same VPC can reach each other privately without any peering or gateway configuration.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "The network is where most security boundaries actually live. Identity controls who can change a resource; the network controls what can reach it. Both are needed, and a permissive network quietly undermines careful identity work.",
          },
          {
            type: "p",
            text: "It is also where a large share of production incidents originate. A missing firewall rule, an overlapping address range that blocks a future connection, or a route that sends traffic somewhere unexpected are all common, and all much cheaper to prevent than to diagnose.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**VPC network** — the global container. Auto mode creates subnets in every region automatically; custom mode gives you full control and is what production estates use.",
              "**Subnet** — a regional IP range. Resources take addresses from the subnet in their region. Ranges can be expanded later but not shrunk, and they must not overlap with networks you may connect to.",
              "**Route** — determines where traffic for a destination is sent. Default routes handle internal traffic and the internet gateway; custom routes send traffic through appliances or VPN tunnels.",
              "**Firewall rule** — allows or denies traffic based on direction, protocol, port, and source or destination. Rules are stateful, so return traffic for an allowed connection is permitted automatically.",
              "**Priority** — firewall rules are evaluated in priority order, lowest number first, and the first match wins. A permissive rule at priority 100 defeats a restrictive rule at priority 1000.",
              "**Network tags and service accounts** — the two ways to target firewall rules at specific instances. Service accounts are the more secure choice because tags can be applied by anyone who can edit an instance.",
              "**Shared VPC** — one host project owns the network; service projects attach to it. The standard enterprise pattern, letting a central team control networking while application teams manage their own resources.",
              "**VPC peering** — connects two VPCs privately. Address ranges must not overlap, and peering is not transitive: if A peers with B and B peers with C, A cannot reach C.",
              "**Private Google Access and Private Service Connect** — reach managed services privately, without instances needing public addresses.",
              "**Cloud NAT** — lets instances without public addresses make outbound connections. Outbound only; it does not permit inbound connections.",
            ],
          },
        ],
      },
      {
        heading: "How firewall rules are evaluated",
        body: [
          {
            type: "diagram",
            caption: "Evaluation stops at the first matching rule.",
            steps: [
              "A packet arrives at an instance's network interface",
              "Rules matching the direction are gathered and sorted by priority, lowest number first",
              "Each rule is checked against protocol, port, source and target",
              "The first matching rule decides: allow or deny. Evaluation stops there",
              "If nothing matches, the implied rules apply — deny all ingress, allow all egress",
            ],
          },
          {
            type: "note",
            text: "Two implied rules exist on every network and cannot be deleted: deny all incoming traffic and allow all outgoing traffic. That asymmetry surprises people — by default, an instance can reach the internet even though nothing can reach it. Restricting outbound traffic requires an explicit egress deny rule.",
          },
        ],
      },
      {
        heading: "IP address planning",
        body: [
          {
            type: "p",
            text: "This is the decision that is hardest to change later and the one most often made carelessly. Ranges that overlap prevent peering, VPN connections and future acquisitions from working, and fixing it means renumbering live systems.",
          },
          {
            type: "ul",
            items: [
              "Allocate ranges from a documented plan covering every environment and region you might ever need, not just the current one.",
              "Leave room to expand — subnet ranges can grow, so start smaller within a reserved larger block.",
              "Check against on-premises ranges before allocating anything, including ranges other teams have reserved but not yet used.",
              "Remember that managed services often need their own reserved ranges for private connectivity.",
              "Avoid the most common corporate ranges if you may ever need to connect to a partner or acquired company using them.",
            ],
          },
        ],
      },
      {
        heading: "Common use cases",
        body: [
          {
            type: "ul",
            items: [
              "A shared VPC where a platform team owns networking and application teams deploy into service projects.",
              "Private subnets with Cloud NAT so application servers reach the internet but nothing reaches them.",
              "Firewall rules targeting service accounts so only the web tier can reach the database tier.",
              "Peering to a partner's network for private data exchange without traversing the internet.",
              "Hybrid connectivity from an on-premises data centre through VPN or interconnect.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "associate-cloud-engineer",
        note: "Core material. Creating VPCs and subnets, writing firewall rules and understanding priority are directly tested.",
      },
      {
        cert: "professional-cloud-network-engineer",
        note: "The foundation of the entire exam, examined in far greater depth including shared VPC, peering limits and hybrid routing.",
      },
      {
        cert: "professional-cloud-security-engineer",
        note: "Network boundaries, hierarchical firewall policy and controlling data exfiltration paths.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Network topology design, address planning and connectivity for multi-project enterprise estates.",
      },
    ],
    questionTopic: "networking",
    related: ["load-balancing", "cloud-dns", "cloud-cdn", "iam"],
  },

  {
    slug: "load-balancing",
    title: "Load Balancing",
    category: "networking",
    summary:
      "Distributing traffic across backends: the global versus regional and proxy versus pass-through decisions that drive every selection question.",
    oneLiner:
      "A load balancer takes incoming traffic and spreads it across healthy backends — and choosing the right type comes down to four questions you can answer in seconds.",
    readingWords: 1100,
    updated: "2026-08-21",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "A load balancer accepts client traffic and distributes it across a set of backend servers, removing unhealthy ones automatically. It gives you a single stable address in front of a changing pool of instances.",
          },
          {
            type: "p",
            text: "The externally-facing HTTP load balancers are implemented at the edge of Google's network rather than as a machine you run. A user connects to the nearest edge location and their request travels the rest of the way over the provider's private backbone, which is why a single global address can serve users worldwide with good latency.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Load balancing is where availability, latency and scaling all become concrete. It is also the topic most likely to appear as a selection question, because there are several products that look similar and only one is correct for a given scenario.",
          },
          {
            type: "p",
            text: "Being able to eliminate three of four options in a few seconds is worth more preparation time than almost any other networking topic, particularly on the Network Engineer and Architect exams.",
          },
        ],
      },
      {
        heading: "The four questions that decide it",
        body: [
          {
            type: "ol",
            items: [
              "**Is the traffic coming from the internet or from inside your network?** External or internal.",
              "**Do users need one address worldwide, or is one region enough?** Global or regional.",
              "**Is it HTTP(S), or another protocol such as raw TCP or UDP?** Application layer or network layer.",
              "**Does the load balancer need to terminate and inspect the connection, or pass it through unchanged?** Proxy or pass-through.",
            ],
          },
          {
            type: "p",
            text: "Answer those four and the correct product is almost always determined. Most scenarios state at least two of them explicitly and imply a third.",
          },
        ],
      },
      {
        heading: "The main options",
        body: [
          {
            type: "table",
            head: ["Type", "Use it when", "Notable capability"],
            rows: [
              [
                "Global external Application Load Balancer",
                "Public websites and APIs served to users worldwide over HTTP(S).",
                "One anycast address globally, content-based routing, edge caching, integrates with web application firewall policies.",
              ],
              [
                "Regional external Application Load Balancer",
                "Public HTTP(S) traffic that must stay within one region, often for data residency.",
                "Regional scope, useful where a global footprint is not permitted.",
              ],
              [
                "Internal Application Load Balancer",
                "HTTP traffic between services inside your own network.",
                "Private address, path and header based routing for internal microservices.",
              ],
              [
                "External proxy Network Load Balancer",
                "Non-HTTP TCP traffic from the internet that should terminate at the edge.",
                "TCP proxying with TLS termination for protocols that are not HTTP.",
              ],
              [
                "External pass-through Network Load Balancer",
                "TCP or UDP traffic where the backend must see the original client address.",
                "Preserves source addresses; regional; handles any protocol.",
              ],
              [
                "Internal pass-through Network Load Balancer",
                "Internal TCP or UDP traffic, or as a next hop for network appliances.",
                "Private, preserves addresses, commonly used in front of internal service tiers.",
              ],
            ],
          },
          {
            type: "note",
            text: "The strongest single heuristic: if the scenario says HTTP or HTTPS and mentions users in multiple countries, it is the global external Application Load Balancer. If it says UDP, or says the backend must see the real client IP, it is a pass-through Network Load Balancer.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Backend service** — defines the group of backends, the balancing mode, timeouts and the health check.",
              "**Health check** — probes backends and removes failing ones from rotation. A misconfigured health check that fails everything takes the whole service down, which is a common real-world outage.",
              "**Backend group** — usually a managed instance group or a network endpoint group, which is how serverless and container backends are attached.",
              "**Forwarding rule** — binds an IP address and port to the load balancer.",
              "**URL map** — routes requests to different backends by hostname and path, so one address can serve several services.",
              "**Session affinity** — sends a given client consistently to the same backend. Useful for stateful applications; it also undermines even distribution, so use it only when required.",
              "**Capacity and balancing mode** — controls when a backend is considered full and traffic should overflow to another region.",
            ],
          },
        ],
      },
      {
        heading: "Common use cases",
        body: [
          {
            type: "ul",
            items: [
              "A global web application on one anycast address with automatic failover between regions.",
              "One address serving several backend services routed by URL path.",
              "Internal load balancing in front of a service tier so callers use a stable private address.",
              "Gaming or telemetry servers over UDP where source addresses must be preserved.",
              "Blue/green and canary rollouts by weighting traffic between backend groups.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-cloud-network-engineer",
        note: "The highest-yield topic on the exam. Expect several questions that are purely about selecting the correct type.",
      },
      {
        cert: "associate-cloud-engineer",
        note: "Configuring a load balancer with a managed instance group backend and a working health check.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Appears in availability and global distribution design, and in cost discussions about egress.",
      },
      {
        cert: "professional-cloud-devops-engineer",
        note: "Traffic splitting for progressive rollouts and health checks as part of safe deployment.",
      },
    ],
    questionTopic: "networking",
    related: ["vpc", "cloud-cdn", "cloud-dns", "compute-engine"],
  },

  {
    slug: "cloud-cdn",
    title: "Content Delivery and Edge Caching",
    category: "networking",
    summary:
      "Serving content from locations close to users: cache keys, invalidation, and what should and should not be cached.",
    oneLiner:
      "A content delivery network keeps copies of your content in data centres near your users, so most requests never reach your servers at all.",
    readingWords: 750,
    updated: "2026-08-13",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "A content delivery network caches responses at edge locations distributed around the world. When a user requests something already cached nearby, it is served from that location rather than travelling to your origin servers.",
          },
          {
            type: "p",
            text: "On Google Cloud this is enabled on a backend service behind an external Application Load Balancer, which is why the two topics are usually studied together.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "The benefits compound. Latency drops because content travels a shorter distance. Origin load falls, often dramatically, because a high cache hit ratio means most requests never reach your servers. Egress costs fall for the same reason.",
          },
          {
            type: "p",
            text: "There is a resilience benefit too. Cached content can continue being served during an origin problem, turning what would have been an outage into degraded functionality for a subset of users.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Cache key** — what identifies a cached entry. By default it includes the host and full path; including or excluding query parameters, headers and cookies changes hit ratio substantially.",
              "**Time to live (TTL)** — how long an entry stays valid, driven by cache-control headers from your origin or by overrides on the load balancer.",
              "**Cache hit ratio** — the proportion of requests served from cache. The single number that tells you whether the configuration is working.",
              "**Invalidation** — explicitly removing cached content before it expires, for when you publish a correction and cannot wait for the TTL.",
              "**Cache modes** — cache only what is explicitly marked cacheable, cache all static content automatically, or force caching of everything.",
              "**Negative caching** — caching error responses briefly so a failing origin is not hammered by retries.",
            ],
          },
          {
            type: "note",
            text: "Including cookies in the cache key is the classic mistake. If every user has a unique session cookie, every request produces a unique cache key and the hit ratio collapses to near zero — while everything still appears to work.",
          },
        ],
      },
      {
        heading: "Cache invalidation strategy",
        body: [
          {
            type: "p",
            text: "The most reliable approach is to avoid needing invalidation. Give static assets content-hashed filenames — `app.4f2a9c.js` rather than `app.js` — and cache them for a very long time. When content changes the filename changes, so the new file is fetched and the old cached copy is simply never requested again.",
          },
          {
            type: "ul",
            items: [
              "Long TTLs for versioned, immutable assets such as scripts, stylesheets and images.",
              "Short TTLs for HTML pages that reference those assets.",
              "Never cache authenticated, personalised responses at the edge unless you are certain the cache key isolates users.",
              "Reserve explicit invalidation for genuine mistakes rather than routine deployment.",
            ],
          },
        ],
      },
      {
        heading: "Common use cases",
        body: [
          {
            type: "ul",
            items: [
              "Serving images, video, scripts and stylesheets close to a global audience.",
              "Reducing origin load and egress cost for a high-traffic public site.",
              "Distributing software downloads and large static files internationally.",
              "Caching API responses that are identical for all users, such as public catalogues.",
              "Absorbing sudden traffic spikes from a marketing campaign without scaling the origin.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-cloud-network-engineer",
        note: "Cache key configuration, invalidation and the relationship with the load balancer are directly examined.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Appears in performance and cost optimisation scenarios, especially reducing egress charges.",
      },
      {
        cert: "associate-cloud-engineer",
        note: "Conceptual: knowing when to enable caching and what it does for latency and cost.",
      },
    ],
    questionTopic: "networking",
    related: ["load-balancing", "cloud-storage", "vpc", "cloud-dns"],
  },

  {
    slug: "cloud-dns",
    title: "Cloud DNS",
    category: "networking",
    summary:
      "Managed name resolution: public and private zones, record types, forwarding and split-horizon design.",
    oneLiner:
      "DNS turns names into addresses; Cloud DNS runs that translation for you, for both the public internet and your private network.",
    readingWords: 750,
    updated: "2026-08-13",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Cloud DNS is a managed authoritative name service. You create zones representing domains you control and records inside them mapping names to addresses or other names.",
          },
          {
            type: "p",
            text: "It serves both directions of the problem: public zones answer queries from anyone on the internet, and private zones answer queries only from within networks you specify.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "DNS is a single point of failure for everything. If name resolution stops working, it does not matter how healthy your servers are — nobody can reach them. It is also a common source of confusing incidents, because caching means changes propagate unevenly and a problem can appear to affect only some users.",
          },
          {
            type: "p",
            text: "In hybrid environments it becomes a genuine design problem. Cloud resources need to resolve on-premises names, on-premises systems need to resolve cloud names, and the same name may need to resolve differently depending on who is asking.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Public zone** — authoritative for a domain on the internet.",
              "**Private zone** — resolvable only from VPC networks you authorise, for internal names that should not be public.",
              "**Record types** — A and AAAA map to addresses; CNAME aliases one name to another; MX routes mail; TXT holds verification and policy data; NS delegates a subdomain.",
              "**TTL** — how long resolvers may cache a record. Lower it in advance of a planned change, then raise it again afterwards.",
              "**Forwarding zone** — sends queries for a domain to specific name servers, typically on-premises resolvers.",
              "**DNS peering** — lets one VPC use another VPC's private zones, so a shared network can centralise resolution.",
              "**DNSSEC** — cryptographically signs responses so resolvers can verify they were not tampered with.",
            ],
          },
        ],
      },
      {
        heading: "Split-horizon resolution",
        body: [
          {
            type: "diagram",
            caption: "The same name resolving differently depending on where the query comes from.",
            steps: [
              "A public zone for example.com returns the load balancer's public address",
              "A private zone for the same name is authorised for your internal VPC",
              "A query from the internet reaches the public zone and receives the public address",
              "A query from inside the VPC matches the private zone first and receives an internal address",
              "Internal traffic stays on the private network without leaving it",
            ],
          },
          {
            type: "note",
            text: "Plan TTL reductions ahead of migrations. If a record has a 24-hour TTL and you need to change it during a cutover, lower the TTL at least that far in advance — otherwise resolvers keep the old answer long after you have made the change.",
          },
        ],
      },
      {
        heading: "Common use cases",
        body: [
          {
            type: "ul",
            items: [
              "Hosting authoritative DNS for a company's public domains.",
              "Private zones giving internal services stable names instead of IP addresses.",
              "Forwarding zones so cloud workloads can resolve on-premises hostnames.",
              "Split-horizon so internal traffic to a public hostname stays on the private network.",
              "Lowering TTLs in advance of a migration to make cutover fast and reversible.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-cloud-network-engineer",
        note: "Directly examined, including private zones, forwarding, peering and hybrid resolution design.",
      },
      {
        cert: "associate-cloud-engineer",
        note: "Creating zones and records, and understanding how TTL affects propagation.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Appears in migration and hybrid connectivity scenarios, particularly around cutover planning.",
      },
    ],
    questionTopic: "networking",
    related: ["vpc", "load-balancing", "cloud-cdn"],
  },
];
