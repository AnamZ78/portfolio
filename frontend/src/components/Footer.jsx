import { useState, useEffect } from "react";
import { Roll } from "../motion.jsx";

function LocalClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="footer-clock" title="My local time">
      <i className="pulse-dot" /> Gurugram, IN — {time}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row">
        <p>© {new Date().getFullYear()} Anam Zahid</p>
        <LocalClock />
        <div className="footer-links">
          <a href="#top"><Roll text="Back to top ↑" /></a>
        </div>
      </div>
    </footer>
  );
}
