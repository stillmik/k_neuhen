export function AuthPageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-neutral-900" />
      <div className="absolute inset-[-20%] grid -rotate-45 grid-cols-4 gap-10 opacity-70">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className={`relative ${index === 2 ? "bg-gradient-to-b from-transparent via-neutral-800 to-transparent" : ""}`}>
            <div className="absolute inset-y-0 left-0 w-px bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.3)_0_1px,transparent_1px_5px)]" />
            <div className="absolute inset-y-0 right-0 w-px bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.3)_0_1px,transparent_1px_5px)]" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_22%,rgba(82,82,91,0.22),transparent_52%)]" />
    </div>
  );
}
