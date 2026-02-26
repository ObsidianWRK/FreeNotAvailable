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

// SINE NOCTIS Teaser - Black & white clips
// 1080x1920, 9:16 vertical, 30s @ 30fps = 900 frames

const CLIPS = [
  { src: "NOCTEM.mp4", startSec: 2, durFrames: 225 },
  { src: "VESPERA.mp4", startSec: 5, durFrames: 225 },
  { src: "ANTE.mp4", startSec: 4, durFrames: 225 },
  { src: "NOCTEM.mp4", startSec: 30, durFrames: 225 },
];

// Precompute sequence offsets so we avoid mutation inside render
const CLIP_OFFSETS = CLIPS.reduce<number[]>((acc, clip, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + CLIPS[i - 1].durFrames);
  return acc;
}, []);

export const SineNoctisTeaser: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {CLIPS.map((clip, i) => {
        const from = CLIP_OFFSETS[i];

        const crossfade = 20;
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
                  filter: "grayscale(100%) contrast(1.15) brightness(0.9)",
                }}
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* SINE NOCTIS title */}
      <Sequence from={30} durationInFrames={120}>
        <TextOverlay
          text="SINE NOCTIS"
          fontSize={72}
          fontWeight={200}
          letterSpacing={12}
          color="#e0e0e0"
          position="center"
          fadeIn
          fadeOut
          slideUp
        />
      </Sequence>

      {/* Latin subtitle */}
      <Sequence from={450} durationInFrames={100}>
        <TextOverlay
          text="WITHOUT NIGHT"
          fontSize={28}
          fontWeight={300}
          letterSpacing={8}
          color="#999999"
          position="center"
          fadeIn
          fadeOut
        />
      </Sequence>

      {/* End card */}
      <Sequence from={780} durationInFrames={90}>
        <TextOverlay
          text={"NOCTEM\nVESPERA\nANTE"}
          fontSize={32}
          fontWeight={200}
          letterSpacing={6}
          color="#cccccc"
          position="center"
          fadeIn
          fadeOut
        />
      </Sequence>

      <LogoOverlay
        startFrame={60}
        size={80}
        position="bottom-right"
        logoFile="logotype-sinenoctis.png"
      />
      <FilmGrain opacity={0.08} speed={2} />

      {/* Dark vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
          zIndex: 50,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
