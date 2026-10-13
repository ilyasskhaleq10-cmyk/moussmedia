#!/usr/bin/env bash
# Prepara un vídeo para que avance fluido con el scroll (todos los fotogramas son clave).
# Uso: ./scripts/encode-scroll-video.sh entrada.mov public/media/scroll.mp4
set -euo pipefail
IN="$1"; OUT="${2:-public/media/scroll.mp4}"
ffmpeg -y -i "$IN" -an -vf "scale='min(1920,iw)':-2,fps=30" \
  -c:v libx264 -preset slow -crf 23 -g 1 -pix_fmt yuv420p -movflags +faststart "$OUT"
ffmpeg -y -ss 0 -i "$OUT" -frames:v 1 -q:v 4 "${OUT%.mp4}.jpg"
echo "Listo: $OUT"
