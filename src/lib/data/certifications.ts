import type { CareerTrack, CertLevel, Certification } from "@/types";

/**
 * Certification catalogue.
 *
 * Two kinds of information live here and they are rendered differently:
 *
 *  - `facts` and `examTopics` summarise information published on Google
 *    Cloud's official certification pages. Every page that renders them shows
 *    an attribution block linking to `facts.officialUrl`. Weightings are only
 *    included where they are officially published; otherwise `weight` is
 *    omitted rather than estimated.
 *
 *  - `difficulty`, `prepWeeks`, `roadmap`, `overview`, `audience`, `careers`
 *    and `faqs` are GCP Prep's own independent editorial assessments.
 *
 * Nothing here reproduces exam questions, exam guides verbatim, or any
 * confidential material.
 */

const OFFICIAL = "https://cloud.google.com/learn/certification";

export const certLevelMeta: Record<
  CertLevel,
  { label: string; blurb: string; order: number }
> = {
  foundational: {
    label: "Foundational",
    blurb:
      "No hands-on experience required. Best for understanding what cloud is, what it is for, and how organisations use it.",
    order: 1,
  },
  associate: {
    label: "Associate",
    blurb:
      "For people who deploy and operate workloads. Expects real console and command-line practice.",
    order: 2,
  },
  professional: {
    label: "Professional",
    blurb:
      "Design-level exams with long scenario questions. Expects production experience and trade-off judgement.",
    order: 3,
  },
};

export const careerTrackMeta: Record<CareerTrack, { label: string; blurb: string }> = {
  "cloud-engineer": {
    label: "Cloud Engineer",
    blurb: "Deploy, configure and operate workloads and infrastructure.",
  },
  architect: {
    label: "Architect",
    blurb: "Design systems, weigh trade-offs and set technical direction.",
  },
  developer: {
    label: "Developer",
    blurb: "Build and ship cloud-native applications and APIs.",
  },
  data: {
    label: "Data",
    blurb: "Build pipelines, warehouses and analytics platforms.",
  },
  "ai-ml": {
    label: "AI/ML",
    blurb: "Train, serve and operate machine learning and generative AI systems.",
  },
  security: {
    label: "Security",
    blurb: "Protect identity, data, networks and workloads.",
  },
  devops: {
    label: "DevOps",
    blurb: "Automate delivery, run reliable services and reduce toil.",
  },
};

const professionalFacts = (officialUrl: string, recommendedExperience: string) => ({
  durationMinutes: 120,
  questions: "50–60 multiple choice and multiple select",
  price: "USD $200 (plus tax where applicable)",
  validity: "2 years",
  delivery: "Online proctored, or onsite at a test centre",
  recommendedExperience,
  officialUrl,
});

