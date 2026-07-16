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
            I'm a <b>Python Full-Stack Developer</b> who has spent the last 3+ years shipping
            production systems across four very different domains — web scraping at scale,
            fintech/NBFC lending, HRMS &amp; payroll, and now <b>AI / LLM evaluation</b>.
          </p>
          <p>
            I like owning features end-to-end: modelling the data, building the APIs, wiring
            the integrations (payments, KYC, WhatsApp, SMS, push) and getting it deployed on
            AWS with Docker &amp; Kubernetes.
          </p>
        </BentoCard>

        <BentoCard i={1} className="bento-now">
          <p className="card-label">— currently</p>
          <h3>AI &amp; LLM Evaluation @ Ethara AI</h3>
          <p className="mini">
            Personas, rubric datasets, output quality checks — plus contributions to the{" "}
            <b>ARC-AGI-3 benchmark</b>.
          </p>
        </BentoCard>

        <BentoCard i={2} className="bento-edu">
          <p className="card-label">— education</p>
          <h3>B.Tech, Computer Science</h3>
          <p className="mini">AKTU · 2019 → 2023</p>
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
          </p>
        </BentoCard>
      </div>
    </section>
  );
}
