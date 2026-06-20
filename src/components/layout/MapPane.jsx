import SolarSystemMap from '../map/SolarSystemMap.jsx';

export default function MapPane() {
  return (
    <div className="w-full h-full relative bg-space-950 overflow-hidden">
      <SolarSystemMap />
      <div className="absolute bottom-3 left-3 text-[10px] text-slate-500 font-mono select-none">
        scroll to zoom · drag to pan
      </div>
    </div>
  );
}
