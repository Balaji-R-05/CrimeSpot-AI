@echo off
echo Starting Development Servers...

:: Start Backend Server
start cmd /k "cd backend && python -m uvicorn main:app --reload --port 8000"

:: Start Frontend Server
start cmd /k "cd frontend && npm start"

echo Development servers are starting...
echo Backend will be available at: http://localhost:8000
echo Frontend will be available at: http://localhost:3000