import type { LearnTopic } from "@/types";

/**
 * Platform fundamentals, delivery and operations.
 *
 * All explanations here are written from scratch by GCP Prep. We do not
 * reproduce official documentation; where a reader needs authoritative detail
 * we tell them to go to the official docs rather than paraphrasing them.
 */
export const platformTopics: LearnTopic[] = [
  {
    slug: "cloud-fundamentals",
    title: "Cloud Fundamentals",
    category: "fundamentals",
    summary:
      "Regions, zones, the resource hierarchy, billing and the shared responsibility model — the vocabulary every other topic assumes.",
    oneLiner:
      "The cloud is someone else's data centre that you rent by the second, organised into a hierarchy so you can control who touches what and who pays for it.",
    readingWords: 900,
    updated: "2026-08-14",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Cloud computing means renting computing capacity — servers, storage, networking, databases — from a provider who owns and operates the physical hardware. You do not buy machines, install them in a rack or replace failed disks. You request capacity through an API, use it, and stop paying when you release it.",
          },
          {
            type: "p",
            text: "That sounds simple, and the mechanics are. What takes time to internalise is the surrounding structure: where your resources physically live, how they are organised, who is allowed to change them, and how the bill is assembled.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Almost every wrong answer on a certification exam is wrong because of one of these fundamentals rather than the product being discussed. A design fails because the resource is in the wrong region, or the permission was granted at the wrong level of the hierarchy, or the cost model was misunderstood.",
          },
          {
            type: "p",
            text: "Get these right and the rest of the platform becomes much easier to reason about, because every product inherits the same rules about location, identity and billing.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Region** — a geographic area containing multiple independent data centres. Choosing a region decides latency to your users and, often, your legal data residency position.",
              "**Zone** — one isolated deployment area inside a region. Zones fail independently, which is why high availability designs spread across at least two of them.",
              "**Multi-region** — a service configuration that spans several regions, giving the highest durability and availability at a higher cost.",
              "**Project** — the fundamental container. Every resource belongs to exactly one project. Projects hold their own IAM policy, APIs, quotas and billing link.",
              "**Folder** — groups projects, typically by department, environment or team, so policy can be applied to many projects at once.",
              "**Organisation** — the root node representing your company. Policy set here applies to everything beneath it.",
              "**Billing account** — pays for one or more projects. Separating billing from the project structure is deliberate: who pays and who administers are different questions.",
              "**Shared responsibility** — the provider secures the underlying infrastructure; you secure what you put on it, including your identities, configurations and data.",
            ],
          },
        ],
      },
      {
        heading: "How the hierarchy fits together",
        body: [
          {
            type: "diagram",
            caption: "Policy flows down the resource hierarchy; it is never inherited upward.",
            steps: [
              "Organisation — company-wide policy and guardrails",
              "Folder — department or environment grouping",
              "Project — the resource container and IAM boundary",
              "Resource — the virtual machine, bucket or dataset itself",
            ],
          },
          {
            type: "p",
            text: "The critical property is inheritance. A permission granted at the folder level applies to every project inside it, and every resource inside those projects. This is powerful and it is also the most common source of accidental over-permission: someone grants a broad role high in the hierarchy for convenience, and it silently applies to hundreds of resources.",
          },
          {
            type: "note",
            text: "Exam habit worth building: whenever you see a permission question, ask two things — which role, and at which level of the hierarchy. Answers that get the role right and the level wrong are the most common trap.",
          },
        ],
      },
      {
        heading: "Understanding the bill",
        body: [
          {
            type: "p",
            text: "Cloud pricing has a small number of recurring shapes. Once you recognise them, most cost questions become straightforward.",
          },
          {
            type: "ul",
            items: [
              "**Per-second compute** — you pay for the time a machine is running, with automatic discounts for sustained use and larger committed discounts if you promise usage in advance.",
              "**Storage by volume and class** — you pay for gigabytes stored per month, at a rate that drops sharply for data you rarely read but rises for retrieving it.",
              "**Network egress** — data leaving the provider's network costs money; data coming in generally does not. This is the charge that surprises people most often.",
              "**Per-request or per-query** — many managed services bill by operation rather than by machine, which is why an idle serverless service can cost nothing at all.",
            ],
          },
          {
            type: "p",
            text: "A useful rule when comparing designs: the cheapest option at low volume is frequently the most expensive at high volume, and vice versa. Cost questions almost always specify a volume for exactly this reason.",
          },
        ],
      },
      {
        heading: "Common use cases",
        body: [
          {
            type: "ul",
            items: [
              "Separating development, staging and production into distinct projects so a mistake in one cannot affect another.",
              "Applying an organisation-wide policy that prevents any project from creating publicly accessible storage.",
              "Placing resources in a specific region to satisfy a data residency requirement.",
              "Setting a budget alert on a billing account so runaway spend is noticed within hours rather than at month end.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "cloud-digital-leader",
        note: "Heavily tested. Expect questions on shared responsibility, cost models and why an organisation structures projects the way it does.",
      },
      {
        cert: "associate-cloud-engineer",
        note: "Assumed throughout. The resource hierarchy, billing configuration and region selection appear in questions about every other product.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Organisation design is a scored topic in its own right — folder structure, policy inheritance and billing separation at enterprise scale.",
      },
    ],
    questionTopic: "fundamentals",
    related: ["iam", "compute-engine", "cloud-storage", "cloud-monitoring"],
  },

  {
    slug: "cloud-build-and-cicd",
    title: "CI/CD and Build Automation",
    category: "devops",
    summary:
      "How source code becomes a running service safely: pipelines, artefacts, quality gates and progressive rollout strategies.",
    oneLiner:
      "A pipeline is an assembly line for software — it takes a commit, proves it works, packages it, and moves it towards production without anyone typing a deployment command.",
    readingWords: 1000,
    updated: "2026-08-20",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Continuous integration means every change is merged and automatically verified frequently, rather than accumulating on branches for weeks. Continuous delivery means every verified change is automatically prepared for release, so deploying becomes a decision rather than a project.",
          },
          {
            type: "p",
            text: "In practice this is a pipeline: a defined sequence of steps triggered by a commit. Each step either passes and hands work to the next, or fails and stops the change from progressing.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Deployment risk is not proportional to how often you deploy — it is proportional to how much changes in each deployment. Teams that deploy rarely deploy large batches, which makes each release riskier, which makes them deploy even more rarely. Automation breaks that loop.",
          },
          {
            type: "p",
            text: "There is a security dimension too. A pipeline is the natural place to scan dependencies, verify image provenance and enforce that nothing reaches production without passing the same checks. Doing this by convention rather than automation reliably fails.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Trigger** — what starts the pipeline: a push to a branch, a pull request, a tag, or a schedule.",
              "**Build step** — one unit of work in the pipeline, usually running inside a container so the environment is reproducible.",
              "**Artefact** — the immutable output of a build, typically a container image. The same artefact should be promoted through environments rather than rebuilt for each one.",
              "**Artefact registry** — where built images and packages are stored, versioned and scanned for vulnerabilities.",
              "**Quality gate** — a check that must pass before the change proceeds: tests, coverage thresholds, vulnerability scans, policy checks.",
              "**Environment promotion** — moving one artefact from development to staging to production, changing only configuration.",
              "**Rollback** — the ability to return to the previous known-good version quickly, which matters more than any other single reliability property.",
            ],
          },
          {
            type: "note",
            text: "Build once, deploy many. If your pipeline rebuilds the application for each environment, the thing you tested is not the thing you shipped. This principle appears repeatedly in the DevOps and Developer exams.",
          },
        ],
      },
      {
        heading: "A typical pipeline",
        body: [
          {
            type: "diagram",
            caption: "Each stage is a gate; a failure stops promotion rather than being reported later.",
            steps: [
              "Commit pushed to the source repository",
              "Build — compile, run unit tests, produce a container image",
              "Scan — check dependencies and the image for known vulnerabilities",
              "Publish — push the immutable artefact to a registry with a version tag",
              "Deploy to staging — run integration and smoke tests against a real environment",
              "Approve — automatic, or a human decision for higher-risk changes",
              "Deploy to production — progressively, with automated rollback on failure",
            ],
          },
        ],
      },
      {
        heading: "Deployment strategies",
        body: [
          {
            type: "table",
            head: ["Strategy", "How it works", "Best for"],
            rows: [
              [
                "Rolling",
                "Replace instances a few at a time until all run the new version.",
                "The sensible default. Low infrastructure cost, gradual exposure.",
              ],
              [
                "Blue/green",
                "Run the new version alongside the old, then switch all traffic at once.",
                "Fast, complete rollback. Costs double capacity during the switch.",
              ],
              [
                "Canary",
                "Send a small percentage of traffic to the new version and watch metrics before increasing.",
                "High-risk changes where you want real production signal before committing.",
              ],
              [
                "Feature flag",
                "Deploy the code disabled, then enable it for selected users at runtime.",
                "Decoupling deployment from release entirely; targeted rollout.",
              ],
            ],
          },
          {
            type: "p",
            text: "The exam-relevant nuance is that these are not ranked from worst to best. Canary is not simply the best option — it requires meaningful traffic to produce a useful signal and monitoring good enough to detect a problem in a small slice. For a low-traffic internal service, rolling is the correct answer and canary is over-engineering.",
          },
        ],
      },
      {
        heading: "Common use cases",
        body: [
          {
            type: "ul",
            items: [
              "Automatically building and testing every pull request before it can be merged.",
              "Blocking any container image with a critical vulnerability from reaching production.",
              "Promoting a single tested image through staging into production without rebuilding.",
              "Rolling out a risky change to five per cent of traffic and automatically reverting if error rates rise.",
              "Rebuilding an entire environment from version-controlled infrastructure definitions.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-cloud-devops-engineer",
        note: "The single heaviest domain on the exam. Pipeline design, artefact management and rollout strategy all appear repeatedly.",
      },
      {
        cert: "professional-cloud-developer",
        note: "Deployment strategies and traffic splitting are directly tested, especially for managed runtimes.",
      },
      {
        cert: "professional-machine-learning-engineer",
        note: "The same principles applied to models: pipelines, artefact versioning and automated retraining.",
      },
    ],
    questionTopic: "devops",
    related: ["cloud-run", "google-kubernetes-engine", "cloud-monitoring", "iam"],
  },

  {
    slug: "cloud-monitoring",
    title: "Monitoring, Logging and Observability",
    category: "monitoring",
    summary:
      "Metrics, logs and traces; designing alerts people actually act on; and the SLO vocabulary that reliability work is built around.",
    oneLiner:
      "Monitoring tells you that something is wrong; observability lets you work out why, using data you decided to collect before the problem happened.",
    readingWords: 1100,
    updated: "2026-08-22",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Observability rests on three kinds of data. Metrics are numeric measurements over time — request rate, error count, latency percentiles, memory used. Logs are timestamped records of discrete events. Traces follow a single request as it moves across multiple services, showing where the time went.",
          },
          {
            type: "p",
            text: "They answer different questions. A metric tells you error rate rose at 14:02. A trace tells you the latency is in the database call, not the application. A log tells you the specific error message for one failing request. You need all three, and using one to answer another's question is expensive and slow.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Every production system fails eventually. The difference between a fifteen-minute incident and a four-hour one is almost never the fix itself — it is how long it took to work out what was broken.",
          },
          {
            type: "p",
            text: "There is a second, less obvious reason. Without agreed measurements of reliability, arguments about whether to ship a feature or spend a sprint on stability become arguments about opinion and seniority. Service level objectives replace that with a number both sides accepted in advance.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**SLI (Service Level Indicator)** — a measurement of something users experience. The proportion of requests served successfully in under 300 milliseconds is an SLI.",
              "**SLO (Service Level Objective)** — the target for an SLI. 99.9% of requests succeed in under 300ms over 28 days is an SLO.",
              "**SLA (Service Level Agreement)** — a contractual promise with financial consequences. Your SLO should be stricter than your SLA so you find out before your customers do.",
              "**Error budget** — the failure the SLO permits. A 99.9% objective allows roughly 43 minutes of failure per month. It is a budget you are meant to spend, not hoard.",
              "**Structured logging** — emitting logs as key-value data rather than free text, so they can be queried and turned into metrics.",
              "**Log-based metric** — a counter derived from matching log entries, letting you alert on something you only log.",
              "**Golden signals** — latency, traffic, errors and saturation. If you monitor nothing else, monitor these four.",
              "**Toil** — manual, repetitive operational work that scales with traffic and produces no lasting value. SRE practice treats reducing it as engineering work.",
            ],
          },
        ],
      },
      {
        heading: "How error budgets change decisions",
        body: [
          {
            type: "diagram",
            caption: "The error budget converts a reliability argument into an agreed policy.",
            steps: [
              "Define an SLI that reflects what users actually experience",
              "Agree an SLO target with the people who own the product",
              "Measure continuously; the remaining budget is visible to everyone",
              "Budget remaining — ship features, take reasonable risks",
              "Budget exhausted — feature work pauses, reliability work takes priority",
            ],
          },
          {
            type: "p",
            text: "This is the part engineers most often get wrong on the DevOps exam. When a scenario says a service has exhausted its error budget, the correct answer is usually the one that follows the agreed policy — pausing risky releases and investing in reliability — not the one that proposes the most impressive technical fix.",
          },
        ],
      },
      {
        heading: "Designing alerts people act on",
        body: [
          {
            type: "p",
            text: "The failure mode of monitoring is not too little alerting; it is too much. An on-call engineer who receives twenty alerts a night stops reading them, and the one that mattered is lost in the noise.",
          },
          {
            type: "ul",
            items: [
              "**Alert on symptoms, not causes.** Users care that checkout is failing, not that a node is at 90% memory. High memory that causes no user impact should not wake anyone.",
              "**Every page needs an action.** If the recipient's only possible response is to acknowledge it, it should be a dashboard entry or a ticket, not a page.",
              "**Alert on the SLO burn rate.** Rather than paging on every error, page when you are consuming error budget fast enough to breach the objective.",
              "**Use severity honestly.** If everything is critical, nothing is. Reserve paging for things that genuinely require immediate human attention.",
            ],
          },
          {
            type: "note",
            text: "A practical test for any proposed alert: if this fires at 3am, what will the person do? If you cannot answer specifically, it is not ready to be an alert.",
          },
        ],
      },
      {
        heading: "Common use cases",
        body: [
          {
            type: "ul",
            items: [
              "An uptime check from several regions that pages when a public endpoint stops responding.",
              "A dashboard showing the four golden signals for each service, used as the first stop during an incident.",
              "A log-based metric counting a specific error message, alerting when it exceeds a normal rate.",
              "A trace that reveals a slow endpoint is spending 80% of its time in a single unindexed query.",
              "A log sink exporting audit logs to long-term storage for compliance retention.",
              "An SLO dashboard reviewed weekly to decide whether the team ships features or hardens the service.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-cloud-devops-engineer",
        note: "Core to the exam. SLIs, SLOs, error budgets, alert design and post-mortem practice are all directly examined.",
      },
      {
        cert: "associate-cloud-engineer",
        note: "Practical skills tested: creating dashboards, alerting policies, uptime checks and querying logs.",
      },
      {
        cert: "professional-cloud-developer",
        note: "Structured logging, tracing and debugging a live service form the 'managing deployed applications' domain.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Observability appears as a design requirement — designing for operational readiness rather than configuring tools.",
      },
    ],
    questionTopic: "monitoring",
    related: ["cloud-build-and-cicd", "google-kubernetes-engine", "cloud-run", "iam"],
  },
];
