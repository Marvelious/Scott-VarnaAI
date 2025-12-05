#!/bin/bash
# ABOUTME: Docker volume backup script for VarnaAI portfolio applications
# ABOUTME: Creates timestamped backups of Docker volumes and app data with retention policy

set -euo pipefail

# ============================================================================
# VarnaAI Docker Volume Backup Script
# ============================================================================
#
# This script backs up Docker volumes for all VarnaAI portfolio applications:
# - C3 Compliance Center (c3.varnaai.com)
# - FwChange (fwchange.varnaai.com)
# - RetirementAI (demo-retirement.varnaai.com)
# - SEO Agent (demo-seoagent.varnaai.com)
# - VarnaAI Agents (demo-agents.varnaai.com)
#
# Usage:
#   ./backup-docker-volumes.sh [full|incremental]
#
# Schedule with cron:
#   0 2 * * * /path/to/backup-docker-volumes.sh full >> /var/log/varnaai-backup.log 2>&1
#
# ============================================================================

# Configuration
BACKUP_ROOT="/backups/varnaai"
VOLUMES_DIR="/var/lib/docker/volumes"
APPS_DIR="/home/apps"
LOG_FILE="/var/log/varnaai-backup.log"
RETENTION_DAYS=7
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DATE=$(date +%Y-%m-%d)

# Create backup directories
mkdir -p "$BACKUP_ROOT/volumes"
mkdir -p "$BACKUP_ROOT/apps"
mkdir -p "$BACKUP_ROOT/daily"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Error handling
error_exit() {
    log "ERROR: $1"
    exit 1
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
    error_exit "This script must be run as root"
fi

log "=========================================="
log "Starting VarnaAI backup: $TIMESTAMP"
log "=========================================="

# Get backup type from argument or default to full
BACKUP_TYPE="${1:-full}"
log "Backup type: $BACKUP_TYPE"

# ============================================================================
# Step 1: List Docker volumes to backup
# ============================================================================

log "Identifying Docker volumes..."

# Get all volume names
VOLUMES=$(docker volume ls -q 2>/dev/null || echo "")

if [[ -z "$VOLUMES" ]]; then
    log "WARNING: No Docker volumes found"
else
    log "Found volumes: $VOLUMES"
fi

# ============================================================================
# Step 2: Backup Docker volumes
# ============================================================================

BACKUP_DIR="$BACKUP_ROOT/daily/backup_$TIMESTAMP"
mkdir -p "$BACKUP_DIR/volumes"
mkdir -p "$BACKUP_DIR/apps"

log "Backing up Docker volumes to $BACKUP_DIR/volumes/"

for volume in $VOLUMES; do
    log "  Backing up volume: $volume"

    # Create tar archive of volume
    docker run --rm \
        -v "$volume:/source:ro" \
        -v "$BACKUP_DIR/volumes:/backup" \
        alpine:latest \
        tar -czf "/backup/${volume}_${TIMESTAMP}.tar.gz" -C /source . \
        2>/dev/null || log "    WARNING: Failed to backup $volume"
done

# ============================================================================
# Step 3: Backup application data directories
# ============================================================================

if [[ -d "$APPS_DIR" ]]; then
    log "Backing up application data from $APPS_DIR/"

    for app_dir in "$APPS_DIR"/*/; do
        if [[ -d "$app_dir" ]]; then
            app_name=$(basename "$app_dir")
            log "  Backing up app: $app_name"

            tar -czf "$BACKUP_DIR/apps/${app_name}_${TIMESTAMP}.tar.gz" \
                -C "$APPS_DIR" "$app_name" \
                2>/dev/null || log "    WARNING: Failed to backup $app_name"
        fi
    done
else
    log "WARNING: Apps directory not found: $APPS_DIR"
fi

# ============================================================================
# Step 4: Backup Docker Compose files
# ============================================================================

log "Backing up Docker Compose configurations..."

# Find all docker-compose files
find /home -name "docker-compose*.yml" -o -name "docker-compose*.yaml" 2>/dev/null | while read -r compose_file; do
    if [[ -f "$compose_file" ]]; then
        relative_path=$(echo "$compose_file" | sed 's|/|_|g')
        cp "$compose_file" "$BACKUP_DIR/apps/compose_${relative_path}" 2>/dev/null || true
        log "  Backed up: $compose_file"
    fi
done

# ============================================================================
# Step 5: Create backup manifest
# ============================================================================

log "Creating backup manifest..."

cat > "$BACKUP_DIR/manifest.json" << EOF
{
    "timestamp": "$TIMESTAMP",
    "date": "$DATE",
    "type": "$BACKUP_TYPE",
    "hostname": "$(hostname)",
    "docker_version": "$(docker --version 2>/dev/null | head -1)",
    "volumes_backed_up": [
$(docker volume ls -q 2>/dev/null | while read v; do echo "        \"$v\","; done | sed '$ s/,$//')
    ],
    "apps_backed_up": [
$(ls "$APPS_DIR" 2>/dev/null | while read a; do echo "        \"$a\","; done | sed '$ s/,$//')
    ],
    "backup_size": "$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1)"
}
EOF

# ============================================================================
# Step 6: Calculate checksums
# ============================================================================

log "Calculating checksums..."

find "$BACKUP_DIR" -type f \( -name "*.tar.gz" -o -name "*.json" \) -exec sha256sum {} \; > "$BACKUP_DIR/checksums.sha256"

# ============================================================================
# Step 7: Cleanup old backups
# ============================================================================

log "Cleaning up backups older than $RETENTION_DAYS days..."

find "$BACKUP_ROOT/daily" -maxdepth 1 -type d -name "backup_*" -mtime +$RETENTION_DAYS -exec rm -rf {} \; 2>/dev/null || true

# Count remaining backups
BACKUP_COUNT=$(find "$BACKUP_ROOT/daily" -maxdepth 1 -type d -name "backup_*" 2>/dev/null | wc -l)
log "Remaining backups: $BACKUP_COUNT"

# ============================================================================
# Step 8: Summary
# ============================================================================

BACKUP_SIZE=$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1)
TOTAL_SIZE=$(du -sh "$BACKUP_ROOT" 2>/dev/null | cut -f1)

log "=========================================="
log "Backup completed successfully!"
log "=========================================="
log "Backup location: $BACKUP_DIR"
log "Backup size: $BACKUP_SIZE"
log "Total backup storage: $TOTAL_SIZE"
log "Backups retained: $BACKUP_COUNT"
log "=========================================="

# Exit success
exit 0
