import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";
import { WordReveal, Magnetic, Roll, EASE } from "../motion.jsx";
import { LINKS } from "../data.js";

const CONTACT_LINKS = [
  { icon: "in", label: "LinkedIn", href: LINKS.linkedin },
  { icon: "✉", label: LINKS.email, href: `mailto:${LINKS.email}` },
  { icon: "☏", label: LINKS.phonePretty, href: `tel:${LINKS.phone}` },
  { icon: "N", label: "Naukri", href: LINKS.naukri },
  { icon: "gh", label: "GitHub", href: LINKS.github },
];

export default function Contact() {
  const [status, setStatus] = useState(null); // null | "sending" | "ok" | "err"

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/contact", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      let ok = false;
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        ok = (await res.json()).ok;
      } else {
        ok = res.url.includes("sent=1");
      }
      setStatus(ok ? "ok" : "err");
      if (ok) form.reset();
    } catch {
      setStatus("err");
    }
  };

  return (
    <section className="section" id="contact">
      <SectionTitle index="05" title="Contact" ghost="Say hello" />
      <div className="contact-wrap">
        <div className="contact-info">
          <WordReveal
            as="h3"
            className="contact-headline"
            text="Let's build something beautiful together."
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
          >
            I'm open to full-time roles, freelance projects and interesting collaborations —
            backend, full-stack or AI. The fastest way to reach me is email or LinkedIn.
          </motion.p>

          <div className="contact-links">
            {CONTACT_LINKS.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener"
                data-hover
                initial={{ opacity: 0, x: -26 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 + i * 0.09, duration: 0.55, ease: EASE }}
                whileHover={{ x: 8 }}
              >
                <span>{l.icon}</span>
                <Roll text={l.label} />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.form
          className="card contact-card mailform"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <AnimatePresence>
            {status === "ok" && (
              <motion.p
                className="form-status ok"
                initial={{ opacity: 0, y: -12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                ✓ Message sent — thank you! I'll get back to you soon.
              </motion.p>
            )}
            {status === "err" && (
              <motion.p
                className="form-status err"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Something went wrong — please fill in all fields and try again.
              </motion.p>
            )}
          </AnimatePresence>

          <div className="ffield">
            <input type="text" name="name" id="f-name" placeholder=" " required maxLength="80" />
            <label htmlFor="f-name">Your name</label>
          </div>
          <div className="ffield">
            <input type="email" name="email" id="f-email" placeholder=" " required maxLength="120" />
            <label htmlFor="f-email">Email</label>
          </div>
          <div className="ffield">
            <textarea name="message" id="f-msg" rows="5" placeholder=" " required maxLength="4000" />
            <label htmlFor="f-msg">What are we building?</label>
          </div>
          <Magnetic className="mag-full">
            <button className="btn btn-solid btn-full" type="submit" disabled={status === "sending"} data-hover>
              {status === "sending" ? "Sending…" : "Send message →"}
            </button>
          </Magnetic>
        </motion.form>
      </div>
    </section>
  );
}
