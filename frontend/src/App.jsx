import { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Search, ShoppingCart, UserRound } from "lucide-react";
import "./App.css";

const leftNavItems = ["Home", "Jewelry", "Accesories"];
const rightNavItems = ["Sales", "Clothing", "About Us", "Contact"];

// Product data controls card text, accent color class, and temporary product shape.
const products = [
  { name: "Lavender Hoodie", accent: "red", type: "hoodie" },
  { name: "Pink Drop", accent: "purple", type: "jacket" },
  { name: "Black Street", accent: "cyan", type: "tee" },
  { name: "Cargo Fit", accent: "yellow", type: "cargo" },
  { name: "Neon Crew", accent: "green", type: "crew" },
];

function App() {
  // Stores the clicked navigation item so the green underline stays on it.
  const [activeNavItem, setActiveNavItem] = useState("Home");

  // Used to calculate where the green hoodie border should start.
  // The start point is always the midpoint between ACCESORIES and SALES.
  const desktopShellRef = useRef(null);

  useLayoutEffect(() => {
    const updateNeonStart = () => {
      const shell = desktopShellRef.current;
      if (!shell) return;

      const accessories = shell.querySelector('[data-nav-item="accesories"]');
      const sales = shell.querySelector('[data-nav-item="sales"]');

      if (!accessories || !sales) return;

      const shellRect = shell.getBoundingClientRect();
      const accessoriesRect = accessories.getBoundingClientRect();
      const salesRect = sales.getBoundingClientRect();

      const midpoint =
        accessoriesRect.right + (salesRect.left - accessoriesRect.right) / 2;

      shell.style.setProperty("--neon-start-x", `${midpoint - shellRect.left}px`);
    };

    updateNeonStart();

    const frameId = window.requestAnimationFrame(updateNeonStart);

    window.addEventListener("resize", updateNeonStart);

    const resizeObserver = new ResizeObserver(updateNeonStart);

    if (desktopShellRef.current) {
      resizeObserver.observe(desktopShellRef.current);
    }

    document.fonts?.ready?.then(updateNeonStart);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateNeonStart);
      resizeObserver.disconnect();
    };
  }, []);

  // Shared renderer for both left and right navigation groups.
  const renderNavLink = (item) => {
    const navKey = item.toLowerCase().replaceAll(" ", "-");

    return (
      <a
        key={item}
        data-nav-item={navKey}
        className={item === activeNavItem ? "active" : undefined}
        href={`#${navKey}`}
        onClick={() => setActiveNavItem(item)}
      >
        {item}
      </a>
    );
  };

  return (
    <main className="page">
      {/* Full-screen decorative texture. It stays outside the content container. */}
      <div className="backgroundTexture" aria-hidden="true" />

      {/* Main desktop container. Width limits are controlled in App.css variables. */}
      <div className="desktopStage">
        <div className="desktopShell" ref={desktopShellRef}>
          <SiteHeader renderNavLink={renderNavLink} />

          {/* Hero section: left copy/sale area + right visual slot/neon geometry. */}
          <section className="heroSection" aria-label="New collection">
            <NeonHeroFrame />

            <div className="heroCopy">
              <p className="eyebrow">New Collection</p>

              <h1 className="heroTitle">
                <span>K</span>-Neuhen
              </h1>

              <p className="heroSubtitle">
                Streetwear that speaks louder.
                <br />
                Bold designs. Premium comfort.
                <br />
                Unleash your style.
              </p>

              <a className="shopButton" href="#new-drops">
                Shop Now
                <ArrowRight aria-hidden="true" />
              </a>

              <SaleBadge />
            </div>

            <div className="heroVisual" aria-label="Featured hoodies">
              <div className="heroImageSlot">
                {/* Put the final hoodie group image here later. Keep the slot sizing in CSS. */}
              </div>
            </div>
          </section>

          {/* Desktop product row. CSS keeps five cards in one flexible row. */}
          <section id="new-drops" className="productDrops" aria-label="New drops">
            <h2>
              Explore <span>New Drops</span>
            </h2>

            <div className="productGrid">
              {products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

// Top navigation and the angled blue action panel from the reference design.
function SiteHeader({ renderNavLink }) {
  return (
    <header className="siteHeader">
      <nav className="primaryNav" aria-label="Primary navigation">
        <div className="navCluster navClusterLeft">
          {leftNavItems.map(renderNavLink)}
        </div>

        <div className="navCluster navClusterRight">
          {rightNavItems.map(renderNavLink)}
        </div>
      </nav>

      <div className="cornerPanel" aria-label="Shop actions">
        {/* SVG frame gives the top-right panel its angled cyber shape and glow. */}
        <svg
          className="cornerPanelFrame"
          viewBox="0 0 270 92"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="cyanGlow" x="-20%" y="-45%" width="140%" height="190%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0.62
                        0 0 0 0 1
                        0 0 0 0.95 0"
              />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="panelFade" x1="0%" x2="82%" y1="14%" y2="80%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#172329" stopOpacity="0.64" />
              <stop offset="100%" stopColor="#05090b" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <path className="cornerPanelFill" d="M0 0 H270 V92 H151 L120 66 H30 L0 38 Z" />
          <path className="cornerPanelTint" d="M0 0 H270 V92 H151 L120 66 H30 L0 38 Z" />
          <path
            className="cornerPanelStroke"
            filter="url(#cyanGlow)"
            d="M0 0 V38 L30 66 H120 L151 92 H270"
          />
        </svg>

        <div className="headerActions">
          <button type="button" aria-label="Search">
            <Search aria-hidden="true" />
          </button>

          <button type="button" aria-label="Account">
            <UserRound aria-hidden="true" />
          </button>

          <button className="cartButton" type="button" aria-label="Cart, 1 item">
            <ShoppingCart aria-hidden="true" />
            <span className="cartBadge">1</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// Scalable green divider behind the future hoodie image.
function NeonHeroFrame() {
  return (
    <svg
      className="heroNeonLayer"
      viewBox="0 0 900 680"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hoodiePanelShade" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#111614" stopOpacity="0.08" />
          <stop offset="46%" stopColor="#121817" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#050606" stopOpacity="0.58" />
        </linearGradient>

        <filter id="limeDividerGlow" x="-8%" y="-8%" width="116%" height="116%">
          <feGaussianBlur stdDeviation="3.8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 1
                    0 0 0 0 0.36
                    0 0 0 0.92 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path className="heroDividerShade" d="M0 0 V95 L178 218 V548 L400 650 H900 V0 Z" />
      <path
        className="heroDividerGlow"
        d="M0 0 V95 L178 218 V548 L400 650 H900"
        filter="url(#limeDividerGlow)"
      />
      <path className="heroDividerCore" d="M0 0 V95 L178 218 V548 L400 650 H900" />
      <path className="heroDividerSpark heroDividerSparkTop" d="M0 0 V95 L178 218 V548 L400 650 H900" />
      <path className="heroDividerSpark heroDividerSparkBottom" d="M0 0 V95 L178 218 V548 L400 650 H900" />
    </svg>
  );
}

// Red polygon sale badge under the CTA.
function SaleBadge() {
  return (
    <aside
      className="saleBadge"
      aria-label="Limited sale up to 40 percent off on selected hoodies"
    >
      <div className="saleBadgeTop">
        <span />
        Limited Sale
        <span />
      </div>

      <div className="saleBadgeMain">
        Up To <strong>40%</strong> Off
      </div>

      <div className="saleBadgeBottom">
        <span />
        On Selected Hoodies
        <span />
      </div>
    </aside>
  );
}

// Product card shell. The current product art is placeholder CSS until real images exist.
function ProductCard({ product }) {
  return (
    <article className={`productCard productCard-${product.accent}`}>
      <div className={`productArt productArt-${product.type}`} aria-hidden="true">
        <span />
      </div>

      <div className="productStripes" aria-hidden="true" />

      <div className="productLabel">
        <h3>{product.name}</h3>
        <ArrowRight aria-hidden="true" />
      </div>
    </article>
  );
}

export default App;