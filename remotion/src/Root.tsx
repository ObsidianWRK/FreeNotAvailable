import React from "react";
import { Composition } from "remotion";
import { WelcomeHero } from "./compositions/WelcomeHero";
import { FinexmeHighlight } from "./compositions/FinexmeHighlight";
import { SineNoctisTeaser } from "./compositions/SineNoctisTeaser";
import { ArtistIntro } from "./compositions/ArtistIntro";
import { Manifesto } from "./compositions/Manifesto";
import { FilmReel } from "./compositions/FilmReel";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Welcome to the Other World - Hero montage (9:16 vertical, 30s) */}
      <Composition
        id="WelcomeHero"
        component={WelcomeHero}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* 2. FINExME Highlight - Red aesthetic (9:16 vertical, 30s) */}
      <Composition
        id="FinexmeHighlight"
        component={FinexmeHighlight}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* 3. SINE NOCTIS Teaser - B&W (9:16 vertical, 30s) */}
      <Composition
        id="SineNoctisTeaser"
        component={SineNoctisTeaser}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* 4. Artist Introduction - Bio + clips (9:16 vertical, 45s) */}
      <Composition
        id="ArtistIntro"
        component={ArtistIntro}
        durationInFrames={FPS * 45}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* 5. Manifesto - "Men rarely make music that yearns" (9:16 vertical, 30s) */}
      <Composition
        id="Manifesto"
        component={Manifesto}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* 6. Film Reel - Quick cuts showreel (16:9 landscape, 60s) */}
      <Composition
        id="FilmReel"
        component={FilmReel}
        durationInFrames={FPS * 60}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
