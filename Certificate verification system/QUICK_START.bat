@echo off
title Certificate System - Quick Start
color 0A

echo ============================================
echo Certificate Verification System
echo ============================================
echo.
echo This will start BOTH servers automatically
echo.
echo IMPORTANT: Keep both windows open!
echo Press Ctrl+C in a window to stop that server
echo ============================================
echo.

cd /d "%~dp0"

echo [1/2] Starting Backend Server...
start "Backend Server - Port 5000" cmd /k "cd backend && color 0B && echo === BACKEND SERVER === && npm run dev"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Server...
start "Frontend Server - Port 3000" cmd /k "cd frontend && color 0E && echo === FRONTEND SERVER === && npm start"

echo.
echo ============================================
echo Servers are starting in separate windows...
echo ============================================
echo.
echo BACKEND:  http://localhost:5000
echo FRONTEND: http://localhost:3000
echo.
echo Login credentials:
echo Email:    admin@example.com
echo Password: Admin@123
echo.
echo ============================================
echo Wait for both servers to finish starting,
echo then go to: http://localhost:3000
echo ============================================
echo.
echo You can close THIS window (not the server windows)
echo.
pause
