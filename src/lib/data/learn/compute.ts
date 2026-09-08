import type { LearnTopic } from "@/types";

export const computeTopics: LearnTopic[] = [
  {
    slug: "compute-engine",
    title: "Compute Engine",
    category: "compute",
    summary:
      "Virtual machines with full control over the operating system: machine types, images, disks, instance groups and autoscaling.",
    oneLiner:
      "Compute Engine gives you a virtual server you administer yourself — the closest thing in the cloud to a machine in your own rack, minus the rack.",
    readingWords: 1100,
    updated: "2026-08-11",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Compute Engine provides virtual machines running on Google's infrastructure. You choose the amount of CPU and memory, the operating system image, the disks attached to it and the network it sits on. From that point you administer the machine exactly as you would a physical server: you install software, apply patches and manage the operating system.",
          },
          {
            type: "p",
            text: "This is the most flexible compute option and the one with the most responsibility attached. Every other compute product trades some of that control for something you would otherwise have to build yourself.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Virtual machines remain the destination for most workloads that move to the cloud, because they let existing software run unchanged. A migration that would require rewriting an application becomes a migration that requires copying a disk image.",
          },
          {
            type: "p",
            text: "They are also the right answer whenever you genuinely need what they offer: a specific operating system version, kernel modules, licensed software tied to a machine, long-running stateful processes, or GPU workloads with particular driver requirements.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Machine type** — the CPU and memory configuration. Predefined families cover general-purpose, compute-optimised and memory-optimised needs; custom machine types let you specify an exact combination.",
              "**Image** — the operating system and software a disk starts from. Custom images let you bake configuration in so instances start ready to serve.",
              "**Persistent disk** — network-attached block storage that survives the instance. Can be resized while attached and snapshotted for backup.",
              "**Local SSD** — physically attached storage that is very fast and entirely ephemeral. It is lost when the instance stops. Never put data you care about on it.",
              "**Snapshot** — an incremental backup of a persistent disk, stored separately and usable to create new disks in other zones.",
              "**Instance template** — an immutable definition of how to create instances. Templates cannot be edited; you create a new one.",
              "**Managed instance group (MIG)** — a set of identical instances created from a template, with autoscaling, autohealing and rolling updates.",
              "**Spot / preemptible VM** — heavily discounted capacity that can be reclaimed at short notice. Correct for fault-tolerant batch work, wrong for anything that must stay up.",
              "**Sole-tenant node** — dedicated physical hardware for licensing or compliance requirements that forbid shared tenancy.",
            ],
          },
        ],
      },
      {
        heading: "How a scalable deployment fits together",
        body: [
          {
            type: "diagram",
            caption: "The standard pattern for a resilient virtual machine workload.",
            steps: [
              "Custom image — operating system plus your application, baked and versioned",
              "Instance template — references the image, machine type, network and startup script",
              "Managed instance group — creates instances from the template across multiple zones",
              "Health check — determines which instances are actually serving correctly",
              "Autoscaler — adds and removes instances based on load signals",
              "Load balancer — distributes traffic across healthy instances only",
            ],
          },
          {
            type: "note",
            text: "Autohealing and load balancer health checks are separate things that look similar. The load balancer stops sending traffic to an unhealthy instance; autohealing recreates it. Questions frequently test whether you know the difference.",
          },
        ],
      },
      {
        heading: "Cost control",
        body: [
          {
            type: "ul",
            items: [
              "**Sustained use discounts** apply automatically when an instance runs for a large part of the month. You do nothing to earn them.",
              "**Committed use discounts** require promising a level of usage for one or three years, in exchange for a substantially lower rate. Right for predictable baseline load.",
              "**Spot instances** cost a fraction of standard pricing but can be reclaimed. Right for batch processing, rendering and CI runners; wrong for databases and user-facing services.",
              "**Right-sizing** — machines are routinely provisioned larger than needed. Recommendations based on actual utilisation are often the fastest cost win available.",
              "**Stopping instances** — a stopped instance stops charging for CPU and memory but continues charging for its persistent disks.",
            ],
          },
          {
            type: "p",
            text: "A frequent exam pattern: a scenario describes a steady baseline plus unpredictable spikes. The correct answer is usually committed use discounts for the baseline and spot or on-demand instances for the spikes, rather than committing to peak capacity.",
          },
        ],
      },
      {
        heading: "Common use cases",
        body: [
          {
            type: "ul",
            items: [
              "Lifting an existing application from a data centre with minimal changes.",
              "Running commercial software with licensing tied to specific hardware or an operating system version.",
              "Batch and high-performance computing on spot instances at low cost.",
              "GPU workloads for training or rendering that need particular driver versions.",
              "Self-managed databases where a managed service does not meet a specific requirement.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "associate-cloud-engineer",
        note: "Directly and heavily tested. Expect gcloud commands for creating instances, managing disks, taking snapshots and configuring instance groups.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Appears as a design choice: when virtual machines are the right answer, and how to build availability and cost efficiency around them.",
      },
      {
        cert: "cloud-digital-leader",
        note: "Conceptual only — understanding where virtual machines sit on the spectrum from full control to fully managed.",
      },
    ],
    questionTopic: "compute",
    related: ["cloud-run", "google-kubernetes-engine", "load-balancing", "cloud-storage"],
  },

  {
    slug: "cloud-run",
    title: "Cloud Run",
    category: "compute",
    summary:
      "Run a container without managing servers: request-driven scaling, scale to zero, and per-request billing.",
    oneLiner:
      "Cloud Run takes a container, runs it when requests arrive, scales it automatically, and charges you nothing while it sits idle.",
    readingWords: 1000,
    updated: "2026-08-18",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Cloud Run runs containers as a managed service. You provide a container image that listens for HTTP requests on a port; the platform handles provisioning, scaling, load balancing, TLS certificates and availability. There are no servers, clusters or node pools to configure.",
          },
          {
            type: "p",
            text: "Because the unit of deployment is a standard container, you are not restricted in language or framework. If it runs in a container and serves HTTP, it runs here — which makes it far less constraining than earlier generations of serverless platforms.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "For a large share of web services and APIs, Cloud Run is the shortest distance between working code and a production deployment. It removes a category of operational work — patching, capacity planning, cluster upgrades — that produces no value for most teams.",
          },
          {
            type: "p",
            text: "The economics matter as much as the convenience. Scaling to zero means a service with no traffic costs nothing. For internal tools, low-traffic APIs and development environments, this frequently changes the total cost by an order of magnitude compared with an always-on virtual machine.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Service** — a deployed container with a stable HTTPS URL. Each deployment creates a new immutable revision.",
              "**Revision** — a specific version of the service, including its image and configuration. Revisions are immutable, which makes rollback instant.",
              "**Traffic splitting** — sending a percentage of requests to a specific revision. This is what makes canary releases straightforward.",
              "**Concurrency** — how many simultaneous requests one container instance handles. Unlike most function platforms, this defaults well above one, which changes the cost model significantly.",
              "**Cold start** — the delay when a request arrives and no instance is running. Minimum instances keep containers warm at the cost of paying for idle capacity.",
              "**Minimum and maximum instances** — the floor that controls cold starts and the ceiling that protects downstream systems and your budget.",
              "**Jobs** — for work that runs to completion rather than serving requests, such as scheduled batch processing.",
              "**Service identity** — each service runs as a service account; give it only the permissions the code actually needs.",
            ],
          },
          {
            type: "note",
            text: "Concurrency is the most commonly misunderstood setting. With concurrency set to 80, one instance can serve 80 simultaneous requests, so you need far fewer instances than a one-request-per-instance model. Setting it to 1 for a service that could handle more multiplies your cost.",
          },
        ],
      },
      {
        heading: "Choosing between compute options",
        body: [
          {
            type: "table",
            head: ["Choose", "When", "Trade-off"],
            rows: [
              [
                "Cloud Run",
                "Stateless HTTP services, APIs, event handlers, spiky or low traffic.",
                "Request-driven model; long-running background work needs a different shape.",
              ],
              [
                "GKE",
                "Complex multi-service systems, specific networking or scheduling needs, existing Kubernetes investment.",
                "Substantially more operational surface to understand and maintain.",
              ],
              [
                "Compute Engine",
                "Full operating system control, licensed software, stateful long-running processes.",
                "You own patching, scaling configuration and availability design.",
              ],
            ],
          },
          {
            type: "p",
            text: "The exam framing is usually about operational burden rather than capability. When a scenario mentions a small team, a desire to minimise operations, or unpredictable traffic, the fully managed option is generally the intended answer.",
          },
        ],
      },
      {
        heading: "Common use cases",
        body: [
          {
            type: "ul",
            items: [
              "Public REST and GraphQL APIs that scale with demand and cost nothing overnight.",
              "Server-rendered web applications behind a global load balancer.",
              "Event handlers triggered by messages, storage changes or scheduled jobs.",
              "Internal tools that are used a few times a day and should not run a server continuously.",
              "Batch processing as a job — data transformation, report generation, scheduled maintenance.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-cloud-developer",
        note: "A central topic. Revisions, traffic splitting, concurrency tuning and service identity are all directly examined.",
      },
      {
        cert: "associate-cloud-engineer",
        note: "You should be able to deploy a container, set concurrency and scaling limits, and split traffic between revisions.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Appears in scenarios about reducing operational burden and matching cost to variable demand.",
      },
    ],
    questionTopic: "compute",
    related: ["google-kubernetes-engine", "compute-engine", "pub-sub", "cloud-build-and-cicd"],
  },

  {
    slug: "google-kubernetes-engine",
    title: "Google Kubernetes Engine (GKE)",
    category: "compute",
    summary:
      "Managed Kubernetes: pods, deployments, services, autoscaling and the operational model that comes with a cluster.",
    oneLiner:
      "Kubernetes is a system that keeps a declared set of containers running across a pool of machines; GKE runs the difficult parts of Kubernetes for you.",
    readingWords: 1200,
    updated: "2026-08-19",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Kubernetes is a container orchestrator. You declare what you want — five copies of this container, reachable at this address, with this much memory — and the system continuously works to make reality match that declaration. If a container crashes or a machine fails, it schedules replacements without anyone intervening.",
          },
          {
            type: "p",
            text: "GKE provides Kubernetes as a managed service. The control plane, which is the hardest part to operate correctly, is run for you. Depending on the mode you choose, the worker nodes may also be managed automatically.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Kubernetes has become the common language of container operations. Its concepts are portable across clouds and on-premises environments, which is why organisations concerned about lock-in gravitate towards it.",
          },
          {
            type: "p",
            text: "It genuinely earns its complexity for certain workloads: systems with many interdependent services, workloads needing fine-grained scheduling or specific hardware, or teams already fluent in its model. It is genuinely over-specified for a single stateless web service, and recognising that distinction is worth marks on several exams.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Cluster** — the control plane plus the worker nodes that run your containers.",
              "**Node** — a virtual machine that runs workloads. Grouped into node pools that share a configuration.",
              "**Pod** — the smallest deployable unit; one or more containers sharing a network namespace and storage. Pods are disposable by design.",
              "**Deployment** — declares the desired number of pod replicas and manages rolling updates and rollbacks.",
              "**Service** — a stable network endpoint in front of a changing set of pods, since pod addresses change constantly.",
              "**Ingress / Gateway** — routes external HTTP traffic to services, typically provisioning a load balancer.",
              "**ConfigMap and Secret** — configuration and sensitive values kept out of the container image.",
              "**Namespace** — a logical partition inside a cluster used for isolation between teams or environments.",
              "**Requests and limits** — the resources a container is guaranteed and the ceiling it may not exceed. Getting these wrong is the leading cause of both waste and instability.",
              "**Horizontal Pod Autoscaler** — adds and removes pods based on observed metrics.",
              "**Cluster Autoscaler** — adds and removes nodes when pods cannot be scheduled or capacity is idle.",
            ],
          },
        ],
      },
      {
        heading: "Autoscaling has two layers",
        body: [
          {
            type: "diagram",
            caption: "Pod scaling and node scaling are separate mechanisms that must both be configured.",
            steps: [
              "Traffic increases and CPU usage per pod rises",
              "Horizontal Pod Autoscaler creates additional pods to meet the target",
              "New pods cannot be scheduled — no node has enough free capacity",
              "Cluster Autoscaler provisions additional nodes",
              "Pending pods are scheduled onto the new nodes and begin serving",
            ],
          },
          {
            type: "note",
            text: "A recurring exam scenario: pods are stuck in a pending state. The cause is almost always insufficient cluster capacity or resource requests that no node can satisfy — not a problem with the deployment itself.",
          },
        ],
      },
      {
        heading: "Operating modes",
        body: [
          {
            type: "p",
            text: "GKE offers two ways of running a cluster and they suit different teams.",
          },
          {
            type: "ul",
            items: [
              "**Autopilot** — Google manages nodes, capacity and much of the security configuration. You pay for the resources your pods request. Fewer knobs, fewer ways to misconfigure something, less operational work.",
              "**Standard** — you manage node pools, machine types and upgrades. You pay for the nodes whether or not the pods use them. Necessary when you need specific machine types, custom node configuration or particular scheduling behaviour.",
            ],
          },
          {
            type: "p",
            text: "When a scenario emphasises reducing operational overhead or a small platform team, the managed mode is generally the intended answer. When it specifies particular hardware, node-level customisation or specialised scheduling, the self-managed mode is required.",
          },
        ],
      },
      {
        heading: "Security essentials",
        body: [
          {
            type: "ul",
            items: [
              "**Workload Identity** — lets a pod act as a cloud service account without a downloaded key file. This is the correct pattern; long-lived key files in secrets are the anti-pattern the exams test against.",
              "**Private clusters** — nodes without public IP addresses, with controlled access to the control plane.",
              "**Network policy** — controls which pods can talk to which other pods. Without it, everything in the cluster can reach everything else.",
              "**Binary Authorization** — enforces that only images meeting your policy can be deployed.",
              "**Namespaces plus RBAC** — the standard way to separate teams inside a shared cluster.",
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
              "Microservice systems with many services that need consistent deployment and networking.",
              "Migrating containerised workloads from another Kubernetes environment with minimal change.",
              "Machine learning training that needs GPU scheduling and job queuing.",
              "Multi-tenant platforms where namespaces and quotas separate internal teams.",
              "Workloads that must run identically across cloud and on-premises environments.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "associate-cloud-engineer",
        note: "Practical fluency expected: create a cluster, deploy a workload, expose it with a service, scale it, and read kubectl output.",
      },
      {
        cert: "professional-cloud-devops-engineer",
        note: "Deep coverage — autoscaling, resource management, rollout strategies, cluster upgrades and debugging failing workloads.",
      },
      {
        cert: "professional-cloud-developer",
        note: "Deploying and integrating applications on Kubernetes, including workload identity and configuration management.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Appears as a trade-off decision: when the complexity of a cluster is justified and when it is not.",
      },
    ],
    questionTopic: "kubernetes",
    related: ["cloud-run", "compute-engine", "cloud-build-and-cicd", "cloud-monitoring"],
  },
];
