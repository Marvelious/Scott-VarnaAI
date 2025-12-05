# ABOUTME: Disaster recovery and restoration guide for VarnaAI portfolio applications
# ABOUTME: Step-by-step procedures to restore Docker volumes and app data from backups

# VarnaAI Disaster Recovery & Restoration Guide

## Overview

This guide provides step-by-step procedures for restoring VarnaAI portfolio applications from backups in case of data loss, server failure, or migration.

## Quick Reference

| Scenario | Estimated Recovery Time |
|----------|------------------------|
| Single volume restore | 5-15 minutes |
| Full application restore | 15-30 minutes |
| Complete server rebuild | 1-2 hours |

## Prerequisites

- SSH access to Hetzner VPS (78.47.125.174)
- Root or sudo privileges
- Access to backup storage at `/backups/varnaai/`
- Docker and Docker Compose installed

## Backup Structure

```
/backups/varnaai/
├── daily/
│   ├── backup_20250124_020000/
│   │   ├── volumes/
│   │   │   ├── c3_postgres_data_20250124_020000.tar.gz
│   │   │   ├── fwchange_postgres_data_20250124_020000.tar.gz
│   │   │   └── ...
│   │   ├── apps/
│   │   │   ├── c3_20250124_020000.tar.gz
│   │   │   └── ...
│   │   ├── manifest.json
│   │   └── checksums.sha256
│   └── backup_20250123_020000/
│       └── ...
└── README.md
```

## Restoration Procedures

### Procedure 1: Restore Single Docker Volume

Use this when a specific application's data is corrupted.

```bash
#!/bin/bash
# Restore single Docker volume

# Variables
BACKUP_DATE="20250124_020000"
VOLUME_NAME="c3_postgres_data"
BACKUP_FILE="/backups/varnaai/daily/backup_${BACKUP_DATE}/volumes/${VOLUME_NAME}_${BACKUP_DATE}.tar.gz"

# Step 1: Stop containers using this volume
echo "Stopping containers..."
docker-compose -f /home/apps/c3/docker-compose.yml down

# Step 2: Verify backup integrity
echo "Verifying backup..."
cd /backups/varnaai/daily/backup_${BACKUP_DATE}/
sha256sum -c checksums.sha256 --ignore-missing

# Step 3: Remove existing volume (dangerous!)
echo "WARNING: Removing existing volume ${VOLUME_NAME}"
docker volume rm ${VOLUME_NAME} 2>/dev/null || true

# Step 4: Create fresh volume
docker volume create ${VOLUME_NAME}

# Step 5: Restore data from backup
docker run --rm \
    -v ${VOLUME_NAME}:/target \
    -v $(dirname ${BACKUP_FILE}):/backup:ro \
    alpine:latest \
    tar -xzf /backup/$(basename ${BACKUP_FILE}) -C /target

# Step 6: Restart containers
echo "Restarting containers..."
docker-compose -f /home/apps/c3/docker-compose.yml up -d

# Step 7: Verify restoration
echo "Verifying restoration..."
docker exec c3-postgres psql -U postgres -c "SELECT 1;"

echo "Volume restoration complete!"
```

### Procedure 2: Restore Full Application

Use this when an entire application needs to be restored.

```bash
#!/bin/bash
# Restore full application (C3 example)

APP_NAME="c3"
BACKUP_DATE="20250124_020000"
BACKUP_DIR="/backups/varnaai/daily/backup_${BACKUP_DATE}"

# Step 1: Stop application
echo "Stopping ${APP_NAME}..."
cd /home/apps/${APP_NAME}
docker-compose down

# Step 2: Backup current state (just in case)
tar -czf /tmp/${APP_NAME}_before_restore.tar.gz /home/apps/${APP_NAME}

# Step 3: Verify backup checksums
echo "Verifying backup integrity..."
cd ${BACKUP_DIR}
sha256sum -c checksums.sha256

# Step 4: Restore application files
echo "Restoring application files..."
tar -xzf ${BACKUP_DIR}/apps/${APP_NAME}_${BACKUP_DATE}.tar.gz -C /home/apps/

# Step 5: Restore Docker volumes
echo "Restoring Docker volumes..."
for volume_backup in ${BACKUP_DIR}/volumes/${APP_NAME}*.tar.gz; do
    VOLUME_NAME=$(basename ${volume_backup} | sed "s/_${BACKUP_DATE}.tar.gz//")

    echo "  Restoring volume: ${VOLUME_NAME}"
    docker volume rm ${VOLUME_NAME} 2>/dev/null || true
    docker volume create ${VOLUME_NAME}

    docker run --rm \
        -v ${VOLUME_NAME}:/target \
        -v ${BACKUP_DIR}/volumes:/backup:ro \
        alpine:latest \
        tar -xzf /backup/$(basename ${volume_backup}) -C /target
done

# Step 6: Start application
echo "Starting ${APP_NAME}..."
cd /home/apps/${APP_NAME}
docker-compose up -d

# Step 7: Health check
echo "Running health check..."
sleep 10
curl -f http://localhost:3080/health || echo "WARNING: Health check failed"

echo "Application restoration complete!"
```

