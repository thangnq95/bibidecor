#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-4173}"
DOMAIN="${NGROK_DOMAIN:-}"

if [[ -z "$DOMAIN" && -f ".env.local" ]]; then
  # shellcheck disable=SC1091
  source .env.local
  DOMAIN="${NGROK_DOMAIN:-${DOMAIN:-}}"
fi

if [[ -z "$DOMAIN" && -f ".env" ]]; then
  # shellcheck disable=SC1091
  source .env
  DOMAIN="${NGROK_DOMAIN:-${DOMAIN:-}}"
fi

if ! command -v ngrok >/dev/null 2>&1; then
  echo "ngrok is not installed or not on PATH." >&2
  exit 1
fi

if [[ -z "$DOMAIN" ]]; then
  echo "NGROK_DOMAIN is not set." >&2
  echo "Set a reserved domain first, for example:" >&2
  echo "  export NGROK_DOMAIN=your-name.ngrok-free.app" >&2
  exit 1
fi

echo "Starting ngrok tunnel on http://127.0.0.1:${PORT} with fixed domain: ${DOMAIN}"
exec ngrok http "${PORT}" --url="https://${DOMAIN}"
