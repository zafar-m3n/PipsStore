import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------
   Hero timeline reveal: heading -> subtext -> CTAs -> visual,
   sequenced with a slight overlap between each step. One-time.
   Returns a ref to attach to the hero root; children are targeted
   by [data-hero] attribute values.
------------------------------------------------------------------ */
export function useHeroReveal() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const targets = {
      heading: root.querySelector('[data-hero="heading"]'),
      subtext: root.querySelector('[data-hero="subtext"]'),
      cta: root.querySelector('[data-hero="cta"]'),
      visual: root.querySelector('[data-hero="visual"]'),
    };
    const list = Object.values(targets).filter(Boolean);
    if (!list.length) return;

    if (prefersReducedMotion()) {
      gsap.set(list, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(list, { opacity: 0, y: 28 });
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.7 },
      });
      if (targets.heading) tl.to(targets.heading, { opacity: 1, y: 0 });
      if (targets.subtext) tl.to(targets.subtext, { opacity: 1, y: 0 }, "-=0.45");
      if (targets.cta) tl.to(targets.cta, { opacity: 1, y: 0 }, "-=0.45");
      if (targets.visual)
        tl.to(targets.visual, { opacity: 1, y: 0, duration: 0.9 }, "-=0.5");
    }, root);

    return () => ctx.revert();
  }, []);

  return scope;
}

/* ------------------------------------------------------------------
   Generic scroll-triggered stagger reveal for card grids.
   Attach the returned ref to a wrapper; direct-ish children matching
   `itemSelector` fade/rise in with a stagger when scrolled into view.
   One-time (once: true) — no parallax, no loop.
------------------------------------------------------------------ */
export function useStaggerReveal(itemSelector = "[data-reveal-item]") {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const items = root.querySelectorAll(itemSelector);
    if (!items.length) return;

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 24 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [itemSelector]);

  return scope;
}

export default useStaggerReveal;
