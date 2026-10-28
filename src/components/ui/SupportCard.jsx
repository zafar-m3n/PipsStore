import UiCard from "@/components/ui/UiCard.jsx";
import { CONTACT_INFO } from "@/data/site.js";

/* What happens after you write in, stated plainly. */
function SupportCard({ className = "", bare = false }) {
  return (
    <UiCard icon="ph:envelope-simple" title="Support" className={className} bare={bare}>
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-deep font-display text-lead text-ink">
          P
        </span>
        <div>
          <p className="text-small font-semibold text-ink">PipsStore support</p>
          <a href={`mailto:${CONTACT_INFO.email}`} className="text-small text-ink-soft underline hover:text-ink">
            {CONTACT_INFO.email}
          </a>
        </div>
      </div>
      <p className="mt-4 rounded-md bg-surface-2 px-3 py-2 text-small text-ink-soft">{CONTACT_INFO.responseTime}</p>
      <p className="mt-3 text-small text-ink-muted">{CONTACT_INFO.hours}</p>
    </UiCard>
  );
}

export default SupportCard;
