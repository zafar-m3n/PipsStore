import { useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";
import Navbar from "@/components/layout/Navbar.jsx";
import Footer from "@/components/layout/Footer.jsx";
import LightRiver from "@/components/effects/LightRiver.jsx";
import { REDUCE } from "@/hooks/useGsap.js";
import { useSpotlight } from "@/hooks/useSpotlight.js";

function Layout() {
  useSpotlight();
  const { pathname, hash } = useLocation();
  const mainRef = useRef(null);
  const lastPath = useRef(pathname);

  // Fade the new page in on route changes; never on first load or a hash change.
  useLayoutEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    const tween = gsap.fromTo(
      mainRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: window.matchMedia(REDUCE).matches ? 0.15 : 0.2,
        ease: "power1.out",
        clearProps: "opacity",
      },
    );
    return () => tween.progress(1).kill();
  }, [pathname]);

  // A new page always opens at the top. Instant, before paint: the global
  // smooth scroll would otherwise animate, and ScrollTrigger's re-measure on
  // the new page interrupts it partway down.
  useLayoutEffect(() => {
    if (hash && document.getElementById(decodeURIComponent(hash.slice(1)))) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (!target) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    // Scroll after paint, and again once the page has loaded: ScrollTrigger
    // re-measures on load and can otherwise leave a deep link at the top.
    const go = () => target.scrollIntoView({ behavior: "instant", block: "start" });
    const frame = requestAnimationFrame(go);
    if (document.readyState !== "complete") window.addEventListener("load", go, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", go);
    };
  }, [pathname, hash]);

  return (
    <div className="relative isolate flex min-h-svh flex-col bg-ground">
      <LightRiver />
      <a
        href="#main"
        className="sr-only rounded-full bg-brand px-5 py-3 font-semibold text-on-brand focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 pt-20 focus:outline-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
