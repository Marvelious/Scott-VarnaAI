#!/bin/bash
# ABOUTME: Fail2ban installation and configuration script for VarnaAI VPS
# ABOUTME: Protects SSH, Traefik, and Docker services from brute force attacks

set -euo pipefail

# ============================================================================
# Fail2ban Configuration for Hetzner VPS (78.47.125.174)
# ============================================================================
#
# This script installs and configures Fail2ban to protect against brute force.
#
# Services protected:
# - SSH (3 retries, 1 hour ban)
# - Traefik (rate limiting attacks)
#
# Usage: ./03-fail2ban.sh
#
# ============================================================================

LOG_FILE="/var/log/fail2ban-setup.log"

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
log "Starting Fail2ban Configuration"
log "=========================================="

# ============================================================================
# Step 1: Install Fail2ban
# ============================================================================

log "Installing Fail2ban..."
apt-get update -qq
apt-get install -y fail2ban

log "Fail2ban version: $(fail2ban-client --version | head -1)"

# ============================================================================
# Step 2: Create local jail configuration
# ============================================================================

log "Creating Fail2ban jail configuration..."

cat > /etc/fail2ban/jail.local << 'EOF'
# ABOUTME: Fail2ban jail configuration for VarnaAI VPS
# ABOUTME: Custom rules for SSH and web services protection

[DEFAULT]
# Ban hosts for 1 hour
bantime = 3600

# Consider 10 minute window for failures
findtime = 600

# Allow 3 retries before ban
maxretry = 3

# Ban action - use UFW
banaction = ufw

# Notification settings (configure email if desired)
# destemail = admin@varnaai.com
# sender = fail2ban@varnaai.com
# mta = sendmail
# action = %(action_mwl)s

# Ignore localhost
ignoreip = 127.0.0.1/8 ::1

# ============================================================================
# SSH Jail
# ============================================================================
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
findtime = 300
bantime = 3600

# Aggressive settings for persistent attackers
[sshd-aggressive]
enabled = true
port = ssh
filter = sshd[mode=aggressive]
logpath = /var/log/auth.log
maxretry = 2
findtime = 86400
bantime = 604800

# ============================================================================
# Recidive Jail (ban repeat offenders longer)
# ============================================================================
[recidive]
enabled = true
filter = recidive
logpath = /var/log/fail2ban.log
bantime = 604800
findtime = 86400
maxretry = 3

# ============================================================================
# Nginx/Traefik Jail (HTTP-based attacks)
# ============================================================================
[nginx-http-auth]
enabled = false
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 3

# Bad bots and scanners
[nginx-botsearch]
enabled = false
filter = nginx-botsearch
logpath = /var/log/nginx/access.log
maxretry = 2
findtime = 300
bantime = 86400

# ============================================================================
# Docker Traefik specific (if using Traefik access logs)
# ============================================================================
[traefik-auth]
enabled = false
filter = traefik-auth
logpath = /var/log/traefik/access.log
maxretry = 5
findtime = 300
bantime = 3600
EOF

# ============================================================================
# Step 3: Create Traefik filter (optional)
# ============================================================================

log "Creating Traefik filter..."

cat > /etc/fail2ban/filter.d/traefik-auth.conf << 'EOF'
# ABOUTME: Fail2ban filter for Traefik authentication failures
# ABOUTME: Detects 401/403 errors indicating auth failures

[Definition]
failregex = ^.* - - \[.*\] ".*" (401|403) .* ".*" ".*" \d+ ".*" ".*" \d+ms$
            ^<HOST> - - \[.*\] ".*" (401|403) .*$
ignoreregex =
EOF

# ============================================================================
# Step 4: Enable and start Fail2ban
# ============================================================================

log "Enabling and starting Fail2ban..."
systemctl enable fail2ban
systemctl restart fail2ban

# Wait for service to start
sleep 3

# ============================================================================
# Step 5: Verify configuration
# ============================================================================

log "Verifying Fail2ban status..."
fail2ban-client status | tee -a "$LOG_FILE"

log ""
log "SSH jail status:"
fail2ban-client status sshd | tee -a "$LOG_FILE"

# ============================================================================
# Summary
# ============================================================================

log "=========================================="
log "Fail2ban Configuration Complete!"
log "=========================================="
log "Jails enabled:"
log "  - sshd: 3 retries, 1 hour ban"
log "  - sshd-aggressive: 2 retries, 1 week ban"
log "  - recidive: Repeat offenders, 1 week ban"
log ""
log "Commands:"
log "  fail2ban-client status"
log "  fail2ban-client status sshd"
log "  fail2ban-client set sshd unbanip <IP>"
log "=========================================="

exit 0
