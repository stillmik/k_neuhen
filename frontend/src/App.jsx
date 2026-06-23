import { useEffect, useMemo, useRef } from "react";
import "./App.css";
import { Search, ShoppingCart, UserRound } from "lucide-react";

// Navigation data keeps labels, links, and state ids in one readable place.
const navItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "shop", label: "Shop", href: "#shop" },
  { id: "new-arrivals", label: "New Arrivals", href: "#new-arrivals" },
  { id: "collections", label: "Collections", href: "#collections" },
  { id: "about-us", label: "About Us", href: "#about-us" },
];

const HEXAGON_ROWS = 64;
const HEXAGONS_PER_ROW = 80;

function App() {
  const cursorGlowRef = useRef(null);

  const hexagonRows = useMemo(
    () =>
      Array.from({ length: HEXAGON_ROWS }, (_, rowIndex) => ({
        id: `row-${rowIndex}`,
        cells: Array.from(
          { length: HEXAGONS_PER_ROW },
          (_, cellIndex) => `hexagon-${rowIndex}-${cellIndex}`
        ),
      })),
    []
  );

  useEffect(() => {
    const glow = cursorGlowRef.current;
    if (!glow) return;

    const onPointerMove = (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
      glow.style.opacity = "1";
    };

    const onPointerLeave = () => {
      glow.style.opacity = "0";
    };

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="page">
      <div className="cursorGlow" ref={cursorGlowRef} aria-hidden="true" />

      <main className="hexagonBackground" aria-hidden="true">
        {hexagonRows.map((row) => (
          <div className="hexagonRow" key={row.id}>
            {row.cells.map((cellId) => (
              <div className="hexagon" key={cellId} />
            ))}
          </div>
        ))}
      </main>

      {/* Header is the only visible content section right now. */}
      <header className="siteHeader">
        {/* Left logo: neon K plus the K-Neuhen brand name. */}
        <a className="brand" href="/" aria-label="K-Neuhen home">
          <span className="brandText">
            <span className="brandK">K</span>
            <span>-Neuhen</span>
          </span>
        </a>

        {/* Center navigation mirrors the reference order; links turn green only on hover. */}
        <nav className="primaryNav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.id} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right controls use lucide-react icons, matching the thin white strokes in the screenshot. */}
        <div className="headerActions">
          <button className="headerIconButton" type="button" aria-label="Search">
            <Search aria-hidden="true" />
          </button>
          <button className="headerIconButton" type="button" aria-label="Account">
            <UserRound aria-hidden="true" />
          </button>
          <button
            className="headerIconButton cartButton"
            type="button"
            aria-label="Cart, 0 items"
          >
            <ShoppingCart aria-hidden="true" />
            <span className="cartBadge">0</span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;