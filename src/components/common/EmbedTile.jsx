/* A bento tile that frames a live third-party embed: a quiet header row (live
   dot, what it is, who provides it) above the embed itself. */
function EmbedTile({ label, source, className = "", children }) {
  return (
    <div className={["card min-w-0 p-2 sm:p-3", className].join(" ")}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-2 pt-1 pb-3">
        <span className="inline-flex items-center gap-2 text-small font-medium text-ink-soft">
          <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
          {label}
        </span>
        {source && <span className="text-micro text-ink-muted">{source}</span>}
      </div>
      {children}
    </div>
  );
}

export default EmbedTile;
