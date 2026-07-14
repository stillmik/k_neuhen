import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../lib/utils";
import { CenteredWithLogo as SiteFooter, Navbar as SiteNavbar } from "./SiteChrome";
import { GridFeatures } from "./GridFeatures";
import { UseCasesSection } from "./UseCasesSection";

// Product card separator spacing: change this class to tune the distance
// between item type, glowing line, and price. Smaller = more compact.
const PRODUCT_SEPARATOR_SPACING_CLASS = "my-2";
const clothingImages = import.meta.glob("../assets/hoodies_temp/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const jewelryImages = import.meta.glob("../assets/jews/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const CLOTHING_CATALOG = [
  { title: "Rose Circuit Bomber", designation: "Jacket", price: 89, description: "A color-block bomber jacket with utility pockets and vivid rose panels." },
  { title: "Bubblegum Core", designation: "Hoodie", price: 59, description: "A soft pink pullover hoodie with a tonal pouch pocket." },
  { title: "White Signal Rib", designation: "Tank Top", price: 29, description: "A fitted white ribbed tank made for clean everyday layering." },
  { title: "Blush Cross Zip", designation: "Zip Hoodie", price: 69, description: "A washed pink zip hoodie finished with subtle cross graphics." },
  { title: "Stonewash Drift", designation: "Wide-Leg Pants", price: 74, description: "Wide-leg stonewashed pants with an airy, relaxed silhouette." },
  { title: "Cloud Camo Shark", designation: "Zip Hoodie", price: 84, description: "A cloud-camo zip hoodie with a playful shark hood detail." },
  { title: "Ivory Thorn Script", designation: "Hoodie", price: 64, description: "An ivory pullover hoodie framed by dark ornamental graphics." },
  { title: "Sand Utility Stack", designation: "Cargo Pants", price: 79, description: "Relaxed sand cargo pants with roomy side utility pockets." },
  { title: "Scarlet Lost Boys", designation: "Zip Hoodie", price: 69, description: "A bright red zip hoodie with split Lost Boys lettering." },
  { title: "Midnight Muse", designation: "Graphic Sweatshirt", price: 62, description: "A black crewneck sweatshirt with a bold monochrome portrait." },
  { title: "Charcoal Teddy", designation: "Sweatpants", price: 57, description: "Washed charcoal sweatpants with a small embroidered bear detail." },
  { title: "Frost Rib Knit", designation: "Sweater", price: 68, description: "A pale blue rib-knit sweater with a crisp minimal finish." },
  { title: "Cloudwash Balloon", designation: "Sweatpants", price: 59, description: "Light gray balloon sweatpants shaped with elasticated cuffs." },
  { title: "Essential White", designation: "T-Shirt", price: 34, description: "A heavyweight white tee with an easy oversized cut." },
  { title: "Icewash Longline", designation: "Denim Shorts", price: 54, description: "Longline light-wash denim shorts with a relaxed streetwear fit." },
  { title: "Scuffers Signal", designation: "Graphic T-Shirt", price: 39, description: "A white graphic tee marked with a sharp red Scuffers logo." },
  { title: "Midnight Drawstring", designation: "Jeans", price: 72, description: "Dark loose-fit jeans finished with a contrasting drawstring waist." },
  { title: "Desert Racing Patch", designation: "Bomber Jacket", price: 94, description: "A sand racing bomber covered with vintage motorsport patches." },
  { title: "Graphite Crossfall", designation: "Hoodie", price: 78, description: "A washed graphite hoodie patterned with distressed crosses." },
  { title: "Voltage Lime", designation: "Hoodie", price: 62, description: "A high-energy neon lime hoodie in a clean pullover shape." },
  { title: "Noir Essential", designation: "T-Shirt", price: 34, description: "A versatile black tee with a smooth relaxed silhouette." },
  { title: "Pearl Orbit", designation: "Sweatpants", price: 61, description: "Cream sweatpants traced with oversized abstract orbit lines." },
];

const JEWELRY_CATALOG = [
  { title: "Astral Thorn", designation: "Pendant Necklace", price: 49, description: "A fine silver chain finished with an ornate celestial thorn pendant." },
  { title: "Chrome Sovereign", designation: "Cuban Chain", price: 79, description: "A weighty polished Cuban-link chain with a crisp silver finish." },
  { title: "Tidal Fang", designation: "Layered Necklace", price: 54, description: "A layered shell choker and earthy strand centered by a carved fang." },
  { title: "Wyrmcoil Regent", designation: "Statement Ring", price: 69, description: "A sculpted silver dragon curls around the finger in intricate relief." },
  { title: "Obsidian Dragonbite", designation: "Open Ring", price: 64, description: "A dark open ring shaped as a dragon meeting its own armored tail." },
  { title: "Starlight Drake", designation: "Crystal Ring", price: 74, description: "A bright crystal-covered dragon ring with dramatic raised wings." },
  { title: "Nocturne Wing", designation: "Cuff Ring", price: 46, description: "A wraparound silver cuff formed from angular nocturnal wings." },
  { title: "Seraph Flight", designation: "Wing Earrings", price: 52, description: "A mirrored pair of feathered silver wings with sculptural depth." },
  { title: "Rivet Thorn", designation: "Charm Bracelet", price: 44, description: "A chunky silver bracelet punctuated by sharp hanging spike charms." },
];

function createCollection(imageModules, type, basePrice, description, catalog = []) {
  return Object.entries(imageModules)
    .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
    .map(([path, src], index) => {
      const details = catalog[index] || {};

      return {
        title: details.title || `${type} ${String(index + 1).padStart(2, "0")}`,
        designation: details.designation || type,
        description: details.description || description,
        src,
        excerpt: `$${details.price || basePrice + (index % 6) * 5}`,
        assetPath: path,
      };
    });
}

const PRODUCT_ITEMS = createCollection(
  clothingImages,
  "Clothing",
  49,
  "A distinctive streetwear piece made for expressive everyday styling.",
  CLOTHING_CATALOG
);

export const JEWELRY_ITEMS = createCollection(
  jewelryImages,
  "Jewelry",
  29,
  "A polished jewelry piece designed to add character to any look.",
  JEWELRY_CATALOG
).slice(0, 9);

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
      <SiteNavbar />
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
      <SiteFooter />
    </div>
  );
}

