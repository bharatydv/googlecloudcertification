import type { Guide } from "@/types";

/**
 * Long-form guides. All content is original editorial work by GCP Prep.
 * Where a guide references official requirements — costs, validity periods,
 * exam length — it says so explicitly and directs the reader to verify on the
 * official certification pages, because those details change without notice.
 */
export const guides: Guide[] = [
  {
    slug: "google-cloud-certification-guide",
    title: "The Complete Google Cloud Certification Guide",
    seoTitle: "Google Cloud Certification Guide",
    description:
      "An independent guide to every Google Cloud certification — what each one covers, who it suits, how hard it is, and how to choose between them.",
    intro:
      "There are a dozen Google Cloud certifications and almost nobody needs more than two or three. This guide explains what each exam actually tests, who it is genuinely for, and how to pick the one that will change your work rather than just your profile.",
    readingWords: 1600,
    published: "2026-03-04",
    updated: "2026-08-30",
    sections: [
      {
        heading: "How the programme is structured",
        body: [
          {
            type: "p",
            text: "Google Cloud certifications sit in three tiers. Foundational exams test whether you understand what the technology does for a business. Associate exams test whether you can operate it. Professional exams test whether you can design with it under conflicting constraints.",
          },
          {
            type: "p",
            text: "The tiers are not a ladder you must climb in order. There is no prerequisite between them, and plenty of experienced engineers go straight to a Professional exam. What the tiers really tell you is how much hands-on experience the questions assume.",
          },
          {
            type: "table",
            head: ["Tier", "Assumes", "Question style"],
            rows: [
              [
                "Foundational",
                "No hands-on experience.",
                "Short scenarios about business fit and product purpose.",
              ],
              [
                "Associate",
                "Around six months of practical use.",
                "Configuration, commands and operational troubleshooting.",
              ],
              [
                "Professional",
                "Several years of experience, including production work.",
                "Long scenarios with competing constraints and no perfect answer.",
              ],
            ],
          },
        ],
      },
      {
        heading: "The foundational exams",
        body: [
          {
            type: "p",
            text: "Cloud Digital Leader is a vocabulary and judgement exam. It asks whether you can match a business problem to a category of product and justify the choice. It is genuinely useful for people in sales, product, finance and delivery who work alongside engineers, and it is a reasonable two-week orientation for an engineer about to start deeper study.",
          },
          {
            type: "p",
            text: "Generative AI Leader is newer and narrower. It covers how generative models work conceptually, which techniques fix which failures, and how to build a business case. If your work touches AI decisions, it is more immediately useful than Cloud Digital Leader.",
          },
          {
            type: "note",
            text: "Neither foundational exam will get an engineer hired on its own. Their value is orientation and credibility in non-engineering conversations, and that is a real value — just not a hiring one.",
          },
        ],
      },
      {
        heading: "Associate Cloud Engineer: the one most people should take",
        body: [
          {
            type: "p",
            text: "If you are going to take exactly one Google Cloud certification, this is almost certainly the one. It is the exam that changes what you can do at work rather than only what you can talk about, and it is the credential hiring managers recognise as meaning something practical.",
          },
          {
            type: "p",
            text: "It is also the most command-line literate exam in the programme. You will be shown commands and asked what they do, or given an outcome and asked which command produces it. Reading alone does not build that recognition — you need hours in a real project.",
          },
          {
            type: "p",
            text: "Expect six to ten weeks of preparation if you have general IT experience but limited Google Cloud exposure. Spend at least a third of that with a project open, deliberately breaking and fixing things.",
          },
        ],
      },
      {
        heading: "The professional exams, and who each is for",
        body: [
          {
            type: "ul",
            items: [
              "**Cloud Architect** — the flagship. Broadest, hardest, most recognised. For people who design systems and set technical direction. Long case-study scenarios where business constraints eliminate technically correct answers.",
              "**Cloud Developer** — for engineers who build and ship services. The most practitioner-shaped Professional exam; if you write application code daily, much of it describes your working week.",
              "**Data Engineer** — pipelines, warehousing and analytics platforms. Dominated by selection questions and by streaming semantics that most candidates under-prepare.",
              "**Cloud DevOps Engineer** — CI/CD and site reliability engineering. Unusual in that a real portion is about process and culture rather than products.",
              "**Cloud Security Engineer** — identity, boundaries, encryption and compliance. The deepest identity-focused exam in the programme.",
              "**Cloud Network Engineer** — the most specialised. Load balancing selection and hybrid connectivity dominate. Approachable if you have a networking background, brutal if you do not.",
              "**Machine Learning Engineer** — far more MLOps than data science. Pipelines, serving and monitoring outweigh modelling theory.",
              "**Cloud Database Engineer** — the natural path for database administrators moving to managed services. Selection and migration carry most of the weight.",
              "**Security Operations Engineer** — detection engineering, threat hunting and response. The operational counterpart to Cloud Security Engineer.",
            ],
          },
        ],
      },
      {
        heading: "How to choose",
        body: [
          {
            type: "p",
            text: "Work backwards from the job, not forwards from the catalogue. The question is not which certification is most impressive; it is which one covers the work you want to be doing in twelve months.",
          },
          {
            type: "ol",
            items: [
              "Write down the role you want and find five real job adverts for it.",
              "List the technical skills that appear in at least three of them.",
              "Match that list against the exam topics on our certification pages.",
              "Pick the exam with the highest overlap. If two are close, pick the one whose material you would enjoy more, because you will study it for months.",
            ],
          },
          {
            type: "note",
            text: "One certification you can discuss in depth beats three you crammed. Interviewers ask follow-up questions, and a certification you cannot defend in conversation is worse than none at all.",
          },
        ],
      },
      {
        heading: "What certifications do and do not do",
        body: [
          {
            type: "p",
            text: "Being honest about this saves people a lot of disappointment. A certification is a screening signal. It gets your application read and it gives an interviewer a structure to ask questions around. It is not evidence that you can build something, and experienced interviewers know the difference.",
          },
          {
            type: "p",
            text: "What converts a certification into an offer is being able to talk about something you built. Two or three projects you can describe in detail — what you chose, what went wrong, what you would do differently — will do more than a third certification.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Which Google Cloud certification should I start with?",
        a: "For most people with some technical background, Associate Cloud Engineer. It is the most practically useful and the most widely recognised entry point. Start with Cloud Digital Leader only if you need business vocabulary rather than hands-on capability.",
      },
      {
        q: "Do I need to take exams in order?",
        a: "No. There are no formal prerequisites between tiers. That said, Professional exams assume Associate-level fluency, so going straight there without platform experience is the most common cause of an expensive failed attempt.",
      },
      {
        q: "How long are Google Cloud certifications valid?",
        a: "Google publishes different validity periods by tier — currently three years for foundational and Associate certifications and two years for Professional ones. Confirm the current recertification requirements on the official certification pages before planning around them.",
      },
      {
        q: "How many certifications should I hold?",
        a: "Two or three that match your role. Beyond that, the return drops sharply and the time is better spent building things you can talk about in an interview.",
      },
    ],
    relatedCerts: [
      "associate-cloud-engineer",
      "professional-cloud-architect",
      "cloud-digital-leader",
    ],
    relatedGuides: [
      "google-cloud-certification-roadmap",
      "best-google-cloud-certification-for-beginners",
      "google-cloud-certification-cost",
    ],
    relatedLearn: ["cloud-fundamentals", "iam", "compute-engine"],
  },

  {
    slug: "google-cloud-certification-roadmap",
    title: "Google Cloud Certification Roadmap",
    seoTitle: "Google Cloud Certification Roadmap",
    description:
      "Sequenced certification paths for cloud engineering, architecture, data, security, DevOps and machine learning careers.",
    intro:
      "A roadmap is only useful if it starts from where you are going rather than from a product catalogue. This guide sets out sequences for six common career directions, with honest notes on where each path gets difficult.",
    readingWords: 1400,
    published: "2026-03-18",
    updated: "2026-08-31",
    sections: [
      {
        heading: "Start with the destination",
        body: [
          {
            type: "p",
            text: "Every path below assumes the same foundation: you can navigate the console, use the command line comfortably, and understand projects, IAM, networking basics and the main compute options. That foundation is what Associate Cloud Engineer certifies, which is why it appears at the start of most sequences.",
          },
          {
            type: "p",
            text: "If you already have that fluency from work, you can skip the Associate step. If you do not, skipping it makes every subsequent exam harder rather than saving time.",
          },
        ],
      },
      {
        heading: "Path 1 — Cloud engineering and architecture",
        body: [
          {
            type: "diagram",
            caption: "The most common progression, and the one with the broadest job market.",
            steps: [
              "Associate Cloud Engineer — platform fluency and hands-on capability",
              "Six to twelve months of real work applying it",
              "Professional Cloud Architect — design and trade-off judgement",
              "Optional specialisation: Network Engineer or Security Engineer",
            ],
          },
          {
            type: "p",
            text: "The gap in the middle is deliberate and it matters. Professional Cloud Architect tests judgement developed by making decisions and living with them. Taking it immediately after the Associate exam, with no production experience in between, is the single most common reason people fail it.",
          },
        ],
      },
      {
        heading: "Path 2 — Data engineering",
        body: [
          {
            type: "diagram",
            caption: "Data roles can start here directly; the platform overlap is smaller than people expect.",
            steps: [
              "Associate Cloud Engineer (optional, but useful for IAM and networking)",
              "Professional Data Engineer — pipelines, warehousing and governance",
              "Optional: Professional Cloud Database Engineer for operational stores",
              "Optional: Professional Machine Learning Engineer if the role moves towards ML",
            ],
          },
          {
            type: "p",
            text: "Many data engineers take the Data Engineer exam first without the Associate. That works, because most of the material is data-specific. The Associate exam's contribution is IAM and networking fluency, which shows up in the governance and security portions.",
          },
        ],
      },
      {
        heading: "Path 3 — Security",
        body: [
          {
            type: "diagram",
            caption: "Security paths split between prevention and detection.",
            steps: [
              "Associate Cloud Engineer — strongly recommended, not optional in practice",
              "Professional Cloud Security Engineer — identity, boundaries, encryption, compliance",
              "Then either: Security Operations Engineer for detection and response",
              "Or: Professional Cloud Network Engineer for boundary and connectivity depth",
            ],
          },
          {
            type: "p",
            text: "The Associate step matters more here than on any other path. Cloud Security Engineer goes far deeper on IAM than the Associate exam, and it builds directly on that foundation rather than re-teaching it.",
          },
        ],
      },
      {
        heading: "Path 4 — DevOps and platform engineering",
        body: [
          {
            type: "diagram",
            caption: "Process knowledge matters as much as product knowledge here.",
            steps: [
              "Associate Cloud Engineer — the operational baseline",
              "Read Google's public SRE material properly before the next step",
              "Professional Cloud DevOps Engineer — pipelines, SLOs and reliability practice",
              "Optional: Professional Cloud Architect for technical leadership",
            ],
          },
          {
            type: "note",
            text: "The SRE reading is not optional preparation. A meaningful portion of the DevOps exam tests error budgets, toil and alerting philosophy as concepts, and the correct answer is frequently organisational rather than technical.",
          },
        ],
      },
      {
        heading: "Path 5 — Machine learning and AI",
        body: [
          {
            type: "diagram",
            caption: "The heaviest prerequisite load of any path.",
            steps: [
              "Generative AI Leader — quick orientation, genuinely useful if AI is new to you",
              "Professional Data Engineer — because most production ML problems are data problems",
              "Professional Machine Learning Engineer — pipelines, serving and monitoring",
            ],
          },
          {
            type: "p",
            text: "The ML Engineer exam is far more about operations than modelling. If you are a data scientist, the pipeline and serving material will be the unfamiliar part. If you are a software engineer, the modelling vocabulary will be. Both are learnable; know which one is your gap.",
          },
        ],
      },
      {
        heading: "Path 6 — Application development",
        body: [
          {
            type: "diagram",
            caption: "The shortest path for people who already ship software.",
            steps: [
              "Associate Cloud Engineer — optional if you already deploy your own services",
              "Professional Cloud Developer — application patterns, integration and observability",
              "Optional: Professional Cloud DevOps Engineer if you own delivery too",
            ],
          },
        ],
      },
      {
        heading: "Pacing that actually works",
        body: [
          {
            type: "ul",
            items: [
              "One exam at a time. Parallel study across two syllabuses reliably produces two shallow preparations.",
              "Leave six to twelve months between Associate and Professional exams, filled with real work.",
              "Book the exam before you feel ready. An unbooked exam has no deadline and slips indefinitely.",
              "Build something between certifications. It is what turns the credential into a conversation.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can I skip Associate Cloud Engineer and go straight to Professional?",
        a: "You can register directly — there are no formal prerequisites. Whether you should depends on your hands-on experience. If you already work on the platform daily, skipping is reasonable. If your Google Cloud experience is limited, the Associate material is assumed knowledge on every Professional exam and skipping it makes the step much steeper.",
      },
      {
        q: "How long does a full path take?",
        a: "Realistically twelve to eighteen months from Associate to Professional, including the working experience in between. Compressing it into six months is possible but usually produces a certification you cannot defend in an interview.",
      },
      {
        q: "Should I take two certifications at once?",
        a: "No. Studying two syllabuses in parallel almost always means preparing shallowly for both. Sequence them, even when the topics overlap.",
      },
      {
        q: "Which path has the best job market?",
        a: "Cloud engineering and architecture has the largest volume of roles. Security and networking have fewer roles but less competition and often better compensation for the same effort. Pick based on what you want to do daily — the market is strong enough across all of them.",
      },
    ],
    relatedCerts: [
      "associate-cloud-engineer",
      "professional-cloud-architect",
      "professional-data-engineer",
    ],
    relatedGuides: [
      "google-cloud-certification-guide",
      "cloud-certification-study-plan",
      "certification-career-guide",
    ],
    relatedLearn: ["cloud-fundamentals", "iam", "bigquery"],
  },

  {
    slug: "google-cloud-certification-cost",
    title: "Google Cloud Certification Cost",
    seoTitle: "Google Cloud Certification Cost & Fees",
    description:
      "What Google Cloud certifications cost, including exam fees, training, retakes and the expenses people forget to budget for.",
    intro:
      "The exam fee is the number everyone looks up and the smallest part of what certification actually costs. This guide covers the full picture so you can budget honestly.",
    readingWords: 1100,
    published: "2026-04-02",
    updated: "2026-08-30",
    sections: [
      {
        heading: "Exam fees",
        body: [
          {
            type: "note",
            text: "The figures below are summarised from Google Cloud's official certification pages and are quoted in US dollars before tax. Prices vary by region and change without notice — always confirm the current fee on the official page for your exam before budgeting.",
          },
          {
            type: "table",
            head: ["Tier", "Typical fee", "Validity"],
            rows: [
              ["Foundational", "USD $99", "3 years"],
              ["Associate", "USD $125", "3 years"],
              ["Professional", "USD $200", "2 years"],
            ],
          },
          {
            type: "p",
            text: "Local taxes are added on top and can be significant depending on where you sit the exam. A $200 Professional exam can reach $230 or more once tax is applied.",
          },
        ],
      },
      {
        heading: "The costs people forget",
        body: [
          {
            type: "ul",
            items: [
              "**Retakes.** A failed attempt means paying the full fee again, plus a mandatory waiting period before you can retry. Budget as though there is a meaningful chance of one, particularly for Professional exams.",
              "**Training.** Structured courses range from modest subscription fees to several hundred dollars for instructor-led training. Free material exists and is often excellent, but it takes longer to navigate.",
              "**Practice tests.** Worth paying for something reputable. Avoid anything marketed as real exam questions — those are exam dumps, they violate the certification agreement, and using them can invalidate your certification.",
              "**Hands-on practice.** The free tier covers most of what you need, but sustained experimentation with larger machines, managed databases or GPU workloads will generate real charges. Set a budget alert before you start.",
              "**Your time.** The largest cost by far. Six to ten weeks at five hours a week is 30 to 50 hours for an Associate exam, and considerably more for a Professional one.",
            ],
          },
        ],
      },
      {
        heading: "A realistic total",
        body: [
          {
            type: "table",
            head: ["Item", "Low", "Higher"],
            rows: [
              ["Exam fee (Associate)", "$125", "$125"],
              ["Tax", "$0", "$25"],
              ["Training material", "$0 (free resources)", "$300 (paid course)"],
              ["Practice tests", "$0", "$40"],
              ["Hands-on lab spend", "$0 (free tier)", "$50"],
              ["Total", "$125", "$540"],
            ],
          },
          {
            type: "p",
            text: "The low column is entirely achievable. Google publishes substantial free documentation and training material, and the free tier covers most practical experimentation. The higher column buys structure and speed rather than better outcomes.",
          },
        ],
      },
      {
        heading: "How to reduce the cost",
        body: [
          {
            type: "ul",
            items: [
              "**Ask your employer.** Many companies reimburse certification fees, and a large number of employees never ask. Partners often have a direct business reason to fund it.",
              "**Use the free tier deliberately.** Always-free products cover a great deal, and new-account credits cover most of the rest. Set a budget alert on day one so nothing surprises you.",
              "**Watch for free exam vouchers.** Google periodically offers them through events, learning challenges and partner programmes.",
              "**Do not book too early.** A failed attempt costs more than a few extra weeks of preparation. Sit a full-length timed mock and only book when you are clearing pass comfortably.",
              "**Skip certifications you do not need.** The cheapest exam is the one you correctly decide not to take.",
            ],
          },
        ],
      },
      {
        heading: "Is it worth it?",
        body: [
          {
            type: "p",
            text: "Honestly, it depends on your situation rather than on the certification. If you are trying to move into cloud work from an adjacent role, a certification is one of the few credible signals available to you and the cost is small relative to the career change.",
          },
          {
            type: "p",
            text: "If you already work in cloud, the value is narrower — it helps with employer partner requirements, internal promotion cases and getting past automated screening. It is unlikely to change your compensation on its own.",
          },
          {
            type: "p",
            text: "What we would not recommend is collecting certifications as a substitute for building things. Two certifications plus three projects you can discuss in depth is a far stronger position than five certifications and nothing to show.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How much does a Google Cloud certification cost?",
        a: "Google's published fees are currently $99 for foundational exams, $125 for Associate and $200 for Professional, before tax. Confirm the current figure on the official certification page for your exam, since prices vary by region and change without notice.",
      },
      {
        q: "Do I have to pay again if I fail?",
        a: "Yes. A retake requires paying the full fee again, and there is a mandatory waiting period between attempts that increases with each failure. This is why it is worth sitting timed mock exams before booking.",
      },
      {
        q: "Are there free ways to prepare?",
        a: "Yes, and they are genuinely good. Official documentation is free and comprehensive, the free tier covers most hands-on practice, and there is a large amount of quality free training material. Paid courses buy structure and pace rather than fundamentally better content.",
      },
      {
        q: "Will my employer pay for it?",
        a: "Often, particularly if the company is a Google Cloud partner, since partner status depends on holding a number of certifications. Ask before you pay yourself — the answer is yes more often than people expect.",
      },
    ],
    relatedCerts: ["associate-cloud-engineer", "cloud-digital-leader"],
    relatedGuides: [
      "google-cloud-certification-guide",
      "google-cloud-certification-renewal",
      "best-google-cloud-certification-for-beginners",
    ],
    relatedLearn: ["cloud-fundamentals"],
  },

  {
    slug: "google-cloud-certification-renewal",
    title: "Google Cloud Certification Renewal",
    seoTitle: "Google Cloud Certification Renewal",
    description:
      "How Google Cloud certification renewal works, when to start, and how to decide whether a certification is worth keeping.",
    intro:
      "Certifications expire, and the renewal window is shorter than most people remember. This guide covers how recertification works, when to start preparing, and when letting one lapse is the right decision.",
    readingWords: 900,
    published: "2026-04-16",
    updated: "2026-08-29",
    sections: [
      {
        heading: "How long certifications last",
        body: [
          {
            type: "note",
            text: "Validity periods below are summarised from Google Cloud's official certification pages. Recertification rules change from time to time — confirm the current requirements on the official page for your certification well before it expires.",
          },
          {
            type: "ul",
            items: [
              "Foundational certifications are currently valid for three years.",
              "Associate certifications are currently valid for three years.",
              "Professional certifications are currently valid for two years.",
            ],
          },
          {
            type: "p",
            text: "Recertification generally means sitting the exam again. There is no continuing-education credit system that lets you accumulate points instead, which is a meaningful difference from some other vendors' programmes.",
          },
        ],
      },
      {
        heading: "When to start",
        body: [
          {
            type: "p",
            text: "The renewal window opens some months before expiry, and passing during that window extends your certification from the existing expiry date rather than from the date you retake. Sitting it early therefore does not cost you time.",
          },
          {
            type: "ol",
            items: [
              "Put the expiry date in your calendar the day you pass, with a reminder four months ahead.",
              "At four months, review the current exam guide. Cloud exam content moves, sometimes substantially.",
              "At three months, start focused revision on what has changed rather than re-reading everything.",
              "At two months, sit a timed mock exam to find your actual gaps.",
              "Book with at least a month of buffer, so a failed attempt does not mean losing the certification.",
            ],
          },
          {
            type: "note",
            text: "Letting a certification lapse and retaking later is not a disaster, but it does mean a gap on your profile and losing any partner-status contribution during that period. If your employer relies on it, the gap may matter to them more than to you.",
          },
        ],
      },
      {
        heading: "What changes between versions",
        body: [
          {
            type: "p",
            text: "Renewal is rarely a matter of re-sitting the same exam. Over two or three years the platform changes and the exam guide changes with it. Assume the following has moved:",
          },
          {
            type: "ul",
            items: [
              "New products have appeared and now feature in scenarios.",
              "Existing products have been renamed or consolidated.",
              "Topic weightings have shifted, sometimes noticeably.",
              "Recommended practices have changed — service account keys and workload identity are a good example of guidance genuinely moving.",
              "Newer areas such as generative AI have grown in weight across several exams.",
            ],
          },
          {
            type: "p",
            text: "The practical implication: read the current exam guide properly before revising. Studying your old notes is the most common renewal mistake, because it optimises for the exam you already passed.",
          },
        ],
      },
      {
        heading: "Should you renew at all?",
        body: [
          {
            type: "p",
            text: "This is worth asking deliberately rather than defaulting to yes. Renewal costs the same as the original exam plus weeks of preparation time.",
          },
          {
            type: "ul",
            items: [
              "**Renew** if your employer requires it, if it contributes to partner status, or if you are actively job-hunting in that specialisation.",
              "**Renew** if the material is still central to your daily work, since the revision is genuinely useful rather than purely administrative.",
              "**Let it lapse** if you have moved into a different specialisation and hold a more relevant certification.",
              "**Let it lapse** if it was never central to your role and you took it out of curiosity.",
              "**Consider upgrading instead** — if you hold Associate Cloud Engineer and now work at design level, spending the effort on Professional Cloud Architect may be worth more than renewing.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How do I renew a Google Cloud certification?",
        a: "By taking the current version of the exam again during the renewal window before it expires. Google does not currently offer a continuing-education alternative. Confirm the exact process and window on the official certification page, since these details change.",
      },
      {
        q: "What happens if my certification expires?",
        a: "It becomes inactive and you can no longer claim it as current. You can regain it by passing the exam again, but there is no shortened path — you sit the full exam.",
      },
      {
        q: "Does renewal count from the retake date or the original expiry?",
        a: "Passing within the renewal window generally extends from your existing expiry date, so sitting early does not shorten your new period. Verify this on the official page for your specific certification before relying on it.",
      },
      {
        q: "Is the renewal exam easier than the first attempt?",
        a: "It is the same exam, at the current version. It usually feels easier because you have the underlying knowledge, but people who revise only their old notes are often caught out by how much the content has moved.",
      },
    ],
    relatedCerts: ["associate-cloud-engineer", "professional-cloud-architect"],
    relatedGuides: [
      "google-cloud-certification-cost",
      "google-cloud-certification-guide",
    ],
    relatedLearn: ["cloud-fundamentals"],
  },

  {
    slug: "best-google-cloud-certification-for-beginners",
    title: "The Best Google Cloud Certification for Beginners",
    seoTitle: "Best Google Cloud Certification for Beginners",
    description:
      "Which Google Cloud certification to start with, depending on your background and what you actually want the certification to do for you.",
    intro:
      "There is no single best first certification — there is a best one for your situation. This guide walks through the three realistic starting points and who each genuinely suits.",
    readingWords: 1100,
    published: "2026-04-29",
    updated: "2026-08-28",
    sections: [
      {
        heading: "The honest answer for most people",
        body: [
          {
            type: "p",
            text: "For most people with any technical background, start with Associate Cloud Engineer. It is the certification that changes what you can do rather than only what you can discuss, and it is the one hiring managers treat as meaningful.",
          },
          {
            type: "p",
            text: "It is harder than the foundational exams and takes longer — six to ten weeks rather than two to four. That difficulty is exactly why it carries more weight.",
          },
        ],
      },
      {
        heading: "When to start with Cloud Digital Leader instead",
        body: [
          {
            type: "p",
            text: "Cloud Digital Leader is the right first choice in three specific situations, and it is genuinely valuable in all three.",
          },
          {
            type: "ul",
            items: [
              "**Your role is not technical.** If you work in sales, marketing, finance, product or delivery, this is the certification designed for you, and Associate Cloud Engineer would be studying for a job you do not want.",
              "**You need a quick, achievable win.** Two to four weeks to a real certification is a strong motivator if you are rebuilding confidence or returning to study.",
              "**You want a map before the terrain.** Some engineers find a two-week structured tour of the platform makes the Associate material land better. This is a legitimate strategy, just not a necessary one.",
            ],
          },
          {
            type: "note",
            text: "What Cloud Digital Leader will not do is get an engineer hired. If your goal is a technical role, it is a warm-up rather than a credential — plan for Associate Cloud Engineer to follow it.",
          },
        ],
      },
      {
        heading: "When to start with Generative AI Leader",
        body: [
          {
            type: "p",
            text: "If your work already touches AI decisions — you are scoping AI features, advising on adoption, or evaluating vendors — this is more immediately useful than Cloud Digital Leader. It is narrower but goes a level deeper into a subject you can apply next week.",
          },
          {
            type: "p",
            text: "It is not a good first choice if you want general cloud literacy, because it assumes you care specifically about generative AI and spends its time there.",
          },
        ],
      },
      {
        heading: "Choosing by where you are starting from",
        body: [
          {
            type: "table",
            head: ["Your background", "Start with", "Why"],
            rows: [
              [
                "Software developer",
                "Associate Cloud Engineer",
                "Fills the infrastructure gap around skills you already have.",
              ],
              [
                "System or network administrator",
                "Associate Cloud Engineer",
                "Most of your existing knowledge transfers; you are learning the cloud equivalents.",
              ],
              [
                "IT support or helpdesk",
                "Associate Cloud Engineer",
                "The most credible route into a cloud role, though budget closer to three months.",
              ],
              [
                "Student or recent graduate",
                "Associate Cloud Engineer",
                "Carries far more weight with employers than a foundational certification.",
              ],
              [
                "Sales, marketing or finance",
                "Cloud Digital Leader",
                "Built for exactly this audience and directly applicable to your work.",
              ],
              [
                "Product or project management",
                "Cloud Digital Leader",
                "Gives you enough vocabulary to challenge estimates and scope realistically.",
              ],
              [
                "Working near AI projects",
                "Generative AI Leader",
                "More immediately useful than general cloud literacy for that work.",
              ],
              [
                "Completely non-technical, career changing",
                "Cloud Digital Leader, then Associate Cloud Engineer",
                "Build confidence and vocabulary first; the Associate exam is a large step otherwise.",
              ],
            ],
          },
        ],
      },
      {
        heading: "How to prepare for your first exam",
        body: [
          {
            type: "ol",
            items: [
              "Read the official exam guide first. It tells you exactly what is in scope, and studying beyond it wastes time.",
              "Create a free-tier account on day one and set a budget alert immediately.",
              "Work through topics in order rather than jumping around. Cloud concepts build on each other more than they appear to.",
              "Build something small each week. A virtual machine behind a load balancer teaches more than three hours of reading.",
              "Use practice questions to find gaps, not to memorise answers. Read every explanation, including for questions you got right.",
              "Sit a full-length timed mock before booking. Book when you are clearing pass comfortably, not when you are just scraping it.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is Cloud Digital Leader worth it for a beginner?",
        a: "It depends what you want from it. For non-technical roles it is genuinely the right certification. For someone targeting a technical cloud job, it is a warm-up rather than a credential — Associate Cloud Engineer is what employers screen for.",
      },
      {
        q: "Can a complete beginner pass Associate Cloud Engineer?",
        a: "Yes, but plan for around three months rather than six weeks, and do not skip hands-on practice. The exam tests recognition of commands and console workflows, which only comes from actually using them.",
      },
      {
        q: "Do I need a computer science degree?",
        a: "No. General comfort with computers, networks and command lines matters far more than formal education. Many successful candidates come from support, administration or entirely unrelated backgrounds.",
      },
      {
        q: "How much hands-on practice do I need?",
        a: "For Associate Cloud Engineer, we would suggest at least a third of your study time. The free tier covers almost everything you need. Reading about creating a load balancer and actually creating one produce very different levels of retention.",
      },
    ],
    relatedCerts: [
      "cloud-digital-leader",
      "associate-cloud-engineer",
      "generative-ai-leader",
    ],
    relatedGuides: [
      "how-to-prepare-for-cloud-certification",
      "cloud-certification-study-plan",
      "cloud-certification-without-experience",
    ],
    relatedLearn: ["cloud-fundamentals", "compute-engine", "iam"],
  },

  {
    slug: "how-to-prepare-for-cloud-certification",
    title: "How to Prepare for a Cloud Certification",
    seoTitle: "How to Prepare for Cloud Certification",
    description:
      "A practical preparation method: reading the exam guide properly, building hands-on habits, using practice questions well, and knowing when to book.",
    intro:
      "Most people prepare for cloud exams the way they revised for school, and cloud exams do not reward that. This guide sets out a method built around building things, diagnosing gaps and knowing when you are actually ready.",
    readingWords: 1300,
    published: "2026-05-13",
    updated: "2026-09-01",
    sections: [
      {
        heading: "Start with the exam guide, properly",
        body: [
          {
            type: "p",
            text: "The official exam guide lists every in-scope topic and, for most exams, the weight of each section. It is the single most useful preparation document and most candidates skim it once and never return.",
          },
          {
            type: "ol",
            items: [
              "Read it fully before studying anything else.",
              "Copy the section list into a document and rate your confidence on each from one to five.",
              "Multiply confidence gaps by section weight. Study in that order.",
              "Return to it every two weeks and re-rate. This is your progress measure, not the number of hours you have logged.",
            ],
          },
          {
            type: "note",
            text: "Weighting matters more than people act as though it does. A section worth 25% of the exam deserves roughly five times the attention of one worth 5%, regardless of which you find more interesting.",
          },
        ],
      },
      {
        heading: "Build things, from week one",
        body: [
          {
            type: "p",
            text: "Cloud exams test recognition. Shown a command, you need to know what it does. Described an outcome, you need to know which service produces it. That recognition comes from having done the thing, not from having read about it.",
          },
          {
            type: "p",
            text: "You do not need elaborate projects. A weekly build of two or three hours is enough if it is genuinely hands-on.",
          },
          {
            type: "ul",
            items: [
              "Week 1 — create a project, set a budget alert, launch a virtual machine, connect to it.",
              "Week 2 — put an instance group behind a load balancer and watch it autoheal when you break an instance.",
              "Week 3 — create a storage bucket, apply lifecycle rules, generate a signed URL and watch it expire.",
              "Week 4 — build a VPC with a private subnet and Cloud NAT, and prove nothing can reach in.",
              "Week 5 — deploy a container to Cloud Run, split traffic between two revisions, roll one back.",
              "Week 6 — create a service account with a narrow role and make an application use it. Then try an action it is not permitted and read the error.",
            ],
          },
          {
            type: "p",
            text: "The most valuable habit is deliberately breaking things. Delete a firewall rule and watch what fails. Remove a permission and read the error message. Failure modes are what exam scenarios describe, and you learn them far faster by causing them.",
          },
        ],
      },
      {
        heading: "Use practice questions as a diagnostic",
        body: [
          {
            type: "p",
            text: "Practice questions are for finding gaps, not for accumulating a score. Used correctly they are the fastest way to discover what you only think you know.",
          },
          {
            type: "ul",
            items: [
              "Read every explanation, including for questions you answered correctly. Confirming your reasoning matters as much as correcting it.",
              "When you get one wrong, write down the underlying concept rather than the answer. The exam will phrase it differently.",
              "Track which topics you get wrong. Return to the console for those, not to your notes.",
              "Do not memorise questions. Recognising a question you have seen teaches you nothing transferable.",
            ],
          },
          {
            type: "note",
            text: "Never use exam dumps — material claiming to be real exam questions. They violate the certification agreement and can invalidate your certification. They also produce candidates who pass and then cannot do the job, which is why the practice damages everyone's certification.",
          },
        ],
      },
      {
        heading: "Learn to read exam questions",
        body: [
          {
            type: "p",
            text: "Cloud exam questions are written carefully and the constraints are deliberate. Several answers are usually technically workable, and one is correct given what the scenario specified.",
          },
          {
            type: "ul",
            items: [
              "**Find the constraint.** Cost, latency, compliance, team size, downtime tolerance. It is stated for a reason.",
              "**Watch for 'minimum' and 'least'.** These signal that the most powerful answer is wrong and the simplest sufficient one is right.",
              "**Notice team size and operational capacity.** A small team implies managed services; explicit control requirements imply the opposite.",
              "**Eliminate first.** Two options are usually obviously wrong. Choosing between the remaining two is a much easier decision.",
              "**Beware the impressive answer.** Exams reward appropriate solutions, not sophisticated ones.",
            ],
          },
        ],
      },
      {
        heading: "Knowing when to book",
        body: [
          {
            type: "p",
            text: "Booking too early is expensive; booking too late means indefinite drift. The compromise that works is booking once you have evidence rather than a feeling.",
          },
          {
            type: "ol",
            items: [
              "Sit a full-length timed mock exam without notes.",
              "If you clear pass with a comfortable margin, book for two to three weeks later.",
              "If you are close but not comfortable, spend two weeks on your weakest topics and retest.",
              "If you are well below, do not book yet. There is no benefit to sitting an exam you will fail.",
            ],
          },
          {
            type: "p",
            text: "Sit at least one mock under real conditions — full length, timed, no notes, no pauses. Two hours of dense scenario reading is a stamina problem as much as a knowledge one, and discovering that during the real exam is avoidable.",
          },
        ],
      },
      {
        heading: "The week before",
        body: [
          {
            type: "ul",
            items: [
              "Stop learning new material. Consolidate what you have.",
              "Re-read your notes on the topics you got wrong most often.",
              "Check the exam logistics — identification requirements, the room rules for online proctoring, the check-in process.",
              "If sitting online, test your setup in advance and clear your desk properly. Proctoring rules are enforced strictly.",
              "Sleep properly the night before. It affects a two-hour reading-comprehension exam more than one extra revision session will.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How many hours do I need to study?",
        a: "For Associate Cloud Engineer, 40 to 80 hours is typical depending on background. Professional exams usually need 80 to 150. These are wide ranges because starting point matters far more than the certification itself.",
      },
      {
        q: "Are video courses or documentation better?",
        a: "Use both for different purposes. Video courses give structure and pace when a topic is entirely new. Documentation gives precision when you need to be sure of a detail. Neither substitutes for hands-on practice.",
      },
      {
        q: "How many practice questions should I do?",
        a: "There is no target number. Do enough that you stop finding new gaps — usually a few hundred across the syllabus, with every explanation read. Quality of review matters far more than volume.",
      },
      {
        q: "What score should I get on mocks before booking?",
        a: "Comfortably above the pass mark, consistently, across several different mocks. Scraping a pass on one practice test is not evidence of readiness; it is evidence of a good day.",
      },
    ],
    relatedCerts: ["associate-cloud-engineer", "professional-cloud-architect"],
    relatedGuides: [
      "cloud-certification-study-plan",
      "best-google-cloud-certification-for-beginners",
      "cloud-certification-without-experience",
    ],
    relatedLearn: ["cloud-fundamentals", "iam", "compute-engine"],
  },

  {
    slug: "cloud-certification-study-plan",
    title: "A Cloud Certification Study Plan",
    seoTitle: "Cloud Certification Study Plan: 8 Weeks",
    description:
      "An eight-week study plan for Associate Cloud Engineer, with weekly topics, hands-on builds and checkpoints, adaptable to other exams.",
    intro:
      "This is a concrete eight-week plan built around five to seven hours a week. It is written for Associate Cloud Engineer, but the structure — study, build, drill, review — adapts to any cloud exam.",
    readingWords: 1200,
    published: "2026-05-27",
    updated: "2026-09-02",
    sections: [
      {
        heading: "How the plan works",
        body: [
          {
            type: "p",
            text: "Each week has the same shape: a study block covering new material, a build block where you use it, and a drill block of practice questions on that topic. The pattern matters more than the specific hours.",
          },
          {
            type: "ul",
            items: [
              "**Study — around 2 hours.** Read or watch material on the week's topic.",
              "**Build — around 2 hours.** Create it yourself, then deliberately break it.",
              "**Drill — around 1 hour.** Practice questions on that topic only, reading every explanation.",
              "**Review — around 30 minutes.** Revisit last week's weak points before moving on.",
            ],
          },
          {
            type: "note",
            text: "If a week slips, repeat it rather than skipping ahead. Cloud topics build on each other, and moving on with a shaky foundation costs more time than the week you saved.",
          },
        ],
      },
      {
        heading: "Weeks 1–2: foundations and compute",
        body: [
          {
            type: "p",
            text: "**Week 1 — Platform fundamentals.** Projects, folders, organisations, regions, zones, billing structure and the resource hierarchy. Install the command-line tools and get comfortable with configurations.",
          },
          {
            type: "p",
            text: "Build: create a project, set a budget alert, enable a few APIs, and create your first virtual machine from both the console and the command line so you can see how they correspond.",
          },
          {
            type: "p",
            text: "**Week 2 — Compute Engine.** Machine types, images, persistent disks, snapshots, instance templates, managed instance groups and autoscaling.",
          },
          {
            type: "p",
            text: "Build: create a custom image with a simple web server, build an instance template from it, create a managed instance group across two zones, then delete an instance and watch autohealing replace it.",
          },
        ],
      },
      {
        heading: "Weeks 3–4: storage, networking",
        body: [
          {
            type: "p",
            text: "**Week 3 — Storage.** Cloud Storage classes, lifecycle rules, versioning, access control and signed URLs. Persistent disk types and when a shared file system is required instead.",
          },
          {
            type: "p",
            text: "Build: create a bucket, upload objects, apply a lifecycle rule, enable versioning and overwrite an object to see what happens, then generate a signed URL and wait for it to expire.",
          },
          {
            type: "p",
            text: "**Week 4 — Networking.** VPCs, subnets, routes, firewall rules and priority, and the load balancer decision tree.",
          },
          {
            type: "p",
            text: "Build: create a custom VPC with a private subnet, add Cloud NAT, confirm instances can reach the internet but nothing can reach them. Then put a load balancer in front of your instance group and verify the health checks.",
          },
        ],
      },
      {
        heading: "Weeks 5–6: IAM, databases and Kubernetes",
        body: [
          {
            type: "p",
            text: "**Week 5 — IAM and security.** This is the highest-yield week. Basic, predefined and custom roles, policy inheritance, service accounts, impersonation and least privilege.",
          },
          {
            type: "p",
            text: "Build: create a service account with a single narrow role, attach it to an instance, and have an application use it. Then attempt an action it lacks permission for and read the error carefully — recognising these messages is directly examinable.",
          },
          {
            type: "p",
            text: "**Week 6 — Databases and Kubernetes.** Cloud SQL configuration and high availability, plus the selection criteria across Cloud SQL, Firestore, Bigtable and Spanner. Then a GKE cluster and basic workload management.",
          },
          {
            type: "p",
            text: "Build: create a Cloud SQL instance with private IP and connect securely. Create a small cluster, deploy a workload, expose it with a service, and scale it up and down.",
          },
        ],
      },
      {
        heading: "Weeks 7–8: operations and consolidation",
        body: [
          {
            type: "p",
            text: "**Week 7 — Monitoring and operations.** Dashboards, alerting policies, uptime checks, log queries, log-based metrics and log sinks.",
          },
          {
            type: "p",
            text: "Build: create an uptime check against your load balancer, an alerting policy that notifies you, then deliberately break the backend and confirm the alert fires. Query the logs to find the failure.",
          },
          {
            type: "p",
            text: "**Week 8 — Consolidation.** No new material. Full-length timed mock exams, review of weak topics, and command-line drilling until common commands are automatic.",
          },
          {
            type: "ol",
            items: [
              "Day 1 — full timed mock, no notes. Record the score and the weak topics.",
              "Days 2–4 — work only on the weakest topics, in the console rather than in notes.",
              "Day 5 — second full timed mock.",
              "Days 6–7 — light review, logistics check, rest.",
            ],
          },
        ],
      },
      {
        heading: "Adapting the plan",
        body: [
          {
            type: "ul",
            items: [
              "**For a Professional exam**, extend to twelve to sixteen weeks and add weeks for the specialist domains. Keep the same weekly shape.",
              "**For Cloud Digital Leader**, compress to three weeks and replace the build blocks with case-study reading, since the exam does not test configuration.",
              "**If you have less time per week**, stretch to twelve weeks rather than cutting the build blocks. Hands-on practice is the part that produces retention.",
              "**If you already work on the platform**, skip the build blocks for topics you use daily and spend the time on the ones you avoid at work — that is where your gaps are.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is eight weeks realistic?",
        a: "For someone with general IT experience studying five to seven hours a week, yes. Complete beginners should plan for twelve weeks. People already working on Google Cloud daily often need four to six.",
      },
      {
        q: "What if I miss a week?",
        a: "Repeat rather than skip. Missing a week is normal; skipping content is what causes trouble later, because cloud topics build on each other more than the syllabus structure suggests.",
      },
      {
        q: "Can I study more hours per week and finish faster?",
        a: "To a point. Beyond roughly ten to twelve hours a week retention drops noticeably, and hands-on practice needs time between sessions to consolidate. Four weeks of intense cramming generally produces a weaker result than eight steady ones.",
      },
      {
        q: "Should I do practice questions throughout or only at the end?",
        a: "Throughout, on the topic you just studied. They are a diagnostic tool, and using them early tells you what you misunderstood while there is still time to fix it.",
      },
    ],
    relatedCerts: ["associate-cloud-engineer", "cloud-digital-leader"],
    relatedGuides: [
      "how-to-prepare-for-cloud-certification",
      "google-cloud-certification-roadmap",
    ],
    relatedLearn: ["compute-engine", "iam", "vpc", "cloud-monitoring"],
  },

  {
    slug: "cloud-certification-without-experience",
    title: "Getting Cloud Certified Without Experience",
    seoTitle: "Cloud Certification Without Experience",
    description:
      "How to prepare for and benefit from a cloud certification when you have no professional cloud experience — including what it will and will not do for you.",
    intro:
      "You can absolutely pass a cloud certification with no professional cloud experience. Whether it gets you hired is a different question, and this guide answers both honestly.",
    readingWords: 1100,
    published: "2026-06-10",
    updated: "2026-08-27",
    sections: [
      {
        heading: "The honest position",
        body: [
          {
            type: "p",
            text: "A certification without experience gets your application read. It does not get you hired. That is a real benefit — automated screening and recruiters filter heavily on keywords, and the certification gets you past that filter — but it is worth being clear about the size of it.",
          },
          {
            type: "p",
            text: "What closes the gap is evidence you can build things. A certification plus two or three projects you can discuss in depth is a genuinely competitive position for a junior role. A certification alone is a weaker one, because interviewers have met many people who passed an exam and could not explain their own choices.",
          },
        ],
      },
      {
        heading: "Manufacture the experience",
        body: [
          {
            type: "p",
            text: "You cannot get professional experience without a job, but you can get real experience without a job. The distinction matters less to interviewers than people assume — what they want is to hear you reason about decisions you actually made.",
          },
          {
            type: "ul",
            items: [
              "**Build something end to end.** Not a tutorial follow-along — something you designed, where you chose the pieces and hit real problems.",
              "**Deploy it properly.** Load balancer, custom domain, TLS, monitoring, alerting. The operational parts are what distinguish a project from an exercise.",
              "**Automate the infrastructure.** Define it as code so you can destroy and recreate it. This is what real teams do and it is a strong signal.",
              "**Break it deliberately.** Delete something and fix it. The story of a failure you diagnosed is more compelling in an interview than a system that always worked.",
              "**Write it up.** A short document explaining what you built, what you chose and what you would do differently. This becomes your interview material.",
            ],
          },
          {
            type: "note",
            text: "Three substantial projects beat ten tutorials. Interviewers ask follow-up questions, and depth is what survives them.",
          },
        ],
      },
      {
        heading: "Project ideas that demonstrate real skills",
        body: [
          {
            type: "ul",
            items: [
              "**A deployed web application with proper operations.** Containerised, behind a load balancer, with monitoring, alerting and a CI/CD pipeline. Covers most of the Associate syllabus in one project.",
              "**A data pipeline.** Ingest data from a public API, process it, load it into a warehouse, build a dashboard. Demonstrates the data path end to end.",
              "**A migration exercise.** Take an application running locally and move it to the cloud properly. Document the decisions — this maps directly onto real work.",
              "**A cost optimisation study.** Deploy something deliberately inefficiently, measure it, optimise it, document the savings. Very few junior candidates can discuss cost credibly.",
              "**An infrastructure-as-code repository.** Define an environment as code, with a pipeline that provisions and tears it down. Strong signal for platform roles.",
            ],
          },
        ],
      },
      {
        heading: "Roles that are realistically reachable",
        body: [
          {
            type: "p",
            text: "Aiming directly at a cloud engineer role with no professional experience is possible but difficult. These adjacent routes have a much higher success rate and reach the same destination in twelve to eighteen months.",
          },
          {
            type: "ul",
            items: [
              "**Cloud support engineer.** Breadth plus troubleshooting is exactly what these roles screen for, and they hire people without prior cloud experience regularly.",
              "**Junior DevOps or platform engineer.** Especially at smaller companies, where a demonstrated ability to learn matters more than years of experience.",
              "**Internal transfer.** If you already work in IT, moving to the cloud team internally is by far the easiest route. You have the relationships and the domain knowledge already.",
              "**Managed service provider or consultancy.** They hire in volume, train people, and expose you to many environments quickly. Demanding, but the learning rate is unmatched.",
              "**Technical support at a cloud vendor or partner.** Excellent exposure and a well-worn path into engineering roles.",
            ],
          },
        ],
      },
      {
        heading: "How to talk about it in interviews",
        body: [
          {
            type: "p",
            text: "The mistake is presenting the certification as the qualification. Present it as evidence of how you learn, and the projects as evidence of what you can do.",
          },
          {
            type: "ul",
            items: [
              "Be direct about the experience gap. Interviewers know; pretending otherwise damages credibility for no benefit.",
              "Lead with something you built. Describe a decision you made and why you made it.",
              "Have a failure story ready. What broke, how you diagnosed it, what you changed. This is the single most useful thing you can prepare.",
              "Know the limits of what you know. Saying you have not worked at that scale, but explaining how you would approach it, is a better answer than bluffing.",
              "Show you keep learning. What you are working on now, and what you plan to learn next.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can I get a cloud job with just a certification?",
        a: "It is possible but uncommon. The certification gets your application read; the projects get you hired. Plan for both, and treat the certification as one component rather than the whole strategy.",
      },
      {
        q: "Which certification is best without experience?",
        a: "Associate Cloud Engineer. It is the one employers recognise as meaning practical capability. Budget around three months rather than six weeks if you are starting from scratch.",
      },
      {
        q: "How do I get hands-on practice for free?",
        a: "The free tier covers most of what you need. Set a budget alert on day one, use small machine types, and shut things down when you are finished. Most people can complete a full Associate-level study plan for under twenty dollars.",
      },
      {
        q: "How long before I can realistically get hired?",
        a: "Six to twelve months of consistent effort for a first cloud role, going through an adjacent route such as support or an internal transfer. Direct entry to a cloud engineer role usually takes longer.",
      },
    ],
    relatedCerts: ["associate-cloud-engineer", "cloud-digital-leader"],
    relatedGuides: [
      "best-google-cloud-certification-for-beginners",
      "certification-career-guide",
      "how-to-prepare-for-cloud-certification",
    ],
    relatedLearn: ["cloud-fundamentals", "compute-engine", "cloud-run"],
  },

  {
    slug: "certification-career-guide",
    title: "Certifications and Your Cloud Career",
    seoTitle: "Cloud Certification Career Guide",
    description:
      "What cloud certifications actually do for a career, which roles value them most, and how to combine them with experience to move forward.",
    intro:
      "Certifications help careers in specific, limited ways. Understanding exactly what they do — and what only experience does — lets you invest your time where it actually pays.",
    readingWords: 1200,
    published: "2026-06-24",
    updated: "2026-08-26",
    sections: [
      {
        heading: "What certifications actually do",
        body: [
          {
            type: "ul",
            items: [
              "**They get you past screening.** Automated filters and recruiters match on keywords. This is the largest single benefit and it is entirely real.",
              "**They structure an interview.** A certification gives an interviewer a framework for questions, which works in your favour if you genuinely know the material.",
              "**They satisfy partner requirements.** Consultancies and partners must maintain a number of certified staff to keep their status, which makes you directly valuable to them.",
              "**They provide a learning structure.** The syllabus forces breadth, including topics you would avoid if left to your own preferences.",
              "**They signal current knowledge.** In a field that changes quickly, a recent certification says you have engaged with the platform as it is now.",
            ],
          },
        ],
      },
      {
        heading: "What they do not do",
        body: [
          {
            type: "ul",
            items: [
              "**They do not prove you can build things.** Experienced interviewers probe past the certification quickly, and the gap shows within a few questions.",
              "**They rarely change compensation directly.** Some employers pay a bonus for passing, but ongoing pay tracks the work you do rather than what you hold.",
              "**They do not substitute for judgement.** Knowing which product to choose is not the same as having lived with the consequences of choosing it.",
              "**They do not stay relevant indefinitely.** A certification from four years ago describes a platform that has moved substantially.",
            ],
          },
        ],
      },
      {
        heading: "Which roles value them most",
        body: [
          {
            type: "table",
            head: ["Role", "Certification value", "Why"],
            rows: [
              [
                "Consulting and partner delivery",
                "Very high",
                "Partner status depends on certified headcount. Directly commercially valuable.",
              ],
              [
                "Pre-sales and solutions architecture",
                "Very high",
                "Customer-facing credibility is part of the job, and certifications are visible proof.",
              ],
              [
                "Cloud engineering (junior)",
                "High",
                "One of the few credible signals available before you have experience.",
              ],
              [
                "Cloud engineering (senior)",
                "Moderate",
                "Useful for screening but your track record does most of the work.",
              ],
              [
                "Product and project management",
                "Moderate",
                "Foundational certifications provide credibility with engineering teams.",
              ],
              [
                "Startup engineering",
                "Lower",
                "Small companies hire almost entirely on demonstrated ability to build.",
              ],
            ],
          },
        ],
      },
      {
        heading: "Combining certifications with experience",
        body: [
          {
            type: "p",
            text: "The strongest positions come from pairing a certification with something it does not cover. A certification tells an employer you know a platform; the pairing tells them where you can apply it.",
          },
          {
            type: "ul",
            items: [
              "**Certification plus a domain.** Cloud skills plus genuine knowledge of finance, healthcare or logistics is rarer and more valuable than cloud skills alone.",
              "**Certification plus infrastructure as code.** Almost every serious role expects this, and it is not deeply covered by the exams.",
              "**Certification plus a programming language.** Automation ability separates operators from engineers.",
              "**Certification plus incident experience.** Having been on call and handled real failures is something no exam demonstrates.",
              "**Certification plus writing.** The ability to write a clear design document is scarce and disproportionately rewarded at senior levels.",
            ],
          },
        ],
      },
      {
        heading: "How to use a certification well",
        body: [
          {
            type: "ol",
            items: [
              "Add it to your profile with the issue date visible. Recency matters, and hiding the date invites the assumption that it is old.",
              "Do not list it as your headline qualification. Lead with what you do; the certification supports it.",
              "Prepare to be tested on it. Interviewers reasonably assume you know the material, and being unable to answer basic questions about it is worse than not holding it.",
              "Connect it to work. 'I studied for the Architect exam and then redesigned our disaster recovery approach' is a far stronger statement than the certification alone.",
              "Know when to stop. Beyond two or three relevant certifications, further ones add very little and the time is better spent building.",
            ],
          },
        ],
      },
      {
        heading: "A word on salary expectations",
        body: [
          {
            type: "p",
            text: "We deliberately do not publish salary figures. They vary enormously by country, city, company size and sector, and the numbers circulated online are usually drawn from unrepresentative samples and go stale quickly.",
          },
          {
            type: "p",
            text: "What is consistently true: certifications correlate with higher pay mostly because they correlate with people who invest in their skills, not because the certificate itself commands a premium. The pay follows the work you can do. For a reliable local picture, look at current job adverts in your own market rather than at aggregated global figures.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Will a Google Cloud certification increase my salary?",
        a: "Not directly, in most cases. It can help you reach roles that pay more, and some employers offer a one-off bonus for passing. Ongoing compensation tracks the work you do rather than the credentials you hold.",
      },
      {
        q: "How many certifications should I have?",
        a: "Two or three relevant to your role. Beyond that the return drops sharply, and a long list can signal that you collect certifications rather than solve problems.",
      },
      {
        q: "Do certifications matter at senior levels?",
        a: "Less than at junior levels, with two exceptions: consulting and partner organisations, where they carry commercial weight regardless of seniority, and moving into an unfamiliar platform, where they demonstrate current knowledge.",
      },
      {
        q: "Should I put certifications on my CV if they are expired?",
        a: "You can list them with accurate dates, but do not present an expired certification as current. If it is central to the role, renew it or leave it off — an inaccuracy discovered later is far more damaging than a shorter list.",
      },
    ],
    relatedCerts: [
      "associate-cloud-engineer",
      "professional-cloud-architect",
      "professional-cloud-security-engineer",
    ],
    relatedGuides: [
      "cloud-certification-without-experience",
      "google-cloud-certification-roadmap",
      "google-cloud-certification-guide",
    ],
    relatedLearn: ["cloud-fundamentals", "iam"],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function guideTitle(slug: string) {
  return getGuide(slug)?.title ?? slug;
}
