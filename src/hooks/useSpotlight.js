import { useEffect } from "react";

const FINE = "(hover: hover) and (pointer: fine)";

/* A soft light that follows the cursor across any .card / .card-raised.
   One listener for the whole page writes the pointer position into the card
   under it as --mx / --my; the card utilities paint the light on hover. */
export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia(FINE).matches) return;
    let frame = 0;
    let last = null;

    const onMove = (e) => {
      last = e;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const card = last.target instanceof Element ? last.target.closest(".card, .card-raised") : null;
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${last.clientX - r.left}px`);
        card.style.setProperty("--my", `${last.clientY - r.top}px`);
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}

export default useSpotlight;
