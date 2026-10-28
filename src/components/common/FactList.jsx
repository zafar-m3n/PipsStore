import { SITE_FACTS } from "@/data/facts.js";

const LABEL = { small: "text-small", body: "text-body" };

/* The site's real numbers as a definition list. "stacked" puts each value above
   its label; "inline" runs them as one quiet line (value, label, value, label).
   Extra props (a ref, data-* hooks for animation) go to the <dl>. */
function FactList({ className = "", labelSize = "small", variant = "stacked", ...rest }) {
  if (variant === "inline") {
    return (
      <dl className={["flex flex-wrap items-baseline gap-x-6 gap-y-2 text-small", className].join(" ")} {...rest}>
        {SITE_FACTS.map((f) => (
          <div key={f.label} className="flex items-baseline gap-2">
            <dt className="order-2 text-ink-muted">{f.label}</dt>
            <dd data-count className="order-1 font-mono font-medium text-ink tabular-nums">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className={className} {...rest}>
      {SITE_FACTS.map((f) => (
        <div key={f.label} className="flex flex-col-reverse">
          <dt className={[LABEL[labelSize] || LABEL.small, "text-ink-soft"].join(" ")}>{f.label}</dt>
          <dd className="text-figure text-ink">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default FactList;
