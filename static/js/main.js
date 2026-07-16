// ============================================================
// Anam Zahid — portfolio · animations & interactions
// intro curtain · word reveal · stagger · counters · parallax
// cursor ring · magnetic buttons · tilt cards · nav behavior
// ============================================================
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

// ---------- intro curtain ----------
const curtain = document.querySelector(".intro-curtain");
if (curtain) {
  if (reducedMotion) {
    curtain.remove();
  } else {
    document.body.classList.add("loading");
    requestAnimationFrame(() => {
      curtain.classList.add("up");
      document.body.classList.remove("loading");
      setTimeout(() => curtain.remove(), 1400);
    });
  }
}

// ---------- hero name word-mask reveal ----------
const heroName = document.querySelector(".hero-name");
if (heroName && !reducedMotion) {
  const words = heroName.textContent.trim().split(/\s+/);
  heroName.classList.add("split");
  heroName.innerHTML = words
    .map((w, i) => `<span class="w"><span class="wi" style="--d:${i * 0.14}s">${w}</span></span>`)
    .join(" ");
}

// ---------- scroll reveal with per-group stagger ----------
const revealEls = document.querySelectorAll(".reveal");

// index each reveal element within its parent so siblings cascade
const groupCount = new Map();
revealEls.forEach((el) => {
  const p = el.parentElement;
  const i = groupCount.get(p) || 0;
  el.dataset.ri = i;
  groupCount.set(p, i + 1);
});

// count-up stats
function animateCount(b) {
  if (b.dataset.done) return;
  b.dataset.done = "1";
  const target = parseInt(b.dataset.count, 10);
  const suffix = b.dataset.suffix || "";
  const dur = 1300;
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    b.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const inHero = el.closest(".hero") !== null;
        const base = inHero && performance.now() < 2500 ? 0.55 : 0;
        const delay = base + Math.min(el.dataset.ri * 0.08, 0.48);
        el.style.setProperty("--rd", delay.toFixed(2) + "s");
        el.classList.add("in");
        setTimeout(() => el.style.removeProperty("--rd"), (delay + 0.7) * 1000);
        el.querySelectorAll("[data-count]").forEach(animateCount);
        io.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
}

// ---------- scroll: progress bar, nav hide/shrink, parallax ----------
const progressBar = document.querySelector(".scroll-progress");
const nav = document.querySelector(".nav");
const floaters = document.querySelectorAll(".floater");
let lastY = 0;
let scrollTicking = false;

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
  nav.classList.toggle("scrolled", y > 40);
  if (!nav.classList.contains("menu-open")) {
    nav.classList.toggle("hide", y > lastY && y > 320);
  }
  lastY = y;
  if (!reducedMotion) {
    floaters.forEach((f) => {
      f.style.setProperty("--py", -(y * parseFloat(f.dataset.speed)) + "px");
    });
  }
  scrollTicking = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true }
);
onScroll();

// ---------- mouse: parallax drift, cursor ring, card shine ----------
if (finePointer && !reducedMotion) {
  const ring = document.querySelector(".cursor-ring");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  let ringOn = false;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!ringOn && ring) {
      ring.classList.add("on");
      rx = mx; ry = my;
      ringOn = true;
    }
    // floaters drift gently toward the cursor
    const dx = e.clientX / innerWidth - 0.5;
    const dy = e.clientY / innerHeight - 0.5;
    floaters.forEach((f, i) => {
      f.style.setProperty("--pxm", dx * (i + 1) * 9 + "px");
      f.style.setProperty("--pym", dy * (i + 1) * 7 + "px");
    });
  });

  if (ring) {
    (function ringLoop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(ringLoop);
    })();
    document.querySelectorAll("a, button, .card").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("grow"));
      el.addEventListener("mouseleave", () => ring.classList.remove("grow"));
    });
  }

  // shine follows the cursor inside cards
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  // magnetic buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--tx", (e.clientX - r.left - r.width / 2) * 0.22 + "px");
      btn.style.setProperty("--ty", (e.clientY - r.top - r.height / 2) * 0.32 + "px");
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.setProperty("--tx", "0px");
      btn.style.setProperty("--ty", "0px");
    });
  });

  // 3D tilt on project + stat cards
  document.querySelectorAll(".proj, .hstat").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      el.style.transition = "transform 0.12s ease-out, box-shadow 0.25s, border-color 0.2s";
    });
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) translateY(-4px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
      setTimeout(() => (el.style.transition = ""), 300);
    });
  });
}

// ---------- active nav link highlighting ----------
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
if (navLinks.length && "IntersectionObserver" in window) {
  const linkFor = {};
  navLinks.forEach((a) => (linkFor[a.getAttribute("href").slice(1)] = a));
  const secObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove("active"));
          const link = linkFor[entry.target.id];
          if (link) link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  document.querySelectorAll("section[id]").forEach((s) => secObs.observe(s));
}

// ---------- mobile menu ----------
const burger = document.getElementById("navBurger");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("menu-open");
  nav.classList.remove("hide");
  burger.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    nav.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
  });
});

// ---------- contact form status (POST /contact redirects to /?sent=1#contact) ----------
const sent = new URLSearchParams(location.search).get("sent");
if (sent !== null) {
  const status = document.getElementById("formStatus");
  status.hidden = false;
  if (sent === "1") {
    status.textContent = "Message sent — thank you! I'll get back to you soon.";
    status.classList.add("ok");
  } else {
    status.textContent = "Something went wrong — please fill in all fields and try again.";
    status.classList.add("err");
  }
  history.replaceState(null, "", location.pathname + "#contact");
}

// ---------- footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
