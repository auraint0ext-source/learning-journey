#!/bin/bash
set -e
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "=========================================="
echo "  PrintFlow: Sync & Deploy to Cloud Live"
echo "=========================================="

echo "[1/4] Building latest frontend production bundle..."
npm run build

echo "[2/4] Updating root static bundle for GitHub Pages..."
cp -rf dist/* .
touch .nojekyll

echo "[3/4] Committing changes to git..."
git add -A
git commit -m "feat(sync): Live cloud update from PrintFlow Admin Studio" || echo "No changes to commit"

echo "[4/4] Pushing to GitHub (main & printflow-pod-platform)..."
git push origin main
git push origin main:printflow-pod-platform

echo "=========================================="
echo "SUCCESS! Cloud Live is updated and deployed."
echo "GitHub Pages: https://auraint0ext-source.github.io/learning-journey/"
echo "=========================================="
