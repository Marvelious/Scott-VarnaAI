#!/bin/bash
# ABOUTME: Automatic security updates configuration for VarnaAI VPS
# ABOUTME: Sets up unattended-upgrades for automatic security patching

set -euo pipefail

# ============================================================================
# Automatic Security Updates for Hetzner VPS (78.47.125.174)
# ============================================================================
#
# This script configures unattended-upgrades for automatic security updates.
#
# Features:
# - Automatic security updates daily
# - Email notifications on updates
# - Auto-reboot at 3 AM if required
# - Keeps logs of all updates
#
# Usage: ./04-auto-updates.sh
#
# ============================================================================

LOG_FILE="/var/log/auto-updates-setup.log"

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
log "Starting Automatic Updates Configuration"
log "=========================================="

# ============================================================================
# Step 1: Install unattended-upgrades
# ============================================================================

log "Installing unattended-upgrades..."
apt-get update -qq
apt-get install -y unattended-upgrades apt-listchanges

# ============================================================================
# Step 2: Configure unattended-upgrades
# ============================================================================

log "Configuring unattended-upgrades..."

cat > /etc/apt/apt.conf.d/50unattended-upgrades << 'EOF'
// ABOUTME: Unattended upgrades configuration for VarnaAI VPS
// ABOUTME: Enables automatic security updates with controlled reboots

// Automatically upgrade packages from these origins
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}";
    "${distro_id}:${distro_codename}-security";
    "${distro_id}ESMApps:${distro_codename}-apps-security";
    "${distro_id}ESM:${distro_codename}-infra-security";
};

// Packages to NOT automatically upgrade (keep empty for security updates)
Unattended-Upgrade::Package-Blacklist {
    // "docker*";
    // "containerd*";
};

// Enable automatic removal of unused dependencies
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
Unattended-Upgrade::Remove-New-Unused-Dependencies "true";

// Automatically reboot if required
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-WithUsers "true";
Unattended-Upgrade::Automatic-Reboot-Time "03:00";

// Email notifications (configure your email)
// Unattended-Upgrade::Mail "admin@varnaai.com";
// Unattended-Upgrade::MailReport "on-change";

// Log to syslog
Unattended-Upgrade::SyslogEnable "true";
Unattended-Upgrade::SyslogFacility "daemon";

// Verbose logging
Unattended-Upgrade::Verbose "true";

// Only on AC power (doesn't apply to VPS)
Unattended-Upgrade::OnlyOnACPower "false";

// Skip updates that require user input
Unattended-Upgrade::Skip-Updates-On-Metered-Connections "false";
EOF

# ============================================================================
# Step 3: Configure auto-upgrades schedule
# ============================================================================

log "Configuring auto-upgrades schedule..."

cat > /etc/apt/apt.conf.d/20auto-upgrades << 'EOF'
// Enable automatic updates
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
EOF

# ============================================================================
# Step 4: Enable and test
# ============================================================================

log "Enabling unattended-upgrades service..."
systemctl enable unattended-upgrades
systemctl restart unattended-upgrades

# ============================================================================
# Step 5: Run a dry-run test
# ============================================================================

log "Running dry-run test..."
unattended-upgrades --dry-run --debug 2>&1 | head -50 | tee -a "$LOG_FILE"

# ============================================================================
# Summary
# ============================================================================

log "=========================================="
log "Automatic Updates Configuration Complete!"
log "=========================================="
log "Configuration:"
log "  - Security updates: Daily"
log "  - Auto-reboot: 3:00 AM if required"
log "  - Unused deps: Automatically removed"
log "  - Logging: Enabled"
log ""
log "Logs location:"
log "  - /var/log/unattended-upgrades/"
log ""
log "Commands:"
log "  unattended-upgrades --dry-run"
log "  cat /var/log/unattended-upgrades/unattended-upgrades.log"
log "=========================================="

exit 0
