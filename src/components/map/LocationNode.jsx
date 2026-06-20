import { useCallback } from 'react';
import { useUiStore } from '../../store/uiStore.js';
import { useMissionStore } from '../../store/missionStore.js';
import { factionColor } from '../../utils/colorScale.js';
import { locationToSvgXY } from './SolarSystemMap.jsx';

const TYPE_RADIUS = {
  star: 14,
  planet: 7,
  moon: 5,
  station: 4,
  ring: 9,
};

export default function LocationNode({ location, cx, cy }) {
  const selectedLocationId = useUiStore(s => s.selectedLocationId);
  const hoveredLocationId = useUiStore(s => s.hoveredLocationId);
  const { selectLocation, hoverLocation } = useUiStore();
  const legs = useMissionStore(s => s.legs);

  const isSelected = selectedLocationId === location.id;
  const isHovered = hoveredLocationId === location.id;
  const isInRoute = legs.some(l => l.originId === location.id || l.destinationId === location.id);

  const { x, y } = location.id === 'sun'
    ? { x: cx, y: cy }
    : locationToSvgXY(location);

  const baseR = TYPE_RADIUS[location.type] ?? 5;
  const r = isSelected ? baseR + 3 : baseR;
  const color = location.id === 'sun' ? '#FDB813' : factionColor(location.faction);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    selectLocation(location.id);
  }, [location.id, selectLocation]);

  const handleMouseEnter = useCallback(() => hoverLocation(location.id), [location.id, hoverLocation]);
  const handleMouseLeave = useCallback(() => hoverLocation(null), [hoverLocation]);

  return (
    <g
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer"
    >
      {/* Glow ring for selected/hovered */}
      {(isSelected || isHovered) && (
        <circle cx={x} cy={y} r={r + 5} fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      )}

      {/* Route highlight ring */}
      {isInRoute && !isSelected && (
        <circle cx={x} cy={y} r={r + 3} fill="none" stroke="#00bcd4" strokeWidth="0.8" opacity="0.6" />
      )}

      {/* Sun glow */}
      {location.id === 'sun' && (
        <circle cx={x} cy={y} r={r + 8} fill="#FDB813" opacity="0.08" />
      )}

      <circle
        cx={x}
        cy={y}
        r={r}
        fill={color}
        opacity={isSelected ? 1 : isHovered ? 0.9 : 0.8}
        stroke={isSelected ? '#fff' : 'none'}
        strokeWidth="0.8"
      />

      {/* Label */}
      {(location.type !== 'moon' || isSelected || isHovered) && (
        <text
          x={x + r + 3}
          y={y + 3}
          fontSize={isSelected ? 8 : 7}
          fill={isSelected ? '#e2e8f0' : '#94a3b8'}
          fontFamily="JetBrains Mono, monospace"
          pointerEvents="none"
        >
          {location.name}
        </text>
      )}
    </g>
  );
}
