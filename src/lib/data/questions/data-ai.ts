import type { PracticeQuestion } from "@/types";

const ACE = "associate-cloud-engineer";
const PCA = "professional-cloud-architect";
const PCD = "professional-cloud-developer";
const PDE = "professional-data-engineer";
const PMLE = "professional-machine-learning-engineer";
const PCDBE = "professional-cloud-database-engineer";
const GAIL = "generative-ai-leader";
const CDL = "cloud-digital-leader";

export const dataAiQuestions: PracticeQuestion[] = [
  /* ------------------------------ DATABASES ----------------------------- */
  {
    id: "db-001",
    topic: "databases",
    certs: [PDE, PCA, PCDBE],
    difficulty: "hard",
    stem: "A payments platform needs a single database serving three continents, with strongly consistent transactions and horizontal write scaling beyond one machine. Which option fits?",
    options: [
      { id: "a", text: "Spanner in a multi-region configuration" },
      { id: "b", text: "Cloud SQL with cross-region read replicas" },
      { id: "c", text: "Bigtable with clusters in each region" },
      { id: "d", text: "Firestore in multi-region mode" },
    ],
    correct: "a",
    concept: "Spanner is the option combining horizontal scale with strong global consistency",
    explanation:
      "Spanner provides relational semantics and ACID transactions while distributing data across machines and regions. Its multi-region configurations offer strong consistency globally, which is what a payments ledger requires. It is the only option here that satisfies all three stated requirements simultaneously.",
    whyWrong: {
      b: "Cloud SQL writes go to a single primary instance, so writes cannot scale horizontally. Read replicas are also asynchronous, so they do not provide strong consistency for reads.",
      c: "Bigtable offers enormous scale but no multi-row transactions and no SQL. A payments ledger requires transactional guarantees across rows that Bigtable does not provide.",
      d: "Firestore supports transactions but is a document database aimed at application state and client synchronisation, not high-volume relational transaction processing with cross-continent consistency requirements.",
    },
    learnMore: "spanner",
  },
  {
    id: "db-002",
    topic: "databases",
    certs: [PDE, PCDBE],
    difficulty: "hard",
    stem: "A Bigtable table storing sensor readings uses a row key beginning with the reading timestamp. Write throughput is far below expectations and one node is heavily loaded. What is the fix?",
    options: [
      {
        id: "a",
        text: "Redesign the row key to lead with a high-cardinality identifier such as the sensor ID, followed by the timestamp",
      },
      { id: "b", text: "Add more nodes to the Bigtable cluster" },
      { id: "c", text: "Enable a secondary index on the sensor ID column" },
      { id: "d", text: "Increase the garbage collection retention period" },
    ],
    correct: "a",
    concept: "Sequential row keys create hotspots because Bigtable distributes contiguous key ranges",
    explanation:
      "Bigtable sorts rows by key and assigns contiguous ranges to servers. A key starting with a timestamp means all writes for the current moment share adjacent keys, so they land on one server while others sit idle. Leading with the sensor ID distributes writes across many key ranges while still keeping each sensor's readings sorted together for efficient range scans.",
    whyWrong: {
      b: "Adding nodes increases total capacity but does nothing about the distribution problem. All current writes still target one key range, so one node remains saturated while the new ones are idle.",
      c: "Bigtable does not provide secondary indexes. Access patterns must be designed into the row key, which is why key design matters so much.",
      d: "Garbage collection controls how long old cell versions are retained. It affects storage consumption, not write distribution.",
    },
    learnMore: "bigtable",
  },
  {
    id: "db-003",
    topic: "databases",
    certs: [ACE, PCDBE],
    difficulty: "medium",
    stem: "A Cloud SQL instance must survive the loss of a single zone with automatic failover and no change to the application's connection address. What should be enabled?",
    options: [
      { id: "a", text: "High availability configuration with a standby in a second zone" },
      { id: "b", text: "A read replica in a second zone" },
      { id: "c", text: "Automated daily backups with point-in-time recovery" },
      { id: "d", text: "A larger machine type for the instance" },
    ],
    correct: "a",
    concept: "High availability provides automatic failover; read replicas do not",
    explanation:
      "The high availability configuration maintains a synchronously replicated standby in another zone. If the primary's zone fails, the standby is promoted automatically and the connection address stays the same, so applications reconnect without configuration changes. This is exactly what the requirement describes.",
    whyWrong: {
      b: "Read replicas are asynchronous and serve read traffic. Promoting one is a manual operation, it may lose recent transactions, and it results in a different connection address.",
      c: "Backups let you restore after data loss, which involves significant downtime and manual work. They are not an availability mechanism.",
      d: "A larger machine handles more load. It provides no protection whatsoever against the zone hosting it becoming unavailable.",
    },
    learnMore: "cloud-sql",
  },
  {
    id: "db-004",
    topic: "databases",
    certs: [PCD, PDE],
    difficulty: "medium",
    stem: "A mobile application must let users read and edit their data while offline, synchronising automatically when connectivity returns. Which database supports this natively?",
    options: [
      { id: "a", text: "Firestore" },
      { id: "b", text: "Cloud SQL" },
      { id: "c", text: "BigQuery" },
      { id: "d", text: "Bigtable" },
    ],
    correct: "a",
    concept: "Firestore's client libraries provide offline persistence and automatic synchronisation",
    explanation:
      "Firestore's mobile and web client libraries cache data locally, allow reads and writes while offline, and reconcile changes with the server when the connection returns. Real-time listeners then push updates to other clients. Building this behaviour on any other database means writing a synchronisation layer yourself.",
    whyWrong: {
      b: "Cloud SQL requires a live network connection for every operation and provides no client-side caching or synchronisation.",
      c: "BigQuery is an analytical warehouse for large-scale queries, not an operational store for application data, and it has no offline client model.",
      d: "Bigtable is a high-throughput server-side store. It has no offline client support and is not intended for direct access from mobile devices.",
    },
    learnMore: "firestore",
  },
  {
    id: "db-005",
    topic: "databases",
    certs: [PCDBE, PDE],
    difficulty: "hard",
    stem: "A team must migrate a large on-premises PostgreSQL database to Cloud SQL with the shortest possible downtime. Which approach is most appropriate?",
    options: [
      {
        id: "a",
        text: "Take an initial snapshot, then replicate ongoing changes continuously and cut over once replication lag is minimal",
      },
      { id: "b", text: "Export a full dump, import it, then switch the application over" },
      { id: "c", text: "Run both databases in parallel and have the application write to both" },
      { id: "d", text: "Copy the database files directly to the Cloud SQL instance's disk" },
    ],
    correct: "a",
    concept: "Continuous replication minimises the cutover window",
    explanation:
      "Loading an initial snapshot and then continuously replicating subsequent changes means the target stays nearly current with the source. The cutover window shrinks to the time needed to stop writes, let the last changes replicate, and redirect the application — typically minutes rather than hours.",
    whyWrong: {
      b: "A dump-and-import requires the source to be read-only for the entire duration of the export, transfer and import. For a large database that means hours of downtime, which contradicts the requirement.",
      c: "Dual writes are complex to implement correctly and introduce a difficult consistency problem when one write succeeds and the other fails. This is a substantial engineering project rather than a migration approach.",
      d: "Cloud SQL is a managed service and does not expose the underlying disk for direct file placement. This is not possible.",
    },
    learnMore: "cloud-sql",
  },
  {
    id: "db-006",
    topic: "databases",
    certs: [PCD, PCDBE],
    difficulty: "hard",
    stem: "A serverless application scales rapidly and begins exhausting the Cloud SQL instance's connection limit during traffic spikes. What is the most appropriate remedy?",
    options: [
      {
        id: "a",
        text: "Introduce connection pooling between the application and the database",
      },
      { id: "b", text: "Increase the maximum instance count for the application" },
      { id: "c", text: "Add read replicas to distribute the connections" },
      { id: "d", text: "Switch the instance to a multi-region configuration" },
    ],
    correct: "a",
    concept: "Connection pooling decouples application concurrency from database connection count",
    explanation:
      "Serverless runtimes create many short-lived instances, each opening its own connections, which exhausts the database's fixed limit. A connection pool sits between them and maintains a bounded set of database connections that are reused. This addresses the mismatch directly rather than fighting it.",
    whyWrong: {
      b: "More application instances open more connections, making the exhaustion worse rather than better.",
      c: "Read replicas can offload read connections, but write connections still go to the primary and the fundamental mismatch between application concurrency and connection limits remains.",
      d: "Cloud SQL does not offer a multi-region configuration in this sense, and geographic distribution would not change the per-instance connection limit.",
    },
    learnMore: "cloud-sql",
  },
  {
    id: "db-007",
    topic: "databases",
    certs: [PDE, PCA],
    difficulty: "medium",
    stem: "An application needs sub-10ms lookups of user profile data by user ID, at 500,000 reads per second, over a dataset of 40 terabytes. Which store fits best?",
    options: [
      { id: "a", text: "Bigtable" },
      { id: "b", text: "Cloud SQL with read replicas" },
      { id: "c", text: "BigQuery" },
      { id: "d", text: "Spanner in a regional configuration" },
    ],
    correct: "a",
    concept: "Bigtable targets very high throughput key lookups over very large datasets",
    explanation:
      "The access pattern is a simple lookup by a single key, at extremely high volume, over a dataset far too large for a single relational instance. This is precisely Bigtable's design point: predictable low-latency reads that scale linearly with node count.",
    whyWrong: {
      b: "40 terabytes and 500,000 reads per second exceed what a Cloud SQL instance and its replicas can serve. Relational overhead is unnecessary for a pure key lookup.",
      c: "BigQuery is an analytical engine optimised for scanning large volumes, not for single-row lookups. Per-query latency is far above 10 milliseconds.",
      d: "Spanner could handle the scale, but it costs considerably more than Bigtable and its transactional guarantees are unnecessary for simple profile lookups. Choosing it here is over-engineering.",
    },
    learnMore: "bigtable",
  },
  {
    id: "db-008",
    topic: "databases",
    certs: [PCDBE, PCA],
    difficulty: "medium",
    stem: "A business states that after a failure, the system may lose at most five minutes of data. Which term describes this requirement?",
    options: [
      { id: "a", text: "Recovery point objective (RPO)" },
      { id: "b", text: "Recovery time objective (RTO)" },
      { id: "c", text: "Service level objective (SLO)" },
      { id: "d", text: "Mean time between failures (MTBF)" },
    ],
    correct: "a",
    concept: "RPO is data loss tolerance; RTO is downtime tolerance",
    explanation:
      "The recovery point objective defines how much data the business can tolerate losing, expressed as a period of time. Five minutes of acceptable data loss is an RPO of five minutes, and it dictates how frequently data must be replicated or backed up.",
    whyWrong: {
      b: "The recovery time objective defines how long the system may be unavailable before service is restored. It is about downtime duration, not data loss.",
      c: "A service level objective is a reliability target for normal operation, such as the proportion of successful requests. It is not a disaster recovery measure.",
      d: "Mean time between failures estimates how often failures occur. It says nothing about what is acceptable when one does.",
    },
    learnMore: "cloud-sql",
  },

  /* ------------------------------- DATA --------------------------------- */
  {
    id: "data-001",
    topic: "data",
    certs: [PDE, PCA],
    difficulty: "hard",
    stem: "A BigQuery table holds five years of event data. Analysts almost always query a single day at a time, but every query is expensive. What change most reduces cost?",
    options: [
      { id: "a", text: "Partition the table by event date and require a partition filter on queries" },
      { id: "b", text: "Add an index on the event date column" },
      { id: "c", text: "Create a view that filters to the most recent day" },
      { id: "d", text: "Move the table to a colder storage class" },
    ],
    correct: "a",
    concept: "Partitioning is what actually reduces bytes scanned in BigQuery",
    explanation:
      "BigQuery bills on-demand queries by bytes read. Partitioning by date physically separates the data so a query filtering to one day reads only that partition instead of scanning five years. Requiring a partition filter prevents anyone from accidentally running a query that scans everything.",
    whyWrong: {
      b: "BigQuery does not use traditional indexes for this purpose. A filter on an unpartitioned, unclustered column still requires reading that column across the entire table.",
      c: "A view is a saved query. It does not change how much underlying data is read, so the cost of running it is unchanged.",
      d: "Long-term storage pricing reduces the cost of storing data at rest. It has no effect on query cost, which is what the question identifies as the problem.",
    },
    learnMore: "bigquery",
  },
  {
    id: "data-002",
    topic: "data",
    certs: [PDE],
    difficulty: "hard",
    stem: "A streaming pipeline aggregates events into one-hour windows by event time. Some mobile events arrive two hours late because devices were offline. What determines whether those events are included?",
    options: [
      {
        id: "a",
        text: "The allowed lateness configuration and the trigger policy for the window",
      },
      { id: "b", text: "The message retention period configured on the Pub/Sub subscription" },
      { id: "c", text: "The autoscaling settings of the pipeline workers" },
      { id: "d", text: "The partitioning scheme of the destination table" },
    ],
    correct: "a",
    concept: "Late data handling is governed by allowed lateness and triggers",
    explanation:
      "When the watermark passes a window's end, the window is considered complete and emits a result. Allowed lateness defines how long after that the system will still accept events for that window, and the trigger policy determines whether a late event causes a corrected result to be emitted. Together they decide what happens to the two-hour-late events.",
    whyWrong: {
      b: "Retention governs how long messages remain available in the subscription for delivery or replay. Once delivered to the pipeline, whether they are counted is a windowing decision.",
      c: "Autoscaling affects throughput and whether the pipeline keeps up with input rate. It has no bearing on how event-time windows treat late arrivals.",
      d: "Destination partitioning affects how results are stored and queried afterwards. It does not influence which events are aggregated in the first place.",
    },
    learnMore: "dataflow",
  },
  {
    id: "data-003",
    topic: "data",
    certs: [PDE, PCD],
    difficulty: "medium",
    stem: "A Pub/Sub subscriber occasionally processes the same message twice, causing duplicated records downstream. What is the correct response?",
    options: [
      {
        id: "a",
        text: "Make the consumer idempotent, since Pub/Sub provides at-least-once delivery",
      },
      { id: "b", text: "Increase the acknowledgement deadline to prevent redelivery" },
      { id: "c", text: "Enable message ordering on the topic" },
      { id: "d", text: "Reduce the subscription's retention period" },
    ],
    correct: "a",
    concept: "At-least-once delivery makes idempotent consumers a requirement, not an optimisation",
    explanation:
      "Pub/Sub guarantees at-least-once delivery, so duplicates are expected behaviour rather than a fault. The consumer must be designed so that processing the same message twice produces the same result — typically by recording processed message identifiers, or by making the downstream operation naturally idempotent such as an upsert keyed on a message ID.",
    whyWrong: {
      b: "A longer acknowledgement deadline reduces redelivery caused by slow processing, which helps, but it cannot eliminate duplicates. They can still occur for other reasons, and the consumer must handle them regardless.",
      c: "Ordering guarantees the sequence in which messages are delivered. It does not prevent a message from being delivered more than once.",
      d: "Retention controls how long undelivered messages are kept. It has no effect on duplicate delivery of messages that are being processed.",
    },
    learnMore: "pub-sub",
  },
  {
    id: "data-004",
    topic: "data",
    certs: [PDE],
    difficulty: "medium",
    stem: "Messages that repeatedly fail processing are being retried indefinitely, blocking the subscription. What should be configured?",
    options: [
      { id: "a", text: "A dead-letter topic with a maximum delivery attempt count" },
      { id: "b", text: "A shorter acknowledgement deadline" },
      { id: "c", text: "Message ordering with an ordering key" },
      { id: "d", text: "A second subscription to the same topic" },
    ],
    correct: "a",
    concept: "Dead-letter topics isolate poison messages so the stream keeps moving",
    explanation:
      "A dead-letter topic captures messages that have failed a configured number of delivery attempts, moving them aside for inspection instead of retrying forever. This stops one malformed message from blocking the subscription and preserves it so the cause can be investigated.",
    whyWrong: {
      b: "A shorter deadline makes redelivery happen sooner, which increases the rate of failed retries rather than resolving them.",
      c: "Ordering keys control delivery sequence. If anything, strict ordering makes a poison message worse, because it can block everything behind it in that key's sequence.",
      d: "A second subscription receives its own copy of every message, so it would fail on the same message in the same way. It does not address the failure.",
    },
    learnMore: "pub-sub",
  },
  {
    id: "data-005",
    topic: "data",
    certs: [PDE, PCA],
    difficulty: "medium",
    stem: "Analysts must be able to query aggregated sales figures but must not see individual customer identifiers in the underlying table. What is the appropriate mechanism?",
    options: [
      {
        id: "a",
        text: "An authorised view exposing only the aggregated columns, with access granted on the view rather than the source table",
      },
      { id: "b", text: "Granting analysts the BigQuery Data Viewer role on the source dataset" },
      { id: "c", text: "Exporting a filtered copy of the data to a separate table each night" },
      { id: "d", text: "Asking analysts to avoid selecting the identifier columns" },
    ],
    correct: "a",
    concept: "Authorised views let someone query derived results without access to the source",
    explanation:
      "An authorised view is granted access to the underlying table on behalf of its users. Analysts are given access to the view only, so they can query the aggregated output while having no ability to read the source table or its identifier columns. This is the standard mechanism for exactly this requirement.",
    whyWrong: {
      b: "Data Viewer on the dataset grants read access to the underlying table including every column, which is what the requirement forbids.",
      c: "A nightly copy duplicates storage, introduces staleness, and creates a second dataset that must also be secured. The view achieves the same isolation without any of that.",
      d: "Relying on people not to look at data they can access is not a control. The permission still exists and the access would not be prevented or recorded as a violation.",
    },
    learnMore: "bigquery",
  },
  {
    id: "data-006",
    topic: "data",
    certs: [PDE],
    difficulty: "easy",
    stem: "Which query change most reliably reduces the cost of an on-demand BigQuery query against a wide table?",
    options: [
      { id: "a", text: "Selecting only the specific columns needed instead of all columns" },
      { id: "b", text: "Adding a LIMIT clause to return fewer rows" },
      { id: "c", text: "Adding an ORDER BY clause to sort the results" },
      { id: "d", text: "Running the query during off-peak hours" },
    ],
    correct: "a",
    concept: "Columnar storage means you pay for the columns you read",
    explanation:
      "BigQuery stores data by column, so a query reads only the columns it references. Selecting three columns from a table with two hundred reads a small fraction of the data and costs proportionally less. This is the single most effective query-level cost optimisation.",
    whyWrong: {
      b: "LIMIT restricts how many rows are returned but the data still has to be scanned to determine which rows qualify. Bytes read, and therefore cost, are unchanged.",
      c: "ORDER BY adds processing work and can make a query slower or cause it to fail on very large results. It does not reduce the data scanned.",
      d: "On-demand pricing is based on bytes processed, not on the time of day the query runs.",
    },
    learnMore: "bigquery",
  },
  {
    id: "data-007",
    topic: "data",
    certs: [PDE, PCA],
    difficulty: "medium",
    stem: "Clickstream events must be available for analysis within about one minute of occurring, at a sustained rate of 100,000 events per second. Which architecture fits?",
    options: [
      {
        id: "a",
        text: "Publish events to Pub/Sub, process with a streaming pipeline, and write to BigQuery",
      },
      { id: "b", text: "Write events to Cloud Storage and load them into BigQuery hourly" },
      { id: "c", text: "Insert events directly into Cloud SQL from the web application" },
      { id: "d", text: "Write events to Bigtable and export to BigQuery nightly" },
    ],
    correct: "a",
    concept: "Streaming ingestion through a message queue is the standard near-real-time analytics path",
    explanation:
      "Pub/Sub absorbs the event rate and decouples producers from consumers, a streaming pipeline transforms and enriches events in flight, and writing to BigQuery makes them queryable within seconds. This is the standard pattern for the stated latency and throughput requirements.",
    whyWrong: {
      b: "Hourly batch loading gives up to an hour of latency, far beyond the one-minute requirement.",
      c: "Cloud SQL cannot sustain 100,000 inserts per second, and it is an operational database rather than an analytical one. Analytical queries would also compete with the write load.",
      d: "Bigtable handles the ingest rate, but a nightly export means data is up to 24 hours old in BigQuery, which does not meet the requirement.",
    },
    learnMore: "pub-sub",
  },
  {
    id: "data-008",
    topic: "data",
    certs: [PDE],
    difficulty: "hard",
    stem: "A table is already partitioned by date. Queries filter by date and also frequently by customer ID, and remain expensive. What further change helps most?",
    options: [
      { id: "a", text: "Cluster the table by customer ID" },
      { id: "b", text: "Partition the table by customer ID instead of date" },
      { id: "c", text: "Create a materialised view for every customer" },
      { id: "d", text: "Increase the number of slots allocated to the query" },
    ],
    correct: "a",
    concept: "Clustering sorts data within partitions so filters on clustering columns skip blocks",
    explanation:
      "Clustering sorts data within each partition by the chosen columns. A query filtering on customer ID can then skip blocks that cannot contain matching rows, reading substantially less data. Partitioning and clustering are complementary: partition by date, cluster by the columns you filter on most.",
    whyWrong: {
      b: "A table can only have one partitioning column. Replacing date partitioning would lose the benefit for date filters, which the question says are also common, and high-cardinality partitioning creates too many small partitions.",
      c: "Materialised views per customer would be an unmanageable number of objects, and they would not help ad-hoc queries with other filter combinations.",
      d: "More slots make a query run faster by giving it more compute, but on-demand billing is based on bytes read. Faster is not cheaper here.",
    },
    learnMore: "bigquery",
  },

  /* -------------------------------- AI/ML ------------------------------- */
  {
    id: "ai-001",
    topic: "ai-ml",
    certs: [GAIL, PMLE],
    difficulty: "medium",
    stem: "A support assistant built on a foundation model gives confident but incorrect answers about the company's own refund policy, which is documented internally. What is the appropriate fix?",
    options: [
      {
        id: "a",
        text: "Ground the model by retrieving the relevant internal policy documents and including them in the prompt",
      },
      { id: "b", text: "Fine-tune the model on examples of well-written support replies" },
      { id: "c", text: "Lower the temperature setting to reduce randomness" },
      { id: "d", text: "Switch to a larger foundation model" },
    ],
    correct: "a",
    concept: "Missing knowledge is fixed by retrieval, not by tuning or prompting",
    explanation:
      "The model has never seen the company's internal policy, so it cannot know it. Retrieval-augmented generation supplies the relevant documents at query time, letting the model answer from authoritative source material and cite it. Grounding is the only technique here that adds knowledge the model lacks.",
    whyWrong: {
      b: "Fine-tuning changes style and behaviour patterns. Training on well-written replies improves tone and format but does not teach specific facts reliably, and would need retraining every time the policy changed.",
      c: "Lower temperature makes output more deterministic. A confidently wrong answer becomes a consistently confidently wrong answer.",
      d: "A larger model may be more capable in general, but it has no more access to the company's private documents than the current one.",
    },
    learnMore: "generative-ai",
  },
  {
    id: "ai-002",
    topic: "ai-ml",
    certs: [PMLE, PDE],
    difficulty: "hard",
    stem: "A fraud detection model achieves 99.2% accuracy on a dataset where 0.8% of transactions are fraudulent. Investigation shows it catches almost no fraud. What went wrong?",
    options: [
      {
        id: "a",
        text: "Accuracy is misleading on imbalanced data; recall or precision should be used instead",
      },
      { id: "b", text: "The model was trained for too few epochs" },
      { id: "c", text: "The training data was not normalised" },
      { id: "d", text: "The model has too many features" },
    ],
    correct: "a",
    concept: "Metric choice must reflect the cost of each error type on imbalanced data",
    explanation:
      "When 99.2% of transactions are legitimate, a model that predicts 'not fraud' every time scores 99.2% accuracy while catching nothing. Accuracy is dominated by the majority class. Recall measures the proportion of actual fraud caught, which is what matters here, and precision measures how many flagged transactions really were fraudulent.",
    whyWrong: {
      b: "Insufficient training would typically produce poor performance across all metrics, not a high accuracy score that conceals total failure on the minority class.",
      c: "Unnormalised features can slow or destabilise training for some algorithms, but they do not produce this specific pattern of high accuracy with near-zero recall.",
      d: "Too many features can cause overfitting, which shows as good training performance and poor test performance. Here the model performs consistently — the metric is simply measuring the wrong thing.",
    },
    learnMore: "machine-learning-fundamentals",
  },
  {
    id: "ai-003",
    topic: "ai-ml",
    certs: [PMLE],
    difficulty: "hard",
    stem: "A model performs well in evaluation but poorly in production. Investigation shows features are computed differently in the training pipeline than in the serving path. What is this called and what prevents it?",
    options: [
      {
        id: "a",
        text: "Training–serving skew, prevented by computing features through a shared feature store",
      },
      { id: "b", text: "Data drift, prevented by retraining the model more frequently" },
      { id: "c", text: "Overfitting, prevented by adding regularisation" },
      { id: "d", text: "Concept drift, prevented by increasing the training dataset size" },
    ],
    correct: "a",
    concept: "Training–serving skew arises when the same feature is computed two different ways",
    explanation:
      "Training–serving skew occurs when the feature values a model sees in production differ from those it learned on, because two separate implementations compute them. A feature store solves this by defining each feature once and serving the same computation to both training and inference, eliminating the possibility of divergence.",
    whyWrong: {
      b: "Data drift is a change in the input distribution over time. Here the problem exists from the first production request, caused by an implementation difference rather than by change over time.",
      c: "Overfitting produces good training performance and poor performance on held-out evaluation data. This model evaluates well, so it is not overfitting.",
      d: "Concept drift is a change in the relationship between inputs and outputs. More training data does not fix inconsistent feature computation between two code paths.",
    },
    learnMore: "vertex-ai",
  },
  {
    id: "ai-004",
    topic: "ai-ml",
    certs: [PMLE],
    difficulty: "medium",
    stem: "A model must score 50 million records once each night, with results written to a table. Latency for any individual record does not matter. What is the most appropriate serving approach?",
    options: [
      { id: "a", text: "Batch prediction" },
      { id: "b", text: "An online prediction endpoint with autoscaling" },
      { id: "c", text: "An online endpoint with a high minimum instance count" },
      { id: "d", text: "Edge deployment to client devices" },
    ],
    correct: "a",
    concept: "Batch prediction suits large offline scoring jobs where per-record latency is irrelevant",
    explanation:
      "Batch prediction processes a large dataset in one job without maintaining a persistent endpoint. It is substantially cheaper than keeping an endpoint running, and there is no benefit to low per-record latency when the entire result set is consumed at once afterwards.",
    whyWrong: {
      b: "An online endpoint is designed for low-latency individual requests. Sending 50 million requests through one is slower and more expensive than a batch job.",
      c: "A high minimum instance count means paying for capacity around the clock to serve a workload that runs once a night. This is the most expensive option.",
      d: "Edge deployment puts the model on client devices for offline or low-latency inference. The scenario describes centralised batch scoring, which has nothing to do with edge deployment.",
    },
    learnMore: "vertex-ai",
  },
  {
    id: "ai-005",
    topic: "ai-ml",
    certs: [GAIL, CDL],
    difficulty: "easy",
    stem: "What is the term for a generative model producing fluent output that is factually incorrect?",
    options: [
      { id: "a", text: "Hallucination" },
      { id: "b", text: "Overfitting" },
      { id: "c", text: "Drift" },
      { id: "d", text: "Underfitting" },
    ],
    correct: "a",
    concept: "Hallucination is the characteristic failure mode of generative models",
    explanation:
      "A hallucination is output that reads as plausible and confident but is not true. It follows directly from how these models work: they predict likely continuations of text, and a likely-sounding continuation is not necessarily a correct one. Grounding output in retrieved source material is the primary mitigation.",
    whyWrong: {
      b: "Overfitting describes a model that memorises training data and generalises poorly. It is a training problem, not a description of confidently wrong generated output.",
      c: "Drift describes performance degrading over time as data or relationships change. Hallucination occurs immediately, not gradually.",
      d: "Underfitting describes a model too simple to capture the pattern in the data, producing poor performance everywhere rather than fluent incorrect output.",
    },
    learnMore: "generative-ai",
  },
  {
    id: "ai-006",
    topic: "ai-ml",
    certs: [GAIL, PMLE],
    difficulty: "medium",
    stem: "A team needs a model to consistently produce output in a specific structured format matching internal conventions, and prompt examples have not achieved reliable results. What should they consider next?",
    options: [
      { id: "a", text: "Fine-tuning the model on examples of correctly formatted output" },
      { id: "b", text: "Retrieval-augmented generation over their documentation" },
      { id: "c", text: "Increasing the temperature setting" },
      { id: "d", text: "Reducing the size of the context window" },
    ],
    correct: "a",
    concept: "Fine-tuning changes systematic behaviour that prompting cannot reliably achieve",
    explanation:
      "When the requirement is a consistent behavioural pattern — a specific format, tone or convention — and few-shot prompting has not delivered reliability, fine-tuning on many examples adjusts the model's behaviour systematically. This is the case where tuning is genuinely the right technique.",
    whyWrong: {
      b: "Retrieval supplies knowledge the model lacks. The problem here is not missing information but inconsistent formatting of information it already has.",
      c: "Higher temperature increases randomness, making output less consistent. This moves in exactly the wrong direction.",
      d: "The context window size is not the constraint. Reducing it would limit how many examples could be included, making prompting less effective rather than more.",
    },
    learnMore: "generative-ai",
  },
  {
    id: "ai-007",
    topic: "ai-ml",
    certs: [PMLE],
    difficulty: "medium",
    stem: "A production model's prediction quality has degraded over six months although the serving code has not changed. What should be investigated first?",
    options: [
      {
        id: "a",
        text: "Whether the distribution of input data has drifted from the training data",
      },
      { id: "b", text: "Whether the endpoint has enough replicas to handle the load" },
      { id: "c", text: "Whether the model artefact has become corrupted in storage" },
      { id: "d", text: "Whether the training code contained a bug" },
    ],
    correct: "a",
    concept: "Gradual degradation with unchanged code points to drift",
    explanation:
      "A model learns patterns present in its training data. As the real world changes — customer behaviour shifts, new product categories appear, seasonality moves — production inputs drift away from what the model learned, and its predictions become less reliable. Gradual degradation with no code change is the signature of drift, and monitoring input distributions is how it is detected.",
    whyWrong: {
      b: "Insufficient replicas cause latency and errors under load, not a gradual decline in the correctness of predictions that are returned successfully.",
      c: "A corrupted artefact would cause the model to fail to load or produce obviously broken output immediately, not degrade slowly over months.",
      d: "A training bug would have produced poor performance from the moment of deployment. The model performed well initially, so the training was sound for the data as it was then.",
    },
    learnMore: "vertex-ai",
  },
];
