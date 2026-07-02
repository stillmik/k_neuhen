import { useState } from "react";
import { ArrowRight, Search, ShoppingCart, UserRound } from "lucide-react";
import "./App.css";
import pinkDropImage from "./assets/hoodies_temp/1644c644-35d9-4a5d-8e43-49947f557bae.png";
import lavenderHoodieImage from "./assets/hoodies_temp/6260999c-5799-4b79-91a5-13bf40b3db8f.png";
import blackStreetImage from "./assets/hoodies_temp/d846e74b-58f7-4386-8b1c-b4324ce45629.png";
import neonCrewImage from "./assets/hoodies_temp/e6595b20-70e2-41da-bbf5-2d392796432f.png";
import cargoFitImage from "./assets/hoodies_temp/92c184d8-93b2-4107-8514-275034de9e62.png";

const navItems = ["Home", "Jewelry", "Accesories", "Sales", "Clothing", "About Us", "Contact"];

// Product data controls card text, accent color class, and real product image.
const products = [
  { name: "Lavender Hoodie", type: "hoodie", price: "$69", accent: "red", image: lavenderHoodieImage },
  { name: "Pink Drop", type: "jacket", price: "$79", accent: "purple", image: pinkDropImage },
  { name: "Black Street", type: "hoodie", price: "$59", accent: "cyan", image: blackStreetImage },
  { name: "Cargo Fit", type: "hoodie", price: "$89", accent: "gold", image: cargoFitImage },
  { name: "Neon Crew", type: "hoodie", price: "$49", accent: "green", image: neonCrewImage },
];

function App() {
  // Stores the clicked navigation item so the green underline stays on it.
  const [activeNavItem, setActiveNavItem] = useState("Home");

  // Shared renderer for the header navigation links.
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
        <div className="desktopShell">
          <SiteHeader renderNavLink={renderNavLink} />

          {/* Hero section: single background zone with left-aligned copy. */}
          <section className="heroSection" aria-label="New collection">
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
                <span>Shop Now</span>
                <ArrowRight aria-hidden="true" />
              </a>

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
          </section>
        </div>
      </div>
    </main>
  );
}

// Top navigation and simple action icons on the right.
function SiteHeader({ renderNavLink }) {
  return (
    <header className="siteHeader">
      <nav className="primaryNav" aria-label="Primary navigation">
        <div className="navCluster navClusterLeft">
          {navItems.map(renderNavLink)}
        </div>
      </nav>

      <div className="headerActions" aria-label="Shop actions">
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
    </header>
  );
}

// Product card shell with real hoodie image.
function ProductCard({ product }) {
  return (
    <article className={`productCard productCard-${product.accent}`}>
      <div className="productArt">
        <img src={product.image} alt="" aria-hidden="true" loading="lazy" />
      </div>

      <span className="productTextDivider" aria-hidden="true" />

      <div className="productLabel">
        <h3>{product.name}</h3>
        <div className="productMeta">
          <span className="productType">{product.type}</span>
          <span className="productPrice">{product.price}</span>
        </div>
      </div>

      <span className="productArrowButton" aria-hidden="true">
        <ArrowRight />
      </span>
    </article>
  );
}

export default App;
