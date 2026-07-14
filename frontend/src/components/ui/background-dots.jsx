export function BackgroundDots() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      style={{
        backgroundImage: "radial-gradient(circle at center, rgb(255 255 255 / 0.09) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
      aria-hidden="true"
    />
  );
}
