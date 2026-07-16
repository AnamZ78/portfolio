// Desktop: pinned horizontal-scroll gallery — vertical scroll drives
// the row of cards sideways. Mobile / reduced-motion: staggered grid.
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";
import { Tilt, Magnetic, EASE } from "../motion.jsx";
import { PROJECTS, LINKS } from "../data.js";

function useDesktop() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 901px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const fn = (e) => setDesktop(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return desktop;
}

function ProjectCard({ p, i }) {
  const inner = (
    <Tilt className="card proj" max={6}>
      <span className="proj-ghost-num" aria-hidden="true">
        0{i + 1}
      </span>
      <div className="proj-top">
        <span className="proj-icon">{p.icon}</span>
        {p.href ? (
          <span className="proj-link" aria-hidden="true">↗</span>
        ) : (
          <span className="proj-private">private</span>
        )}
      </div>
      <h3>{p.name}</h3>
      <p>{p.desc}</p>
      <div className="chip-row">
        {p.chips.map((c) => (
          <span className="chip" key={c}>{c}</span>
        ))}
      </div>
    </Tilt>
  );
  return p.href ? (
    <a href={p.href} target="_blank" rel="noopener" className="proj-anchor" data-hover>
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function Projects() {
  const desktop = useDesktop();
  const reduced = useReducedMotion();
  const horizontal = desktop && !reduced;

  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-66%"]);
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section section-projects" id="projects">
      <SectionTitle index="03" title="Projects" ghost="Selected work" />

      {horizontal ? (
        <div className="hscroll" ref={trackRef}>
          <div className="hscroll-sticky">
            <motion.div className="hscroll-row" style={{ x }}>
              {PROJECTS.map((p, i) => (
                <div className="hscroll-cell" key={p.name}>
                  <ProjectCard p={p} i={i} />
                </div>
              ))}
              <div className="hscroll-cell hscroll-end">
                <Magnetic>
                  <a className="btn btn-ghost" href={LINKS.github} target="_blank" rel="noopener" data-hover>
                    More on GitHub ↗
                  </a>
                </Magnetic>
              </div>
            </motion.div>
            <div className="hscroll-progress" aria-hidden="true">
              <motion.span style={{ width: progressW }} />
            </div>
            <span className="hscroll-hint" aria-hidden="true">keep scrolling →</span>
          </div>
        </div>
      ) : (
        <>
          <div className="proj-grid">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 56 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.75, delay: (i % 2) * 0.1, ease: EASE }}
              >
                <ProjectCard p={p} i={i} />
              </motion.div>
            ))}
          </div>
          <div className="proj-more">
            <a className="btn btn-ghost" href={LINKS.github} target="_blank" rel="noopener" data-hover>
              More on GitHub ↗
            </a>
          </div>
        </>
      )}
    </section>
  );
}
