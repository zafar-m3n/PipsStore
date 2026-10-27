/* Worked example: scenario, analysis, key lesson. */
export function BreakdownCard({ item }) {
  const rows = [
    { label: "Scenario", text: item.scenario },
    { label: "Analysis", text: item.analysis },
    { label: "Key lesson", text: item.keyLesson },
  ];
  return (
    <div className="panel flex h-full flex-col p-6">
      <h3 className="text-lead font-bold text-ink">{item.title}</h3>
      <dl className="mt-4 space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-small font-bold text-brand">{r.label}</dt>
            <dd className="mt-1 text-body text-ink-soft">{r.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default BreakdownCard;
