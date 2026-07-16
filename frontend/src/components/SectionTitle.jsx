// Section header: mono index + masked title reveal + rule line,
// with a giant outlined ghost word drifting horizontally on scroll.
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { EASE } from "../motion.jsx";

export default function SectionTitle({ index, title, ghost }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const gx = useTransform(scrollYProgress, [0, 1], ["6%", "-14%"]);

  return (
    <div className="st-wrap" ref={ref}>
      <motion.span className="st-ghost" style={reduced ? {} : { x: gx }} aria-hidden="true">
        {ghost || title}
      </motion.span>
      <motion.h2
        className="section-title"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      >
        <motion.span
          className="st-index"
          variants={{ hidden: { opacity: 0, x: -18 }, show: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {index}
        </motion.span>
        <span className="st-mask">
          <motion.span
            className="st-word"
            variants={{ hidden: { y: "110%", rotate: 3 }, show: { y: 0, rotate: 0 } }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
          >
            {title}
          </motion.span>
        </span>
        <motion.span
          className="st-line"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        />
      </motion.h2>
    </div>
  );
}
