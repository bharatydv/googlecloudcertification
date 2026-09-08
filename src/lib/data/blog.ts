import type { BlogPost } from "@/types";

export const blogCategories = [
  "Certifications",
  "Cloud",
  "DevOps",
  "Data",
  "AI",
  "Security",
  "Careers",
  "Exam Preparation",
  "Tutorials",
] as const;

/** Original editorial content by the GCP Prep team. */
export const blogPosts: BlogPost[] = [
  {
    slug: "why-people-fail-professional-cloud-architect",
    title: "Why Capable Engineers Fail Professional Cloud Architect",
    seoTitle: "Why Engineers Fail Professional Cloud Architect",
    description:
      "The Architect exam fails people who know the products well. The reason is almost never knowledge — it is how they read the question.",
    category: "Exam Preparation",
    author: "GCP Prep Editorial",
    authorRole: "Certification research team",
    published: "2026-08-12",
    updated: "2026-08-30",
    readingWords: 1000,
    sections: [
      {
        heading: "The pattern",
        body: [
          {
            type: "p",
            text: "A recurring story: an engineer with four years of solid production experience, who can configure anything asked of them, sits Professional Cloud Architect and fails. They then conclude the exam was unfair or full of trick questions.",
          },
          {
            type: "p",
            text: "It usually is not. In our experience reviewing how people prepare, the failure is almost always the same thing — answering the question the products suggest, rather than the question the scenario asked.",
          },
        ],
      },
      {
        heading: "Reason 1: ignoring the stated constraint",
        body: [
          {
            type: "p",
            text: "Architect scenarios are long because the constraints matter. A sentence like 'the operations team consists of two people' is not scene-setting. It is the constraint that eliminates two of the four answers.",
          },
          {
            type: "p",
            text: "Engineers under time pressure skim to the technical question and choose the technically strongest option. If that option requires operating a Kubernetes cluster and the scenario said two operations staff, it is wrong — even though it works.",
          },
          {
            type: "note",
            text: "A practical habit: before looking at the options, write down the constraints in the scenario. Budget, team size, downtime tolerance, compliance, latency, existing systems. Then eliminate options against that list.",
          },
        ],
      },
      {
        heading: "Reason 2: choosing the impressive answer",
        body: [
          {
            type: "p",
            text: "There is a strong pull towards the sophisticated option. Multi-region active-active feels like a better answer than multi-zone. A globally distributed database feels more architectural than a managed relational one.",
          },
          {
            type: "p",
            text: "The exam consistently rewards the simplest option that satisfies the stated requirements. If the scenario asks for recovery within four hours, a design achieving four seconds is not a better answer — it is an answer that costs more than the business asked to spend.",
          },
        ],
      },
      {
        heading: "Reason 3: treating it like the Associate exam",
        body: [
          {
            type: "p",
            text: "Associate Cloud Engineer rewards knowing the command. Professional Cloud Architect rewards knowing which trade-off the business would accept. People who prepared successfully for the first exam often prepare the same way for the second, going deeper on configuration detail that is barely tested.",
          },
          {
            type: "p",
            text: "The material that actually moves your score is organisation design, disaster recovery planning against explicit objectives, migration sequencing and cost modelling — the topics that only make sense at the scale of a whole system.",
          },
        ],
      },
      {
        heading: "Reason 4: not preparing the case studies",
        body: [
          {
            type: "p",
            text: "The case studies are published in advance and a substantial share of questions attach to them. Reading them cold during the exam consumes time you need for the questions themselves.",
          },
          {
            type: "p",
            text: "Prepare them properly: for each fictional company, write down their business goals, technical constraints, existing systems and the executive statements. Then, for each one, note which kinds of answer those constraints would rule out. That preparation converts several minutes of reading per question into a few seconds of recall.",
          },
        ],
      },
      {
        heading: "Reason 5: stamina",
        body: [
          {
            type: "p",
            text: "Two hours of dense scenario reading is genuinely tiring, and accuracy on the last fifteen questions is often noticeably worse than on the first fifteen. People who have only ever done practice questions in twenty-minute blocks discover this during the real exam.",
          },
          {
            type: "p",
            text: "Sit at least two full-length timed mocks under real conditions — no pauses, no notes, no phone. It is as much a test of concentration as of knowledge.",
          },
        ],
      },
      {
        heading: "What to do differently",
        body: [
          {
            type: "ol",
            items: [
              "Read the whole scenario before looking at the options.",
              "List the constraints explicitly before choosing.",
              "Eliminate options that violate a stated constraint, even if they are technically superior.",
              "Prefer the simplest option that meets the requirement.",
              "Prepare the case studies in advance, in writing.",
              "Practise at full length, timed, at least twice.",
            ],
          },
        ],
      },
    ],
    relatedCerts: ["professional-cloud-architect", "associate-cloud-engineer"],
    relatedPosts: [
      "hands-on-practice-beats-video-courses",
      "reading-exam-questions-properly",
      "iam-mistakes-that-appear-on-every-exam",
    ],
  },

  {
    slug: "hands-on-practice-beats-video-courses",
    title: "Hands-On Practice Beats Video Courses (And the Data Is Not Close)",
    seoTitle: "Hands-On Practice Beats Video Courses",
    description:
      "Why watching someone else configure a load balancer produces almost no retention, and what to do with your study time instead.",
    category: "Exam Preparation",
    author: "GCP Prep Editorial",
    authorRole: "Certification research team",
    published: "2026-07-28",
    updated: "2026-08-18",
    readingWords: 850,
    sections: [
      {
        heading: "The comfortable illusion",
        body: [
          {
            type: "p",
            text: "Video courses feel productive. You follow along, everything makes sense, and you finish a module with a strong sense of having learned something. Then you sit a practice question two weeks later and cannot remember which load balancer handles UDP.",
          },
          {
            type: "p",
            text: "This is not a failure of discipline. Watching someone perform a task creates recognition of the explanation, not recall of the procedure. Those feel identical while you are watching and are entirely different a fortnight later.",
          },
        ],
      },
      {
        heading: "What cloud exams actually test",
        body: [
          {
            type: "p",
            text: "Cloud exams are recognition tests. You are shown a command and asked what it does. You are given an outcome and asked which service produces it. You are shown an error and asked what caused it.",
          },
          {
            type: "p",
            text: "That kind of recall is built by having done the thing and, ideally, by having got it wrong once. The engineer who has spent twenty minutes debugging why their instances were unreachable never forgets that ingress is denied by default.",
          },
        ],
      },
      {
        heading: "A better use of study time",
        body: [
          {
            type: "p",
            text: "We would suggest roughly this split for an Associate-level exam:",
          },
          {
            type: "ul",
            items: [
              "**40% building things.** Creating, configuring, breaking and fixing.",
              "**30% reading.** Documentation and structured material, used to answer questions the building raised.",
              "**20% practice questions.** With every explanation read, including for correct answers.",
              "**10% review.** Returning to weak topics deliberately.",
            ],
          },
          {
            type: "note",
            text: "Note what is missing: passively watching video. Video is genuinely useful when a topic is entirely new and you need orientation. It is a poor use of hours four through forty.",
          },
        ],
      },
      {
        heading: "Deliberate breaking",
        body: [
          {
            type: "p",
            text: "The single highest-value study habit we know of is deliberately breaking things you have built. Not because failure is inherently instructive, but because exam scenarios describe failures, and you will recognise the ones you have caused.",
          },
          {
            type: "ul",
            items: [
              "Delete a firewall rule and observe exactly what stops working.",
              "Remove a permission from a service account and read the resulting error carefully.",
              "Point a health check at the wrong port and watch the load balancer take the backend out.",
              "Set a resource request higher than any node can satisfy and see the pod stay Pending.",
              "Overwrite an object in a versioned bucket, then recover the previous version.",
            ],
          },
          {
            type: "p",
            text: "Each of these takes ten minutes and produces a memory that survives months. Each corresponds directly to a question shape that appears on the exams.",
          },
        ],
      },
      {
        heading: "The cost objection",
        body: [
          {
            type: "p",
            text: "People avoid hands-on practice because they worry about the bill. It is a reasonable concern and largely a solvable one. Set a budget alert on day one, use the smallest machine types, and shut things down when you finish a session.",
          },
          {
            type: "p",
            text: "A full Associate-level study plan can usually be completed for a very small amount, and the always-free tier covers a surprising proportion of it. The habit of watching your own spend is itself directly examinable material.",
          },
        ],
      },
    ],
    relatedCerts: ["associate-cloud-engineer"],
    relatedPosts: [
      "why-people-fail-professional-cloud-architect",
      "reading-exam-questions-properly",
    ],
  },

  {
    slug: "reading-exam-questions-properly",
    title: "How to Read a Cloud Exam Question",
    description:
      "Cloud exam questions are written carefully. Learning to read them is a distinct skill worth practising separately from the material.",
    category: "Exam Preparation",
    author: "GCP Prep Editorial",
    authorRole: "Certification research team",
    published: "2026-07-14",
    updated: "2026-08-15",
    readingWords: 900,
    sections: [
      {
        heading: "Several answers usually work",
        body: [
          {
            type: "p",
            text: "The most useful thing to internalise about cloud exams is that they rarely offer one working answer and three broken ones. Typically two or three would function. One is correct given what the question specified.",
          },
          {
            type: "p",
            text: "This means eliminating on 'that would not work' only gets you halfway. The remaining decision is made on the constraints, and the constraints are always stated.",
          },
        ],
      },
      {
        heading: "Signal words that decide the answer",
        body: [
          {
            type: "table",
            head: ["Phrase", "What it means"],
            rows: [
              [
                "Minimum, least, simplest",
                "The most capable option is wrong. Choose the smallest thing that meets the requirement.",
              ],
              [
                "Most cost-effective",
                "Among options that work, choose the cheapest. Do not choose one that fails a stated requirement to save money.",
              ],
              [
                "Least operational overhead",
                "Choose the managed option. This phrase almost always eliminates self-managed answers.",
              ],
              [
                "Must not be possible / must be prevented",
                "A preventative control, not a detective one. Alerts and reports are wrong answers.",
              ],
              [
                "Without downtime / minimal downtime",
                "Eliminates anything requiring a stop-and-restore approach.",
              ],
              [
                "Following Google-recommended practices",
                "Choose the current recommended pattern even if an older approach also works.",
              ],
              [
                "A small team / limited operations staff",
                "Operational burden is a scored constraint. Managed services win.",
              ],
            ],
          },
        ],
      },
      {
        heading: "A method that works under time pressure",
        body: [
          {
            type: "ol",
            items: [
              "Read the last sentence first. It contains the actual question, and it tells you what to look for in the scenario.",
              "Read the scenario, noting constraints as you go.",
              "Before reading the options, decide roughly what the answer should look like.",
              "Read all four options fully. Do not stop at the first one that looks right.",
              "Eliminate anything that violates a stated constraint.",
              "Of what remains, choose the simplest sufficient option.",
            ],
          },
          {
            type: "note",
            text: "Reading the question before the scenario feels backwards and saves real time. You read the scenario looking for something specific rather than trying to absorb all of it.",
          },
        ],
      },
      {
        heading: "Traps that recur",
        body: [
          {
            type: "ul",
            items: [
              "**The technically superior answer.** Correct in isolation, wrong for the stated budget, team or timeline.",
              "**The answer that solves a different problem.** Fixes something real, but not what was asked.",
              "**The partial answer.** Addresses one requirement and silently ignores a second one stated in the scenario.",
              "**The deprecated pattern.** Works, but is no longer the recommended approach. Service account keys versus workload identity is the standard example.",
              "**The detective control when prevention was required.** An alert that tells you something happened, when the requirement was that it must not happen.",
            ],
          },
        ],
      },
      {
        heading: "Practising the skill separately",
        body: [
          {
            type: "p",
            text: "This is worth drilling on its own. Take twenty practice questions and, without answering any of them, write down only the constraints in each scenario and which options each constraint eliminates.",
          },
          {
            type: "p",
            text: "It is an unusual exercise and people find it uncomfortable, because it separates comprehension from knowledge. That separation is exactly the point: many candidates lose marks on questions where they knew the material perfectly well.",
          },
        ],
      },
    ],
    relatedCerts: [
      "professional-cloud-architect",
      "associate-cloud-engineer",
      "professional-data-engineer",
    ],
    relatedPosts: [
      "why-people-fail-professional-cloud-architect",
      "hands-on-practice-beats-video-courses",
      "iam-mistakes-that-appear-on-every-exam",
    ],
  },

  {
    slug: "iam-mistakes-that-appear-on-every-exam",
    title: "Five IAM Mistakes That Appear on Every Google Cloud Exam",
    seoTitle: "Five IAM Mistakes on Every Google Cloud Exam",
    description:
      "IAM is the highest-yield topic in the programme. These five misunderstandings account for a large share of the marks people lose.",
    category: "Security",
    author: "GCP Prep Editorial",
    authorRole: "Certification research team",
    published: "2026-06-30",
    updated: "2026-08-23",
    readingWords: 950,
    sections: [
      {
        heading: "1. Thinking a lower-level policy can revoke an inherited grant",
        body: [
          {
            type: "p",
            text: "IAM is additive. A role granted at the organisation or folder level applies to everything beneath it, and nothing you configure at the project level subtracts it.",
          },
          {
            type: "p",
            text: "If someone holds Editor at the organisation level, you cannot remove their access to one project by editing that project's policy. You have to change the grant where it was made. Exam questions test this directly, and the plausible-looking wrong answers are always the ones that try to fix it locally.",
          },
        ],
      },
      {
        heading: "2. Getting the role right and the scope wrong",
        body: [
          {
            type: "p",
            text: "Least privilege is two decisions, not one: which role, and at which level of the hierarchy. Questions routinely offer the correct role at the wrong scope as a distractor.",
          },
          {
            type: "p",
            text: "Storage Object Viewer is the right role for someone who needs to read objects. Granted at project level, it covers every bucket including ones created next year. Granted on the specific bucket, it does not. Both options will appear.",
          },
        ],
      },
      {
        heading: "3. Reaching for basic roles",
        body: [
          {
            type: "p",
            text: "Owner, Editor and Viewer are legacy roles spanning every service. Editor alone can modify almost everything in a project, including things that would be catastrophic.",
          },
          {
            type: "p",
            text: "The reliable heuristic: if a question describes a specific, narrow need and offers a basic role among the options, the basic role is wrong. Predefined roles are the default correct answer; custom roles are correct only when the question makes clear no predefined role fits.",
          },
        ],
      },
      {
        heading: "4. Downloading service account keys",
        body: [
          {
            type: "p",
            text: "This is the most consistently tested anti-pattern in the entire programme. A downloaded key is a long-lived credential that works from anywhere, never expires, and is trivially leaked into a repository or a log.",
          },
          {
            type: "ul",
            items: [
              "For a workload running on the platform — attach a service account to the resource.",
              "For a workload in Kubernetes — use Workload Identity.",
              "For a workload outside the platform — use workload identity federation.",
              "For a human who needs elevated access — use impersonation, which is temporary and audited.",
            ],
          },
          {
            type: "note",
            text: "When an option says 'create a service account key and store it', it is almost certainly the wrong answer. We can think of very few exam-realistic scenarios where it is correct.",
          },
        ],
      },
      {
        heading: "5. Confusing IAM with organisation policy",
        body: [
          {
            type: "p",
            text: "These solve different problems and are evaluated separately. IAM answers 'is this identity allowed to do this?'. Organisation policy answers 'is this action permitted here at all, regardless of who is asking?'.",
          },
          {
            type: "p",
            text: "When a question says something must never be possible, even for a project owner, IAM cannot deliver it — a project owner can grant themselves whatever permission they need. Organisation policy can, because it constrains the action itself.",
          },
          {
            type: "table",
            head: ["Requirement", "Mechanism"],
            rows: [
              [
                "This person should be able to read this bucket",
                "IAM role binding",
              ],
              [
                "No project in this folder may create public buckets",
                "Organisation policy constraint",
              ],
              [
                "This access should expire in two weeks",
                "IAM condition with an expiry",
              ],
              [
                "We need to know who read this file last month",
                "Data access audit logs, enabled in advance",
              ],
            ],
          },
        ],
      },
      {
        heading: "How to drill this",
        body: [
          {
            type: "p",
            text: "IAM rewards practice more than reading. Create a service account with a single narrow role, attach it to something, then try an action it lacks permission for and read the error. Grant a role at project level and observe what it reaches. Add a condition with a short expiry and watch access stop.",
          },
          {
            type: "p",
            text: "An hour spent doing this is worth several hours of reading about role definitions, because the exam tests recognition rather than recall.",
          },
        ],
      },
    ],
    relatedCerts: [
      "associate-cloud-engineer",
      "professional-cloud-security-engineer",
      "professional-cloud-architect",
    ],
    relatedPosts: [
      "reading-exam-questions-properly",
      "hands-on-practice-beats-video-courses",
    ],
  },

  {
    slug: "choosing-a-database-on-google-cloud",
    title: "Choosing a Database on Google Cloud: A Decision Tree",
    seoTitle: "Choosing a Database on Google Cloud",
    description:
      "Database selection questions appear on almost every Google Cloud exam. Here is a decision tree that answers most of them.",
    category: "Data",
    author: "GCP Prep Editorial",
    authorRole: "Certification research team",
    published: "2026-06-16",
    updated: "2026-08-19",
    readingWords: 900,
    sections: [
      {
        heading: "Why this keeps appearing",
        body: [
          {
            type: "p",
            text: "Database selection is a favourite exam topic because it is a genuine judgement call with a defensible right answer. Four options, all of which would technically store the data, and one set of constraints that makes exactly one correct.",
          },
          {
            type: "p",
            text: "It also matters in real work. Choosing wrong is expensive to undo once data and application code have accumulated around the decision.",
          },
        ],
      },
      {
        heading: "The decision tree",
        body: [
          {
            type: "diagram",
            caption: "Work through these in order; the first match is usually the answer.",
            steps: [
              "Is the workload analytical — scanning large volumes for aggregates? → BigQuery",
              "Is it unstructured files, media or backups? → Cloud Storage",
              "Does it need relational transactions, and fit on one machine? → Cloud SQL",
              "Does it need relational transactions AND horizontal write scale or global consistency? → Spanner",
              "Is it very high throughput key lookups over terabytes, with simple access patterns? → Bigtable",
              "Is it application state needing a flexible schema, real-time sync or offline clients? → Firestore",
              "Is it caching or ephemeral session data needing sub-millisecond reads? → An in-memory store",
            ],
          },
        ],
      },
      {
        heading: "The distinctions people get wrong",
        body: [
          {
            type: "ul",
            items: [
              "**BigQuery is not an operational database.** It is superb at scanning a billion rows and poor at fetching one row quickly. If the scenario describes serving a user request, it is the wrong answer.",
              "**Cloud SQL scales reads, not writes.** Read replicas distribute read load; every write still goes to one primary. A scenario emphasising write throughput beyond one machine rules it out.",
              "**Spanner is not the premium version of Cloud SQL.** It costs substantially more and is correct only when you genuinely need horizontal scale or global strong consistency. Choosing it for a workload that fits on one machine is over-engineering, and the exam penalises that.",
              "**Bigtable has no joins, no SQL and no multi-row transactions.** Its enormous throughput comes precisely from omitting them. Any scenario needing transactional correctness across rows rules it out.",
              "**Firestore is not a relational database with flexible fields.** It deliberately does not support queries that would scan the whole collection, which is what keeps it fast. You model around your queries.",
            ],
          },
        ],
      },
      {
        heading: "The constraints that decide it",
        body: [
          {
            type: "table",
            head: ["If the scenario emphasises", "Lean towards"],
            rows: [
              ["Ad-hoc analysis, aggregates, years of history", "BigQuery"],
              ["ACID transactions, existing SQL application", "Cloud SQL"],
              ["Global, strongly consistent, horizontally scaling writes", "Spanner"],
              ["Millions of reads per second, simple key lookups, petabytes", "Bigtable"],
              ["Mobile, offline support, real-time synchronisation", "Firestore"],
              ["Sub-millisecond latency, caching, session state", "In-memory store"],
              ["Migrating an existing MySQL or PostgreSQL app unchanged", "Cloud SQL"],
            ],
          },
        ],
      },
      {
        heading: "Watch the scale numbers",
        body: [
          {
            type: "p",
            text: "Exam scenarios include volume figures deliberately. Forty terabytes and 500,000 reads per second is not decoration — it rules out Cloud SQL entirely. Two hundred gigabytes and a few hundred transactions per second rules out Spanner as over-engineering.",
          },
          {
            type: "p",
            text: "When you see numbers in a database question, use them. They are almost always the deciding constraint rather than background detail.",
          },
        ],
      },
    ],
    relatedCerts: [
      "professional-data-engineer",
      "professional-cloud-architect",
      "professional-cloud-database-engineer",
    ],
    relatedPosts: ["reading-exam-questions-properly", "grounding-versus-fine-tuning"],
  },

  {
    slug: "grounding-versus-fine-tuning",
    title: "Grounding or Fine-Tuning? The Question Every AI Exam Asks",
    seoTitle: "Grounding or Fine-Tuning for Gen AI Exams",
    description:
      "When a generative model gives a wrong answer, the fix depends entirely on why it was wrong. Here is the framework.",
    category: "AI",
    author: "GCP Prep Editorial",
    authorRole: "Certification research team",
    published: "2026-05-29",
    updated: "2026-08-29",
    readingWords: 850,
    sections: [
      {
        heading: "The most common wrong answer in AI questions",
        body: [
          {
            type: "p",
            text: "A model does not know your company's refund policy, so someone proposes fine-tuning it on your support tickets. This is intuitive and it is wrong, and it is the single most frequently selected incorrect answer on generative AI questions.",
          },
          {
            type: "p",
            text: "Fine-tuning changes behaviour. It does not reliably install facts. A model tuned on support tickets learns to sound like your support team while still inventing the policy details.",
          },
        ],
      },
      {
        heading: "The framework",
        body: [
          {
            type: "table",
            head: ["What is wrong", "The fix", "Why"],
            rows: [
              [
                "Format, tone or structure is off",
                "Better prompting with examples",
                "The model can already do it; it needs clearer instruction.",
              ],
              [
                "It does not know your private or current information",
                "Grounding / retrieval augmentation",
                "The information was never in training data. Prompting cannot conjure it.",
              ],
              [
                "It consistently misses domain conventions despite good prompts",
                "Fine-tuning",
                "Behaviour needs to change systematically, beyond what examples achieve.",
              ],
              [
                "The task exceeds the model's capability",
                "A more capable model, or a different approach",
                "No technique compensates for a fundamental capability gap.",
              ],
              [
                "Identical calls give different answers",
                "Lower temperature, constrain output format",
                "Sampling randomness is causing the variation.",
              ],
            ],
          },
        ],
      },
      {
        heading: "Why grounding is usually the answer",
        body: [
          {
            type: "p",
            text: "In practice, most production failures of generative AI features come from the model not having the information, not from it being incapable. Retrieval fixes that directly: find the relevant documents, put them in the prompt, and the model answers from them.",
          },
          {
            type: "ul",
            items: [
              "It is cheaper than tuning, and far cheaper than training.",
              "When the source documents change, the answers change immediately. Nothing needs retraining.",
              "It produces citations, so users can verify claims.",
              "It respects access control — you can filter retrieval to documents the user is allowed to see.",
            ],
          },
          {
            type: "note",
            text: "That last point is easy to overlook and matters enormously in an enterprise setting. A tuned model has absorbed its training data and cannot un-know it for a particular user. A retrieval system simply does not fetch documents the user cannot see.",
          },
        ],
      },
      {
        heading: "When fine-tuning genuinely is correct",
        body: [
          {
            type: "p",
            text: "It has real uses, and exam questions do include scenarios where it is the answer. The signal is a systematic behavioural requirement that prompting has already failed to achieve.",
          },
          {
            type: "ul",
            items: [
              "Output must follow a specific internal format consistently, and few-shot examples have not been reliable.",
              "The domain uses vocabulary or conventions the model handles poorly.",
              "You want a smaller, cheaper model to match a larger one's behaviour on a narrow task.",
              "The instructions needed to get correct behaviour have grown so long that they dominate the context window on every call.",
            ],
          },
        ],
      },
      {
        heading: "The order to try things",
        body: [
          {
            type: "ol",
            items: [
              "Improve the prompt, with examples. Cheapest, fastest, and often sufficient.",
              "Add grounding if the model lacks information. This solves most real failures.",
              "Try a more capable model if the task is genuinely hard.",
              "Fine-tune only if behaviour still needs to change systematically.",
              "Train from scratch essentially never, outside of research contexts.",
            ],
          },
          {
            type: "p",
            text: "Exam questions frequently give you a scenario and four options corresponding to steps in this list. The correct answer is the earliest step that addresses the actual problem described.",
          },
        ],
      },
    ],
    relatedCerts: [
      "generative-ai-leader",
      "professional-machine-learning-engineer",
      "cloud-digital-leader",
    ],
    relatedPosts: [
      "choosing-a-database-on-google-cloud",
      "reading-exam-questions-properly",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string) {
  return blogPosts.filter((p) => p.category === category);
}

export function blogTitle(slug: string) {
  return getBlogPost(slug)?.title ?? slug;
}

/** Categories that actually have posts, with counts. */
export function populatedBlogCategories() {
  return blogCategories
    .map((category) => ({
      category,
      count: blogPosts.filter((p) => p.category === category).length,
    }))
    .filter((c) => c.count > 0);
}
