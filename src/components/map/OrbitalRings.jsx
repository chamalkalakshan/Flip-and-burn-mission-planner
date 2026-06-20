import { LOCATIONS } from '../../data/locations.js';
import { auToSvgR } from './SolarSystemMap.jsx';

const ORBIT_BODIES = ['mercury', 'venus', 'earth', 'mars', 'ceres', 'ganymede', 'titan', 'triton'];

export default function OrbitalRings({ cx, cy }) {
  const bodies = LOCATIONS.filter(l => ORBIT_BODIES.includes(l.id));

  return (
    <g>
      {bodies.map(body => (
        <circle
          key={body.id}
          cx={cx}
          cy={cy}
          r={auToSvgR(body.distanceFromSunAU)}
          fill="none"
          stroke="#1e2a4a"
          strokeWidth="0.5"
          strokeDasharray="3 4"
        />
      ))}
    </g>
  );
}
