import SectionHeader from '../common/SectionHeader.jsx';
import RiskMeter from './RiskMeter.jsx';
import RiskFactorList from './RiskFactorList.jsx';

export default function RiskPanel({ risk }) {
  if (!risk || risk.factors.length === 0) return null;

  return (
    <div>
      <SectionHeader icon="⚠">Risk Assessment</SectionHeader>
      <div className="bg-space-800 border border-space-700 rounded-lg p-3 space-y-3">
        <RiskMeter
          score={risk.overallScore}
          label={risk.overallLabel}
          color={risk.overallColor}
        />
        <div className="section-divider" />
        <RiskFactorList factors={risk.factors} />
      </div>
    </div>
  );
}
