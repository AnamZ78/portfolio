// ============================================================
// AnamOS — window manager, boot, dock, terminal
// ============================================================
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 720px)").matches;

const desktop = document.getElementById("desktop");
const WINDOWS = {};
document.querySelectorAll(".window").forEach((w) => {
  WINDOWS[w.id.replace("win-", "")] = w;
});
let zTop = 20;
desktop.classList.add("empty");

// ---------- boot sequence ----------
const boot = document.getElementById("boot");
const bootLog = document.getElementById("bootLog");
const bootFill = document.getElementById("bootFill");

const BOOT_LINES = [
  ["b-dim", "AnamOS BIOS v3.1 — initializing…"],
  ["b-ok", "[ OK ] mounting /dev/experience  (3+ years)"],
  ["b-ok", "[ OK ] loading module python.core"],
  ["b-ok", "[ OK ] loading module django · fastapi · react"],
  ["b-ok", "[ OK ] starting fintech.service · hrms.service"],
  ["b-ok", "[ OK ] attaching ai.llm_eval (ARC-AGI-3)"],
  ["b-dim", "starting desktop environment…"],
];

let booted = false;
function finishBoot() {
  if (booted) return;
  booted = true;
  boot.classList.add("done");
  desktop.classList.add("on");
  setTimeout(initialWindows, reducedMotion ? 0 : 500);
}

if (reducedMotion) {
  finishBoot();
} else {
  BOOT_LINES.forEach(([cls, text], i) => {
    setTimeout(() => {
      if (booted) return;
      const line = document.createElement("span");
      line.className = cls;
      line.textContent = text + "\n";
      bootLog.appendChild(line);
      bootFill.style.width = ((i + 1) / BOOT_LINES.length) * 100 + "%";
    }, 180 + i * 230);
  });
  setTimeout(finishBoot, 180 + BOOT_LINES.length * 230 + 420);
  boot.addEventListener("click", finishBoot);
  window.addEventListener("keydown", finishBoot, { once: true });
}

function initialWindows() {
  openWindow("terminal");
  if (!isMobile) openWindow("about");
  // handle redirect back from POST /contact
  const sent = new URLSearchParams(location.search).get("sent");
  if (sent !== null) {
    openWindow("contact");
    const status = document.getElementById("formStatus");
    status.hidden = false;
    if (sent === "1") {
      status.textContent = "✅ Message sent — I'll get back to you soon!";
      status.classList.add("ok");
    } else {
      status.textContent = "⚠️ All fields are required — please try again.";
      status.classList.add("err");
    }
    history.replaceState(null, "", location.pathname);
  }
}

// ---------- window manager ----------
function focusWindow(win) {
  document.querySelectorAll(".window.focused").forEach((w) => w.classList.remove("focused"));
  win.classList.add("focused");
  win.style.zIndex = ++zTop;
}

function openWindow(name) {
  const win = WINDOWS[name];
  if (!win) return;
  if (isMobile) {
    // one window at a time on small screens
    Object.values(WINDOWS).forEach((w) => w !== win && w.classList.remove("open"));
  }
  win.classList.remove("closing");
  win.classList.add("open");
  focusWindow(win);
  syncDock();
  if (name === "terminal" && !isMobile) setTimeout(() => document.getElementById("termInput").focus({ preventScroll: true }), 60);
}

function closeWindow(win) {
  if (win.classList.contains("closing")) return;
  if (reducedMotion) {
    win.classList.remove("open");
    syncDock();
    return;
  }
  win.classList.add("closing");
  setTimeout(() => {
    win.classList.remove("open", "closing");
    syncDock();
  }, 170);
}

function syncDock() {
  document.querySelectorAll(".dock-item[data-open]").forEach((d) => {
    const win = WINDOWS[d.dataset.open];
    d.classList.toggle("running", !!win && win.classList.contains("open"));
  });
  const anyOpen = Object.values(WINDOWS).some((w) => w.classList.contains("open"));
  desktop.classList.toggle("empty", !anyOpen);
}

// openers: desktop icons, dock, menu items
document.querySelectorAll("[data-open]").forEach((el) => {
  el.addEventListener("click", () => openWindow(el.dataset.open));
});

