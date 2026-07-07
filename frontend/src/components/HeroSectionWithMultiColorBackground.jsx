import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../lib/utils";
import pinkDropImage from "../assets/hoodies_temp/1644c644-35d9-4a5d-8e43-49947f557bae.png";
import lavenderHoodieImage from "../assets/hoodies_temp/6260999c-5799-4b79-91a5-13bf40b3db8f.png";
import cargoFitImage from "../assets/hoodies_temp/92c184d8-93b2-4107-8514-275034de9e62.png";
import blackStreetImage from "../assets/hoodies_temp/d846e74b-58f7-4386-8b1c-b4324ce45629.png";
import neonCrewImage from "../assets/hoodies_temp/e6595b20-70e2-41da-bbf5-2d392796432f.png";

// Product card separator spacing: change this class to tune the distance
// between item type, glowing line, and price. Smaller = more compact.
const PRODUCT_SEPARATOR_SPACING_CLASS = "my-2";

export function HeroSectionWithMultiColorBackground() {
  const productFrameRef = useRef(null);
  const pageRef = useRef(null);

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen w-full overflow-hidden bg-neutral-900 text-white"
    >
      <BackgroundGrids />
      <CollisionMechanism
        beamOptions={{
          initialX: -400,
          translateX: 600,
          duration: 7,
          repeatDelay: 3,
        }}
        containerRef={productFrameRef}
        parentRef={pageRef}
      />
      <CollisionMechanism
        beamOptions={{
          initialX: -200,
          translateX: 800,
          duration: 4,
          repeatDelay: 3,
        }}
        containerRef={productFrameRef}
        parentRef={pageRef}
      />
      <CollisionMechanism
        beamOptions={{
          initialX: 200,
          translateX: 1200,
          duration: 5,
          repeatDelay: 3,
        }}
        containerRef={productFrameRef}
        parentRef={pageRef}
      />
      <CollisionMechanism
        beamOptions={{
          initialX: 400,
          translateX: 1400,
          duration: 6,
          repeatDelay: 3,
        }}
        containerRef={productFrameRef}
        parentRef={pageRef}
      />
      <Navbar />
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-32">
        <div className="relative mt-20 flex flex-col items-center justify-center">
          <h1 className="relative mx-auto mt-4 max-w-6xl text-center text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-7xl">
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
          <h2 className="relative mx-auto mt-8 mb-8 max-w-xl text-center text-base font-normal tracking-wide text-zinc-200 antialiased md:text-xl">
            We provide the best in class design and development services for
            teams that ship with the speed of light.
          </h2>
        </div>
        <div className="group relative z-10 mb-10 flex justify-center">
          <button className="rounded-lg bg-black px-8 py-2 font-medium text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] dark:bg-white dark:text-black">
            Book a call
          </button>
        </div>
        <TeamSectionWithLightBackground productFrameRef={productFrameRef} />
      </div>
    </div>
  );
}

function BackgroundGrids() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 grid h-full w-full -rotate-45 transform select-none grid-cols-2 gap-10 md:grid-cols-4">
      <div className="relative h-full w-full">
        <GridLineVertical className="left-0" />
        <GridLineVertical className="right-0 left-auto" />
      </div>
      <div className="relative h-full w-full">
        <GridLineVertical className="left-0" />
        <GridLineVertical className="right-0 left-auto" />
      </div>
      <div className="relative h-full w-full bg-gradient-to-b from-transparent via-neutral-800 to-transparent">
        <GridLineVertical className="left-0" />
        <GridLineVertical className="right-0 left-auto" />
      </div>
      <div className="relative h-full w-full">
        <GridLineVertical className="left-0" />
        <GridLineVertical className="right-0 left-auto" />
      </div>
    </div>
  );
}

