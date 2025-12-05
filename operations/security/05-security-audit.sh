#!/bin/bash
# ABOUTME: Comprehensive security audit script for VarnaAI VPS
# ABOUTME: Runs Lynis audit and generates security report

set -euo pipefail

# ============================================================================
# Security Audit Script for Hetzner VPS (78.47.125.174)
# ============================================================================
#
# This script runs comprehensive security audits using:
# - Lynis (system hardening audit)
# - ssh-audit (SSH configuration check)
# - nmap (port scan verification)
#
# Usage: ./05-security-audit.sh
#
# Output: Security report in /var/log/security-audit/
#
# ============================================================================

LOG_FILE="/var/log/security-audit.log"
REPORT_DIR="/var/log/security-audit"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
    echo "ERROR: This script must be run as root"
    exit 1
fi

# Create report directory
mkdir -p "$REPORT_DIR"

log "=========================================="
log "Starting Security Audit"
log "=========================================="

# ============================================================================
# Step 1: Install audit tools
# ============================================================================

log "Installing audit tools..."
apt-get update -qq
apt-get install -y lynis nmap

# ============================================================================
# Step 2: Run Lynis system audit
# ============================================================================

log "Running Lynis security audit..."
log "This may take several minutes..."

LYNIS_REPORT="$REPORT_DIR/lynis_report_$TIMESTAMP.txt"

lynis audit system --no-colors --quiet 2>&1 | tee "$LYNIS_REPORT"

# Extract hardening index
HARDENING_INDEX=$(grep "Hardening index" "$LYNIS_REPORT" | head -1 || echo "Not found")
log "Lynis $HARDENING_INDEX"

# ============================================================================
# Step 3: SSH Configuration Audit
# ============================================================================

log "Running SSH configuration audit..."

SSH_REPORT="$REPORT_DIR/ssh_audit_$TIMESTAMP.txt"

# Basic SSH config analysis
cat > "$SSH_REPORT" << EOF
SSH Configuration Audit Report
Generated: $(date)
Host: $(hostname)

========================================
SSHD Configuration Analysis
========================================
EOF

# Check key SSH settings
echo "Current SSH Settings:" >> "$SSH_REPORT"
grep -E "^(Port|PermitRootLogin|PasswordAuthentication|PubkeyAuthentication|Protocol|X11Forwarding|AllowTcpForwarding)" /etc/ssh/sshd_config >> "$SSH_REPORT" 2>/dev/null || echo "Could not read sshd_config" >> "$SSH_REPORT"

echo "" >> "$SSH_REPORT"
echo "SSH Daemon Status:" >> "$SSH_REPORT"
systemctl status sshd --no-pager >> "$SSH_REPORT" 2>&1

log "SSH audit saved to $SSH_REPORT"

# ============================================================================
# Step 4: Port Scan (Local)
# ============================================================================

log "Running local port scan..."

NMAP_REPORT="$REPORT_DIR/nmap_scan_$TIMESTAMP.txt"

nmap -sT -O -p 1-65535 localhost > "$NMAP_REPORT" 2>&1 || nmap -sT -p 1-1024 localhost > "$NMAP_REPORT" 2>&1

log "Port scan saved to $NMAP_REPORT"

# ============================================================================
# Step 5: UFW Status Check
# ============================================================================

log "Checking firewall status..."

UFW_REPORT="$REPORT_DIR/ufw_status_$TIMESTAMP.txt"

echo "UFW Firewall Status" > "$UFW_REPORT"
echo "===================" >> "$UFW_REPORT"
echo "" >> "$UFW_REPORT"

if command -v ufw &> /dev/null; then
    ufw status verbose >> "$UFW_REPORT" 2>&1
else
    echo "UFW not installed" >> "$UFW_REPORT"
fi

log "UFW status saved to $UFW_REPORT"

# ============================================================================
# Step 6: Fail2ban Status Check
# ============================================================================

log "Checking Fail2ban status..."

F2B_REPORT="$REPORT_DIR/fail2ban_status_$TIMESTAMP.txt"

echo "Fail2ban Status" > "$F2B_REPORT"
echo "===============" >> "$F2B_REPORT"
echo "" >> "$F2B_REPORT"

if command -v fail2ban-client &> /dev/null; then
    fail2ban-client status >> "$F2B_REPORT" 2>&1
    echo "" >> "$F2B_REPORT"
    fail2ban-client status sshd >> "$F2B_REPORT" 2>&1
