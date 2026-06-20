import ShipSelector from '../planner/ShipSelector.jsx';
import ShipStatsCard from '../planner/ShipStatsCard.jsx';
import CargoInput from '../planner/CargoInput.jsx';
import LegBuilder from '../planner/LegBuilder.jsx';
import LegList from '../planner/LegList.jsx';
import MissionSummary from '../planner/MissionSummary.jsx';
import RiskPanel from '../risk/RiskPanel.jsx';
import { useMissionPlan } from '../../hooks/useMissionPlan.js';

export default function PlannerPane() {
  const { ship, legResults, missionSummary, riskAssessment } = useMissionPlan();

  return (
    <div className="h-full flex flex-col bg-space-900 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-space-700 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
          <h1 className="text-xs font-semibold tracking-[0.2em] text-slate-300 uppercase">
            Flip-and-Burn Mission Planner
          </h1>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        <ShipSelector />
        <ShipStatsCard ship={ship} />
        <div className="section-divider" />
        <CargoInput ship={ship} />
        <div className="section-divider" />
        <LegBuilder />
        <LegList legResults={legResults} />
        {legResults.length > 0 && (
          <>
            <div className="section-divider" />
            <MissionSummary summary={missionSummary} />
            <div className="section-divider" />
            <RiskPanel risk={riskAssessment} />
          </>
        )}
      </div>
    </div>
  );
}
