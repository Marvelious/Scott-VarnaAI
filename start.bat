@echo off
echo.
echo ========================================
echo    VarnaAI Control Dashboard
echo ========================================
echo.
echo Starting server...
echo.

cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
    echo Please edit .env file with your API keys!
    echo.
    pause
)

REM Build Tailwind CSS
echo Building CSS...
call npx tailwindcss -i ./public/input.css -o ./public/output.css --minify

REM Start server
echo.
echo Starting dashboard server...
echo.
node server.js

pause
