import type { LearnTopic } from "@/types";

export const securityTopics: LearnTopic[] = [
  {
    slug: "iam",
    title: "Identity and Access Management (IAM)",
    category: "security",
    summary:
      "Who can do what to which resource: members, roles, policy inheritance, service accounts and least privilege.",
    oneLiner:
      "IAM answers one question for every action anyone takes: is this identity allowed to perform this operation on this resource?",
    readingWords: 1300,
    updated: "2026-08-23",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "IAM is the authorisation system. Every action on every resource passes through it. The model is deliberately small: you grant a role to a member on a resource, and the role is a bundle of permissions.",
          },
          {
            type: "p",
            text: "It is worth stating the model precisely, because the wording matters. You do not grant permissions directly to people. You grant a role, which contains permissions, to a member, at a point in the resource hierarchy.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "IAM is the highest-yield topic in the entire certification programme relative to time spent studying it. It appears on every exam, it is tested precisely, and the questions have a reliable shape: four roles that would all technically work, one of which grants least privilege.",
          },
          {
            type: "p",
            text: "In production it matters for a simpler reason. Over-granted permissions are the most common serious misconfiguration in cloud environments, and they are the mechanism by which a small compromise becomes a large one.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Member (principal)** — the identity: a user account, a group, a service account, a domain, or a federated external identity.",
              "**Permission** — the finest-grained unit, expressed as service.resource.verb, such as `compute.instances.start`. You never grant these individually.",
              "**Role** — a collection of permissions. The only thing you actually grant.",
              "**Policy binding** — the attachment of a role to a member at a specific resource. The set of bindings on a resource is its IAM policy.",
              "**Inheritance** — policy flows down the hierarchy. A role granted at the folder level applies to every project and resource beneath it. It never flows upward.",
              "**Service account** — an identity for software rather than a person. Applications, virtual machines and pipelines act as one.",
              "**Impersonation** — allowing an identity to temporarily act as a service account. Preferable to distributing key files because the access can be revoked instantly and every use is logged.",
              "**Workload identity federation** — letting an external system authenticate as a service account using its own identity provider, so no key file is ever created.",
              "**IAM conditions** — attaching restrictions to a binding, such as an expiry date or a restriction to specific resource names.",
            ],
          },
        ],
      },
      {
        heading: "The three kinds of role",
        body: [
          {
            type: "table",
            head: ["Kind", "What it is", "When to use it"],
            rows: [
              [
                "Basic",
                "Owner, Editor, Viewer. Legacy roles spanning every service, extremely broad.",
                "Almost never in production. Editor alone can modify nearly everything in a project.",
              ],
              [
                "Predefined",
                "Service-specific roles maintained by the provider, such as a storage object viewer.",
                "The default choice. Curated, kept current as services change, and granular enough for most needs.",
              ],
              [
                "Custom",
                "A role you define containing exactly the permissions you choose.",
                "When no predefined role is tight enough. You own maintaining it as services evolve.",
              ],
            ],
          },
          {
            type: "note",
            text: "The reliable exam pattern: if a question describes a specific narrow need and offers a basic role among the options, the basic role is wrong. If a predefined role matches the need closely, that is usually correct — custom roles are the right answer only when the question makes clear that no predefined role fits.",
          },
        ],
      },
      {
        heading: "How an access decision is made",
        body: [
          {
            type: "diagram",
            caption: "Permissions accumulate down the hierarchy; a grant higher up cannot be narrowed lower down.",
            steps: [
              "A request arrives to perform an action on a resource",
              "The resource's own IAM policy is evaluated",
              "The parent project's policy is added",
              "Parent folders' policies are added, up to the organisation",
              "If any level grants a role containing the required permission, access is allowed",
              "Organisation policy constraints are applied separately and can block the action regardless",
            ],
          },
          {
            type: "p",
            text: "The consequence deserves emphasis: IAM is additive and there is no deny that undoes an allow granted higher up. If someone has Editor at the organisation level, you cannot remove their access to one project by adjusting that project's policy. You must fix the grant where it was made.",
          },
        ],
      },
      {
        heading: "Service accounts done properly",
        body: [
          {
            type: "p",
            text: "Service accounts cause more real-world security incidents than any other IAM feature, almost always because of key files. A downloaded key is a long-lived credential that works from anywhere, does not expire, and is trivially committed to a repository by accident.",
          },
          {
            type: "ul",
            items: [
              "Create a dedicated service account per workload. Never share one across unrelated services, and never use the default service account for production.",
              "Attach the service account to the resource — a virtual machine, a Cloud Run service, a Kubernetes workload — so credentials are obtained automatically and rotated for you.",
              "Use workload identity federation for systems outside the platform rather than issuing a key.",
              "Use impersonation for human access that needs elevated rights, so it is temporary and audited.",
              "If a key genuinely cannot be avoided, rotate it on a schedule and monitor for its use from unexpected locations.",
            ],
          },
          {
            type: "note",
            text: "When an exam question offers 'download a service account key and store it in the application' alongside 'use workload identity', the workload identity answer is correct essentially every time.",
          },
        ],
      },
      {
        heading: "Practical least privilege",
        body: [
          {
            type: "ul",
            items: [
              "Grant to groups rather than individuals so access follows role changes automatically.",
              "Grant at the lowest level of the hierarchy that satisfies the need, not the most convenient level.",
              "Start from a predefined role that is slightly too narrow and add to it, rather than starting broad and intending to trim later.",
              "Use conditions to add expiry to temporary elevated access.",
              "Review who holds broad roles regularly; permission grants accumulate and are rarely removed voluntarily.",
              "Separate duties: whoever administers encryption keys should not also administer the data those keys protect.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "associate-cloud-engineer",
        note: "One of the heaviest topics. Expect several questions on choosing the correct predefined role and the right level of the hierarchy.",
      },
      {
        cert: "professional-cloud-security-engineer",
        note: "Examined in far greater depth: conditions, federation, impersonation chains, custom role design and separation of duties.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Organisation-wide access design, policy inheritance strategy and preventative guardrails.",
      },
      {
        cert: "professional-cloud-developer",
        note: "Service account identity for applications, workload identity and least privilege from the code's perspective.",
      },
    ],
    questionTopic: "iam",
    related: ["cloud-kms", "security-command-center", "vpc", "cloud-fundamentals"],
  },

  {
    slug: "cloud-kms",
    title: "Encryption and Key Management",
    category: "security",
    summary:
      "Default encryption, customer-managed keys, rotation and secret handling — and the operational consequences of each choice.",
    oneLiner:
      "Everything is encrypted by default; key management is about deciding who controls the key, and therefore who can switch access off.",
    readingWords: 900,
    updated: "2026-08-24",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "All data stored on Google Cloud is encrypted at rest automatically, with keys the provider manages. This happens whether or not you configure anything, and it requires no action from you.",
          },
          {
            type: "p",
            text: "Key management services exist for the cases where default encryption is not sufficient — usually because a regulation, a contract or an internal policy requires that your organisation controls the key rather than the provider.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Controlling the key gives you a control that permissions alone do not: the ability to make data unreadable everywhere at once by disabling or destroying the key. That is a meaningful guarantee for regulated data and for offboarding.",
          },
          {
            type: "p",
            text: "It also carries real risk. If you destroy a key, the data encrypted with it is unrecoverable — including your backups. Taking control of keys means taking responsibility for a new category of outage, and exams test whether you understand that trade-off rather than treating customer-managed keys as strictly better.",
          },
        ],
      },
      {
        heading: "The encryption options",
        body: [
          {
            type: "table",
            head: ["Option", "Who holds the key", "When it is the right answer"],
            rows: [
              [
                "Default encryption",
                "The provider, entirely.",
                "The default. Sufficient for most data and requires no operational work.",
              ],
              [
                "Customer-managed keys (CMEK)",
                "You, in the platform's key management service.",
                "A policy or regulation requires your organisation to control the key lifecycle and be able to revoke access.",
              ],
              [
                "Customer-supplied keys (CSEK)",
                "You, entirely outside the platform, supplied with each request.",
                "The key may never be stored by the provider at all. Operationally demanding and narrowly applicable.",
              ],
              [
                "Hardware security module backing",
                "You, with keys held in certified hardware.",
                "Compliance regimes that mandate hardware-protected key storage.",
              ],
            ],
          },
          {
            type: "note",
            text: "A useful test for exam questions: if the scenario says the customer must be able to revoke access to data independently of the provider, or must control the key lifecycle, it is asking for customer-managed keys. If it only says data must be encrypted at rest, default encryption already satisfies it and choosing CMEK is unnecessary complexity.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Key ring** — a container grouping keys in a location. Keys cannot be moved between rings or regions afterwards.",
              "**Key version** — keys have versions; rotation creates a new version for encrypting new data while old versions remain available to decrypt existing data.",
              "**Rotation** — replacing the active key version on a schedule, limiting how much data any single version protects.",
              "**Destruction and scheduled deletion** — destroying a version is deliberately delayed, giving a window to recover from a mistake.",
              "**Envelope encryption** — data is encrypted with a data key, and that data key is itself encrypted by the key management key. This is what makes rotation efficient at scale.",
              "**Separation of duties** — the identity administering keys should be distinct from the identity administering the data. This is a control the exams expect you to apply.",
              "**Encryption in transit** — separate from all of the above and applied automatically to traffic across the provider's network and to its APIs.",
            ],
          },
        ],
      },
      {
        heading: "Secrets are a different problem",
        body: [
          {
            type: "p",
            text: "Key management protects data at rest. Secret management handles the credentials your application needs at runtime — API tokens, database passwords, third-party keys. These are related but distinct problems and the exams keep them distinct.",
          },
          {
            type: "ul",
            items: [
              "Store secrets in a dedicated secret management service, never in source control, container images or environment variables baked into a build.",
              "Grant access to a specific secret version using IAM, so each workload reads only what it needs.",
              "Version secrets so rotation can happen without a simultaneous change across every consumer.",
              "Have the application fetch secrets at startup or on demand rather than receiving them through the deployment pipeline.",
              "Audit access — knowing which identity read which secret and when is often a compliance requirement.",
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
              "Encrypting a storage bucket or database with a customer-managed key to satisfy a regulatory requirement.",
              "Rotating keys automatically on a schedule to limit exposure from any single version.",
              "Revoking access to a dataset organisation-wide by disabling the key protecting it.",
              "Keeping key administration in a separate project managed by a security team.",
              "Storing database credentials in a secret manager and granting access only to the service that needs them.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-cloud-security-engineer",
        note: "A core domain. CMEK, CSEK, rotation, separation of duties and the operational consequences are all directly tested.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Appears in compliance scenarios and in questions about designing for data sovereignty.",
      },
      {
        cert: "associate-cloud-engineer",
        note: "Conceptual understanding of default encryption and when customer-managed keys are required.",
      },
      {
        cert: "professional-cloud-developer",
        note: "Secret management from the application's perspective, and avoiding credentials in images or code.",
      },
    ],
    questionTopic: "security",
    related: ["iam", "security-command-center", "cloud-storage", "cloud-sql"],
  },

  {
    slug: "security-command-center",
    title: "Security Posture and Threat Detection",
    category: "security",
    summary:
      "Finding misconfigurations, detecting threats, understanding audit logs and running a detection and response capability.",
    oneLiner:
      "Posture management continuously asks whether your environment is configured safely; threat detection asks whether something bad is happening right now.",
    readingWords: 1000,
    updated: "2026-08-25",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Security posture management continuously inspects your environment for configurations that are dangerous — a publicly readable bucket, an overly permissive firewall rule, a service account with excessive rights, an unencrypted disk — and reports them as findings.",
          },
          {
            type: "p",
            text: "Threat detection is a different activity. It analyses activity rather than configuration, looking for behaviour that suggests something is actively wrong: credentials used from an unexpected location, unusual data access, or a workload behaving like it has been compromised.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Cloud environments drift. Someone opens a firewall rule to debug a problem at midnight and never closes it. A bucket is made public for a demonstration. A broad role is granted temporarily and never revoked. None of these are attacks, and all of them create the conditions for one.",
          },
          {
            type: "p",
            text: "Detection matters because prevention is never complete. Every organisation eventually has an incident; the difference between organisations is how quickly they notice and how well they can reconstruct what happened.",
          },
        ],
      },
      {
        heading: "Preventative, detective and responsive controls",
        body: [
          {
            type: "table",
            head: ["Control type", "What it does", "Example"],
            rows: [
              [
                "Preventative",
                "Stops the dangerous thing from being possible at all.",
                "An organisation policy that forbids creating publicly accessible storage anywhere in the estate.",
              ],
              [
                "Detective",
                "Tells you the dangerous thing exists or happened.",
                "A finding reporting a bucket that is publicly readable.",
              ],
              [
                "Responsive",
                "Acts to contain or remediate.",
                "Automation that removes public access and notifies the owner.",
              ],
            ],
          },
          {
            type: "note",
            text: "Exam questions often hinge on this distinction. If the requirement is that something must never be possible, the answer is a preventative control such as organisation policy — not a detection rule that reports it afterwards.",
          },
        ],
      },
      {
        heading: "Audit logs and what each one records",
        body: [
          {
            type: "ul",
            items: [
              "**Admin activity logs** — record every change to configuration or metadata. Always on, cannot be disabled, and free of charge. This is your record of who changed what.",
              "**Data access logs** — record reads and writes of data itself. Mostly disabled by default because the volume is enormous and it costs money to retain. Must be explicitly enabled for the services where you need it.",
              "**System event logs** — record actions the platform takes automatically, such as a live migration.",
              "**Policy denied logs** — record when a request was blocked by a security policy, which is often the first signal of a misconfiguration or an attempt.",
            ],
          },
          {
            type: "p",
            text: "A very common exam scenario: an investigation needs to know who read a particular file, and the answer is that data access logs must be enabled in advance. Admin activity logs will show who changed the bucket's permissions but not who read its contents.",
          },
        ],
      },
      {
        heading: "Running detection and response",
        body: [
          {
            type: "diagram",
            caption: "The operational loop of a security operations capability.",
            steps: [
              "Collect — ingest logs and telemetry from cloud, endpoints and network",
              "Normalise — map different sources into a common schema so rules work across them",
              "Detect — evaluate rules and analytics against the normalised data",
              "Triage — assess findings, discard false positives, escalate what matters",
              "Investigate — pivot across entities and reconstruct a timeline",
              "Respond — contain, eradicate, recover, then improve the detection that missed it",
            ],
          },
          {
            type: "p",
            text: "Most detection failures trace back to the first two steps rather than the rules. If a log source was never onboarded, or is parsed incorrectly, detections that depend on it silently never fire — and nothing alerts you to the absence.",
          },
        ],
      },
      {
        heading: "Common use cases",
        body: [
          {
            type: "ul",
            items: [
              "Continuously scanning for publicly exposed storage, permissive firewall rules and over-privileged accounts.",
              "Alerting when an unusual identity accesses sensitive data or a credential is used from a new country.",
              "Exporting audit logs to long-term storage for compliance retention.",
              "Building an asset inventory to answer what exists across every project.",
              "Automating remediation for well-understood findings, such as removing public access from a bucket.",
              "Reconstructing an incident timeline across identity, network and application logs.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-cloud-security-engineer",
        note: "The security operations domain: posture management, audit log types, findings triage and incident response.",
      },
      {
        cert: "security-operations-engineer",
        note: "Central to the exam — detection engineering, investigation, response automation and telemetry quality.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Appears as a design requirement for compliance, auditability and operational readiness.",
      },
      {
        cert: "cloud-digital-leader",
        note: "Conceptual: why continuous monitoring exists and what shared responsibility means in practice.",
      },
    ],
    questionTopic: "security",
    related: ["iam", "cloud-kms", "cloud-monitoring", "vpc"],
  },
];
