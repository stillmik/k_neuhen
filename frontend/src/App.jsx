import { useEffect, useState } from "react";
import { AboutUsPage } from "./components/AboutUsPage";
import { HeroSectionWithMultiColorBackground } from "./components/HeroSectionWithMultiColorBackground";
import { SimpleLoginWithGridLines } from "./components/SimpleLoginWithGridLines";
import "./App.css";

function App() {
  const [route, setRoute] = useState(() => window.location.hash || "#home");

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || "#home");

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <main className="page dark">
      {route === "#login" ? (
        <SimpleLoginWithGridLines />
      ) : route === "#about-us" ? (
        <AboutUsPage />
      ) : (
        <HeroSectionWithMultiColorBackground />
      )}
    </main>
  );
}

export default App;
