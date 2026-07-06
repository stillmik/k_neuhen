import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import pinkDropImage from "../assets/hoodies_temp/1644c644-35d9-4a5d-8e43-49947f557bae.png";
import lavenderHoodieImage from "../assets/hoodies_temp/6260999c-5799-4b79-91a5-13bf40b3db8f.png";
import cargoFitImage from "../assets/hoodies_temp/92c184d8-93b2-4107-8514-275034de9e62.png";
import blackStreetImage from "../assets/hoodies_temp/d846e74b-58f7-4386-8b1c-b4324ce45629.png";
import neonCrewImage from "../assets/hoodies_temp/e6595b20-70e2-41da-bbf5-2d392796432f.png";

export function HeroSectionWithMultiColorBackground() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-32">
        <div className="relative mt-20 flex flex-col items-center justify-center">
          <h1 className="relative mx-auto mt-4 max-w-6xl text-center text-3xl font-bold tracking-tight text-zinc-700 md:text-4xl lg:text-7xl dark:text-white">
            Your best in class{" "}
            <span className="relative z-10 bg-gradient-to-b from-indigo-700 to-indigo-600 bg-clip-text text-transparent">
              design and development studio
            </span>{" "}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block h-14 w-14 stroke-indigo-500 stroke-[1px]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <motion.path
                  initial={{ pathLength: 0, fill: "#a5b4fc", opacity: 0 }}
                  animate={{ pathLength: 1, fill: "#a5b4fc", opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                    repeatDelay: 0.5,
                  }}
                  d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
                />
              </svg>
            </span>
          </h1>
          <h2 className="relative mx-auto mt-8 mb-8 max-w-xl text-center text-base font-normal tracking-wide text-zinc-500 antialiased md:text-xl dark:text-zinc-200">
            We provide the best in class design and development services for
            teams that ship with the speed of light.
          </h2>
        </div>
        <div className="group relative z-10 mb-10 flex justify-center">
          <button className="rounded-lg bg-black px-8 py-2 font-medium text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] dark:bg-white dark:text-black">
            Book a call
          </button>
        </div>
        <TeamSectionWithLightBackground />
      </div>
    </div>
  );
}

function TeamSectionWithLightBackground() {
  const team = [
    {
      title: "Lavender Hoodie",
      designation: "Hoodie",
      src: lavenderHoodieImage,
      excerpt: "$54",
    },
    {
      title: "Pink Drop",
      designation: "Jacket",
      src: pinkDropImage,
      excerpt: "$79",
    },
    {
      title: "Black Street",
      designation: "Hoodie",
      src: blackStreetImage,
      excerpt: "$59",
    },
    {
      title: "Cargo Fit",
      designation: "Hoodie",
      src: cargoFitImage,
      excerpt: "$89",
    },
    {
      title: "Neon Crew",
      designation: "Hoodie",
      src: neonCrewImage,
      excerpt: "$49",
    },
    {
      title: "Violet Storm",
      designation: "Hoodie",
      src: lavenderHoodieImage,
      excerpt: "$64",
    },
    {
      title: "Rose Utility",
      designation: "Jacket",
      src: pinkDropImage,
      excerpt: "$84",
    },
    {
      title: "Graphite Cross",
      designation: "Hoodie",
      src: blackStreetImage,
      excerpt: "$69",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-20 lg:py-32">
      <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-balance text-white md:text-4xl">
        EXPLORE{" "}
        <span className="relative z-10 bg-gradient-to-b from-indigo-700 to-indigo-600 bg-clip-text text-transparent">
          NEW DROPS
        </span>
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
        {team.map((member) => (
          <div
            key={member.title + "first-team-section"}
            className="group/team overflow-hidden rounded-3xl bg-gray-100 p-1 dark:bg-neutral-900"
          >
            <img
              src={member.src}
              alt={member.title}
              height={1020}
              width={1024}
              className="aspect-square rounded-2xl bg-neutral-950 object-contain p-5 shadow-sm ring-1 shadow-black/20 ring-black/20 duration-200 will-change-transform group-hover/team:scale-105"
            />
            <div className="p-2 md:p-4">
              <p className="mt-2 text-base font-semibold tracking-tight text-balance text-neutral-900 dark:text-white">
                {member.title}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {member.designation}
              </p>
              <Separator className="my-2" />
              <p className="text-lg font-semibold text-neutral-900 dark:text-white">
                {member.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Separator({ className }) {
  return (
    <svg
      className={cn(
        "h-3 w-full shrink-0 overflow-visible text-neutral-300 dark:text-neutral-700",
        className
      )}
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="0.5"
        x2="100"
        y2="0.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="0.2 10"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const navItems = ["Home", "Jewelry", "Accessories", "Clothing", "Sales", "About Us"];

  const resourcesLeftColumn = [
    {
      title: "Blog",
      href: "#",
      description: "Latest news and articles",
      icon: BlogIcon,
    },
    {
      title: "Documentation",
      href: "#",
      description: "Guides and API references",
      icon: DocsIcon,
    },
    {
      title: "Help Center",
      href: "#",
      description: "Get support and FAQs",
      icon: HelpIcon,
    },
  ];

  const resourcesRightColumn = [
    {
      title: "Community",
      href: "#",
      description: "Join our Discord server",
      icon: CommunityIcon,
    },
    {
      title: "Changelog",
      href: "#",
      description: "See what's new",
      icon: ChangelogIcon,
    },
    {
      title: "Tutorials",
      href: "#",
      description: "Learn with video guides",
      icon: TutorialsIcon,
    },
  ];

  return (
    <nav className="z-60 w-full backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 md:px-8">
        <a href="#" className="flex items-center space-x-2">
          <LogoIcon className="relative z-20 size-4 text-emerald-500" />

          <span className="text-base font-semibold text-black sm:text-lg dark:text-white">
            K-Neuhen
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              {item}
            </a>
          ))}

          <div className="group/hero-navbar relative">
            <button className="flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
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
                    <a
                      key={item.title}
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
                  ))}
                </div>

                <div className="flex-1 border-l border-neutral-100 p-3 lg:p-4 dark:border-neutral-800">
                  <p className="mb-2 px-3 text-xs font-semibold tracking-wide text-neutral-400 uppercase dark:text-neutral-500">
                    Connect
                  </p>
                  {resourcesRightColumn.map((item) => (
                    <a
                      key={item.title}
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
                  ))}
                </div>

                <div className="hidden w-44 bg-gradient-to-br from-neutral-900 to-neutral-800 p-4 lg:block lg:w-52 dark:from-neutral-800 dark:to-neutral-900">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        What&apos;s new
                      </h3>
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
            href="#"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Login
          </a>
          <a
            href="#"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-98 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Try for free
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
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                {item}
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
              href="#"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              Login
            </a>
            <a
              href="#"
              className="mt-2 rounded-full bg-neutral-900 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-98 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Try for free
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const BlogIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const DocsIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const HelpIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CommunityIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChangelogIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const TutorialsIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const ChevronDownIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

const LogoIcon = (props) => {
  return (
    <img
      src="https://assets.aceternity.com/logo.png"
      alt="Logo"
      width={66}
      height={65}
      {...props}
    />
  );
};

const MenuIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
};

const CloseIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

const Arrow = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M15 16l4 -4" />
      <path d="M15 8l4 4" />
    </svg>
  );
};
