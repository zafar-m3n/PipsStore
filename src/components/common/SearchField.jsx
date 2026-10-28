import { Icon } from "@iconify/react";
import { FIELD, FIELD_FOCUS_WITHIN } from "@/lib/ui.js";

/* Labelled search input with a leading magnifier and, when `clearable`, a
   clear button once there is text. `onChange` receives the new string. */
function SearchField({ id, label, value, onChange, placeholder, clearable = false }) {
  return (
    <>
      <label htmlFor={id} className="text-small font-bold text-ink">
        {label}
      </label>
      <div className={["mt-2 flex items-center gap-2", FIELD, clearable ? "pr-1 pl-4" : "px-4", FIELD_FOCUS_WITHIN].join(" ")}>
        <Icon icon="ph:magnifying-glass" aria-hidden="true" className="text-ink-muted" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-12 w-full bg-transparent text-body text-ink outline-hidden placeholder:text-ink-muted"
        />
        {clearable && value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink-muted press hover:bg-surface-3 hover:text-ink"
          >
            <Icon icon="ph:x-bold" aria-hidden="true" />
          </button>
        )}
      </div>
    </>
  );
}

export default SearchField;
