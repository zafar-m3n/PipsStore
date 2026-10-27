import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { Logo } from "@/components/layout/Logo.jsx";
import { MOTION, usePresence } from "@/hooks/useGsap.js";
import { NAV_LINKS } from "@/data/site.js";

const ctaClass =
  "chamfer min-h-11 items-center justify-center gap-2 whitespace-nowrap bg-brand px-5 text-small font-bold text-on-brand press hover:bg-brand-hover active:bg-brand-press";

const menuIn = (el, reduce) => {
  const to = { opacity: 1, y: 0, duration: reduce ? 0.15 : MOTION.base, ease: MOTION.easeOut, clearProps: "opacity,transform" };
  return el.style.opacity ? gsap.to(el, to) : gsap.fromTo(el, { opacity: 0, y: reduce ? 0 : -8 }, to);
};
const menuOut = (el) => gsap.to(el, { opacity: 0, y: -8, duration: 0.15, ease: "power2.out" });

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [menuMounted, menuRef] = usePresence(open, { enter: menuIn, exit: menuOut });

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
    <header className="sticky top-0 z-50 bg-ground">
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6">
        <Logo />

        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  [
                    "text-small font-medium transition-colors hover:text-ink",
                    isActive ? "text-brand" : "text-ink-soft",
                  ].join(" ")
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/academy" className={["hidden lg:inline-flex", ctaClass].join(" ")}>
          Start learning
          <Icon icon="ph:arrow-right-bold" aria-hidden="true" />
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-ink press hover:bg-surface-3 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Icon icon={open ? "ph:x-bold" : "ph:list-bold"} className="text-lead" aria-hidden="true" />
        </button>
      </nav>

      {menuMounted && (
        <div id="mobile-menu" ref={menuRef} inert={!open} className="md:hidden">
          <div className="container-page pb-4">
            <div className="panel flex flex-col gap-1 p-3 shadow-float">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    [
                      "chamfer flex min-h-12 items-center px-4 text-lead font-medium press-soft",
                      isActive ? "bg-surface-2 text-brand" : "text-ink hover:bg-surface-2",
                    ].join(" ")
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/academy" className={["mt-2 flex w-full", ctaClass].join(" ")}>
                Start learning
                <Icon icon="ph:arrow-right-bold" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
