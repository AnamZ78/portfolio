// ============================================================
// All portfolio content in one place — edit here, not in components
// Source of truth: Anam_Resume.pdf (updated Oct 2026)
// ============================================================

export const LINKS = {
  github: "https://github.com/AnamZ78",
  linkedin: "https://www.linkedin.com/in/anamzahid126/",
  resume: "/static/assets/Anam_Zahid_Resume.pdf",
  email: "anamzahid126@gmail.com",
  naukri: "https://www.naukri.com/mnjuser/profile?id=&altresid",
  phone: "+918433236275",
  phonePretty: "+91 84332 36275",
};

export const STATS = [
  { value: 3, suffix: "+", label: "years of experience" },
  { value: 4, suffix: "", label: "companies · 4 domains" },
  { value: 15, suffix: "+", label: "projects shipped" },
  { value: 2, suffix: "", label: "performance awards" },
];

export const MARQUEE_SKILLS = [
  "Python", "Django", "FastAPI", "React", "PostgreSQL", "AWS",
  "Docker", "AI Agent Evaluation", "LLM Testing", "Fintech", "HRMS", "Web Scraping",
];

export const MARQUEE_CTA = [
  "Open to opportunities", "Let's build something", "Remote friendly", "Backend · Full-stack · AI",
];

export const EXPERIENCE = [
  {
    current: true,
    role: "Python Full-Stack Developer",
    company: "Quess Corp",
    note: "Client: Ethara AI",
    date: "Feb 2026 → now · Gurugram",
    points: [
      "Evaluate AI agents and foundation models for accuracy, latency, cost and reliability using internal benchmarks and pass@k testing.",
      "Prepare SFT datasets — cleaning, de-duplication, format standardisation and quality checks for supervised fine-tuning.",
      "Test models on reasoning, information-extraction and summarisation tasks with Python & pytest; sandboxed agent runs via OpenHands SDK, LiteLLM, Docker and nftables.",
      "Built training games, trajectories and evaluation harnesses for ARC-AGI-3, with quality checks on prompts, datasets and outputs.",
      "Custom Odoo addons & REST APIs for KPI dashboards, analytics, budget tracking and task management (ORM + caching); automated notifications and a centralised log feed.",
    ],
  },
  {
    role: "Python Developer",
    company: "Pranathi Software",
    note: "BharatPayroll HRMS",
    date: "Aug 2025 → Feb 2026 · Remote",
    points: [
      "End-to-end payroll: overdays & salary-credit computation, referral-bonus automation, statutory forms (Form 16, 3A, 15G).",
      "Designed the full offboarding module solo — resignation, HR/manager approvals, NOC clearance, exit interviews, Email + WhatsApp alerts.",
      "Built a complete ATS: resume/JD parsing, job orders, online assessments, referral flows, stage timelines, pipeline tracking and HRMS sync for onboarding.",
      "Employee referral system with automated incentives; scalable multi-tenant architecture with tenant-level config, leave/attendance rules and audit reports.",
    ],
  },
  {
    role: "Python/Django Developer",
    company: "Jewar International Technologies",
    note: "Mobile app: Anekk Fintech",
    date: "Feb 2025 → Aug 2025 · Noida",
    points: [
      "Complete fintech/NBFC backend — KYC (Aadhaar, PAN, selfie, video), OTP/MPIN auth, multi-role dashboards, multilingual support.",
      "Full loan lifecycle: NumPy/Pandas calculations, sanctioning, disbursement, repayments, analytics; deployed on AWS.",
      "Optimised DRF APIs with ORM + raw SQL; integrated video KYC, MSG91 SMS, WhatsApp, email, push; generated KFS, agreement and sanction-letter PDFs.",
      "🏆 Best Performer & Rising Star awards.",
    ],
  },
  {
    role: "Python Developer",
    company: "Masthead Technologies",
    note: "",
    date: "Aug 2023 → Jan 2025 · Noida",
    points: [
      "Large-scale scraping systems for Walmart, Home Depot, Wayfair, Amazon, Lumens, Target.",
      "Proxy rotation, CAPTCHA handling, dynamic waits, anti-bot bypass — reliable extraction at scale.",
      "Automated recurring scraping workflows with fault tolerance; high-volume dataset processing with Pandas & SQL.",
      "Documented scraping architectures, workflows and monitoring for maintainability.",
    ],
  },
];

export const PROJECTS = [
  {
    icon: "🗃️",
    name: "hrms-lite",
    desc: "Production-ready full-stack HRMS — employee management, attendance (Present/Absent/Late/Half Day) with date filters & per-employee summaries, live dashboard analytics. FastAPI + SQLAlchemy + Pydantic.",
    chips: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    href: "https://github.com/AnamZ78/hrms-lite",
    featured: true,
  },
  {
    icon: "🏦",
    name: "anekk-nbfc-backend",
    desc: "NBFC mobile-app backend — full KYC (Aadhaar, PAN, video, selfie), loan application to disbursement, e-sign, PDFs, multilingual, SMS/WhatsApp/email/push.",
    chips: ["Django", "DRF", "PostgreSQL", "AWS"],
    private: true,
  },
  {
    icon: "🕷️",
    name: "scraper-fleet",
    desc: "Automated e-commerce scrapers — proxy rotation, CAPTCHA bypass, dynamic waits, fault-tolerant scheduling, structured storage for analytics.",
    chips: ["Selenium", "BeautifulSoup", "Pandas", "MySQL"],
    private: true,
  },
  {
    icon: "🛒",
    name: "e-comm-website",
    desc: "Fully functional store — product browsing, cart management, seamless order placement.",
    chips: ["Django", "MySQL", "JavaScript"],
    href: "https://github.com/AnamZ78/E-Comm-Website",
  },
  {
    icon: "🔗",
    name: "url-shortener",
    desc: "Short links with per-link expiration — auto-deactivate after N hours.",
    chips: ["Python", "Django"],
    href: "https://github.com/AnamZ78/Urlshortener",
  },
  {
    icon: "✅",
    name: "taskmanager",
    desc: "Task management app with clean CRUD workflows and ORM-driven queries.",
    chips: ["Python", "Django", "SQLite"],
    href: "https://github.com/AnamZ78/taskmanager",
  },
];

export const SKILLS = [
  { title: "Backend", chips: ["Python", "Django", "DRF", "Django Channels", "FastAPI", "Flask", "Odoo"] },
  { title: "Databases", chips: ["PostgreSQL", "MySQL", "SQLite", "SQLAlchemy", "Django ORM"] },
  { title: "Frontend", chips: ["React.js", "JavaScript", "Node.js", "HTML/CSS"] },
  { title: "AI / LLM", chips: ["Agent Evaluation", "Prompt Engineering", "SFT", "Rubric-Based Eval", "pass@k", "Model Testing"] },
  { title: "AI Tools", chips: ["OpenHands SDK", "LiteLLM", "pytest", "Frontier-Model APIs", "nftables"] },
  { title: "Web Scraping", chips: ["Selenium", "BeautifulSoup", "Requests", "XPath", "Proxy Rotation", "CAPTCHA handling"] },
  { title: "DevOps & Cloud", chips: ["Docker", "Kubernetes", "AWS (EC2, S3)", "Git", "GitHub"] },
  { title: "Integrations", chips: ["Payments", "KYC", "WhatsApp", "MSG91 SMS", "Email", "Push"] },
  { title: "Data & APIs", chips: ["Pandas", "NumPy", "Data Cleaning", "RESTful", "GraphQL", "Power BI"] },
];
