import { useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";
import { Navbar } from "@/components/layout/Navbar.jsx";
import { Footer } from "@/components/layout/Footer.jsx";
import { REDUCE } from "@/hooks/useGsap.js";

export function Layout() {
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

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (!target) {
      window.scrollTo(0, 0);
      return;
    }
    // Scroll after paint, and again once the page has loaded: ScrollTrigger
    // re-measures on load and can otherwise leave a deep link at the top.
    const go = () => target.scrollIntoView();
    const frame = requestAnimationFrame(go);
    if (document.readyState !== "complete") window.addEventListener("load", go, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", go);
    };
  }, [pathname, hash]);

  return (
    <div className="flex min-h-svh flex-col bg-ground">
      <a
        href="#main"
        className="chamfer sr-only bg-brand px-4 py-3 font-bold text-on-brand focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
