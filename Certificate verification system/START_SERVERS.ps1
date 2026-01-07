# Certificate Verification System - Start Servers

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Certificate Verification System" -ForegroundColor Green
Write-Host "Starting Servers..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\backend'; Write-Host 'BACKEND SERVER' -ForegroundColor Green; npm run dev"

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\frontend'; Write-Host 'FRONTEND SERVER' -ForegroundColor Green; npm start"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Servers are starting..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend will be available at: http://localhost:5000" -ForegroundColor White
Write-Host "Frontend will be available at: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Login Credentials:" -ForegroundColor Yellow
Write-Host "  Email: admin@example.com" -ForegroundColor White
Write-Host "  Password: Admin@123" -ForegroundColor White
Write-Host ""
Write-Host "IMPORTANT: Do NOT close the server windows!" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window (servers will continue running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
