/* A list with a small brand-green dot bullet. */
function BulletList({ items, className = "" }) {
  return (
    <ul className={["flex flex-col gap-4", className].join(" ")}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-body text-ink-soft">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default BulletList;
