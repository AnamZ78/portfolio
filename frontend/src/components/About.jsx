import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";
import { Tilt, EASE } from "../motion.jsx";

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay: i * 0.1, ease: EASE },
  }),
};

function BentoCard({ i, className, children }) {
  return (
    <motion.div
      custom={i}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      className={className}
      style={{ height: "100%" }}
    >
      <Tilt className="card bento-card" max={5}>
        {children}
      </Tilt>
    </motion.div>
  );
}

export default function About() {
  return (
    <section className="section" id="about">
      <SectionTitle index="01" title="About" ghost="Who I am" />
      <div className="bento">
        <BentoCard i={0} className="bento-bio">
          <div className="bio-head">
            <div className="avatar">AZ</div>
            <div>
              <h3>Anam Zahid</h3>
              <p className="muted mini">Gurugram, India</p>
            </div>
          </div>
          <p>
            I'm a <b>Python Full-Stack Developer</b> with 3+ years of experience building backend
            systems, REST APIs and web applications with Python, Django, DRF, Flask and FastAPI.
          </p>
          <p>
            My work spans <b>AI/LLM evaluation</b>, FinTech, Payroll, HRMS, ATS and web scraping.
            At Quess Corp (Client: Ethara AI) I evaluate AI agents and foundation models — prompt
            engineering, SFT dataset preparation, rubric-based evaluation and ARC-AGI-3 training
            environments — alongside backend work in Python, Odoo and REST APIs.
          </p>
          <p>
            Before that I built end-to-end payroll and HRMS workflows, ATS modules, multi-tenant
            applications and FinTech/NBFC backends covering loan management, KYC, authentication
            and third-party integrations (payments, WhatsApp, SMS, push), deployed on AWS with
            Docker &amp; Kubernetes.
          </p>
          <p>
            I enjoy hard engineering problems, scalable backend design, performance tuning and
            practical applications of AI.
          </p>
          <div className="bio-open">
            <span className="card-label">— open to</span>
            <div className="chip-row">
              {["Python Backend Engineering", "AI / LLM Engineering", "Python + GenAI"].map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
          </div>
        </BentoCard>

        <BentoCard i={1} className="bento-now">
          <p className="card-label">— currently</p>
          <h3>AI Agent &amp; Model Evaluation @ Ethara AI</h3>
          <p className="mini">
            Benchmarks, pass@k testing, SFT dataset prep and sandboxed agent runs
            (OpenHands SDK, LiteLLM, Docker) — plus training games and eval harnesses for the{" "}
            <b>ARC-AGI-3 benchmark</b>.
          </p>
        </BentoCard>

        <BentoCard i={2} className="bento-edu">
          <p className="card-label">— education</p>
          <h3>Master of Computer Applications</h3>
          <p className="mini">Madan Mohan Malaviya University of Technology, Gorakhpur · Nov 2021 → Jul 2023</p>
        </BentoCard>

        <BentoCard i={3} className="bento-stack">
          <p className="card-label">— core stack</p>
          <div className="chip-row">
            {["Python", "Django", "FastAPI", "React", "PostgreSQL", "AWS", "Docker"].map((c, i) => (
              <motion.span
                className="chip"
                key={c}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.4, type: "spring", stiffness: 300, damping: 18 }}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </BentoCard>

        <BentoCard i={4} className="bento-awards">
          <p className="card-label">— recognition</p>
          <h3>🏆 Best Performer &amp; Rising Star</h3>
          <p className="mini">
            Awarded at Jewar International for delivering the NBFC lending platform end-to-end.
            Also: Best Photography/Drawing award at MMMUT (Azadi Ka Amrit Mahotsav).
          </p>
        </BentoCard>
      </div>
    </section>
  );
}
