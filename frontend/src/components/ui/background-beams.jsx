import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

const beamPaths = [
  "M-696 704C-581.5 551 -501.5 474 -384 474C-210 474 -189 646 -8 646C172 646 200 474 384 474C501.5 474 581.5 551 696 704",
  "M-696 680C-581.5 527 -501.5 450 -384 450C-210 450 -189 622 -8 622C172 622 200 450 384 450C501.5 450 581.5 527 696 680",
  "M-696 656C-581.5 503 -501.5 426 -384 426C-210 426 -189 598 -8 598C172 598 200 426 384 426C501.5 426 581.5 503 696 656",
  "M-696 632C-581.5 479 -501.5 402 -384 402C-210 402 -189 574 -8 574C172 574 200 402 384 402C501.5 402 581.5 479 696 632",
  "M-696 608C-581.5 455 -501.5 378 -384 378C-210 378 -189 550 -8 550C172 550 200 378 384 378C501.5 378 581.5 455 696 608",
  "M-696 584C-581.5 431 -501.5 354 -384 354C-210 354 -189 526 -8 526C172 526 200 354 384 354C501.5 354 581.5 431 696 584",
  "M-696 560C-581.5 407 -501.5 330 -384 330C-210 330 -189 502 -8 502C172 502 200 330 384 330C501.5 330 581.5 407 696 560",
  "M-696 536C-581.5 383 -501.5 306 -384 306C-210 306 -189 478 -8 478C172 478 200 306 384 306C501.5 306 581.5 383 696 536",
  "M-696 512C-581.5 359 -501.5 282 -384 282C-210 282 -189 454 -8 454C172 454 200 282 384 282C501.5 282 581.5 359 696 512",
  "M-696 488C-581.5 335 -501.5 258 -384 258C-210 258 -189 430 -8 430C172 430 200 258 384 258C501.5 258 581.5 335 696 488",
  "M-696 464C-581.5 311 -501.5 234 -384 234C-210 234 -189 406 -8 406C172 406 200 234 384 234C501.5 234 581.5 311 696 464",
  "M-696 440C-581.5 287 -501.5 210 -384 210C-210 210 -189 382 -8 382C172 382 200 210 384 210C501.5 210 581.5 287 696 440",
  "M-696 416C-581.5 263 -501.5 186 -384 186C-210 186 -189 358 -8 358C172 358 200 186 384 186C501.5 186 581.5 263 696 416",
  "M-696 392C-581.5 239 -501.5 162 -384 162C-210 162 -189 334 -8 334C172 334 200 162 384 162C501.5 162 581.5 239 696 392",
  "M-696 368C-581.5 215 -501.5 138 -384 138C-210 138 -189 310 -8 310C172 310 200 138 384 138C501.5 138 581.5 215 696 368",
  "M-696 344C-581.5 191 -501.5 114 -384 114C-210 114 -189 286 -8 286C172 286 200 114 384 114C501.5 114 581.5 191 696 344",
  "M-696 320C-581.5 167 -501.5 90 -384 90C-210 90 -189 262 -8 262C172 262 200 90 384 90C501.5 90 581.5 167 696 320",
  "M-696 296C-581.5 143 -501.5 66 -384 66C-210 66 -189 238 -8 238C172 238 200 66 384 66C501.5 66 581.5 143 696 296",
  "M-696 272C-581.5 119 -501.5 42 -384 42C-210 42 -189 214 -8 214C172 214 200 42 384 42C501.5 42 581.5 119 696 272",
  "M-696 248C-581.5 95 -501.5 18 -384 18C-210 18 -189 190 -8 190C172 190 200 18 384 18C501.5 18 581.5 95 696 248",
];

export const BackgroundBeams = React.memo(function BackgroundBeams({
  className,
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {beamPaths.map((path, index) => (
          <path
            key={`${path}-base`}
            d={path}
            stroke="url(#beam-base-gradient)"
            strokeOpacity="0.08"
            strokeWidth="0.5"
          />
        ))}

        {beamPaths.map((path, index) => (
          <motion.path
            key={`${path}-beam`}
            d={path}
            stroke={`url(#beam-active-gradient-${index})`}
            strokeOpacity="0.45"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 10,
              ease: "linear",
              repeat: Infinity,
              delay: index * 0.18,
            }}
          />
        ))}

        <defs>
          <radialGradient
            id="beam-base-gradient"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(348 158) rotate(90) scale(220 420)"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {beamPaths.map((path, index) => (
            <motion.linearGradient
              key={`beam-active-gradient-${index}`}
              id={`beam-active-gradient-${index}`}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", "95%"],
              }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
                delay: index * 0.18,
              }}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="0.2" stopColor="#18CCFC" />
              <stop offset="0.325" stopColor="#6344F5" />
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
});
