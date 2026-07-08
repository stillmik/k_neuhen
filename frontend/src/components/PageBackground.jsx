export function AboutBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-neutral-900" />
      <div className="absolute inset-0 rotate-45 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:220px_220px] opacity-35" />
      <div className="absolute left-1/2 top-0 h-full w-1/2 bg-gradient-to-br from-neutral-800/70 via-neutral-900/20 to-transparent opacity-70" />
    </div>
  );
}
