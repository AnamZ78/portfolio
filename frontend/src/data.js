// ============================================================
// All portfolio content in one place — edit here, not in components
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
  "Docker", "LLM Evaluation", "Fintech", "HRMS", "Web Scraping",
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
      "AI & LLM model evaluation — personas, prompts, rubric-based datasets, output quality checks.",
      "Contributed training games, trajectories and an evaluation harness to the ARC-AGI-3 benchmark.",
      "Custom Odoo addons exposing REST APIs — KPI dashboards, budget tracking, role-scoped task views.",
      "Lifecycle notifications with priority escalation; Docker & Kubernetes workflows.",
    ],
  },
  {
    role: "Python Developer",
    company: "Pranathi Software",
    note: "BharatPayroll HRMS",
    date: "Aug 2025 → Feb 2026 · Remote",
    points: [
      "End-to-end payroll: salary computation, referral bonuses, statutory forms (Form 16, 3A, 15G).",
      "Designed the full offboarding module — approvals, NOC, exit interviews, Email + WhatsApp alerts.",
      "Built a complete ATS: resume/JD parsing, assessments, referral flows, pipeline tracking, HRMS sync.",
      "Scalable multi-tenant architecture with tenant-level configuration and reporting.",
    ],
  },
  {
    role: "Python/Django Developer",
    company: "Jewar International Technologies",
    note: "",
    date: "Feb 2025 → Aug 2025 · Noida",
    points: [
      "Complete fintech/NBFC backend — KYC (Aadhaar, PAN, selfie, video), OTP/MPIN auth, multi-role dashboards.",
      "Full loan lifecycle: NumPy/Pandas calculations, sanctioning, repayments, analytics; deployed on AWS.",
      "Integrated video KYC, MSG91 SMS, WhatsApp, email, push; generated legal PDFs.",
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
      "High-volume dataset processing with Pandas & SQL for analytics pipelines.",
    ],
  },
];

export const PROJECTS = [
  {
    icon: "🗃️",
    name: "hrms-lite",
    desc: "Full-stack HRMS — employees, attendance with status types & date filters, real-time analytics dashboard.",
    chips: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    href: "https://github.com/AnamZ78/hrms-lite",
    featured: true,
  },
  {
    icon: "🏦",
    name: "nbfc-lending-backend",
    desc: "Lending platform backend — full KYC, loan lifecycle to disbursement, e-sign, PDFs, multilingual, SMS/WhatsApp/push.",
    chips: ["Django", "DRF", "PostgreSQL", "AWS"],
    private: true,
  },
  {
    icon: "🕷️",
    name: "scraper-fleet",
    desc: "Distributed e-commerce scrapers — proxy rotation, CAPTCHA bypass, fault-tolerant scheduling, clean data out.",
    chips: ["Selenium", "BeautifulSoup", "Pandas"],
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
  { title: "Backend", chips: ["Python", "Django", "DRF", "FastAPI", "Flask", "Odoo"] },
  { title: "Databases", chips: ["PostgreSQL", "MySQL", "SQLAlchemy", "ORM"] },
  { title: "Frontend", chips: ["React.js", "JavaScript", "Node.js", "HTML/CSS"] },
  { title: "AI / LLM", chips: ["Prompting", "Model Evaluation", "Rubric Datasets", "ARC-AGI-3"] },
  { title: "Web Scraping", chips: ["Selenium", "BeautifulSoup", "Proxies", "CAPTCHA handling"] },
  { title: "DevOps & Cloud", chips: ["Docker", "Kubernetes", "AWS", "Git", "CI/CD"] },
  { title: "Integrations", chips: ["Payments", "KYC", "WhatsApp", "SMS", "Push"] },
  { title: "Data", chips: ["Pandas", "NumPy", "Power BI", "GraphQL"] },
];
