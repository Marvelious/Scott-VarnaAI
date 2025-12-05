#!/bin/bash
# ABOUTME: Master security hardening script for VarnaAI VPS
# ABOUTME: Runs all security hardening scripts in sequence with confirmations

set -euo pipefail

# ============================================================================
# VarnaAI VPS Security Hardening - Master Script
# ============================================================================
#
# This script runs all security hardening steps in sequence.
#
# Usage:
#   ./harden-vps.sh          # Interactive mode with confirmations
#   ./harden-vps.sh --auto   # Automatic mode (no confirmations)
#
# IMPORTANT: Ensure you have console access before running!
#
# ============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="/var/log/vps-hardening.log"
AUTO_MODE="${1:-}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Confirmation function
confirm() {
    if [[ "$AUTO_MODE" == "--auto" ]]; then
        return 0
    fi

    echo -e "${YELLOW}$1${NC}"
    read -p "Continue? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        return 1
    fi
    return 0
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
    echo -e "${RED}ERROR: This script must be run as root${NC}"
    exit 1
fi

echo ""
echo "========================================"
echo "  VarnaAI VPS Security Hardening"
echo "========================================"
echo ""
echo -e "${RED}WARNING: This will make significant changes to your system!${NC}"
echo ""
echo "Before proceeding, ensure you have:"
echo "  1. SSH key already set up and tested"
echo "  2. Hetzner Console access as backup"
echo "  3. A backup of current configuration"
echo ""

if ! confirm "Do you want to proceed with security hardening?"; then
    echo "Aborted."
    exit 0
fi

log "=========================================="
log "Starting VarnaAI VPS Security Hardening"
log "=========================================="

# ============================================================================
# Step 1: SSH Hardening
# ============================================================================

echo ""
echo -e "${GREEN}Step 1/5: SSH Hardening${NC}"
echo "This will disable password authentication and harden SSH."
echo ""

if confirm "Run SSH hardening?"; then
    log "Running SSH hardening..."
    if bash "$SCRIPT_DIR/01-ssh-hardening.sh"; then
        log "SSH hardening completed successfully"
    else
        log "SSH hardening failed!"
        exit 1
    fi
else
    log "Skipped SSH hardening"
fi

# ============================================================================
# Step 2: UFW Firewall
# ============================================================================

echo ""
echo -e "${GREEN}Step 2/5: UFW Firewall Configuration${NC}"
echo "This will configure firewall to allow only SSH, HTTP, HTTPS."
echo ""

if confirm "Configure UFW firewall?"; then
    log "Configuring UFW firewall..."
    if bash "$SCRIPT_DIR/02-ufw-firewall.sh"; then
        log "UFW firewall configured successfully"
    else
        log "UFW firewall configuration failed!"
        exit 1
    fi
else
    log "Skipped UFW firewall configuration"
fi

# ============================================================================
# Step 3: Fail2ban
# ============================================================================

echo ""
echo -e "${GREEN}Step 3/5: Fail2ban Installation${NC}"
echo "This will install and configure Fail2ban for brute force protection."
echo ""

if confirm "Install and configure Fail2ban?"; then
    log "Installing Fail2ban..."
    if bash "$SCRIPT_DIR/03-fail2ban.sh"; then
        log "Fail2ban installed successfully"
    else
        log "Fail2ban installation failed!"
        exit 1
    fi
else
    log "Skipped Fail2ban installation"
fi

# ============================================================================
# Step 4: Automatic Updates
# ============================================================================

echo ""
echo -e "${GREEN}Step 4/5: Automatic Security Updates${NC}"
echo "This will configure unattended-upgrades for automatic patching."
echo ""

if confirm "Configure automatic security updates?"; then
    log "Configuring automatic updates..."
    if bash "$SCRIPT_DIR/04-auto-updates.sh"; then
        log "Automatic updates configured successfully"
    else
        log "Automatic updates configuration failed!"
        exit 1
    fi
else
    log "Skipped automatic updates configuration"
fi

# ============================================================================
# Step 5: Security Audit
# ============================================================================

echo ""
echo -e "${GREEN}Step 5/5: Security Audit${NC}"
echo "This will run a comprehensive security audit."
echo ""

if confirm "Run security audit?"; then
    log "Running security audit..."
    if bash "$SCRIPT_DIR/05-security-audit.sh"; then
        log "Security audit completed successfully"
    else
        log "Security audit failed!"
        exit 1
    fi
else
    log "Skipped security audit"
fi

# ============================================================================
# Summary
# ============================================================================

echo ""
echo "========================================"
echo -e "${GREEN}  Security Hardening Complete!${NC}"
echo "========================================"
echo ""
log "VPS security hardening completed"
log ""
log "Summary:"
log "  - SSH: Hardened (key-only authentication)"
log "  - Firewall: UFW configured (22, 80, 443 only)"
log "  - Fail2ban: Installed and active"
log "  - Auto-updates: Configured"
log "  - Audit: Report generated"
log ""
log "IMPORTANT: Test SSH access from a new terminal NOW!"
log "If locked out, use Hetzner Console to access."
log ""
log "Reports location: /var/log/security-audit/"
log "========================================"

exit 0
