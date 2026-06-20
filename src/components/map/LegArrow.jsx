import { formatDays } from '../../utils/formatters.js';

export default function LegArrow({ fromXY, toXY, legIndex, isFeasible, isHighlighted, travelTimeDays }) {
  const color = isFeasible ? '#00bcd4' : '#ef4444';
  const opacity = isHighlighted ? 1 : 0.55;
  const strokeWidth = isHighlighted ? 2 : 1.2;
  const markerId = isFeasible ? 'arrowHead' : 'arrowHeadRed';

  // Shorten the line slightly so arrowhead doesn't overlap the node circle
  const dx = toXY.x - fromXY.x;
  const dy = toXY.y - fromXY.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const startX = fromXY.x + ux * 9;
  const startY = fromXY.y + uy * 9;
  const endX = toXY.x - ux * 12;
  const endY = toXY.y - uy * 12;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  return (
    <g opacity={opacity}>
      <line
        x1={startX} y1={startY}
        x2={endX} y2={endY}
        stroke={color}
        strokeWidth={strokeWidth}
        markerEnd={`url(#${markerId})`}
        strokeDasharray={isFeasible ? 'none' : '4 3'}
      />
      {/* Leg index badge */}
      <circle cx={midX} cy={midY} r={7} fill="#0a0e1a" stroke={color} strokeWidth="0.8" />
      <text
        x={midX} y={midY + 3.5}
        textAnchor="middle"
        fontSize="6"
        fill={color}
        fontFamily="JetBrains Mono, monospace"
        fontWeight="600"
      >
        {legIndex + 1}
      </text>
      {/* Travel time label */}
      {travelTimeDays != null && (
        <text
          x={midX + 10} y={midY - 3}
          fontSize="5.5"
          fill="#64748b"
          fontFamily="JetBrains Mono, monospace"
        >
          {formatDays(travelTimeDays)}
        </text>
      )}
    </g>
  );
}
