const WIDTH = {
  "40ch": "max-w-[40ch]",
  "44ch": "max-w-[44ch]",
  "48ch": "max-w-[48ch]",
  "52ch": "max-w-[52ch]",
  "56ch": "max-w-[56ch]",
  "60ch": "max-w-[60ch]",
};

/* A section's h2 and optional intro paragraph. The parent keeps the layout.
   size "lead" steps the intro up at sm; "body" keeps short intros small.
   tone "ink" and spacing "loose" are for a statement-style intro. */
function SectionIntro({ id, title, width, size = "lead", tone = "soft", spacing = "normal", children }) {
  return (
    <>
      <h2 id={id} className="text-title text-ink">
        {title}
      </h2>
      {children && (
        <p
          className={[
            spacing === "loose" ? "mt-6" : "mt-4",
            WIDTH[width],
            "text-body",
            tone === "ink" ? "text-ink" : "text-ink-soft",
            size === "lead" && "sm:text-lead",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </p>
      )}
    </>
  );
}

export default SectionIntro;