function CollisionMechanism({ parentRef, containerRef, beamOptions = {} }) {
  const beamRef = useRef(null);
  const [collision, setCollision] = useState({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);

          if (beamRef.current) {
            beamRef.current.style.opacity = "0";
          }
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  useEffect(() => {
    if (!collision.detected || !collision.coordinates) {
      return undefined;
    }

    const collisionResetTimeout = setTimeout(() => {
      setCollision({ detected: false, coordinates: null });
      setCycleCollisionDetected(false);

      if (beamRef.current) {
        beamRef.current.style.opacity = "1";
      }
    }, 2000);

    const beamResetTimeout = setTimeout(() => {
      setBeamKey((prevKey) => prevKey + 1);
    }, 2000);

    return () => {
      clearTimeout(collisionResetTimeout);
      clearTimeout(beamResetTimeout);
    };
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-200px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || -45,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "800px",
            translateX: beamOptions.translateX || "700px",
            rotate: beamOptions.rotate || -45,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute top-20 left-96 z-10 m-auto h-14 w-px rounded-full bg-gradient-to-t from-orange-500 via-yellow-500 to-transparent",
          beamOptions.className
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            style={{
              left: `${collision.coordinates.x + 20}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function Explosion({ className, ...props }) {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-[4px] w-10 rounded-full bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-sm"
      />
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-orange-500 to-yellow-500"
        />
      ))}
    </div>
  );
}

function GridLineVertical({ className, offset }) {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px",
        "--color-dark": "rgba(255, 255, 255, 0.3)",
        maskComposite: "exclude",
      }}
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] z-30 h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        className
      )}
    />
  );
}

function TeamSectionWithLightBackground({ productFrameRef }) {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
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
  const totalPages = Math.ceil(team.length / itemsPerPage);

  const visibleItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return team.slice(start, start + itemsPerPage);
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-20 lg:py-32">
      <div className="flex items-center justify-between gap-4">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-balance text-white md:text-4xl">
          Explore{" "}
          <span className="relative z-10 bg-gradient-to-b from-indigo-700 to-indigo-600 bg-clip-text text-transparent">
            New Drops
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous items"
            onClick={handlePrevious}
            className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition duration-200 hover:bg-white/10 active:scale-98"
          >
            <svg
              aria-hidden
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next items"
            onClick={handleNext}
            className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition duration-200 hover:bg-white/10 active:scale-98"
          >
            <svg
              aria-hidden
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
        ref={productFrameRef}
        className="relative mx-auto mt-8 max-w-7xl rounded-[32px] border border-neutral-700 bg-neutral-800/50 p-2 backdrop-blur-lg md:mt-12 md:p-4"
      >
        <div className="rounded-[24px] border border-neutral-700 bg-black p-2">
          <div className="scrollbar-hidden flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-3 md:gap-8 lg:gap-12">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((member, index) => {
                const itemIndex = currentPage * itemsPerPage + index;

                return (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  filter: "blur(10px)",
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={`${member.title}-${itemIndex}-first-team-section`}
                className="group/team w-full flex-none snap-start overflow-hidden rounded-3xl bg-gray-100 p-1 sm:w-[calc((100%_-_1rem)/2)] lg:w-[calc((100%_-_9rem)/4)] dark:bg-neutral-900"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-100 to-white shadow-sm ring-1 shadow-black/20 dark:from-neutral-900 dark:to-neutral-950 dark:ring-black/20">
                  <Grid size={20} />
                  <img
                    src={member.src}
                    alt={member.title}
                    height={1020}
                    width={1024}
                    className="relative z-20 aspect-square object-contain p-5 duration-200 will-change-transform group-hover/team:scale-105"
                  />
                </div>
                <div className="p-2 md:p-4">
                  <p className="mt-2 text-base font-semibold tracking-tight text-balance text-neutral-900 dark:text-white">
                    {member.title}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {member.designation}
                  </p>
                  <GlowingStarsSeparator
                    className={PRODUCT_SEPARATOR_SPACING_CLASS}
                    seed={itemIndex}
                  />
                  <p className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {member.excerpt}
                  </p>
                </div>
              </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Grid({ pattern, size }) {
  const p =
    pattern ??
    [
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];

  return (
    <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full fill-black/10 stroke-black/10 mix-blend-overlay dark:fill-white/10 dark:stroke-white/10"
        />
      </div>
    </div>
  );
}

function GridPattern({ width, height, x, y, squares, ...props }) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([squareX, squareY], index) => (
            <rect
              strokeWidth="0"
              key={`${squareX}-${squareY}-${index}`}
              width={width + 1}
              height={height + 1}
              x={squareX * width}
              y={squareY * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function GlowingStarsSeparator({ className, seed = 0 }) {
  const filterId = useId();
  const dotCount = 18;
  const glowingDotIndexes = [
    (seed * 5 + 2) % dotCount,
    (seed * 7 + 8) % dotCount,
    (seed * 11 + 14) % dotCount,
  ];

  return (
    <svg
      className={cn(
        "h-4 w-full shrink-0 overflow-visible opacity-80 transition-opacity duration-300 group-hover/team:opacity-100",
        className
      )}
      viewBox="0 0 240 16"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id={filterId} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {Array.from({ length: 18 }).map((_, index) => (
        <circle
          key={index}
          cx={8 + index * 13}
          cy="8"
          r="0.85"
          fill="rgba(255,255,255,0.28)"
        />
      ))}

      {glowingDotIndexes.map((dotIndex, glowIndex) => (
        <motion.circle
          key={`${seed}-${dotIndex}`}
          cx={8 + dotIndex * 13}
          cy="8"
          r="1.9"
          fill="#60a5fa"
          filter={`url(#${filterId})`}
          initial={{ opacity: 0.25, scale: 0.8 }}
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.35, 0.8] }}
          transition={{
            duration: 2.4 + ((seed + glowIndex) % 3) * 0.35,
            delay: ((seed * 0.37 + glowIndex * 0.58) % 1.8),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
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

          <span className="text-base font-semibold text-white sm:text-lg">
            K-Neuhen
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            >
              {item}
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
            href="#login"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            Login
          </a>
          <a
            href="#"
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
              href="#login"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              Login
            </a>
            <a
              href="#"
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
