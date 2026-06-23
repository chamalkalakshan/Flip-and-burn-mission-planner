import { useMissionStore } from '../../store/missionStore.js';
import { LOCATIONS_MAP } from '../../data/locations.js';

export default function RefuelToggle({ legId, destinationId, refuelAtDestination }) {
  const setLegRefuel = useMissionStore(s => s.setLegRefuel);
  const destination = LOCATIONS_MAP[destinationId];
  const canRefuel = destination?.refuelAvailable ?? false;

  return (
    <label className={`flex items-center gap-1.5 cursor-pointer select-none ${!canRefuel ? 'opacity-30' : ''}`}>
      <input
        type="checkbox"
        checked={refuelAtDestination && canRefuel}
        onChange={e => setLegRefuel(legId, e.target.checked)}
        disabled={!canRefuel}
        className="w-3 h-3 accent-teal-400"
      />
      <span className="text-[10px] text-slate-400">Refuel</span>
    </label>
  );
}
