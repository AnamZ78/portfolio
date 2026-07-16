// Rose-noir atmosphere: drifting aurora blobs, embers, film grain,
// and a cursor spotlight that illuminates the dark background.
import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

function Blob({ className, mx, my, factor, scrollFactor, scrollY }) {
  const y = useTransform(scrollY, (v) => -v * scrollFactor);
  const px = useTransform(mx, (v) => v * factor);
  const py = useTransform(my, (v) => v * factor * 0.7);
  return <motion.span className={`blob ${className}`} style={{ x: px, y, translateY: py }} />;
}

const CODE_ICONS = [
  { t: "</>", c: "ci1" },
  { t: "{ }", c: "ci2" },
  { t: "( ) =>", c: "ci3" },
  { t: "def", c: "ci4" },
  { t: "#", c: "ci5" },
  { t: "λ", c: "ci6" },
  { t: "<div>", c: "ci7" },
  { t: "git push", c: "ci8" },
  { t: "SELECT *", c: "ci9" },
  { t: "&&", c: "ci10" },
  { t: "🐍", c: "ci11" },
  { t: "print()", c: "ci12" },
  { t: "import", c: "ci13" },
  { t: "</html>", c: "ci14" },
];

export default function Background() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const mx = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const sx = useSpring(useMotionValue(-400), { stiffness: 55, damping: 26 });
  const sy = useSpring(useMotionValue(-400), { stiffness: 55, damping: 26 });
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, rgba(232, 121, 143, 0.085), rgba(201, 139, 222, 0.04) 42%, transparent 68%)`;

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 60);
      my.set((e.clientY / window.innerHeight - 0.5) * 60);
      sx.set(e.clientX);
      sy.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mx, my, sx, sy]);

  return (
    <div className="bg-layer" aria-hidden="true">
      <div className="bg-glow" />
      {!reduced && (
        <>
          <Blob className="b1" mx={mx} my={my} factor={0.5} scrollFactor={0.16} scrollY={scrollY} />
          <Blob className="b2" mx={mx} my={my} factor={0.9} scrollFactor={0.3} scrollY={scrollY} />
          <Blob className="b3" mx={mx} my={my} factor={0.7} scrollFactor={0.1} scrollY={scrollY} />
          <span className="ember e1" />
          <span className="ember e2" />
          <span className="ember e3" />
          <span className="ember e4" />
          <span className="ember e5" />
          <motion.div className="spotlight" style={{ background: spotlight }} />
        </>
      )}
      <div className="code-icons">
        {CODE_ICONS.map((i) => (
          <span key={i.c} className={`code-icon ${i.c}`}>
            {i.t}
          </span>
        ))}
      </div>
      <div className="grain" />
    </div>
  );
}
