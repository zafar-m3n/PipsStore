/* A plain bento tile: one heading and whatever explains it. */
function InfoTile({ title, className = "", children }) {
  return (
    <article className={["card p-6 sm:p-7", className].join(" ")}>
      <h3 className="text-lead font-semibold text-ink">{title}</h3>
      <div className="mt-4">{children}</div>
    </article>
  );
}

export default InfoTile;
