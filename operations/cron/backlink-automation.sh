#!/bin/bash
###############################################################################
# Backlink Automation Cron Scripts
# VarnaAI Websites Portfolio - Automated Backlink Building
#
# Schedule in crontab:
# 0 9 * * * /path/to/backlink-automation.sh daily
# 0 10 * * 1 /path/to/backlink-automation.sh weekly
###############################################################################

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
TOOLS_DIR="$PROJECT_ROOT/seo/tools"

cd "$PROJECT_ROOT" || exit 1

# Daily tasks (9 AM every day)
if [ "$1" == "daily" ]; then
  echo "=== Daily Backlink Automation ($(date)) ===" | tee -a logs/backlink-automation.log

  # 1. Discover guest post opportunities (20 per site)
  echo "[$(date +%H:%M:%S)] Discovering guest post opportunities..." | tee -a logs/backlink-automation.log
  node "$TOOLS_DIR/backlink-discovery.js" guest-posts "project management" de ai-projektmanager.de 20 >> logs/backlink-automation.log 2>&1
  node "$TOOLS_DIR/backlink-discovery.js" guest-posts "AI services" en varnaai.com 20 >> logs/backlink-automation.log 2>&1
  node "$TOOLS_DIR/backlink-discovery.js" guest-posts "AI marketing" bg aimarketingbg.com 10 >> logs/backlink-automation.log 2>&1

  # 2. Discover resource pages (15 per site)
  echo "[$(date +%H:%M:%S)] Discovering resource pages..." | tee -a logs/backlink-automation.log
  node "$TOOLS_DIR/backlink-discovery.js" resource-pages "AI tools" en varnaai.com 15 >> logs/backlink-automation.log 2>&1
  node "$TOOLS_DIR/backlink-discovery.js" resource-pages "security tools" en classicsecurity.net 15 >> logs/backlink-automation.log 2>&1

  # 3. Process scheduled follow-ups (2 PM)
  echo "[$(date +%H:%M:%S)] Processing scheduled follow-ups..." | tee -a logs/backlink-automation.log
  node "$TOOLS_DIR/outreach-sequences.js" process-followups >> logs/backlink-automation.log 2>&1

  # 4. Send new outreach emails (max 20 per day)
  echo "[$(date +%H:%M:%S)] Sending new outreach emails..." | tee -a logs/backlink-automation.log
  node "$TOOLS_DIR/outreach-daily.js" >> logs/backlink-automation.log 2>&1

  echo "[$(date +%H:%M:%S)] Daily automation complete" | tee -a logs/backlink-automation.log

# Weekly tasks (Monday 10 AM)
elif [ "$1" == "weekly" ]; then
  echo "=== Weekly Backlink Automation ($(date)) ===" | tee -a logs/backlink-automation.log

  # 1. Check health of all backlinks
  echo "[$(date +%H:%M:%S)] Checking backlink health..." | tee -a logs/backlink-automation.log
  node "$TOOLS_DIR/link-monitor.js" check-all >> logs/backlink-automation.log 2>&1

  # 2. Generate health reports
  echo "[$(date +%H:%M:%S)] Generating health reports..." | tee -a logs/backlink-automation.log
  node "$TOOLS_DIR/link-monitor.js" report ai-projektmanager.de > reports/backlinks-ai-projektmanager.txt
  node "$TOOLS_DIR/link-monitor.js" report varnaai.com > reports/backlinks-varnaai.txt
  node "$TOOLS_DIR/link-monitor.js" report aimarketingbg.com > reports/backlinks-aimarketingbg.txt
  node "$TOOLS_DIR/link-monitor.js" report varna-agenten.de > reports/backlinks-varna-agenten.txt
  node "$TOOLS_DIR/link-monitor.js" report classicsecurity.net > reports/backlinks-classicsecurity.txt

  # 3. Check for critical issues
  echo "[$(date +%H:%M:%S)] Checking for alerts..." | tee -a logs/backlink-automation.log
  node "$TOOLS_DIR/link-monitor.js" alerts >> logs/backlink-automation.log 2>&1

  # 4. Competitor analysis (rotate through competitors)
  echo "[$(date +%H:%M:%S)] Running competitor analysis..." | tee -a logs/backlink-automation.log
  node "$TOOLS_DIR/backlink-discovery.js" competitor "monday.com" ai-projektmanager.de 20 >> logs/backlink-automation.log 2>&1

  echo "[$(date +%H:%M:%S)] Weekly automation complete" | tee -a logs/backlink-automation.log

else
  echo "Usage: $0 {daily|weekly}"
  exit 1
fi
