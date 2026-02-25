import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { TextOverlay } from "../components/TextOverlay";
import { FilmGrain } from "../components/FilmGrain";
import { LogoOverlay } from "../components/LogoOverlay";

// "Men rarely make music that yearns" - Manifesto
// 1080x1920, 9:16 vertical, 30s @ 30fps = 900 frames

const MANIFESTO_LINES = [
  { text: "MEN RARELY", startFrame: 30, dur: 90 },
  { text: "MAKE MUSIC", startFrame: 120, dur: 90 },
  { text: "THAT YEARNS", startFrame: 210, dur: 120 },
  { text: "THIS IS\nTHE OTHER WORLD", startFrame: 420, dur: 150 },
  { text: "WHERE SOUND\nBECOMES VISION", startFrame: 600, dur: 120 },
  { text: "FREE", startFrame: 780, dur: 90 },
];

const BG_CLIPS = [
  { src: "VESPERA.mp4", startSec: 10, durFrames: 300 },
  { src: "NOCTEM.mp4", startSec: 15, durFrames: 300 },
  { src: "ANTE.mp4", startSec: 8, durFrames: 300 },
];

export const Manifesto: React.FC = () => {
  const frame = useCurrentFrame();

  let sequenceStart = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Slow background clips at low opacity */}
      {BG_CLIPS.map((clip, i) => {
        const from = sequenceStart;
        sequenceStart += clip.durFrames;

        const clipOpacity = interpolate(
          frame,
          [from, from + 30, from + clip.durFrames - 30, from + clip.durFrames],
          [0, 0.25, 0.25, 0],
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
                  filter: "blur(2px)",
                }}
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 5,
        }}
      />

      {/* Manifesto text - large, centered, one line at a time */}
      {MANIFESTO_LINES.map((line, i) => (
        <Sequence key={i} from={line.startFrame} durationInFrames={line.dur}>
          <TextOverlay
            text={line.text}
            fontSize={i === MANIFESTO_LINES.length - 1 ? 96 : 52}
            fontWeight={i === MANIFESTO_LINES.length - 1 ? 100 : 300}
            letterSpacing={i === MANIFESTO_LINES.length - 1 ? 24 : 6}
            color="#ffffff"
            position="center"
            fadeIn
            fadeOut
            slideUp
          />
        </Sequence>
      ))}

      <LogoOverlay startFrame={60} size={60} position="bottom-right" />
      <FilmGrain opacity={0.06} speed={2} />
    </AbsoluteFill>
  );
};
