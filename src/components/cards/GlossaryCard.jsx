/* Glossary entry. With `onRelated`, related terms that have their own entry
   (listed in `knownTerms`, lower-cased) are buttons that look them up; the
   rest stay plain text. */
export function GlossaryCard({ item, onRelated, knownTerms }) {
  const related = item.related || [];
  const linkable = onRelated && knownTerms ? related.filter((r) => knownTerms.has(r.toLowerCase())) : [];
  const plain = related.filter((r) => !linkable.includes(r));

  return (
    <div className="panel flex h-full flex-col p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lead font-bold text-ink">{item.term}</h3>
        <span className="shrink-0 text-small text-ink-muted">{item.category}</span>
      </div>

      <p className="mt-2 text-body text-ink-soft">{item.definition}</p>

      <p className="mt-4 rounded-sm bg-surface-2 px-4 py-3 text-body text-ink-soft">
        <span className="font-bold text-ink">Example: </span>
        {item.example}
      </p>

      <p className="mt-4 text-body text-ink-soft">
        <span className="font-bold text-ink">Why it matters: </span>
        {item.whyItMatters}
      </p>

      {related.length > 0 && (
        <div className="mt-auto pt-5">
          {linkable.length > 0 && (
            <>
              <p className="text-small font-bold text-ink-soft">Look up related terms</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {linkable.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => onRelated(r)}
                    className="chamfer min-h-11 bg-surface-2 px-4 text-small font-medium text-ink press hover:bg-surface-3"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </>
          )}
          {plain.length > 0 && (
            <p className={["text-small text-ink-muted", linkable.length ? "mt-3" : ""].join(" ")}>
              <span className="font-bold text-ink-soft">{linkable.length ? "Also see: " : "Related: "}</span>
              {plain.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default GlossaryCard;
