#!/usr/bin/env bash
# One-command setup for Accessibility Games.
# Installs frontend (yarn) and backend (pip) dependencies.

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "=========================================="
echo " Accessibility Games — local setup"
echo "=========================================="

# --- env files ---
if [ ! -f frontend/.env ] && [ -f frontend/.env.example ]; then
  echo "→ Creating frontend/.env from example"
  cp frontend/.env.example frontend/.env
fi
if [ ! -f backend/.env ] && [ -f backend/.env.example ]; then
  echo "→ Creating backend/.env from example"
  cp backend/.env.example backend/.env
fi

# --- frontend ---
echo ""
echo "→ Installing frontend (yarn)…"
if ! command -v yarn >/dev/null 2>&1; then
  echo "   yarn not found. Install it: npm i -g yarn  (or use corepack)"
  exit 1
fi
( cd frontend && yarn install )

# --- backend (optional; the app runs frontend-only) ---
echo ""
if command -v python3 >/dev/null 2>&1; then
  echo "→ Installing backend (pip) — optional, the app works frontend-only…"
  ( cd backend && python3 -m pip install --quiet -r requirements.txt ) || \
    echo "   (skipping backend install — not required for gameplay)"
else
  echo "→ Skipping backend (python3 not found). Not required for gameplay."
fi

echo ""
echo "=========================================="
echo " ✓ Setup complete."
echo ""
echo "   Start the frontend:   yarn start"
echo "   App will open at:     http://localhost:3000"
echo ""
echo "   No login, no API keys required."
echo "=========================================="
