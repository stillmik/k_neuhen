import React, { useId } from "react";
import { motion } from "motion/react";

export function DeployAgentsAcrossPlatformsSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-0 md:px-8 md:pt-24 md:pb-0">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-normal tracking-tight text-neutral-300 md:text-5xl lg:text-6xl">
          Deploy agents across
          <br />
          every platform
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-neutral-400 md:text-xl">
          Your AI agents work seamlessly on mobile, desktop,
          <br className="hidden md:block" />
          and tablet. Monitor and orchestrate from anywhere.
        </p>
      </div>

      <div className="relative mx-auto h-12 w-full">
        <div className="relative flex h-full w-full items-center">
          <div className="absolute top-1/2 left-[calc(100%/6)] z-10 -translate-x-1/2 -translate-y-1/2">
            <BeamCircle />
          </div>
          <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <BeamCircle />
          </div>
          <div className="absolute top-1/2 left-[calc(500%/6)] z-10 -translate-x-1/2 -translate-y-1/2">
            <BeamCircle />
          </div>
          <div className="absolute top-1/2 left-[calc(100%/6)] w-[calc(200%/6)] -translate-y-1/2">
            <AnimatedBeamPathIllustration />
          </div>
          <div className="absolute top-1/2 left-[calc(300%/6)] w-[calc(200%/6)] -translate-y-1/2">
            <AnimatedBeamPathIllustration delay={1.4} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BeamCircle() {
  return (
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-700">
      <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
    </div>
  );
}

function AnimatedBeamPathIllustration({ delay = 0 }) {
  const path = "M 0 40 L 100 40 L 200 15 L 400 15 L 500 40 L 600 40";
  const id = useId();

  const fadeMaskId = `fadeMask-${id}`;
  const beamGradientId = `beamGradient-${id}`;
  const glowId = `glow-${id}`;
  const fadeEndsMaskId = `fadeEndsMask-${id}`;
  const beamFadeGradientId = `beamFadeGradient-${id}`;
  const beamMaskId = `beamMask-${id}`;

  return (
    <div className="flex h-full w-full shrink-0 items-center justify-center overflow-visible">
      <svg
        className="h-12 w-full"
        viewBox="0 0 600 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={fadeMaskId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>

          <linearGradient id={beamGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#1d4ed8" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="70%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <mask id={fadeEndsMaskId}>
            <rect
              x="0"
              y="0"
              width="600"
              height="80"
              fill={`url(#${fadeMaskId})`}
            />
          </mask>

          <linearGradient
            id={beamFadeGradientId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="600"
            y2="0"
          >
            <motion.stop
              offset="0%"
              stopColor="black"
              animate={{ offset: ["-25%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
                delay,
              }}
            />
            <motion.stop
              offset="5%"
              stopColor="white"
              animate={{ offset: ["-20%", "105%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
                delay,
              }}
            />
            <motion.stop
              offset="15%"
              stopColor="white"
              animate={{ offset: ["-10%", "115%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
                delay,
              }}
            />
            <motion.stop
              offset="20%"
              stopColor="black"
              animate={{ offset: ["-5%", "120%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
                delay,
              }}
            />
          </linearGradient>

          <mask id={beamMaskId}>
            <path
              d={path}
              stroke={`url(#${beamFadeGradientId})`}
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          </mask>
        </defs>

        <g mask={`url(#${fadeEndsMaskId})`}>
          <path
            d={path}
            stroke="rgba(115,115,115,0.55)"
            strokeWidth="2"
            strokeDasharray="1 6"
            strokeLinecap="round"
            fill="none"
          />

          <g filter={`url(#${glowId})`}>
            <path
              d={path}
              stroke={`url(#${beamGradientId})`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 6"
              fill="none"
              mask={`url(#${beamMaskId})`}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
