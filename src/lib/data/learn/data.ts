import type { LearnTopic } from "@/types";

export const dataTopics: LearnTopic[] = [
  {
    slug: "bigquery",
    title: "BigQuery",
    category: "data",
    summary:
      "A serverless analytics warehouse: partitioning, clustering, the cost model, and how to make queries fast and cheap.",
    oneLiner:
      "BigQuery lets you run SQL over enormous datasets without managing any infrastructure — and your bill depends almost entirely on how much data each query has to read.",
    readingWords: 1300,
    updated: "2026-08-26",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "BigQuery is a serverless data warehouse. You load data, write SQL, and receive results. There is no cluster to size, no instance to keep running and no capacity to plan for a query that scans a hundred times more data than the last one.",
          },
          {
            type: "p",
            text: "Two design decisions explain its behaviour. Storage and compute are entirely separate, so you pay for them independently and idle storage is cheap. And it stores data in columns rather than rows, so a query reading three columns from a thousand-column table reads only those three.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "For analytical workloads, the separation of storage and compute changes what is economically possible. You can keep years of history at rest cheaply and only pay meaningfully when you query it.",
          },
          {
            type: "p",
            text: "It is also the centre of gravity for the Data Engineer exam and appears throughout the Architect and ML Engineer exams. Understanding it well pays across several certifications.",
          },
        ],
      },
      {
        heading: "The cost model, which drives everything",
        body: [
          {
            type: "p",
            text: "In the default on-demand model you pay for the bytes a query reads, not for how long it takes or how complex it is. That single fact explains nearly every optimisation technique.",
          },
          {
            type: "ul",
            items: [
              "**`SELECT *` is expensive.** Because storage is columnar, selecting every column reads every column. Selecting only what you need is the cheapest optimisation available.",
              "**A `WHERE` clause does not automatically reduce cost.** Filtering on an ordinary column still requires reading that column across the whole table. Only partitioning and clustering reduce bytes read.",
              "**`LIMIT` does not reduce cost.** The data still has to be scanned to determine which rows to return.",
              "**Storage has two tiers.** Data not modified for a period automatically moves to long-term storage at a lower rate, with no change in query behaviour.",
              "**Capacity pricing** — reserving dedicated compute instead of paying per query. Predictable, and cheaper above a certain steady volume.",
            ],
          },
          {
            type: "note",
            text: "Always check the estimated bytes a query will process before running it against a large table. Doing this habitually is the difference between a warehouse that costs hundreds a month and one that costs thousands.",
          },
        ],
      },
      {
        heading: "Partitioning and clustering",
        body: [
          {
            type: "p",
            text: "These are the two mechanisms that genuinely reduce how much data a query reads, and understanding the difference is reliably examined.",
          },
          {
            type: "table",
            head: ["", "Partitioning", "Clustering"],
            rows: [
              [
                "What it does",
                "Physically splits the table into segments, usually by date.",
                "Sorts data within each partition by chosen columns.",
              ],
              [
                "Effect",
                "A filter on the partition column skips whole segments entirely.",
                "A filter on a clustering column skips blocks within a segment.",
              ],
              [
                "Typical column",
                "An ingestion or event date.",
                "High-cardinality columns you filter or group by, such as customer or region.",
              ],
              [
                "Limit",
                "One partitioning column per table.",
                "Up to four clustering columns, and order matters.",
              ],
              [
                "Cost certainty",
                "Predictable — you can require a partition filter on every query.",
                "Best-effort; the saving is real but not guaranteed in advance.",
              ],
            ],
          },
          {
            type: "p",
            text: "They are complementary rather than alternatives. Partition by date and cluster by the columns you filter on most. On a large table, requiring a partition filter is one of the most effective guardrails against accidental expensive queries.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Dataset** — a container for tables, holding location and default access settings. Its location is fixed once created.",
              "**Table** — standard tables store data in BigQuery; external tables query data left in object storage.",
              "**View** — a saved query. An authorised view lets someone query results without having access to the underlying table, which is the standard way to share a filtered subset.",
              "**Materialised view** — a precomputed, automatically refreshed result. Faster and cheaper for repeated aggregations.",
              "**Slot** — the unit of compute. Queries are allocated slots; contention for them is what makes a query wait.",
              "**Streaming inserts** — writing rows continuously rather than in batch loads, for near-real-time availability.",
              "**Column-level and row-level security** — restricting access to specific columns or filtering rows by the querying identity.",
              "**In-warehouse machine learning** — training and running models with SQL, without moving data out.",
            ],
          },
        ],
      },
      {
        heading: "Where it sits in a pipeline",
        body: [
          {
            type: "diagram",
            caption: "The common analytics path from source system to dashboard.",
            steps: [
              "Source systems — applications, databases, third-party services",
              "Ingestion — batch loads from object storage, or streaming through a message queue",
              "Processing — cleaning, joining and reshaping, either in a pipeline or in SQL",
              "BigQuery — the warehouse holding modelled, queryable data",
              "Consumption — dashboards, notebooks, machine learning and reverse ETL back into applications",
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
              "Central analytics warehouse consolidating data from many source systems.",
              "Ad-hoc analysis over years of history without provisioning anything in advance.",
              "Near-real-time dashboards fed by streaming ingestion.",
              "Machine learning feature engineering over very large datasets.",
              "Sharing curated datasets with other teams or organisations without copying data.",
              "Log analytics, where logs are routed into the warehouse for querying over long retention periods.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-data-engineer",
        note: "The single most important topic on the exam. Partitioning, clustering, cost control and query optimisation appear throughout.",
      },
      {
        cert: "cloud-digital-leader",
        note: "Conceptual: recognising analytical workloads and why a warehouse differs from an operational database.",
      },
      {
        cert: "professional-machine-learning-engineer",
        note: "Feature engineering at scale and in-warehouse model training.",
      },
      {
        cert: "associate-cloud-engineer",
        note: "Basic operations: creating datasets, loading data and controlling access.",
      },
    ],
    questionTopic: "data",
    related: ["dataflow", "pub-sub", "cloud-storage", "bigtable"],
  },

  {
    slug: "pub-sub",
    title: "Pub/Sub and Messaging",
    category: "data",
    summary:
      "Asynchronous messaging that decouples systems: topics, subscriptions, delivery guarantees, ordering and dead-letter handling.",
    oneLiner:
      "Pub/Sub is a queue that lets one system tell others something happened, without knowing or caring who is listening.",
    readingWords: 1000,
    updated: "2026-08-26",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Pub/Sub is a messaging service. Publishers send messages to a topic. Subscribers create subscriptions to that topic and receive copies of the messages. The publisher does not know who the subscribers are, and adding a new subscriber requires no change to the publisher.",
          },
          {
            type: "p",
            text: "The service holds messages durably until they are acknowledged, so a subscriber can be slow, restart, or be offline briefly without messages being lost.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Direct synchronous calls between services couple them tightly. If the receiver is slow, the caller is slow. If the receiver is down, the caller fails. Adding a second consumer means changing the caller.",
          },
          {
            type: "p",
            text: "Messaging removes all three problems. The publisher's job ends when the message is accepted. Consumers process at their own pace, retry independently, and can be added or removed without touching the publisher. This is why event-driven architecture is built on it.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Topic** — the named channel messages are published to.",
              "**Subscription** — an independent stream of messages from a topic. Each subscription receives every message, so two subscriptions mean two copies.",
              "**Push and pull** — push delivers messages to an endpoint you provide; pull has your consumer request them. Push suits serverless handlers; pull gives you control over rate.",
              "**Acknowledgement** — the consumer confirms successful processing. Unacknowledged messages are redelivered after the acknowledgement deadline.",
              "**At-least-once delivery** — the default guarantee. A message may be delivered more than once, so consumers must be idempotent.",
              "**Ordering key** — guarantees ordered delivery for messages sharing a key. It reduces throughput, so enable it only where order genuinely matters.",
              "**Dead-letter topic** — after a configured number of failed attempts, the message is moved aside rather than retried forever.",
              "**Message retention and replay** — messages are retained for a configurable period and a subscription can be rewound to reprocess history.",
            ],
          },
          {
            type: "note",
            text: "Idempotency is the point most often missed. Because delivery is at-least-once, a consumer that increments a counter will eventually overcount. Design consumers so processing the same message twice produces the same result — usually by recording processed message identifiers or making the operation naturally idempotent.",
          },
        ],
      },
      {
        heading: "How a message flows",
        body: [
          {
            type: "diagram",
            caption: "One publish, several independent consumers, each with its own progress.",
            steps: [
              "A publisher sends a message to a topic and receives confirmation",
              "The message is stored durably and copied to every subscription",
              "Subscription A delivers to an analytics consumer; subscription B delivers to a notification service",
              "Each consumer acknowledges independently once it has finished processing",
              "Unacknowledged messages are redelivered after the deadline expires",
              "Messages that fail repeatedly are routed to a dead-letter topic for inspection",
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
              "Decoupling microservices so a slow downstream service does not slow the caller.",
              "Ingesting event streams from applications, devices or clickstreams into analytics.",
              "Fanning one event out to several independent consumers — search indexing, notifications, auditing.",
              "Buffering traffic spikes so downstream systems process at a sustainable rate.",
              "Triggering serverless functions and Cloud Run services from events.",
              "Reliably delivering work to background processors with retry and dead-letter handling.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-data-engineer",
        note: "Heavily tested. Delivery semantics, ordering, dead-letter handling and streaming ingestion patterns all appear.",
      },
      {
        cert: "professional-cloud-developer",
        note: "Event-driven application design, idempotent consumers and integrating with managed runtimes.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Appears in decoupling, resilience and asynchronous integration design.",
      },
      {
        cert: "associate-cloud-engineer",
        note: "Creating topics and subscriptions, and understanding push versus pull delivery.",
      },
    ],
    questionTopic: "data",
    related: ["dataflow", "bigquery", "cloud-run", "bigtable"],
  },

  {
    slug: "dataflow",
    title: "Dataflow and Pipeline Processing",
    category: "data",
    summary:
      "Batch and stream processing in one model: windowing, watermarks, late data and the trade-offs that make streaming hard.",
    oneLiner:
      "Dataflow runs data pipelines that work the same way whether the data arrives all at once or continuously — the difficulty is deciding what to do about data that arrives late.",
    readingWords: 1100,
    updated: "2026-08-27",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Dataflow is a managed service for running data processing pipelines. You describe transformations — read, filter, join, aggregate, write — and the service provisions workers, distributes the work, handles failures and scales as needed.",
          },
          {
            type: "p",
            text: "Its defining idea is that batch and streaming are the same problem. A batch job is simply a stream that happens to be bounded. The same pipeline code can process a historical file or a live stream, which means you do not maintain two implementations of the same logic.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "The traditional alternative is running one system for nightly batch processing and another for real-time, with two codebases that inevitably diverge. Unifying them removes a persistent source of bugs where the batch and streaming results disagree.",
          },
          {
            type: "p",
            text: "It also removes cluster management. Autoscaling and work rebalancing happen automatically, which matters for streaming pipelines that must keep up with variable input rates without falling behind.",
          },
        ],
      },
      {
        heading: "The hard part: time",
        body: [
          {
            type: "p",
            text: "Batch processing has a natural boundary — the file ends. Streaming does not. To compute anything aggregated, you must decide when a group is complete, and in a distributed system data does not arrive in order.",
          },
          {
            type: "ul",
            items: [
              "**Event time** — when the event actually happened, according to the source. This is almost always what you want to aggregate by.",
              "**Processing time** — when your pipeline received it. Easy to use and usually wrong, because network delays and retries shift it unpredictably.",
              "**Window** — the grouping of events by time. Fixed windows are contiguous intervals; sliding windows overlap; session windows group by activity separated by gaps of inactivity.",
              "**Watermark** — the system's estimate that all data up to a certain event time has arrived. It is a heuristic, not a guarantee.",
              "**Late data** — events arriving after the watermark has passed their window. A mobile device that was offline for an hour produces exactly this.",
              "**Trigger** — when to emit a result: at the watermark, early and speculatively, or again when late data arrives.",
              "**Accumulation mode** — whether a re-emitted result replaces the previous one or adds to it.",
            ],
          },
          {
            type: "note",
            text: "These concepts are consistently the least well-prepared area of the Data Engineer exam, and they are heavily tested. If you can explain what happens to an event that arrives two hours after its window closed, and what your options are for handling it, you are ahead of most candidates.",
          },
        ],
      },
      {
        heading: "A streaming pipeline end to end",
        body: [
          {
            type: "diagram",
            caption: "Events flow from devices to a queryable warehouse with defined late-data handling.",
            steps: [
              "Devices publish events with their own event timestamps",
              "Messages are buffered durably in a topic",
              "The pipeline reads the stream and assigns each event to a window by event time",
              "Transformations clean, enrich and aggregate within each window",
              "The watermark advances and completed windows emit results",
              "Late events arrive and trigger updated results according to the configured policy",
              "Results are written to the warehouse, with failures routed to a dead-letter destination",
            ],
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Pipeline** — the full graph of transformations from source to sink.",
              "**Transform** — one operation in that graph, such as a map, filter, group or join.",
              "**Autoscaling** — the service adds and removes workers based on backlog and throughput.",
              "**Templates** — parameterised, reusable pipeline definitions that can be launched without recompiling.",
              "**Drain versus cancel** — draining stops accepting new input but finishes in-flight work; cancelling stops immediately and may lose buffered data.",
              "**Dead-letter pattern** — routing records that fail processing to a separate destination rather than failing the pipeline.",
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
              "Streaming clickstream or telemetry events into a warehouse with sub-minute latency.",
              "Real-time aggregation for dashboards, such as revenue per minute by region.",
              "Enriching events in flight by joining against reference data.",
              "Batch transformation of historical files into a cleaned, modelled form.",
              "Migrating and reshaping data between storage systems.",
              "Detecting patterns in streams, such as anomalies or session behaviour.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-data-engineer",
        note: "A core topic. Windowing, watermarks, late data, triggers and pipeline reliability are all directly examined.",
      },
      {
        cert: "professional-machine-learning-engineer",
        note: "Feature engineering pipelines and preparing training data at scale.",
      },
      {
        cert: "professional-cloud-architect",
        note: "Appears in data architecture scenarios, particularly around batch versus streaming trade-offs.",
      },
    ],
    questionTopic: "data",
    related: ["pub-sub", "bigquery", "cloud-storage", "bigtable"],
  },
];

