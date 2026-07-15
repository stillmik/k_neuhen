import { lazy, Suspense } from "react";
import "./App.css";

const pages = {
  "about-us": lazy(() =>
    import("./components/AboutUsPage").then((module) => ({
      default: module.AboutUsPage,
    }))
  ),
  "new-drops": lazy(() =>
    import("./components/NewDropsPage").then((module) => ({
      default: module.NewDropsPage,
    }))
  ),
  jewelry: lazy(() =>
    import("./components/JewelryPage").then((module) => ({
      default: module.JewelryPage,
    }))
  ),
  login: lazy(() =>
    import("./components/SimpleLoginWithGridLines").then((module) => ({
      default: module.SimpleLoginWithGridLines,
    }))
  ),
  register: lazy(() =>
    import("./components/SimpleRegistrationWithGridLines").then((module) => ({
      default: module.SimpleRegistrationWithGridLines,
    }))
  ),
  item: lazy(() =>
    import("./components/ItemPage").then((module) => ({
      default: module.ItemPage,
    }))
  ),
  home: lazy(() =>
    import("./components/HeroSectionWithMultiColorBackground").then((module) => ({
      default: module.HeroSectionWithMultiColorBackground,
    }))
  ),
};

function App() {
  const page = document.getElementById("root")?.dataset.page || "home";
  const Page = pages[page] || pages.home;

  return (
    <main className="page dark">
      <Suspense fallback={null}>
        <Page />
      </Suspense>
    </main>
  );
}

export default App;
