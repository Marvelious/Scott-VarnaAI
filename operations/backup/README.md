# ABOUTME: Backup system documentation for VarnaAI portfolio applications
# ABOUTME: Overview of backup scripts, schedule, and restoration procedures

# VarnaAI Backup System

## Overview

Automated backup system for VarnaAI portfolio applications deployed on Hetzner VPS (78.47.125.174).

## Directory Structure

```
operations/backup/
├── README.md                    # This file
├── backup-docker-volumes.sh     # Main backup script
└── RESTORATION_GUIDE.md         # Disaster recovery procedures
```

## Quick Start

### Deploy to VPS

```bash
# Copy backup script to server
scp backup-docker-volumes.sh root@78.47.125.174:/usr/local/bin/

# Make executable
ssh root@78.47.125.174 "chmod +x /usr/local/bin/backup-docker-volumes.sh"

# Create backup directory
ssh root@78.47.125.174 "mkdir -p /backups/varnaai"

# Test backup
ssh root@78.47.125.174 "/usr/local/bin/backup-docker-volumes.sh"
```

### Schedule Daily Backups

```bash
# Add to crontab on VPS
ssh root@78.47.125.174 "crontab -e"

# Add this line (runs at 2 AM UTC daily):
0 2 * * * /usr/local/bin/backup-docker-volumes.sh >> /var/log/varnaai-backup.log 2>&1
```

## Applications Backed Up

| Application | Subdomain | Volumes |
|-------------|-----------|---------|
| C3 Compliance | c3.varnaai.com | PostgreSQL, uploads |
| FwChange | fwchange.varnaai.com | PostgreSQL, Redis |
| RetirementAI | demo-retirement.varnaai.com | PostgreSQL, Redis |
| SEO Agent | demo-seoagent.varnaai.com | PostgreSQL, uploads |
| VarnaAI Agents | demo-agents.varnaai.com | PostgreSQL |

## Backup Details

### What's Backed Up

- **Docker volumes**: All named volumes containing persistent data
- **Application files**: docker-compose.yml, .env files, configs
- **Compose configs**: All docker-compose files in /home directory

### Retention Policy

- Daily backups retained for **7 days**
- Automatically cleans up older backups

### Storage Location

On VPS: `/backups/varnaai/daily/backup_YYYYMMDD_HHMMSS/`

## Restoration

See [RESTORATION_GUIDE.md](./RESTORATION_GUIDE.md) for detailed procedures.

### Quick Restore Commands

```bash
# List available backups
ls -la /backups/varnaai/daily/

# Restore specific volume
./restore-volume.sh VOLUME_NAME BACKUP_DATE

# Full application restore
./restore-app.sh APP_NAME BACKUP_DATE
```

## Monitoring

- Backup logs: `/var/log/varnaai-backup.log`
- Backup status: Check manifest.json in each backup
- Verify checksums: `sha256sum -c checksums.sha256`

## Related Documentation

- [Monitoring Setup](../monitoring/UPTIMEROBOT_CONFIG.md) - UptimeRobot configuration
