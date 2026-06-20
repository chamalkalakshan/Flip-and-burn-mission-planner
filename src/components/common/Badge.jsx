import { factionColor } from '../../utils/colorScale.js';
import { FACTIONS } from '../../data/factions.js';

export default function Badge({ factionId, label, color }) {
  const resolvedColor = color ?? factionColor(factionId);
  const resolvedLabel = label ?? FACTIONS[factionId]?.shortName ?? factionId;

  return (
    <span
      className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase"
      style={{ color: resolvedColor, border: `1px solid ${resolvedColor}33`, background: `${resolvedColor}18` }}
    >
      {resolvedLabel}
    </span>
  );
}
