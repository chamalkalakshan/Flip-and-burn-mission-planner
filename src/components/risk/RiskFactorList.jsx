import RiskFactorRow from './RiskFactorRow.jsx';

export default function RiskFactorList({ factors }) {
  return (
    <div className="divide-y divide-space-700">
      {factors.map(factor => (
        <RiskFactorRow key={factor.id} factor={factor} />
      ))}
    </div>
  );
}
