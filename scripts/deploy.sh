#!/usr/bin/env bash
# Compila la web y la sube al VPS.
# Uso: ./scripts/deploy.sh usuario@servidor /var/www/moussmedia.com
set -euo pipefail
DEST_HOST="$1"; DEST_PATH="${2:-/var/www/moussmedia.com}"
npm ci
npm run build
rsync -avz --delete out/ "$DEST_HOST:$DEST_PATH/"
echo "Publicado en $DEST_HOST:$DEST_PATH"
