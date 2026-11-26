import { Icon } from "@iconify/react";
import ButtonLink from "@/components/common/ButtonLink.jsx";
import BulletList from "@/components/common/BulletList.jsx";
import { PACKAGE_NOTE, TRIAL_DAYS } from "@/data/packages.js";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function PackageCard({ item }) {
  return (
    <article aria-labelledby={`${item.id}-title`} className="card flex h-full flex-col p-6 sm:p-7">
      <h3 id={`${item.id}-title`} className="flex items-center gap-3 text-lead font-semibold text-ink">
        <Icon icon={item.icon} aria-hidden="true" className="shrink-0 text-brand" />
        {item.name}
      </h3>
      <p className="mt-2 text-body text-ink-soft">{item.tagline}</p>

      <div className="mt-6 border-t border-line pt-5">
        <p className="flex items-baseline gap-2">
          <span className="text-small text-ink-muted">from</span>
          <span className="font-mono text-figure text-ink">{usd.format(item.price)}</span>
          <span className="text-small text-ink-muted">USD</span>
        </p>
        <p className="mt-1 text-small text-ink-muted">{item.duration} · {TRIAL_DAYS}-day free trial</p>
      </div>

      <BulletList items={item.features} className="mt-6" />

      <div className="mt-auto pt-8">
        <ButtonLink href="#start-trial" icon="ph:arrow-down-bold" className="w-full justify-center">
          Start free trial
        </ButtonLink>
        <p className="mt-4 text-small text-ink-muted">{PACKAGE_NOTE}</p>
      </div>
    </article>
  );
}

export default PackageCard;
