@echo off
REM ##############################################################################
REM Backlink Automation for Windows
REM VarnaAI Websites Portfolio - Automated Backlink Building
REM
REM Schedule in Windows Task Scheduler:
REM Daily:  9:00 AM - backlink-automation.bat daily
REM Weekly: Monday 10:00 AM - backlink-automation.bat weekly
REM ##############################################################################

setlocal
set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..\..
set TOOLS_DIR=%PROJECT_ROOT%\seo\tools

cd /d "%PROJECT_ROOT%" || exit /b 1

if "%1"=="daily" (
  echo === Daily Backlink Automation (%date% %time%) === >> logs\backlink-automation.log

  REM 1. Discover guest post opportunities
  echo [%time%] Discovering guest post opportunities... >> logs\backlink-automation.log
  node "%TOOLS_DIR%\backlink-discovery.js" guest-posts "project management" de ai-projektmanager.de 20 >> logs\backlink-automation.log 2>&1
  node "%TOOLS_DIR%\backlink-discovery.js" guest-posts "AI services" en varnaai.com 20 >> logs\backlink-automation.log 2>&1
  node "%TOOLS_DIR%\backlink-discovery.js" guest-posts "AI marketing" bg aimarketingbg.com 10 >> logs\backlink-automation.log 2>&1

  REM 2. Discover resource pages
  echo [%time%] Discovering resource pages... >> logs\backlink-automation.log
  node "%TOOLS_DIR%\backlink-discovery.js" resource-pages "AI tools" en varnaai.com 15 >> logs\backlink-automation.log 2>&1
  node "%TOOLS_DIR%\backlink-discovery.js" resource-pages "security tools" en classicsecurity.net 15 >> logs\backlink-automation.log 2>&1

  REM 3. Process scheduled follow-ups
  echo [%time%] Processing scheduled follow-ups... >> logs\backlink-automation.log
  node "%TOOLS_DIR%\outreach-sequences.js" process-followups >> logs\backlink-automation.log 2>&1

  REM 4. Send new outreach emails
  echo [%time%] Sending new outreach emails... >> logs\backlink-automation.log
  node "%TOOLS_DIR%\outreach-daily.js" >> logs\backlink-automation.log 2>&1

  echo [%time%] Daily automation complete >> logs\backlink-automation.log

) else if "%1"=="weekly" (
  echo === Weekly Backlink Automation (%date% %time%) === >> logs\backlink-automation.log

  REM 1. Check backlink health
  echo [%time%] Checking backlink health... >> logs\backlink-automation.log
  node "%TOOLS_DIR%\link-monitor.js" check-all >> logs\backlink-automation.log 2>&1

  REM 2. Generate health reports
  echo [%time%] Generating health reports... >> logs\backlink-automation.log
  node "%TOOLS_DIR%\link-monitor.js" report ai-projektmanager.de > reports\backlinks-ai-projektmanager.txt
  node "%TOOLS_DIR%\link-monitor.js" report varnaai.com > reports\backlinks-varnaai.txt
  node "%TOOLS_DIR%\link-monitor.js" report aimarketingbg.com > reports\backlinks-aimarketingbg.txt
  node "%TOOLS_DIR%\link-monitor.js" report varna-agenten.de > reports\backlinks-varna-agenten.txt
  node "%TOOLS_DIR%\link-monitor.js" report classicsecurity.net > reports\backlinks-classicsecurity.txt

  REM 3. Check for alerts
  echo [%time%] Checking for alerts... >> logs\backlink-automation.log
  node "%TOOLS_DIR%\link-monitor.js" alerts >> logs\backlink-automation.log 2>&1

  REM 4. Competitor analysis
  echo [%time%] Running competitor analysis... >> logs\backlink-automation.log
  node "%TOOLS_DIR%\backlink-discovery.js" competitor "monday.com" ai-projektmanager.de 20 >> logs\backlink-automation.log 2>&1

  echo [%time%] Weekly automation complete >> logs\backlink-automation.log

) else (
  echo Usage: %0 {daily^|weekly}
  exit /b 1
)

endlocal
