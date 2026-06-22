import "./App.css";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import StoneBackground from "./components/StoneBackground";


function App() {
  return (
    <div className="page">
      {/* The only real interface section currently implemented. */}
      <header className="header">
        {/* The green K is isolated so it can be colored without affecting the brand name. */}
        <a className="logo" href="/" aria-label="K-Neuhen home">
          <span className="logoAccent">K</span>
          <span>-Neuhen</span>
        </a>

        {/* Desktop navigation; CSS hides it on narrow screens without adding a burger. */}
        <nav className="nav" aria-label="Primary navigation">
          <a className="active" href="#new">New In</a>
          <a href="#men">Men</a>
          <a href="#women">Women</a>
          <a href="#collections">Collections</a>
          <a href="#sale">Sale</a>
        </nav>

        {/* Icons come from lucide-react and inherit their color from each button. */}
        <div className="actions">
          <button className="iconButton" type="button" aria-label="Search">
            <Search aria-hidden="true" />
          </button>
          <button className="iconButton" type="button" aria-label="Account">
            <UserRound aria-hidden="true" />
          </button>
          <button
            className="iconButton cartButton"
            type="button"
            aria-label="Cart, 2 items"
          >
            <ShoppingCart aria-hidden="true" />
            <span className="cartCount">2</span>
          </button>
        </div>
      </header>

      {/* The hero currently contains only the decorative background component. */}
      <main className="stoneHero">
        <StoneBackground />
      </main>

      {/* Temporary empty height used to test page scrolling before real sections exist. */}
      <div className="scrollTest" aria-hidden="true" />
    </div>
  );
}

export default App;
