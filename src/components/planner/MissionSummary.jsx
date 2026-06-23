import SectionHeader from '../common/SectionHeader.jsx';
import StatRow from '../common/StatRow.jsx';
import { formatDays, formatDeltaV, formatMass } from '../../utils/formatters.js';

export default function MissionSummary({ summary }) {
  if (!summary || summary.totalLegs === 0) return null;

  return (
    <div>
      <SectionHeader icon="📊">Mission Summary</SectionHeader>
      <div className="bg-space-800 border border-space-700 rounded-lg p-3 space-y-0.5">
        <StatRow label="Total legs" value={summary.totalLegs} />
        <StatRow label="Total travel time" value={formatDays(summary.totalTravelTimeDays)} />
        <StatRow label="Total Δv" value={formatDeltaV(summary.totalDeltaVKms)} />
        <StatRow label="Fuel remaining" value={formatMass(summary.finalFuelT)} />
        <StatRow label="Cargo" value={summary.cargoMassT > 0 ? formatMass(summary.cargoMassT) : '—'} />
        <div className="pt-1.5 mt-1.5 border-t border-space-700">
          <div className="flex justify-between items-center">
            <span className="stat-label">Mission status</span>
            {summary.isMissionFeasible ? (
              <span className="text-xs font-semibold text-green-400">✓ Feasible</span>
            ) : (
              <span className="text-xs font-semibold text-red-400">
                ✕ Fuel failure at leg {summary.insufficientFuelAtLeg + 1}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
