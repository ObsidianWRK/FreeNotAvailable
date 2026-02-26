#!/usr/bin/env bash
set -euo pipefail

# Batch render all FREE / Other World Remotion compositions
# H.264, CRF 18, AAC 320kbps, 30fps
# Max 3 concurrent render processes

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="$SCRIPT_DIR/output"
ENTRY="$SCRIPT_DIR/src/index.ts"
MAX_JOBS=3

mkdir -p "$OUTPUT_DIR"

COMPOSITIONS=(
  "WelcomeHero"
  "FinexmeHighlight"
  "SineNoctisTeaser"
  "ArtistIntro"
  "Manifesto"
  "FilmReel"
)

job_count=0

for comp in "${COMPOSITIONS[@]}"; do
  echo "--- Rendering: $comp ---"

  npx remotion render "$ENTRY" "$comp" "$OUTPUT_DIR/${comp}.mp4" \
    --codec h264 \
    --crf 18 \
    --audio-codec aac \
    --audio-bitrate 320k \
    --fps 30 &

  job_count=$((job_count + 1))

  if [ "$job_count" -ge "$MAX_JOBS" ]; then
    wait -n 2>/dev/null || wait
    job_count=$((job_count - 1))
  fi
done

# Wait for remaining jobs
wait

echo ""
echo "=== All renders complete ==="
ls -lh "$OUTPUT_DIR"/*.mp4
