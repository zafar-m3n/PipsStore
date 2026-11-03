import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import Logo from "@/components/layout/Logo.jsx";
import { MOTION, usePresence } from "@/hooks/useGsap.js";
import { NAV_LINKS } from "@/data/site.js";

const ctaClass =
  "min-h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-brand px-4 text-small font-semibold text-on-brand press hover:bg-brand-hover active:bg-brand-press";

/* The mobile drawer slides in from the left over a dimmed backdrop; under
   reduced motion it only fades. An interrupted close reverses from where it is. */
const drawerIn = (el, reduce) => {
  const panel = el.querySelector("[data-drawer-panel]");
  const scrim = el.querySelector("[data-drawer-scrim]");
  const tl = gsap.timeline();
  tl.to(scrim, { opacity: 1, duration: reduce ? 0.15 : 0.3, ease: MOTION.easeOut }, 0);
  if (reduce) {
    tl.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0);
  } else {
    const from = panel.style.transform ? gsap.getProperty(panel, "xPercent") : -100;
    tl.fromTo(panel, { xPercent: from }, { xPercent: 0, duration: 0.35, ease: MOTION.easeOut }, 0);
  }
  return tl;
};
const drawerOut = (el) => {
  const tl = gsap.timeline();
  tl.to(el.querySelector("[data-drawer-scrim]"), { opacity: 0, duration: 0.22, ease: "power2.out" }, 0);
  tl.to(el.querySelector("[data-drawer-panel]"), { xPercent: -100, duration: 0.24, ease: "power2.in" }, 0);
  return tl;
};

/* A floating glass bar. Past the first few pixels of scroll it narrows and
   lifts, so it reads as part of the page at the top and as a tool below.
   Below md the links move into a full-height drawer. */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const [menuMounted, menuRef] = usePresence(open, { enter: drawerIn, exit: drawerOut });
  const toggleRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // While open: focus starts on the close button, Tab stays inside the drawer
  // and Escape closes it. On close, focus goes back to the menu button.
  useEffect(() => {
    if (!open) return;
    const panel = menuRef.current?.querySelector("[data-drawer-panel]");
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll("a[href], button:not([disabled])")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (panel?.contains(document.activeElement) || document.activeElement === document.body) {
        toggleRef.current?.focus();
      }
    };
  }, [open, menuRef]);

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
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink press hover:border-line-strong hover:bg-line md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Icon icon="ph:list-bold" className="text-lead" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {menuMounted && (
        <div id="mobile-menu" ref={menuRef} inert={!open} className="fixed inset-0 z-60 md:hidden">
          <div
            data-drawer-scrim
            className="absolute inset-0 bg-ground/70 opacity-0 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            data-drawer-panel
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 left-0 flex h-dvh w-[min(85vw,22rem)] flex-col rounded-r-xl border-r border-line-strong bg-surface-1/90 p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-float backdrop-blur-xl"
          >
            <div className="flex h-14 items-center justify-between pl-1">
              <Logo />
              <button
                ref={closeRef}
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink press hover:border-line-strong hover:bg-line"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <Icon icon="ph:x-bold" className="text-lead" aria-hidden="true" />
              </button>
            </div>

            <ul className="mt-6 flex flex-col">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      [
                        "flex min-h-14 items-center justify-between rounded-md px-3 text-title press-soft",
                        isActive ? "text-brand" : "text-ink hover:bg-line",
                      ].join(" ")
                    }
                  >
                    {l.label}
                    <Icon icon="ph:arrow-right" aria-hidden="true" className="text-lead text-ink-muted" />
                  </NavLink>
                </li>
              ))}
            </ul>

            <Link to="/academy" className={["mt-auto flex min-h-12 w-full text-body", ctaClass].join(" ")}>
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
