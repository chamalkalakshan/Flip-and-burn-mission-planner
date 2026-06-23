import { useMissionStore } from '../../store/missionStore.js';

import LegListItem from './LegListItem.jsx';

export default function LegList({ legResults }) {
  const legs = useMissionStore(s => s.legs);
  const clearLegs = useMissionStore(s => s.clearLegs);

  if (legs.length === 0) {
    return (
      <p className="text-[11px] text-slate-600 italic text-center py-4">
        No legs added yet. Plan a route above.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-slate-500">{legs.length} leg{legs.length !== 1 ? 's' : ''}</span>
        <button
          onClick={clearLegs}
          className="text-[10px] text-slate-600 hover:text-red-400 transition-colors"
        >
          Clear all
        </button>
      </div>
      {legs.map((legInput, i) => {
        const result = legResults[i];
        if (!result) return null;
        return (
          <LegListItem
            key={legInput.id}
            legInput={legInput}
            legResult={result}
            legIndex={i}
          />
        );
      })}
    </div>
  );
}
