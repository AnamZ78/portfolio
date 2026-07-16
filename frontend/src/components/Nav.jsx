import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Magnetic, Roll, EASE } from "../motion.jsx";
import { LINKS } from "../data.js";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ loaded, theme, onToggleTheme }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 340 && !open);
    setScrolled(y > 40);
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(`#${en.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.header
        className={`nav${scrolled ? " scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -96 : 0, opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <a className="nav-logo" href="#top">
          Anam<span>Zahid</span>
          <i className="logo-star">✦</i>
        </a>
        <nav className="nav-links">
          {NAV_ITEMS.map((it) => (
            <a key={it.href} href={it.href} className={active === it.href ? "active" : ""}>
              <Roll text={it.label} />
              {active === it.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </a>
          ))}
        </nav>
        <motion.button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          whileTap={{ scale: 0.82 }}
          data-hover
        >
          <motion.span
            key={theme}
            initial={{ rotate: -120, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {theme === "dark" ? "☾" : "☀"}
          </motion.span>
        </motion.button>
        <div className="nav-cta">
          <Magnetic strength={0.2}>
            <a className="btn btn-ghost btn-sm" href={LINKS.resume} target="_blank" rel="noopener">
              Résumé
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a className="btn btn-solid btn-sm" href="#contact">
              Hire me
            </a>
          </Magnetic>
        </div>
        <button
          className={`nav-burger${open ? " open" : ""}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
          >
            <nav>
              {NAV_ITEMS.map((it, i) => (
                <motion.a
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 34, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.5, ease: EASE }}
                >
                  <span className="mm-index">0{i + 1}</span>
                  {it.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="mm-foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
