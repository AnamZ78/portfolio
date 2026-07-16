import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";
import { EXPERIENCE } from "../data.js";
import { EASE } from "../motion.jsx";

/* sticky-stacking cards: each card pins below the nav and gently
   scales/dims as the next one slides over it */
function StackCard({ item, i, total, progress }) {
  const reduced = useReducedMotion();
  const start = i / total;
  const targetScale = 1 - (total - 1 - i) * 0.045;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const dim = useTransform(progress, [start, 1], [0, (total - 1 - i) * 0.16]);

  return (
    <div className="stack-slot" style={{ top: `calc(110px + ${i * 26}px)` }}>
      <motion.article
        className={`card xp-card${item.current ? " xp-current" : ""}`}
        style={reduced ? {} : { scale, transformOrigin: "top center" }}
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {!reduced && <motion.div className="xp-dim" style={{ opacity: dim }} aria-hidden="true" />}
        <header>
          <div className="xp-top">
            <span className="xp-num">0{i + 1}</span>
            {item.current && <span className="badge badge-now">Current</span>}
            <span className="tdate">{item.date}</span>
          </div>
          <h3>
            {item.role} · {item.company}
            {item.note && <span className="muted"> ({item.note})</span>}
          </h3>
        </header>
        <ul>
          {item.points.map((p, j) => (
            <li key={j}>{p}</li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="section" id="experience">
      <SectionTitle index="02" title="Experience" ghost="The journey" />
      <div className="stack-wrap" ref={ref}>
        {EXPERIENCE.map((item, i) => (
          <StackCard key={item.company} item={item} i={i} total={EXPERIENCE.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