export const aiTopics: LearnTopic[] = [
  {
    slug: "machine-learning-fundamentals",
    title: "Machine Learning Fundamentals",
    category: "ai-ml",
    summary:
      "The concepts every ML question assumes: training, evaluation metrics, overfitting, and knowing when not to use machine learning.",
    oneLiner:
      "Machine learning finds patterns in historical data and applies them to new data — which means it is only as good as the data it learned from.",
    readingWords: 1000,
    updated: "2026-08-28",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "In traditional programming you write rules and the computer applies them. In machine learning you supply examples of inputs and correct outputs, and the system derives the rules itself. The output is a model: a function that maps new inputs to predictions.",
          },
          {
            type: "p",
            text: "This is powerful precisely where writing rules is impractical — recognising objects in images, understanding language, predicting behaviour from many weakly-informative signals.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Understanding the fundamentals is what lets you judge whether a machine learning approach is appropriate at all. A meaningful share of proposed ML projects should be a SQL query, a rules engine, or a better-designed form.",
          },
          {
            type: "p",
            text: "The exams test this judgement directly. Scenarios where a simple deterministic approach meets the requirement, or where a pre-trained service already solves the problem, are common — and choosing to train a custom model is the wrong answer.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Supervised learning** — learning from labelled examples. Classification predicts a category; regression predicts a number.",
              "**Unsupervised learning** — finding structure without labels, such as clustering customers into segments.",
              "**Feature** — an input variable. Feature engineering — constructing better inputs — usually improves results more than changing the algorithm.",
              "**Label** — the correct answer for a training example.",
              "**Training, validation and test sets** — you train on one, tune on another, and measure honestly on a third that was never used for either.",
              "**Overfitting** — the model memorises the training data, performing excellently there and poorly on anything new.",
              "**Underfitting** — the model is too simple to capture the real pattern and performs poorly everywhere.",
              "**Bias and fairness** — a model trained on historical data reproduces the patterns in that data, including patterns that reflect past discrimination.",
            ],
          },
        ],
      },
      {
        heading: "Choosing the right metric",
        body: [
          {
            type: "p",
            text: "Metric selection is the most frequently tested piece of theory, because choosing the wrong one produces a model that scores well and is useless.",
          },
          {
            type: "table",
            head: ["Metric", "What it measures", "Use it when"],
            rows: [
              [
                "Accuracy",
                "Proportion of predictions that are correct.",
                "Classes are roughly balanced. Misleading otherwise.",
              ],
              [
                "Precision",
                "Of the items flagged positive, how many really were.",
                "False positives are costly — flagging a legitimate transaction as fraud.",
              ],
              [
                "Recall",
                "Of the real positives, how many you caught.",
                "False negatives are costly — missing a disease or a security threat.",
              ],
              [
                "F1 score",
                "The harmonic mean of precision and recall.",
                "You need a single number balancing both.",
              ],
              [
                "AUC-ROC",
                "How well the model separates classes across all thresholds.",
                "Comparing models independently of a chosen threshold.",
              ],
            ],
          },
          {
            type: "note",
            text: "The standard illustration: if one per cent of transactions are fraudulent, a model that always predicts 'not fraud' achieves 99% accuracy and catches nothing. Whenever a scenario mentions rare events or imbalanced classes, accuracy is the wrong metric.",
          },
        ],
      },
      {
        heading: "The production problems",
        body: [
          {
            type: "ul",
            items: [
              "**Training–serving skew** — features are computed one way during training and another way in production, so the model sees inputs unlike anything it learned from.",
              "**Data drift** — the input distribution changes over time and the model's assumptions quietly stop holding.",
              "**Concept drift** — the relationship between inputs and outputs changes, as when customer behaviour shifts.",
              "**Feedback loops** — the model's own predictions influence future data, reinforcing its existing biases.",
              "**Silent failure** — a degraded model keeps returning confident predictions. Nothing crashes, which is why monitoring prediction quality matters as much as monitoring latency.",
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
              "Classification — spam detection, fraud scoring, support ticket routing.",
              "Regression — demand forecasting, price estimation, time-to-failure prediction.",
              "Clustering — customer segmentation and anomaly detection.",
              "Recommendation — surfacing relevant products or content.",
              "Vision and language — extracting text from documents, classifying images, analysing sentiment.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-machine-learning-engineer",
        note: "Assumed knowledge throughout. Metric selection, overfitting and drift appear repeatedly in scenarios.",
      },
      {
        cert: "professional-data-engineer",
        note: "Enough to prepare data for modelling and understand what feature engineering requires.",
      },
      {
        cert: "generative-ai-leader",
        note: "Conceptual grounding for understanding how generative models differ from classical ones.",
      },
      {
        cert: "cloud-digital-leader",
        note: "Business-level understanding of what machine learning can and cannot do.",
      },
    ],
    questionTopic: "ai-ml",
    related: ["vertex-ai", "generative-ai", "bigquery", "dataflow"],
  },

  {
    slug: "vertex-ai",
    title: "Vertex AI and the ML Platform",
    category: "ai-ml",
    summary:
      "Training, serving, pipelines and monitoring in one place — the MLOps surface that production machine learning needs.",
    oneLiner:
      "Vertex AI is the managed platform where models are trained, deployed, monitored and retrained, so an experiment can become something that runs reliably.",
    readingWords: 1000,
    updated: "2026-08-28",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Vertex AI brings the stages of a machine learning workflow into one managed platform: preparing data, training models, evaluating them, deploying them for prediction, orchestrating the whole thing as a pipeline, and monitoring what happens afterwards.",
          },
          {
            type: "p",
            text: "It supports several levels of involvement — automated training that handles model selection for you, custom training where you supply the code, and access to pre-trained foundation models you call directly.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "The difficulty in machine learning is rarely training a model that works in a notebook. It is everything after: reproducing the result, serving it at acceptable latency, keeping training and serving features consistent, retraining when data shifts, and noticing when quality degrades.",
          },
          {
            type: "p",
            text: "This is the MLOps problem, and it is where the ML Engineer exam spends most of its attention. Treating it as a modelling exam is the most common preparation mistake.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Training job** — running your training code on managed infrastructure, optionally distributed across machines or accelerators.",
              "**Automated training** — the platform handles model selection and tuning from a dataset. A strong baseline and often sufficient for tabular problems.",
              "**Model registry** — versioned storage for trained models, with the metadata needed to know how each was produced.",
              "**Endpoint** — a deployed model serving online predictions, with autoscaling and traffic splitting between versions.",
              "**Batch prediction** — scoring a large dataset offline, without a persistent endpoint. Cheaper when latency does not matter.",
              "**Feature store** — a central place for features, so training and serving compute them identically. This is what prevents training–serving skew.",
              "**Pipelines** — orchestrated, reproducible workflows chaining data preparation, training, evaluation and deployment.",
              "**Model monitoring** — watching production inputs and predictions for drift and skew, triggering alerts or retraining.",
              "**Explainability** — attributing a prediction to its contributing features, which is often a regulatory requirement.",
            ],
          },
          {
            type: "note",
            text: "Online versus batch prediction is a reliable exam question. If the scenario needs a prediction during a user's request, it is an endpoint. If it scores millions of records overnight, batch prediction is correct and an always-on endpoint is wasteful.",
          },
        ],
      },
      {
        heading: "A production ML workflow",
        body: [
          {
            type: "diagram",
            caption: "Continuous training closes the loop from monitoring back to retraining.",
            steps: [
              "Data preparation — validate, clean and engineer features",
              "Feature store — features written once and read identically by training and serving",
              "Training — reproducible jobs producing a versioned model artefact",
              "Evaluation — compare against the current production model on held-out data",
              "Deployment — release to an endpoint gradually, splitting traffic between versions",
              "Monitoring — watch inputs for drift and predictions for degradation",
              "Retraining — triggered by a schedule, a drift signal, or a quality threshold",
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
              "Training a custom model on data too large for a single machine.",
              "Serving low-latency predictions inside a user-facing request.",
              "Scoring a large dataset in batch on a nightly schedule.",
              "Automating retraining when monitoring detects drift.",
              "Sharing consistent features across several models and teams.",
              "Building on foundation models with tuning and grounding rather than training from scratch.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "professional-machine-learning-engineer",
        note: "The centre of the exam. Pipelines, serving, feature consistency and monitoring carry the most weight.",
      },
      {
        cert: "generative-ai-leader",
        note: "Conceptual understanding of the platform layers and where foundation models fit.",
      },
      {
        cert: "professional-data-engineer",
        note: "Where the data platform hands off to machine learning, and what feature engineering must deliver.",
      },
    ],
    questionTopic: "ai-ml",
    related: ["machine-learning-fundamentals", "generative-ai", "bigquery", "cloud-build-and-cicd"],
  },

  {
    slug: "generative-ai",
    title: "Generative AI",
    category: "ai-ml",
    summary:
      "Foundation models, prompting, grounding, retrieval augmentation and evaluation — and choosing the right technique for a failure.",
    oneLiner:
      "Generative models produce new content from a prompt; making them useful in production is mostly about giving them the right context and checking their output.",
    readingWords: 1200,
    updated: "2026-08-29",
    sections: [
      {
        heading: "What it is",
        body: [
          {
            type: "p",
            text: "Generative models produce new content — text, images, code, audio — rather than classifying or scoring existing content. Large language models work by repeatedly predicting the most plausible continuation of a sequence, having learned patterns from an enormous training corpus.",
          },
          {
            type: "p",
            text: "This mechanism explains both the capability and the characteristic failure. The model produces plausible continuations. Plausible and true usually coincide, but when they do not, the model is equally fluent and equally confident.",
          },
        ],
      },
      {
        heading: "Why it matters",
        body: [
          {
            type: "p",
            text: "Foundation models change the economics of building AI features. Where a custom model once required labelled data, training infrastructure and specialist expertise, many problems can now be addressed by calling an existing model with well-designed input.",
          },
          {
            type: "p",
            text: "The consequence is that the hard work moves. It is no longer mostly training; it is context, grounding, evaluation and knowing what to do when output is wrong.",
          },
        ],
      },
      {
        heading: "Key concepts",
        body: [
          {
            type: "ul",
            items: [
              "**Foundation model** — a large model trained on broad data, adaptable to many tasks without task-specific training.",
              "**Token** — the unit models process. Both input and output are billed in tokens, which is the basis of the cost model.",
              "**Context window** — how much text the model can consider at once. Large but finite, and the constraint that makes retrieval necessary.",
              "**Prompt** — the input, including instructions, examples and any supplied context.",
              "**Few-shot prompting** — including examples in the prompt to demonstrate the desired output format and style.",
              "**Grounding** — supplying authoritative source material so the model answers from it rather than from memory.",
              "**Retrieval-augmented generation (RAG)** — retrieving relevant documents at query time and including them in the prompt.",
              "**Embedding** — a numeric representation of meaning, used to find semantically similar content rather than keyword matches.",
              "**Vector database** — stores embeddings and finds nearest matches quickly. The retrieval half of RAG.",
              "**Fine-tuning** — further training on your own examples to adjust style, format or domain behaviour.",
              "**Hallucination** — fluent, confident output that is factually wrong. The defining failure mode.",
              "**Temperature** — controls randomness. Low for factual tasks, higher for creative ones.",
            ],
          },
        ],
      },
      {
        heading: "The technique-selection question",
        body: [
          {
            type: "p",
            text: "This is the framework worth memorising, and the shape of a large proportion of exam questions on the subject. When output is wrong, the fix depends on why it is wrong.",
          },
          {
            type: "table",
            head: ["The problem", "The fix", "Why"],
            rows: [
              [
                "Output format or style is wrong",
                "Better prompting, with examples.",
                "The model can already do it; it needs clearer instruction.",
              ],
              [
                "The model does not know your private or current information",
                "Grounding and retrieval augmentation.",
                "The information was never in its training data. No amount of prompting can conjure it.",
              ],
              [
                "The model consistently misses domain conventions or tone",
                "Fine-tuning.",
                "Behaviour needs to change systematically, beyond what examples in a prompt achieve.",
              ],
              [
                "The task is beyond the model's capability entirely",
                "A more capable model, or a different approach.",
                "No prompting technique compensates for a fundamental capability gap.",
              ],
              [
                "Answers are inconsistent between identical calls",
                "Lower temperature; constrain the output format.",
                "Sampling randomness is producing the variation.",
              ],
            ],
          },
          {
            type: "note",
            text: "The most common wrong answer in this area is fine-tuning as a fix for the model not knowing your data. Fine-tuning changes behaviour, not knowledge. If the model needs facts it has never seen, retrieval is the answer.",
          },
        ],
      },
      {
        heading: "How retrieval augmentation works",
        body: [
          {
            type: "diagram",
            caption: "The model answers from documents you supplied, not from memory.",
            steps: [
              "Documents are split into chunks and converted to embeddings",
              "Embeddings are stored in a vector database with references back to the source",
              "A user question arrives and is converted to an embedding",
              "The most semantically similar chunks are retrieved",
              "Those chunks are included in the prompt alongside the question",
              "The model answers from the supplied context and can cite its sources",
            ],
          },
          {
            type: "p",
            text: "Beyond accuracy, this gives you two things that matter in production: citations, so users can verify claims, and access control, because you can filter retrieval to documents the user is permitted to see.",
          },
        ],
      },
      {
        heading: "Evaluation and responsible use",
        body: [
          {
            type: "ul",
            items: [
              "Build an evaluation set of representative inputs with known good outputs before you deploy, not after something goes wrong.",
              "Automated metrics are a screening tool; human review remains necessary for anything subjective.",
              "Keep a human in the loop wherever an error carries real consequence — medical, legal, financial or safety contexts.",
              "Be explicit with users about what is AI-generated and how confident they should be in it.",
              "Consider privacy before sending data to a model, including whether inputs are retained.",
              "Test for biased or harmful output deliberately; it will not surface on its own during ordinary development.",
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
              "Question answering grounded in a company's own documentation.",
              "Summarising long documents, transcripts and support conversations.",
              "Drafting content that a person reviews and edits before use.",
              "Extracting structured data from unstructured text and documents.",
              "Code generation, explanation and review assistance.",
              "Semantic search that finds relevant content without exact keyword matches.",
            ],
          },
        ],
      },
    ],
    certRelevance: [
      {
        cert: "generative-ai-leader",
        note: "The entire exam. Technique selection, grounding, evaluation and responsible AI are all directly examined.",
      },
      {
        cert: "professional-machine-learning-engineer",
        note: "A growing portion of the exam, covering grounding, tuning approaches and evaluating generative output.",
      },
      {
        cert: "cloud-digital-leader",
        note: "Business-level understanding of what generative AI does and where it creates value.",
      },
    ],
    questionTopic: "ai-ml",
    related: ["vertex-ai", "machine-learning-fundamentals", "bigquery"],
  },
];
