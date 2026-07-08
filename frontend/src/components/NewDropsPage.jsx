import { AboutBackground } from "./PageBackground";
import { CenteredWithLogo, Navbar } from "./SiteChrome";

export function NewDropsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-900 text-white">
      <AboutBackground />
      <Navbar />
      <main className="relative z-10 min-h-[60vh]" />
      <CenteredWithLogo />
    </div>
  );
}
