import { useMissionStore } from '../../store/missionStore.js';
import { SHIPS } from '../../data/ships.js';
import SectionHeader from '../common/SectionHeader.jsx';

export default function ShipSelector() {
  const selectedShipId = useMissionStore(s => s.selectedShipId);
  const setShip = useMissionStore(s => s.setShip);
  const selectedShip = SHIPS.find(s => s.id === selectedShipId);

  return (
    <div>
      <SectionHeader icon="🚀">Vessel</SectionHeader>
      <select
        value={selectedShipId}
        onChange={e => setShip(e.target.value)}
        className="w-full bg-space-800 border border-space-600 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-accent-teal cursor-pointer"
      >
        {SHIPS.map(ship => (
          <option key={ship.id} value={ship.id}>{ship.name}</option>
        ))}
      </select>
      {selectedShip && (
        <p className="text-[10px] text-slate-500 mt-1.5 italic leading-relaxed">
          {selectedShip.flavorText}
        </p>
      )}
    </div>
  );
}
