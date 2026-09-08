import { Icon } from "@iconify/react";
import { DISCLAIMER_TEXT } from "@/data/site.js";

/* Warm amber/terracotta-tinted alert. Appears on every content page. */
export function DisclaimerBanner({ className = "" }) {
  return (
    <div
      role="note"
      className={[
        "flex items-start gap-3 rounded-2xl border border-pips-warn/30 bg-pips-warn-soft/70 px-5 py-4",
        className,
      ].join(" ")}
    >
      <Icon
        icon="ph:warning-fill"
        className="mt-0.5 shrink-0 text-xl text-pips-warn"
      />
      <p className="text-sm leading-relaxed text-pips-ink-soft">
        <span className="font-semibold text-pips-ink">Educational only. </span>
        {DISCLAIMER_TEXT}
      </p>
    </div>
  );
}

export default DisclaimerBanner;
