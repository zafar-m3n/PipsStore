import { useHeroReveal } from "@/hooks/useGsap.js";

/* Interior page header: a large serif title and one line over the start of the
   light river. It runs up under the floating nav (-mt-20 pt-20 cancels main's
   offset), like the Home hero. */
function PageHero({ title, subtitle, lastUpdated, children }) {
  const scope = useHeroReveal();

  return (
    <header ref={scope} className="relative isolate -mt-20 overflow-hidden pt-20">
      <div className="container-page pt-16 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-3xl">
          <h1 className="text-headline text-ink">
            <span className="-my-[0.12em] block overflow-hidden py-[0.12em]">
              <span data-hero-line className="block">
                {title}
              </span>
            </span>
          </h1>
          {subtitle && (
            <p data-hero-rise className="mt-6 max-w-[56ch] text-body text-ink-soft sm:text-lead">
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
