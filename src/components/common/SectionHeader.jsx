export default function SectionHeader({ children, icon }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      {icon && <span className="text-accent-teal text-sm">{icon}</span>}
      <h2 className="text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
        {children}
      </h2>
    </div>
  );
}
