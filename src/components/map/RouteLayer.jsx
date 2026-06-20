import { useMissionPlan } from '../../hooks/useMissionPlan.js';
import { useUiStore } from '../../store/uiStore.js';
import { LOCATIONS_MAP } from '../../data/locations.js';
import { locationToSvgXY } from './SolarSystemMap.jsx';
import LegArrow from './LegArrow.jsx';

export default function RouteLayer({ cx, cy }) {
  const { legResults } = useMissionPlan();
  const highlightedLegIndex = useUiStore(s => s.highlightedLegIndex);

  if (legResults.length === 0) return null;

  return (
    <g>
      {legResults.map((leg, i) => {
        const origin = LOCATIONS_MAP[leg.originId];
        const dest = LOCATIONS_MAP[leg.destinationId];
        if (!origin || !dest) return null;

        const fromXY = origin.id === 'sun' ? { x: cx, y: cy } : locationToSvgXY(origin);
        const toXY = dest.id === 'sun' ? { x: cx, y: cy } : locationToSvgXY(dest);

        return (
          <LegArrow
            key={leg.legId}
            fromXY={fromXY}
            toXY={toXY}
            legIndex={i}
            isFeasible={leg.isFeasible}
            isHighlighted={highlightedLegIndex === i}
            travelTimeDays={leg.travelTimeDays}
          />
        );
      })}
    </g>
  );
}
