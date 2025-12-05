#!/bin/bash
# ABOUTME: UFW firewall configuration script for VarnaAI VPS
# ABOUTME: Implements default-deny policy with only essential ports open

set -euo pipefail

# ============================================================================
# UFW Firewall Configuration for Hetzner VPS (78.47.125.174)
# ============================================================================
#
# This script configures UFW firewall with secure defaults.
#
# Allowed ports:
# - 22 (SSH)
# - 80 (HTTP)
# - 443 (HTTPS)
#
# Usage: ./02-ufw-firewall.sh
#
# ============================================================================

LOG_FILE="/var/log/ufw-setup.log"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
    echo "ERROR: This script must be run as root"
    exit 1
fi

log "=========================================="
log "Starting UFW Firewall Configuration"
log "=========================================="

# ============================================================================
# Step 1: Install UFW if not present
# ============================================================================

if ! command -v ufw &> /dev/null; then
    log "Installing UFW..."
    apt-get update -qq
    apt-get install -y ufw
fi

log "UFW version: $(ufw version | head -1)"

# ============================================================================
# Step 2: Reset to defaults (careful!)
# ============================================================================

log "Resetting UFW to defaults..."
ufw --force reset

# ============================================================================
# Step 3: Set default policies
# ============================================================================

log "Setting default policies (deny incoming, allow outgoing)..."
ufw default deny incoming
ufw default allow outgoing
ufw default deny routed

# ============================================================================
# Step 4: Allow essential services
# ============================================================================

log "Allowing SSH (port 22)..."
ufw allow ssh
ufw limit ssh comment 'Rate limit SSH connections'

log "Allowing HTTP (port 80)..."
ufw allow http comment 'Web traffic HTTP'

log "Allowing HTTPS (port 443)..."
ufw allow https comment 'Web traffic HTTPS'

# ============================================================================
# Step 5: Docker network considerations
# ============================================================================

# Docker manages its own iptables rules, but we ensure Traefik ports work
log "Configuring Docker-related rules..."

# Allow traffic to Docker container ports via Traefik
# Traefik handles 80/443 externally, routes internally to containers

# ============================================================================
# Step 6: Optional - Allow monitoring services
# ============================================================================

# Uncomment if using external monitoring that needs access
# log "Allowing monitoring services..."
# ufw allow from 54.190.96.0/19 to any port 80 comment 'UptimeRobot'

# ============================================================================
# Step 7: Enable logging
# ============================================================================

log "Enabling UFW logging..."
ufw logging medium

# ============================================================================
# Step 8: Enable UFW
# ============================================================================

log "Enabling UFW firewall..."
echo "y" | ufw enable

# ============================================================================
# Step 9: Show status
# ============================================================================

log "Current UFW status:"
ufw status verbose | tee -a "$LOG_FILE"

# ============================================================================
# Summary
# ============================================================================

log "=========================================="
log "UFW Firewall Configuration Complete!"
log "=========================================="
log "Rules configured:"
log "  - Default: DENY incoming"
log "  - Default: ALLOW outgoing"
log "  - SSH (22): LIMIT (rate limited)"
log "  - HTTP (80): ALLOW"
log "  - HTTPS (443): ALLOW"
log ""
log "Firewall is now ACTIVE"
log "=========================================="

exit 0
