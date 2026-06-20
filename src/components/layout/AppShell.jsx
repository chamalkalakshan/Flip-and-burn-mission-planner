import MapPane from './MapPane.jsx';
import PlannerPane from './PlannerPane.jsx';

export default function AppShell() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-space-900">
      <div className="flex-1 min-w-0 relative">
        <MapPane />
      </div>
      <div className="w-[420px] flex-shrink-0 border-l border-space-700">
        <PlannerPane />
      </div>
    </div>
  );
}
