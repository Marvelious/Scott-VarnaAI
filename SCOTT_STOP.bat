@echo off
title VarnaAI Stop All
color 0C

echo ========================================
echo   Stopping All VarnaAI Apps
echo ========================================
echo.

cd apps\LibreChat && docker-compose down 2>nul && cd ..\..
cd apps\pension && docker-compose down 2>nul && cd ..\..
cd apps\fwchange && docker-compose down 2>nul && cd ..\..
cd apps\dashboard && docker-compose down 2>nul && cd ..\..
cd apps\projectmanager && docker-compose down 2>nul && cd ..\..

echo.
echo All apps stopped!
echo.
pause
