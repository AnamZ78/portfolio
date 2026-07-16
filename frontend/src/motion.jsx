// ============================================================
// Shared motion primitives — Reveal, Tilt, Magnetic, Counter,
// Scramble, Roll (split-letter hover), WordReveal
// ============================================================
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  useReducedMotion,
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/* ---------- scroll-into-view reveal ---------- */
export function Reveal({ children, delay = 0, y = 44, className, once = true, ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ---------- 3D tilt card with cursor-tracked glow ---------- */
export function Tilt({ children, className, max = 8, ...rest }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 260, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 260, damping: 22 });

  const onMove = (e) => {
    if (reduced) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * max);
    ry.set(px * max);
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ---------- magnetic hover ---------- */
export function Magnetic({ children, strength = 0.28, className }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 });

  const onMove = (e) => {
    if (reduced) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ---------- count-up number ---------- */
export function Counter({ value, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  return (
    <b ref={ref}>
      {display}
      {suffix}
    </b>
  );
}

/* ---------- decode / scramble text ---------- */
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#░▒";
export function Scramble({ text, className, as: Tag = "span" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30px 0px" });
  const reduced = useReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setOut(text);
      return;
    }
    let raf;
    let frame = 0;
    const perChar = 2.4;
    const tick = () => {
      frame++;
      const reveal = Math.floor(frame / perChar);
      setOut(
        text
          .split("")
          .map((c, i) => {
            if (i < reveal) return c;
            if (c === " ") return " ";
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (reveal < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, reduced]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {out || " "}
    </Tag>
  );
}

/* ---------- split-letter rolling hover text ----------
   wrap in a parent with class "roll-parent" (or any a/button) */
export function Roll({ text, className }) {
  const letters = [...text];
  const spans = (cls) => (
    <span className={cls} aria-hidden="true">
      {letters.map((c, i) => (
        <span key={i} style={{ transitionDelay: `${i * 16}ms` }}>
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
  return (
    <span className={`roll ${className || ""}`} aria-label={text}>
      {spans("roll-a")}
      {spans("roll-b")}
    </span>
  );
}

/* ---------- per-word masked text reveal ----------
   whileInView lives on the unclipped container; words animate via variants
   (a clipped word can never trigger its own IntersectionObserver) */
export function WordReveal({ text, className, delay = 0, as: Tag = "span" }) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ staggerChildren: 0.07, delayChildren: delay }}
        aria-hidden="true"
      >
        {words.map((w, i) => (
          <span key={i}>
            <span className="wmask">
              <motion.span
                className="wword"
                variants={{ hidden: { y: "115%" }, show: { y: 0 } }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
