import { useUiStore } from '../../store/uiStore.js';
import { LOCATIONS_MAP } from '../../data/locations.js';
import { FACTIONS } from '../../data/factions.js';
import { factionColor } from '../../utils/colorScale.js';
import { formatAU, formatCredits } from '../../utils/formatters.js';

export default function MapTooltip() {
  const hoveredLocationId = useUiStore(s => s.hoveredLocationId);
  const selectedLocationId = useUiStore(s => s.selectedLocationId);

  const locationId = hoveredLocationId ?? selectedLocationId;
  if (!locationId) return null;

  const location = LOCATIONS_MAP[locationId];
  if (!location) return null;

  const faction = FACTIONS[location.faction];
  const color = factionColor(location.faction);

  return (
    <div className="absolute top-3 left-3 bg-space-800 border border-space-600 rounded-lg p-3 w-52 pointer-events-none shadow-xl">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="text-sm font-semibold text-slate-100 leading-tight">{location.name}</div>
        <span
          className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
          style={{ color, border: `1px solid ${color}44`, background: `${color}22` }}
        >
          {faction?.shortName ?? location.faction}
        </span>
      </div>

      <p className="text-[10px] text-slate-400 leading-relaxed mb-2">{location.description}</p>

      <div className="space-y-1 text-[10px]">
        <div className="flex justify-between">
          <span className="text-slate-500">Distance</span>
          <span className="text-slate-300 tabular-nums">{formatAU(location.distanceFromSunAU)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Refuel</span>
          <span className={location.refuelAvailable ? 'text-green-400' : 'text-red-400'}>
            {location.refuelAvailable ? 'Available' : 'Not available'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Docking fee</span>
          <span className="text-slate-300">{formatCredits(location.dockingFeeCr)}</span>
        </div>
      </div>
    </div>
  );
}