### Procedure 3: Complete Server Rebuild

Use this when migrating to a new server or complete server failure.

```bash
#!/bin/bash
# Complete server rebuild from backups

# Step 1: Install Docker
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker

# Step 2: Install Docker Compose
apt-get update
apt-get install -y docker-compose-plugin

# Step 3: Create directory structure
mkdir -p /home/apps/{c3,fwchange,retirementai,seoagent,agents}
mkdir -p /backups/varnaai

# Step 4: Transfer backups from remote storage
# Option A: SCP from backup server
scp -r backup-server:/backups/varnaai/* /backups/varnaai/

# Option B: Restore from Hetzner Storage Box
mount -t cifs //u123456.your-storagebox.de/backup /mnt/backup \
    -o user=u123456,pass=YOUR_PASSWORD
cp -r /mnt/backup/varnaai/* /backups/varnaai/

# Step 5: Restore each application
BACKUP_DATE="20250124_020000"
BACKUP_DIR="/backups/varnaai/daily/backup_${BACKUP_DATE}"

for app in c3 fwchange retirementai seoagent agents; do
    echo "Restoring ${app}..."

    # Restore app files
    tar -xzf ${BACKUP_DIR}/apps/${app}_${BACKUP_DATE}.tar.gz -C /home/apps/

    # Restore volumes
    for volume_backup in ${BACKUP_DIR}/volumes/${app}*.tar.gz; do
        if [[ -f "$volume_backup" ]]; then
            VOLUME_NAME=$(basename ${volume_backup} | sed "s/_${BACKUP_DATE}.tar.gz//")
            docker volume create ${VOLUME_NAME}
            docker run --rm \
                -v ${VOLUME_NAME}:/target \
                -v ${BACKUP_DIR}/volumes:/backup:ro \
                alpine:latest \
                tar -xzf /backup/$(basename ${volume_backup}) -C /target
        fi
    done
done

# Step 6: Setup Traefik reverse proxy
cd /home/apps/traefik
docker-compose up -d

# Step 7: Start all applications
for app in c3 fwchange retirementai seoagent agents; do
    cd /home/apps/${app}
    docker-compose up -d
done

# Step 8: Verify all services
docker ps
curl -f https://c3.varnaai.com/health
curl -f https://fwchange.varnaai.com/
curl -f https://demo-retirement.varnaai.com/

echo "Server rebuild complete!"
```

## Verification Checklist

After any restoration, verify:

- [ ] Docker containers are running: `docker ps`
- [ ] Application responds: `curl -f https://[app].varnaai.com/`
- [ ] Database connections work: Check application logs
- [ ] Data integrity: Spot-check critical records
- [ ] SSL certificates valid: Browser padlock icon
- [ ] External APIs connected: Test integrations

## Emergency Contacts

| Role | Contact |
|------|---------|
| Server Admin | admin@varnaai.com |
| Hetzner Support | https://console.hetzner.cloud/ |

## Backup Schedule

| Backup Type | Frequency | Retention |
|-------------|-----------|-----------|
| Full backup | Daily @ 02:00 UTC | 7 days |
| Volume snapshots | Daily | 7 days |

## Troubleshooting

### Backup file corrupted
```bash
# Check if backup passes integrity check
sha256sum -c checksums.sha256

# If failed, use previous day's backup
BACKUP_DATE="20250123_020000"
```

### Docker volume won't delete
```bash
# Force remove with no dependencies
docker volume rm -f VOLUME_NAME

# If still fails, stop all containers
docker stop $(docker ps -aq)
docker volume rm VOLUME_NAME
```

### Container won't start after restore
```bash
# Check logs
docker logs CONTAINER_NAME

# Common issues:
# - Port conflict: Check if port is in use
# - Missing env vars: Verify .env file restored
# - Permission issues: Check volume ownership
```

### Database connection refused
```bash
# Wait for database to initialize
sleep 30
docker-compose restart

# Check database logs
docker logs CONTAINER_NAME-postgres
```

## Testing Restoration (Monthly)

Run restoration test monthly to verify backups work:

1. Create test VM on Hetzner
2. Transfer latest backup
3. Run Procedure 3 (Complete Server Rebuild)
4. Verify all apps functional
5. Destroy test VM
6. Document test results

## Version History

| Date | Author | Changes |
|------|--------|---------|
| 2025-01-24 | Claude | Initial creation |
