import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { animate, motion } from "motion/react";
import { createMap } from "svg-dotted-map";
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandTwitch,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { cn } from "../lib/utils";

export function CryptgenFeatureCards() {
  return (
    <div className="mt-12 grid auto-rows-[25rem] grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-5">
      <Card className="relative flex flex-col justify-between lg:col-span-2">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/3">
          <LogoOrbit />
        </div>
        <CardContent className="absolute bottom-0 h-40">
          <CardTitle>
            <span className="relative z-10 bg-gradient-to-b from-indigo-700 to-indigo-600 bg-clip-text text-transparent">
              Hosting
            </span>
            {" "}over
            <br /> the edge
          </CardTitle>
          <CardDescription>
            With our edge network, we host your website by going into each city
            by ourselves.
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="relative flex flex-col justify-between lg:col-span-3">
        <CardContent className="h-40">
          <CardTitle>
            Available in{" "}
            <br />
            <span className="relative z-10 bg-gradient-to-b from-indigo-700 to-indigo-600 bg-clip-text text-transparent">
              every country
            </span>
          </CardTitle>
          <CardDescription>
            Access our platform from anywhere in the world with our globally
            distributed network and localized support in multiple languages.
          </CardDescription>
        </CardContent>
        <div className="absolute inset-0">
          <MapView />
        </div>
        <h1
          className={cn(
            "inline-block p-6 text-2xl md:text-6xl bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent"
          )}
        >
          100+
          <br />
          Countries
        </h1>
      </Card>
    </div>
  );
}

