#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
OUTPUT_DIR="$PROJECT_DIR/public/clips"

# Source files — these are the CRF 18 masters already in public/clips
CLIPS=("WelcomeHero" "FinexmeHighlight" "SineNoctisTeaser" "ArtistIntro" "Manifesto" "FilmReel")

echo "=== Transcoding clips for web delivery ==="
echo "Input/Output: $OUTPUT_DIR"
echo ""

for name in "${CLIPS[@]}"; do
  src="$OUTPUT_DIR/${name}.mp4"
  if [ ! -f "$src" ]; then
    echo "SKIP: $src not found"
    continue
  fi

  echo "--- Processing: ${name} ---"

  # Backup original as master if not already done
  if [ ! -f "$OUTPUT_DIR/${name}-master.mp4" ]; then
    cp "$src" "$OUTPUT_DIR/${name}-master.mp4"
    echo "  Backed up master: ${name}-master.mp4"
  fi

  # Re-encode at CRF 24 with faststart for progressive download
  echo "  Encoding CRF 24 MP4..."
  ffmpeg -y -i "$OUTPUT_DIR/${name}-master.mp4" \
    -c:v libx264 -crf 24 -preset slow \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    "$OUTPUT_DIR/${name}.mp4" 2>/dev/null

  # 720p variant for mobile
  echo "  Encoding 720p MP4..."
  ffmpeg -y -i "$OUTPUT_DIR/${name}-master.mp4" \
    -vf "scale='if(gt(iw,ih),1280,720)':'if(gt(iw,ih),720,1280)'" \
    -c:v libx264 -crf 24 -preset slow \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    "$OUTPUT_DIR/${name}-720p.mp4" 2>/dev/null

  # WebM/VP9 for Chrome/Firefox
  echo "  Encoding WebM VP9..."
  ffmpeg -y -i "$OUTPUT_DIR/${name}-master.mp4" \
    -c:v libvpx-vp9 -crf 32 -b:v 0 \
    -c:a libopus -b:a 96k \
    "$OUTPUT_DIR/${name}.webm" 2>/dev/null

  echo "  Done: ${name}"
  echo ""
done

echo "=== Results ==="
ls -lh "$OUTPUT_DIR"/*.mp4 "$OUTPUT_DIR"/*.webm 2>/dev/null
echo ""
echo "Master files preserved as *-master.mp4"