export const certifications: Certification[] = [
  /* ------------------------------------------------------------------ */
  /* FOUNDATIONAL                                                        */
  /* ------------------------------------------------------------------ */
  {
    slug: "cloud-digital-leader",
    name: "Cloud Digital Leader",
    shortName: "Cloud Digital Leader",
    level: "foundational",
    tracks: ["cloud-engineer", "data", "ai-ml"],
    tagline: "The business-literacy exam. No hands-on experience required.",
    description:
      "Cloud Digital Leader tests whether you can explain what cloud technology does for an organisation — the capabilities of the main product families, the vocabulary, and why a business would choose one approach over another. It is the only Google Cloud exam written for people who do not build systems themselves.",
    difficulty: 1,
    prepWeeks: [2, 4],
    facts: {
      durationMinutes: 90,
      questions: "50–60 multiple choice and multiple select",
      price: "USD $99 (plus tax where applicable)",
      validity: "3 years",
      delivery: "Online proctored, or onsite at a test centre",
      recommendedExperience:
        "No hands-on experience with Google Cloud is required. Familiarity with general business and technology concepts is assumed.",
      officialUrl: `${OFFICIAL}/cloud-digital-leader`,
    },
    skills: [
      "Cloud value proposition and digital transformation",
      "Google Cloud product families and what each is for",
      "Data lifecycle, analytics and AI/ML concepts",
      "Infrastructure and application modernisation paths",
      "Shared responsibility, security and compliance basics",
      "Cost, billing and operations fundamentals",
    ],
    audience: [
      "Sales, marketing, finance and delivery people who work alongside cloud teams",
      "Project and product managers who need to speak the language credibly",
      "Career switchers who want a first, achievable certification",
      "Engineers who want a structured tour of the platform before going deeper",
    ],
    overview: [
      "Cloud Digital Leader is a breadth exam, not a depth exam. It asks whether you can match a business problem to the right category of product and explain the reasoning — not whether you can configure anything.",
      "That makes it unusual. Most people fail it not because the material is hard but because they study it like an engineering exam: memorising configuration details nobody asks about, while skipping the transformation and cost-model vocabulary that carries real weight.",
      "Treat it as a vocabulary and judgement exam. If you can read a two-sentence business scenario and confidently say \"that is a BigQuery problem, not a Cloud SQL problem, and here is why\", you are ready.",
    ],
    examTopics: [
      {
        title: "Introduction to digital transformation with Google Cloud",
        weight: "~10%",
        points: [
          "Why organisations move to cloud and what changes when they do",
          "Comparing on-premises, private, public and hybrid models",
          "Core cloud economics: capital versus operating expenditure",
          "Common drivers and blockers for a transformation programme",
        ],
      },
      {
        title: "Innovating with data and Google Cloud",
        weight: "~30%",
        points: [
          "The data lifecycle: ingest, store, process, analyse, activate",
          "Structured, semi-structured and unstructured data and where each belongs",
          "Data warehouse, data lake and lakehouse concepts",
          "Machine learning and generative AI capabilities at a business level",
          "Choosing between pre-trained APIs, low-code tooling and custom models",
        ],
      },
      {
        title: "Infrastructure and application modernisation",
        weight: "~30%",
        points: [
          "Modernisation paths: lift and shift, move and improve, rebuild",
          "Virtual machines, containers and serverless as a spectrum of control",
          "Hybrid and multicloud approaches and why an organisation picks them",
          "APIs and API management as a modernisation strategy",
        ],
      },
      {
        title: "Understanding Google Cloud security and operations",
        weight: "~30%",
        points: [
          "The shared responsibility model and where the boundary sits",
          "Identity, least privilege and the principle behind access control",
          "Encryption at rest and in transit as default behaviour",
          "Cost management, billing structure and optimisation levers",
          "Monitoring, logging, reliability and support models",
        ],
      },
    ],
    roadmap: [
      {
        title: "Cloud fundamentals and vocabulary",
        summary:
          "Get the mental model first: what a region is, what a zone is, what shared responsibility means, and how billing is structured.",
        learn: ["cloud-fundamentals", "iam"],
      },
      {
        title: "Compute: the spectrum of control",
        summary:
          "Learn the ladder from virtual machines to containers to fully managed serverless, and why an organisation moves along it.",
        learn: ["compute-engine", "cloud-run", "google-kubernetes-engine"],
      },
      {
        title: "Storage and databases",
        summary:
          "Understand object storage versus relational versus non-relational, and which business problem each solves.",
        learn: ["cloud-storage", "cloud-sql", "firestore"],
      },
      {
        title: "Data and analytics",
        summary:
          "This is the heaviest scored area alongside modernisation. Focus on the data lifecycle and where each product sits in it.",
        learn: ["bigquery", "pub-sub", "dataflow"],
      },
      {
        title: "AI and generative AI",
        summary:
          "Know the difference between using a pre-trained model, tuning one, and training your own — and when each makes commercial sense.",
        learn: ["generative-ai", "vertex-ai", "machine-learning-fundamentals"],
      },
      {
        title: "Security, identity and compliance",
        summary:
          "Shared responsibility, least privilege, encryption defaults and the vocabulary of compliance.",
        learn: ["iam", "cloud-kms", "security-command-center"],
      },
      {
        title: "Operations, cost and support",
        summary:
          "Billing structure, committed use and sustained use discounts, monitoring, and the support tiers.",
        learn: ["cloud-monitoring"],
      },
      {
        title: "Practice questions by topic",
        summary:
          "Work through the question bank topic by topic. Read every explanation, including the ones you answered correctly.",
        learn: [],
      },
      {
        title: "Timed mock exam",
        summary:
          "Sit a full-length timed test. Aim for a comfortable margin above pass before you book.",
        learn: [],
      },
    ],
    careers: [
      {
        role: "Cloud sales and pre-sales",
        summary:
          "Credibility in customer conversations without needing to be an engineer. The most common commercial reason people take this exam.",
      },
      {
        role: "Product and project management",
        summary:
          "Enough vocabulary to challenge estimates, understand trade-offs and write sensible requirements.",
      },
      {
        role: "Consulting and delivery",
        summary:
          "A baseline many consultancies expect across the whole delivery team, not only engineers.",
      },
    ],
    faqs: [
      {
        q: "Do I need any technical background for Cloud Digital Leader?",
        a: "No. Google publishes this exam as requiring no hands-on experience. If you can read a business scenario and reason about trade-offs, you have the base you need. Most successful candidates prepare in two to four weeks of steady evening study.",
      },
      {
        q: "Is Cloud Digital Leader worth it for an engineer?",
        a: "As a career credential on its own, rarely. As a two-week structured tour of the platform before starting Associate Cloud Engineer, it is genuinely useful — it gives you the map before you learn the terrain. Many engineers skip it and go straight to Associate Cloud Engineer, which is a reasonable choice.",
      },
      {
        q: "How is it different from Associate Cloud Engineer?",
        a: "Cloud Digital Leader asks what a product is for. Associate Cloud Engineer asks you to configure it. One is a vocabulary and judgement exam; the other assumes hours in the console and on the command line.",
      },
      {
        q: "What is the hardest part of the exam?",
        a: "In our experience, the questions that give you two products that both technically work and ask which is more appropriate. The trap is choosing the more powerful option when the scenario asks for the simplest one that meets the requirement.",
      },
    ],
    questionTopics: ["fundamentals", "compute", "storage", "data", "ai-ml", "security"],
    relatedCerts: ["generative-ai-leader", "associate-cloud-engineer"],
    relatedGuides: [
      "best-google-cloud-certification-for-beginners",
      "google-cloud-certification-roadmap",
      "google-cloud-certification-cost",
    ],
    relatedLearn: ["cloud-fundamentals", "bigquery", "generative-ai"],
  },

  {
    slug: "generative-ai-leader",
    name: "Generative AI Leader",
    shortName: "Gen AI Leader",
    level: "foundational",
    tracks: ["ai-ml", "data"],
    tagline: "Business-level fluency in generative AI, without writing code.",
    description:
      "Generative AI Leader covers how generative AI works at a conceptual level, what Google Cloud offers to build with it, the techniques that improve model output, and how organisations turn all of that into a business case. It assumes no engineering background.",
    difficulty: 1,
    prepWeeks: [2, 4],
    facts: {
      durationMinutes: 90,
      questions: "50–60 multiple choice and multiple select",
      price: "USD $99 (plus tax where applicable)",
      validity: "3 years",
      delivery: "Online proctored, or onsite at a test centre",
      recommendedExperience:
        "No hands-on experience is required. Google positions this exam for business professionals rather than practitioners.",
      officialUrl: `${OFFICIAL}/generative-ai-leader`,
    },
    skills: [
      "How large language models and foundation models actually work",
      "Prompt design, grounding and retrieval-augmented generation",
      "Google Cloud's generative AI product surface and where each fits",
      "Evaluating model output quality and failure modes",
      "Responsible AI, bias, privacy and human oversight",
      "Building a business case and measuring return on a gen AI project",
    ],
    audience: [
      "Leaders deciding whether and where to invest in generative AI",
      "Product managers scoping AI features",
      "Consultants and analysts advising on AI adoption",
      "Anyone who needs to separate genuine capability from marketing",
    ],
    overview: [
      "This is the newest of the foundational exams and the one people most often underestimate. It is not a prompt-engineering quiz — a meaningful share of it is about knowing which technique fixes which failure.",
      "The single most valuable thing you can internalise: when a model gives a wrong answer, is the fix a better prompt, grounding it in your own data, tuning it, or choosing a different model entirely? Most scenario questions are a variation on that decision.",
      "Because the product surface moves quickly, prioritise the durable concepts — grounding, retrieval, evaluation, responsible AI — over memorising product names that may be renamed by the time you sit the exam.",
    ],
    examTopics: [
      {
        title: "Fundamentals of generative AI",
        points: [
          "Foundation models, large language models and multimodal models",
          "Tokens, context windows and what they cost you",
          "Training, fine-tuning and inference as distinct activities",
          "Hallucination, grounding and why models state wrong things confidently",
        ],
      },
      {
        title: "Google Cloud's generative AI offerings",
        points: [
          "Managed model platforms versus pre-built APIs versus assistants",
          "Where a vector database and a search index fit into an AI system",
          "Agent and workflow tooling at a conceptual level",
          "Choosing between building, tuning and simply calling a model",
        ],
      },
      {
        title: "Techniques to improve model output",
        points: [
          "Prompt design patterns and few-shot examples",
          "Retrieval-augmented generation and grounding in trusted sources",
          "Fine-tuning and when its cost is justified",
          "Evaluating output: automated metrics versus human review",
        ],
      },
      {
        title: "Business strategies for a successful gen AI solution",
        points: [
          "Identifying use cases with measurable value",
          "Cost drivers and how they scale with usage",
          "Responsible AI, governance and human-in-the-loop design",
          "Change management and user adoption",
        ],
      },
    ],
    roadmap: [
      {
        title: "How generative models work",
        summary:
          "Get an honest conceptual model of training and inference. You do not need the mathematics, but you do need to know what the model is actually doing.",
        learn: ["generative-ai", "machine-learning-fundamentals"],
      },
      {
        title: "The Google Cloud AI surface",
        summary:
          "Learn the layers: managed platform, pre-built APIs, and end-user assistants — and which problem each layer solves.",
        learn: ["vertex-ai", "generative-ai"],
      },
      {
        title: "Grounding and retrieval",
        summary:
          "The highest-value topic on the exam. Understand why grounding a model in your own documents fixes a class of failures that better prompting cannot.",
        learn: ["generative-ai", "bigquery"],
      },
      {
        title: "Improving output quality",
        summary:
          "Prompting, few-shot examples, tuning and model choice — and the order you should try them in.",
        learn: ["generative-ai"],
      },
      {
        title: "Evaluation and failure modes",
        summary:
          "How you know whether a gen AI feature is actually working, and what to do when it is not.",
        learn: ["machine-learning-fundamentals"],
      },
      {
        title: "Responsible AI and governance",
        summary:
          "Bias, privacy, data residency, human oversight and the vocabulary of AI governance.",
        learn: ["iam", "security-command-center"],
      },
      {
        title: "Business case and cost",
        summary:
          "How gen AI costs scale, and how to frame value in terms a finance team accepts.",
        learn: ["cloud-fundamentals"],
      },
      {
        title: "Practice questions and mock exam",
        summary:
          "Work the AI/ML question bank, then sit a timed mock. Focus your review on the technique-selection questions.",
        learn: [],
      },
    ],
    careers: [
      {
        role: "AI product manager",
        summary:
          "Scope AI features realistically and push back on ideas that will not survive contact with a real model.",
      },
      {
        role: "Strategy and consulting",
        summary:
          "Advise on adoption with a defensible view of what is achievable now versus what is a demo.",
      },
      {
        role: "Technical leadership",
        summary:
          "Set direction for teams building AI features without needing to write the code yourself.",
      },
    ],
    faqs: [
      {
        q: "Is Generative AI Leader harder than Cloud Digital Leader?",
        a: "It is narrower but conceptually denser. Cloud Digital Leader covers a wide surface shallowly; this exam goes a level deeper into one subject. If you already work near AI projects you may find it easier; if you do not, budget the same two to four weeks.",
      },
      {
        q: "Do I need to know how to code?",
        a: "No. The exam is written for business professionals. You need to understand what techniques do and when to apply them, not how to implement them.",
      },
      {
        q: "Which should I take first?",
        a: "If you work in or near AI, take this one first — it is more immediately useful. If you need broad platform literacy, start with Cloud Digital Leader. They overlap less than people expect.",
      },
      {
        q: "How quickly will this content go out of date?",
        a: "The product names move fast; the concepts do not. Grounding, retrieval, evaluation and responsible AI will still be the right framework long after specific product names change. Weight your study accordingly.",
      },
    ],
    questionTopics: ["ai-ml", "data", "fundamentals"],
    relatedCerts: ["cloud-digital-leader", "professional-machine-learning-engineer"],
    relatedGuides: [
      "best-google-cloud-certification-for-beginners",
      "google-cloud-certification-roadmap",
    ],
    relatedLearn: ["generative-ai", "vertex-ai", "machine-learning-fundamentals"],
  },

  /* ------------------------------------------------------------------ */
  /* ASSOCIATE                                                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "associate-cloud-engineer",
    name: "Associate Cloud Engineer",
    shortName: "Associate Cloud Engineer",
    level: "associate",
    tracks: ["cloud-engineer", "devops", "developer"],
    tagline: "The hands-on baseline. The most widely useful place to start.",
    description:
      "Associate Cloud Engineer certifies that you can deploy applications, monitor operations and manage enterprise solutions on Google Cloud. It is a practical exam: it assumes you have spent real hours in the console and on the command line, and it rewards muscle memory over theory.",
    difficulty: 3,
    prepWeeks: [6, 10],
    facts: {
      durationMinutes: 120,
      questions: "50–60 multiple choice and multiple select",
      price: "USD $125 (plus tax where applicable)",
      validity: "3 years",
      delivery: "Online proctored, or onsite at a test centre",
      recommendedExperience:
        "Google recommends at least 6 months of hands-on experience building solutions with Google Cloud.",
      officialUrl: `${OFFICIAL}/cloud-engineer`,
    },
    skills: [
      "Setting up projects, billing accounts and the resource hierarchy",
      "Deploying and managing Compute Engine, GKE, Cloud Run and App Engine workloads",
      "Configuring VPC networks, firewall rules and load balancing",
      "Choosing and configuring storage and database services",
      "IAM roles, service accounts and least-privilege access",
      "Monitoring, logging, alerting and basic troubleshooting",
      "Fluency with the gcloud command line and Cloud Shell",
    ],
    audience: [
      "Engineers moving into a cloud-facing role",
      "System administrators and support engineers modernising their skills",
      "Developers who deploy and operate what they build",
      "Anyone who wants one certification that proves practical competence",
    ],
    overview: [
      "Associate Cloud Engineer is the certification we recommend to most people, most of the time. It is the one that changes what you can actually do at work rather than only what you can talk about.",
      "The defining characteristic of the exam is that it is command-line literate. A meaningful share of questions show you a gcloud command and ask what it does, or describe an outcome and ask which command produces it. You cannot pass this reliably by reading alone.",
      "The second characteristic is precision about IAM. Questions routinely offer four roles that all sound plausible and ask for the one granting least privilege that still works. This is the single highest-yield area to over-prepare.",
      "Budget six to ten weeks. Spend at least a third of that time with a real project open, breaking and fixing things. The free tier is enough for almost everything you need to practise.",
    ],
    examTopics: [
      {
        title: "Setting up a cloud solution environment",
        weight: "~17.5%",
        points: [
          "Organisations, folders, projects and how policy inherits down the hierarchy",
          "Billing accounts, budgets, alerts and exporting billing data",
          "Installing and configuring the Cloud SDK and gcloud configurations",
          "Enabling APIs and managing service accounts for a project",
        ],
      },
      {
        title: "Planning and configuring a cloud solution",
        weight: "~17.5%",
        points: [
          "Estimating cost with the pricing calculator and choosing machine types",
          "Selecting a compute option: virtual machines, containers or serverless",
          "Choosing a storage class and a database product for a given workload",
          "Planning networks, subnets and IP address ranges",
        ],
      },
      {
        title: "Deploying and implementing a cloud solution",
        weight: "~25%",
        points: [
          "Launching Compute Engine instances, instance templates and managed instance groups",
          "Creating GKE clusters and deploying workloads with kubectl",
          "Deploying containers to Cloud Run and applications to App Engine",
          "Configuring Cloud Storage buckets, lifecycle rules and access",
          "Creating VPCs, subnets, firewall rules and load balancers",
          "Deploying data solutions such as Pub/Sub topics and BigQuery datasets",
        ],
      },
      {
        title: "Ensuring successful operation of a cloud solution",
        weight: "~20%",
        points: [
          "Managing instances: snapshots, images, autoscaling and resizing",
          "Managing Kubernetes workloads, deployments and services",
          "Working with Cloud Monitoring dashboards, alerting policies and uptime checks",
          "Querying and exporting logs with Cloud Logging",
          "Diagnosing and resolving common operational failures",
        ],
      },
      {
        title: "Configuring access and security",
        weight: "~20%",
        points: [
          "Assigning predefined and custom IAM roles at the right level of the hierarchy",
          "Creating and managing service accounts and their keys",
          "Understanding basic, predefined and custom role differences",
          "Viewing audit logs to answer who did what, and when",
        ],
      },
    ],
    roadmap: [
      {
        title: "Cloud fundamentals and the resource hierarchy",
        summary:
          "Projects, folders, organisations, regions, zones and billing. Everything else in the exam assumes this is second nature.",
        learn: ["cloud-fundamentals"],
      },
      {
        title: "Compute",
        summary:
          "Compute Engine first — machine types, images, snapshots, instance groups, autoscaling — then Cloud Run for the serverless model.",
        learn: ["compute-engine", "cloud-run"],
      },
      {
        title: "Storage",
        summary:
          "Cloud Storage classes, lifecycle policies and access control. Know exactly when Nearline beats Standard and when it does not.",
        learn: ["cloud-storage", "filestore"],
      },
      {
        title: "Networking",
        summary:
          "VPCs, subnets, firewall rules, routes and the load balancer decision tree. Firewall rule precedence is reliably tested.",
        learn: ["vpc", "load-balancing", "cloud-dns"],
      },
      {
        title: "IAM and security",
        summary:
          "The highest-yield topic per hour spent. Predefined versus custom roles, service accounts, inheritance and least privilege.",
        learn: ["iam", "cloud-kms"],
      },
      {
        title: "Databases and data",
        summary:
          "Cloud SQL, Firestore, Bigtable and BigQuery — enough to choose correctly and deploy a basic instance.",
        learn: ["cloud-sql", "firestore", "bigquery", "pub-sub"],
      },
      {
        title: "Kubernetes",
        summary:
          "Create a cluster, deploy a workload, expose it, scale it. You need working kubectl fluency, not cluster-design depth.",
        learn: ["google-kubernetes-engine"],
      },
      {
        title: "Monitoring, logging and operations",
        summary:
          "Dashboards, alerting policies, uptime checks, log queries and log sinks.",
        learn: ["cloud-monitoring"],
      },
      {
        title: "Command-line drilling",
        summary:
          "Work through the common gcloud and kubectl commands until you can read one and predict its effect without thinking.",
        learn: ["compute-engine", "google-kubernetes-engine"],
      },
      {
        title: "Practice questions and timed mock exam",
        summary:
          "Topic-by-topic practice, then full-length timed mocks. Track weak topics and go back to the console, not the notes.",
        learn: [],
      },
    ],
    careers: [
      {
        role: "Cloud Engineer",
        summary:
          "The role this exam is named for: provisioning, operating and supporting workloads day to day.",
      },
      {
        role: "DevOps Engineer",
        summary:
          "A common entry point. Pair it with CI/CD and infrastructure-as-code experience to be competitive.",
      },
      {
        role: "Site Reliability Engineer",
        summary:
          "The operations and monitoring portion maps directly onto SRE fundamentals.",
      },
      {
        role: "Cloud Support Engineer",
        summary:
          "Breadth across products plus troubleshooting is exactly what support roles screen for.",
      },
    ],
    faqs: [
      {
        q: "How long does it take to prepare for Associate Cloud Engineer?",
        a: "Six to ten weeks is realistic for someone with general IT experience but limited Google Cloud exposure. If you already work on the platform daily, three to five weeks of focused revision is usually enough. If you are entirely new to infrastructure, plan for three months and do not rush it.",
      },
      {
        q: "Can I pass without hands-on practice?",
        a: "It is possible but a bad trade. The exam tests recognition of commands and console workflows, and that knowledge does not survive being read once. Build things on the free tier — a VM behind a load balancer, a GKE deployment, a Cloud Run service — and the questions start answering themselves.",
      },
      {
        q: "Is Associate Cloud Engineer worth it without work experience?",
        a: "Yes, with a caveat: on its own it opens fewer doors than people hope. Paired with two or three projects you can talk through in detail, it is a strong signal for a junior cloud role. The certification gets you read; the projects get you hired.",
      },
      {
        q: "Should I do Cloud Digital Leader first?",
        a: "Only if you want a gentle on-ramp or need the business vocabulary for your job. It is not a prerequisite and it does not make Associate Cloud Engineer meaningfully easier. Most people can start here directly.",
      },
      {
        q: "What trips people up most?",
        a: "IAM role selection and firewall rule evaluation. Both have several plausible-looking answers where only one is correct, and both reward precision rather than general understanding.",
      },
    ],
    questionTopics: [
      "fundamentals",
      "iam",
      "compute",
      "storage",
      "networking",
      "databases",
      "kubernetes",
      "monitoring",
    ],
    relatedCerts: [
      "professional-cloud-architect",
      "professional-cloud-devops-engineer",
      "cloud-digital-leader",
    ],
    relatedGuides: [
      "google-cloud-certification-guide",
      "how-to-prepare-for-cloud-certification",
      "cloud-certification-study-plan",
    ],
    relatedLearn: ["compute-engine", "iam", "vpc", "google-kubernetes-engine"],
  },

  /* ------------------------------------------------------------------ */
  /* PROFESSIONAL                                                        */
  /* ------------------------------------------------------------------ */
  {
    slug: "professional-cloud-architect",
    name: "Professional Cloud Architect",
    shortName: "Cloud Architect",
    level: "professional",
    tracks: ["architect", "cloud-engineer", "security"],
    tagline: "The flagship design exam. Long scenarios, real trade-offs.",
    description:
      "Professional Cloud Architect assesses whether you can design, plan and manage a cloud solution architecture that meets business and technical requirements. It is the broadest and most respected exam in the programme, and the one that most rewards genuine production experience.",
    difficulty: 5,
    prepWeeks: [10, 16],
    facts: professionalFacts(
      `${OFFICIAL}/cloud-architect`,
      "Google recommends 3+ years of industry experience, including 1+ year designing and managing solutions on Google Cloud.",
    ),
    skills: [
      "Translating business requirements into technical architecture",
      "Designing for high availability, disaster recovery and defined RTO/RPO targets",
      "Security, compliance and multi-tenancy design",
      "Migration planning from on-premises and other clouds",
      "Cost modelling and optimisation across a solution",
      "Reliability engineering, capacity planning and operational readiness",
      "Reading a long case study and extracting the constraints that matter",
    ],
    audience: [
      "Senior engineers moving into architecture",
      "Existing architects proving Google Cloud specifically",
      "Technical leads who set direction across multiple teams",
      "Consultants who design systems for clients",
    ],
    overview: [
      "This is the hardest widely-taken exam in the programme, and its difficulty is a different kind from Associate Cloud Engineer's. That exam asks whether you know the command. This one asks whether you would make the right call under conflicting constraints.",
      "The exam includes long case studies — fictional companies with business goals, technical requirements, existing systems and executive statements. A substantial portion of questions attach to them. Learning to read these efficiently is a distinct skill worth practising on its own.",
      "The most common failure mode is technically correct answers that ignore a stated business constraint. If the case study says the company has a small operations team, the answer that requires managing a Kubernetes cluster is wrong even when it works.",
      "You need Associate-level fluency as a floor, not a target. Everything at that level is assumed; the exam spends its time above it.",
    ],
    examTopics: [
      {
        title: "Designing and planning a cloud solution architecture",
        weight: "~24%",
        points: [
          "Turning business requirements into technical and non-functional requirements",
          "Designing for availability, durability, scalability and elasticity",
          "Network, storage and compute resource design across regions",
          "Migration planning, including phased and hybrid approaches",
          "Designing for future growth without over-engineering today",
        ],
      },
      {
        title: "Managing and provisioning a solution infrastructure",
        weight: "~15%",
        points: [
          "Configuring network topologies including shared and peered VPCs",
          "Provisioning storage and data systems appropriate to the workload",
          "Configuring compute systems and autoscaling behaviour",
          "Infrastructure as code and repeatable provisioning",
        ],
      },
      {
        title: "Designing for security and compliance",
        weight: "~18%",
        points: [
          "Identity and access management design across an organisation",
          "Resource hierarchy and organisation policy as guardrails",
          "Data security: encryption, key management and data classification",
          "Separation of duties and privileged access design",
          "Meeting regulatory requirements including data residency",
        ],
      },
      {
        title: "Analysing and optimising technical and business processes",
        weight: "~18%",
        points: [
          "Analysing and defining technical and business processes",
          "Cost optimisation across compute, storage, network and licensing",
          "Team and stakeholder management considerations",
          "Change management and phased rollout strategies",
        ],
      },
      {
        title: "Managing implementation",
        weight: "~11%",
        points: [
          "Advising development and operations teams on implementation",
          "Interacting with services programmatically and via APIs",
          "Testing strategy and validating a design against requirements",
        ],
      },
      {
        title: "Ensuring solution and operations reliability",
        weight: "~14%",
        points: [
          "Monitoring, alerting and observability design",
          "Deployment and release management strategies",
          "Disaster recovery design against defined RTO and RPO",
          "Incident response, post-mortems and continuous improvement",
        ],
      },
    ],
    roadmap: [
      {
        title: "Consolidate Associate-level fundamentals",
        summary:
          "Compute, storage, networking and IAM must be automatic. If any of these still require thinking, fix that before anything else.",
        learn: ["compute-engine", "cloud-storage", "vpc", "iam"],
      },
      {
        title: "Resource hierarchy and organisation design",
        summary:
          "Folders, projects, organisation policy and how enterprises actually structure an estate. Heavily represented in scenarios.",
        learn: ["iam", "cloud-fundamentals"],
      },
      {
        title: "Advanced networking",
        summary:
          "Shared VPC, VPC peering, hybrid connectivity, private access to services, and the full load balancing decision tree.",
        learn: ["vpc", "load-balancing", "cloud-dns", "cloud-cdn"],
      },
      {
        title: "Data architecture",
        summary:
          "Choosing between relational, document, wide-column and analytical stores under real constraints — and designing the pipeline between them.",
        learn: ["cloud-sql", "spanner", "bigtable", "firestore", "bigquery"],
      },
      {
        title: "Security and compliance design",
        summary:
          "Encryption and key management, data classification, boundary controls, audit and the vocabulary of compliance regimes.",
        learn: ["cloud-kms", "security-command-center", "iam"],
      },
      {
        title: "Reliability, HA and disaster recovery",
        summary:
          "Multi-zone versus multi-region, backup and restore strategies, and designing explicitly to an RTO and RPO target.",
        learn: ["cloud-monitoring", "load-balancing"],
      },
      {
        title: "Migration and modernisation",
        summary:
          "Lift and shift, replatform, refactor. Data transfer options at different scales, and phased cutover strategies.",
        learn: ["compute-engine", "google-kubernetes-engine", "cloud-run"],
      },
      {
        title: "Cost modelling",
        summary:
          "Committed use and sustained use discounts, storage class economics, egress, and how to argue a cost position credibly.",
        learn: ["cloud-fundamentals", "cloud-storage"],
      },
      {
        title: "Case study practice",
        summary:
          "Work the published case studies deliberately. For each one, write down the constraints that would eliminate an otherwise-correct answer.",
        learn: [],
      },
      {
        title: "Timed mock exams",
        summary:
          "Full-length, timed, without notes. Two hours of dense scenario reading is a stamina problem as much as a knowledge one.",
        learn: [],
      },
    ],
    careers: [
      {
        role: "Cloud Architect",
        summary:
          "Design systems and set technical direction. The certification is frequently a screening requirement for these roles.",
      },
      {
        role: "Solutions Architect (pre-sales)",
        summary:
          "Design for customers during the sales cycle. Partner organisations often require this certification to maintain their status.",
      },
      {
        role: "Principal / Staff Engineer",
        summary:
          "Cross-team technical leadership where breadth and trade-off judgement matter more than depth in one product.",
      },
      {
        role: "Cloud Consultant",
        summary:
          "Advisory and migration work, where credibility with client stakeholders is part of the job.",
      },
    ],
    faqs: [
      {
        q: "Do I need Associate Cloud Engineer before Professional Cloud Architect?",
        a: "It is not a formal prerequisite and you can register directly. In practice, Associate-level fluency is assumed throughout, so most people either hold it or have equivalent hands-on experience. Going straight to Architect with no platform experience is the most common cause of an expensive failed attempt.",
      },
      {
        q: "How hard is Professional Cloud Architect really?",
        a: "It is the hardest in the mainstream programme. The difficulty is judgement under conflicting constraints rather than obscure facts. Experienced engineers who have never designed a full system often find it harder than they expected.",
      },
      {
        q: "How much time should I budget?",
        a: "Ten to sixteen weeks for most people with relevant experience. If you are already architecting on Google Cloud daily, six to eight weeks of targeted revision can be enough.",
      },
      {
        q: "How important are the case studies?",
        a: "Very. A significant share of questions attach to them, and they are published in advance. Reading them cold during the exam wastes time you will need. Know the companies, their constraints and their stated goals before you walk in.",
      },
      {
        q: "How long does the certification last?",
        a: "Google publishes a two-year validity for Professional-level certifications. Confirm current recertification requirements on the official certification page before you plan around it.",
      },
    ],
    questionTopics: [
      "fundamentals",
      "iam",
      "compute",
      "storage",
      "networking",
      "databases",
      "kubernetes",
      "security",
      "monitoring",
    ],
    relatedCerts: [
      "associate-cloud-engineer",
      "professional-cloud-security-engineer",
      "professional-cloud-network-engineer",
    ],
    relatedGuides: [
      "google-cloud-certification-roadmap",
      "how-to-prepare-for-cloud-certification",
      "certification-career-guide",
    ],
    relatedLearn: ["vpc", "spanner", "cloud-kms", "load-balancing"],
  },

  {
    slug: "professional-cloud-developer",
    name: "Professional Cloud Developer",
    shortName: "Cloud Developer",
    level: "professional",
    tracks: ["developer", "devops"],
    tagline: "For engineers who build and ship cloud-native applications.",
    description:
      "Professional Cloud Developer covers designing, building, testing and deploying scalable and reliable applications on Google Cloud. Unlike the Architect exam it stays close to code: application patterns, service integration, deployment strategies and operating what you have shipped.",
    difficulty: 4,
    prepWeeks: [8, 12],
    facts: professionalFacts(
      `${OFFICIAL}/cloud-developer`,
      "Google recommends 3+ years of industry experience, including 1+ year building and managing solutions on Google Cloud.",
    ),
    skills: [
      "Designing stateless, horizontally scalable application architectures",
      "Building containerised services and deploying to managed runtimes",
      "Application-level security, secrets handling and service identity",
      "Integrating managed services: messaging, storage, databases and caching",
      "Deployment strategies including blue/green and canary releases",
      "Instrumentation, structured logging, tracing and debugging in production",
    ],
    audience: [
      "Backend and full-stack engineers building on Google Cloud",
      "Developers who own their services in production",
      "Platform engineers supporting application teams",
      "Engineers moving from a traditional server environment to managed runtimes",
    ],
    overview: [
      "This is the most practitioner-shaped Professional exam. If you write and deploy application code for a living, much of it will feel like a description of your working week.",
      "Two areas separate people who pass comfortably from people who scrape through. The first is service integration: knowing which managed service to reach for and how to wire it up safely. The second is operating what you deploy — structured logging, tracing, error reporting and debugging a live service.",
      "Expect meaningful coverage of application security, especially service accounts, workload identity and secret handling. Questions here often have one answer that works and one answer that works securely.",
    ],
    examTopics: [
      {
        title: "Designing highly scalable, available and reliable cloud-native applications",
        weight: "~29%",
        points: [
          "Designing performant applications and choosing an appropriate runtime",
          "Statelessness, idempotency and graceful degradation",
          "Handling failure: retries with backoff, circuit breakers and dead-letter queues",
          "API design, versioning and backward compatibility",
          "Choosing storage and data access patterns for an application",
        ],
      },
      {
        title: "Building and testing applications",
        weight: "~19%",
        points: [
          "Local development, emulators and testing against managed services",
          "Unit, integration and load testing strategy",
          "Building container images and managing dependencies",
          "Handling secrets and configuration outside the code",
        ],
      },
      {
        title: "Deploying applications",
        weight: "~15%",
        points: [
          "Deploying to Cloud Run, GKE and App Engine and choosing between them",
          "Blue/green, canary and rolling deployment strategies",
          "Traffic splitting and progressive rollout",
          "Build pipelines and artefact management",
        ],
      },
      {
        title: "Integrating Google Cloud services",
        weight: "~24%",
        points: [
          "Asynchronous communication with Pub/Sub and event-driven patterns",
          "Reading and writing data across Cloud Storage, Cloud SQL, Firestore and Spanner",
          "Caching strategies and in-memory data stores",
          "Service-to-service authentication and workload identity",
          "Consuming APIs, managing quotas and handling rate limits",
        ],
      },
      {
        title: "Managing deployed applications",
        weight: "~13%",
        points: [
          "Structured logging and log-based metrics",
          "Distributed tracing and latency analysis",
          "Error reporting and alerting on symptoms rather than causes",
          "Debugging a running production service safely",
        ],
      },
    ],
    roadmap: [
      {
        title: "Runtime selection",
        summary:
          "Cloud Run, GKE and App Engine — their scaling models, cold start behaviour, cost profile and the workloads each suits.",
        learn: ["cloud-run", "google-kubernetes-engine", "compute-engine"],
      },
      {
        title: "Application design patterns",
        summary:
          "Statelessness, idempotency, retries, backoff and graceful degradation. These recur throughout the exam.",
        learn: ["cloud-run", "pub-sub"],
      },
      {
        title: "Data access from applications",
        summary:
          "Connection management, transactions, consistency models and choosing the right store for an access pattern.",
        learn: ["cloud-sql", "firestore", "spanner", "cloud-storage"],
      },
      {
        title: "Event-driven architecture",
        summary:
          "Pub/Sub delivery semantics, ordering, dead-letter topics and at-least-once handling. Reliably tested.",
        learn: ["pub-sub", "dataflow"],
      },
      {
        title: "Application security",
        summary:
          "Service accounts, workload identity, secret management and least privilege from the application's point of view.",
        learn: ["iam", "cloud-kms"],
      },
      {
        title: "CI/CD and deployment strategies",
        summary:
          "Build pipelines, artefact registries, and traffic-splitting rollouts including canary and blue/green.",
        learn: ["cloud-build-and-cicd", "cloud-run"],
      },
      {
        title: "Observability",
        summary:
          "Structured logs, log-based metrics, traces, error reporting, and how to debug a live service.",
        learn: ["cloud-monitoring"],
      },
      {
        title: "Practice questions and mock exams",
        summary:
          "Drill service-integration and observability questions especially — they carry disproportionate weight.",
        learn: [],
      },
    ],
    careers: [
      {
        role: "Cloud Application Developer",
        summary: "Build and operate services on managed runtimes.",
      },
      {
        role: "Backend Engineer",
        summary:
          "Strong differentiator for backend roles at organisations standardised on Google Cloud.",
      },
      {
        role: "Platform Engineer",
        summary:
          "Build the paved road other application teams deploy onto.",
      },
    ],
    faqs: [
      {
        q: "Do I need to be able to code to pass?",
        a: "Yes, in the sense that you need to think like someone who writes services. The exam does not ask you to write code from scratch, but it assumes you understand application patterns, dependency management, testing and debugging from the inside.",
      },
      {
        q: "Which language should I know?",
        a: "The exam is language-agnostic. Client library patterns are broadly similar across languages, so any one you are fluent in is fine. Being able to read a snippet in an unfamiliar language helps.",
      },
      {
        q: "Is this easier than Professional Cloud Architect?",
        a: "For working developers, usually yes — the scenarios are shorter and closer to daily practice. For people without application development experience, it is harder, because the exam assumes instincts you build by shipping software.",
      },
      {
        q: "How much Kubernetes do I need?",
        a: "Enough to deploy, expose, scale and debug a workload, and to understand how it differs from a fully managed runtime. Cluster design depth belongs to the DevOps and Architect exams.",
      },
    ],
    questionTopics: [
      "compute",
      "kubernetes",
      "databases",
      "storage",
      "iam",
      "devops",
      "monitoring",
    ],
    relatedCerts: [
      "associate-cloud-engineer",
      "professional-cloud-devops-engineer",
      "professional-cloud-architect",
    ],
    relatedGuides: [
      "how-to-prepare-for-cloud-certification",
      "certification-career-guide",
    ],
    relatedLearn: ["cloud-run", "pub-sub", "google-kubernetes-engine", "firestore"],
  },

  {
    slug: "professional-data-engineer",
    name: "Professional Data Engineer",
    shortName: "Data Engineer",
    level: "professional",
    tracks: ["data", "ai-ml", "architect"],
    tagline: "Pipelines, warehouses and the systems analytics runs on.",
    description:
      "Professional Data Engineer covers designing data processing systems, building and operationalising pipelines, and making data usable for analysis and machine learning. It is the strongest certification for anyone whose work centres on moving, storing and modelling data at scale.",
    difficulty: 4,
    prepWeeks: [8, 14],
    facts: professionalFacts(
      `${OFFICIAL}/data-engineer`,
      "Google recommends 3+ years of industry experience, including 1+ year designing and managing solutions on Google Cloud.",
    ),
    skills: [
      "Designing batch and streaming data processing systems",
      "Building pipelines with managed processing services",
      "Data warehouse modelling, partitioning and clustering",
      "Choosing storage systems by access pattern and consistency need",
      "Data quality, lineage, cataloguing and governance",
      "Cost and performance tuning for analytical workloads",
      "Operationalising machine learning on top of a data platform",
    ],
    audience: [
      "Data engineers building production pipelines",
      "Analytics engineers moving deeper into infrastructure",
      "Backend engineers who own data platforms",
      "ETL and data warehouse specialists modernising their skills",
    ],
    overview: [
      "This exam is dominated by one skill: choosing correctly between storage and processing options under stated constraints. Latency, volume, structure, access pattern, cost and consistency all appear as constraints, and only one option satisfies all of them.",
      "BigQuery is the centre of gravity. You need more than query syntax — partitioning, clustering, slot behaviour, storage versus compute pricing, materialised views and how those choices change cost at scale.",
      "Streaming is the second heavy area. Pub/Sub delivery guarantees, windowing, watermarks and late-arriving data appear repeatedly, and they are the topics people most often under-prepare.",
      "Data governance has grown steadily in weight. Cataloguing, lineage, classification and access control at column level are all fair game.",
    ],
    examTopics: [
      {
        title: "Designing data processing systems",
        weight: "~22%",
        points: [
          "Selecting storage systems by access pattern, volume and consistency need",
          "Designing pipelines for batch and streaming workloads",
          "Data modelling for analytical and operational use",
          "Designing for reliability, fault tolerance and reprocessing",
          "Migration planning from existing warehouses and data lakes",
        ],
      },
      {
        title: "Ingesting and processing the data",
        weight: "~25%",
        points: [
          "Building pipelines with managed batch and streaming processing",
          "Streaming semantics: windowing, watermarks and late data",
          "Transformation, enrichment and schema evolution",
          "Orchestration, scheduling and dependency management",
          "Handling errors, retries and dead-letter paths",
        ],
      },
      {
        title: "Storing the data",
        weight: "~20%",
        points: [
          "Choosing between object storage, relational, wide-column and analytical stores",
          "BigQuery partitioning, clustering and table design",
          "Storage lifecycle, retention and archival strategy",
          "Balancing cost against query performance",
        ],
      },
      {
        title: "Preparing and using data for analysis",
        weight: "~15%",
        points: [
          "Making data discoverable, documented and trustworthy",
          "Sharing data securely across teams and organisations",
          "Building for business intelligence consumption",
          "Machine learning on warehouse data",
        ],
      },
      {
        title: "Maintaining and automating data workloads",
        weight: "~18%",
        points: [
          "Monitoring pipeline health and data freshness",
          "Automating repeatable workloads and infrastructure",
          "Troubleshooting performance and cost regressions",
          "Access control, governance and compliance for data",
        ],
      },
    ],
    roadmap: [
      {
        title: "Data platform fundamentals",
        summary:
          "The data lifecycle, batch versus streaming, and the difference between a lake, a warehouse and an operational store.",
        learn: ["cloud-fundamentals", "cloud-storage"],
      },
      {
        title: "BigQuery in depth",
        summary:
          "The largest single topic. Partitioning, clustering, slots, storage versus compute pricing, and query optimisation.",
        learn: ["bigquery"],
      },
      {
        title: "Streaming ingestion",
        summary:
          "Pub/Sub topics, subscriptions, delivery guarantees, ordering keys and dead-letter topics.",
        learn: ["pub-sub"],
      },
      {
        title: "Pipeline processing",
        summary:
          "Windowing, watermarks, late data and the unified batch/streaming model. Consistently under-prepared.",
        learn: ["dataflow"],
      },
      {
        title: "Operational data stores",
        summary:
          "Cloud SQL, Spanner, Bigtable and Firestore — and the access patterns that make each the right answer.",
        learn: ["cloud-sql", "spanner", "bigtable", "firestore"],
      },
      {
        title: "Governance and quality",
        summary:
          "Cataloguing, lineage, classification, column-level access and data quality checks in a pipeline.",
        learn: ["iam", "security-command-center"],
      },
      {
        title: "Machine learning on data platforms",
        summary:
          "Feature engineering, in-warehouse ML, and where a managed ML platform takes over.",
        learn: ["vertex-ai", "machine-learning-fundamentals"],
      },
      {
        title: "Cost and performance tuning",
        summary:
          "Where analytical cost actually accumulates and the levers that reduce it without hurting query latency.",
        learn: ["bigquery", "cloud-storage"],
      },
      {
        title: "Practice questions and mock exams",
        summary:
          "Focus on selection questions — the ones giving four workable products and one set of constraints.",
        learn: [],
      },
    ],
    careers: [
      {
        role: "Data Engineer",
        summary:
          "Build and operate the pipelines and warehouses analytics depends on.",
      },
      {
        role: "Analytics Engineer",
        summary:
          "Model warehouse data for consumption; strong overlap with the storage and analysis domains.",
      },
      {
        role: "ML Engineer",
        summary:
          "Most production ML problems are data problems. This certification pairs naturally with the ML Engineer exam.",
      },
      {
        role: "Data Platform Architect",
        summary:
          "Design the organisation-wide data estate and its governance model.",
      },
    ],
    faqs: [
      {
        q: "Do I need to know SQL well?",
        a: "Yes. You will not write long queries under exam conditions, but you need to read SQL comfortably and reason about what makes a query expensive. Partitioning and clustering questions assume you understand how a query scans data.",
      },
      {
        q: "How much programming is involved?",
        a: "Less than people expect. You need to understand pipeline concepts — transforms, windows, watermarks — rather than write pipeline code. Reading a code snippet and predicting its behaviour is the level required.",
      },
      {
        q: "Is Associate Cloud Engineer a useful prerequisite?",
        a: "Helpful but not required. The IAM and networking fundamentals it teaches show up here, but the data-specific material is largely independent. Many data engineers take this exam first.",
      },
      {
        q: "What is the most under-prepared topic?",
        a: "Streaming semantics. Windowing, watermarks and late-arriving data are conceptually subtle, appear repeatedly, and are the area where guessing is least likely to work.",
      },
    ],
    questionTopics: ["data", "databases", "storage", "ai-ml", "iam", "monitoring"],
    relatedCerts: [
      "professional-machine-learning-engineer",
      "professional-cloud-database-engineer",
      "professional-cloud-architect",
    ],
    relatedGuides: [
      "google-cloud-certification-roadmap",
      "certification-career-guide",
    ],
    relatedLearn: ["bigquery", "dataflow", "pub-sub", "bigtable"],
  },

  {
    slug: "professional-cloud-devops-engineer",
    name: "Professional Cloud DevOps Engineer",
    shortName: "Cloud DevOps Engineer",
    level: "professional",
    tracks: ["devops", "cloud-engineer"],
    tagline: "CI/CD, SRE practice and running services that stay up.",
    description:
      "Professional Cloud DevOps Engineer covers building delivery pipelines, applying site reliability engineering practice, and monitoring services in production. More than any other exam in the programme, it tests process and culture alongside technology.",
    difficulty: 4,
    prepWeeks: [8, 12],
    facts: professionalFacts(
      `${OFFICIAL}/cloud-devops-engineer`,
      "Google recommends 3+ years of industry experience, including 1+ year managing solutions on Google Cloud.",
    ),
    skills: [
      "Bootstrapping an organisation and its projects for repeatable delivery",
      "Designing CI/CD pipelines and artefact promotion",
      "Infrastructure as code and configuration management",
      "SLIs, SLOs and error budgets as operational decisions",
      "Monitoring, alerting and reducing alert fatigue",
      "Incident response, blameless post-mortems and toil reduction",
      "Performance analysis and capacity planning",
    ],
    audience: [
      "DevOps and platform engineers",
      "Site reliability engineers",
      "Engineers who own delivery pipelines",
      "Team leads responsible for production availability",
    ],
    overview: [
      "The distinguishing feature of this exam is that a real portion of it is not about products at all. Error budgets, blameless post-mortems, toil reduction and alerting philosophy are examined as concepts, and you can lose marks by answering with the technically strongest option rather than the operationally correct one.",
      "If you have not read Google's public SRE material, do that before anything else. The exam's framing of reliability comes directly from it, and the vocabulary — SLI, SLO, error budget, toil — is used precisely.",
      "The technical half is deployment strategy and observability. Expect canary and blue/green rollouts, traffic splitting, structured logging, log-based metrics, tracing and profiling.",
      "A recurring question shape: a service is failing an SLO and you must choose what to do. The right answer is usually the one that respects the error budget policy, not the one that ships the most engineering.",
    ],
    examTopics: [
      {
        title: "Bootstrapping a Google Cloud organisation for DevOps",
        weight: "~10%",
        points: [
          "Designing a resource hierarchy that supports delivery",
          "Managing projects, service accounts and permissions for automation",
          "Infrastructure as code and repeatable environment creation",
          "Managing shared platform services across teams",
        ],
      },
      {
        title: "Building and implementing CI/CD pipelines",
        weight: "~30%",
        points: [
          "Designing pipelines from source through build, test and deploy",
          "Artefact management, image scanning and supply chain integrity",
          "Deployment strategies: rolling, blue/green and canary",
          "Secure handling of credentials and secrets in pipelines",
          "Testing strategy and quality gates",
        ],
      },
      {
        title: "Applying site reliability engineering practices",
        weight: "~25%",
        points: [
          "Defining SLIs and SLOs that reflect user experience",
          "Error budgets and the decisions they should drive",
          "Toil identification and elimination",
          "Incident response, on-call structure and escalation",
          "Blameless post-mortems and follow-up actions",
        ],
      },
      {
        title: "Implementing service monitoring strategies",
        weight: "~20%",
        points: [
          "Metrics, logs and traces and what each is good for",
          "Designing alerts on symptoms rather than causes",
          "Dashboards for different audiences",
          "Log routing, retention and cost control",
        ],
      },
      {
        title: "Optimising service performance",
        weight: "~15%",
        points: [
          "Identifying bottlenecks through profiling and tracing",
          "Autoscaling behaviour and capacity planning",
          "Troubleshooting latency and resource contention",
          "Cost efficiency of running services",
        ],
      },
    ],
    roadmap: [
      {
        title: "SRE principles",
        summary:
          "Start here, not with products. SLIs, SLOs, error budgets, toil and the philosophy of alerting on symptoms.",
        learn: ["cloud-monitoring"],
      },
      {
        title: "Organisation and project bootstrapping",
        summary:
          "Resource hierarchy, automation identities and repeatable environment provisioning.",
        learn: ["iam", "cloud-fundamentals"],
      },
      {
        title: "CI/CD pipeline design",
        summary:
          "The heaviest scored domain. Source to build to test to artefact to deploy, with quality gates at each step.",
        learn: ["cloud-build-and-cicd"],
      },
      {
        title: "Deployment strategies",
        summary:
          "Rolling, blue/green and canary — how each behaves under failure and how you roll back from it.",
        learn: ["cloud-run", "google-kubernetes-engine"],
      },
      {
        title: "Kubernetes operations",
        summary:
          "Workload management, autoscaling, resource requests and limits, and debugging a failing deployment.",
        learn: ["google-kubernetes-engine"],
      },
      {
        title: "Observability in depth",
        summary:
          "Metrics, structured logs, traces and profiles. Log-based metrics and alert design are reliably tested.",
        learn: ["cloud-monitoring"],
      },
      {
        title: "Incident response",
        summary:
          "Roles during an incident, communication, and what a blameless post-mortem actually contains.",
        learn: ["cloud-monitoring"],
      },
      {
        title: "Practice questions and mock exams",
        summary:
          "Pay particular attention to questions where the technically impressive answer is the wrong one.",
        learn: [],
      },
    ],
    careers: [
      {
        role: "DevOps Engineer",
        summary: "Own the delivery pipeline and the platform teams deploy onto.",
      },
      {
        role: "Site Reliability Engineer",
        summary:
          "The closest certification to SRE practice in the programme.",
      },
      {
        role: "Platform Engineer",
        summary: "Build internal platforms and the paved road to production.",
      },
      {
        role: "Release Engineer",
        summary: "Own build, artefact and release management at scale.",
      },
    ],
    faqs: [
      {
        q: "Do I need to read Google's SRE books?",
        a: "You do not need to read them cover to cover, but you should be fluent in the core chapters on SLOs, error budgets, toil, monitoring and post-mortems. The exam uses that vocabulary precisely and expects you to reason within it.",
      },
      {
        q: "How much Kubernetes is on this exam?",
        a: "A significant amount, from an operations angle: autoscaling, resource management, rollouts and debugging. Cluster architecture depth matters less than being able to run workloads reliably.",
      },
      {
        q: "Is it easier than Professional Cloud Architect?",
        a: "It is narrower, which most people find easier. But the SRE-culture questions are genuinely difficult for engineers who have not worked in an SLO-driven environment, because the correct answer is often organisational rather than technical.",
      },
      {
        q: "Which other certification pairs well with this one?",
        a: "Associate Cloud Engineer beforehand for platform fluency, and Professional Cloud Architect afterwards if you are heading towards technical leadership.",
      },
    ],
    questionTopics: ["devops", "kubernetes", "monitoring", "compute", "iam", "networking"],
    relatedCerts: [
      "associate-cloud-engineer",
      "professional-cloud-developer",
      "professional-cloud-architect",
    ],
    relatedGuides: [
      "how-to-prepare-for-cloud-certification",
      "cloud-certification-study-plan",
    ],
    relatedLearn: [
      "cloud-build-and-cicd",
      "cloud-monitoring",
      "google-kubernetes-engine",
    ],
  },

  {
    slug: "professional-cloud-security-engineer",
    name: "Professional Cloud Security Engineer",
    shortName: "Cloud Security Engineer",
    level: "professional",
    tracks: ["security", "architect", "cloud-engineer"],
    tagline: "Identity, boundaries, data protection and compliance.",
    description:
      "Professional Cloud Security Engineer covers designing and implementing secure infrastructure on Google Cloud: access control, network boundary protection, data protection, security operations and regulatory compliance. It is the deepest identity-focused exam in the programme.",
    difficulty: 4,
    prepWeeks: [8, 14],
    facts: professionalFacts(
      `${OFFICIAL}/cloud-security-engineer`,
      "Google recommends 3+ years of industry experience, including 1+ year designing and managing solutions on Google Cloud.",
    ),
    skills: [
      "Identity and access management design at organisation scale",
      "Organisation policy and preventative guardrails",
      "Network boundary protection and service perimeters",
      "Encryption, key management and customer-managed keys",
      "Data classification, loss prevention and residency",
      "Security monitoring, threat detection and incident response",
      "Mapping controls to compliance frameworks",
    ],
    audience: [
      "Cloud security engineers and analysts",
      "Infrastructure engineers moving into security",
      "Architects with security ownership",
      "Compliance and governance specialists working with cloud teams",
    ],
    overview: [
      "This exam goes deeper on identity than any other. Not just roles and bindings, but conditional access, workload identity federation, service account impersonation, delegation and the specific risks each one carries.",
      "Organisation policy is the second pillar and the one people most often underestimate. The exam distinguishes carefully between preventative controls that stop something happening and detective controls that tell you it happened — and asks which is appropriate.",
      "Encryption and key management are examined with precision: default encryption, customer-managed keys, customer-supplied keys, key rotation, and the operational consequences of each choice.",
      "Compliance appears as scenarios rather than trivia. You will not be asked to recite a regulation, but you will be asked which control satisfies a stated requirement such as data residency or separation of duties.",
    ],
    examTopics: [
      {
        title: "Configuring access",
        weight: "~27%",
        points: [
          "Designing IAM across an organisation, including custom roles",
          "Service accounts, impersonation, key management and workload identity",
          "Conditional access and context-aware policy",
          "Federating external identities and single sign-on",
          "Separation of duties and privileged access review",
        ],
      },
      {
        title: "Securing communications and establishing boundary protection",
        weight: "~21%",
        points: [
          "VPC design, firewall policy and hierarchical firewall rules",
          "Service perimeters and controlling data exfiltration paths",
          "Private connectivity to managed services",
          "Protecting public endpoints against common web attacks",
          "TLS, certificate management and secure hybrid connectivity",
        ],
      },
      {
        title: "Ensuring data protection",
        weight: "~20%",
        points: [
          "Default encryption, customer-managed and customer-supplied keys",
          "Key rotation, destruction and separation of key administration",
          "Discovering and classifying sensitive data",
          "De-identification, masking and tokenisation",
          "Secret management and credential hygiene",
        ],
      },
      {
        title: "Managing operations",
        weight: "~18%",
        points: [
          "Centralised security posture monitoring and findings triage",
          "Audit logging: admin activity, data access and access transparency",
          "Vulnerability management and image hardening",
          "Incident detection, investigation and response",
        ],
      },
      {
        title: "Supporting compliance requirements",
        weight: "~14%",
        points: [
          "Mapping technical controls to regulatory requirements",
          "Data residency and sovereignty controls",
          "Evidence collection and continuous compliance monitoring",
          "Shared responsibility boundaries in a compliance context",
        ],
      },
    ],
    roadmap: [
      {
        title: "IAM in depth",
        summary:
          "Far beyond the Associate level. Policy structure, inheritance, conditions, custom roles and impersonation chains.",
        learn: ["iam"],
      },
      {
        title: "Resource hierarchy and organisation policy",
        summary:
          "Preventative guardrails: what organisation policy constraints can and cannot stop, and where to apply them.",
        learn: ["iam", "cloud-fundamentals"],
      },
      {
        title: "Network security",
        summary:
          "Firewall policy, hierarchical rules, private access to services and service perimeters against exfiltration.",
        learn: ["vpc", "load-balancing"],
      },
      {
        title: "Encryption and key management",
        summary:
          "Default encryption, CMEK, CSEK, rotation and the operational trade-offs of managing your own keys.",
        learn: ["cloud-kms"],
      },
      {
        title: "Data protection and classification",
        summary:
          "Discovering sensitive data, de-identification techniques and choosing between masking and tokenisation.",
        learn: ["cloud-kms", "bigquery"],
      },
      {
        title: "Security operations",
        summary:
          "Posture management, findings triage, audit log types and what each one actually records.",
        learn: ["security-command-center", "cloud-monitoring"],
      },
      {
        title: "Compliance mapping",
        summary:
          "Translating a stated regulatory requirement into a specific technical control.",
        learn: ["security-command-center"],
      },
      {
        title: "Practice questions and mock exams",
        summary:
          "Concentrate on IAM and boundary-protection questions; between them they carry close to half the exam.",
        learn: [],
      },
    ],
    careers: [
      {
        role: "Cloud Security Engineer",
        summary: "Design and operate the security controls for a cloud estate.",
      },
      {
        role: "Security Architect",
        summary: "Set security direction and standards across an organisation.",
      },
      {
        role: "Compliance / GRC Engineer",
        summary:
          "Translate regulatory obligations into enforceable technical controls.",
      },
      {
        role: "Cloud Infrastructure Engineer (security-focused)",
        summary:
          "Build and maintain hardened landing zones and platform guardrails.",
      },
    ],
    faqs: [
      {
        q: "Do I need a security background?",
        a: "It helps considerably but is not essential. Strong infrastructure engineers pass this regularly. What you cannot skip is IAM depth — this exam expects far more than the Associate level.",
      },
      {
        q: "How does it compare to vendor-neutral security certifications?",
        a: "It is narrower and more implementation-focused. Broad security certifications test principles across the field; this one tests how those principles are implemented on one platform. They complement each other well.",
      },
      {
        q: "Is Associate Cloud Engineer a good prerequisite?",
        a: "Yes. It gives you the IAM, networking and resource hierarchy foundation this exam builds on, and it makes the step up much less steep.",
      },
      {
        q: "How much of it is compliance trivia?",
        a: "Very little. Compliance appears as scenarios — a requirement is stated and you choose the control that satisfies it. You are not asked to recite regulations.",
      },
    ],
    questionTopics: ["security", "iam", "networking", "monitoring", "storage"],
    relatedCerts: [
      "professional-cloud-architect",
      "security-operations-engineer",
      "professional-cloud-network-engineer",
    ],
    relatedGuides: [
      "certification-career-guide",
      "google-cloud-certification-roadmap",
    ],
    relatedLearn: ["iam", "cloud-kms", "security-command-center", "vpc"],
  },

  {
    slug: "professional-cloud-network-engineer",
    name: "Professional Cloud Network Engineer",
    shortName: "Cloud Network Engineer",
    level: "professional",
    tracks: ["security", "cloud-engineer", "architect"],
    tagline: "The deepest networking exam. Specialist, and valued for it.",
    description:
      "Professional Cloud Network Engineer covers designing, implementing and managing network architectures on Google Cloud: VPC design, hybrid connectivity, network services and operational troubleshooting. It is the most specialised of the mainstream Professional exams.",
    difficulty: 5,
    prepWeeks: [10, 16],
    facts: professionalFacts(
      `${OFFICIAL}/cloud-network-engineer`,
      "Google recommends 3+ years of industry experience, including 1+ year managing solutions on Google Cloud.",
    ),
    skills: [
      "VPC design, IP address planning and subnet strategy",
      "Shared VPC, VPC peering and multi-project network topologies",
      "Hybrid connectivity: dedicated and partner interconnect, VPN and routing",
      "Load balancing across every tier and protocol",
      "DNS design for internal and external resolution",
      "Network security controls and boundary design",
      "Diagnosing connectivity and performance problems methodically",
    ],
    audience: [
      "Network engineers moving into cloud",
      "Cloud engineers specialising in connectivity",
      "Architects designing hybrid or multi-region estates",
      "Anyone responsible for connecting a data centre to the cloud",
    ],
    overview: [
      "This is a genuine specialist exam and the depth catches people out. Everything from the Associate exam is assumed at a level of precision that is several steps beyond it.",
      "Load balancing is the largest single topic. You need the full decision tree — global versus regional, external versus internal, application versus network, proxy versus pass-through — and the ability to pick correctly from a scenario in seconds.",
      "Hybrid connectivity is the second pillar. Interconnect options, VPN topologies, dynamic routing and route priority all appear regularly, and the questions are unforgiving about details.",
      "IP address planning is quietly important. Overlapping ranges, subnet expansion and the constraints of peering appear often enough that a shaky grasp of CIDR arithmetic will hurt.",
      "If you have a traditional networking background this may be the most approachable Professional exam. If you do not, it is likely the hardest.",
    ],
    examTopics: [
      {
        title: "Designing, planning and prototyping a Google Cloud network",
        weight: "~26%",
        points: [
          "VPC design for scale, isolation and future growth",
          "IP address planning, CIDR allocation and subnet expansion",
          "Choosing between shared VPC, peering and separate networks",
          "Designing hybrid connectivity to on-premises environments",
          "Load balancing and DNS strategy for an application estate",
          "Designing for security, compliance and defined SLAs",
        ],
      },
      {
        title: "Implementing Virtual Private Cloud instances",
        weight: "~21%",
        points: [
          "Creating VPCs, subnets, routes and firewall rules",
          "Configuring shared VPC and VPC network peering",
          "Private access to managed services and private endpoints",
          "Firewall rule priority, logging and hierarchical policy",
        ],
      },
      {
        title: "Configuring network services",
        weight: "~23%",
        points: [
          "Selecting and configuring the correct load balancer for a workload",
          "Health checks, backend services and traffic distribution",
          "Content delivery and edge caching behaviour",
          "DNS zones, records, forwarding and split-horizon resolution",
          "Network address translation for outbound connectivity",
        ],
      },
      {
        title: "Implementing hybrid interconnectivity",
        weight: "~14%",
        points: [
          "Dedicated and partner interconnect and when each applies",
          "VPN topologies, redundancy and failover",
          "Dynamic routing, route advertisement and priority",
          "Bandwidth, latency and availability planning",
        ],
      },
      {
        title: "Managing, monitoring and optimising network operations",
        weight: "~16%",
        points: [
          "Logging and flow analysis for troubleshooting",
          "Connectivity testing and systematic fault isolation",
          "Monitoring latency, throughput and packet loss",
          "Optimising cost, especially egress and interconnect charges",
        ],
      },
    ],
    roadmap: [
      {
        title: "Networking fundamentals refresher",
        summary:
          "CIDR arithmetic, routing, NAT, DNS and TLS. If any of this is rusty, fix it before touching cloud-specific material.",
        learn: ["vpc"],
      },
      {
        title: "VPC design",
        summary:
          "Subnets, routes, firewall rules and rule priority. Then shared VPC and peering, including their limitations.",
        learn: ["vpc"],
      },
      {
        title: "Load balancing decision tree",
        summary:
          "The single highest-value topic. Learn to pick the right load balancer from a scenario in under ten seconds.",
        learn: ["load-balancing"],
      },
      {
        title: "DNS design",
        summary:
          "Public and private zones, forwarding, peering and split-horizon resolution.",
        learn: ["cloud-dns"],
      },
      {
        title: "Edge and content delivery",
        summary:
          "Caching behaviour, cache keys, invalidation and where the edge sits relative to your load balancer.",
        learn: ["cloud-cdn"],
      },
      {
        title: "Hybrid connectivity",
        summary:
          "Interconnect options, VPN topologies, dynamic routing and designing for redundancy.",
        learn: ["vpc"],
      },
      {
        title: "Network security",
        summary:
          "Hierarchical firewall policy, service perimeters and private access paths to managed services.",
        learn: ["vpc", "iam"],
      },
      {
        title: "Troubleshooting and observability",
        summary:
          "Flow logs, connectivity tests and a repeatable method for isolating where traffic actually stops.",
        learn: ["cloud-monitoring", "vpc"],
      },
      {
        title: "Practice questions and mock exams",
        summary:
          "Drill load balancer selection and firewall evaluation until both are automatic.",
        learn: [],
      },
    ],
    careers: [
      {
        role: "Cloud Network Engineer",
        summary:
          "Design and operate cloud networks. A scarce skill set with correspondingly strong demand.",
      },
      {
        role: "Network Architect",
        summary: "Own connectivity design across hybrid and multi-region estates.",
      },
      {
        role: "Infrastructure Engineer",
        summary:
          "Networking depth is a strong differentiator in general infrastructure roles.",
      },
    ],
    faqs: [
      {
        q: "Is this the hardest Google Cloud exam?",
        a: "Along with Professional Cloud Architect, it is in the top tier — but for a different reason. Architect is hard because of breadth and judgement; this is hard because of depth and precision. Traditional network engineers often find this one more approachable.",
      },
      {
        q: "Do I need on-premises networking experience?",
        a: "Not strictly, but the hybrid connectivity domain assumes you understand routing, BGP concepts and enterprise WAN thinking. Without that background, budget extra time for those topics specifically.",
      },
      {
        q: "How important is load balancing?",
        a: "It is the highest-yield topic on the exam. Being able to eliminate three of four options instantly, based on global versus regional and proxy versus pass-through, is worth more than any other single piece of preparation.",
      },
      {
        q: "Is it worth it if I am not a network specialist?",
        a: "Only if your role genuinely involves connectivity design. It is a deep specialist credential; for general cloud roles, Professional Cloud Architect gives broader value for the same effort.",
      },
    ],
    questionTopics: ["networking", "security", "iam", "compute", "monitoring"],
    relatedCerts: [
      "professional-cloud-architect",
      "professional-cloud-security-engineer",
      "associate-cloud-engineer",
    ],
    relatedGuides: ["google-cloud-certification-roadmap", "certification-career-guide"],
    relatedLearn: ["vpc", "load-balancing", "cloud-dns", "cloud-cdn"],
  },

  {
    slug: "professional-machine-learning-engineer",
    name: "Professional Machine Learning Engineer",
    shortName: "ML Engineer",
    level: "professional",
    tracks: ["ai-ml", "data"],
    tagline: "Production machine learning: pipelines, serving and monitoring.",
    description:
      "Professional Machine Learning Engineer covers designing, building and productionising machine learning models on Google Cloud. It is far more about MLOps than about model theory — the exam cares whether your model survives contact with production.",
    difficulty: 5,
    prepWeeks: [10, 16],
    facts: professionalFacts(
      `${OFFICIAL}/machine-learning-engineer`,
      "Google recommends 3+ years of industry experience, including 1+ year designing and managing ML solutions on Google Cloud.",
    ),
    skills: [
      "Framing a business problem as a machine learning problem",
      "Choosing between low-code, pre-trained and custom model approaches",
      "Data preparation, feature engineering and feature stores",
      "Training at scale, distributed training and hyperparameter tuning",
      "Serving models: online, batch, and edge deployment",
      "ML pipelines, orchestration and continuous training",
      "Monitoring for drift, skew and degradation in production",
      "Responsible AI, explainability and fairness",
    ],
    audience: [
      "Machine learning engineers productionising models",
      "Data scientists moving towards deployment and operations",
      "Data engineers taking on ML platform work",
      "Software engineers specialising in AI systems",
    ],
    overview: [
      "The most common misconception about this exam is that it is a data science exam. It is not. It is an operations exam that happens to be about models.",
      "Expect the balance of questions to sit in pipelines, serving, monitoring and automation rather than algorithm selection. Training–serving skew, feature stores, drift detection and continuous training carry real weight.",
      "You do need enough modelling fluency to reason about evaluation metrics, class imbalance, overfitting and when a simpler approach is the correct answer. But you will not be asked to derive anything.",
      "Generative AI has grown into a meaningful portion of the exam. Prompt design, grounding, tuning approaches and evaluating generative output now appear alongside classical ML.",
      "The other recurring theme is knowing when not to build. A pre-trained API that meets the requirement usually beats a custom model, and the exam rewards recognising that.",
    ],
    examTopics: [
      {
        title: "Architecting low-code AI solutions",
        weight: "~13%",
        points: [
          "Using pre-trained APIs and low-code tooling to meet a requirement",
          "In-warehouse machine learning for tabular problems",
          "Deciding when a managed solution is sufficient",
        ],
      },
      {
        title: "Collaborating within and across teams to manage data and models",
        weight: "~14%",
        points: [
          "Exploring and preparing data for modelling",
          "Feature engineering and managing features consistently",
          "Model and dataset versioning, metadata and lineage",
          "Working with data engineering and application teams",
        ],
      },
      {
        title: "Scaling prototypes into ML models",
        weight: "~18%",
        points: [
          "Moving from notebook experiments to reproducible training",
          "Distributed training and hardware accelerator selection",
          "Hyperparameter tuning strategies",
          "Evaluation metrics appropriate to the problem",
        ],
      },
      {
        title: "Serving and scaling models",
        weight: "~20%",
        points: [
          "Online prediction, batch prediction and edge deployment",
          "Latency, throughput and cost trade-offs in serving",
          "Traffic splitting and safe model rollout",
          "Scaling endpoints and managing capacity",
        ],
      },
      {
        title: "Automating and orchestrating ML pipelines",
        weight: "~22%",
        points: [
          "Designing end-to-end training and deployment pipelines",
          "Continuous training triggers and retraining strategy",
          "CI/CD applied to machine learning artefacts",
          "Pipeline components, reuse and parameterisation",
        ],
      },
      {
        title: "Monitoring AI solutions",
        weight: "~13%",
        points: [
          "Detecting data drift, concept drift and training–serving skew",
          "Monitoring prediction quality and business metrics together",
          "Explainability and debugging model behaviour",
          "Responsible AI, fairness and bias assessment",
        ],
      },
    ],
    roadmap: [
      {
        title: "Machine learning fundamentals",
        summary:
          "Enough theory to reason well: supervised versus unsupervised, over- and underfitting, and metric selection.",
        learn: ["machine-learning-fundamentals"],
      },
      {
        title: "Problem framing",
        summary:
          "Turning a business problem into an ML problem — and recognising when it should not be one.",
        learn: ["machine-learning-fundamentals"],
      },
      {
        title: "Data preparation and features",
        summary:
          "Feature engineering, feature stores and keeping training and serving features consistent.",
        learn: ["bigquery", "dataflow", "vertex-ai"],
      },
      {
        title: "Training at scale",
        summary:
          "Custom training, distributed strategies, accelerator choice and hyperparameter tuning.",
        learn: ["vertex-ai"],
      },
      {
        title: "Serving models",
        summary:
          "Online versus batch, latency and cost trade-offs, and rolling out a new model version safely.",
        learn: ["vertex-ai", "cloud-run"],
      },
      {
        title: "ML pipelines and automation",
        summary:
          "The heaviest domain. Orchestration, continuous training, and CI/CD applied to models.",
        learn: ["vertex-ai", "cloud-build-and-cicd"],
      },
      {
        title: "Generative AI",
        summary:
          "Prompting, grounding, retrieval augmentation, tuning approaches and evaluating generative output.",
        learn: ["generative-ai", "vertex-ai"],
      },
      {
        title: "Monitoring and responsible AI",
        summary:
          "Drift, skew, explainability, fairness and the operational response when a model degrades.",
        learn: ["cloud-monitoring", "vertex-ai"],
      },
      {
        title: "Practice questions and mock exams",
        summary:
          "Prioritise pipeline, serving and monitoring questions — together they dominate the exam.",
        learn: [],
      },
    ],
    careers: [
      {
        role: "Machine Learning Engineer",
        summary: "Build and operate production ML systems end to end.",
      },
      {
        role: "MLOps Engineer",
        summary:
          "Own the platform, pipelines and monitoring that ML teams depend on.",
      },
      {
        role: "AI Engineer",
        summary:
          "Build applications on top of foundation models, with grounding and evaluation.",
      },
      {
        role: "Data Scientist (production-focused)",
        summary:
          "Bridge the gap between experiments and systems that actually run.",
      },
    ],
    faqs: [
      {
        q: "Do I need a data science background?",
        a: "You need working ML literacy — metrics, overfitting, class imbalance, feature engineering — but not research depth. Software and data engineers pass this regularly. Pure data scientists sometimes struggle with the operations and pipeline material, which is the larger part.",
      },
      {
        q: "How much mathematics is involved?",
        a: "Very little. You should understand what an evaluation metric means and when precision matters more than recall, but you will not be asked to derive anything.",
      },
      {
        q: "Should I take Professional Data Engineer first?",
        a: "It is a strong pairing. Most production ML problems are data problems, and the pipeline and storage knowledge transfers directly. If you have to choose one, pick the one closer to your actual role.",
      },
      {
        q: "How much generative AI is on the exam?",
        a: "A meaningful and growing portion. Grounding, retrieval augmentation, tuning approaches and evaluation of generative output are all fair game alongside classical ML.",
      },
    ],
    questionTopics: ["ai-ml", "data", "devops", "monitoring", "compute"],
    relatedCerts: [
      "professional-data-engineer",
      "generative-ai-leader",
      "professional-cloud-architect",
    ],
    relatedGuides: ["google-cloud-certification-roadmap", "certification-career-guide"],
    relatedLearn: [
      "vertex-ai",
      "generative-ai",
      "machine-learning-fundamentals",
      "bigquery",
    ],
  },

  {
    slug: "professional-cloud-database-engineer",
    name: "Professional Cloud Database Engineer",
    shortName: "Cloud Database Engineer",
    level: "professional",
    tracks: ["data", "architect", "cloud-engineer"],
    tagline: "Database design, migration and operations at production scale.",
    description:
      "Professional Cloud Database Engineer covers designing scalable and highly available database solutions, managing estates that span several database technologies, migrating existing databases to the cloud, and operating them reliably.",
    difficulty: 4,
    prepWeeks: [8, 14],
    facts: professionalFacts(
      `${OFFICIAL}/cloud-database-engineer`,
      "Google recommends 3+ years of industry experience, including 1+ year managing database solutions on Google Cloud.",
    ),
    skills: [
      "Selecting a database technology from workload characteristics",
      "Designing for high availability, durability and defined recovery targets",
      "Migrating databases with minimal downtime",
      "Schema and index design for managed database services",
      "Backup, restore and point-in-time recovery strategy",
      "Performance tuning, connection management and scaling",
      "Database security, encryption and access control",
    ],
    audience: [
      "Database administrators moving to managed cloud services",
      "Data engineers who own operational stores as well as pipelines",
      "Infrastructure engineers responsible for database platforms",
      "Architects designing data-heavy systems",
    ],
    overview: [
      "This is the natural exam for anyone whose background is database administration. Much of the conceptual material — replication, recovery objectives, index design, connection pooling — transfers directly; what changes is which knobs still exist under a managed service.",
      "Selection questions dominate. Relational, document, wide-column, in-memory and globally distributed stores each have a scenario where they are correct, and the exam is precise about which constraints decide it.",
      "Migration is the second heavy area: assessment, replication-based cutover, minimising downtime, and validating that the migration actually succeeded.",
      "There is meaningful overlap with Professional Data Engineer, but the emphasis differs. Data Engineer is pipelines and analytics; this exam is operational stores and the discipline of running them.",
    ],
    examTopics: [
      {
        title: "Designing scalable and highly available cloud database solutions",
        points: [
          "Choosing a database from consistency, scale and access-pattern requirements",
          "Designing for high availability across zones and regions",
          "Meeting defined recovery time and recovery point objectives",
          "Schema, index and partitioning design for managed services",
          "Capacity planning and scaling strategy",
        ],
      },
      {
        title: "Managing a solution that can span multiple database solutions",
        points: [
          "Operating a mixed estate of relational and non-relational stores",
          "Connection management, pooling and proxy patterns",
          "Monitoring database health, slow queries and resource pressure",
          "Patching, maintenance windows and version upgrades",
          "Access control, encryption and auditing for databases",
        ],
      },
      {
        title: "Migrating data solutions",
        points: [
          "Assessing an existing estate and planning a migration",
          "Homogeneous and heterogeneous migration approaches",
          "Continuous replication and minimal-downtime cutover",
          "Validating data integrity after migration",
          "Rollback planning when a cutover fails",
        ],
      },
      {
        title: "Deploying scalable and highly available databases in Google Cloud",
        points: [
          "Provisioning managed instances with appropriate configuration",
          "Read replicas, failover behaviour and promotion",
          "Backup configuration and point-in-time recovery",
          "Performance tuning and cost optimisation",
        ],
      },
    ],
    roadmap: [
      {
        title: "Database selection framework",
        summary:
          "Build a decision tree keyed on consistency, scale, query pattern and latency. The most reusable thing you will take from this exam.",
        learn: ["cloud-sql", "spanner", "firestore", "bigtable"],
      },
      {
        title: "Relational databases",
        summary:
          "Cloud SQL configuration, high availability, read replicas, connection management and maintenance.",
        learn: ["cloud-sql"],
      },
      {
        title: "Globally distributed relational",
        summary:
          "Spanner's model, schema design to avoid hotspots, and the cost of strong global consistency.",
        learn: ["spanner"],
      },
      {
        title: "Non-relational stores",
        summary:
          "Firestore's document model and Bigtable's wide-column model, including row key design.",
        learn: ["firestore", "bigtable"],
      },
      {
        title: "High availability and disaster recovery",
        summary:
          "Replication topologies, failover behaviour, backup strategy and designing to an explicit RTO and RPO.",
        learn: ["cloud-sql", "spanner"],
      },
      {
        title: "Migration",
        summary:
          "Assessment, replication-based approaches, cutover planning, validation and rollback.",
        learn: ["cloud-sql", "dataflow"],
      },
      {
        title: "Performance and cost tuning",
        summary:
          "Indexes, query plans, connection pooling, instance sizing and where database cost actually accumulates.",
        learn: ["cloud-sql", "bigtable"],
      },
      {
        title: "Database security",
        summary:
          "IAM for databases, private connectivity, encryption with customer-managed keys and auditing.",
        learn: ["iam", "cloud-kms"],
      },
      {
        title: "Practice questions and mock exams",
        summary:
          "Concentrate on selection and migration scenarios — between them they carry most of the exam.",
        learn: [],
      },
    ],
    careers: [
      {
        role: "Cloud Database Engineer",
        summary: "Own the database estate on a managed cloud platform.",
      },
      {
        role: "Database Administrator (cloud)",
        summary:
          "The natural modernisation path for a traditional DBA career.",
      },
      {
        role: "Data Platform Engineer",
        summary: "Operate the stores that applications and analytics depend on.",
      },
    ],
    faqs: [
      {
        q: "How does this differ from Professional Data Engineer?",
        a: "Data Engineer is about pipelines, warehousing and analytics. This exam is about operational databases — availability, migration, tuning and day-to-day operations. There is overlap in storage selection, but the emphasis is genuinely different.",
      },
      {
        q: "Is it useful if I am not a DBA?",
        a: "It is useful if you own databases in production, whatever your job title. If you only consume them through an ORM, Professional Cloud Developer or Data Engineer will give you more.",
      },
      {
        q: "Does my existing SQL Server or Oracle experience transfer?",
        a: "A great deal of it. Replication, recovery objectives, index design and query tuning are all transferable. The work is learning which of those controls a managed service still exposes and which it takes over.",
      },
      {
        q: "Which topic carries the most weight?",
        a: "Database selection. Scenario questions offering four workable stores and one set of constraints appear throughout, and getting these right reliably lifts your score more than any other single area.",
      },
    ],
    questionTopics: ["databases", "storage", "data", "iam", "monitoring"],
    relatedCerts: [
      "professional-data-engineer",
      "professional-cloud-architect",
      "associate-cloud-engineer",
    ],
    relatedGuides: ["google-cloud-certification-roadmap", "certification-career-guide"],
    relatedLearn: ["cloud-sql", "spanner", "bigtable", "firestore"],
  },

  {
    slug: "security-operations-engineer",
    name: "Security Operations Engineer",
    shortName: "Security Operations Engineer",
    level: "professional",
    tracks: ["security", "devops"],
    tagline: "Detection engineering, investigation and response at scale.",
    description:
      "Security Operations Engineer focuses on running a modern security operations capability: ingesting and normalising telemetry, engineering detections, hunting threats, investigating incidents and automating response. It is the operations counterpart to the Cloud Security Engineer exam.",
    difficulty: 4,
    prepWeeks: [8, 14],
    facts: professionalFacts(
      `${OFFICIAL}`,
      "Google positions this exam for experienced security operations practitioners. Confirm the current recommended experience on the official certification page.",
    ),
    skills: [
      "Ingesting, parsing and normalising security telemetry",
      "Writing and tuning detection rules",
      "Threat hunting across large volumes of log data",
      "Incident investigation, scoping and timeline reconstruction",
      "Automating response with playbooks and orchestration",
      "Threat intelligence enrichment and contextualisation",
      "Measuring and improving detection coverage",
    ],
    audience: [
      "Security operations centre analysts and engineers",
      "Detection engineers and threat hunters",
      "Incident responders working in cloud environments",
      "Security engineers moving from prevention into detection and response",
    ],
    overview: [
      "This exam sits at the operational end of security. Where Professional Cloud Security Engineer asks how you prevent something, this one asks how you notice it and what you do next.",
      "Detection engineering is the core discipline. Writing a rule is the easy part; the exam is more interested in whether you can tune it, reason about false positive rates, and understand the coverage gap that remains.",
      "Data handling carries real weight. Parsing, normalisation and enrichment determine whether detections work at all, and questions frequently trace a failure back to a data problem rather than a rule problem.",
      "Expect response automation to appear throughout: playbooks, orchestration, and the judgement of what should be automatic versus what needs a human decision.",
      "Because this is a newer certification, verify the current exam guide on the official page before planning your study — the scope is more likely to move than for the long-established exams.",
    ],
    examTopics: [
      {
        title: "Data ingestion and normalisation",
        points: [
          "Onboarding log sources from cloud, endpoint and network telemetry",
          "Parsing, normalising and mapping data to a common schema",
          "Validating data quality and diagnosing missing telemetry",
          "Retention, cost and searchability trade-offs",
        ],
      },
      {
        title: "Detection engineering",
        points: [
          "Writing detection rules against normalised telemetry",
          "Tuning to reduce false positives without losing coverage",
          "Mapping detections to recognised adversary technique frameworks",
          "Testing detections and measuring coverage gaps",
          "Managing detection content as code",
        ],
      },
      {
        title: "Threat hunting and investigation",
        points: [
          "Forming and testing a hypothesis against historical data",
          "Pivoting across entities to scope an incident",
          "Reconstructing a timeline from multiple telemetry sources",
          "Enriching findings with threat intelligence",
        ],
      },
      {
        title: "Response and automation",
        points: [
          "Designing playbooks for common incident types",
          "Deciding what to automate and what requires human judgement",
          "Containment actions and their operational blast radius",
          "Case management, handover and reporting",
        ],
      },
      {
        title: "Platform operations",
        points: [
          "Access control and separation of duties for the SOC platform",
          "Monitoring platform health and ingestion pipelines",
          "Measuring operational effectiveness, including detection and response times",
          "Continuous improvement after incidents",
        ],
      },
    ],
    roadmap: [
      {
        title: "Security operations fundamentals",
        summary:
          "The SOC operating model, alert triage flow, severity classification and the metrics that matter.",
        learn: ["security-command-center"],
      },
      {
        title: "Telemetry and data pipelines",
        summary:
          "What each log source actually tells you, and why normalisation determines whether detection works.",
        learn: ["cloud-monitoring", "security-command-center"],
      },
      {
        title: "Cloud audit logging",
        summary:
          "Admin activity, data access and system event logs — what each records and what it does not.",
        learn: ["iam", "cloud-monitoring"],
      },
      {
        title: "Detection engineering",
        summary:
          "The core skill. Rule logic, tuning, technique-framework mapping and managing detections as code.",
        learn: ["security-command-center"],
      },
      {
        title: "Threat hunting",
        summary:
          "Hypothesis-driven investigation, entity pivoting and reconstructing what happened from partial evidence.",
        learn: ["security-command-center", "bigquery"],
      },
      {
        title: "Incident response",
        summary:
          "Scoping, containment, eradication, recovery, and the operational cost of each containment option.",
        learn: ["security-command-center"],
      },
      {
        title: "Automation and orchestration",
        summary:
          "Playbook design, integration patterns, and drawing the line between automatic and human-approved action.",
        learn: ["cloud-build-and-cicd", "pub-sub"],
      },
      {
        title: "Practice questions and mock exams",
        summary:
          "Focus on detection tuning and investigation scenarios rather than product configuration trivia.",
        learn: [],
      },
    ],
    careers: [
      {
        role: "Security Operations Engineer",
        summary: "Build and run the detection and response capability.",
      },
      {
        role: "Detection Engineer",
        summary:
          "A specialised and increasingly well-paid role focused on detection content.",
      },
      {
        role: "Threat Hunter",
        summary: "Proactively search for activity that existing detections miss.",
      },
      {
        role: "Incident Responder",
        summary: "Lead investigation and containment when something does happen.",
      },
    ],
    faqs: [
      {
        q: "How does this differ from Professional Cloud Security Engineer?",
        a: "Cloud Security Engineer is about building controls that prevent problems — identity, boundaries, encryption. This exam is about what happens after: noticing activity, investigating it, and responding. Prevention versus detection and response.",
      },
      {
        q: "Do I need SOC experience?",
        a: "It helps a great deal. The exam assumes familiarity with the operational rhythm of a security operations team — triage, escalation, containment decisions — which is hard to acquire from reading alone.",
      },
      {
        q: "Is it worth taking without a security background?",
        a: "Probably not as a first security certification. Build general security fundamentals first, then either this or Cloud Security Engineer depending on whether your interest is detection or prevention.",
      },
      {
        q: "How stable is the exam content?",
        a: "Less stable than the long-established exams, because it is newer. Check the official exam guide before you build a study plan around any published summary, including ours.",
      },
    ],
    questionTopics: ["security", "monitoring", "iam", "networking", "data"],
    relatedCerts: [
      "professional-cloud-security-engineer",
      "professional-cloud-devops-engineer",
      "professional-cloud-architect",
    ],
    relatedGuides: ["certification-career-guide", "google-cloud-certification-roadmap"],
    relatedLearn: ["security-command-center", "cloud-monitoring", "iam"],
  },
];

