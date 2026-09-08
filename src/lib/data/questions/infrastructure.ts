import type { PracticeQuestion } from "@/types";

/**
 * Original practice questions written by GCP Prep.
 *
 * These are written from first principles to test understanding of documented,
 * publicly available concepts. Nothing here is derived from real exam content,
 * leaked material or exam dumps, and none of it should be treated as a
 * prediction of what any real exam contains.
 */

const ACE = "associate-cloud-engineer";
const PCA = "professional-cloud-architect";
const PCD = "professional-cloud-developer";
const PCNE = "professional-cloud-network-engineer";
const PCDE = "professional-cloud-devops-engineer";
const CDL = "cloud-digital-leader";

export const infrastructureQuestions: PracticeQuestion[] = [
  /* ---------------------------- FUNDAMENTALS ---------------------------- */
  {
    id: "fund-001",
    topic: "fundamentals",
    certs: [ACE, PCA, CDL],
    difficulty: "easy",
    stem: "A company wants to ensure that a web application stays available if an entire data centre within a region loses power. What is the minimum deployment change that addresses this requirement?",
    options: [
      { id: "a", text: "Deploy instances across at least two zones within the region" },
      { id: "b", text: "Deploy instances across at least two regions" },
      { id: "c", text: "Increase the machine type of the existing instance" },
      { id: "d", text: "Enable automatic snapshots of the instance's persistent disk" },
    ],
    correct: "a",
    concept: "Zones are independent failure domains within a region",
    explanation:
      "A zone is an isolated deployment area within a region, designed to fail independently of other zones. Spreading instances across two or more zones means a single zone failure removes only part of your capacity. Since the requirement is specifically about one data centre failing — not an entire region — multi-zone deployment is the minimum change that satisfies it.",
    whyWrong: {
      b: "Multi-region deployment does address this, but it is more than the minimum. It adds cost, latency and data-consistency complexity that the stated requirement does not justify. Exam questions asking for the minimum change penalise over-engineering.",
      c: "A larger machine handles more load but does nothing for availability. If the zone hosting it fails, a bigger instance fails just as completely as a smaller one.",
      d: "Snapshots are a backup mechanism, not an availability mechanism. They let you rebuild after a failure, which involves downtime — they do not keep the application serving.",
    },
    learnMore: "cloud-fundamentals",
  },
  {
    id: "fund-002",
    topic: "fundamentals",
    certs: [ACE, PCA],
    difficulty: "medium",
    stem: "An organisation needs every project created by its engineering department to automatically inherit a policy preventing the creation of external IP addresses. Where should this be configured?",
    options: [
      { id: "a", text: "As an organisation policy constraint applied to the engineering folder" },
      { id: "b", text: "As an IAM deny role granted on each project individually" },
      { id: "c", text: "As a firewall rule in each project's default VPC network" },
      { id: "d", text: "As a budget alert on the department's billing account" },
    ],
    correct: "a",
    concept: "Organisation policy provides preventative guardrails that inherit down the hierarchy",
    explanation:
      "Organisation policy constraints are preventative controls applied at a node in the resource hierarchy and inherited by everything beneath it. Applying the constraint at the folder level means every existing and future project in that folder is covered automatically, with no per-project action required.",
    whyWrong: {
      b: "This would require action on every project, including every new one — exactly what the requirement rules out. IAM also controls who may perform actions, whereas the requirement is that the action must not be possible at all.",
      c: "Firewall rules control traffic flow to and from resources. They cannot prevent an external IP address from being assigned in the first place.",
      d: "A budget alert is a detective control that notifies you about spending. It cannot prevent a resource from being created.",
    },
    learnMore: "cloud-fundamentals",
  },
  {
    id: "fund-003",
    topic: "fundamentals",
    certs: [CDL, ACE],
    difficulty: "easy",
    stem: "Under the shared responsibility model for a managed database service, which task remains the customer's responsibility?",
    options: [
      { id: "a", text: "Deciding which users and applications may access the data" },
      { id: "b", text: "Applying security patches to the database engine binaries" },
      { id: "c", text: "Replacing failed physical disks in the data centre" },
      { id: "d", text: "Maintaining physical access controls at the facility" },
    ],
    correct: "a",
    concept: "Shared responsibility: the provider secures the infrastructure, the customer secures their use of it",
    explanation:
      "Access control is always the customer's responsibility regardless of how managed a service is. The provider cannot know which of your employees or applications should be able to read which data — that judgement is inherently yours, and misconfigured access is the most common cause of real cloud data exposure.",
    whyWrong: {
      b: "For a managed database service, patching the engine is handled by the provider. That transfer of work is a large part of what makes the service managed.",
      c: "Physical hardware maintenance is entirely the provider's responsibility and is never visible to the customer.",
      d: "Physical security of the data centre is the provider's responsibility under every cloud service model.",
    },
    learnMore: "cloud-fundamentals",
  },
  {
    id: "fund-004",
    topic: "fundamentals",
    certs: [ACE, PCA, CDL],
    difficulty: "medium",
    stem: "A workload runs continuously at a predictable baseline of 40 virtual CPUs, with occasional short spikes to 80. The team wants the lowest total cost while keeping the spikes reliable. What should they do?",
    options: [
      {
        id: "a",
        text: "Purchase a committed use discount for the 40 vCPU baseline and use on-demand capacity for spikes",
      },
      { id: "b", text: "Purchase a committed use discount for the full 80 vCPU peak" },
      { id: "c", text: "Run the entire workload, baseline and spikes, on spot instances" },
      { id: "d", text: "Run everything on-demand and rely on sustained use discounts alone" },
    ],
    correct: "a",
    concept: "Commit to the baseline, absorb variability with flexible capacity",
    explanation:
      "Committed use discounts give a substantial reduction in exchange for a usage commitment, so they are ideal for capacity you know you will consume continuously. Spikes are unpredictable and short, so paying on-demand for them is cheaper than committing to capacity that sits idle most of the time. Splitting the workload this way minimises total cost without risking the spikes.",
    whyWrong: {
      b: "Committing to peak means paying for 80 vCPUs continuously when you only need 40 most of the time. The discount rate does not compensate for paying for double the capacity around the clock.",
      c: "Spot instances can be reclaimed at short notice. Using them for a continuously-running baseline that must stay reliable risks the workload being interrupted, which the requirement rules out.",
      d: "Sustained use discounts apply automatically but are considerably smaller than committed use discounts. Ignoring a commitment for genuinely predictable baseline capacity leaves the largest available saving unclaimed.",
    },
    learnMore: "compute-engine",
  },
  {
    id: "fund-005",
    topic: "fundamentals",
    certs: [ACE, PCA],
    difficulty: "medium",
    stem: "A finance team must see the cost of each of three departments separately, but the company wants a single invoice. What is the appropriate structure?",
    options: [
      {
        id: "a",
        text: "One billing account paying for projects organised into a folder per department, with billing data exported for analysis",
      },
      { id: "b", text: "Three separate billing accounts, one per department" },
      { id: "c", text: "One project per department, each with its own billing account" },
      { id: "d", text: "A single project containing all resources, with labels identifying each department" },
    ],
    correct: "a",
    concept: "Billing accounts control invoicing; the resource hierarchy and labels provide cost attribution",
    explanation:
      "A single billing account produces a single invoice, satisfying the finance requirement. Organising projects into a folder per department, and exporting detailed billing data, gives per-department visibility without splitting the invoice. Separating who pays from how costs are attributed is exactly what this structure is designed for.",
    whyWrong: {
      b: "Separate billing accounts produce separate invoices, which directly contradicts the requirement for a single invoice.",
      c: "This produces three invoices, and additionally forces all of a department's resources into one project, which is poor practice for isolating environments.",
      d: "A single project provides no isolation between departments — any misconfiguration or over-granted permission affects all three. Labels help with cost attribution but do not solve the isolation problem this structure creates.",
    },
    learnMore: "cloud-fundamentals",
  },
  {
    id: "fund-006",
    topic: "fundamentals",
    certs: [CDL],
    difficulty: "easy",
    stem: "A retailer wants to move an existing application to the cloud as quickly as possible, with no changes to its code. Which modernisation approach matches this goal?",
    options: [
      { id: "a", text: "Lift and shift to virtual machines" },
      { id: "b", text: "Rebuild the application as serverless functions" },
      { id: "c", text: "Refactor the application into microservices on Kubernetes" },
      { id: "d", text: "Replace the application with a software-as-a-service product" },
    ],
    correct: "a",
    concept: "Modernisation is a spectrum of effort; lift and shift is the fastest and least disruptive",
    explanation:
      "Lift and shift moves an application onto virtual machines with minimal or no code changes, because a virtual machine closely resembles the physical server the application already runs on. It is the fastest route to the cloud and the standard answer when the requirement emphasises speed and no code changes.",
    whyWrong: {
      b: "Rebuilding as serverless functions requires substantial code changes, which the requirement explicitly excludes.",
      c: "Refactoring into microservices is the slowest and most expensive option. It delivers real benefits eventually, but not quickly and not without code changes.",
      d: "Replacing with a SaaS product is not a migration of the existing application at all, and would mean losing any custom functionality it provides.",
    },
    learnMore: "compute-engine",
  },
  {
    id: "fund-007",
    topic: "fundamentals",
    certs: [ACE, PCA],
    difficulty: "hard",
    stem: "An engineer is granted the Editor role at the organisation level. A project owner wants to prevent that engineer from modifying resources in one specific project. What must happen?",
    options: [
      {
        id: "a",
        text: "The organisation-level grant must be removed or narrowed, because a project-level change cannot revoke inherited access",
      },
      { id: "b", text: "Add a deny binding for the engineer on the project's IAM policy" },
      { id: "c", text: "Remove the engineer from the project's IAM policy" },
      { id: "d", text: "Move the project into a different folder" },
    ],
    correct: "a",
    concept: "IAM is additive and inherits downward; lower levels cannot subtract an inherited grant",
    explanation:
      "IAM permissions accumulate down the resource hierarchy. A role granted at the organisation level applies to every folder, project and resource beneath it, and nothing configured at a lower level removes it. The only way to stop the engineer having Editor rights in that project is to change the grant where it was made — by removing it or replacing it with a narrower grant at a more specific scope.",
    whyWrong: {
      b: "Adding bindings at the project level cannot subtract permissions inherited from above. Standard IAM policy bindings are additive only.",
      c: "The engineer is not in the project's IAM policy — the access comes from the organisation-level grant. There is nothing at the project level to remove.",
      d: "Moving the project to a different folder does not help, because the grant is at the organisation level and every folder is beneath it.",
    },
    learnMore: "iam",
  },

  /* ------------------------------- COMPUTE ------------------------------ */
  {
    id: "comp-001",
    topic: "compute",
    certs: [ACE, PCD, PCA],
    difficulty: "medium",
    stem: "A small team runs a public REST API with highly variable traffic — busy during business hours and almost no requests overnight. They want to minimise both cost and operational work. Which compute option best fits?",
    options: [
      { id: "a", text: "Cloud Run, with minimum instances set to zero" },
      { id: "b", text: "A managed instance group of Compute Engine VMs with autoscaling" },
      { id: "c", text: "A GKE Standard cluster with the Horizontal Pod Autoscaler" },
      { id: "d", text: "A single large Compute Engine instance sized for peak traffic" },
    ],
    correct: "a",
    concept: "Scale to zero suits spiky traffic with a small operations team",
    explanation:
      "Cloud Run scales to zero when there is no traffic, so the overnight period costs nothing. It also removes patching, capacity planning and cluster maintenance entirely, which matters for a small team. Both stated requirements — minimum cost under variable load and minimum operational work — point to the fully managed option.",
    whyWrong: {
      b: "A managed instance group can autoscale, but it generally cannot scale to zero for a service that must remain reachable, so you pay for idle capacity overnight. You also remain responsible for operating system patching and image management.",
      c: "A GKE Standard cluster has running nodes and a control plane to maintain regardless of traffic. It is substantially more operational surface than a small team needs for one API.",
      d: "Sizing for peak means paying for peak capacity continuously, which is the most expensive option for a workload that is idle much of the time.",
    },
    learnMore: "cloud-run",
  },
  {
    id: "comp-002",
    topic: "compute",
    certs: [ACE, PCA],
    difficulty: "medium",
    stem: "A batch rendering job processes independent frames, takes several hours, and can safely restart any frame that fails. Cost is the primary concern. Which compute configuration is most appropriate?",
    options: [
      { id: "a", text: "Spot VMs in a managed instance group" },
      { id: "b", text: "On-demand VMs with a three-year committed use discount" },
      { id: "c", text: "Sole-tenant nodes for predictable performance" },
      { id: "d", text: "Memory-optimised VMs with local SSDs" },
    ],
    correct: "a",
    concept: "Spot capacity suits fault-tolerant, interruptible work",
    explanation:
      "Spot VMs offer a very large discount in exchange for the possibility of being reclaimed at short notice. The workload described is explicitly fault tolerant — independent frames that can be restarted — which is precisely the profile spot capacity is designed for. Where the work can absorb interruption, this is the cheapest option available.",
    whyWrong: {
      b: "A three-year commitment suits continuous, predictable baseline load. A batch job that runs intermittently would leave committed capacity idle, costing more than it saves.",
      c: "Sole-tenant nodes provide dedicated physical hardware for licensing or compliance reasons. They cost more, not less, and nothing in the scenario requires dedicated hardware.",
      d: "Nothing in the scenario indicates a memory or disk throughput bottleneck. Choosing a more expensive machine family without a stated need works against the cost requirement.",
    },
    learnMore: "compute-engine",
  },
  {
    id: "comp-003",
    topic: "compute",
    certs: [ACE],
    difficulty: "medium",
    stem: "An instance in a managed instance group has become unresponsive. The group should replace it automatically. What must be configured?",
    options: [
      { id: "a", text: "An autohealing health check on the managed instance group" },
      { id: "b", text: "A load balancer health check on the backend service" },
      { id: "c", text: "An autoscaling policy based on CPU utilisation" },
      { id: "d", text: "An uptime check in Cloud Monitoring" },
    ],
    correct: "a",
    concept: "Autohealing recreates unhealthy instances; load balancer health checks only redirect traffic",
    explanation:
      "Autohealing is configured on the managed instance group with its own health check. When that check fails for an instance, the group recreates it. This is the mechanism that actually replaces a broken instance.",
    whyWrong: {
      b: "A load balancer health check stops sending traffic to an unhealthy instance, which protects users, but it never recreates the instance. The broken instance stays in place indefinitely.",
      c: "Autoscaling adds and removes instances in response to load. It has no concept of an individual instance being unhealthy and will not replace one.",
      d: "An uptime check monitors an endpoint and can trigger an alert, but it takes no action to repair or replace infrastructure.",
    },
    learnMore: "compute-engine",
  },
  {
    id: "comp-004",
    topic: "compute",
    certs: [PCD, PCDE],
    difficulty: "hard",
    stem: "A Cloud Run service is configured with maximum concurrency of 1. Under load testing it scales to hundreds of instances and costs far more than expected, although CPU usage per instance stays low. What is the most likely improvement?",
    options: [
      {
        id: "a",
        text: "Increase the concurrency setting so each instance handles multiple simultaneous requests",
      },
      { id: "b", text: "Increase the memory allocated to each instance" },
      { id: "c", text: "Set a higher maximum instance count to spread the load further" },
      { id: "d", text: "Enable a minimum instance count to avoid cold starts" },
    ],
    correct: "a",
    concept: "Cloud Run concurrency directly determines how many instances a given request rate needs",
    explanation:
      "With concurrency set to 1, each container instance handles exactly one request at a time, so serving 500 simultaneous requests requires 500 instances. Because CPU usage per instance is low, the containers clearly have spare capacity. Raising concurrency lets each instance serve many requests concurrently, dramatically reducing instance count and therefore cost.",
    whyWrong: {
      b: "More memory per instance increases cost per instance without reducing how many are needed. The symptom is instance count, not memory pressure.",
      c: "Raising the maximum would allow even more instances to be created, increasing cost further. The problem is that too many instances are needed, not that the ceiling is too low.",
      d: "Minimum instances keep containers warm to avoid cold-start latency, and you pay for them while idle. This addresses a latency concern, not a cost concern, and would increase spend.",
    },
    learnMore: "cloud-run",
  },
  {
    id: "comp-005",
    topic: "compute",
    certs: [ACE, PCA],
    difficulty: "easy",
    stem: "Which storage option should be used for temporary scratch data that must be as fast as possible and is safe to lose when the instance stops?",
    options: [
      { id: "a", text: "Local SSD" },
      { id: "b", text: "Balanced persistent disk" },
      { id: "c", text: "Cloud Storage Standard class" },
      { id: "d", text: "Filestore" },
    ],
    correct: "a",
    concept: "Local SSD trades durability for maximum performance",
    explanation:
      "Local SSD is physically attached to the host machine, which makes it the fastest storage available. Its data does not survive the instance stopping, which is an acceptable trade for scratch data explicitly described as safe to lose.",
    whyWrong: {
      b: "Persistent disks are network-attached and durable, but slower than local SSD. Paying for durability the workload does not need means accepting lower performance for no benefit.",
      c: "Cloud Storage is object storage accessed over HTTP. It is not a block device and is far too slow for high-performance scratch space.",
      d: "Filestore provides a shared network file system. Network latency makes it unsuitable when maximum speed is the requirement, and nothing indicates the data must be shared.",
    },
    learnMore: "compute-engine",
  },
  {
    id: "comp-006",
    topic: "compute",
    certs: [ACE, PCA],
    difficulty: "medium",
    stem: "A company must run commercial software licensed per physical core, which requires that no other customer's workloads share the underlying hardware. Which option satisfies this?",
    options: [
      { id: "a", text: "Sole-tenant nodes" },
      { id: "b", text: "Custom machine types" },
      { id: "c", text: "Reserved instances with a committed use discount" },
      { id: "d", text: "Compute-optimised machine types" },
    ],
    correct: "a",
    concept: "Sole tenancy provides dedicated physical hardware for licensing and compliance",
    explanation:
      "Sole-tenant nodes dedicate an entire physical server to one customer, so no other tenant's workloads run on it. This is exactly what per-physical-core licensing and certain compliance regimes require, and it also gives visibility into the physical core count needed for licence compliance.",
    whyWrong: {
      b: "Custom machine types let you choose an exact CPU and memory combination, but the underlying hardware is still shared with other customers.",
      c: "A committed use discount is a pricing arrangement. It reserves nothing about physical hardware isolation.",
      d: "Compute-optimised machines are tuned for CPU-intensive work but still run on shared physical infrastructure.",
    },
    learnMore: "compute-engine",
  },
  {
    id: "comp-007",
    topic: "compute",
    certs: [ACE, PCDE],
    difficulty: "medium",
    stem: "A team needs every new instance in a managed instance group to start with their application already installed and configured, and instances must start serving as quickly as possible. What is the best approach?",
    options: [
      {
        id: "a",
        text: "Build a custom image containing the application and reference it from the instance template",
      },
      {
        id: "b",
        text: "Use a startup script in the instance template that installs the application at boot",
      },
      { id: "c", text: "Attach a persistent disk snapshot containing the application to each instance" },
      { id: "d", text: "Manually configure one instance and clone it when scaling is needed" },
    ],
    correct: "a",
    concept: "Baking a custom image minimises startup time and makes instances reproducible",
    explanation:
      "A custom image has the application and its dependencies already installed, so a new instance boots and is ready to serve almost immediately. This is the standard pattern for autoscaling groups, where slow startup means the group cannot respond quickly enough to load increases.",
    whyWrong: {
      b: "A startup script works but adds installation time to every boot — downloading packages, installing dependencies, configuring. It also introduces a dependency on external package repositories being available, which can fail exactly when you are scaling up under load.",
      c: "Snapshots create disks but you still need the boot process to configure the instance. This is more complex than a custom image and does not solve the startup time problem cleanly.",
      d: "Manual configuration cannot work with autoscaling, which creates instances automatically without human involvement.",
    },
    learnMore: "compute-engine",
  },
  {
    id: "comp-008",
    topic: "compute",
    certs: [ACE],
    difficulty: "easy",
    stem: "An instance is stopped but the team notices they are still being charged for it. What is the most likely explanation?",
    options: [
      { id: "a", text: "Persistent disks attached to the instance continue to incur storage charges" },
      { id: "b", text: "Stopped instances continue to be charged at the full rate for CPU and memory" },
      { id: "c", text: "The instance's static external IP address is free while the instance runs but not while it is stopped" },
      { id: "d", text: "Both a and c are plausible contributors to the remaining charge" },
    ],
    correct: "d",
    concept: "Stopping an instance halts compute charges but not all associated resource charges",
    explanation:
      "Stopping an instance stops charges for its CPU and memory, but the persistent disks attached to it continue to be billed for the storage they occupy. Separately, a reserved static external IP address that is not attached to a running instance is charged, precisely to discourage hoarding addresses. Both are common reasons a stopped instance still generates cost.",
    whyWrong: {
      a: "This is true but incomplete. The static IP charge is a second, equally common contributor, and the question asks for the most likely explanation of the remaining charge.",
      b: "This is incorrect. Stopping an instance does stop the CPU and memory charges, which is the main reason to stop rather than leave it running.",
      c: "This is true on its own but incomplete, for the same reason as option a.",
    },
    learnMore: "compute-engine",
  },
  {
    id: "comp-009",
    topic: "compute",
    certs: [PCA, PCD],
    difficulty: "hard",
    stem: "An application must run identically in a company's own data centre and in the cloud, because a regulator requires an on-premises deployment for one market. Which approach best supports this?",
    options: [
      { id: "a", text: "Package the application in containers and run it on Kubernetes in both environments" },
      { id: "b", text: "Deploy to Cloud Run in the cloud and to virtual machines on-premises" },
      { id: "c", text: "Use managed serverless functions in the cloud and replicate the logic on-premises" },
      { id: "d", text: "Run virtual machines with a provider-specific image in both environments" },
    ],
    correct: "a",
    concept: "Kubernetes provides a consistent deployment target across environments",
    explanation:
      "Kubernetes runs in cloud environments and on-premises, and its deployment abstractions — pods, deployments, services — behave the same way in both. Containerising the application and targeting Kubernetes means one set of manifests, one build artefact and one operational model across both deployments, which is exactly what the requirement calls for.",
    whyWrong: {
      b: "This means maintaining two different deployment models and two sets of operational knowledge. The application would not run identically, which is the stated requirement.",
      c: "Replicating logic in a second implementation guarantees the two environments diverge over time. It is the opposite of running identically.",
      d: "Provider-specific images do not run on-premises, so this does not meet the requirement at all.",
    },
    learnMore: "google-kubernetes-engine",
  },

  /* ------------------------------- STORAGE ------------------------------ */
  {
    id: "stor-001",
    topic: "storage",
    certs: [ACE, PCA],
    difficulty: "medium",
    stem: "Compliance requires that audit files be retained for seven years. They are almost never read, but must be retrievable if requested. Which storage class minimises cost?",
    options: [
      { id: "a", text: "Archive" },
      { id: "b", text: "Coldline" },
      { id: "c", text: "Nearline" },
      { id: "d", text: "Standard" },
    ],
    correct: "a",
    concept: "Match storage class to actual access frequency, not to a general sense of importance",
    explanation:
      "Archive has the lowest storage price and is intended for data retained for long periods and read very rarely. Its minimum storage duration of one year is irrelevant here because the retention requirement is seven years, and its higher retrieval cost only applies on the rare occasions the files are actually requested.",
    whyWrong: {
      b: "Coldline is intended for data accessed roughly quarterly. Storage costs more than Archive, and the scenario describes access that is far rarer than quarterly.",
      c: "Nearline targets roughly monthly access. It costs more to store than both colder classes and offers no benefit for data that is almost never read.",
      d: "Standard has the highest storage cost and is designed for frequently accessed data. Using it for seven-year archives is the most expensive possible choice.",
    },
    learnMore: "cloud-storage",
  },
  {
    id: "stor-002",
    topic: "storage",
    certs: [ACE, PCA],
    difficulty: "hard",
    stem: "A team applies a lifecycle rule moving objects to Archive after 30 days. Many objects are deleted at around 60 days old. After the change, costs increase rather than decrease. Why?",
    options: [
      {
        id: "a",
        text: "Archive has a 365-day minimum storage duration, so deleting objects early still incurs the full minimum charge",
      },
      { id: "b", text: "Lifecycle transitions are billed at a higher rate than ordinary storage operations" },
      { id: "c", text: "Archive storage is more expensive per gigabyte than Standard storage" },
      { id: "d", text: "Objects in Archive are automatically replicated to multiple regions, doubling storage cost" },
    ],
    correct: "a",
    concept: "Minimum storage duration makes cold classes expensive for short-lived data",
    explanation:
      "Colder storage classes carry minimum storage durations — 365 days for Archive. An object deleted 30 days after moving to Archive is still billed as though it had been stored for the full year. Because these objects only live around 60 days in total, the lifecycle rule converts a short Standard-class cost into close to a year of Archive charges for every object.",
    whyWrong: {
      b: "There is a small per-object charge for transitions, but it is nowhere near large enough to reverse the direction of the cost change. The minimum duration charge is the dominant effect.",
      c: "Archive storage is considerably cheaper per gigabyte than Standard. That is why the team expected the change to reduce cost.",
      d: "Storage class and location type are independent settings. Moving an object to Archive does not change where it is replicated.",
    },
    learnMore: "cloud-storage",
  },
  {
    id: "stor-003",
    topic: "storage",
    certs: [ACE, PCD],
    difficulty: "medium",
    stem: "A web application must let users download a private file for a limited time, without giving them any account on the platform and without making the object public. What is the correct approach?",
    options: [
      { id: "a", text: "Generate a signed URL with a short expiry and give it to the user" },
      { id: "b", text: "Grant allUsers the Storage Object Viewer role on the object" },
      { id: "c", text: "Create a service account key and embed it in the client application" },
      { id: "d", text: "Make the bucket public and rely on the object name being difficult to guess" },
    ],
    correct: "a",
    concept: "Signed URLs grant time-limited access to a specific object without an identity",
    explanation:
      "A signed URL is a time-limited, cryptographically signed link granting access to one specific object. The recipient needs no account and no credentials, and the link stops working when it expires. This is precisely the mechanism designed for the described requirement.",
    whyWrong: {
      b: "Granting access to allUsers makes the object publicly readable by anyone on the internet, permanently. This contradicts both the private and time-limited requirements.",
      c: "Embedding a service account key in a client application exposes a long-lived credential to anyone who inspects the client. It is one of the most serious credential mistakes possible.",
      d: "Obscurity is not access control. Once the URL is shared, logged or indexed, the object is permanently accessible to anyone who has it.",
    },
    learnMore: "cloud-storage",
  },
  {
    id: "stor-004",
    topic: "storage",
    certs: [ACE, PCA],
    difficulty: "medium",
    stem: "Several Compute Engine instances need simultaneous read and write access to the same directory tree, and the application requires POSIX file semantics. Which service should be used?",
    options: [
      { id: "a", text: "Filestore" },
      { id: "b", text: "Cloud Storage with the FUSE adapter" },
      { id: "c", text: "A persistent disk attached to each instance" },
      { id: "d", text: "Local SSD on each instance" },
    ],
    correct: "a",
    concept: "Shared read-write access with file semantics requires network file storage",
    explanation:
      "Filestore provides managed NFS storage, giving multiple instances concurrent read-write access to the same file system with standard POSIX semantics including locking and partial writes. This is the specific problem it exists to solve.",
    whyWrong: {
      b: "Mounting object storage as a file system provides an approximation of file semantics but does not implement them fully. Partial writes, locking and rename behaviour differ, which breaks applications that genuinely require POSIX semantics.",
      c: "Persistent disks generally attach to a single instance in read-write mode. They cannot provide shared read-write access across many instances.",
      d: "Local SSD is physically attached to one host and cannot be shared between instances at all. It is also ephemeral.",
    },
    learnMore: "filestore",
  },
  {
    id: "stor-005",
    topic: "storage",
    certs: [ACE, PCA],
    difficulty: "medium",
    stem: "A bucket must be protected so that objects cannot be deleted for five years, even by a project owner. What should be configured?",
    options: [
      { id: "a", text: "A locked retention policy on the bucket" },
      { id: "b", text: "Object versioning with a lifecycle rule" },
      { id: "c", text: "An IAM policy removing delete permissions from all members" },
      { id: "d", text: "Customer-managed encryption keys with rotation disabled" },
    ],
    correct: "a",
    concept: "A locked retention policy is immutable and binds even administrators",
    explanation:
      "A retention policy prevents objects being deleted before the retention period elapses. Once locked, the policy itself cannot be removed or shortened by anyone, including a project owner. That immutability is what makes it acceptable for regulatory retention requirements, where a control an administrator can undo is not sufficient.",
    whyWrong: {
      b: "Versioning preserves previous versions when objects are overwritten or deleted, but someone with sufficient permissions can delete the versions too. It protects against accident, not against deliberate action.",
      c: "IAM policies can be changed by anyone with permission to modify them, and a project owner has that permission. This does not survive the stated threat model.",
      d: "Encryption controls who can read data. It does nothing to prevent deletion.",
    },
    learnMore: "cloud-storage",
  },
  {
    id: "stor-006",
    topic: "storage",
    certs: [PCA, ACE],
    difficulty: "hard",
    stem: "A media company serves large video files to a global audience. Egress costs are high and origin servers are heavily loaded. What change addresses both problems most directly?",
    options: [
      {
        id: "a",
        text: "Serve the files through an external Application Load Balancer with edge caching enabled",
      },
      { id: "b", text: "Move the files to a multi-region bucket" },
      { id: "c", text: "Move the files to Nearline storage to reduce storage cost" },
      { id: "d", text: "Add more origin servers behind a regional load balancer" },
    ],
    correct: "a",
    concept: "Edge caching reduces both origin load and egress cost simultaneously",
    explanation:
      "Enabling caching at the edge means popular files are served from locations close to users rather than fetched from the origin every time. Requests served from cache never reach the origin, so origin load falls, and cached delivery is billed at lower rates than origin egress, so cost falls. One change addresses both stated problems.",
    whyWrong: {
      b: "A multi-region bucket improves availability and can reduce latency for reads within those regions, but every request still reaches the storage service. It does not reduce origin load in the way caching does, and egress is still charged per request.",
      c: "Nearline reduces the cost of storing data, not of serving it. For frequently-served video it would add retrieval charges, making the egress problem worse.",
      d: "More origin servers spread the load but do not reduce it, and they do nothing about egress cost. It also adds infrastructure to operate and pay for.",
    },
    learnMore: "cloud-cdn",
  },
  {
    id: "stor-007",
    topic: "storage",
    certs: [ACE],
    difficulty: "easy",
    stem: "Which statement about Cloud Storage bucket names is correct?",
    options: [
      { id: "a", text: "Bucket names must be globally unique across all Google Cloud customers" },
      { id: "b", text: "Bucket names must be unique only within the project that owns them" },
      { id: "c", text: "Bucket names can be changed after creation if the bucket is empty" },
      { id: "d", text: "Bucket names must be unique only within the chosen region" },
    ],
    correct: "a",
    concept: "Bucket names share a single global namespace",
    explanation:
      "Cloud Storage bucket names occupy one global namespace shared by every customer. If another organisation has taken a name, you cannot use it. This is why generic names are almost always unavailable and why bucket names are commonly prefixed with a company or project identifier.",
    whyWrong: {
      b: "The namespace is global, not per project. A name taken by any customer anywhere is unavailable to you.",
      c: "Bucket names are immutable. Changing one means creating a new bucket and copying the objects across.",
      d: "The namespace is global rather than regional. A bucket's location is a separate property from its name.",
    },
    learnMore: "cloud-storage",
  },

  /* ------------------------------ NETWORKING ---------------------------- */
  {
    id: "net-001",
    topic: "networking",
    certs: [ACE, PCNE, PCA],
    difficulty: "medium",
    stem: "A public web application serves HTTPS traffic to users across Europe, North America and Asia, and must present a single IP address worldwide. Which load balancer is appropriate?",
    options: [
      { id: "a", text: "Global external Application Load Balancer" },
      { id: "b", text: "Regional external Application Load Balancer" },
      { id: "c", text: "External pass-through Network Load Balancer" },
      { id: "d", text: "Internal Application Load Balancer" },
    ],
    correct: "a",
    concept: "Global HTTP(S) traffic with one anycast address means the global Application Load Balancer",
    explanation:
      "The global external Application Load Balancer provides a single anycast IP address served from edge locations worldwide, routing each user to the nearest healthy backend. The scenario states HTTPS, a worldwide audience and a single address, which together identify this option uniquely.",
    whyWrong: {
      b: "A regional load balancer serves one region and cannot provide a single global address with worldwide routing. Users far from that region would experience poor latency.",
      c: "A pass-through Network Load Balancer operates at the network layer and is regional. It cannot terminate TLS or perform HTTP-aware routing, and offers no global address.",
      d: "An internal load balancer uses a private address reachable only from within your network. It cannot serve public internet traffic.",
    },
    learnMore: "load-balancing",
  },
  {
    id: "net-002",
    topic: "networking",
    certs: [PCNE, PCA],
    difficulty: "hard",
    stem: "A gaming service uses UDP and the backend servers must see each player's original source IP address. Which load balancer meets both requirements?",
    options: [
      { id: "a", text: "External pass-through Network Load Balancer" },
      { id: "b", text: "Global external Application Load Balancer" },
      { id: "c", text: "External proxy Network Load Balancer" },
      { id: "d", text: "Internal Application Load Balancer" },
    ],
    correct: "a",
    concept: "Pass-through load balancing preserves the client source address and supports UDP",
    explanation:
      "A pass-through Network Load Balancer forwards packets without terminating the connection, so backends receive traffic with the original client source address intact. It also supports UDP, which proxy-based load balancers do not. Both stated requirements point to this option.",
    whyWrong: {
      b: "The Application Load Balancer handles HTTP(S) only, so it cannot carry UDP. It also terminates the connection and proxies it, so backends see the load balancer's address rather than the client's.",
      c: "A proxy Network Load Balancer terminates the TCP connection, which means it does not support UDP and does not preserve the source address in the way a pass-through balancer does.",
      d: "An internal load balancer is not reachable from the public internet, so it cannot serve external players.",
    },
    learnMore: "load-balancing",
  },
  {
    id: "net-003",
    topic: "networking",
    certs: [ACE, PCNE],
    difficulty: "hard",
    stem: "A VPC has a firewall rule at priority 1000 denying TCP port 22 from all sources, and another at priority 500 allowing TCP port 22 from 10.0.0.0/8. What happens to an SSH connection from 10.1.2.3?",
    options: [
      { id: "a", text: "It is allowed, because the lower priority number is evaluated first and matches" },
      { id: "b", text: "It is denied, because a deny rule always overrides an allow rule" },
      { id: "c", text: "It is denied, because the higher priority number takes precedence" },
      { id: "d", text: "It is allowed only if the instance has a matching network tag on both rules" },
    ],
    correct: "a",
    concept: "Firewall rules are evaluated by priority, lowest number first, and the first match wins",
    explanation:
      "Firewall rules are sorted by priority with lower numbers evaluated first. The allow rule at priority 500 is considered before the deny rule at priority 1000. Since 10.1.2.3 falls within 10.0.0.0/8, the allow rule matches and evaluation stops there — the deny rule is never reached for this connection.",
    whyWrong: {
      b: "There is no blanket precedence for deny over allow. Precedence is determined entirely by the priority number, and a lower-numbered allow rule beats a higher-numbered deny rule.",
      c: "This inverts the rule. A higher priority number means lower precedence; 500 is evaluated before 1000.",
      d: "Network tags narrow which instances a rule applies to. Neither rule as described uses tags, so both apply to all instances in the network.",
    },
    learnMore: "vpc",
  },
  {
    id: "net-004",
    topic: "networking",
    certs: [ACE, PCNE, PCA],
    difficulty: "medium",
    stem: "Instances in a private subnet have no external IP addresses but must download operating system updates from the internet. Inbound connections must remain impossible. What should be configured?",
    options: [
      { id: "a", text: "Cloud NAT for the subnet" },
      { id: "b", text: "An external IP address on each instance" },
      { id: "c", text: "A firewall rule allowing egress to 0.0.0.0/0" },
      { id: "d", text: "An external Application Load Balancer in front of the instances" },
    ],
    correct: "a",
    concept: "Cloud NAT provides outbound-only internet access for instances without public addresses",
    explanation:
      "Cloud NAT lets instances without external IP addresses initiate outbound connections to the internet. Because it is a network address translation service, connections can only be initiated from inside — nothing on the internet can start a connection to those instances. This matches both requirements exactly.",
    whyWrong: {
      b: "Assigning external addresses makes the instances directly reachable from the internet, which the requirement explicitly forbids. It also contradicts the stated design of a private subnet.",
      c: "An egress firewall rule permits traffic to leave, but without a public address or NAT there is no return path. The instances still cannot reach the internet.",
      d: "A load balancer handles inbound traffic to your services. It provides no mechanism for instances to make outbound connections.",
    },
    learnMore: "vpc",
  },
  {
    id: "net-005",
    topic: "networking",
    certs: [PCNE, PCA],
    difficulty: "hard",
    stem: "VPC A is peered with VPC B, and VPC B is peered with VPC C. Instances in A cannot reach instances in C. What is the explanation?",
    options: [
      { id: "a", text: "VPC peering is not transitive; A and C require a direct peering connection" },
      { id: "b", text: "Peering requires matching subnet ranges in all three networks" },
      { id: "c", text: "Firewall rules must be created in VPC B to forward traffic between A and C" },
      { id: "d", text: "Peering only supports two networks in total, so the third connection is ignored" },
    ],
    correct: "a",
    concept: "VPC peering is non-transitive by design",
    explanation:
      "VPC peering connects exactly two networks and routes are not passed through to further peers. A can reach B and B can reach C, but A cannot reach C through B. Connecting A and C requires a direct peering between them, or a different topology such as a hub with an appliance that forwards traffic explicitly.",
    whyWrong: {
      b: "Peering requires that subnet ranges do not overlap, which is the opposite of matching. Overlapping ranges prevent peering from being established at all.",
      c: "Firewall rules control whether traffic is permitted, not whether a route exists. Without a route, no firewall configuration in B makes A reachable from C.",
      d: "A VPC can peer with many other networks. The limitation is that peering does not chain, not that the number is capped at two.",
    },
    learnMore: "vpc",
  },
  {
    id: "net-006",
    topic: "networking",
    certs: [PCNE, PCA],
    difficulty: "medium",
    stem: "A central platform team must control all networking, while five application teams manage their own compute resources in separate projects that share one network. What should be implemented?",
    options: [
      { id: "a", text: "Shared VPC, with the platform team owning the host project" },
      { id: "b", text: "VPC peering between all six projects" },
      { id: "c", text: "One project containing all resources, with folder-level IAM" },
      { id: "d", text: "A separate VPC per team, connected through Cloud VPN" },
    ],
    correct: "a",
    concept: "Shared VPC centralises network control while devolving resource management",
    explanation:
      "Shared VPC is designed for exactly this separation. The host project owns the network, and the platform team controls subnets, firewall rules and routing there. Service projects attach to it, and their teams create compute resources that use the shared network without being able to modify it.",
    whyWrong: {
      b: "Peering connects separate networks but each team would own and control their own, which does not give the platform team central control. It also does not scale well, since peering is non-transitive.",
      c: "A single project removes the isolation between teams entirely — any team could modify any other team's resources. It also provides no separation of network administration from resource administration.",
      d: "VPN between internal networks adds unnecessary complexity and cost, and each team would still control their own network, defeating the requirement.",
    },
    learnMore: "vpc",
  },
  {
    id: "net-007",
    topic: "networking",
    certs: [PCNE],
    difficulty: "medium",
    stem: "A team plans to migrate a service and needs DNS changes to take effect quickly during the cutover window. What should they do beforehand?",
    options: [
      { id: "a", text: "Reduce the record's TTL well in advance of the migration" },
      { id: "b", text: "Increase the record's TTL to improve resolver caching" },
      { id: "c", text: "Enable DNSSEC on the zone" },
      { id: "d", text: "Convert the A record to a CNAME record" },
    ],
    correct: "a",
    concept: "TTL determines how long resolvers cache an answer, so it must be lowered before a change",
    explanation:
      "Resolvers cache DNS answers for the duration of the TTL. If a record has a 24-hour TTL, some resolvers will keep returning the old address for up to 24 hours after you change it. Lowering the TTL at least one full old-TTL period in advance ensures caches expire quickly during the cutover, making the change propagate fast and any rollback equally fast.",
    whyWrong: {
      b: "Raising the TTL makes caching last longer, so the change would take even more time to propagate. This is the opposite of what a cutover needs.",
      c: "DNSSEC authenticates responses so resolvers can verify they were not tampered with. It has no effect on how quickly a change propagates.",
      d: "Changing the record type does not alter caching behaviour, and a CNAME adds a resolution step. The TTL still governs propagation.",
    },
    learnMore: "cloud-dns",
  },
  {
    id: "net-008",
    topic: "networking",
    certs: [PCNE, PCA],
    difficulty: "medium",
    stem: "A content delivery configuration shows a cache hit ratio close to zero although the content is static and rarely changes. What is the most likely cause?",
    options: [
      { id: "a", text: "The cache key includes a per-user cookie, making every request unique" },
      { id: "b", text: "The origin is in a different region from most users" },
      { id: "c", text: "The objects are stored in the Standard storage class" },
      { id: "d", text: "TLS termination is happening at the load balancer" },
    ],
    correct: "a",
    concept: "Cache keys determine what counts as the same request",
    explanation:
      "If the cache key includes a cookie that is unique per user, then every request produces a distinct cache key, so nothing is ever a hit even though the content itself is identical. This is the classic cause of a near-zero hit ratio on static content, and it is easy to miss because the site continues to work correctly.",
    whyWrong: {
      b: "Origin location affects the latency of cache misses but not whether requests hit the cache. A distant origin makes misses slower; it does not cause them.",
      c: "Storage class affects cost and retrieval characteristics at the origin. It has no bearing on edge cache behaviour.",
      d: "TLS termination at the load balancer is normal and required for the load balancer to inspect and cache HTTP responses at all. It does not prevent caching.",
    },
    learnMore: "cloud-cdn",
  },
  {
    id: "net-009",
    topic: "networking",
    certs: [ACE, PCNE],
    difficulty: "easy",
    stem: "By default, what happens to inbound traffic to an instance in a newly created custom-mode VPC with no firewall rules configured?",
    options: [
      { id: "a", text: "All inbound traffic is denied by the implied deny ingress rule" },
      { id: "b", text: "All inbound traffic is allowed until a deny rule is created" },
      { id: "c", text: "Only traffic on ports 22 and 3389 is allowed" },
      { id: "d", text: "Inbound traffic is allowed only from within the same subnet" },
    ],
    correct: "a",
    concept: "Implied firewall rules deny all ingress and allow all egress",
    explanation:
      "Every VPC has two implied rules that cannot be removed: deny all ingress and allow all egress. With no rules configured, nothing can reach the instance from anywhere. You must create explicit allow rules for any traffic you want to permit, including SSH.",
    whyWrong: {
      b: "This describes the egress default, not ingress. Outbound traffic is allowed by default; inbound is not.",
      c: "Auto-mode networks include default rules permitting certain traffic, but a custom-mode network created without rules has none. The implied deny applies.",
      d: "There is no implied rule permitting intra-subnet traffic. Default rules in auto-mode networks create this behaviour explicitly, but they are ordinary rules rather than implied ones.",
    },
    learnMore: "vpc",
  },

  /* ------------------------------ KUBERNETES ---------------------------- */
  {
    id: "k8s-001",
    topic: "kubernetes",
    certs: [ACE, PCDE, PCD],
    difficulty: "medium",
    stem: "Several pods remain in the Pending state after a deployment is scaled up. Existing pods are healthy. What is the most likely cause?",
    options: [
      { id: "a", text: "No node has enough allocatable resources to satisfy the pods' resource requests" },
      { id: "b", text: "The container image cannot be pulled from the registry" },
      { id: "c", text: "The pods' liveness probes are failing" },
      { id: "d", text: "The service selector does not match the pod labels" },
    ],
    correct: "a",
    concept: "Pending pods indicate a scheduling problem, almost always insufficient capacity",
    explanation:
      "A pod stays Pending when the scheduler cannot place it on any node. The usual cause is that no node has enough unreserved CPU or memory to satisfy the pod's resource requests. The fix is either adding nodes — automatically, if the cluster autoscaler is enabled — or reducing the requests if they are set higher than the workload actually needs.",
    whyWrong: {
      b: "An image pull failure produces pods in ImagePullBackOff or ErrImagePull, not Pending. The pod has already been scheduled to a node at that point.",
      c: "Liveness probe failures affect pods that are already running and scheduled, causing restarts. A Pending pod has not started running yet.",
      d: "A selector mismatch means traffic does not reach the pods, but the pods themselves would still start and run normally.",
    },
    learnMore: "google-kubernetes-engine",
  },
  {
    id: "k8s-002",
    topic: "kubernetes",
    certs: [PCD, PCDE, PCA],
    difficulty: "hard",
    stem: "A pod needs to read from a Cloud Storage bucket. What is the recommended way to grant it access?",
    options: [
      {
        id: "a",
        text: "Configure Workload Identity so the Kubernetes service account acts as a Google service account",
      },
      { id: "b", text: "Create a service account key and mount it as a Kubernetes Secret" },
      { id: "c", text: "Grant the Storage Object Viewer role to the node pool's service account" },
      { id: "d", text: "Make the bucket publicly readable and access it without credentials" },
    ],
    correct: "a",
    concept: "Workload Identity removes long-lived credentials from the cluster",
    explanation:
      "Workload Identity binds a Kubernetes service account to a Google service account, so pods obtain short-lived credentials automatically. No key file is ever created, nothing long-lived is stored in the cluster, and access can be revoked instantly by changing the binding. This is the recommended pattern and the expected exam answer.",
    whyWrong: {
      b: "A mounted key file is a long-lived credential inside the cluster. Anyone who can read the Secret, or exec into the pod, obtains a credential that works from anywhere and does not expire.",
      c: "Granting the role to the node's service account gives every pod on that node the same access, including pods that should not have it. This violates least privilege and is a common misconfiguration.",
      d: "Making the bucket public exposes the data to the entire internet in order to solve an internal access problem. This is never the correct answer.",
    },
    learnMore: "google-kubernetes-engine",
  },
  {
    id: "k8s-003",
    topic: "kubernetes",
    certs: [ACE, PCDE],
    difficulty: "medium",
    stem: "A team wants pods to scale automatically with CPU load, and nodes to be added when there is insufficient capacity for new pods. What must be configured?",
    options: [
      { id: "a", text: "Horizontal Pod Autoscaler and Cluster Autoscaler" },
      { id: "b", text: "Horizontal Pod Autoscaler only" },
      { id: "c", text: "Vertical Pod Autoscaler and a managed instance group autoscaler" },
      { id: "d", text: "Cluster Autoscaler only" },
    ],
    correct: "a",
    concept: "Pod scaling and node scaling are separate mechanisms",
    explanation:
      "The Horizontal Pod Autoscaler adds and removes pod replicas in response to metrics such as CPU utilisation. The Cluster Autoscaler adds and removes nodes when pods cannot be scheduled or when nodes sit underused. The scenario describes both behaviours, so both are required.",
    whyWrong: {
      b: "Pod autoscaling alone will create pods that cannot be scheduled once the existing nodes are full. Those pods stay Pending and the workload does not actually scale.",
      c: "The Vertical Pod Autoscaler adjusts resource requests for individual pods rather than changing the replica count. Managing node pools through a raw instance group autoscaler bypasses the Kubernetes-aware scaling logic.",
      d: "Node autoscaling alone adds capacity but nothing creates additional pods to use it, so the application does not scale.",
    },
    learnMore: "google-kubernetes-engine",
  },
  {
    id: "k8s-004",
    topic: "kubernetes",
    certs: [PCDE, PCA],
    difficulty: "medium",
    stem: "A platform team has limited Kubernetes operational experience and wants to reduce the work of managing nodes, upgrades and node security configuration. Which choice best fits?",
    options: [
      { id: "a", text: "GKE Autopilot mode" },
      { id: "b", text: "GKE Standard mode with a large node pool" },
      { id: "c", text: "Self-managed Kubernetes on Compute Engine instances" },
      { id: "d", text: "GKE Standard mode with preemptible nodes" },
    ],
    correct: "a",
    concept: "Autopilot removes node management in exchange for reduced configurability",
    explanation:
      "In Autopilot mode, Google manages nodes, provisioning, scaling and much of the security configuration. You specify pod resource requirements and pay for what your pods request. For a team with limited Kubernetes operations experience, this removes the largest source of operational burden and of misconfiguration.",
    whyWrong: {
      b: "Standard mode leaves node pools, machine types, upgrades and node security configuration to you. A larger node pool means more nodes to manage, not fewer.",
      c: "Running Kubernetes yourself on virtual machines means operating the control plane as well, which is by far the most demanding option.",
      d: "Preemptible nodes reduce cost but add operational complexity, since workloads must tolerate nodes disappearing. This increases the burden rather than reducing it.",
    },
    learnMore: "google-kubernetes-engine",
  },
  {
    id: "k8s-005",
    topic: "kubernetes",
    certs: [PCDE, PCD],
    difficulty: "hard",
    stem: "A cluster runs several teams' workloads. A requirement states that pods in the payments namespace must not be reachable from pods in other namespaces. What should be implemented?",
    options: [
      { id: "a", text: "Network policies restricting ingress to the payments namespace" },
      { id: "b", text: "Separate node pools with taints for each namespace" },
      { id: "c", text: "Kubernetes RBAC roles scoped to each namespace" },
      { id: "d", text: "Resource quotas on each namespace" },
    ],
    correct: "a",
    concept: "Namespaces alone provide no network isolation; network policies do",
    explanation:
      "By default, any pod in a cluster can reach any other pod regardless of namespace. Namespaces are an organisational and access-control boundary, not a network boundary. Network policies define which pods may connect to which others, and are the mechanism that enforces the stated requirement.",
    whyWrong: {
      b: "Taints and node pools control where pods are scheduled, not which pods can communicate. Pods on different nodes can still reach each other over the cluster network.",
      c: "RBAC controls who can call the Kubernetes API to create or modify resources. It has no effect on pod-to-pod network traffic at runtime.",
      d: "Resource quotas limit how much CPU, memory and how many objects a namespace may consume. They are unrelated to network reachability.",
    },
    learnMore: "google-kubernetes-engine",
  },
  {
    id: "k8s-006",
    topic: "kubernetes",
    certs: [PCDE, PCD],
    difficulty: "medium",
    stem: "During a rolling update, users report intermittent errors. Pods are being terminated while still handling requests. What is the most appropriate fix?",
    options: [
      {
        id: "a",
        text: "Add a readiness probe and configure graceful shutdown handling with an appropriate termination grace period",
      },
      { id: "b", text: "Increase the number of replicas in the deployment" },
      { id: "c", text: "Switch the deployment strategy to Recreate" },
      { id: "d", text: "Increase the CPU limit on the containers" },
    ],
    correct: "a",
    concept: "Safe rollouts require readiness signalling and graceful connection draining",
    explanation:
      "A readiness probe ensures a pod only receives traffic once it is genuinely able to serve. Graceful shutdown — handling the termination signal, finishing in-flight requests and then exiting within the grace period — ensures a pod being removed does not drop requests it has already accepted. Together they eliminate the errors described.",
    whyWrong: {
      b: "More replicas reduce the proportion of traffic affected but do not stop individual pods from dropping in-flight requests. The errors continue at a lower rate.",
      c: "The Recreate strategy terminates all old pods before starting new ones, producing complete downtime during every deployment. This makes the situation considerably worse.",
      d: "CPU limits affect throughput and throttling. The described problem is about connection handling during termination, which more CPU does not address.",
    },
    learnMore: "google-kubernetes-engine",
  },
];
