import "./App.css";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import StoneBackground from "./components/StoneBackground";


function App() {
  return (
    <div className="page">
      <header className="header">
        <a className="logo" href="/" aria-label="K-Neuhen home">
          <span className="logoAccent">K</span>
          <span>-Neuhen</span>
        </a>

        <nav className="nav" aria-label="Primary navigation">
          <a className="active" href="#new">New In</a>
          <a href="#men">Men</a>
          <a href="#women">Women</a>
          <a href="#collections">Collections</a>
          <a href="#sale">Sale</a>
        </nav>

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

      <main className="stoneHero">
        <StoneBackground />
      </main>

      <div className="scrollTest" aria-hidden="true" />
    </div>
  );
}

export default App;
