# Task ID: 18

**Title:** Monitoring and Backup Setup

**Status:** done

**Dependencies:** 13 ✓, 16 ✓, 17 ✓

**Priority:** low

**Description:** Configure monitoring and backup solutions for VarnaAI portfolio applications

**Details:**

Set up comprehensive monitoring and backup infrastructure for VarnaAI portfolio applications deployed on Hetzner VPS (78.47.125.174).

1. UptimeRobot Monitoring Setup:
   - Configure free tier monitoring for all 5 portfolio apps:
     * fwchange.varnaai.com
     * retirementai.varnaai.com
     * c3.varnaai.com
     * seoagent.varnaai.com
     * intelligence.varnaai.com
   - Set up alerts for downtime detection
   - Configure notification channels

2. Docker Volume Backup Strategy:
   - Identify critical Docker volumes on VPS
   - Create automated rsync backup script
   - Schedule daily backups
   - Verify backup storage location and retention

3. Backup Script Implementation:
   ```bash
   #!/bin/bash
   # Portfolio apps backup script
   BACKUP_DIR="/backups/docker-volumes"
   TIMESTAMP=$(date +%Y%m%d_%H%M%S)
   
   # Backup Docker volumes
   rsync -av --delete /var/lib/docker/volumes/ $BACKUP_DIR/volumes_$TIMESTAMP/
   
   # Backup application data directories
   rsync -av /home/apps/ $BACKUP_DIR/apps_$TIMESTAMP/
   
   # Log backup status
   echo "Backup completed: $TIMESTAMP" >> $BACKUP_DIR/backup.log
   ```

4. Restoration Testing:
   - Document restoration procedures
   - Test restore from backup
   - Verify data integrity after restore

Dependencies: Task 13 (C3 Static Build completion), Task 16 (DNS configuration), Task 17 (Performance optimization)

**Test Strategy:**

1. Uptime Monitoring Verification:
   - Confirm UptimeRobot dashboard shows all 5 apps with green status
   - Verify alert notifications are received on configured channels
   - Test alert triggering by temporarily stopping an app

2. Backup Script Testing:
   - Execute backup script and verify completion
   - Confirm backup directory structure and file sizes
   - Check backup logs for errors or warnings

3. Restoration Testing:
   - Create test environment with sample data
   - Perform full volume restoration from backup
   - Verify all application data restored correctly
   - Validate app functionality post-restore

4. Monitoring Dashboard Verification:
   - Review UptimeRobot dashboard for uptime statistics
   - Confirm historical data collection and reporting
   - Validate performance metrics tracking
