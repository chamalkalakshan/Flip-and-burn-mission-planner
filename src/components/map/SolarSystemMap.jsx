import { useRef, useCallback } from 'react';
import { useMapZoom } from '../../hooks/useMapZoom.js';
import { useUiStore } from '../../store/uiStore.js';
import { LOCATIONS } from '../../data/locations.js';
import OrbitalRings from './OrbitalRings.jsx';
import LocationNode from './LocationNode.jsx';
import RouteLayer from './RouteLayer.jsx';
import MapTooltip from './MapTooltip.jsx';

const SVG_W = 900;
const SVG_H = 900;
const CX = SVG_W / 2;
const CY = SVG_H / 2;
const MAX_BODY_AU = 32;
const MAX_RING_R = 420;

// Square-root radial scale so inner and outer planets are both visible
export function auToSvgR(au) {
  if (au <= 0) return 0;
  return MAX_RING_R * Math.sqrt(au / MAX_BODY_AU);
}

export function locationToSvgXY(location) {
  const r = auToSvgR(location.distanceFromSunAU);
  const angle = (location.mapAngleDeg * Math.PI) / 180;
  return {
    x: CX + r * Math.cos(angle),
    y: CY + r * Math.sin(angle),
  };
}

export default function SolarSystemMap() {
  const svgRef = useRef(null);
  const { transform, resetZoom } = useMapZoom(svgRef);
  const { selectLocation } = useUiStore();

  const handleBgClick = useCallback(() => {
    selectLocation(null);
  }, [selectLocation]);

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="cursor-grab active:cursor-grabbing select-none"
        onClick={handleBgClick}
      >
        <defs>
          <radialGradient id="spaceGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0f1526" />
            <stop offset="100%" stopColor="#050810" />
          </radialGradient>
          <marker id="arrowHead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#00bcd4" />
          </marker>
          <marker id="arrowHeadRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#ef4444" />
          </marker>
        </defs>

        {/* Background */}
        <rect width={SVG_W} height={SVG_H} fill="url(#spaceGradient)" />

        {/* Star field */}
        <StarField />

        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
          <OrbitalRings cx={CX} cy={CY} />
          <RouteLayer cx={CX} cy={CY} />
          {LOCATIONS.filter(l => l.id !== 'sun').map(loc => (
            <LocationNode key={loc.id} location={loc} cx={CX} cy={CY} />
          ))}
          {/* Sun */}
          <LocationNode
            key="sun"
            location={LOCATIONS.find(l => l.id === 'sun')}
            cx={CX}
            cy={CY}
          />
        </g>
      </svg>

      {/* Reset zoom button */}
      <button
        onClick={resetZoom}
        className="absolute top-3 right-3 px-2 py-1 text-[10px] bg-space-700 hover:bg-space-600 text-slate-400 hover:text-slate-200 border border-space-600 rounded transition-colors"
      >
        Reset View
      </button>

      <MapTooltip />
    </div>
  );
}

function StarField() {
  const stars = [
    [45, 38], [120, 75], [230, 42], [380, 20], [490, 65], [610, 30], [720, 55], [840, 25],
    [60, 140], [180, 160], [300, 120], [450, 150], [570, 110], [680, 145], [800, 130], [880, 155],
    [30, 250], [150, 280], [270, 230], [410, 260], [530, 240], [650, 270], [760, 245], [870, 265],
    [90, 370], [200, 350], [340, 390], [480, 360], [600, 380], [710, 355], [820, 375], [855, 390],
    [25, 490], [170, 470], [310, 510], [460, 480], [580, 500], [690, 475], [790, 495], [865, 505],
    [70, 620], [190, 600], [330, 640], [470, 610], [590, 630], [700, 605], [810, 625], [875, 635],
    [40, 740], [160, 720], [290, 760], [430, 730], [560, 750], [670, 725], [780, 745], [860, 755],
    [110, 860], [220, 840], [360, 880], [500, 850], [630, 870], [740, 845], [850, 865], [890, 880],
  ];

  return (
    <g opacity="0.6">
      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={Math.random() < 0.3 ? 1.2 : 0.7} fill="#e2e8f0" opacity={0.3 + (i % 5) * 0.1} />
      ))}
    </g>
  );
}
