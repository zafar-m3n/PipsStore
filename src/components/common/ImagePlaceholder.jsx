import { Icon } from "@iconify/react";

/* Stand-in for a photo that hasn't been chosen yet: a rounded skeleton at the
   slot's aspect ratio, with a note saying exactly what the photo should show. */
function ImagePlaceholder({ aspect = "aspect-4/3", description, className = "" }) {
  return (
    <div className={className}>
      <div
        className={[
          "shimmer flex flex-col items-center justify-center rounded-lg border border-line bg-surface-2 p-5 text-center",
          aspect,
        ].join(" ")}
      >
        <p className="max-w-[38ch]">
          <span className="inline-flex items-center gap-2 text-small font-bold text-ink-soft">
            <Icon icon="ph:image" aria-hidden="true" className="shrink-0" />
            Photo needed
          </span>
          <span className="mt-2 block text-small text-ink-soft">{description}</span>
        </p>
      </div>
    </div>
  );
}

export default ImagePlaceholder;
