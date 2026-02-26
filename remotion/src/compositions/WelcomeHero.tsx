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

// "Welcome to the Other World" - Hero montage
// 1080x1920, 9:16 vertical, 30s @ 30fps = 900 frames

const CLIPS = [
  { src: "NOCTEM.mp4", startSec: 5, durFrames: 150 },
  { src: "VESPERA.mp4", startSec: 3, durFrames: 150 },
  { src: "ANTE.mp4", startSec: 2, durFrames: 150 },
  { src: "FREE - PILGRIM.mp4", startSec: 8, durFrames: 150 },
  { src: "FREE - MAYBE.mp4", startSec: 5, durFrames: 150 },
  { src: "FREE - FLO.mp4", startSec: 4, durFrames: 150 },
];

export const WelcomeHero: React.FC = () => {
  const frame = useCurrentFrame();

  let sequenceStart = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {CLIPS.map((clip, i) => {
        const from = sequenceStart;
        sequenceStart += clip.durFrames;

        const crossfade = 15;
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
                startFrom={clip.startSec * 30}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* Title text */}
      <Sequence from={30} durationInFrames={120}>
        <TextOverlay
          text={"WELCOME TO\nTHE OTHER WORLD"}
          fontSize={64}
          fontWeight={200}
          letterSpacing={8}
          color="#ffffff"
          position="center"
          fadeIn
          fadeOut
          slideUp
        />
      </Sequence>

      {/* Artist name */}
      <Sequence from={750} durationInFrames={120}>
        <TextOverlay
          text="FREE"
          fontSize={96}
          fontWeight={100}
          letterSpacing={24}
          color="#ffffff"
          position="center"
          fadeIn
          fadeOut
        />
      </Sequence>

      <LogoOverlay startFrame={60} size={80} position="bottom-right" />
      <FilmGrain opacity={0.05} />

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
          zIndex: 50,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