/* ---------------------------------------------------------------- */
/* Accessors                                                         */
/* ---------------------------------------------------------------- */

export function getCertification(slug: string) {
  return certifications.find((c) => c.slug === slug);
}

export function getCertifications() {
  return certifications;
}

export function getCertificationsByLevel(level: CertLevel) {
  return certifications.filter((c) => c.level === level);
}

export function certName(slug: string) {
  return getCertification(slug)?.name ?? slug;
}

export const certLevelOrder: CertLevel[] = [
  "foundational",
  "associate",
  "professional",
];

/**
 * Recommend certifications for the homepage Certification Finder.
 * This is GCP Prep's own editorial recommendation, not official guidance.
 */
export function recommendCertifications(
  experience: "beginner" | "intermediate" | "advanced",
  track: CareerTrack,
): Certification[] {
  const onTrack = certifications.filter((c) => c.tracks.includes(track));

  const levelPreference: Record<typeof experience, CertLevel[]> = {
    beginner: ["foundational", "associate", "professional"],
    intermediate: ["associate", "professional", "foundational"],
    advanced: ["professional", "associate", "foundational"],
  };

  const order = levelPreference[experience];
  const ranked = [...onTrack].sort((a, b) => {
    const byLevel = order.indexOf(a.level) - order.indexOf(b.level);
    if (byLevel !== 0) return byLevel;
    return a.difficulty - b.difficulty;
  });

  // Beginners on any track should always be shown a realistic entry point.
  if (experience === "beginner" && !ranked.some((c) => c.level !== "professional")) {
    const ace = getCertification("associate-cloud-engineer");
    if (ace) ranked.unshift(ace);
  }

  return ranked.slice(0, 3);
}
