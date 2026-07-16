// Noir preloader: counter + italic name, exits as two shutters
// that split apart revealing the page.
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../motion.jsx";

const SHUTTER_EASE = [0.83, 0, 0.17, 1];

export default function Preloader({ onDone }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    let raf;
    const t0 = performance.now();
    const DUR = 1600;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / DUR);
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 2.4))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, onDone]);

  return (
    <motion.div className="preloader" exit={{ visibility: "hidden", transition: { delay: 1 } }}>
      <motion.div
        className="preloader-shutter top"
        exit={{ y: "-100%" }}
        transition={{ duration: 0.9, ease: SHUTTER_EASE }}
      />
      <motion.div
        className="preloader-shutter bottom"
        exit={{ y: "100%" }}
        transition={{ duration: 0.9, ease: SHUTTER_EASE }}
      />
      <motion.div
        className="preloader-content"
        exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3 } }}
      >
        <motion.span
          className="preloader-logo"
          initial={{ opacity: 0, y: 46, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Anam Zahid
        </motion.span>
        <motion.span
          className="preloader-tag"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          python · full-stack · ai
        </motion.span>
        <motion.span className="preloader-bar" style={{ scaleX: count / 100 }} />
      </motion.div>
    </motion.div>
  );
}
