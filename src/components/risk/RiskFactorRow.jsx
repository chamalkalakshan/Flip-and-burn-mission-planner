import { riskColor } from '../../utils/colorScale.js';

const FACTOR_ICONS = {
  faction_tension: '⚔',
  piracy: '☠',
  radiation: '☢',
  fuel_reserve: '⛽',
  transit_duration: '⏱',
};

export default function RiskFactorRow({ factor }) {
  const { id, name, score, description } = factor;
  const color = riskColor(score);

  return (
    <div className="group relative py-1.5">
      <div className="flex items-center gap-2">
        <span className="text-sm w-5 text-center flex-shrink-0">{FACTOR_ICONS[id] ?? '•'}</span>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-[10px] text-slate-300">{name}</span>
            <span className="text-[10px] tabular-nums font-medium" style={{ color }}>{score}</span>
          </div>
          <div className="h-1 bg-space-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${score}%`, background: color }}
            />
          </div>
        </div>
      </div>
      {/* Description tooltip on hover */}
      <div className="hidden group-hover:block absolute left-6 bottom-full mb-1 z-10 bg-space-700 border border-space-600 text-[10px] text-slate-300 rounded px-2 py-1.5 w-48 leading-relaxed shadow-xl pointer-events-none">
        {description}
      </div>
    </div>
  );
}
