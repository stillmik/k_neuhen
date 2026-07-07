import { motion } from "motion/react";
import { clsx } from "clsx";

const colorMap = {
  "--color-neutral-500": "#737373",
  "--color-neutral-600": "#525252",
  "--color-sky-800": "#075985",
};

function resolveColor(colorVar, fallback) {
  return colorMap[colorVar] ?? fallback;
}

const glowPoints = [
  {
    className: "dottedGlowSpot dottedGlowSpotOne",
    animate: { x: ["-6%", "4%", "-2%"], y: ["-4%", "3%", "-1%"], scale: [1, 1.08, 1.02] },
  },
  {
    className: "dottedGlowSpot dottedGlowSpotTwo",
    animate: { x: ["5%", "-3%", "2%"], y: ["2%", "-4%", "3%"], scale: [1.04, 1, 1.1] },
  },
  {
    className: "dottedGlowSpot dottedGlowSpotThree",
    animate: { x: ["-3%", "2%", "-5%"], y: ["4%", "-2%", "1%"], scale: [1, 1.12, 1.03] },
  },
];

export function DottedGlowBackground({
  className,
  opacity = 1,
  gap = 10,
  radius = 1.6,
  colorLightVar = "--color-neutral-500",
  glowColorLightVar = "--color-neutral-600",
  colorDarkVar = "--color-neutral-500",
  glowColorDarkVar = "--color-sky-800",
  backgroundOpacity = 0,
  speedMin = 0.3,
  speedMax = 1.6,
  speedScale = 1,
}) {
  const dotColor = resolveColor(colorDarkVar || colorLightVar, "#737373");
  const glowColor = resolveColor(glowColorDarkVar || glowColorLightVar, "#075985");
  const duration = Math.max(7, 18 / Math.max(speedScale, 0.1));

  return (
    <div
      className={clsx("dottedGlowBackground", className)}
      style={{
        "--dotted-gap": `${gap}px`,
        "--dotted-radius": `${radius}px`,
        "--dotted-opacity": opacity,
        "--dotted-color": dotColor,
        "--dotted-glow-color": glowColor,
        "--dotted-bg-opacity": backgroundOpacity,
        "--dotted-speed-min": speedMin,
        "--dotted-speed-max": speedMax,
      }}
      aria-hidden="true"
    >
      <div className="dottedGlowBase" />
      <motion.div
        className="dottedGlowGrid"
        animate={{ backgroundPosition: ["0px 0px", `${gap * 5}px ${gap * 3}px`] }}
        transition={{ duration: duration * 1.45, ease: "linear", repeat: Infinity }}
      />

      {glowPoints.map((point, index) => (
        <motion.div
          key={point.className}
          className={point.className}
          animate={point.animate}
          transition={{
            duration: duration + index * 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
    </div>
  );
}
