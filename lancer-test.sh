#!/bin/sh
cd "$(dirname "$0")"
URL="http://localhost:8000"
if command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL" >/dev/null 2>&1 &
elif command -v open >/dev/null 2>&1; then open "$URL" >/dev/null 2>&1 &
fi
python3 -m http.server 8000
