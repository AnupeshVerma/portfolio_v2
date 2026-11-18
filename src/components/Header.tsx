import { useEffect, useState } from "react";
import { navigation, profile } from "../content";
import { useActiveSection } from "../hooks/useActiveSection";
import type { Theme } from "../hooks/useTheme";
import { Icon } from "./Icon";
import "./Header.css";

const sectionIds = navigation.map((item) => item.id);

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="header-brand" href="#top">
          {profile.shortName}
        </a>

        <nav
          id="site-navigation"
          className="header-nav"
          data-open={menuOpen}
          aria-label="Sections"
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? "true" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a className="button header-resume" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            Resume
          </a>
          <button
            type="button"
            className="icon-button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={20} />
          </button>
          <button
            type="button"
            className="icon-button header-menu-button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
