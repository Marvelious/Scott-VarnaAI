# Task ID: 9

**Title:** Hetzner VPS Infrastructure Preparation

**Status:** done

**Dependencies:** None

**Priority:** high

**Description:** Set up Hetzner CX32 VPS with Docker, Docker Compose, and firewall configuration

**Details:**

1. Order Hetzner CX32 VPS in Falkenstein datacenter
2. Install Ubuntu 22.04 LTS
3. Configure UFW firewall
4. Install Docker and Docker Compose
5. Set up system updates and security hardening
6. Create deploy user with sudo access
Pseudo-code:
```bash
# System preparation
apt update && apt upgrade -y
ufw default deny incoming
ufw allow ssh
ufw allow http
ufw allow https
ufw enable

# Docker installation
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker deploy_user
```

**Test Strategy:**

1. Verify Docker installation with 'docker run hello-world'
2. Check UFW status and allowed ports
3. Confirm system updates are applied
4. Test sudo access for deploy user
5. Verify internet connectivity

## Subtasks

### 9.1. Order and Initialize Hetzner CX32 VPS

**Status:** pending  
**Dependencies:** None  

Procure Hetzner CX32 VPS in Falkenstein datacenter and complete initial Ubuntu 22.04 LTS installation

**Details:**

1. Navigate to Hetzner Cloud Console
2. Create new CX32 VPS in Falkenstein datacenter
3. Select Ubuntu 22.04 LTS as base image
4. Generate and securely store SSH key
5. Note down initial root credentials
6. Perform first login and verify system accessibility

### 9.2. Docker and Docker Compose Installation

**Status:** pending  
**Dependencies:** 9.1  

Install Docker Engine and Docker Compose on Ubuntu VPS

**Details:**

1. Update system packages: apt update && apt upgrade -y
2. Install prerequisites: apt-install ca-certificates curl gnupg lsb-release
3. Add Docker's official GPG key
4. Set up Docker repository
5. Install Docker Engine
6. Install Docker Compose plugin
7. Verify installations with version checks

### 9.3. Configure UFW Firewall

**Status:** pending  
**Dependencies:** 9.1  

Set up Uncomplicated Firewall (UFW) with secure default configuration

**Details:**

1. Install UFW: apt install ufw
2. Set default policies: 
   - Deny all incoming traffic
   - Allow all outgoing traffic
3. Enable specific port access:
   - Allow SSH (port 22)
   - Allow HTTP (port 80)
   - Allow HTTPS (port 443)
4. Enable UFW
5. Verify firewall rules

### 9.4. Create Deploy User with SSH Key

**Status:** pending  
**Dependencies:** 9.1  

Create non-root deploy user with sudo access and SSH key authentication

**Details:**

1. Create new user 'deploy_user'
2. Add user to sudo group
3. Configure SSH key authentication
4. Disable root SSH login
5. Configure SSH daemon settings
6. Set secure permissions on .ssh directory
7. Test user sudo and SSH access

### 9.5. System Hardening and Updates

**Status:** pending  
**Dependencies:** 9.1, 9.2, 9.3, 9.4  

Apply system updates, configure automatic security updates, and implement basic system hardening

**Details:**

1. Enable automatic security updates
2. Install and configure fail2ban
3. Remove unnecessary packages
4. Disable unused services
5. Configure system log rotation
6. Set up automatic system updates via unattended-upgrades
7. Verify and log update process
