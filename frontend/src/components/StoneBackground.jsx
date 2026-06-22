// Each object describes one raised panel in the shared 1600 x 900 SVG coordinate system.
// `points` contains the polygon vertices as "x,y" pairs. Changing these numbers changes
// the panel's position and silhouette without touching the rendering code below.
// `fill` selects one of the gradients from <defs>, while `depth` selects the shadow strength.


function StoneBackground() {
  return (
    // SVG is used instead of a raster image so the composition remains sharp at any size.
    <svg
      className="stoneBackground"
      // All panel coordinates above are authored inside this virtual 1600 x 900 canvas.
      viewBox="0 0 1600 900"
      // Works like background-size: cover: fills the hero and crops excess at the edges.
      preserveAspectRatio="xMidYMid slice"
      // The background is decorative, so screen readers should ignore it.
      aria-hidden="true"
    >
      {/* Definitions are reusable "materials" and effects; they draw nothing by themselves. */}
      <defs>
        {/* The calm graphite base underneath every raised panel. */}
        <linearGradient id="base-surface" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#192022" />
          <stop offset="0.45" stopColor="#14191b" />
          <stop offset="1" stopColor="#0b0e0f" />
        </linearGradient>

        {/* Three panel materials create subtle brightness variation across the cluster. */}
        <linearGradient id="panel-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22292b" />
          <stop offset="0.55" stopColor="#171d1f" />
          <stop offset="1" stopColor="#0c1011" />
        </linearGradient>

        <linearGradient id="panel-mid" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#1b2224" />
          <stop offset="0.6" stopColor="#121719" />
          <stop offset="1" stopColor="#090c0d" />
        </linearGradient>

        <linearGradient id="panel-dark" x1="0" y1="0" x2="1" y2="0.9">
          <stop offset="0" stopColor="#151b1d" />
          <stop offset="1" stopColor="#080b0c" />
        </linearGradient>

        {/* Global lighting: a faint highlight at the upper left and a dark outer vignette. */}
        <radialGradient id="surface-light" cx="35%" cy="28%" r="82%">
          <stop offset="0" stopColor="#354043" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#101516" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.58" />
        </radialGradient>

        {/* Soft panels sit close to the base surface. */}
        <filter id="panelShadowSoft" x="-25%" y="-25%" width="160%" height="170%">
          <feDropShadow dx="8" dy="11" stdDeviation="13" floodColor="#000000" floodOpacity="0.36" />
        </filter>

        {/* Deep panels use a darker, lower shadow and therefore appear more elevated. */}
        <filter id="panelShadowDeep" x="-25%" y="-25%" width="165%" height="180%">
          <feDropShadow dx="13" dy="17" stdDeviation="16" floodColor="#000000" floodOpacity="0.62" />
        </filter>

        {/* Procedural monochrome grain prevents the large flat surface from looking synthetic. */}
        <filter id="surface-noise" x="0" y="0" width="100%" height="100%">
          {/* baseFrequency controls grain size; numOctaves controls its detail. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="17" />
          {/* Remove any accidental color from the generated noise. */}
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            {/* Keep the noise nearly transparent; increase 0.055 for stronger texture. */}
            <feFuncA type="table" tableValues="0 0.055" />
          </feComponentTransfer>
        </filter>
      </defs>

      {/* Layer 1: one uninterrupted graphite background across the entire hero. */}
      <rect width="1600" height="900" fill="url(#base-surface)" />

      {/* Layer 2: render only the six hand-positioned raised panels. */}


      {/* Layer 3: texture is placed over both the base and raised panels. */}
      <rect width="1600" height="900" filter="url(#surface-noise)" opacity="0.62" />
      {/* Layer 4: final lighting unifies all shapes into one scene. */}
      <rect width="1600" height="900" fill="url(#surface-light)" />
    </svg>
  );
}

export default StoneBackground;
