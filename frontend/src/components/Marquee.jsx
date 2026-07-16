// Velocity-reactive marquee: base drift + acceleration and skew
// proportional to scroll velocity, direction flips with scroll direction.
import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export default function Marquee({ items, baseVelocity = 2.4, reverse = false, accent = false }) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 55, stiffness: 380 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4.5], { clamp: false });
  const skew = useTransform(smoothVelocity, [-1400, 1400], [-10, 10]);

  const dirRef = useRef(reverse ? -1 : 1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    if (reduced) return;
    let moveBy = dirRef.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    // flip drift direction with scroll direction
    if (vf < 0) dirRef.current = reverse ? 1 : -1;
    else if (vf > 0) dirRef.current = reverse ? -1 : 1;
    moveBy += moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  const seg = (key) => (
    <span className="marquee-seg" key={key} aria-hidden="true">
      {items.map((it, i) => (
        <span key={i}>
          {it} <i>✦</i>{" "}
        </span>
      ))}
    </span>
  );

  return (
    <div className={`marquee${accent ? " marquee-accent" : ""}`} aria-hidden="true">
      <motion.div className="marquee-track" style={reduced ? {} : { x, skewX: skew }}>
        {seg("a")}
        {seg("b")}
        {seg("c")}
        {seg("d")}
      </motion.div>
    </div>
  );
}
