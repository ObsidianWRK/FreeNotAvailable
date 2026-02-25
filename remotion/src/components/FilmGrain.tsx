import React from "react";
import { useCurrentFrame, random } from "remotion";

type FilmGrainProps = {
  opacity?: number;
  speed?: number;
};

export const FilmGrain: React.FC<FilmGrainProps> = ({
  opacity = 0.06,
  speed = 3,
}) => {
  const frame = useCurrentFrame();
  const grainFrame = Math.floor(frame / speed);

  // Generate pseudo-random SVG noise offset per frame for animation
  const offsetX = random(`grain-x-${grainFrame}`) * 200;
  const offsetY = random(`grain-y-${grainFrame}`) * 200;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 100,
        pointerEvents: "none",
        opacity,
        mixBlendMode: "overlay",
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id={`grain-${grainFrame}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            seed={grainFrame}
            stitchTiles="stitch"
          />
          <feOffset dx={offsetX} dy={offsetY} />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#grain-${grainFrame})`}
        />
      </svg>
    </div>
  );
};
