import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Shared timing. Mirrors --ease-out / --ease-in-out in index.css. */
export const MOTION = {
  fast: 0.12,
  base: 0.2,
  reveal: 0.45,
  rise: 12,
  stagger: 0.05,
  staggerMax: 0.3,
  easeOut: "power3.out",
  easeInOut: "power2.inOut",
};

export const REDUCE = "(prefers-reduced-motion: reduce)";
export const ALLOW = "(prefers-reduced-motion: no-preference)";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(REDUCE).matches;

/* Embeds and lazy images change the page height after ScrollTriggers have
   measured it. Re-measure whenever the document grows or shrinks. */
if (typeof window !== "undefined" && "ResizeObserver" in window) {
  let timer;
  let lastHeight = 0;
  new ResizeObserver(([entry]) => {
    const height = Math.round(entry.contentRect.height);
    if (height === lastHeight) return;
    lastHeight = height;
    clearTimeout(timer);
    timer = setTimeout(() => ScrollTrigger.refresh(), 200);
  }).observe(document.body);
}

/* ------------------------------------------------------------------
   Hero entrance. The heading and lead sentence are never hidden; only
   elements marked [data-hero-rise] rise in, in DOM order. One-time.
------------------------------------------------------------------ */
export function useHeroReveal() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const items = root.querySelectorAll("[data-hero-rise]");
    if (!items.length) return;

    const mm = gsap.matchMedia(root);
    mm.add(ALLOW, () => {
      gsap.from(items, {
        opacity: 0,
        y: MOTION.rise,
        duration: MOTION.reveal,
        ease: MOTION.easeOut,
        stagger: 0.08,
        delay: 0.05,
        clearProps: "opacity,transform",
      });
    });
    return () => mm.revert();
  }, []);

  return scope;
}

/* Opens and closes a panel that stays mounted while it animates out.
   Returns [mounted, ref]; render the panel while `mounted` is true. */
export function usePresence(open, { enter, exit }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(open);
  const prev = useRef(open);

  useLayoutEffect(() => {
    const el = ref.current;
    if (open === prev.current || !el) return;
    prev.current = open;
    const reduce = prefersReducedMotion();
    let tween;
    if (open) {
      setMounted(true);
      tween = enter(el, reduce);
    } else if (reduce) {
      setMounted(false);
    } else {
      tween = exit(el);
      tween.eventCallback("onComplete", () => setMounted(false));
    }
    return () => tween?.kill();
  }, [open, enter, exit]);

  return [open || mounted, ref];
}

/* ------------------------------------------------------------------
   Scroll reveals. The hidden state exists only once GSAP has set it,
   and every way out (reduced motion, an error, printing, scrolling
   past, a content change) leaves the content visible.
------------------------------------------------------------------ */
export const RISE = {
  start: "top 90%",
  from: { opacity: 0, y: MOTION.rise },
  to: { opacity: 1, y: 0, duration: MOTION.reveal, ease: MOTION.easeOut },
  clear: "opacity,transform",
  stagger: true,
};

export const DEVELOP = {
  start: "top 85%",
  from: { clipPath: "inset(100% 0% 0% 0%)" },
  to: { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: MOTION.easeInOut },
  clear: "clipPath",
  stagger: false,
};

function attachReveal(root, items, preset) {
  const show = (targets) => gsap.set(targets, { clearProps: preset.clear, overwrite: true });
  const mm = gsap.matchMedia(root);
  const onPrint = () => show(items);

  try {
    mm.add(ALLOW, () => {
      gsap.set(items, preset.from);
      ScrollTrigger.batch(items, {
        start: preset.start,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            ...preset.to,
            stagger: preset.stagger
              ? { each: MOTION.stagger, amount: Math.min(MOTION.stagger * (batch.length - 1), MOTION.staggerMax) }
              : 0,
            overwrite: true,
            clearProps: preset.clear,
          }),
        onLeave: show,
        onEnterBack: show,
      });
    });
    window.addEventListener("beforeprint", onPrint);
  } catch (err) {
    mm.revert();
    show(items);
    console.error(err);
  }

  return () => {
    window.removeEventListener("beforeprint", onPrint);
    mm.revert();
  };
}

/* Reveals the elements under the returned ref that match `selector`
   (":scope > *" for direct children). `preset` must be a stable object. */
export function useScrollReveal(selector = "[data-reveal]", preset = RISE) {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll(selector));
    if (!items.length) return;
    return attachReveal(root, items, preset);
  }, [selector, preset]);

  return scope;
}

/* A short fade on the returned element whenever `key` changes after the
   first render: a tab panel or filter result settling into place. */
export function useSettle(key) {
  const scope = useRef(null);
  const last = useRef(key);

  useLayoutEffect(() => {
    if (key === last.current || !scope.current) return;
    last.current = key;
    const tween = gsap.fromTo(
      scope.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.15, ease: "power1.out", overwrite: true, clearProps: "opacity" },
    );
    return () => tween.progress(1).kill();
  }, [key]);

  return scope;
}

/* ------------------------------------------------------------------
   Card grids (RevealGroup), row by row as they enter.
   contentKey  changes when the items change: everything is shown at
               once, with no stagger (search typing, filters, tabs).
   settleKey   changes on a deliberate switch (a tab or a topic):
               the group also settles in with a short fade.
------------------------------------------------------------------ */
export function useStaggerReveal({
  itemSelector = "[data-reveal-item]",
  contentKey,
  settleKey,
} = {}) {
  const scope = useScrollReveal(itemSelector, RISE);
  const lastContent = useRef(contentKey);
  const lastSettle = useRef(settleKey);

  useLayoutEffect(() => {
    const settled = settleKey !== lastSettle.current;
    if (!settled && contentKey === lastContent.current) return;
    lastContent.current = contentKey;
    const root = scope.current;
    if (!root) return;
    gsap.set(root.querySelectorAll(itemSelector), { clearProps: RISE.clear, overwrite: true });

    if (settled) {
      lastSettle.current = settleKey;
      gsap.fromTo(
        root,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: "power1.out", overwrite: true, clearProps: "opacity" },
      );
    }
    ScrollTrigger.refresh();
  }, [contentKey, settleKey, itemSelector]);

  return scope;
}

export default useStaggerReveal;
