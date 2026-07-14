import { useState } from "react";
import { cn } from "../lib/utils";

export function CenteredWithLogo() {
  const pages = [
    { title: "Home", href: "/" },
    { title: "Jewelry", href: "/jewelry/" },
    { title: "Accessories", href: "/#accessories" },
    { title: "Clothing", href: "/#clothing" },
    { title: "Sales", href: "/#sales" },
    { title: "About Us", href: "/about-us/" },
    { title: "Contact", href: "/#contact" },
    { title: "New Drops", href: "/new-drops/" },
  ];

  const socials = [
    { title: "Twitter", icon: TwitterIcon },
    { title: "LinkedIn", icon: LinkedinIcon },
    { title: "GitHub", icon: GithubIcon },
    { title: "Facebook", icon: FacebookIcon },
    { title: "Instagram", icon: InstagramIcon },
  ];

  return (
    <footer className="relative z-20 w-full overflow-hidden border-t border-white/[0.1] bg-neutral-950 px-8 py-20">
      <div className="mx-auto max-w-7xl items-start justify-between text-sm text-neutral-500 md:px-8">
        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="mr-0 mb-4 md:mr-4 md:flex">
            <FooterLogo />
          </div>

          <ul className="flex list-none flex-col gap-4 text-neutral-300 transition-colors sm:flex-row">
            {pages.map((page) => (
              <li key={page.title} className="list-none">
                <a className="transition-colors hover:text-white" href={page.href}>
                  {page.title}
                </a>
              </li>
            ))}
          </ul>

          <GridLineHorizontal className="mx-auto mt-8 max-w-7xl" />
        </div>
        <div className="mt-8 flex w-full flex-col items-center justify-between sm:flex-row">
          <p className="mb-8 text-neutral-400 sm:mb-0">&copy; DevStudios LLABC</p>
          <div className="flex gap-4">
            {socials.map((social) => (
              <a key={social.title} href="#" aria-label={social.title}>
                <social.icon className="h-6 w-6 text-neutral-300 transition-colors hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const navItems = [
    { title: "Home", href: "/" },
    { title: "Jewelry", href: "/jewelry/" },
    { title: "Accessories", href: "/#accessories" },
    { title: "Clothing", href: "/#clothing" },
    { title: "Sales", href: "/#sales" },
    { title: "About Us", href: "/about-us/" },
    { title: "New Drops", href: "/new-drops/" },
  ];

  const resourcesLeftColumn = [
    { title: "Blog", href: "#", description: "Latest news and articles", icon: BlogIcon },
    { title: "Documentation", href: "#", description: "Guides and API references", icon: DocsIcon },
    { title: "Help Center", href: "#", description: "Get support and FAQs", icon: HelpIcon },
  ];

  const resourcesRightColumn = [
    { title: "Community", href: "#", description: "Join our Discord server", icon: CommunityIcon },
    { title: "Changelog", href: "#", description: "See what's new", icon: ChangelogIcon },
    { title: "Tutorials", href: "#", description: "Learn with video guides", icon: TutorialsIcon },
  ];

  return (
    <nav className="relative z-60 w-full bg-transparent">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 md:px-8">
        <a href="/" className="flex items-center space-x-2">
          <LogoIcon className="relative z-20 size-4 text-emerald-500" />
          <span className="text-base font-semibold text-white sm:text-lg">K-Neuhen</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            >
              {item.title}
            </a>
          ))}

          <div className="group/hero-navbar relative">
            <button className="flex items-center gap-1 text-sm font-medium text-neutral-400 transition-colors hover:text-white">
              Contact
              <ChevronDownIcon className="size-4 transition-transform duration-200 group-hover/hero-navbar:rotate-180" />
            </button>

            <div className="pointer-events-none absolute top-full left-1/2 z-50 pt-4 opacity-0 transition-all duration-200 group-hover/hero-navbar:pointer-events-auto group-hover/hero-navbar:opacity-100">
              <div className="flex w-[540px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 lg:w-[600px] dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/5">
                <div className="flex-1 p-3 lg:p-4">
                  <p className="mb-2 px-3 text-xs font-semibold tracking-wide text-neutral-400 uppercase dark:text-neutral-500">
                    Learn
                  </p>
                  {resourcesLeftColumn.map((item) => (
                    <NavResourceLink key={item.title} item={item} />
                  ))}
                </div>

                <div className="flex-1 border-l border-neutral-100 p-3 lg:p-4 dark:border-neutral-800">
                  <p className="mb-2 px-3 text-xs font-semibold tracking-wide text-neutral-400 uppercase dark:text-neutral-500">
                    Connect
                  </p>
                  {resourcesRightColumn.map((item) => (
                    <NavResourceLink key={item.title} item={item} />
                  ))}
                </div>

                <div className="hidden w-44 bg-gradient-to-br from-neutral-900 to-neutral-800 p-4 lg:block lg:w-52 dark:from-neutral-800 dark:to-neutral-900">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white">What&apos;s new</h3>
                      <p className="mt-1 text-xs text-neutral-400">
                        Check out our latest features and improvements.
                      </p>
                    </div>
                    <a
                      href="#"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300"
                    >
                      See changelog
                      <Arrow className="size-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex lg:gap-4">
          <a
            href="/login"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            Login
          </a>
          <a
            href="/register"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-98 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Registration
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex size-10 items-center justify-center rounded-md lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <CloseIcon className="size-5 text-neutral-900 dark:text-white" />
          ) : (
            <MenuIcon className="size-5 text-neutral-900 dark:text-white" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 lg:hidden dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                {item.title}
              </a>
            ))}

            <div>
              <button
                onClick={() => setMobileContactOpen(!mobileContactOpen)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                Contact
                <ChevronDownIcon
                  className={`size-4 transition-transform ${mobileContactOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileContactOpen && (
                <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l border-neutral-200 pl-3 dark:border-neutral-700">
                  {[...resourcesLeftColumn, ...resourcesRightColumn].map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      <item.icon className="size-4 text-neutral-500 dark:text-neutral-400" />
                      <div>
                        <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          {item.title}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-500">
                          {item.description}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="my-3 h-px bg-neutral-200 dark:bg-neutral-800" />
            <a
              href="/login"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              Login
            </a>
            <a
              href="/register"
              className="mt-2 rounded-full bg-neutral-900 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-98 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Registration
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

function NavResourceLink({ item }) {
  return (
    <a
      href={item.href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
        <item.icon className="size-5" />
      </div>
      <div>
        <div className="text-sm font-medium text-neutral-900 dark:text-white">
          {item.title}
        </div>
      </div>
    </a>
  );
}

function FooterLogo() {
  return (
    <a
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-white"
    >
      <LogoIcon className="relative z-20 size-8 text-emerald-500" />
      <span className="font-medium text-white">DevStudio</span>
    </a>
  );
}

function GridLineHorizontal({ className, offset }) {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px",
        "--color-dark": "rgba(255, 255, 255, 0.2)",
        maskComposite: "exclude",
      }}
      className={cn(
        "z-30 h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        className
      )}
    />
  );
}

const BlogIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const DocsIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const HelpIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CommunityIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChangelogIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 3v5h5" />
    <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
    <path d="M12 7v5l4 2" />
  </svg>
);

const TutorialsIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect width="15" height="14" x="1" y="5" rx="2" ry="2" />
  </svg>
);

const ChevronDownIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const LogoIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M12 2l2.4 6.8H22l-6 4.4 2.3 6.8L12 15.7 5.7 20 8 13.2 2 8.8h7.6L12 2z" />
  </svg>
);

const MenuIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const Arrow = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l14 0" />
    <path d="M15 16l4 -4" />
    <path d="M15 8l4 4" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.968 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7.5 0h3.83v2.05h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.14V23h-4v-7.88c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V23h-4V8Z" />
  </svg>
);

const GithubIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.03c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A11.04 11.04 0 0 1 12 6.18c.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.82 1.19 3.08 0 4.42-2.69 5.39-5.25 5.67.41.35.78 1.05.78 2.12v3.15c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.91h-2.33V22C18.34 21.25 22 17.08 22 12.06Z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect width="18" height="18" x="3" y="3" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
