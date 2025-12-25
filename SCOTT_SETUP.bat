@echo off
title VarnaAI Setup for Scott
color 0A

echo ========================================
echo   VarnaAI One-Click Setup for Scott
echo ========================================
echo.

:: Check Docker
echo [1/5] Checking Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker not installed!
    echo Please install Docker Desktop from: https://docker.com/products/docker-desktop
    pause
    exit /b 1
)
echo Docker OK!

:: Check Docker running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)
echo Docker is running!

echo.
echo [2/5] Setting up environment files...

:: Copy .env files if missing
if not exist "apps\pension\.env" (
    if exist "apps\pension\.env.example" copy "apps\pension\.env.example" "apps\pension\.env"
)
if not exist "apps\fwchange\.env" (
    if exist "apps\fwchange\.env.example" copy "apps\fwchange\.env.example" "apps\fwchange\.env"
)
if not exist "apps\dashboard\.env" (
    if exist "apps\dashboard\.env.example" copy "apps\dashboard\.env.example" "apps\dashboard\.env"
)
if not exist "apps\projectmanager\.env" (
    if exist "apps\projectmanager\.env.example" copy "apps\projectmanager\.env.example" "apps\projectmanager\.env"
)
if not exist "apps\LibreChat\.env" (
    if exist "apps\LibreChat\.env.example" copy "apps\LibreChat\.env.example" "apps\LibreChat\.env"
)
echo Environment files ready!

echo.
echo [3/5] Which app do you want to run?
echo.
echo   1. LibreChat      (AI Chat Interface)
echo   2. RetirementAI   (Pension Planning)
echo   3. FwChange       (Firewall Manager)
echo   4. C3 Dashboard   (Compliance)
echo   5. ProjectManager (Task AI)
echo   6. ALL APPS       (Requires 16GB+ RAM)
echo   0. Exit
echo.

set /p choice="Enter number (1-6): "

if "%choice%"=="0" goto :end
if "%choice%"=="1" goto :librechat
if "%choice%"=="2" goto :pension
if "%choice%"=="3" goto :fwchange
if "%choice%"=="4" goto :dashboard
if "%choice%"=="5" goto :projectmanager
if "%choice%"=="6" goto :all

:librechat
echo.
echo [4/5] Starting LibreChat...
cd apps\LibreChat
docker-compose up -d
echo.
echo LibreChat is starting at: http://localhost:3080
goto :done

:pension
echo.
echo [4/5] Starting RetirementAI...
cd apps\pension
docker-compose up -d
echo.
echo RetirementAI is starting at: http://localhost:3001
goto :done

:fwchange
echo.
echo [4/5] Starting FwChange...
cd apps\fwchange
docker-compose up -d
echo.
echo FwChange is starting at: http://localhost:3003
goto :done

:dashboard
echo.
echo [4/5] Starting C3 Dashboard...
cd apps\dashboard
docker-compose up -d
echo.
echo C3 Dashboard is starting at: http://localhost:3002
goto :done

:projectmanager
echo.
echo [4/5] Starting ProjectManager...
cd apps\projectmanager
docker-compose up -d
echo.
echo ProjectManager is starting at: http://localhost:3000
goto :done

:all
echo.
echo [4/5] Starting ALL apps (this takes a while)...
cd apps\LibreChat && docker-compose up -d && cd ..\..
cd apps\pension && docker-compose up -d && cd ..\..
cd apps\fwchange && docker-compose up -d && cd ..\..
cd apps\dashboard && docker-compose up -d && cd ..\..
cd apps\projectmanager && docker-compose up -d && cd ..\..
echo.
echo All apps starting:
echo   - LibreChat:      http://localhost:3080
echo   - RetirementAI:   http://localhost:3001
echo   - C3 Dashboard:   http://localhost:3002
echo   - FwChange:       http://localhost:3003
echo   - ProjectManager: http://localhost:3000
goto :done

:done
echo.
echo [5/5] Setup complete!
echo.
echo Wait 1-2 minutes for containers to fully start.
echo Open the URL in your browser.
echo.
echo To stop: Run SCOTT_STOP.bat
echo.
pause
goto :end

:end
