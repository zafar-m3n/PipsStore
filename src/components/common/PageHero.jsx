import { Icon } from "@iconify/react";

/* Shared page header used at the top of interior pages.
   Faint ruled-ledger texture; optional rubber-stamp "Last Updated"
   badge for the legal pages. */
export function PageHero({ title, subtitle, lastUpdated, children }) {
  return (
    <header className="border-b border-pips-line bg-pips-surface-alt paper-ruled">
      <div className="container-pips py-14 sm:py-20">
        {lastUpdated && (
          <span className="stamp mb-4 border-pips-muted/60 text-pips-muted">
            <Icon icon="ph:clock-counter-clockwise" className="text-sm" />
            Last updated · {lastUpdated}
          </span>
        )}
        <h1 className="max-w-3xl text-4xl font-bold text-pips-ink sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pips-muted">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

export default PageHero;
