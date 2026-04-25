import { useState, useEffect, useRef } from "react";

const THEMES = [
  { key: "light", label: "Light", icon: "☀️" },
  { key: "dark", label: "Dark", icon: "🌙" },
  { key: "system", label: "System Default", icon: "💻" },
];

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(pref) {
  const resolved = pref === "system" ? getSystemTheme() : pref;
  document.documentElement.setAttribute("data-theme", resolved);
}

export default function ThemeToggle() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme-pref") || "system";
  });
  const wrapperRef = useRef(null);

  // Apply on mount + whenever theme changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme-pref", theme);
  }, [theme]);

  // React to system changes when "system" is selected
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentIcon = THEMES.find((t) => t.key === theme)?.icon || "💻";

  return (
    <div className="theme-dropdown-wrapper" ref={wrapperRef}>
      <button
        className="theme-toggle-btn"
        onClick={() => setOpen(!open)}
        title="Theme preference"
        aria-label="Change theme"
      >
        {currentIcon}
      </button>

      {open && (
        <div className="theme-dropdown">
          {THEMES.map((t) => (
            <button
              key={t.key}
              className={`theme-dropdown-item${theme === t.key ? " active" : ""}`}
              onClick={() => {
                setTheme(t.key);
                setOpen(false);
              }}
            >
              <span className="theme-icon">{t.icon}</span>
              {t.label}
              {theme === t.key && (
                <span style={{ marginLeft: "auto", fontSize: "12px" }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
