Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  Certificate Verification System - Setup" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✓ npm installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is not installed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location -Path "backend"

if (Test-Path "node_modules") {
    Write-Host "Backend dependencies already installed. Skipping..." -ForegroundColor Yellow
} else {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Backend dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Creating admin user..." -ForegroundColor Yellow
node utils/createAdmin.js

Set-Location -Path ".."

Write-Host ""
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location -Path "frontend"

if (Test-Path "node_modules") {
    Write-Host "Frontend dependencies already installed. Skipping..." -ForegroundColor Yellow
} else {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Frontend dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
        exit 1
    }
}

Set-Location -Path ".."

Write-Host ""
Write-Host "===============================================" -ForegroundColor Green
Write-Host "  Setup Complete! ✓" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Make sure MongoDB is running" -ForegroundColor White
Write-Host "2. Open a terminal and run: cd backend && npm run dev" -ForegroundColor White
Write-Host "3. Open another terminal and run: cd frontend && npm start" -ForegroundColor White
Write-Host ""
Write-Host "Default Admin Credentials:" -ForegroundColor Yellow
Write-Host "Email: admin@example.com" -ForegroundColor White
Write-Host "Password: Admin@123" -ForegroundColor White
Write-Host ""
Write-Host "Access the application at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "API will run at: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