function CardContent({ children, className }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

function CardTitle({ children, className }) {
  return (
    <h3
      className={cn(
        "inline-block text-xl md:text-4xl bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </h3>
  );
}

function CardDescription({ children, className }) {
  return (
    <p
      className={cn(
        "mt-2 max-w-sm font-sans text-sm font-normal tracking-tight text-neutral-400",
        className
      )}
    >
      {children}
    </p>
  );
}

function Card({ children, className }) {
  return (
    <motion.div
      className={cn(
        "group relative isolate flex flex-col bg-[#141414]",
        className
      )}
    >
      <GridLineHorizontal className="top-0" offset="80px" />
      <GridLineHorizontal className="bottom-0 top-auto" offset="80px" />
      <GridLineVertical className="left-0" offset="80px" />
      <GridLineVertical className="left-auto right-0" offset="80px" />
      <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden">
        {children}
      </div>
    </motion.div>
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
        "pointer-events-none absolute left-[calc(var(--offset)/2*-1)] z-30 h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
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
        "--color-dark": "rgba(255, 255, 255, 0.2)",
        maskComposite: "exclude",
      }}
      className={cn(
        "pointer-events-none absolute top-[calc(var(--offset)/2*-1)] z-30 h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
}

function OrbitingIcons({ centerIcon, orbits, className }) {
  const orbitData = React.useMemo(() => {
    return orbits.map((orbit, orbitIndex) => {
      const radius = orbit.radius || 100 + orbitIndex * 80;
      const speed = orbit.speed || 1;
      const revealTime = orbit.revealTime || 0.5;
      const orbitDelay = orbit.delay || 0;
      const iconCount = orbit.icons.length;
      const angleStep = 360 / iconCount;
      const angles = Array.from({ length: iconCount }, (_, i) => angleStep * i);

      const iconData = angles.map((angle) => {
        const randomDelay = -Math.random() * speed;
        const rotationAngle =
          orbit.rotationDirection === "clockwise"
            ? [angle, angle - 360]
            : [angle, angle + 360];

        return {
          angle,
          animation: {
            initial: {
              rotate: angle,
              scale: 0,
              opacity: 0,
            },
            animate: {
              rotate: rotationAngle,
              scale: 1,
              opacity: 1,
            },
            transition: {
              rotate: {
                duration: speed,
                repeat: Infinity,
                ease: [0, 0, 1, 1],
                delay: randomDelay + orbitDelay,
              },
              scale: {
                duration: revealTime,
                delay: Math.abs(randomDelay) + orbitDelay,
              },
              opacity: {
                duration: revealTime,
                delay: Math.abs(randomDelay) + orbitDelay,
              },
            },
            counterRotation: {
              initial: { rotate: -angle },
              animate: {
                rotate:
                  orbit.rotationDirection === "clockwise"
                    ? [-angle, -angle + 360]
                    : [-angle, -angle - 360],
              },
              transition: {
                duration: speed,
                repeat: Infinity,
                ease: [0, 0, 1, 1],
                delay: randomDelay + orbitDelay,
              },
            },
          },
        };
      });

      return {
        radius,
        iconData,
      };
    });
  }, [orbits]);

  return (
    <div className={cn("relative h-[300px] w-[300px]", className)}>
      {centerIcon && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          {centerIcon}
        </div>
      )}
      {orbitData.map((orbit, orbitIndex) => (
        <div
          key={orbitIndex}
          className="absolute left-0 top-0 h-full w-full"
          style={{ zIndex: orbits.length - orbitIndex }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[343.721px] border border-[#545454] bg-[linear-gradient(189deg,#252525_5.97%,#0E0E0E_92.92%)] shadow-[0px_115px_32px_0px_rgba(0,0,0,0.01),_0px_74px_29px_0px_rgba(0,0,0,0.05),_0px_41px_25px_0px_rgba(0,0,0,0.16),_0px_18px_18px_0px_rgba(0,0,0,0.27),_0px_5px_10px_0px_rgba(0,0,0,0.31),inset_0px_0px_20px_rgba(0,0,0,0.5)]"
            style={{
              width: orbit.radius * 2 + "px",
              height: orbit.radius * 2 + "px",
            }}
          />

          {orbit.iconData.map((icon, iconIndex) => (
            <motion.div
              key={iconIndex}
              className="absolute"
              style={{
                width: "40px",
                height: "40px",
                left: "calc(50% - 20px)",
                top: "calc(50% - 20px)",
                transformOrigin: "center center",
              }}
              initial={icon.animation.initial}
              animate={icon.animation.animate}
              transition={icon.animation.transition}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${orbit.radius}px`,
                  transformOrigin: "center center",
                }}
              >
                <motion.div
                  initial={icon.animation.counterRotation.initial}
                  animate={icon.animation.counterRotation.animate}
                  transition={icon.animation.counterRotation.transition}
                  className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-[#151515] shadow-[0px_23px_7px_0px_rgba(0,0,0,0.01),0px_15px_6px_0px_rgba(0,0,0,0.06),0px_8px_5px_0px_rgba(0,0,0,0.19),0px_4px_4px_0px_rgba(0,0,0,0.32),0px_1px_2px_0px_rgba(0,0,0,0.37)]"
                >
                  {orbits[orbitIndex].icons[iconIndex]}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}

function LogoOrbit() {
  const orbit1Icons = [
    <IconBrandTwitter
      key="twitter"
      className="h-8 w-8 text-white dark:text-white"
    />,
    <IconBrandFacebook
      key="facebook"
      className="h-8 w-8 text-white dark:text-white"
    />,
    <IconBrandLinkedin
      key="linkedin"
      className="h-8 w-8 text-white dark:text-white"
    />,
  ];

  const orbit2Icons = [
    <IconBrandYoutube
      key="youtube"
      className="h-6 w-6 text-white dark:text-white"
    />,
    <IconBrandTwitch
      key="twitch"
      className="h-6 w-6 text-white dark:text-white"
    />,
    <IconBrandReddit
      key="reddit"
      className="h-6 w-6 text-white dark:text-white"
    />,
    <IconBrandDiscord
      key="discord"
      className="h-6 w-6 text-white dark:text-white"
    />,
  ];

  return (
    <OrbitingIcons
      orbits={[
        {
          icons: orbit1Icons,
          rotationDirection: "clockwise",
          radius: 80,
          speed: 7,
        },
        {
          icons: orbit2Icons,
          rotationDirection: "anticlockwise",
          radius: 140,
          speed: 15,
        },
      ]}
    />
  );
}

function MapView() {
  const mapWidth = 120;
  const mapHeight = 60;
  const { points, xStep, yToRowIndex } = useMemo(() => {
    const { points } = createMap({
      width: mapWidth,
      height: mapHeight,
      mapSamples: 6000,
    });

    const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x);
    const rowMap = new Map();
    let step = 0;
    let prevY = Number.NaN;
    let prevXInRow = Number.NaN;

    for (const point of sorted) {
      if (point.y !== prevY) {
        prevY = point.y;
        prevXInRow = Number.NaN;
        if (!rowMap.has(point.y)) {
          rowMap.set(point.y, rowMap.size);
        }
      }

      if (!Number.isNaN(prevXInRow)) {
        const delta = point.x - prevXInRow;
        if (delta > 0) {
          step = step === 0 ? delta : Math.min(step, delta);
        }
      }

      prevXInRow = point.x;
    }

    return { points, xStep: step || 1, yToRowIndex: rowMap };
  }, []);

  const flashingPoints = useMemo(() => {
    const points = [];
    const numPoints = 8;

    for (let i = 0; i < numPoints; i += 1) {
      points.push({
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
        delay: (i / numPoints) * 3,
        duration: 2 + Math.random(),
      });
    }
    return points;
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 transition-opacity duration-300">
        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          className="pointer-events-none absolute -right-2 -top-14 h-full w-full select-none text-white opacity-70 [mask-image:linear-gradient(to_bottom,transparent,white_15%,white_85%,transparent)]"
          preserveAspectRatio="xMidYMid slice"
          aria-label="Interactive world map visualization"
        >
          {points.map((point, index) => {
            const rowIndex = yToRowIndex.get(point.y) ?? 0;
            const offsetX = rowIndex % 2 === 1 ? xStep / 2 : 0;

            return (
              <circle
                key={`${point.x}-${point.y}-${index}`}
                cx={point.x + offsetX}
                cy={point.y}
                r="0.18"
                fill="currentColor"
              />
            );
          })}
        </svg>
      </div>

      <div className="absolute inset-0" aria-hidden="true">
        {flashingPoints.map((point, index) => (
          <motion.div
            key={index}
            className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: point.duration,
              delay: point.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }) => {
    const containerRef = useRef(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(0);

    const handleMove = useCallback(
      (event) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = event?.x ?? lastPosition.current.x;
          const mouseY = event?.y ?? lastPosition.current.y;

          if (event) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return undefined;

      const handleScroll = () => handleMove();
      const handlePointerMove = (event) => handleMove(event);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={{
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--repeating-conic-gradient-times": "5",
            "--gradient":
              variant === "white"
                ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%),
                radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #dd7bbb 0%,
                  #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                  #5a922c calc(50% / var(--repeating-conic-gradient-times)),
                  #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                  #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                )`,
          }}
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow rounded-[inherit]",
              'after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:rounded-[inherit] after:content-[""]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";
