import React from "react";
import {
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

type LogoOverlayProps = {
  startFrame?: number;
  durationFrames?: number;
  size?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  logoFile?: string;
};

export const LogoOverlay: React.FC<LogoOverlayProps> = ({
  startFrame = 0,
  durationFrames,
  size = 120,
  position = "bottom-right",
  logoFile = "logotype-free.png",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;
  if (durationFrames && relativeFrame > durationFrames) return null;

  const opacity = interpolate(relativeFrame, [0, 15], [0, 0.8], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const positionStyles: React.CSSProperties = (() => {
    switch (position) {
      case "top-left":
        return { top: 40, left: 40 };
      case "top-right":
        return { top: 40, right: 40 };
      case "bottom-left":
        return { bottom: 40, left: 40 };
      case "bottom-right":
        return { bottom: 40, right: 40 };
      case "center":
        return {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
    }
  })();

  return (
    <Img
      src={staticFile(logoFile)}
      style={{
        position: "absolute",
        width: size,
        opacity,
        zIndex: 20,
        ...positionStyles,
      }}
    />
  );
};
