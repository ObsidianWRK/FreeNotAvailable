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

// Artist Introduction - Bio text + clips
// 1080x1920, 9:16 vertical, 45s @ 30fps = 1350 frames

const BIO_LINES = [
  { text: "FREE", startFrame: 30, dur: 120, fontSize: 96, weight: 100 },
  {
    text: "ARTIST / DIRECTOR / PRODUCER",
    startFrame: 150,
    dur: 120,
    fontSize: 24,
    weight: 300,
  },
  {
    text: "OTHER WORLD",
    startFrame: 420,
    dur: 120,
    fontSize: 48,
    weight: 200,
  },
  {
    text: "MEN RARELY MAKE MUSIC\nTHAT YEARNS",
    startFrame: 690,
    dur: 150,
    fontSize: 36,
    weight: 300,
  },
  {
    text: "FINExME\nSINE NOCTIS\nOTHERLAND",
    startFrame: 990,
    dur: 150,
    fontSize: 40,
    weight: 200,
  },
];

const BG_CLIPS = [
  { src: "FREE - PILGRIM.mp4", startSec: 5, durFrames: 270 },
  { src: "FREE - MAYBE.mp4", startSec: 8, durFrames: 270 },
  { src: "FREE - FLO.mp4", startSec: 3, durFrames: 270 },
  { src: "FREE - CHAMBERS.mp4", startSec: 6, durFrames: 270 },
  { src: "FREE - TWINS.mp4", startSec: 10, durFrames: 270 },
];

export const ArtistIntro: React.FC = () => {
  const frame = useCurrentFrame();

  let sequenceStart = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Background video clips */}
      {BG_CLIPS.map((clip, i) => {
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
          [0, 0.4, 0.4, 0],
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

      {/* Dark overlay for text readability */}
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 5,
        }}
      />

      {/* Bio text sequence */}
      {BIO_LINES.map((line, i) => (
        <Sequence key={i} from={line.startFrame} durationInFrames={line.dur}>
          <TextOverlay
            text={line.text}
            fontSize={line.fontSize}
            fontWeight={line.weight}
            letterSpacing={line.fontSize > 60 ? 16 : 4}
            color="#ffffff"
            position="center"
            fadeIn
            fadeOut
            slideUp
          />
        </Sequence>
      ))}

      <LogoOverlay startFrame={60} size={80} position="bottom-right" />
      <FilmGrain opacity={0.05} />

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          zIndex: 50,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
