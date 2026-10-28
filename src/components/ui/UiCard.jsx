import { Icon } from "@iconify/react";

/* The shell every product-style card shares: a divided title bar (icon, name,
   optional tag such as "Example") like an app widget's header, then the
   card's own content. `bare` drops the card surface so the content can sit
   inside a larger tile without nesting one card in another. */
function UiCard({ icon, title, tag, bare = false, className = "", children, ...rest }) {
  return (
    <div className={[bare ? "" : "card p-5", className].join(" ")} {...rest}>
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <p className="inline-flex items-center gap-2 text-small font-medium text-ink-soft">
          {icon && <Icon icon={icon} aria-hidden="true" className="shrink-0 text-brand" />}
          {title}
        </p>
        {tag && (
          <span className="shrink-0 rounded-full border border-line px-2.5 py-0.5 text-micro text-ink-muted">{tag}</span>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default UiCard;
