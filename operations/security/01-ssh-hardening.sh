#!/bin/bash
# ABOUTME: SSH configuration hardening script for VarnaAI VPS
# ABOUTME: Implements CIS benchmark recommendations for SSH security

set -euo pipefail

# ============================================================================
# SSH Hardening Script for Hetzner VPS (78.47.125.174)
# ============================================================================
#
# This script hardens SSH configuration based on CIS benchmarks.
# Run as root after ensuring you have key-based SSH access set up.
#
# PREREQUISITES:
# 1. SSH key already added to ~/.ssh/authorized_keys
# 2. Test SSH key login BEFORE running this script
# 3. Have console access as backup (Hetzner Cloud Console)
#
# Usage: ./01-ssh-hardening.sh
#
# ============================================================================

LOG_FILE="/var/log/ssh-hardening.log"
SSHD_CONFIG="/etc/ssh/sshd_config"
BACKUP_DIR="/etc/ssh/backup_$(date +%Y%m%d_%H%M%S)"

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
log "Starting SSH Hardening"
log "=========================================="

# ============================================================================
# Step 1: Backup current configuration
# ============================================================================

log "Creating backup of SSH configuration..."
mkdir -p "$BACKUP_DIR"
cp -a /etc/ssh/* "$BACKUP_DIR/"
log "Backup created at $BACKUP_DIR"

# ============================================================================
# Step 2: Verify SSH key access works
# ============================================================================

log "Checking for authorized_keys..."
if [[ ! -f /root/.ssh/authorized_keys ]] || [[ ! -s /root/.ssh/authorized_keys ]]; then
    log "ERROR: No authorized_keys found! Add your SSH key first."
    log "Run: ssh-copy-id root@78.47.125.174"
    exit 1
fi

KEY_COUNT=$(wc -l < /root/.ssh/authorized_keys)
log "Found $KEY_COUNT SSH key(s) in authorized_keys"

# ============================================================================
# Step 3: Create hardened sshd_config
# ============================================================================

log "Creating hardened SSH configuration..."

cat > "$SSHD_CONFIG" << 'EOF'
# ABOUTME: Hardened SSH configuration for VarnaAI VPS
# ABOUTME: Based on CIS Benchmark and security best practices

# Network settings
Port 22
AddressFamily inet
ListenAddress 0.0.0.0

# Protocol settings
Protocol 2

# Authentication settings
LoginGraceTime 60
PermitRootLogin prohibit-password
StrictModes yes
MaxAuthTries 3
MaxSessions 4

# Key-based authentication ONLY
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication no
PermitEmptyPasswords no
ChallengeResponseAuthentication no

# PAM settings
UsePAM yes

# Disable unused authentication methods
HostbasedAuthentication no
IgnoreRhosts yes
KerberosAuthentication no
GSSAPIAuthentication no

# X11 and TCP forwarding
X11Forwarding no
AllowTcpForwarding no
AllowAgentForwarding no
PermitTunnel no

# Banner and logging
PrintMotd no
PrintLastLog yes
Banner /etc/ssh/banner

# Connection settings
TCPKeepAlive yes
ClientAliveInterval 300
ClientAliveCountMax 2

# Cryptography settings (strong ciphers only)
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-sha2-512,hmac-sha2-256
KexAlgorithms curve25519-sha256@libssh.org,ecdh-sha2-nistp521,ecdh-sha2-nistp384,ecdh-sha2-nistp256,diffie-hellman-group-exchange-sha256

# Subsystems
Subsystem sftp /usr/lib/openssh/sftp-server

# Deny by default, allow specific users
# AllowUsers admin deploy
# DenyUsers *

# Log level for audit
LogLevel VERBOSE
EOF

# ============================================================================
# Step 4: Create SSH banner
# ============================================================================

log "Creating SSH banner..."

cat > /etc/ssh/banner << 'EOF'
***************************************************************************
*                      AUTHORIZED ACCESS ONLY                              *
*                                                                          *
*  This system is the property of VarnaAI. Unauthorized access is          *
*  strictly prohibited. All connections are monitored and recorded.        *
*                                                                          *
*  By proceeding, you consent to monitoring and agree that any             *
*  unauthorized use may result in legal action.                            *
*                                                                          *
***************************************************************************
EOF

# ============================================================================
# Step 5: Set correct permissions
# ============================================================================

log "Setting correct permissions..."

chmod 600 /etc/ssh/sshd_config
chmod 644 /etc/ssh/banner
chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys

# ============================================================================
# Step 6: Validate configuration
# ============================================================================

log "Validating SSH configuration..."

if sshd -t; then
    log "SSH configuration is valid"
else
    log "ERROR: SSH configuration invalid! Restoring backup..."
    cp "$BACKUP_DIR/sshd_config" "$SSHD_CONFIG"
    exit 1
fi

# ============================================================================
# Step 7: Restart SSH service
# ============================================================================

log "Restarting SSH service..."
log "WARNING: Ensure you have console access before this step!"

# Keep current SSH session alive while restarting
systemctl reload sshd || systemctl restart sshd

log "SSH service restarted"

# ============================================================================
# Summary
# ============================================================================

log "=========================================="
log "SSH Hardening Complete!"
log "=========================================="
log "Changes applied:"
log "  - Password authentication disabled"
log "  - Root login: key-based only"
log "  - Strong ciphers configured"
log "  - Banner message added"
log "  - Max auth tries: 3"
log "  - Client timeout: 10 minutes"
log ""
log "Backup location: $BACKUP_DIR"
log ""
log "TEST YOUR SSH CONNECTION NOW from a new terminal!"
log "If locked out, use Hetzner Console to restore from backup."
log "=========================================="

exit 0
