import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

type TextOverlayProps = {
  text: string;
  startFrame?: number;
  durationFrames?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: number;
  letterSpacing?: number;
  textTransform?: React.CSSProperties["textTransform"];
  position?: "center" | "bottom" | "top" | "bottom-left";
  fadeIn?: boolean;
  fadeOut?: boolean;
  slideUp?: boolean;
};

export const TextOverlay: React.FC<TextOverlayProps> = ({
  text,
  startFrame = 0,
  durationFrames,
  fontSize = 48,
  color = "#ffffff",
  fontFamily = "Helvetica Neue, Helvetica, Arial, sans-serif",
  fontWeight = 300,
  letterSpacing = 4,
  textTransform = "uppercase",
  position = "center",
  fadeIn = true,
  fadeOut = true,
  slideUp = false,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const dur = durationFrames ?? durationInFrames - startFrame;
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0 || relativeFrame > dur) return null;

  const fadeDur = Math.min(fps * 0.5, dur / 3);

  let opacity = 1;
  if (fadeIn) {
    opacity = Math.min(
      opacity,
      interpolate(relativeFrame, [0, fadeDur], [0, 1], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      })
    );
  }
  if (fadeOut) {
    opacity = Math.min(
      opacity,
      interpolate(relativeFrame, [dur - fadeDur, dur], [1, 0], {
        extrapolateLeft: "clamp",
        easing: Easing.in(Easing.cubic),
      })
    );
  }

  const translateY = slideUp
    ? interpolate(relativeFrame, [0, fadeDur], [30, 0], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      })
    : 0;

  const positionStyles: React.CSSProperties = (() => {
    switch (position) {
      case "top":
        return { top: 120, left: 0, right: 0, textAlign: "center" as const };
      case "bottom":
        return { bottom: 160, left: 0, right: 0, textAlign: "center" as const };
      case "bottom-left":
        return { bottom: 120, left: 60, right: 60, textAlign: "left" as const };
      case "center":
      default:
        return {
          top: "50%",
          left: 0,
          right: 0,
          textAlign: "center" as const,
          transform: `translateY(-50%) translateY(${translateY}px)`,
        };
    }
  })();

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyles,
        opacity,
        transform:
          position !== "center"
            ? `translateY(${translateY}px)`
            : positionStyles.transform,
        zIndex: 10,
      }}
    >
      <span
        style={{
          fontSize,
          color,
          fontFamily,
          fontWeight,
          letterSpacing,
          textTransform,
          lineHeight: 1.3,
          whiteSpace: "pre-line",
        }}
      >
        {text}
      </span>
    </div>
  );
};
