import type { PracticeQuestion } from "@/types";

const ACE = "associate-cloud-engineer";
const PCA = "professional-cloud-architect";
const PCD = "professional-cloud-developer";
const PCSE = "professional-cloud-security-engineer";
const PCDE = "professional-cloud-devops-engineer";
const SOE = "security-operations-engineer";
const PCNE = "professional-cloud-network-engineer";

export const securityOpsQuestions: PracticeQuestion[] = [
  /* --------------------------------- IAM -------------------------------- */
  {
    id: "iam-001",
    topic: "iam",
    certs: [ACE, PCSE],
    difficulty: "medium",
    stem: "An analyst needs to read objects in one Cloud Storage bucket and nothing else. Which grant follows least privilege?",
    options: [
      { id: "a", text: "Storage Object Viewer on that specific bucket" },
      { id: "b", text: "Storage Object Viewer on the project" },
      { id: "c", text: "Storage Admin on that specific bucket" },
      { id: "d", text: "Viewer on the project" },
    ],
    correct: "a",
    concept: "Least privilege is both the narrowest role and the narrowest scope",
    explanation:
      "Storage Object Viewer grants read access to objects, which is exactly what the analyst needs. Granting it on the specific bucket rather than the project limits the access to that one resource. Getting both the role and the scope right is what least privilege means, and questions in this area always vary both.",
    whyWrong: {
      b: "The role is correct but the scope is too wide. Granting it at project level gives read access to every bucket in the project, including ones created later.",
      c: "Storage Admin permits creating, modifying and deleting buckets and objects. The analyst only needs to read, so this grants far more than required.",
      d: "The basic Viewer role grants read access across every service in the project, not just storage. It is dramatically broader than the requirement.",
    },
    learnMore: "iam",
  },
  {
    id: "iam-002",
    topic: "iam",
    certs: [PCSE, PCD, PCA],
    difficulty: "hard",
    stem: "An application running outside Google Cloud, in another provider's environment, needs to call Google Cloud APIs. What is the recommended authentication approach?",
    options: [
      { id: "a", text: "Workload identity federation using the external provider's identity" },
      { id: "b", text: "A downloaded service account key stored in the application's configuration" },
      { id: "c", text: "A user account's credentials shared with the application" },
      { id: "d", text: "An API key with no restrictions" },
    ],
    correct: "a",
    concept: "Workload identity federation eliminates long-lived service account keys",
    explanation:
      "Workload identity federation lets an external workload present a token from its own identity provider and exchange it for short-lived Google Cloud credentials. No service account key is ever created or stored, which removes the credential that would otherwise need protecting, rotating and monitoring. This is the recommended pattern for workloads outside the platform.",
    whyWrong: {
      b: "A downloaded key is a long-lived credential that works from anywhere. If it leaks — committed to a repository, exposed in a log, present in a backup — it grants access indefinitely until someone notices and revokes it.",
      c: "Sharing a person's credentials with software destroys accountability, breaks when that person leaves, and typically grants far more access than the application needs.",
      d: "API keys identify a project for quota purposes but do not authenticate a principal, and an unrestricted key can be used by anyone who obtains it. They are not an authentication mechanism for API access requiring authorisation.",
    },
    learnMore: "iam",
  },
  {
    id: "iam-003",
    topic: "iam",
    certs: [ACE, PCSE],
    difficulty: "medium",
    stem: "A contractor needs elevated access for a two-week engagement, after which access must end automatically without anyone remembering to remove it. What should be used?",
    options: [
      { id: "a", text: "An IAM condition with an expiry timestamp on the role binding" },
      { id: "b", text: "A custom role containing only the permissions needed" },
      { id: "c", text: "A calendar reminder to revoke the binding manually" },
      { id: "d", text: "A service account key that is deleted after two weeks" },
    ],
    correct: "a",
    concept: "IAM conditions can bind access to time, resource names or other attributes",
    explanation:
      "An IAM condition attached to a role binding can include an expiry timestamp, after which the binding stops granting access automatically. This satisfies the requirement that removal must not depend on anyone remembering, which is the specific problem the question describes.",
    whyWrong: {
      b: "A custom role narrows what the contractor can do, which is good practice, but it does nothing about when the access ends. The grant would persist indefinitely.",
      c: "This is the manual process the requirement explicitly rules out. Forgotten revocations are one of the most common causes of accumulated excess access.",
      d: "The contractor is a person, not a workload, so a service account key is inappropriate. It also relies on someone remembering to delete it, which is the same failure mode.",
    },
    learnMore: "iam",
  },
  {
    id: "iam-004",
    topic: "iam",
    certs: [PCSE, PCA],
    difficulty: "hard",
    stem: "A security review requires that the team administering encryption keys must not be able to read the data those keys protect. What principle does this enforce and how is it implemented?",
    options: [
      {
        id: "a",
        text: "Separation of duties — grant key administration and data access roles to different identities, typically in different projects",
      },
      { id: "b", text: "Defence in depth — add a second encryption layer above the first" },
      { id: "c", text: "Least privilege — grant the key administrators a read-only data role" },
      { id: "d", text: "Zero trust — require multi-factor authentication for key administrators" },
    ],
    correct: "a",
    concept: "Separation of duties prevents a single identity holding conflicting powers",
    explanation:
      "Separation of duties means splitting powers so that no single identity can both control a security mechanism and benefit from bypassing it. In practice, key administration roles are granted to a security team, often with the key ring held in a separate project, while data access roles are granted to the teams that use the data. Neither group holds both.",
    whyWrong: {
      b: "Additional encryption layers do not stop a key administrator from also holding data access. The problem is a permission combination, not insufficient cryptography.",
      c: "Granting key administrators any data role directly contradicts the requirement, which is that they must not be able to read the data at all.",
      d: "Multi-factor authentication strengthens how an identity proves itself. It does not change what that identity is permitted to do once authenticated.",
    },
    learnMore: "cloud-kms",
  },
  {
    id: "iam-005",
    topic: "iam",
    certs: [ACE, PCSE],
    difficulty: "easy",
    stem: "Which practice should be followed when granting access to a group of twelve engineers who all need the same permissions?",
    options: [
      { id: "a", text: "Grant the role to a Google group containing the engineers" },
      { id: "b", text: "Grant the role to each engineer's account individually" },
      { id: "c", text: "Create a shared service account the engineers all use" },
      { id: "d", text: "Grant the role to the domain so all employees receive it" },
    ],
    correct: "a",
    concept: "Grant to groups so access follows role changes automatically",
    explanation:
      "Granting to a group means access is managed by group membership. When someone joins the team they gain access automatically, and when they leave, removing them from the group removes their access everywhere it was granted through that group. This makes access reviews tractable and reduces the chance of orphaned permissions.",
    whyWrong: {
      b: "Twelve individual bindings must each be maintained separately. When someone leaves, every binding they hold must be found and removed, which is exactly how stale access accumulates.",
      c: "A shared account destroys accountability — audit logs show the service account rather than the person who acted. Shared credentials are also impossible to rotate cleanly.",
      d: "Granting to the entire domain gives access to every employee, including those with no need for it. This is a serious over-grant.",
    },
    learnMore: "iam",
  },
  {
    id: "iam-006",
    topic: "iam",
    certs: [PCSE, PCA],
    difficulty: "medium",
    stem: "An auditor asks which identity read a specific object in a Cloud Storage bucket last month. The team finds no such record. What was most likely not configured?",
    options: [
      { id: "a", text: "Data access audit logs for Cloud Storage" },
      { id: "b", text: "Admin activity audit logs" },
      { id: "c", text: "Object versioning on the bucket" },
      { id: "d", text: "Uniform bucket-level access" },
    ],
    correct: "a",
    concept: "Data access logs record reads and must be enabled deliberately",
    explanation:
      "Data access audit logs record reads and writes of data itself, and they are largely disabled by default because the volume and cost are substantial. If they were not enabled in advance, there is no record of who read an object — and the logs cannot be produced retrospectively.",
    whyWrong: {
      b: "Admin activity logs are always on and cannot be disabled, so they would exist. However, they record configuration changes such as permission modifications, not data reads.",
      c: "Versioning preserves previous versions of objects. It records nothing about who accessed them.",
      d: "Uniform bucket-level access changes how permissions are evaluated across the bucket. It is an access control setting, not a logging one.",
    },
    learnMore: "security-command-center",
  },
  {
    id: "iam-007",
    topic: "iam",
    certs: [PCD, PCSE],
    difficulty: "medium",
    stem: "A Compute Engine instance runs an application that needs to publish messages to a Pub/Sub topic. What is the correct configuration?",
    options: [
      {
        id: "a",
        text: "Attach a dedicated service account to the instance and grant it the Pub/Sub Publisher role on the topic",
      },
      { id: "b", text: "Use the default Compute Engine service account with the Editor role" },
      { id: "c", text: "Store a service account key file on the instance's persistent disk" },
      { id: "d", text: "Configure the application to use the developer's personal credentials" },
    ],
    correct: "a",
    concept: "Attach a purpose-specific service account and grant only the role it needs",
    explanation:
      "Attaching a service account to the instance means the application obtains credentials automatically from the metadata service, with no key file involved. Granting only the Publisher role on the specific topic follows least privilege: the application can publish where it needs to and do nothing else.",
    whyWrong: {
      b: "The default service account with Editor can modify almost everything in the project. If the application is compromised, so is the entire project. This is a well-known anti-pattern.",
      c: "A key file on disk is unnecessary when the instance can obtain credentials automatically, and it introduces a long-lived credential that could be copied off the disk or a snapshot of it.",
      d: "Personal credentials in an application break accountability, stop working when the person leaves, and typically carry far broader access than the application needs.",
    },
    learnMore: "iam",
  },
  {
    id: "iam-008",
    topic: "iam",
    certs: [PCSE],
    difficulty: "hard",
    stem: "A predefined role grants twelve permissions but a workload only requires three of them, and no narrower predefined role exists. What is the appropriate action?",
    options: [
      { id: "a", text: "Create a custom role containing only the three required permissions" },
      { id: "b", text: "Grant the predefined role and document the excess permissions as accepted risk" },
      { id: "c", text: "Grant the basic Viewer role instead, since it is read-only" },
      { id: "d", text: "Grant the predefined role with an IAM condition restricting it by time" },
    ],
    correct: "a",
    concept: "Custom roles exist for when no predefined role is narrow enough",
    explanation:
      "Custom roles let you define exactly the permission set a workload needs. When no predefined role fits closely and the excess permissions are meaningful, a custom role is the correct answer. The trade-off is that you take on maintaining it as services change and new permissions appear.",
    whyWrong: {
      b: "Accepting nine unnecessary permissions when a precise alternative exists is not a considered risk decision; it is avoidance. The exam expects least privilege where it is achievable.",
      c: "Viewer is a basic role spanning every service in the project. It is far broader than the predefined role being replaced, not narrower.",
      d: "A time condition limits when the role applies but not what it permits. During the permitted window the workload still holds all twelve permissions.",
    },
    learnMore: "iam",
  },
  {
    id: "iam-009",
    topic: "iam",
    certs: [ACE, PCA],
    difficulty: "medium",
    stem: "A new project must be prevented from ever having a Cloud Storage bucket made publicly accessible, regardless of what permissions its administrators hold. What achieves this?",
    options: [
      { id: "a", text: "An organisation policy constraint restricting public access, applied above the project" },
      { id: "b", text: "Removing the Storage Admin role from all project members" },
      { id: "c", text: "Enabling uniform bucket-level access on every bucket" },
      { id: "d", text: "A Cloud Monitoring alert that fires when a bucket becomes public" },
    ],
    correct: "a",
    concept: "Organisation policy is a preventative control that binds even project administrators",
    explanation:
      "Organisation policy constraints are evaluated separately from IAM and can block an action regardless of what roles the actor holds. Applied at the organisation or folder level, the constraint prevents public access from ever being configured in the projects beneath it, which is what the requirement demands.",
    whyWrong: {
      b: "Project administrators can grant roles, including restoring the one you removed. IAM alone cannot prevent an administrator from doing something they can grant themselves permission to do.",
      c: "Uniform bucket-level access changes how permissions are evaluated but does not prevent granting public access through IAM at the bucket level.",
      d: "An alert is a detective control that tells you after it has happened. The requirement is that it must not be possible.",
    },
    learnMore: "iam",
  },

  /* ------------------------------- SECURITY ----------------------------- */
  {
    id: "sec-001",
    topic: "security",
    certs: [PCSE, PCA],
    difficulty: "medium",
    stem: "A regulation requires that the organisation must be able to render a dataset permanently unreadable on demand, independently of the cloud provider. What should be implemented?",
    options: [
      { id: "a", text: "Customer-managed encryption keys, so the key can be disabled or destroyed" },
      { id: "b", text: "Default encryption at rest, which is already enabled" },
      { id: "c", text: "Object versioning with a short retention lifecycle" },
      { id: "d", text: "A firewall rule blocking all access to the storage bucket" },
    ],
    correct: "a",
    concept: "Controlling the key is what enables cryptographic revocation of access",
    explanation:
      "With customer-managed keys, your organisation controls the key lifecycle. Disabling or destroying the key makes every object encrypted with it unreadable, everywhere, immediately — including copies and backups. This capability is exactly what regulations demanding independent revocation are asking for.",
    whyWrong: {
      b: "Default encryption protects data at rest but the provider holds the key. Your organisation has no independent mechanism to revoke readability.",
      c: "Versioning and lifecycle rules control retention and deletion of objects. They provide no cryptographic guarantee, and deletion is not the same as rendering data unreadable across all copies.",
      d: "Blocking network access prevents reaching the data through that path but the data remains intact and readable through any other path. It is not a data protection control.",
    },
    learnMore: "cloud-kms",
  },
  {
    id: "sec-002",
    topic: "security",
    certs: [PCSE, PCD],
    difficulty: "medium",
    stem: "Where should an application's database password be stored?",
    options: [
      { id: "a", text: "In a secret management service, retrieved by the application at runtime" },
      { id: "b", text: "In an environment variable baked into the container image" },
      { id: "c", text: "In a configuration file committed to the source repository" },
      { id: "d", text: "In the application's source code, obfuscated" },
    ],
    correct: "a",
    concept: "Secrets belong in a dedicated service with access control, versioning and audit",
    explanation:
      "A secret management service stores the credential encrypted, controls access through IAM, supports versioning for rotation, and records who accessed it. Fetching it at runtime means the secret never exists in the image, the repository or the deployment configuration.",
    whyWrong: {
      b: "Anything baked into an image is visible to anyone who can pull that image, and it is present in every registry copy and every layer cache. Rotating it requires rebuilding and redeploying.",
      c: "A secret in source control is visible to everyone with repository access and remains in the history forever, even after being removed in a later commit.",
      d: "Obfuscation is not encryption. Anyone with the binary or source can recover the value, and the credential is still distributed everywhere the code goes.",
    },
    learnMore: "cloud-kms",
  },
  {
    id: "sec-003",
    topic: "security",
    certs: [PCSE, SOE],
    difficulty: "hard",
    stem: "A security team must be alerted when a service account credential is used from an unusual geographic location. Which type of control is this, and what is required?",
    options: [
      {
        id: "a",
        text: "A detective control requiring audit log analysis with anomaly detection over authentication events",
      },
      { id: "b", text: "A preventative control implemented through an organisation policy constraint" },
      { id: "c", text: "A responsive control implemented through automated key rotation" },
      { id: "d", text: "A preventative control implemented through a VPC firewall rule" },
    ],
    correct: "a",
    concept: "Detecting anomalous behaviour requires analysing activity logs, not configuration",
    explanation:
      "Alerting on unusual credential use is detection: it identifies that something suspicious is happening, rather than preventing it. Implementing it means analysing authentication and API activity in audit logs and applying anomaly detection to identify locations that deviate from established behaviour.",
    whyWrong: {
      b: "Organisation policy constrains resource configuration. It cannot evaluate where a credential is being used from at the moment of use.",
      c: "Rotating keys reduces the window in which a leaked credential is useful, which is valuable, but rotation is not a detection mechanism and produces no alert.",
      d: "Firewall rules control network traffic to your resources. API calls to cloud services do not traverse your VPC firewall, so this cannot detect or block them.",
    },
    learnMore: "security-command-center",
  },
  {
    id: "sec-004",
    topic: "security",
    certs: [PCSE, PCNE],
    difficulty: "hard",
    stem: "An organisation wants to ensure sensitive data in a project cannot be copied to storage buckets outside the organisation, even by an identity with valid permissions. What addresses this?",
    options: [
      { id: "a", text: "A service perimeter restricting data movement out of the protected projects" },
      { id: "b", text: "Removing the Storage Admin role from all users in the project" },
      { id: "c", text: "Enabling data access audit logs on all buckets" },
      { id: "d", text: "Applying customer-managed encryption keys to the buckets" },
    ],
    correct: "a",
    concept: "Service perimeters address exfiltration by an authorised identity",
    explanation:
      "A service perimeter creates a boundary around a set of projects and restricts whether data may move across it, independently of IAM. This addresses the specific threat where an identity has legitimate permissions but uses them to copy data somewhere it should not go — a case that permissions alone cannot solve, because the permission is valid.",
    whyWrong: {
      b: "Removing roles restricts who can act, but the scenario explicitly concerns an identity that has valid permissions. Someone must retain access for the system to function.",
      c: "Audit logs record that the copy happened. They do not prevent it, and the data is already outside the organisation by the time anyone reads them.",
      d: "Customer-managed keys control decryption. An authorised identity that can read the data can read the plaintext and write it elsewhere.",
    },
    learnMore: "security-command-center",
  },
  {
    id: "sec-005",
    topic: "security",
    certs: [SOE],
    difficulty: "hard",
    stem: "A detection rule for a known attack technique has never fired, although the technique has been observed in the environment during a red team exercise. What should be investigated first?",
    options: [
      {
        id: "a",
        text: "Whether the required log source is being ingested and parsed into the expected fields",
      },
      { id: "b", text: "Whether the rule's severity level is set too low" },
      { id: "c", text: "Whether analysts are acknowledging alerts too quickly" },
      { id: "d", text: "Whether the retention period for the data is too short" },
    ],
    correct: "a",
    concept: "Most detection failures are data problems, not rule problems",
    explanation:
      "A rule can only match data it receives in the form it expects. If the log source was never onboarded, or is parsed into different field names than the rule references, the rule silently never matches. Nothing alerts you to this absence, which is why validating data coverage is the first step when a detection fails to fire.",
    whyWrong: {
      b: "Severity affects how an alert is prioritised and routed once it fires. A rule that never fires produces no alert to prioritise.",
      c: "Analyst behaviour affects what happens after an alert appears. The problem here is that no alert was generated at all.",
      d: "Short retention limits how far back you can search historically. It does not prevent a rule from firing on activity happening now.",
    },
    learnMore: "security-command-center",
  },
  {
    id: "sec-006",
    topic: "security",
    certs: [PCSE, PCA],
    difficulty: "medium",
    stem: "A compliance requirement states that customer data must remain physically within the European Union. Which combination best supports this?",
    options: [
      {
        id: "a",
        text: "Select EU regions for all resources and apply an organisation policy constraining resource locations",
      },
      { id: "b", text: "Select EU regions when creating each resource and rely on team discipline" },
      { id: "c", text: "Encrypt all data with customer-managed keys stored in an EU key ring" },
      { id: "d", text: "Use a multi-region configuration for maximum durability" },
    ],
    correct: "a",
    concept: "Data residency needs both correct placement and a preventative guardrail",
    explanation:
      "Choosing EU regions places the data correctly, and an organisation policy constraining resource locations prevents anyone from creating resources elsewhere, including by accident. A compliance requirement needs an enforceable control rather than an intention, and the policy constraint is what makes it enforceable.",
    whyWrong: {
      b: "Relying on discipline means the requirement is violated the first time someone accepts a default region. Compliance controls must not depend on every person being careful every time.",
      c: "Encryption protects confidentiality but does not control where data is physically stored. Data encrypted with an EU-held key can still reside outside the EU.",
      d: "A multi-region configuration may span locations outside the EU depending on which one is chosen, which could directly violate the requirement.",
    },
    learnMore: "cloud-kms",
  },

  /* -------------------------------- DEVOPS ------------------------------ */
  {
    id: "dev-001",
    topic: "devops",
    certs: [PCDE, PCD],
    difficulty: "medium",
    stem: "A pipeline rebuilds the application container from source separately for staging and production. What risk does this introduce?",
    options: [
      {
        id: "a",
        text: "The artefact deployed to production is not the artefact that was tested in staging",
      },
      { id: "b", text: "Build times increase, delaying releases" },
      { id: "c", text: "The container registry consumes more storage" },
      { id: "d", text: "Staging and production may run different operating systems" },
    ],
    correct: "a",
    concept: "Build once, promote the same artefact through every environment",
    explanation:
      "Rebuilding produces a different artefact, even from identical source, because dependencies, base images and build tooling can resolve differently between runs. The result is that production runs something that was never actually tested. Building once and promoting the same immutable image eliminates this class of problem entirely.",
    whyWrong: {
      b: "Longer build times are a real inefficiency but a minor one. The correctness problem is far more serious and is the reason the practice is discouraged.",
      c: "Extra registry storage is a trivial cost and not the reason this pattern is considered an anti-pattern.",
      d: "Different operating systems are possible but are a symptom of the same underlying issue — that the two builds are not guaranteed to be identical.",
    },
    learnMore: "cloud-build-and-cicd",
  },
  {
    id: "dev-002",
    topic: "devops",
    certs: [PCDE],
    difficulty: "hard",
    stem: "A service has consumed its entire error budget for the quarter with three weeks remaining. The team has a large feature release ready. According to SRE practice, what should happen?",
    options: [
      {
        id: "a",
        text: "Pause risky feature releases and direct engineering effort to reliability work until the budget recovers",
      },
      { id: "b", text: "Release the feature but monitor it more closely than usual" },
      { id: "c", text: "Increase the SLO target so the budget is no longer exhausted" },
      { id: "d", text: "Release the feature, since error budgets are advisory rather than binding" },
    ],
    correct: "a",
    concept: "An error budget is a pre-agreed policy that governs release decisions",
    explanation:
      "The purpose of an error budget is to settle the reliability-versus-features argument in advance, when nobody is under pressure. When the budget is exhausted, the agreed response is to stop taking risks with the service and invest in reliability until it recovers. Following the policy is the point; overriding it whenever it becomes inconvenient makes it meaningless.",
    whyWrong: {
      b: "Closer monitoring detects problems faster but does not reduce the risk of introducing them. The service has already exceeded the failure its users were promised.",
      c: "Adjusting the target because you missed it is redefining success after the fact. The SLO should reflect what users need, and changing it to avoid the consequence removes the mechanism's value.",
      d: "Treating the budget as advisory defeats its purpose. It exists precisely to be binding, which is what makes the prior agreement worth making.",
    },
    learnMore: "cloud-monitoring",
  },
  {
    id: "dev-003",
    topic: "devops",
    certs: [PCDE, PCD],
    difficulty: "medium",
    stem: "A team wants to expose a risky change to a small share of real production traffic and automatically roll back if error rates rise. Which deployment strategy is this?",
    options: [
      { id: "a", text: "Canary release" },
      { id: "b", text: "Blue/green deployment" },
      { id: "c", text: "Rolling update" },
      { id: "d", text: "Recreate deployment" },
    ],
    correct: "a",
    concept: "Canary releases validate against real traffic before full rollout",
    explanation:
      "A canary release directs a small percentage of production traffic to the new version while the rest continues to the current one. Metrics from the canary are compared against the baseline, and the rollout either proceeds or reverts automatically. This matches the description precisely.",
    whyWrong: {
      b: "Blue/green switches all traffic at once after the new version is ready. It gives fast rollback but does not expose a small share first, so problems affect everyone immediately.",
      c: "A rolling update gradually replaces instances, so exposure does increase progressively, but there is no traffic-percentage control or automatic comparison against a baseline.",
      d: "Recreate stops the old version entirely before starting the new one, producing downtime and exposing all users to the new version at once.",
    },
    learnMore: "cloud-build-and-cicd",
  },
  {
    id: "dev-004",
    topic: "devops",
    certs: [PCDE],
    difficulty: "medium",
    stem: "After a production incident, what is the primary purpose of a blameless post-mortem?",
    options: [
      {
        id: "a",
        text: "To identify the systemic conditions that allowed the failure and produce concrete follow-up actions",
      },
      { id: "b", text: "To determine which team or individual was responsible for the outage" },
      { id: "c", text: "To produce a report for executives demonstrating that the issue is closed" },
      { id: "d", text: "To calculate the financial impact of the downtime for reporting" },
    ],
    correct: "a",
    concept: "Post-mortems improve systems, not accountability records",
    explanation:
      "A blameless post-mortem examines why the system allowed the failure to happen and to go unnoticed for as long as it did, then produces specific actions to prevent recurrence. Removing blame is not politeness — it is what makes people describe what actually happened, including their own mistakes, which is the only way to find the real contributing factors.",
    whyWrong: {
      b: "Attributing fault is precisely what blameless practice excludes. Where people expect blame, they describe events defensively and the most useful information never surfaces.",
      c: "Reporting to executives may be an output, but treating the post-mortem as a closure formality means the follow-up actions get written and never done.",
      d: "Financial impact may be recorded separately, but it tells you nothing about how to prevent the failure recurring.",
    },
    learnMore: "cloud-monitoring",
  },
  {
    id: "dev-005",
    topic: "devops",
    certs: [PCDE, PCSE],
    difficulty: "medium",
    stem: "A pipeline should prevent container images with known critical vulnerabilities from reaching production. What is the most effective place to enforce this?",
    options: [
      {
        id: "a",
        text: "A scan gate in the pipeline plus a deploy-time policy that only admits images meeting the policy",
      },
      { id: "b", text: "A weekly report of vulnerabilities sent to the development team" },
      { id: "c", text: "A manual review of dependencies before each release" },
      { id: "d", text: "Scanning images already running in production and patching them in place" },
    ],
    correct: "a",
    concept: "Enforce at both build and admission so the control cannot be bypassed",
    explanation:
      "A scan gate in the pipeline catches vulnerabilities before an image is published, and a deploy-time admission policy ensures nothing that bypassed the pipeline can be deployed anyway. Together they make the control enforceable rather than advisory, which is what the requirement to prevent deployment demands.",
    whyWrong: {
      b: "A report is a detective control. It informs people after the fact and relies on them acting, which does not prevent deployment.",
      c: "Manual review does not scale, is inconsistent, and is routinely skipped under release pressure. It also cannot cover transitive dependencies reliably.",
      d: "Patching in production means the vulnerable image already reached production, which is what the requirement is trying to prevent. It also conflicts with immutable infrastructure practice.",
    },
    learnMore: "cloud-build-and-cicd",
  },

  /* ------------------------------ MONITORING ---------------------------- */
  {
    id: "mon-001",
    topic: "monitoring",
    certs: [PCDE, PCA],
    difficulty: "medium",
    stem: "An on-call engineer receives frequent alerts for high CPU on individual instances, none of which affect users. What is the appropriate change?",
    options: [
      {
        id: "a",
        text: "Alert on user-facing symptoms such as error rate and latency instead, and demote CPU to a dashboard metric",
      },
      { id: "b", text: "Raise the CPU threshold so the alert fires less often" },
      { id: "c", text: "Route the CPU alerts to a different engineer to spread the load" },
      { id: "d", text: "Increase the instance sizes so CPU utilisation stays lower" },
    ],
    correct: "a",
    concept: "Alert on symptoms users experience, not on causes that may be harmless",
    explanation:
      "High CPU is a cause, and it is only a problem when it produces an effect users notice. Alerting on symptoms — errors, latency, failed requests — means every page corresponds to something that actually matters. CPU remains valuable as a diagnostic signal on a dashboard once you are already investigating.",
    whyWrong: {
      b: "A higher threshold reduces the volume but keeps alerting on the wrong thing. You will still be paged for harmless spikes and may now miss genuinely harmful ones.",
      c: "Redistributing noise does not reduce it. Two engineers are now being woken for alerts that require no action.",
      d: "Larger instances lower utilisation and therefore silence the alert, but at real cost and without addressing the fact that the alert was measuring the wrong thing.",
    },
    learnMore: "cloud-monitoring",
  },
  {
    id: "mon-002",
    topic: "monitoring",
    certs: [PCD, PCDE],
    difficulty: "medium",
    stem: "A request to a service takes four seconds and the team needs to know which downstream component is responsible. Which telemetry answers this most directly?",
    options: [
      { id: "a", text: "A distributed trace of the request" },
      { id: "b", text: "Aggregate latency metrics for the service" },
      { id: "c", text: "Application logs from the front-end service" },
      { id: "d", text: "CPU and memory metrics for each instance" },
    ],
    correct: "a",
    concept: "Traces show where time is spent across service boundaries",
    explanation:
      "A distributed trace records each span of work as a request moves through services, showing exactly how long each step took and where the time accumulated. That is precisely the question being asked, and no other telemetry type answers it as directly.",
    whyWrong: {
      b: "Aggregate metrics tell you the service is slow and how often, but they cannot attribute the time to a particular downstream call.",
      c: "Logs from the front end record events at that service. Correlating them manually across several services to reconstruct timing is exactly the work tracing automates.",
      d: "Resource metrics show whether a machine is under pressure. A slow downstream dependency produces high latency with entirely normal CPU and memory.",
    },
    learnMore: "cloud-monitoring",
  },
  {
    id: "mon-003",
    topic: "monitoring",
    certs: [PCDE],
    difficulty: "hard",
    stem: "A service has an SLO of 99.9% successful requests over 28 days. Which alerting approach best balances early warning against alert fatigue?",
    options: [
      { id: "a", text: "Alert on error budget burn rate, with different thresholds for fast and slow burn" },
      { id: "b", text: "Alert whenever any request returns an error" },
      { id: "c", text: "Alert when the 28-day SLO has already been breached" },
      { id: "d", text: "Alert when error rate exceeds 0.1% in any one-minute window" },
    ],
    correct: "a",
    concept: "Burn-rate alerting scales urgency to how quickly the budget is being consumed",
    explanation:
      "Burn-rate alerting measures how fast you are consuming the error budget relative to the objective window. A fast burn — consuming a large share of the budget in a short period — pages immediately. A slow burn that would still breach the objective eventually raises a lower-urgency ticket. This gives early warning proportional to actual risk without paging for every transient error.",
    whyWrong: {
      b: "A 99.9% objective explicitly permits some errors. Alerting on every one guarantees constant noise and trains people to ignore alerts.",
      c: "Alerting after the breach removes any chance of preventing it. By definition you have already failed the objective when this fires.",
      d: "A one-minute window is far too short. Brief spikes that consume a negligible share of a 28-day budget would page repeatedly for something harmless.",
    },
    learnMore: "cloud-monitoring",
  },
  {
    id: "mon-004",
    topic: "monitoring",
    certs: [ACE, PCDE],
    difficulty: "easy",
    stem: "A team needs to count occurrences of a specific error message that only appears in application logs, and alert when the rate increases. What should they create?",
    options: [
      { id: "a", text: "A log-based metric with an alerting policy on it" },
      { id: "b", text: "An uptime check against the service endpoint" },
      { id: "c", text: "A log sink exporting the logs to Cloud Storage" },
      { id: "d", text: "A custom dashboard displaying the raw log entries" },
    ],
    correct: "a",
    concept: "Log-based metrics turn log content into numeric time series you can alert on",
    explanation:
      "A log-based metric counts log entries matching a filter and exposes the result as a time series. Once it exists as a metric, an ordinary alerting policy can watch its rate and notify the team when it rises. This is the standard way to alert on something that only appears in log text.",
    whyWrong: {
      b: "An uptime check probes an endpoint from outside. It detects whether the service responds, not whether a specific message appears in its logs.",
      c: "A sink exports logs for retention or analysis elsewhere. It does not produce a metric and cannot trigger an alert by itself.",
      d: "A dashboard requires someone to be looking at it. The requirement is to be alerted, which means something must notify the team proactively.",
    },
    learnMore: "cloud-monitoring",
  },
  {
    id: "mon-005",
    topic: "monitoring",
    certs: [PCA, PCDE],
    difficulty: "medium",
    stem: "Which set of measurements is most appropriate as the starting point for monitoring any user-facing service?",
    options: [
      { id: "a", text: "Latency, traffic, errors and saturation" },
      { id: "b", text: "CPU, memory, disk and network utilisation" },
      { id: "c", text: "Deployment frequency, lead time, change failure rate and recovery time" },
      { id: "d", text: "Cost per request, storage growth, egress volume and licence usage" },
    ],
    correct: "a",
    concept: "The four golden signals describe service health from the user's perspective",
    explanation:
      "Latency, traffic, errors and saturation describe what users experience and how close the service is to its limits. They apply to essentially any request-driven service and are the recommended starting point precisely because they surface user-visible problems rather than internal conditions that may be harmless.",
    whyWrong: {
      b: "Resource utilisation measures the machine, not the service. A service can be failing users with entirely healthy resource metrics, and can be near capacity without any user impact.",
      c: "These are delivery performance measures for the engineering process. They are valuable, but they describe how the team ships changes rather than whether the service is healthy right now.",
      d: "These are financial and capacity measures. They matter for planning and budgeting but do not indicate whether the service is currently working.",
    },
    learnMore: "cloud-monitoring",
  },
];
