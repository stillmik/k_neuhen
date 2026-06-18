import { useEffect, useMemo, useRef, useState } from "react";

const SQRT_3 = Math.sqrt(3);

// Deterministic noise keeps every tile's depth stable during resize.
function noise(row, column) {
  const value = Math.sin(row * 91.17 + column * 47.31) * 43758.5453;
  return value - Math.floor(value);
}

export default function HexBackground({
  side = 92,
  gap = 7,
  depth = 14,
  surface = "#202224",
  channel = "#070808",
  glow = "#d72f16",
}) {
  const rootRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const root = rootRef.current;
    const updateSize = () => {
      const bounds = root.getBoundingClientRect();
      setSize({ width: bounds.width, height: bounds.height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const geometry = useMemo(() => {
    const width = SQRT_3 * side;
    const height = side * 2;
    const stepX = width + gap;
    const stepY = side * 1.5 + gap * 0.86;
    return { width, height, stepX, stepY };
  }, [side, gap]);

  const tiles = useMemo(() => {
    const rows = Math.ceil((size.height + geometry.height) / geometry.stepY) + 1;
    const columns = Math.ceil((size.width + geometry.width) / geometry.stepX) + 2;
    const result = [];

    for (let row = -1; row < rows; row += 1) {
      for (let column = -1; column < columns; column += 1) {
        const level = noise(row, column);
        result.push({
          key: `${row}:${column}`,
          x: column * geometry.stepX + (row % 2 ? geometry.stepX / 2 : 0),
          y: row * geometry.stepY,
          level,
          angle: Math.round(noise(column, row + 8) * 360),
        });
      }
    }

    return result;
  }, [size, geometry]);

  return (
    <div
      ref={rootRef}
      className="hex-background"
      aria-hidden="true"
      style={{
        "--channel": channel,
        "--glow": glow,
      }}
    >
      {tiles.map(({ key, x, y, level, angle }) => (
        <div
          key={key}
          className="hex-tile"
          style={{
            width: geometry.width,
            height: geometry.height,
            transform: `translate3d(${x}px, ${y}px, 0)`,
            "--surface": surface,
            "--lift": `${level * depth}px`,
            "--shadow-blur": `${2 + level * depth * 0.35}px`,
            "--highlight-alpha": 0.03 + level * 0.05,
            "--shade-alpha": 0.12 + level * 0.16,
            "--brightness": 0.86 + level * 0.2,
            "--overlay-opacity": 0.05 + level * 0.14,
            "--angle": `${angle}deg`,
          }}
        />
      ))}
    </div>
  );
}