function BackgroundGrids() {
  const backgroundRef = useRef(null);
  const [tileCount, setTileCount] = useState(1);

  useEffect(() => {
    const background = backgroundRef.current;

    if (!background) {
      return undefined;
    }

    const updateTileCount = () => {
      setTileCount(Math.max(1, Math.ceil(background.clientHeight / 900)));
    };

    updateTileCount();

    const resizeObserver = new ResizeObserver(updateTileCount);
    resizeObserver.observe(background);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="pointer-events-none absolute top-14 right-0 bottom-0 left-0 z-0 flex w-full select-none flex-col overflow-hidden sm:top-16"
    >
      {Array.from({ length: tileCount }).map((_, index) => (
        <BackgroundGridTile key={index} />
      ))}
    </div>
  );
}

function BackgroundGridTile() {
  return (
    <div className="relative grid h-[900px] max-h-[900px] w-full shrink-0 -rotate-45 transform grid-cols-2 gap-10 md:grid-cols-4">
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
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-20 lg:py-32">
      <ProductCarousel
        productFrameRef={productFrameRef}
        title={
          <>
            Explore{" "}
            <a
              href="/new-drops/"
              className="relative z-10 border-b border-indigo-500 bg-gradient-to-b from-indigo-700 to-indigo-600 bg-clip-text text-transparent transition-colors hover:border-indigo-300"
            >
              New Drops
            </a>
          </>
        }
        description={
          <>
            Discover fresh drops shaped for standout styling, everyday comfort,
            <br className="hidden md:block" />
            and expressive outfits that move with your rhythm
          </>
        }
        sectionKey="new-drops"
      />
      <UseCasesSection />
      <ProductCarousel
        title={
          <>
            Our classical{" "}
            <a
              href="/#clothing"
              className="relative z-10 border-b border-indigo-500 bg-gradient-to-b from-indigo-700 to-indigo-600 bg-clip-text text-transparent transition-colors hover:border-indigo-300"
            >
              Clothing
            </a>
          </>
        }
        description={
          <>
            Explore timeless clothing silhouettes made for clean layering,
            <br className="hidden md:block" />
            polished details, and a softer everyday wardrobe
          </>
        }
        sectionKey="classical-clothing"
        layout="grid"
      />
      <DeploymentsMadeEasySection />
      <GridFeatures items={JEWELRY_ITEMS} />
    </section>
  );
}

function DeploymentsMadeEasySection() {
  return (
    <section id="jewelry" className="mx-auto mt-20 w-full max-w-7xl px-4 text-center md:mt-28 md:px-8">
      <div className="relative mx-auto flex w-fit items-center justify-center px-8 py-4 md:px-10">
        <motion.div
          initial={{ width: 0, height: 0, borderRadius: 0 }}
          whileInView={{ width: "100%", height: "100%" }}
          viewport={{ once: true, amount: 0.6 }}
          style={{ transformOrigin: "top-left" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full"
        >
          <div className="absolute top-0 -left-8 h-px w-[calc(100%+4rem)] bg-neutral-700" />
          <div className="absolute bottom-0 -left-8 h-px w-[calc(100%+4rem)] bg-neutral-700" />
          <div className="absolute -top-5 left-0 h-[calc(100%+2.5rem)] w-px bg-neutral-700" />
          <div className="absolute -top-5 right-0 h-[calc(100%+2.5rem)] w-px bg-neutral-700" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute -top-1 -left-1 h-2 w-2 bg-neutral-500"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute -top-1 -right-1 h-2 w-2 bg-neutral-500"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute -bottom-1 -left-1 h-2 w-2 bg-neutral-500"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute -right-1 -bottom-1 h-2 w-2 bg-neutral-500"
          />
        </motion.div>
        <h2 className="relative z-10 mx-auto w-fit text-center font-sans text-xl font-bold tracking-tight text-neutral-100 md:text-4xl">
          Looking for{" "}
          <a
            href="/jewelry/"
            className="border-b border-indigo-500 bg-gradient-to-b from-indigo-400 to-indigo-600 bg-clip-text text-transparent transition-colors hover:border-indigo-300"
          >
            Jewelry
          </a>
          ?
        </h2>
      </div>
      <p className="mx-auto mt-4 max-w-lg text-center font-sans text-sm font-normal text-neutral-400">
        Find the perfect piece for any occasion.
      </p>
    </section>
  );
}

function ProductCarousel({
  productFrameRef,
  title,
  description,
  sectionKey,
  layout = "carousel",
}) {
  const pageStep = 4;
  const visibleCount = layout === "grid" ? 8 : 4;
  const [currentPage, setCurrentPage] = useState(0);
  const frameRef = useRef(null);
  const wheelLockRef = useRef(false);
  const isGrid = layout === "grid";
  const totalPages = Math.ceil(PRODUCT_ITEMS.length / pageStep);

  const visibleItems = useMemo(() => {
    if (isGrid) {
      const start = currentPage * pageStep;
      return Array.from({ length: visibleCount }, (_, index) => {
        return PRODUCT_ITEMS[(start + index) % PRODUCT_ITEMS.length];
      });
    }

    const start = currentPage * pageStep;
    return PRODUCT_ITEMS.slice(start, start + visibleCount);
  }, [currentPage, isGrid, visibleCount]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    const frame = frameRef.current;

    if (!frame) {
      return undefined;
    }

    const handleWheel = (event) => {
      const horizontalDelta =
        Math.abs(event.deltaX) >= Math.abs(event.deltaY)
          ? event.deltaX
          : event.shiftKey
            ? event.deltaY
            : 0;

      if (Math.abs(horizontalDelta) < 16) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (wheelLockRef.current) {
        return;
      }

      wheelLockRef.current = true;
      setCurrentPage((prev) =>
        horizontalDelta > 0
          ? (prev + 1) % totalPages
          : (prev - 1 + totalPages) % totalPages
      );

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 450);
    };

    frame.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      frame.removeEventListener("wheel", handleWheel);
    };
  }, [totalPages]);

  const setFrameRefs = (node) => {
    frameRef.current = node;

    if (productFrameRef) {
      productFrameRef.current = node;
    }
  };

  return (
    <div className="mx-auto w-full">
      <div className="relative flex flex-col items-center gap-4 md:block">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold tracking-tight text-balance text-white md:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-8 max-w-2xl text-center text-base font-medium text-zinc-200 md:text-xl">
            {description}
          </p>
        )}
        <div className="flex items-center gap-2 md:absolute md:top-1/2 md:right-0 md:-translate-y-1/2">
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
        ref={setFrameRefs}
        className="relative mx-auto mt-4 max-w-7xl overscroll-x-contain rounded-[32px] border border-neutral-700 bg-neutral-800/50 p-2 backdrop-blur-lg md:mt-6 md:p-4"
      >
        {isGrid && (
          <div className="absolute top-1/2 -right-16 z-30 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
            <button
              type="button"
              aria-label="Previous classical clothing items"
              onClick={handlePrevious}
              className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-neutral-950/80 text-white backdrop-blur-md transition duration-200 hover:border-indigo-400/70 hover:bg-indigo-500/15 active:scale-95"
            >
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next classical clothing items"
              onClick={handleNext}
              className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-neutral-950/80 text-white backdrop-blur-md transition duration-200 hover:border-indigo-400/70 hover:bg-indigo-500/15 active:scale-95"
            >
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
        <div className="rounded-[24px] border border-neutral-700 bg-black p-2">
          <div
            className={cn(
              isGrid
                ? "grid grid-cols-1 gap-4 pb-3 sm:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-12"
                : "scrollbar-hidden flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-3 md:gap-8 lg:gap-12"
            )}
          >
            <AnimatePresence mode="popLayout">
              {visibleItems.map((member, index) => {
                const itemIndex = (currentPage * pageStep + index) % PRODUCT_ITEMS.length;

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
                key={`${member.title}-${itemIndex}-${currentPage}-${sectionKey}`}
                className={cn(
                  "group/team snap-start overflow-hidden rounded-3xl bg-gray-100 p-1 dark:bg-neutral-900",
                  !isGrid &&
                    "w-full flex-none snap-start sm:w-[calc((100%_-_1rem)/2)] lg:w-[calc((100%_-_9rem)/4)]"
                )}
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
    </div>
  );
}

export function CenteredWithLogo() {
  const pages = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Jewelry",
      href: "/jewelry/",
    },
    {
      title: "Accessories",
      href: "/#accessories",
    },
    {
      title: "Clothing",
      href: "/#clothing",
    },
    {
      title: "Sales",
      href: "/#sales",
    },
    {
      title: "About Us",
      href: "/about-us/",
    },
    {
      title: "Contact",
      href: "/#contact",
    },
    {
      title: "New Drops",
      href: "/new-drops/",
    },
  ];

  const socials = [
    {
      title: "Twitter",
      icon: TwitterIcon,
    },
    {
      title: "LinkedIn",
      icon: LinkedinIcon,
    },
    {
      title: "GitHub",
      icon: GithubIcon,
    },
    {
      title: "Facebook",
      icon: FacebookIcon,
    },
    {
      title: "Instagram",
      icon: InstagramIcon,
    },
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
          <p className="mb-8 text-neutral-400 sm:mb-0">
            &copy; DevStudios LLABC
          </p>
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

function FooterLogo() {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-white"
    >
      <LogoIcon className="relative z-20 size-8 text-emerald-500" />
      <span className="font-medium text-white">DevStudio</span>
    </a>
  );
}

function Grid() {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full",
        "bg-[radial-gradient(circle_at_0.5px_0.5px,rgba(255,255,255,0.3)_0.5px,transparent_0)]",
        "[mask-image:radial-gradient(circle_at_center,white,transparent)]",
        "bg-repeat",
        "[background-size:8px_8px]"
      )}
    />
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
    <nav className="z-60 w-full bg-transparent">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 md:px-8">
        <a href="/" className="flex items-center space-x-2">
          <LogoIcon className="relative z-20 size-4 text-emerald-500" />

          <span className="text-base font-semibold text-white sm:text-lg">
            K-Neuhen
          </span>
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

const TwitterIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.968 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7.5 0h3.83v2.05h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.14V23h-4v-7.88c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V23h-4V8Z" />
  </svg>
);

const GithubIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.03c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A11.04 11.04 0 0 1 12 6.18c.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.82 1.19 3.08 0 4.42-2.69 5.39-5.25 5.67.41.35.78 1.05.78 2.12v3.15c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.91h-2.33V22C18.34 21.25 22 17.08 22 12.06Z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
