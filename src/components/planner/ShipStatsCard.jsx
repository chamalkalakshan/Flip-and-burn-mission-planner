import StatRow from '../common/StatRow.jsx';
import { formatMass, formatGForce } from '../../utils/formatters.js';
import { fuelBarColor } from '../../utils/colorScale.js';
import { useMissionPlan } from '../../hooks/useMissionPlan.js';

export default function ShipStatsCard({ ship }) {
  const { legResults } = useMissionPlan();
  const lastLeg = legResults[legResults.length - 1];
  const currentFuel = lastLeg ? lastLeg.fuelAfterRefuelT : ship.maxFuelT;
  const fuelPct = currentFuel / ship.maxFuelT;

  return (
    <div className="bg-space-800 border border-space-700 rounded-lg p-3">
      <div className="grid grid-cols-2 gap-x-4">
        <StatRow label="Thrust" value={formatGForce(ship.thrustG)} />
        <StatRow label="Isp" value={`${ship.isp.toLocaleString()}s`} />
        <StatRow label="Dry mass" value={formatMass(ship.dryMassT)} />
        <StatRow label="Max fuel" value={formatMass(ship.maxFuelT)} />
        <StatRow label="Max cargo" value={ship.maxCargoT > 0 ? formatMass(ship.maxCargoT) : '—'} />
        <StatRow label="Drive" value={ship.driveType} />
      </div>

      {/* Fuel bar */}
      <div className="mt-3">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="text-slate-500">Fuel remaining</span>
          <span className="tabular-nums" style={{ color: fuelBarColor(fuelPct) }}>
            {formatMass(currentFuel)} / {formatMass(ship.maxFuelT)}
          </span>
        </div>
        <div className="h-1.5 bg-space-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${fuelPct * 100}%`, background: fuelBarColor(fuelPct) }}
          />
        </div>
      </div>
    </div>
  );
}