// window controls + focus on mousedown
Object.values(WINDOWS).forEach((win) => {
  win.addEventListener("mousedown", () => focusWindow(win));
  win.querySelectorAll(".wl").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const act = btn.dataset.act;
      if (act === "close" || act === "min") closeWindow(win);
      if (act === "max") win.classList.toggle("maxed");
    });
  });

  // dragging (pointer-captured, rAF-smoothed; never starts from the control buttons)
  const bar = win.querySelector(".win-bar");
  bar.addEventListener("pointerdown", (e) => {
    if (isMobile || e.target.closest(".win-lights") || win.classList.contains("maxed")) return;
    e.preventDefault();
    focusWindow(win);
    const rect = win.getBoundingClientRect();
    const offX = e.clientX - rect.left;
    const offY = e.clientY - rect.top;
    let nextX = rect.left, nextY = rect.top, raf = null;

    bar.setPointerCapture(e.pointerId);
    win.classList.add("dragging");

    function paint() {
      raf = null;
      win.style.setProperty("--x", nextX + "px");
      win.style.setProperty("--y", nextY + "px");
    }
    function onMove(ev) {
      nextX = Math.min(Math.max(ev.clientX - offX, -rect.width * 0.6), innerWidth - rect.width * 0.25);
      nextY = Math.min(Math.max(ev.clientY - offY, 34), innerHeight - 60);
      if (!raf) raf = requestAnimationFrame(paint);
    }
    function onUp(ev) {
      bar.releasePointerCapture(ev.pointerId);
      bar.removeEventListener("pointermove", onMove);
      bar.removeEventListener("pointerup", onUp);
      bar.removeEventListener("pointercancel", onUp);
      win.classList.remove("dragging");
    }
    bar.addEventListener("pointermove", onMove);
    bar.addEventListener("pointerup", onUp);
    bar.addEventListener("pointercancel", onUp);
  });
});

// ---------- menu clock ----------
const clockEl = document.getElementById("menuClock");
const deskClockEl = document.getElementById("deskClock");
function tickClock() {
  const d = new Date();
  const hm = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
  clockEl.textContent = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) + "  " + hm;
  deskClockEl.textContent = hm;
}
tickClock();
setInterval(tickClock, 15000);

// ============================================================
// Terminal
// ============================================================
const termOut = document.getElementById("termOut");
const termInput = document.getElementById("termInput");
const termBody = document.getElementById("termBody");
const history = [];
let histIdx = -1;

const LINKS = {
  github: "https://github.com/AnamZ78",
  linkedin: "https://www.linkedin.com/in/anamzahid126/",
  resume: "/static/assets/Anam_Zahid_Resume.pdf",
};

const NEOFETCH = `<div class="t-art"><span class="hl">        ▄▄▄▄▄▄▄▄        </span> <span class="hl">visitor</span>@<span class="hl">anamos</span>
<span class="hl">      ▄█▀▀    ▀▀█▄      </span> ─────────────────
<span class="hl">     ██   ▄██▄   ██     </span> <span class="hl">OS:</span>       AnamOS 3.0 (portfolio)
<span class="hl">     ██  ██  ██  ██     </span> <span class="hl">Host:</span>     Anam Zahid
<span class="hl">     ██   ▀██▀   ██     </span> <span class="hl">Kernel:</span>   python-3.x-fullstack
<span class="hl">      ▀█▄▄    ▄▄█▀      </span> <span class="hl">Uptime:</span>   3+ years in production
<span class="hl">        ▀▀▀▀▀▀▀▀        </span> <span class="hl">Shell:</span>    django · fastapi · react
                         <span class="hl">Location:</span> India (IST)
                         <span class="hl">Contact:</span>  anamzahid126@gmail.com</div>`;

