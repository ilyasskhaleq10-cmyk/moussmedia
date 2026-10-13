#!/usr/bin/env bash
# Comprime un vídeo para la web (hero, sectores, reels) y genera su póster.
# Uso: ./scripts/encode-video.sh entrada.mov public/media/hero.mp4 [ancho_max]
set -euo pipefail
IN="$1"; OUT="$2"; W="${3:-1920}"
ffmpeg -y -i "$IN" -an -vf "scale='min($W,iw)':-2" \
  -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart "$OUT"
ffmpeg -y -ss 1 -i "$OUT" -frames:v 1 -q:v 4 "${OUT%.mp4}.jpg"
echo "Listo: $OUT"
