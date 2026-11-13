function Photo({ src, alt, aspect = "aspect-4/3", className = "" }) {
  return (
    <div className={className}>
      <div className={["overflow-hidden rounded-lg border border-line bg-surface-2", aspect].join(" ")}>
        <img src={src} alt={alt} loading="lazy" decoding="async" className="size-full object-cover" />
      </div>
    </div>
  );
}

export default Photo;
