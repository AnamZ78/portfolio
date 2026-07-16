import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";
import { SKILLS } from "../data.js";
import { EASE } from "../motion.jsx";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <SectionTitle index="04" title="Skills" ghost="The toolkit" />
      <div className="skills-grid">
        {SKILLS.map((s, i) => (
          <motion.div
            className="card skill"
            key={s.title}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: EASE }}
          >
            <h3>{s.title}</h3>
            <div className="chip-row">
              {s.chips.map((c, j) => (
                <motion.span
                  className="chip"
                  key={c}
                  initial={{ opacity: 0, scale: 0.55 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.25 + j * 0.05,
                    type: "spring",
                    stiffness: 320,
                    damping: 17,
                  }}
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
