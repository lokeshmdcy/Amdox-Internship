Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  Starting Certificate Verification System" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Function to start backend
function Start-Backend {
    Write-Host "Starting Backend Server..." -ForegroundColor Yellow
    Set-Location -Path "backend"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
    Set-Location -Path ".."
}

# Function to start frontend
function Start-Frontend {
    Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
    Set-Location -Path "frontend"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
    Set-Location -Path ".."
}

# Check if MongoDB is running
Write-Host "Checking if MongoDB is running..." -ForegroundColor Yellow
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "✓ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "⚠ Warning: MongoDB doesn't appear to be running" -ForegroundColor Yellow
    Write-Host "Please start MongoDB manually if you're using a local installation" -ForegroundColor Yellow
    Write-Host ""
}

# Start servers
Write-Host ""
Start-Backend
Start-Frontend

Write-Host ""
Write-Host "===============================================" -ForegroundColor Green
Write-Host "  Servers Started! ✓" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Admin Credentials:" -ForegroundColor Yellow
Write-Host "Email: admin@example.com" -ForegroundColor White
Write-Host "Password: Admin@123" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C in each terminal window to stop the servers" -ForegroundColor Gray
