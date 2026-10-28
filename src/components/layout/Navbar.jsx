import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import Logo from "@/components/layout/Logo.jsx";
import { MOTION, usePresence } from "@/hooks/useGsap.js";
import { NAV_LINKS } from "@/data/site.js";

const ctaClass =
  "min-h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-brand px-4 text-small font-semibold text-on-brand press hover:bg-brand-hover active:bg-brand-press";

const menuIn = (el, reduce) => {
  const to = { opacity: 1, y: 0, duration: reduce ? 0.15 : MOTION.base, ease: MOTION.easeOut, clearProps: "opacity,transform" };
  return el.style.opacity ? gsap.to(el, to) : gsap.fromTo(el, { opacity: 0, y: reduce ? 0 : -8 }, to);
};
const menuOut = (el) => gsap.to(el, { opacity: 0, y: -8, duration: 0.15, ease: "power2.out" });

/* A floating glass bar. Past the first few pixels of scroll it narrows and
   lifts, so it reads as part of the page at the top and as a tool below. */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const lifted = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        aria-label="Main"
        className={[
          "glass-bar mx-auto flex h-14 items-center justify-between gap-4 rounded-full pr-2 pl-4 sm:pl-5",
          "transition-[max-width,background-color,box-shadow] duration-500 ease-out motion-reduce:transition-none",
          lifted ? "max-w-5xl shadow-float" : "max-w-[74rem]",
        ].join(" ")}
      >
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  [
                    "inline-flex min-h-9 items-center rounded-full px-3.5 text-small font-medium transition-colors",
                    isActive ? "bg-line text-ink" : "text-ink-soft hover:text-ink",
                  ].join(" ")
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link to="/academy" className={["hidden sm:inline-flex", ctaClass].join(" ")}>
            Start free
            <Icon icon="ph:arrow-right-bold" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink press hover:border-line-strong hover:bg-line md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Icon icon={open ? "ph:x-bold" : "ph:list-bold"} className="text-lead" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {menuMounted && (
        <div id="mobile-menu" ref={menuRef} inert={!open} className="md:hidden">
          <div className="glass mx-auto mt-2 flex max-w-5xl flex-col p-3 shadow-float">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  [
                    "flex min-h-14 items-center justify-between rounded-md px-4 text-title press-soft",
                    isActive ? "text-brand" : "text-ink hover:bg-line",
                  ].join(" ")
                }
              >
                {l.label}
                <Icon icon="ph:arrow-right" aria-hidden="true" className="text-lead text-ink-muted" />
              </NavLink>
            ))}
            <Link to="/academy" className={["mt-3 flex min-h-12 w-full text-body", ctaClass].join(" ")}>
              Start free
              <Icon icon="ph:arrow-right-bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
