import { Icon } from "@iconify/react";
import { DISCLAIMER_TEXT } from "@/data/site.js";

function DisclaimerBanner({ className = "" }) {
  return (
    <div role="note" className={["card-raised flex items-start gap-3 px-5 py-4", className].join(" ")}>
      <Icon icon="ph:warning-circle" aria-hidden="true" className="mt-1 shrink-0 text-lead text-warning" />
      <p className="max-w-[75ch] text-body text-ink-soft">
        <span className="font-bold text-ink">Educational only. </span>
        {DISCLAIMER_TEXT}
      </p>
    </div>
  );
}

export default DisclaimerBanner;