const COMMANDS = {
  help: () => `available commands:
  <span class="hl">whoami</span>       — who is this?
  <span class="hl">neofetch</span>     — system info
  <span class="hl">experience</span>   — work history
  <span class="hl">projects</span>     — things I've built
  <span class="hl">skills</span>       — tech stack
  <span class="hl">awards</span>       — honors
  <span class="hl">contact</span>      — reach me
  <span class="hl">open</span> &lt;app&gt;   — open a window (about, projects, experience, skills, contact, terminal)
  <span class="hl">social</span>       — github / linkedin
  <span class="hl">resume</span>       — download resume
  <span class="hl">sudo hire-me</span> — 😏
  <span class="hl">clear</span>        — clear terminal`,

  whoami: () => `Anam Zahid — <span class="hl">Python Full-Stack Developer</span> (3+ years)
Fintech · HRMS · AI/LLM evaluation · Web scraping
MCA, Madan Mohan Malaviya University of Technology`,

  neofetch: () => NEOFETCH,

  experience: () => `[<span class="hl">RUNNING</span>] Feb 2026 → now   Quess Corp (Ethara AI) — AI/LLM eval, ARC-AGI-3, Odoo APIs
[EXITED 0] Aug 2025 → 02/26 Pranathi Software — BharatPayroll HRMS, ATS, payroll
[EXITED 0] Feb 2025 → 08/25 Jewar Intl Tech — fintech/NBFC backend, KYC, loans 🏆
[EXITED 0] Aug 2023 → 01/25 Masthead Tech — large-scale web scraping systems
tip: <span class="hl">open experience</span> for details`,

  projects: () => `drwxr-xr-x  <a href="${"https://github.com/AnamZ78/hrms-lite"}" target="_blank" rel="noopener">hrms-lite/</a>            React·TS·FastAPI·PostgreSQL
drwx------  nbfc-lending-backend/  Django·DRF·AWS (private)
drwx------  scraper-fleet/         Selenium·BS4·Pandas (private)
drwxr-xr-x  <a href="${"https://github.com/AnamZ78/E-Comm-Website"}" target="_blank" rel="noopener">e-comm-website/</a>       Django·MySQL
drwxr-xr-x  <a href="${"https://github.com/AnamZ78/Urlshortener"}" target="_blank" rel="noopener">url-shortener/</a>        Django
tip: <span class="hl">open projects</span> for the file manager`,

  skills: () => `python.core      [██████████░] Django · DRF · FastAPI · Flask · Odoo
database.engine  [█████████░░] PostgreSQL · MySQL · SQLAlchemy
scraping.daemon  [██████████░] Selenium · BS4 · proxies · CAPTCHA
ai.llm_eval      [█████████░░] prompting · model eval · rubric datasets
devops.ctl       [████████░░░] Docker · K8s · AWS · CI/CD
frontend.render  [████████░░░] React · JS · Node`,

  awards: () => `🏆 Best Performer — Jewar International Technologies
🌟 Rising Star — Jewar International Technologies
🎨 Best Photography/Drawing — MMMUT`,

  contact: () => `email:    <a href="mailto:anamzahid126@gmail.com">anamzahid126@gmail.com</a>
phone:    +91 84332 36275
tip: <span class="hl">open contact</span> to send a message right here`,

  social: () => `github:   <a href="${LINKS.github}" target="_blank" rel="noopener">${LINKS.github}</a>
linkedin: <a href="${LINKS.linkedin}" target="_blank" rel="noopener">${LINKS.linkedin}</a>`,

  resume: () => {
    window.open(LINKS.resume, "_blank");
    return `opening <span class="hl">Anam_Zahid_Resume.pdf</span> …`;
  },

  ls: () => `About.txt  Experience.log  Projects/  Skills.sys  Contact.app  Resume.pdf`,

  clear: () => {
    termOut.innerHTML = "";
    return null;
  },
};

function runCommand(raw) {
  const input = raw.trim();
  if (!input) return null;

  const [cmd, ...args] = input.toLowerCase().split(/\s+/);

  if (cmd === "sudo") {
    if (args.join(" ") === "hire-me")
      return `<span class="hl">Permission granted.</span> Excellent decision. 🎉
→ <a href="mailto:anamzahid126@gmail.com?subject=Let's%20work%20together">anamzahid126@gmail.com</a>`;
    return `visitor is not in the sudoers file. This incident will be reported. <span class="warn">(try: sudo hire-me)</span>`;
  }
  if (cmd === "open") {
    const app = args[0];
    if (WINDOWS[app]) {
      openWindow(app);
      return `opening <span class="hl">${app}</span> …`;
    }
    return `open: no such app: ${app || ""} <span class="warn">(apps: about, projects, experience, skills, contact, terminal)</span>`;
  }
  if (cmd === "cat" && args[0] === "about.txt") return COMMANDS.whoami();
  if (cmd === "exit") {
    closeWindow(WINDOWS.terminal);
    return null;
  }
  if (COMMANDS[cmd]) return COMMANDS[cmd]();
  return `command not found: ${cmd} <span class="warn">— type 'help'</span>`;
}

function termEcho(cmdText, resultHTML) {
  const c = document.createElement("div");
  c.className = "t-cmd";
  c.textContent = cmdText;
  termOut.appendChild(c);
  if (resultHTML) {
    const r = document.createElement("div");
    r.className = "t-res";
    r.innerHTML = resultHTML;
    termOut.appendChild(r);
  }
  termBody.scrollTop = termBody.scrollHeight;
}

termInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const val = termInput.value;
    termInput.value = "";
    if (val.trim()) {
      history.push(val);
      histIdx = history.length;
    }
    const res = runCommand(val);
    if (val.trim() && res !== null) termEcho(val, res);
    else if (val.trim() && res === null && val.trim().toLowerCase() !== "clear") termEcho(val, null);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (histIdx > 0) termInput.value = history[--histIdx] || "";
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (histIdx < history.length - 1) termInput.value = history[++histIdx] || "";
    else { histIdx = history.length; termInput.value = ""; }
  }
});

// click anywhere in terminal focuses input
termBody.addEventListener("click", () => {
  if (!window.getSelection().toString()) termInput.focus({ preventScroll: true });
});

// welcome message
const welcome = document.createElement("div");
welcome.className = "t-res";
welcome.innerHTML = isMobile
  ? `Welcome to <span class="hl">AnamOS</span> — the portfolio of <span class="hl">Anam Zahid</span>,
Python Full-Stack Developer (3+ yrs).
Type <span class="hl">help</span> to explore, or use the dock below.`
  : `${NEOFETCH}
Welcome to <span class="hl">AnamOS</span> — the portfolio of Anam Zahid.
Type <span class="hl">help</span> to explore, or click the desktop icons.`;
termOut.appendChild(welcome);
