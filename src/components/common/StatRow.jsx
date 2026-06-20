export default function StatRow({ label, value, valueClass = '' }) {
  return (
    <div className="flex justify-between items-baseline py-0.5">
      <span className="stat-label">{label}</span>
      <span className={`stat-value tabular-nums ${valueClass}`}>{value}</span>
    </div>
  );
}
