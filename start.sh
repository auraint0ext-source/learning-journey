#!/bin/bash

# ==============================================================================
# PrintFlow Global: POD E-Commerce & Marketing Automation Platform
# USA, UK & Canada Market Engine
# ==============================================================================

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

echo "=================================================================="
echo "🚀 Starting PrintFlow Global POD Platform on Localhost..."
echo "=================================================================="

# Check and activate backend virtualenv
if [ ! -d "$BACKEND_DIR/.venv" ]; then
    echo "Creating Python virtual environment in $BACKEND_DIR/.venv..."
    python3 -m venv "$BACKEND_DIR/.venv"
    source "$BACKEND_DIR/.venv/bin/activate"
    pip install -r "$BACKEND_DIR/requirements.txt"
else
    source "$BACKEND_DIR/.venv/bin/activate"
fi

# Ensure initial data is seeded
python3 -c "import app.main; app.main.seed_initial_data()"

# Start FastAPI Backend in background
echo "⚡ Starting FastAPI Backend at http://127.0.0.1:8000..."
cd "$BACKEND_DIR"
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload &
BACKEND_PID=$!

# Start React Vite Frontend
echo "💻 Starting React Vite Frontend at http://localhost:3000..."
cd "$FRONTEND_DIR"
npm run dev -- --host 127.0.0.1 --port 3000 &
FRONTEND_PID=$!

cleanup() {
    echo ""
    echo "🛑 Shutting down backend and frontend..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 0
}

trap cleanup SIGINT SIGTERM

echo ""
echo "=================================================================="
echo "🎉 System is LIVE on Localhost!"
echo "   👉 Frontend Dashboard: http://localhost:3000"
echo "   👉 Backend API & Docs: http://127.0.0.1:8000/docs"
echo "=================================================================="
echo "Press Ctrl+C to terminate both servers."

wait
