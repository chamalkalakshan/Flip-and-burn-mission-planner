import { useUiStore } from '../../store/uiStore.js';
import { useMissionStore } from '../../store/missionStore.js';
import { formatDays, formatDeltaV, formatMass } from '../../utils/formatters.js';
import { fuelBarColor } from '../../utils/colorScale.js';
import RefuelToggle from './RefuelToggle.jsx';

export default function LegListItem({ legResult, legIndex, legInput }) {
  const removeLeg = useMissionStore(s => s.removeLeg);
  const { highlightLeg, clearHighlight, highlightedLegIndex } = useUiStore();
  const isHighlighted = highlightedLegIndex === legIndex;

  const fuelPct = legResult.fuelAfterRefuelT / (legResult.fuelAfterRefuelT + legResult.fuelBurnedT + 0.001);

  return (
    <div
      className={`rounded-lg p-3 border transition-colors cursor-default ${
        isHighlighted
          ? 'border-accent-teal bg-space-700'
          : legResult.isFeasible
          ? 'border-space-600 bg-space-800 hover:border-space-500'
          : 'border-red-800 bg-red-950 bg-opacity-30'
      }`}
      onMouseEnter={() => highlightLeg(legIndex)}
      onMouseLeave={clearHighlight}
    >
      {/* Route header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] text-slate-500 flex-shrink-0">#{legIndex + 1}</span>
          <span className="text-xs text-slate-200 truncate font-medium">
            {legResult.originName} → {legResult.destinationName}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <RefuelToggle
            legId={legInput.id}
            destinationId={legResult.destinationId}
            refuelAtDestination={legInput.refuelAtDestination}
          />
          <button
            onClick={() => removeLeg(legInput.id)}
            className="text-slate-600 hover:text-red-400 text-xs transition-colors leading-none"
            title="Remove leg"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-1 text-[10px]">
        <div>
          <div className="text-slate-500 uppercase tracking-wider text-[9px]">Time</div>
          <div className="text-slate-200 tabular-nums">{formatDays(legResult.travelTimeDays)}</div>
        </div>
        <div>
          <div className="text-slate-500 uppercase tracking-wider text-[9px]">Δv</div>
          <div className="text-slate-200 tabular-nums">{formatDeltaV(legResult.deltaVKms)}</div>
        </div>
        <div>
          <div className="text-slate-500 uppercase tracking-wider text-[9px]">Fuel used</div>
          <div className="text-slate-200 tabular-nums">{formatMass(legResult.fuelBurnedT)}</div>
        </div>
      </div>

      {/* Fuel remaining after leg */}
      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1 h-1 bg-space-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, (legResult.fuelAfterRefuelT / (legResult.fuelAtStartT || 1)) * 100)}%`,
              background: fuelBarColor(legResult.fuelAfterRefuelT / (legResult.fuelAtStartT || 1)),
            }}
          />
        </div>
        <span className="text-[9px] tabular-nums" style={{ color: fuelBarColor(legResult.fuelAfterRefuelT / (legResult.fuelAtStartT || 1)) }}>
          {formatMass(legResult.fuelAfterRefuelT)}
        </span>
        {legResult.refueled && (
          <span className="text-[9px] text-accent-teal">⛽ refueled</span>
        )}
      </div>

      {/* Warning */}
      {legResult.warningMessage && (
        <div className="mt-2 text-[10px] text-red-400 leading-snug">
          ⚠ {legResult.warningMessage}
        </div>
      )}
    </div>
  );
}
