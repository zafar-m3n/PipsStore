import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Logo } from "@/components/layout/Logo.jsx";
import { NAV_LINKS } from "@/data/site.js";

const linkBase =
  "text-sm font-medium transition-colors hover:text-pips-accent";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-pips-line bg-pips-bg">
      <nav className="container-pips flex h-16 items-center justify-between gap-6">
        <Logo />

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                [linkBase, isActive ? "text-pips-accent" : "text-pips-ink-soft"].join(
                  " ",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/academy"
            className="inline-flex items-center gap-2 rounded-full bg-pips-accent px-5 py-2.5 text-sm font-semibold text-white shadow-pips transition-colors hover:bg-pips-accent-strong"
          >
            Start Learning
            <Icon icon="ph:arrow-right-bold" className="text-xs" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-pips-line text-pips-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Icon icon={open ? "ph:x-bold" : "ph:list-bold"} className="text-lg" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-pips-line bg-pips-bg md:hidden">
          <div className="container-pips flex flex-col gap-1 py-4">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  [
                    "rounded-xl px-3 py-2.5 text-sm font-medium",
                    isActive
                      ? "bg-pips-accent-tint text-pips-accent"
                      : "text-pips-ink-soft hover:bg-pips-surface-alt",
                  ].join(" ")
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/academy"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-pips-accent px-5 py-3 text-sm font-semibold text-white"
            >
              Start Learning
              <Icon icon="ph:arrow-right-bold" className="text-xs" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
