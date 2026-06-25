export default function RiskMeter({ score, label, color }) {
  const pct = Math.min(100, Math.max(0, score));

  const bands = [
    { label: 'Low',      color: '#22c55e', width: 25 },
    { label: 'Medium',   color: '#eab308', width: 25 },
    { label: 'High',     color: '#f97316', width: 25 },
    { label: 'Critical', color: '#ef4444', width: 25 },
  ];

  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">Overall risk</span>
        <span className="text-sm font-bold" style={{ color }}>{label}</span>
      </div>

      {/* Band bar */}
      <div className="relative h-3 rounded-full overflow-hidden flex">
        {bands.map(band => (
          <div key={band.label} style={{ width: `${band.width}%`, background: band.color, opacity: 0.35 }} />
        ))}
        {/* Marker */}
        <div
          className="absolute top-0 h-full w-0.5 bg-white rounded-full transition-all duration-500"
          style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
        />
      </div>

      <div className="flex justify-between text-[9px] text-slate-600 mt-0.5">
        {bands.map(band => <span key={band.label}>{band.label}</span>)}
      </div>
    </div>
  );
}
