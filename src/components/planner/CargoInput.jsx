import { useMissionStore } from '../../store/missionStore.js';
import SectionHeader from '../common/SectionHeader.jsx';

export default function CargoInput({ ship }) {
  const cargoMassT = useMissionStore(s => s.cargoMassT);
  const setCargo = useMissionStore(s => s.setCargo);
  const maxCargo = ship.maxCargoT;

  return (
    <div>
      <SectionHeader icon="📦">Cargo</SectionHeader>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={0}
          max={maxCargo}
          step={1}
          value={cargoMassT}
          onChange={e => setCargo(Number(e.target.value))}
          disabled={maxCargo === 0}
          className="flex-1 bg-space-800 border border-space-600 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-accent-teal disabled:opacity-40 tabular-nums"
        />
        <span className="text-xs text-slate-400 whitespace-nowrap">
          / {maxCargo > 0 ? `${maxCargo} t max` : 'no capacity'}
        </span>
      </div>
      {cargoMassT > maxCargo && (
        <p className="text-[10px] text-red-400 mt-1">Exceeds max cargo capacity</p>
      )}
    </div>
  );
}
