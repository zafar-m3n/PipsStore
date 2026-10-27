import { DEVELOP, useScrollReveal } from "@/hooks/useGsap.js";

/* A found archive picture in the site's one treatment: monochrome, multiplied
   onto the deep brand teal, inside the chamfered frame. On scroll the photo
   develops upward onto the teal; the frame itself never moves. */
export function ArchiveImage({ src, alt, caption, width, height, eager = false, className = "", frameClassName = "" }) {
  const scope = useScrollReveal("img", DEVELOP);

  return (
    <figure ref={scope} className={className}>
      <div className={["chamfer overflow-hidden bg-brand-deep", frameClassName].join(" ")}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? undefined : "lazy"}
          decoding="async"
          className="block h-full w-full object-cover mix-blend-multiply contrast-125 grayscale"
        />
      </div>
      {caption && <figcaption className="mt-3 text-small text-ink-muted">{caption}</figcaption>}
    </figure>
  );
}

export default ArchiveImage;
