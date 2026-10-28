import UiCard from "@/components/ui/UiCard.jsx";
import { GLOSSARY_TERMS } from "@/data/glossary.js";

/* One glossary entry as a card. `showExample` adds the worked example. */
function TermCard({ term, showExample = false, className = "", bare = false }) {
  const t = GLOSSARY_TERMS.find((g) => g.term === term);
  if (!t) return null;

  return (
    <UiCard icon="ph:book-open-text" title="Glossary" tag={t.category} className={className} bare={bare}>
      <p className="font-display text-[1.75rem] leading-none text-ink">{t.term}</p>
      <p className="mt-3 text-small text-ink-soft">{t.definition}</p>
      {showExample && t.example && (
        <p className="mt-3 rounded-md bg-surface-2 px-3 py-2 text-small text-ink-soft">
          <span className="font-medium text-ink">Example: </span>
          {t.example}
        </p>
      )}
    </UiCard>
  );
}

export default TermCard;
