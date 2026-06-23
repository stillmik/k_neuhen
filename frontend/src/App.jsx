import { Search, ShoppingCart, UserRound, Zap } from "lucide-react";
import "./App.css";
import heroTopBackground from "./assets/hero-top-background.png";

// Header links follow the order shown in the reference.
const navItems = ["Home", "Shop", "New Arrivals", "Collections", "About Us"];

function App() {
  return (
    // For this stage, the page contains only the top background and its header.
    <main className="heroTop">
      {/* The supplied image is rendered as a dedicated background layer. */}
      <img
        className="heroBackdrop"
        src={heroTopBackground}
        alt=""
        aria-hidden="true"
      />

      <header className="siteHeader">
        {/* Brand stays on the left; the green bolt echoes the reference logo. */}
        <a className="brand" href="/" aria-label="K-Neuhen home">
          <Zap className="brandBolt" aria-hidden="true" />
          <span className="brandName">
            <span>K</span>-Neuhen
          </span>
        </a>

        {/* Desktop navigation is centered independently of the side columns. */}
        <nav className="primaryNav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`}>
              {item}
            </a>
          ))}
        </nav>

        {/* Thin Lucide icons reproduce the controls on the right. */}
        <div className="headerActions">
          <button type="button" aria-label="Search">
            <Search aria-hidden="true" />
          </button>
          <button type="button" aria-label="Account">
            <UserRound aria-hidden="true" />
          </button>
          <button className="cartButton" type="button" aria-label="Cart, 0 items">
            <ShoppingCart aria-hidden="true" />
            <span className="cartBadge">0</span>
          </button>
        </div>
      </header>
    </main>
  );
}

export default App;
