import { GridFeatures } from "./GridFeatures";
import { JEWELRY_ITEMS } from "./HeroSectionWithMultiColorBackground";
import { CenteredWithLogo as SiteFooter, Navbar as SiteNavbar } from "./SiteChrome";

export function JewelryPage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <SiteNavbar />
      <header className="mx-auto max-w-7xl px-4 pt-24 text-center md:px-8 md:pt-32">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-indigo-400">
          K-Neuhen Collection
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
          Jewelry
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-400 md:text-lg">
          Nine polished pieces selected to add character, shine, and a sharper finish to any look.
        </p>
      </header>
      <GridFeatures items={JEWELRY_ITEMS} />
      <SiteFooter />
    </div>
  );
}
