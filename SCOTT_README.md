# VarnaAI Setup Guide for Scott

## Prerequisites

1. **Install Docker Desktop**
   - Download: https://docker.com/products/docker-desktop
   - Install and restart your computer
   - Open Docker Desktop and wait until it says "Docker is running"

2. **Clone the repo**
   ```
   git clone https://github.com/Marvelious/Scott-VarnaAI.git
   cd Scott-VarnaAI
   ```

## One-Click Setup

### Start Apps
Double-click: **SCOTT_SETUP.bat**

Choose which app to run:
- **LibreChat** - AI Chat (like ChatGPT but self-hosted)
- **RetirementAI** - Pension planning with AI
- **FwChange** - Firewall change management
- **C3 Dashboard** - Compliance tracking
- **ProjectManager** - AI task generation

### Stop Apps
Double-click: **SCOTT_STOP.bat**

## App URLs

| App | URL | Port |
|-----|-----|------|
| LibreChat | http://localhost:3080 | 3080 |
| RetirementAI | http://localhost:3001 | 3001 |
| C3 Dashboard | http://localhost:3002 | 3002 |
| FwChange | http://localhost:3003 | 3003 |
| ProjectManager | http://localhost:3000 | 3000 |

## Troubleshooting

### "Docker not running"
→ Open Docker Desktop and wait for green icon

### "Port already in use"
→ Run SCOTT_STOP.bat first, then try again

### App not loading
→ Wait 2 minutes for containers to start
→ Check Docker Desktop for container status

## Syncing Updates

To get latest updates from Gennadius:
```
git pull origin master
```

To push your changes:
```
git add -A
git commit -m "Scott: description of changes"
git push origin master
```

## Need Help?

Contact Gennadius or create an issue in the repo.
