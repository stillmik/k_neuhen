import { Delaunay } from "d3-delaunay";

const WIDTH = 1600;
const HEIGHT = 900;

function seededRandom(seed) {
  let value = seed >>> 0;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function createStones() {
  const random = seededRandom(2048);
  const columns = 7;
  const rows = 4;
  const cellWidth = WIDTH / columns;
  const cellHeight = HEIGHT / rows;
  const points = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = (column + 0.5) * cellWidth + (random() - 0.5) * cellWidth * 0.72;
      const y = (row + 0.5) * cellHeight + (random() - 0.5) * cellHeight * 0.72;
      points.push([x, y]);
    }
  }

  const voronoi = Delaunay.from(points).voronoi([0, 0, WIDTH, HEIGHT]);

  return points.map(([centerX, centerY], index) => {
    const polygon = voronoi.cellPolygon(index) ?? [];
    const inset = 3 + random() * 8;
    const shade = 13 + Math.round(random() * 16);
    const lift = 3 + Math.round(random() * 10);

    const face = polygon.map(([x, y]) => {
      const dx = centerX - x;
      const dy = centerY - y;
      const distance = Math.hypot(dx, dy) || 1;

      return [x + (dx / distance) * inset, y + (dy / distance) * inset];
    });

    return {
      id: index,
      points: face.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "),
      shade,
      lift,
    };
  });
}

const STONES = createStones();

function StoneBackground() {
  return (
    <svg
      className="stoneBackground"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stone-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.13" />
          <stop offset="0.42" stopColor="#ffffff" stopOpacity="0.015" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.32" />
        </linearGradient>

        <radialGradient id="stone-vignette" cx="47%" cy="40%" r="78%">
          <stop offset="0" stopColor="#172023" stopOpacity="0.08" />
          <stop offset="0.58" stopColor="#06090a" stopOpacity="0.16" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.72" />
        </radialGradient>

        <filter id="stone-noise" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="3"
            seed="11"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.085" />
          </feComponentTransfer>
        </filter>
      </defs>

      <rect width={WIDTH} height={HEIGHT} fill="#070a0b" />

      <g className="stoneBackground__tiles">
        {STONES.map((stone) => (
          <g key={stone.id}>
            <polygon
              points={stone.points}
              fill="#010303"
              transform={`translate(${stone.lift} ${stone.lift + 5})`}
            />
            <polygon
              points={stone.points}
              fill={`rgb(${stone.shade}, ${stone.shade + 3}, ${stone.shade + 4})`}
              stroke="#090c0d"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon points={stone.points} fill="url(#stone-light)" />
          </g>
        ))}
      </g>

      <rect width={WIDTH} height={HEIGHT} filter="url(#stone-noise)" opacity="0.7" />
      <rect width={WIDTH} height={HEIGHT} fill="url(#stone-vignette)" />
    </svg>
  );
}

export default StoneBackground;