else
    echo "Fail2ban not installed" >> "$F2B_REPORT"
fi

log "Fail2ban status saved to $F2B_REPORT"

# ============================================================================
# Step 7: Docker Security Check
# ============================================================================

log "Checking Docker security..."

DOCKER_REPORT="$REPORT_DIR/docker_security_$TIMESTAMP.txt"

echo "Docker Security Status" > "$DOCKER_REPORT"
echo "=====================" >> "$DOCKER_REPORT"
echo "" >> "$DOCKER_REPORT"

if command -v docker &> /dev/null; then
    echo "Docker Version:" >> "$DOCKER_REPORT"
    docker version >> "$DOCKER_REPORT" 2>&1

    echo "" >> "$DOCKER_REPORT"
    echo "Running Containers:" >> "$DOCKER_REPORT"
    docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}" >> "$DOCKER_REPORT" 2>&1

    echo "" >> "$DOCKER_REPORT"
    echo "Docker Networks:" >> "$DOCKER_REPORT"
    docker network ls >> "$DOCKER_REPORT" 2>&1

    echo "" >> "$DOCKER_REPORT"
    echo "Container Security Warnings:" >> "$DOCKER_REPORT"
    # Check for containers running as root
    docker ps -q | xargs docker inspect --format '{{.Name}}: User={{.Config.User}}' 2>/dev/null >> "$DOCKER_REPORT"
else
    echo "Docker not installed" >> "$DOCKER_REPORT"
fi

log "Docker security check saved to $DOCKER_REPORT"

# ============================================================================
# Step 8: Generate Summary Report
# ============================================================================

log "Generating summary report..."

SUMMARY_REPORT="$REPORT_DIR/security_summary_$TIMESTAMP.md"

cat > "$SUMMARY_REPORT" << EOF
# VarnaAI Security Audit Summary

**Date:** $(date)
**Host:** $(hostname)
**IP:** 78.47.125.174

## Quick Status

| Component | Status | Notes |
|-----------|--------|-------|
| SSH | $(grep -q "PasswordAuthentication no" /etc/ssh/sshd_config 2>/dev/null && echo "✅ Hardened" || echo "⚠️ Check config") | Key-only auth |
| UFW | $(ufw status 2>/dev/null | grep -q "Status: active" && echo "✅ Active" || echo "❌ Inactive") | Firewall |
| Fail2ban | $(systemctl is-active fail2ban 2>/dev/null || echo "inactive") | Brute force protection |
| Auto-updates | $(systemctl is-active unattended-upgrades 2>/dev/null || echo "inactive") | Security patches |
| Docker | $(docker ps -q 2>/dev/null | wc -l) containers | Running containers |

## Lynis Hardening Index

$HARDENING_INDEX

## Open Ports

$(grep "open" "$NMAP_REPORT" 2>/dev/null | head -10 || echo "See nmap report")

## Recommendations

1. Review Lynis report for warnings and suggestions
2. Ensure all containers are using non-root users where possible
3. Regularly review fail2ban banned IPs
4. Monitor /var/log/auth.log for suspicious activity
5. Keep system updated with unattended-upgrades

## Report Files

- Lynis: $LYNIS_REPORT
- SSH: $SSH_REPORT
- Nmap: $NMAP_REPORT
- UFW: $UFW_REPORT
- Fail2ban: $F2B_REPORT
- Docker: $DOCKER_REPORT

---
*Generated by VarnaAI Security Audit Script*
EOF

log "Summary report saved to $SUMMARY_REPORT"

# ============================================================================
# Summary
# ============================================================================

log "=========================================="
log "Security Audit Complete!"
log "=========================================="
log ""
log "Reports generated in: $REPORT_DIR"
log ""
log "Files created:"
log "  - security_summary_$TIMESTAMP.md (start here)"
log "  - lynis_report_$TIMESTAMP.txt"
log "  - ssh_audit_$TIMESTAMP.txt"
log "  - nmap_scan_$TIMESTAMP.txt"
log "  - ufw_status_$TIMESTAMP.txt"
log "  - fail2ban_status_$TIMESTAMP.txt"
log "  - docker_security_$TIMESTAMP.txt"
log ""
log "Review the summary report for action items."
log "=========================================="

exit 0
