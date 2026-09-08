import type { CareerPage } from "@/types";

/** Original career content written by GCP Prep. */
export const careerPages: CareerPage[] = [
  {
    slug: "cloud-engineer-career-roadmap",
    title: "Cloud Engineer Career Roadmap",
    description:
      "How a cloud engineering career progresses from first role to senior and principal, and what actually moves you between levels.",
    intro:
      "Cloud engineering titles vary wildly between companies, but the underlying progression is fairly consistent. This roadmap describes what changes at each level and what genuinely gets you to the next one.",
    readingWords: 1100,
    updated: "2026-08-25",
    sections: [
      {
        heading: "Level 1 — Junior / Associate Cloud Engineer",
        body: [
          {
            type: "p",
            text: "You execute well-defined work. Someone tells you what to build and you build it, asking good questions along the way. The expectation is competence and reliability, not independent judgement.",
          },
          {
            type: "ul",
            items: [
              "Provision and configure resources from a specification",
              "Work confidently in the console and on the command line",
              "Follow runbooks and escalate appropriately",
              "Write basic automation and read other people's",
            ],
          },
          {
            type: "note",
            text: "What moves you up: consistently finishing work without needing to be chased, and starting to notice problems in the specification before you build the wrong thing.",
          },
        ],
      },
      {
        heading: "Level 2 — Cloud Engineer",
        body: [
          {
            type: "p",
            text: "You own components. Given a problem rather than a specification, you produce a solution and take responsibility for it running. This is where most of the market sits and where the work becomes genuinely interesting.",
          },
          {
            type: "ul",
            items: [
              "Design and implement a service or subsystem end to end",
              "Define infrastructure as code and own the pipeline that deploys it",
              "Participate meaningfully in on-call and incident response",
              "Understand cost implications of your choices and act on them",
              "Review other engineers' work usefully",
            ],
          },
          {
            type: "note",
            text: "What moves you up: taking responsibility for outcomes rather than tasks, and being the person others ask when something is broken.",
          },
        ],
      },
      {
        heading: "Level 3 — Senior Cloud Engineer",
        body: [
          {
            type: "p",
            text: "You own systems and influence how the team works. The technical work gets easier; the ambiguity gets harder. Much of your value is now in deciding what not to build.",
          },
          {
            type: "ul",
            items: [
              "Design systems spanning several services and teams",
              "Make and defend trade-offs under real constraints",
              "Lead incident response and run post-mortems that produce change",
              "Mentor others deliberately rather than incidentally",
              "Write design documents others can act on",
            ],
          },
          {
            type: "note",
            text: "What moves you up: influence beyond your own work. Improving how other people build things, not just building things well yourself.",
          },
        ],
      },
      {
        heading: "Level 4 — Staff / Principal, or Architect",
        body: [
          {
            type: "p",
            text: "The path forks. Staff and principal engineering roles stay close to implementation while operating across the organisation. Architecture roles focus on design, standards and direction, often with less day-to-day coding.",
          },
          {
            type: "ul",
            items: [
              "Set technical direction across multiple teams",
              "Identify problems nobody has articulated yet",
              "Balance technical quality against delivery pressure credibly",
              "Communicate with non-technical stakeholders effectively",
              "Build consensus rather than issuing decisions",
            ],
          },
          {
            type: "p",
            text: "Neither branch is more senior than the other. Choose based on whether you want to stay close to the code or move towards design and direction — plenty of people move back and forth.",
          },
        ],
      },
      {
        heading: "What actually accelerates progression",
        body: [
          {
            type: "ul",
            items: [
              "**Own something end to end.** The single fastest way to grow. Volunteer for the thing nobody wants to own.",
              "**Be on call.** Nothing teaches system behaviour like being responsible for it at three in the morning.",
              "**Write things down.** Design documents, post-mortems, runbooks. Writing is how influence scales beyond conversation.",
              "**Learn one adjacent discipline properly.** Networking, security, data or reliability — depth in one adjacent area is worth more than shallow breadth across all of them.",
              "**Change environments occasionally.** Five years of varied experience beats one year repeated five times.",
            ],
          },
        ],
      },
    ],
    relatedCerts: [
      "associate-cloud-engineer",
      "professional-cloud-architect",
      "professional-cloud-devops-engineer",
    ],
    relatedCareers: [
      "cloud-engineer-skills",
      "cloud-engineer-interview-preparation",
      "cloud-career-guide",
    ],
  },

  {
    slug: "cloud-engineer-skills",
    title: "Cloud Engineer Skills",
    description:
      "The technical and non-technical skills cloud engineering roles actually require, and the order in which to build them.",
    intro:
      "Job adverts list twenty technologies and mean about six. This is what cloud engineering roles genuinely require, roughly in the order worth learning them.",
    readingWords: 1000,
    updated: "2026-08-24",
    sections: [
      {
        heading: "The non-negotiable foundation",
        body: [
          {
            type: "ul",
            items: [
              "**Linux and the command line.** You will spend a great deal of time here. Comfort with shell, processes, permissions, networking tools and log files is assumed rather than taught.",
              "**Networking fundamentals.** IP addressing, subnets, routing, DNS, TLS and HTTP. More cloud problems are networking problems than any other kind.",
              "**One programming language.** Python is the common choice. You need enough to automate work and read other people's code, not to build applications.",
              "**Version control.** Branching, merging, pull requests and resolving conflicts without anxiety.",
            ],
          },
          {
            type: "note",
            text: "If any of these are shaky, fix them before going deeper into cloud-specific material. Every cloud topic assumes them, and gaps here slow everything else down.",
          },
        ],
      },
      {
        heading: "Core cloud skills",
        body: [
          {
            type: "ul",
            items: [
              "**Identity and access management.** The most consequential and most commonly misconfigured area. Roles, inheritance, service accounts and least privilege.",
              "**Compute.** Virtual machines, containers and serverless runtimes, and the judgement to choose between them.",
              "**Storage and databases.** Object versus block versus file, relational versus document versus wide-column, and matching each to an access pattern.",
              "**Networking in the cloud.** VPCs, subnets, firewall rules, load balancing and private connectivity to managed services.",
              "**Observability.** Metrics, logs and traces; designing alerts people act on rather than ignore.",
            ],
          },
        ],
      },
      {
        heading: "The skills that separate candidates",
        body: [
          {
            type: "ul",
            items: [
              "**Infrastructure as code.** Almost universally expected and only lightly covered by certifications. Being able to define an environment declaratively and rebuild it reliably is a strong differentiator.",
              "**CI/CD pipelines.** Building and testing automatically, promoting a single artefact through environments, and rolling back safely.",
              "**Containers, properly.** Not just running them — image layering, size, security scanning and why a small base image matters.",
              "**Cost awareness.** Very few junior engineers can discuss cost credibly. Being able to explain where money goes and how to reduce it stands out immediately.",
              "**Security thinking.** Least privilege as a habit, secrets handled properly, and understanding what a compromise would actually reach.",
            ],
          },
        ],
      },
      {
        heading: "The non-technical skills nobody lists",
        body: [
          {
            type: "ul",
            items: [
              "**Writing clearly.** Design documents, post-mortems and runbooks. Disproportionately rewarded and consistently scarce.",
              "**Debugging methodically.** Forming a hypothesis, testing it, narrowing down. The difference between fixing a problem and changing things until it goes away.",
              "**Saying no with a reason.** Pushing back on a request while explaining the trade-off, rather than either refusing or silently absorbing it.",
              "**Asking good questions.** Knowing what you do not know and asking early is a senior trait, not a junior weakness.",
              "**Staying calm during incidents.** Systems fail. The engineer who works the problem methodically while others panic becomes indispensable quickly.",
            ],
          },
        ],
      },
      {
        heading: "A sensible learning order",
        body: [
          {
            type: "ol",
            items: [
              "Linux, networking fundamentals, Git and basic Python",
              "Cloud fundamentals — hierarchy, regions, billing, IAM",
              "Compute, storage and cloud networking",
              "Containers and one orchestration platform",
              "Infrastructure as code",
              "CI/CD and deployment strategies",
              "Observability and incident practice",
              "One specialisation: security, data, networking or reliability",
            ],
          },
        ],
      },
    ],
    relatedCerts: [
      "associate-cloud-engineer",
      "professional-cloud-devops-engineer",
      "professional-cloud-architect",
    ],
    relatedCareers: [
      "cloud-engineer-career-roadmap",
      "cloud-engineer-interview-preparation",
      "cloud-certification-jobs",
    ],
  },

  {
    slug: "cloud-career-guide",
    title: "Cloud Career Guide",
    description:
      "The main cloud career directions, what each involves day to day, and how to work out which suits you.",
    intro:
      "Cloud is not one career. This guide describes the main directions, what the work actually feels like, and how to choose between them without guessing.",
    readingWords: 1100,
    updated: "2026-08-23",
    sections: [
      {
        heading: "The main directions",
        body: [
          {
            type: "table",
            head: ["Direction", "The work", "Suits you if"],
            rows: [
              [
                "Cloud / infrastructure engineering",
                "Building and running the platform other teams deploy onto.",
                "You like systems, automation and making things reliable.",
              ],
              [
                "DevOps / platform engineering",
                "Delivery pipelines, developer experience, reducing friction.",
                "You enjoy improving how other people work.",
              ],
              [
                "Site reliability engineering",
                "Availability, performance, incident response, capacity.",
                "You are drawn to failure modes and measurement.",
              ],
              [
                "Cloud architecture",
                "Designing systems and setting direction across teams.",
                "You like ambiguity, trade-offs and talking to stakeholders.",
              ],
              [
                "Data engineering",
                "Pipelines, warehouses and the platforms analytics runs on.",
                "You like data modelling and getting correctness right at scale.",
              ],
              [
                "Cloud security",
                "Identity, boundaries, detection and compliance.",
                "You think adversarially and enjoy finding what breaks.",
              ],
              [
                "Machine learning engineering",
                "Getting models into production and keeping them working.",
                "You like the intersection of software engineering and modelling.",
              ],
            ],
          },
        ],
      },
      {
        heading: "How to choose without guessing",
        body: [
          {
            type: "p",
            text: "Reading descriptions only takes you so far. The reliable method is to sample the work.",
          },
          {
            type: "ol",
            items: [
              "Spend a weekend on a small project in each direction that interests you — a deployment pipeline, a data pipeline, a security review of your own project.",
              "Notice which one you keep thinking about afterwards, and which one you had to force yourself to finish.",
              "Read three real job adverts in each direction and check whether the daily responsibilities appeal, not just the title.",
              "Talk to someone doing the job. Most people will answer a specific, respectful question about their work.",
            ],
          },
          {
            type: "note",
            text: "You are not locked in. Movement between these directions is common and the underlying skills transfer heavily. Choosing one to start is a decision about where to go deep first, not a life commitment.",
          },
        ],
      },
      {
        heading: "Getting the first role",
        body: [
          {
            type: "ul",
            items: [
              "**Adjacent routes work better than direct ones.** Support engineering, internal transfer and consultancies hire people without prior cloud experience far more readily than product engineering teams.",
              "**Consultancies and managed service providers** hire in volume and train people. The pace is demanding and the learning rate is unmatched.",
              "**Internal transfer is the easiest route of all** if you already work in IT. You have relationships and domain knowledge that external candidates do not.",
              "**Small companies value breadth.** If you can do a bit of everything, a small team is often more interested than a large specialised one.",
            ],
          },
        ],
      },
      {
        heading: "Staying employable",
        body: [
          {
            type: "ul",
            items: [
              "Learn concepts rather than products. Products get renamed; the reasons they exist do not.",
              "Keep one thing you are genuinely deep in, and enough breadth to know what you do not know.",
              "Renew certifications that match your current direction; let the rest lapse without guilt.",
              "Write about what you learn, even privately. It is how understanding consolidates.",
              "Change environments every few years. Repeated experience is not the same as accumulated experience.",
            ],
          },
        ],
      },
    ],
    relatedCerts: [
      "associate-cloud-engineer",
      "professional-data-engineer",
      "professional-cloud-security-engineer",
    ],
    relatedCareers: [
      "cloud-engineer-career-roadmap",
      "cloud-engineer-skills",
      "cloud-certification-jobs",
    ],
  },

  {
    slug: "cloud-engineer-interview-preparation",
    title: "Cloud Engineer Interview Preparation",
    description:
      "How cloud engineering interviews are structured, what each round is testing, and how to prepare for the questions that actually decide the outcome.",
    intro:
      "Cloud interviews test different things from general software interviews. This guide covers the usual structure, what each round is really assessing, and how to prepare for the parts people neglect.",
    readingWords: 1200,
    updated: "2026-08-22",
    sections: [
      {
        heading: "The typical structure",
        body: [
          {
            type: "ol",
            items: [
              "**Recruiter screen.** Confirming background and expectations. Be able to describe what you do in ninety seconds.",
              "**Technical screen.** Broad questions across cloud fundamentals, networking and Linux. Usually breadth rather than depth.",
              "**Scenario or design round.** The one that decides most outcomes. You are given a problem and asked how you would approach it.",
              "**Troubleshooting round.** A described failure, and you work through diagnosing it. Increasingly common and often the most revealing.",
              "**Behavioural round.** How you work with people, handle disagreement and respond to failure.",
            ],
          },
        ],
      },
      {
        heading: "The scenario round is what matters",
        body: [
          {
            type: "p",
            text: "You will be given something like: design a system that serves users in three regions, handles variable traffic and must recover within fifteen minutes of a regional failure. There is no single correct answer, and the interviewer is watching how you think.",
          },
          {
            type: "ol",
            items: [
              "**Ask clarifying questions first.** How many users? What is the read-write balance? What is the budget? What does the team look like? Jumping straight to a solution is the most common mistake.",
              "**State your assumptions out loud.** It shows you know what you are assuming rather than not noticing.",
              "**Start simple, then add.** Propose the simplest design that meets the requirements, then evolve it as the interviewer adds constraints.",
              "**Name trade-offs explicitly.** Every choice costs something. Saying what it costs is the strongest signal you can send.",
              "**Do not over-engineer.** Proposing a globally distributed multi-region architecture for a small internal tool signals poor judgement, not ambition.",
            ],
          },
          {
            type: "note",
            text: "Interviewers are usually more interested in the questions you ask than the architecture you produce. A candidate who identifies the right constraints and proposes something modest beats one who designs something impressive for a problem that was never stated.",
          },
        ],
      },
      {
        heading: "The troubleshooting round",
        body: [
          {
            type: "p",
            text: "A typical prompt: users report intermittent 502 errors on a service that was fine yesterday. Walk me through what you do.",
          },
          {
            type: "ul",
            items: [
              "Establish scope first — all users or some, all regions or one, when did it start, what changed.",
              "Work from the symptom towards the cause rather than guessing at causes.",
              "Say what you would look at and what you would expect to see. Being explicit about the expected result shows real diagnostic thinking.",
              "Mention rollback early. If a deployment correlates with the start, reverting first and investigating after is usually correct.",
              "Do not fixate on your first hypothesis. Interviewers often steer you away from it deliberately to see whether you adapt.",
            ],
          },
        ],
      },
      {
        heading: "Questions worth preparing properly",
        body: [
          {
            type: "ul",
            items: [
              "Walk me through a system you designed or operated, and what you would change now.",
              "Tell me about an outage you were involved in. What happened and what did you learn?",
              "How would you decide between a managed service and running it yourself?",
              "How do you approach securing access for an application that needs to read from a database?",
              "How would you reduce the cost of an environment by thirty per cent?",
              "Explain something technical to someone non-technical — often asked directly.",
            ],
          },
          {
            type: "p",
            text: "For each of these, prepare a specific example rather than a general answer. Specifics are what interviewers remember and what distinguishes you from candidates giving textbook responses.",
          },
        ],
      },
      {
        heading: "The failure story",
        body: [
          {
            type: "p",
            text: "Almost every interview asks some version of this, and it is the single most valuable thing to prepare. A good failure story has four parts: what happened, what you did, what the outcome was, and what changed afterwards.",
          },
          {
            type: "ul",
            items: [
              "Choose something genuinely your responsibility. Blaming someone else defeats the purpose of the question.",
              "Be specific about the technical detail. Vagueness reads as invention.",
              "Focus most of the answer on the diagnosis and the fix, not on the failure itself.",
              "End with the systemic change — the alert you added, the process you changed. This is what the interviewer is listening for.",
            ],
          },
        ],
      },
      {
        heading: "Questions to ask them",
        body: [
          {
            type: "ul",
            items: [
              "What does on-call look like, and how often does it actually page?",
              "How do changes reach production, and how long does that usually take?",
              "What is the most frustrating part of the current setup?",
              "How does the team decide what to work on?",
              "What would you want the person in this role to have achieved after six months?",
            ],
          },
          {
            type: "note",
            text: "The answer to the on-call question tells you more about a team's engineering culture than anything on their careers page.",
          },
        ],
      },
    ],
    relatedCerts: ["associate-cloud-engineer", "professional-cloud-architect"],
    relatedCareers: [
      "cloud-engineer-resume-guide",
      "cloud-engineer-skills",
      "cloud-engineer-career-roadmap",
    ],
  },

  {
    slug: "cloud-engineer-resume-guide",
    title: "Cloud Engineer Resume Guide",
    description:
      "How to write a cloud engineering CV that gets past screening and gives interviewers something to ask about.",
    intro:
      "A cloud CV has two audiences: an automated filter and a human who will spend thirty seconds on it. This guide covers writing for both without compromising either.",
    readingWords: 900,
    updated: "2026-08-21",
    sections: [
      {
        heading: "Structure that works",
        body: [
          {
            type: "ol",
            items: [
              "**Name and contact.** Include a link to something you built or wrote.",
              "**Summary — two or three lines.** What you do, what you specialise in, what you are looking for. Not a list of adjectives.",
              "**Skills.** Grouped by category, honest about level. This is what the automated filter reads.",
              "**Experience.** Reverse chronological, achievements rather than responsibilities.",
              "**Projects.** Essential if your professional experience is limited; useful even when it is not.",
              "**Certifications.** With dates. Recency matters.",
              "**Education.** Brief, and last, unless you graduated very recently.",
            ],
          },
        ],
      },
      {
        heading: "Write achievements, not duties",
        body: [
          {
            type: "p",
            text: "The most common weakness in cloud CVs is describing what the job involved rather than what you accomplished. Compare:",
          },
          {
            type: "table",
            head: ["Weak", "Strong"],
            rows: [
              [
                "Responsible for managing cloud infrastructure.",
                "Migrated 40 services from virtual machines to containers, cutting compute spend by 35%.",
              ],
              [
                "Worked with CI/CD pipelines.",
                "Rebuilt the deployment pipeline, reducing release time from 4 hours to 20 minutes.",
              ],
              [
                "Handled monitoring and alerting.",
                "Redesigned alerting around SLOs, cutting out-of-hours pages by 70% with no loss of coverage.",
              ],
              [
                "Assisted with security improvements.",
                "Removed 200+ long-lived service account keys by moving workloads to workload identity.",
              ],
            ],
          },
          {
            type: "note",
            text: "Numbers are what make these work. If you do not have exact figures, an honest approximation is fine — 'roughly a third' is better than no quantity at all.",
          },
        ],
      },
      {
        heading: "Getting past the filter",
        body: [
          {
            type: "ul",
            items: [
              "Use the same terminology as the job advert. If they say Kubernetes and you wrote K8s, write both.",
              "Spell out product names in full at least once. Filters match on exact strings more often than you would hope.",
              "Keep the format simple — no tables, columns or graphics in the file itself. Many parsers handle them badly.",
              "Include your certification names exactly as they are officially written.",
              "Do not stuff keywords into a block at the end. It is obvious to humans and increasingly detected automatically.",
            ],
          },
        ],
      },
      {
        heading: "The projects section",
        body: [
          {
            type: "p",
            text: "If your professional cloud experience is limited, this section carries the CV. Treat it as seriously as the experience section.",
          },
          {
            type: "ul",
            items: [
              "Give each project a one-line description of what it does and why you built it.",
              "State the technical decisions you made, not just the technologies you used.",
              "Link to the code or to a write-up. A link that works is worth more than another bullet point.",
              "Include something that went wrong and what you did about it, if there is room.",
              "Two or three substantial projects beat six tutorials.",
            ],
          },
        ],
      },
      {
        heading: "Common mistakes",
        body: [
          {
            type: "ul",
            items: [
              "**Listing every technology ever touched.** It dilutes the things you are genuinely good at, and you will be asked about anything listed.",
              "**Claiming expertise you cannot defend.** Interviewers probe the CV directly. Being caught overstating is worse than a shorter list.",
              "**More than two pages.** One page early in a career, two at most later.",
              "**No links.** A CV with nothing to look at is harder to distinguish from every other CV.",
              "**Generic summary lines.** 'Passionate about technology' says nothing. Say what you actually do.",
            ],
          },
        ],
      },
    ],
    relatedCerts: ["associate-cloud-engineer", "professional-cloud-architect"],
    relatedCareers: [
      "cloud-engineer-interview-preparation",
      "cloud-engineer-skills",
      "cloud-certification-jobs",
    ],
  },

  {
    slug: "cloud-certification-jobs",
    title: "Jobs That Value Cloud Certifications",
    description:
      "Which roles and employers genuinely weight cloud certifications, and how to target your applications accordingly.",
    intro:
      "Certifications matter far more in some places than others. Knowing where they carry weight lets you aim your applications at employers who will actually value the work you put in.",
    readingWords: 900,
    updated: "2026-08-20",
    sections: [
      {
        heading: "Where certifications count most",
        body: [
          {
            type: "ul",
            items: [
              "**Google Cloud partners and consultancies.** Partner status depends on maintaining a number of certified staff, which makes your certification directly commercially valuable to them. This is by far the strongest signal in the market.",
              "**Systems integrators and managed service providers.** Same commercial logic, often across multiple cloud vendors. They hire in volume and frequently fund further certifications.",
              "**Pre-sales and solutions architecture.** Customer-facing credibility is part of the role, and certifications are visible proof of it.",
              "**Public sector and regulated industries.** Procurement and compliance processes frequently specify certified staff explicitly.",
              "**Large enterprises with formal job architectures.** Levelling frameworks sometimes list certifications as criteria for progression.",
            ],
          },
        ],
      },
      {
        heading: "Where they count less",
        body: [
          {
            type: "ul",
            items: [
              "**Startups and small product companies.** They hire almost entirely on demonstrated ability to build. A certification does no harm but carries little weight.",
              "**Senior individual contributor roles.** Your track record does the work. Certifications become a footnote.",
              "**Companies with strong internal engineering cultures.** Many run their own assessments and place little weight on external credentials.",
            ],
          },
          {
            type: "note",
            text: "This is not a reason to skip certification — it is a reason to target applications. If you have invested in certifications, apply where they are worth something.",
          },
        ],
      },
      {
        heading: "Roles by certification",
        body: [
          {
            type: "table",
            head: ["Certification", "Roles it maps to"],
            rows: [
              [
                "Associate Cloud Engineer",
                "Cloud engineer, cloud support engineer, junior DevOps, infrastructure engineer.",
              ],
              [
                "Professional Cloud Architect",
                "Cloud architect, solutions architect, technical lead, principal engineer, consultant.",
              ],
              [
                "Professional Cloud Developer",
                "Backend engineer, cloud application developer, platform engineer.",
              ],
              [
                "Professional Data Engineer",
                "Data engineer, analytics engineer, data platform engineer.",
              ],
              [
                "Professional Cloud DevOps Engineer",
                "DevOps engineer, site reliability engineer, release engineer.",
              ],
              [
                "Professional Cloud Security Engineer",
                "Cloud security engineer, security architect, GRC engineer.",
              ],
              [
                "Professional Cloud Network Engineer",
                "Cloud network engineer, network architect. A scarce specialism.",
              ],
              [
                "Professional Machine Learning Engineer",
                "ML engineer, MLOps engineer, AI engineer.",
              ],
              [
                "Cloud Digital Leader",
                "Pre-sales, product management, consulting, delivery management.",
              ],
            ],
          },
        ],
      },
      {
        heading: "How to target applications",
        body: [
          {
            type: "ol",
            items: [
              "Search for Google Cloud partners in your region. Their partner directory listings are public and they hire continuously.",
              "Filter job searches on the exact certification name — employers who value it usually name it in the advert.",
              "Mention the certification in the first three lines of your CV summary if the advert names it.",
              "Apply to consultancies even if the work sounds less glamorous. The exposure and learning rate in the first two years is genuinely hard to match elsewhere.",
              "For internal moves, ask whether your employer is a partner. If so, your certification helps them directly and that is a strong argument for a transfer.",
            ],
          },
        ],
      },
    ],
    relatedCerts: [
      "associate-cloud-engineer",
      "professional-cloud-architect",
      "professional-data-engineer",
    ],
    relatedCareers: [
      "cloud-engineer-resume-guide",
      "cloud-career-guide",
      "cloud-engineer-interview-preparation",
    ],
  },
];

export function getCareerPage(slug: string) {
  return careerPages.find((c) => c.slug === slug);
}

export function careerTitle(slug: string) {
  return getCareerPage(slug)?.title ?? slug;
}
