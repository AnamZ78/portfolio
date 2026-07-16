import { useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import Lenis from "lenis";

import Preloader from "./components/Preloader.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Background from "./components/Background.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { MARQUEE_SKILLS, MARQUEE_CTA } from "./data.js";

export default function App() {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("az-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("az-theme", theme);
    document.body.style.removeProperty("background");
  }, [theme]);

  // buttery smooth scrolling
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1.05 });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);

    // anchor links scroll through lenis
    const onClick = (e) => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -84, duration: 1.4 });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, [reduced]);

  // lock scroll during preloader
  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
  }, [loaded]);

  return (
    <>
      <AnimatePresence>{!loaded && <Preloader onDone={() => setLoaded(true)} />}</AnimatePresence>
      <ScrollProgress />
      <Background />
      <Nav
        loaded={loaded}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />
      <main id="top">
        <Hero loaded={loaded} />
        <Marquee items={MARQUEE_SKILLS} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Marquee items={MARQUEE_CTA} reverse accent />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
