import { CryptgenFeatureCards } from "./CryptgenFeatureCards";
import { DeployAgentsAcrossPlatformsSection } from "./DeployAgentsAcrossPlatformsSection";
import { AboutBackground } from "./PageBackground";
import { CenteredWithLogo, Navbar } from "./SiteChrome";

export function AboutUsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-900 text-white">
      <AboutBackground />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-8 md:pt-16">
        <DeployAgentsAcrossPlatformsSection />
        <CryptgenFeatureCards />
      </main>
      <CenteredWithLogo />
    </div>
  );
}
