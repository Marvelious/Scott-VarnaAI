# ABOUTME: Security hardening documentation for VarnaAI VPS
# ABOUTME: Overview of security scripts and implementation procedures

# VarnaAI VPS Security Hardening

## Overview

Comprehensive security hardening for VarnaAI portfolio applications on Hetzner VPS (78.47.125.174).

## Quick Start

```bash
# Copy scripts to VPS
scp -r operations/security/* root@78.47.125.174:/root/security/

# SSH to VPS
ssh root@78.47.125.174

# Make executable
chmod +x /root/security/*.sh

# Run master hardening script
cd /root/security
./harden-vps.sh
```

## Scripts

| Script | Purpose |
|--------|---------|
| `harden-vps.sh` | Master script - runs all in sequence |
| `01-ssh-hardening.sh` | SSH configuration hardening |
| `02-ufw-firewall.sh` | UFW firewall setup |
| `03-fail2ban.sh` | Brute force protection |
| `04-auto-updates.sh` | Automatic security patches |
| `05-security-audit.sh` | Comprehensive security audit |

## Prerequisites

Before running security hardening:

1. **SSH Key Setup**: Ensure your SSH key is in `/root/.ssh/authorized_keys`
   ```bash
   ssh-copy-id root@78.47.125.174
   ```

2. **Test Key Login**: Verify key-based SSH works
   ```bash
   ssh root@78.47.125.174
   ```

3. **Console Access**: Have Hetzner Cloud Console ready as backup
   - Login: https://console.hetzner.cloud/
   - Navigate to server → Console (VNC)

## Security Measures Implemented

### 1. SSH Hardening
- Password authentication disabled
- Root login: key-based only
- Strong ciphers and MACs
- Connection timeout: 10 minutes
- Max auth tries: 3
- Banner message

### 2. UFW Firewall
- Default: DENY incoming
- SSH (22): LIMIT (rate limited)
- HTTP (80): ALLOW
- HTTPS (443): ALLOW
- Logging: Enabled

### 3. Fail2ban
- SSH jail: 3 retries, 1 hour ban
- Aggressive jail: 2 retries, 1 week ban
- Recidive: Repeat offenders, 1 week ban

### 4. Automatic Updates
- Security updates: Daily
- Auto-reboot: 3:00 AM if required
- Unused dependencies: Auto-removed

## Post-Hardening Verification

```bash
# Test SSH access (from new terminal!)
ssh root@78.47.125.174

# Check UFW status
ufw status verbose

# Check Fail2ban status
fail2ban-client status
fail2ban-client status sshd

# Check auto-updates
cat /var/log/unattended-upgrades/unattended-upgrades.log

# View audit report
cat /var/log/security-audit/security_summary_*.md
```

## Emergency Recovery

If locked out of SSH:

1. Go to Hetzner Cloud Console
2. Click on your server
3. Click "Console" (VNC access)
4. Login with root password
5. Restore SSH config:
   ```bash
   cp /etc/ssh/backup_*/sshd_config /etc/ssh/sshd_config
   systemctl restart sshd
   ```

## Maintenance

### Weekly Checks
```bash
# Check fail2ban banned IPs
fail2ban-client status sshd

# Review auth log
tail -100 /var/log/auth.log | grep -E "(Failed|Accepted)"

# Check updates log
cat /var/log/unattended-upgrades/unattended-upgrades.log
```

### Monthly Audit
```bash
# Re-run security audit
./05-security-audit.sh

# Review Lynis report
cat /var/log/security-audit/lynis_report_*.txt | grep -E "(Warning|Suggestion)"
```

## CIS Benchmark Compliance

These scripts implement recommendations from:
- CIS Ubuntu Linux Benchmark
- CIS Docker Benchmark
- NIST SP 800-123

## Related Documentation

- [Backup System](../backup/README.md)
- [Monitoring Setup](../monitoring/UPTIMEROBOT_CONFIG.md)
