@echo off
echo ========================================
echo Certificate Verification System
echo Starting Servers...
echo ========================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d "%~dp0backend" && npm run dev"
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d "%~dp0frontend" && npm start"

echo.
echo ========================================
echo Servers are starting...
echo ========================================
echo.
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:3000
echo.
echo Login Credentials:
echo   Email: admin@example.com
echo   Password: Admin@123
echo.
echo IMPORTANT: Do NOT close the server windows!
echo ========================================
echo.
pause
