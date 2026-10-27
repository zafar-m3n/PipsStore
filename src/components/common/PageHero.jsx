import { useHeroReveal } from "@/hooks/useGsap.js";

/* Interior page header: the page's one h1 beside a large cropped chamfered
   field (the motif at its biggest). */
export function PageHero({ title, subtitle, lastUpdated, children }) {
  const scope = useHeroReveal();

  return (
    <header ref={scope} className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-10 -right-24 hidden h-[calc(100%-2.5rem)] w-[38vw] bg-band [border-top-left-radius:72px] [corner-shape:bevel] lg:block"
      />
      <div className="container-page relative pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl lg:max-w-[58%]">
          <h1 className="text-display text-ink">{title}</h1>
          {subtitle && (
            <p data-hero-rise className="mt-6 max-w-[52ch] text-body text-ink-soft sm:text-lead">
              {subtitle}
            </p>
          )}
          {lastUpdated && <p className="mt-6 text-small text-ink-muted">Last updated {lastUpdated}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </header>
  );
}

export default PageHero;
