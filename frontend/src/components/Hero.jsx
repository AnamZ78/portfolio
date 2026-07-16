import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Magnetic, Counter, Scramble, EASE } from "../motion.jsx";
import { STATS, LINKS } from "../data.js";

function KineticLine({ text, loaded, base = 0, className }) {
  const letters = [...text];
  return (
    <span className={`kline ${className || ""}`} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          className="kletter"
          key={i}
          aria-hidden="true"
          initial={{ y: "0.7em", opacity: 0, rotate: 8 }}
          animate={loaded ? { y: 0, opacity: 1, rotate: 0 } : {}}
          transition={{ duration: 0.9, delay: base + i * 0.04, ease: EASE }}
          whileHover={{ y: -16, rotate: -5, transition: { duration: 0.25 } }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero({ loaded }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 190]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const fade = (delay) => ({
    initial: { opacity: 0, y: 28 },
    animate: loaded ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section className="hero" ref={ref} id="home">
      <motion.div className="hero-inner" style={reduced ? {} : { y, opacity, scale }}>
        <motion.div className="hero-chip" {...fade(0.15)}>
          <span className="pulse-dot" />
          <Scramble text="Open to new opportunities" />
        </motion.div>

        <h1 className="hero-name">
          <KineticLine text="Anam" loaded={loaded} base={0.28} className="row1" />
          <KineticLine text="Zahid" loaded={loaded} base={0.46} className="row2" />
        </h1>

        <motion.p className="hero-role" {...fade(0.8)}>
          Python Full-Stack Developer — <em>3+ years</em> building{" "}
          <em>fintech, HRMS, AI-evaluation</em> and <em>data platforms</em> with Django,
          FastAPI, React &amp; AWS.
        </motion.p>

        <motion.div className="hero-actions" {...fade(0.95)}>
          <Magnetic>
            <a className="btn btn-solid" href="#projects" data-hover>
              View my work <span className="btn-arrow">↓</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn btn-ghost" href={LINKS.resume} target="_blank" rel="noopener" data-hover>
              Download résumé
            </a>
          </Magnetic>
        </motion.div>

        <motion.div className="hero-stats" {...fade(1.1)}>
          {STATS.map((s) => (
            <div className="hstat" key={s.label}>
              <Counter value={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* rotating badge */}
      <motion.a
        href="#contact"
        className="hero-badge"
        aria-label="Scroll to contact"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.3, duration: 0.6, ease: EASE }}
        data-hover
      >
        <svg viewBox="0 0 120 120" className="badge-spin">
          <defs>
            <path id="circ" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
            <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f3a0b0" />
              <stop offset="0.5" stopColor="#e8798f" />
              <stop offset="1" stopColor="#c98bde" />
            </linearGradient>
          </defs>
          <text fill="url(#badgeGrad)">
            <textPath href="#circ">open to work · let's talk · open to work ·</textPath>
          </text>
        </svg>
        <span className="badge-arrow">↓</span>
      </motion.a>

      <motion.div
        className="hero-scrollline"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.55 }}
        aria-hidden="true"
      >
        <span>scroll</span>
        <i />
      </motion.div>
    </section>
  );
}
