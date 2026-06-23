import { useState } from 'react';
import { useMissionStore } from '../../store/missionStore.js';
import { useUiStore } from '../../store/uiStore.js';
import { LOCATIONS } from '../../data/locations.js';
import SectionHeader from '../common/SectionHeader.jsx';

const SELECTABLE = LOCATIONS.filter(l => l.id !== 'sun');

export default function LegBuilder() {
  const getLastDestinationId = useMissionStore(s => s.getLastDestinationId);
  const addLeg = useMissionStore(s => s.addLeg);
  const selectedLocationId = useUiStore(s => s.selectedLocationId);

  const [originId, setOriginId] = useState(() => getLastDestinationId());
  const [destinationId, setDestinationId] = useState('');

  // If user clicks a location on the map, populate destination
  const handleMapSelect = () => {
    if (selectedLocationId && selectedLocationId !== originId) {
      setDestinationId(selectedLocationId);
    }
  };

  const handleAdd = () => {
    if (!originId || !destinationId || originId === destinationId) return;
    addLeg(originId, destinationId);
    setOriginId(destinationId);
    setDestinationId('');
  };

  return (
    <div>
      <SectionHeader icon="🗺">Route</SectionHeader>
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-[9px] text-slate-500 uppercase tracking-wider block mb-1">From</label>
            <select
              value={originId}
              onChange={e => setOriginId(e.target.value)}
              className="w-full bg-space-800 border border-space-600 text-slate-200 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-accent-teal"
            >
              <option value="">— select —</option>
              {SELECTABLE.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end pb-1.5 text-slate-500">→</div>
          <div className="flex-1">
            <label className="text-[9px] text-slate-500 uppercase tracking-wider block mb-1">To</label>
            <select
              value={destinationId}
              onChange={e => setDestinationId(e.target.value)}
              className="w-full bg-space-800 border border-space-600 text-slate-200 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-accent-teal"
            >
              <option value="">— select —</option>
              {SELECTABLE.filter(l => l.id !== originId).map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          {selectedLocationId && selectedLocationId !== originId && (
            <button
              onClick={handleMapSelect}
              className="flex-1 text-[10px] py-1.5 border border-space-600 text-slate-400 hover:text-accent-teal hover:border-accent-teal rounded transition-colors"
            >
              Use map selection
            </button>
          )}
          <button
            onClick={handleAdd}
            disabled={!originId || !destinationId || originId === destinationId}
            className="flex-1 text-xs py-2 bg-accent-teal bg-opacity-20 hover:bg-opacity-30 border border-accent-teal text-accent-teal rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-medium"
          >
            + Add Leg
          </button>
        </div>
      </div>
    </div>
  );
}
