import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { TextOverlay } from "../components/TextOverlay";
import { FilmGrain } from "../components/FilmGrain";
import { LogoOverlay } from "../components/LogoOverlay";
import { FPS } from "../constants";

// FINExME Highlight - Red aesthetic clips
// 1080x1920, 9:16 vertical, 30s @ 30fps = 900 frames
// Brand color: #c0392b

const RED = "#c0392b";

const CLIPS = [
  { src: "F I N E B Y M E.mp4", startSec: 3, durFrames: 180 },
  { src: "FREE - CHAMBERS.mp4", startSec: 10, durFrames: 180 },
  { src: "FREE - TWINS.mp4", startSec: 5, durFrames: 180 },
  { src: "FREE - FLO.mp4", startSec: 15, durFrames: 180 },
  { src: "NOCTEM.mp4", startSec: 10, durFrames: 180 },
];

// Precompute sequence offsets so we avoid mutation inside render
const CLIP_OFFSETS = CLIPS.reduce<number[]>((acc, clip, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + CLIPS[i - 1].durFrames);
  return acc;
}, []);

export const FinexmeHighlight: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0000" }}>
      {CLIPS.map((clip, i) => {
        const from = CLIP_OFFSETS[i];

        const crossfade = 12;
        const clipOpacity = interpolate(
          frame,
          [
            from,
            from + crossfade,
            from + clip.durFrames - crossfade,
            from + clip.durFrames,
          ],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <Sequence key={i} from={from} durationInFrames={clip.durFrames}>
            <AbsoluteFill style={{ opacity: clipOpacity }}>
              <OffthreadVideo
                src={staticFile(clip.src)}
                startFrom={clip.startSec * FPS}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Red color wash */}
              <AbsoluteFill
                style={{
                  backgroundColor: RED,
                  opacity: 0.12,
                  mixBlendMode: "multiply",
                }}
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* Title card */}
      <Sequence from={15} durationInFrames={90}>
        <TextOverlay
          text="FINExME"
          fontSize={80}
          fontWeight={700}
          letterSpacing={6}
          color={RED}
          position="center"
          fadeIn
          fadeOut
          slideUp
        />
      </Sequence>

      {/* Tagline */}
      <Sequence from={450} durationInFrames={90}>
        <TextOverlay
          text={"FINE BY ME\nFINE BY YOU"}
          fontSize={36}
          fontWeight={300}
          letterSpacing={4}
          color="#ffffff"
          position="center"
          fadeIn
          fadeOut
        />
      </Sequence>

      <LogoOverlay
        startFrame={30}
        size={80}
        position="bottom-right"
        logoFile="logotype-finexme.png"
      />
      <FilmGrain opacity={0.07} />

      {/* Red vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, ${RED}33 100%)`,
          zIndex: 50,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
