import type { LearnTopic } from "@/types";

export const storageTopics: LearnTopic[] = [
  {
    slug: "cloud-storage",
    title: "Cloud Storage",
    category: "storage",
    summary:
      "Object storage for files of any size: buckets, storage classes, lifecycle rules and access control.",
    oneLiner:
      "Cloud Storage is a bucket you put files into — it does not care what the file is, scales without limit, and charges you differently depending on how often you expect to read it back.",
    readingWords: 1000,
    updated: "2026-08-12",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Cloud Storage holds objects — files — inside containers called buckets. An object has content, a name and metadata. There are no real directories; what looks like a folder path is simply part of the object name, which is why listing a large 'folder' can be slower than you expect.",
          },
          {
            type: "p",
            text: "Objects are immutable. You do not edit an object in place; you replace it. This constraint is what allows the service to be simultaneously enormously scalable and strongly consistent.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Object storage is the default home for anything that is not in a database: user uploads, images, video, backups, logs, exports, machine learning training data and data lake contents. It is usually the cheapest durable place to keep bytes.",
          },
          {
            type: "p",
            text: "It also underpins a great deal of other architecture. Analytics reads from it, pipelines stage data in it, and backups land in it. Understanding its cost model is one of the highest-leverage things you can learn about cloud economics.",
          },
        ],
      },
      {
        heading: "Storage classes",
        body: [
          {
            type: "table",
            head: ["Class", "Intended for", "The trade-off"],
            rows: [
              [
                "Standard",
                "Data accessed frequently, or served to users.",
                "Highest storage price, no retrieval charge, no minimum duration.",
              ],
              [
                "Nearline",
                "Data accessed roughly once a month or less.",
                "Cheaper storage, but you pay to retrieve and are billed a 30-day minimum.",
              ],
              [
                "Coldline",
                "Data accessed roughly once a quarter.",
                "Cheaper again, higher retrieval cost, 90-day minimum.",
              ],
              [
                "Archive",
                "Long-term retention you hope never to read — compliance, disaster recovery.",
                "Cheapest storage, highest retrieval cost, 365-day minimum.",
              ],
            ],
          },
          {
            type: "note",
            text: "The minimum storage duration is the detail that catches people. Moving an object to Archive and deleting it a week later still costs you a full year of Archive storage. Lifecycle rules that move data too aggressively can increase your bill rather than reduce it.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Bucket** — the container. Its name is globally unique across all customers, and its location is fixed at creation and cannot be changed.",
              "**Location type** — regional for lowest latency and cost within one region; dual-region and multi-region for higher availability at higher cost.",
              "**Lifecycle rules** — automatic transitions between classes, or deletion, based on age, version count or other conditions.",
              "**Object versioning** — keeps previous versions when an object is overwritten or deleted. Protects against accidental deletion; also silently multiplies storage cost if you never expire old versions.",
              "**Uniform bucket-level access** — applies IAM consistently across the whole bucket instead of per-object access lists. The recommended default; per-object lists are hard to audit.",
              "**Signed URL** — a time-limited URL granting access to a specific object without the requester having any account. The standard way to let a user upload or download directly.",
              "**Retention policy** — prevents deletion for a defined period. When locked, it cannot be shortened even by an administrator, which is what makes it usable for compliance.",
              "**Customer-managed encryption keys** — everything is encrypted by default; this lets you control the key and therefore revoke access to the data by disabling it.",
            ],
          },
        ],
      },
      {
        heading: "Where the cost actually comes from",
        body: [
          {
            type: "diagram",
            caption: "Four separate charges, and the last one causes most unpleasant surprises.",
            steps: [
              "Storage — gigabytes held per month, priced by class",
              "Operations — a small charge per read, write or list request",
              "Retrieval — a per-gigabyte charge that applies to the colder classes only",
              "Network egress — data leaving the provider's network, priced by destination",
            ],
          },
          {
            type: "p",
            text: "A frequent real-world mistake: moving frequently-read data to a colder class to save on storage, then paying far more in retrieval charges than was saved. Cold classes are for data you genuinely do not read.",
          },
        ],
      },
      {
        heading: "Common use cases",
        body: [
          {
            type: "ul",
            items: [
              "Storing user uploads and serving media through a content delivery network.",
              "Landing zone for a data lake, queried directly by analytics tools.",
              "Backup and disaster recovery targets with lifecycle rules moving older backups to colder classes.",
              "Hosting static website assets behind a load balancer.",
              "Staging exports between systems, including bulk data loads into a warehouse.",
              "Long-term compliance archives protected by a locked retention policy.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "associate-cloud-engineer",
        note: "Directly tested: creating buckets, choosing classes, configuring lifecycle rules and setting access with IAM or signed URLs.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Storage class economics, location choice and retention policy design appear in cost and compliance scenarios.",
      },
      {
        cert: "professional-data-engineer",
        note: "The foundation of data lake architecture, staging and archival strategy.",
      },
      {
        cert: "cloud-digital-leader",
        note: "Conceptual: understanding object storage versus databases and why the classes exist.",
      },
    ],
    questionTopic: "storage",
    related: ["bigquery", "cloud-cdn", "cloud-kms", "filestore"],
  },

  {
    slug: "filestore",
    title: "Filestore and Shared File Storage",
    category: "storage",
    summary:
      "Managed network file storage for applications that need a real file system shared across many machines.",
    oneLiner:
      "Filestore is a shared network drive that many virtual machines can mount at once — the right answer when software insists on a file system rather than an API.",
    readingWords: 700,
    updated: "2026-08-12",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Filestore provides managed network-attached file storage using the NFS protocol. Multiple machines mount the same share and see the same directory tree, with standard file semantics: partial writes, renames, locking and permissions.",
          },
          {
            type: "p",
            text: "That is the crucial difference from object storage. Object storage requires you to replace a whole object; a file system lets you seek to a position and modify part of a file. Software written for a file system generally cannot use object storage without being rewritten.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "A large amount of existing software assumes a POSIX file system — content management systems, media processing tools, scientific applications, and older enterprise software. During a migration, a shared file system is often what makes lift-and-shift possible at all.",
          },
          {
            type: "p",
            text: "It also solves a specific architectural problem: several machines needing simultaneous read-write access to the same data. Persistent disks generally attach to one instance for writing; a network file share does not have that limitation.",
          },
        ],
      },
      {
        heading: "Choosing between storage types",
        body: [
          {
            type: "table",
            head: ["Need", "Use", "Why"],
            rows: [
              [
                "Files served to users, backups, data lake contents",
                "Cloud Storage (object)",
                "Cheapest, unlimited scale, accessed over HTTP.",
              ],
              [
                "A boot disk or a database's data directory",
                "Persistent disk (block)",
                "Low-latency block device attached to a single instance.",
              ],
              [
                "Shared read-write file system across many machines",
                "Filestore (file)",
                "Standard file semantics with concurrent access.",
              ],
              [
                "Temporary scratch space needing maximum speed",
                "Local SSD",
                "Fastest available, but data is lost when the instance stops.",
              ],
            ],
          },
          {
            type: "note",
            text: "This table is worth memorising. Storage-selection questions across several exams are answered by matching the access pattern in the scenario to one of these four rows.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Service tier** — determines performance and capacity range. Higher tiers deliver more throughput at higher cost.",
              "**Capacity affects performance** — throughput generally scales with provisioned capacity, so a share can be too small to be fast enough.",
              "**Mount target** — the address clients mount, reachable from within your VPC network.",
              "**Snapshots and backups** — point-in-time copies for recovery.",
              "**Regional availability** — higher tiers can offer availability across zones within a region.",
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
              "Content management systems where several application servers share an uploads directory.",
              "Media rendering farms where many machines read the same assets.",
              "Scientific and engineering applications that expect a POSIX file system.",
              "Home directories and shared workspaces for development environments.",
              "Lift-and-shift migrations of software that cannot be modified to use object storage.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "associate-cloud-engineer",
        note: "Appears mainly as a selection question: recognising when a shared file system rather than object or block storage is required.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Common in migration scenarios where legacy software depends on file system semantics.",
      },
    ],
    questionTopic: "storage",
    related: ["cloud-storage", "compute-engine", "google-kubernetes-engine"],
  },

  {
    slug: "cloud-sql",
    title: "Cloud SQL",
    category: "databases",
    summary:
      "Managed relational databases — MySQL, PostgreSQL and SQL Server — with automated backups, replication and failover.",
    oneLiner:
      "Cloud SQL is the relational database you already know, with someone else handling backups, patching, replication and failover.",
    readingWords: 1000,
    updated: "2026-08-15",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Cloud SQL runs standard MySQL, PostgreSQL and SQL Server engines as a managed service. Your application connects with an ordinary driver and issues ordinary SQL. What changes is that provisioning, patching, backups, replication and failover are handled by the platform rather than by you.",
          },
          {
            type: "p",
            text: "Because it is the real engine rather than a compatible reimplementation, existing applications and tooling generally work unchanged. That compatibility is the main reason it is the most common first database choice during a migration.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Relational databases with ACID transactions remain the correct default for most application data. Orders, accounts, inventory and anything where correctness under concurrent updates matters belong in one.",
          },
          {
            type: "p",
            text: "The managed service removes the operational work that databases traditionally demand — the backup that was never tested, the patch that was postponed, the failover procedure nobody had rehearsed. These are the failures that cause real outages.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Instance** — a running database server with a machine size, storage allocation and configuration.",
              "**High availability** — a standby instance in a second zone with synchronous replication. Failover is automatic and keeps the same connection address.",
              "**Read replica** — an asynchronous copy used to serve read queries. Reduces load on the primary but can lag slightly behind it.",
              "**Automated backups and point-in-time recovery** — scheduled backups plus transaction logs, letting you restore to a specific moment rather than only to the last backup.",
              "**Maintenance window** — when the platform may apply updates that briefly restart the instance. Choose it deliberately rather than accepting the default.",
              "**Cloud SQL Auth Proxy** — establishes an authenticated, encrypted connection without exposing the database to the public internet or managing IP allowlists.",
              "**Private IP** — placing the instance on your VPC so it has no public address at all. The recommended configuration.",
              "**Connection limits** — a fixed maximum by instance size. Serverless applications that scale rapidly can exhaust connections; pooling is not optional at scale.",
            ],
          },
          {
            type: "note",
            text: "High availability and read replicas solve different problems. High availability protects against a zone failure. Read replicas distribute read load. A read replica is not a substitute for high availability, and questions test that distinction directly.",
          },
        ],
      },
      {
        heading: "How high availability behaves",
        body: [
          {
            type: "diagram",
            caption: "Automatic failover keeps the connection address stable.",
            steps: [
              "Primary instance serves all reads and writes in zone A",
              "Standby instance in zone B receives synchronous replication",
              "Zone A becomes unavailable and health checks fail",
              "The standby is promoted automatically to primary",
              "Applications reconnect to the same address and resume",
            ],
          },
          {
            type: "p",
            text: "Failover is not instantaneous. There is a short interruption during which connections drop, so applications need retry logic. A design that assumes zero interruption during failover is incorrect, and exams test this.",
          },
        ],
      },
      {
        heading: "When Cloud SQL is not the answer",
        body: [
          {
            type: "ul",
            items: [
              "**You need to scale writes beyond a single machine.** Cloud SQL scales reads with replicas but writes go to one primary. Global scale-out writes require Spanner.",
              "**You need a single database spanning regions with strong consistency.** That is Spanner's specific purpose.",
              "**Your data is huge, semi-structured and needs very high write throughput with simple lookups.** That is Bigtable.",
              "**Your workload is analytical — scanning billions of rows for aggregates.** That is BigQuery, and running such queries against Cloud SQL will be slow and expensive.",
              "**You want a flexible document model with real-time client synchronisation.** That is Firestore.",
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
              "Transactional data for web and mobile applications.",
              "Content management and e-commerce back ends.",
              "Migrating an existing on-premises database with minimal application change.",
              "Reporting databases fed by read replicas so analytics does not slow the primary.",
              "Line-of-business applications where SQL Server compatibility is required.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "associate-cloud-engineer",
        note: "Tested practically: creating an instance, enabling high availability, adding read replicas and connecting securely.",
      },
      {
        cert: "professional-cloud-database-engineer",
        note: "A core topic — availability design, migration, connection management, tuning and recovery planning.",
      },
      {
        cert: "professional-cloud-developer",
        note: "Connecting from applications, managing connection pools and handling transient failures during failover.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Database selection under stated constraints, and designing to explicit recovery objectives.",
      },
    ],
    questionTopic: "databases",
    related: ["spanner", "firestore", "bigtable", "bigquery"],
  },

  {
    slug: "spanner",
    title: "Spanner",
    category: "databases",
    summary:
      "A relational database that scales horizontally across regions while keeping strong consistency and SQL semantics.",
    oneLiner:
      "Spanner is a SQL database that scales out like a distributed system while still giving you transactions that behave correctly across the whole planet.",
    readingWords: 950,
    updated: "2026-08-16",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Spanner is a distributed relational database. It offers SQL, schemas, secondary indexes and ACID transactions — while distributing data across many machines and, if you choose, across regions.",
          },
          {
            type: "p",
            text: "Historically, systems forced a choice: relational guarantees on one machine, or horizontal scale with weaker consistency. Spanner's significance is that it provides both, using tightly synchronised clocks to order transactions globally.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "For systems that genuinely outgrow a single-machine database but cannot give up transactional correctness — payments, ledgers, inventory, global user accounts — there are very few alternatives that do not involve building the consistency logic yourself.",
          },
          {
            type: "p",
            text: "The trade-off is cost. Spanner has a meaningful minimum spend and is substantially more expensive than Cloud SQL for small workloads. Choosing it for a database that would fit comfortably on one machine is a classic over-engineering error, and exams test that judgement.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Instance** — the provisioned capacity, measured in nodes or processing units, plus a chosen configuration.",
              "**Instance configuration** — regional for lower cost and latency in one region; multi-region for higher availability and global reads at higher cost.",
              "**Split** — the unit of data distribution. Spanner divides tables into ranges and spreads them across servers automatically.",
              "**Primary key design** — the most consequential decision you make. Keys determine how data is distributed, and a poor choice creates a hotspot that limits throughput.",
              "**Interleaved tables** — physically storing child rows next to their parent rows so related data is fetched together efficiently.",
              "**Strong and stale reads** — strongly consistent reads always see the latest data; slightly stale reads can be cheaper and faster when a few seconds of lag is acceptable.",
              "**External consistency** — the strongest guarantee Spanner offers: transactions appear in an order consistent with real time, globally.",
            ],
          },
          {
            type: "note",
            text: "Never use a monotonically increasing primary key such as a timestamp or auto-increment integer. All writes land on the same split, creating a hotspot. Use a UUID, or hash a sequential value. This is the most reliably tested Spanner detail.",
          },
        ],
      },
      {
        heading: "Choosing between relational options",
        body: [
          {
            type: "table",
            head: ["Requirement", "Answer"],
            rows: [
              [
                "Standard relational workload that fits on one machine",
                "Cloud SQL — cheaper and simpler.",
              ],
              [
                "Write throughput beyond a single machine, still needs transactions",
                "Spanner.",
              ],
              [
                "Single database serving several regions with strong consistency",
                "Spanner in a multi-region configuration.",
              ],
              [
                "Analytical queries scanning enormous volumes",
                "BigQuery — not an operational database.",
              ],
              [
                "Migrating an existing MySQL or PostgreSQL application unchanged",
                "Cloud SQL — Spanner requires schema and application changes.",
              ],
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
              "Financial ledgers and payment systems needing correctness at scale.",
              "Global inventory where overselling must be impossible across regions.",
              "Gaming platforms with worldwide player state and leaderboards.",
              "Telecommunications and logistics systems with very high transaction volumes.",
              "Consolidating many sharded databases that have become unmanageable.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-cloud-architect",
        note: "A frequent correct answer in scenarios combining global scale with transactional requirements — and a frequent wrong answer when the scenario is smaller than it first appears.",
      },
      {
        cert: "professional-cloud-database-engineer",
        note: "Deep coverage: schema design, hotspot avoidance, instance sizing and multi-region configuration.",
      },
      {
        cert: "professional-data-engineer",
        note: "Appears in storage-selection questions distinguishing operational from analytical workloads.",
      },
    ],
    questionTopic: "databases",
    related: ["cloud-sql", "bigtable", "firestore", "bigquery"],
  },

  {
    slug: "firestore",
    title: "Firestore",
    category: "databases",
    summary:
      "A serverless document database with flexible schemas, real-time synchronisation and offline support for client applications.",
    oneLiner:
      "Firestore stores JSON-like documents, scales without you provisioning anything, and can push changes to connected apps the moment data changes.",
    readingWords: 900,
    updated: "2026-08-16",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Firestore is a document database. Instead of tables and rows, you store documents — structured objects similar to JSON — inside collections. Documents in the same collection do not need identical fields, so the schema can vary between records and evolve over time.",
          },
          {
            type: "p",
            text: "It is serverless: there is no instance to size or scale. You are billed for the operations you perform and the data you store, and capacity adjusts automatically.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Two properties make Firestore distinctive rather than merely convenient. The first is real-time listeners: a client subscribes to a query and receives updates automatically when matching data changes. Building that with a conventional database means writing a whole synchronisation layer.",
          },
          {
            type: "p",
            text: "The second is offline support. Mobile clients can read and write while disconnected, and changes reconcile when connectivity returns. For mobile applications this removes a substantial amount of difficult work.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Document** — a record holding fields, with a size limit that discourages storing large blobs. Large files belong in Cloud Storage with a reference in the document.",
              "**Collection** — a container of documents. Collections can be nested under documents to model hierarchy.",
              "**Query** — filters and orders documents. Queries are designed to scale with the size of the result rather than the size of the collection.",
              "**Index** — single-field indexes are automatic; queries combining multiple filters and ordering require a composite index you define.",
              "**Real-time listener** — a subscription that pushes changes to the client as they happen.",
              "**Security rules** — declarative authorisation evaluated on the server, allowing clients to talk to the database directly and safely.",
              "**Transactions and batched writes** — atomic operations across multiple documents.",
            ],
          },
          {
            type: "note",
            text: "Firestore deliberately does not support queries that would scan the whole collection, such as arbitrary text search or many inequality filters across different fields. This is what keeps it fast at scale, and it means you model data around the queries you need rather than normalising first.",
          },
        ],
      },
      {
        heading: "Modelling for a document database",
        body: [
          {
            type: "p",
            text: "The habits of relational modelling work against you here. In a relational database you normalise and join at read time. In a document database you frequently duplicate data so that a single read returns everything a screen needs.",
          },
          {
            type: "ul",
            items: [
              "Start from the screens in your application and work backwards to the documents.",
              "Denormalise deliberately — storing an author's display name on each post is normal, not a mistake.",
              "Keep counters and aggregates as maintained fields rather than computing them by reading many documents.",
              "Store large binary content in object storage and keep only the reference in the document.",
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
              "Mobile applications needing offline capability and automatic synchronisation.",
              "Collaborative tools where several users see updates live.",
              "Chat, notifications and activity feeds.",
              "User profiles, preferences and application state.",
              "Rapid prototyping where the schema is still changing frequently.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "associate-cloud-engineer",
        note: "Mainly selection: recognising when a document database is more appropriate than a relational one.",
      },
      {
        cert: "professional-cloud-developer",
        note: "Data modelling, security rules, transactions and real-time listeners from an application perspective.",
      },
      {
        cert: "professional-cloud-database-engineer",
        note: "Covered as part of operating a mixed database estate, including indexing and cost behaviour.",
      },
    ],
    questionTopic: "databases",
    related: ["cloud-sql", "bigtable", "spanner", "cloud-storage"],
  },

  {
    slug: "bigtable",
    title: "Bigtable",
    category: "databases",
    summary:
      "A wide-column NoSQL database built for very high throughput and low-latency lookups over enormous datasets.",
    oneLiner:
      "Bigtable is an extremely fast key-value store for gigantic datasets, where everything depends on designing the row key correctly.",
    readingWords: 900,
    updated: "2026-08-17",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Bigtable is a wide-column store. Data is organised as rows identified by a single row key, with columns grouped into column families. It is designed for datasets measured in terabytes or petabytes, with consistently low latency for reads and writes at very high volume.",
          },
          {
            type: "p",
            text: "It offers no SQL, no joins and no multi-row transactions. Those omissions are the point: removing them is what allows predictable single-digit millisecond latency at enormous scale.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Certain workloads have a shape no general-purpose database serves well: enormous volume, very high write rates, simple access patterns and a strict latency requirement. Time series data, IoT telemetry, financial market data and large-scale personalisation all fit that description.",
          },
          {
            type: "p",
            text: "For these, Bigtable is frequently the only option that meets the requirement at acceptable cost. For anything else, it is usually the wrong choice, and exams test whether you recognise the difference.",
          },
        ],
      },
      {
        heading: "Row key design decides everything",
        body: [
          {
            type: "p",
            text: "Bigtable sorts rows lexicographically by row key and distributes contiguous ranges across servers. Every performance characteristic follows from that single fact.",
          },
          {
            type: "ul",
            items: [
              "**Sequential keys create hotspots.** A key beginning with a timestamp sends all current writes to one server while the rest sit idle.",
              "**Field promotion.** Put a high-cardinality identifier first, then the timestamp — `sensor123#20260907T1204` distributes writes across sensors while keeping each sensor's readings together.",
              "**Salting.** Prefixing a hash spreads writes evenly, at the cost of making range scans harder.",
              "**Design for your read pattern.** Rows you read together should sort together, because a range scan over adjacent rows is dramatically faster than many individual lookups.",
              "**Reversed timestamps** put the newest data first when you usually want the most recent readings.",
            ],
          },
          {
            type: "note",
            text: "There is no way to fix a bad row key later without rewriting the data. Almost every Bigtable exam question about poor performance has a hotspot caused by key design as its answer.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Instance and cluster** — the provisioned capacity. Clusters in multiple zones or regions can serve the same data for availability.",
              "**Node** — a unit of serving capacity. Throughput scales roughly linearly with node count.",
              "**Column family** — a group of related columns configured together, including their retention policy.",
              "**Cell** — the value at a row, column and timestamp. Bigtable can retain multiple versions over time.",
              "**Garbage collection policy** — automatically expires old versions or old data, controlling storage growth.",
              "**Application profile** — controls routing between clusters and whether single-cluster or multi-cluster routing is used.",
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
              "Time series data from sensors, devices and infrastructure monitoring.",
              "Financial market data with very high ingest rates.",
              "User behaviour and personalisation data read at low latency during a request.",
              "Ad technology platforms requiring lookups within tight latency budgets.",
              "Graph-shaped and adjacency data at very large scale.",
            ],
          },
          {
            type: "p",
            text: "It is the wrong answer for transactional application data, anything needing joins or ad-hoc SQL, and anything small enough to fit comfortably in a relational database.",
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-data-engineer",
        note: "Heavily tested, especially row key design and recognising when Bigtable beats BigQuery or Cloud SQL.",
      },
      {
        cert: "professional-cloud-database-engineer",
        note: "Schema design, cluster sizing, replication and performance troubleshooting.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Appears in selection questions where latency and scale requirements rule out other options.",
      },
    ],
    questionTopic: "databases",
    related: ["bigquery", "cloud-sql", "spanner", "pub-sub"],
  },
];
