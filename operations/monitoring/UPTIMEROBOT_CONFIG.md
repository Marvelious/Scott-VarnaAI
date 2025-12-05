# ABOUTME: UptimeRobot monitoring configuration guide for VarnaAI portfolio apps
# ABOUTME: Contains setup instructions and monitor URLs for all 5 deployed applications

# UptimeRobot Monitoring Configuration

## Overview

This document provides the configuration for setting up UptimeRobot monitoring for all VarnaAI portfolio applications deployed on Hetzner VPS (78.47.125.174).

## Applications to Monitor

### Production Apps (Live Subdomains)

| App | Monitor URL | Type | Interval |
|-----|-------------|------|----------|
| C3 Compliance | https://c3.varnaai.com/ | HTTP(S) | 5 min |
| FwChange | https://fwchange.varnaai.com/ | HTTP(S) | 5 min |
| RetirementAI | https://demo-retirement.varnaai.com/ | HTTP(S) | 5 min |
| SEO Agent | https://demo-seoagent.varnaai.com/ | HTTP(S) | 5 min |
| VarnaAI Agents | https://demo-agents.varnaai.com/ | HTTP(S) | 5 min |

### Health Check Endpoints

For more detailed monitoring, use health check endpoints where available:

| App | Health Endpoint | Expected Response |
|-----|-----------------|-------------------|
| C3 Compliance | https://c3.varnaai.com/health | `healthy` (200 OK) |
| FwChange Frontend | https://fwchange.varnaai.com/ | HTML (200 OK) |
| FwChange Backend | https://fwchange.varnaai.com/api/health | JSON (200 OK) |
| RetirementAI | https://demo-retirement.varnaai.com/api/health | JSON (200 OK) |

## UptimeRobot Setup Steps

### 1. Create Account
1. Go to https://uptimerobot.com/
2. Sign up for free tier (50 monitors, 5-minute intervals)

### 2. Add Monitors

For each application:

1. Click "Add New Monitor"
2. Select "HTTP(s)" as monitor type
3. Enter friendly name (e.g., "VarnaAI - C3 Compliance")
4. Enter URL from table above
5. Set monitoring interval: 5 minutes
6. Enable keyword monitoring (optional): Check for "200 OK" status

### 3. Configure Alerts

1. Go to "Alert Contacts" → "Add Alert Contact"
2. Add email notification: your-email@domain.com
3. Optional: Add Telegram/Slack webhook for instant alerts

### 4. Alert Contact Configuration

```yaml
Primary Alert Contact:
  Type: Email
  Email: admin@varnaai.com
  Threshold: 1 failure (immediate)

Secondary Alert Contact (optional):
  Type: Telegram
  Bot Token: [Create via @BotFather]
  Chat ID: [Your chat ID]
```

## Recommended Monitor Settings

```yaml
Monitor Settings:
  Type: HTTP(s)
  Interval: 5 minutes (free tier)
  Timeout: 30 seconds

  HTTP Options:
    Method: HEAD (faster) or GET
    Follow Redirects: Yes

  Alert Settings:
    Alert after X failures: 1
    Alert again every: 60 minutes

  SSL Certificate:
    Monitor expiration: Yes
    Alert days before: 14
```

## Status Page (Optional)

Create a public status page to share with clients:

1. Go to "Status Pages" → "Add Status Page"
2. Name: "VarnaAI Services Status"
3. Select all 5 monitors
4. Custom domain (optional): status.varnaai.com
5. Share URL: https://stats.uptimerobot.com/[your-id]

## API Integration (Advanced)

For programmatic monitoring access:

```bash
# Get API key from UptimeRobot dashboard
API_KEY="your-api-key"

# List all monitors
curl -X POST "https://api.uptimerobot.com/v2/getMonitors" \
  -H "Content-Type: application/json" \
  -d "{\"api_key\":\"$API_KEY\"}"

# Get monitor status
curl -X POST "https://api.uptimerobot.com/v2/getMonitors" \
  -H "Content-Type: application/json" \
  -d "{\"api_key\":\"$API_KEY\",\"response_times\":\"1\"}"
```

## Maintenance Windows

When performing maintenance:

1. Go to monitor settings
2. Click "Pause" to temporarily stop monitoring
3. Perform maintenance
4. Click "Resume" when complete

## Troubleshooting

### False Positives
- Increase timeout to 60 seconds
- Check for firewall blocking UptimeRobot IPs
- Verify Cloudflare isn't blocking monitoring requests

### UptimeRobot IP Addresses
If your firewall blocks requests, whitelist these IPs:
- https://uptimerobot.com/locations/

### SSL Certificate Monitoring
- Enable SSL monitoring to get alerts 14 days before expiration
- All apps use Let's Encrypt with auto-renewal via Traefik
