# Backlink Automation Setup Guide

Complete setup instructions for VarnaAI Websites backlink automation system.

## Prerequisites

### Required Software
- **Node.js** 16+ (already installed)
- **PostgreSQL** 12+ (installed locally or accessible server)
- **Python** 3.8+ (for Excel import, already have Webscrap backend)

### Required API Keys

1. **Hunter.io** ($49/month)
   - Sign up at: https://hunter.io/users/sign_up
   - Get API key from: https://hunter.io/api_keys
   - Set env variable: `HUNTER_API_KEY=your_key_here`

2. **SendGrid** (FREE tier, 100 emails/day)
   - Sign up at: https://signup.sendgrid.com/
   - Create API key: Settings → API Keys → Create API Key
   - Set env variable: `SENDGRID_API_KEY=your_key_here`

3. **Anthropic Claude** (already configured)
   - Verify: `ANTHROPIC_API_KEY` is set

### Optional API Keys

4. **Moz API** (for accurate Domain Authority)
   - Sign up at: https://moz.com/products/api
   - Free tier: 2,500 rows/month
   - Set: `MOZ_ACCESS_ID` and `MOZ_SECRET_KEY`

5. **NeverBounce** ($10/month for email verification)
   - Sign up at: https://neverbounce.com/
   - Set: `NEVERBOUNCE_API_KEY`

## Installation Steps

### Step 1: Install Node.js Dependencies

```bash
cd D:\VarnaAI\Websites
npm install pg nodemailer axios cheerio
```

### Step 2: Create PostgreSQL Database

```bash
# Windows (using psql)
psql -U postgres

# Create database
CREATE DATABASE backlink_campaigns;

# Connect to database
\c backlink_campaigns

# Run schema creation script
\i D:/VarnaAI/Websites/seo/tools/setup-backlink-database.sql

# Verify tables created
\dt
```

**Expected output:**
```
                List of relations
 Schema |         Name          | Type  |  Owner
--------+-----------------------+-------+----------
 public | acquired_backlinks    | table | postgres
 public | campaign_stats        | table | postgres
 public | link_opportunities    | table | postgres
 public | outreach_campaigns    | table | postgres
 public | outreach_contacts     | table | postgres
```

### Step 3: Import Existing Backlinks

Create Python script to import VarnaAI Backlinks.xlsx data:

```python
# import-existing-backlinks.py
import openpyxl
import psycopg2

# Connect to PostgreSQL
conn = psycopg2.connect(
    host="localhost",
    database="backlink_campaigns",
    user="postgres",
    password="your_password"
)
cur = conn.cursor()

# Load Excel workbook
wb = openpyxl.load_workbook('C:/Users/nfals/My Drive/2025/DM/VarnaAI Backlinks.xlsx')
ws = wb['Backlinks 1']

# Import opportunities
for row in list(ws.rows)[1:]:  # Skip header
    domain = row[0].value  # Links column
    score = row[1].value   # Score column
    live_url = row[2].value  # Live Backlinks column

    if not domain:
        continue

    # Extract domain from URL
    domain_clean = domain.replace('https://', '').replace('http://', '').split('/')[0]

    # Insert opportunity
    cur.execute("""
        INSERT INTO link_opportunities
        (domain, page_url, type, domain_authority, status, target_site, discovered_method)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT DO NOTHING
    """, (
        domain_clean,
        domain,
        'directory',
        int(score) if score else 0,
        'new' if not live_url else 'acquired',
        'varnaai.com',
        'manual_import'
    ))

    # If backlink acquired, insert into acquired_backlinks
    if live_url and str(live_url).startswith('http'):
        cur.execute("""
            INSERT INTO acquired_backlinks
            (opportunity_id, live_url, link_type, acquired_date, status)
            VALUES (
                (SELECT id FROM link_opportunities WHERE domain = %s LIMIT 1),
                %s, 'dofollow', CURRENT_DATE, 'active'
            )
            ON CONFLICT DO NOTHING
        """, (domain_clean, live_url))

conn.commit()
print("✅ Import complete!")
```

Run the import:
```bash
python import-existing-backlinks.py
```

### Step 4: Configure Environment Variables

Create `.env` file in project root:

```bash
# D:\VarnaAI\Websites\.env

# PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_postgres_password
PG_DATABASE=backlink_campaigns

# Hunter.io (email discovery)
HUNTER_API_KEY=your_hunter_api_key

# SendGrid (email sending)
SENDGRID_API_KEY=your_sendgrid_api_key

# Anthropic Claude (already configured)
ANTHROPIC_API_KEY=your_claude_api_key

# Optional: Moz API (domain authority)
MOZ_ACCESS_ID=your_moz_access_id
MOZ_SECRET_KEY=your_moz_secret_key

# Optional: NeverBounce (email verification)
NEVERBOUNCE_API_KEY=your_neverbounce_key
```

Load environment variables in scripts:
```javascript
require('dotenv').config();
```

### Step 5: Test Components

**Test 1: Database Connection**
```bash
node -e "
const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  database: 'backlink_campaigns',
  user: 'postgres',
  password: 'your_password'
});
pool.query('SELECT COUNT(*) FROM link_opportunities')
  .then(res => console.log('✅ Database connected:', res.rows[0].count, 'opportunities'))
  .catch(err => console.error('❌ Database error:', err.message));
"
```

**Test 2: Discovery Engine**
```bash
# Test guest post discovery (German)
node seo/tools/backlink-discovery.js guest-posts "project management" de ai-projektmanager.de 5

# Expected output:
# 🔍 Discovering guest post sites for niche: project management (de)
# ✅ Found 5 guest post opportunities
```

**Test 3: Email Personalization**
```bash
# Assuming opportunity ID 1 exists
node seo/tools/outreach-personalization.js 1

# Expected output:
# === Generated Email ===
# Subject: [Personalized subject line]
# Body: [Personalized email content]
```

**Test 4: Link Monitor**
```bash
# Test backlink health checking
node seo/tools/link-monitor.js check-all

# Expected output:
# 🔍 Checking health of all active backlinks...
# 📊 Backlink health check results:
#   ✅ Healthy: X
#   ❌ Broken: X
```

### Step 6: Schedule Automation

**Windows Task Scheduler:**

1. Open Task Scheduler → Create Task
2. **Daily Task:**
   - Name: "Backlink Automation - Daily"
   - Trigger: Daily at 9:00 AM
   - Action: `D:\VarnaAI\Websites\operations\cron\backlink-automation.bat daily`
   - Run whether user is logged on or not

3. **Weekly Task:**
   - Name: "Backlink Automation - Weekly"
   - Trigger: Weekly, Monday at 10:00 AM
   - Action: `D:\VarnaAI\Websites\operations\cron\backlink-automation.bat weekly`

**Linux Crontab:**

```bash
# Edit crontab
crontab -e

# Add these lines:
0 9 * * * /path/to/VarnaAI/Websites/operations/cron/backlink-automation.sh daily
0 10 * * 1 /path/to/VarnaAI/Websites/operations/cron/backlink-automation.sh weekly
```

## Usage Examples

### Manual Discovery

```bash
# Find guest post opportunities for AI Projektmanager
node seo/tools/backlink-discovery.js guest-posts "project management" de ai-projektmanager.de 50

# Analyze competitor backlinks
node seo/tools/backlink-discovery.js competitor "monday.com" ai-projektmanager.de 30

# Find broken link opportunities
node seo/tools/backlink-discovery.js broken-links "AI services" en varnaai.com 20

# Find resource pages
node seo/tools/backlink-discovery.js resource-pages "AI tools" en varnaai.com 30
```

### Manual Outreach

```bash
# Start outreach sequence for opportunity ID 123
node seo/tools/outreach-sequences.js start 123

# Process scheduled follow-ups
node seo/tools/outreach-sequences.js process-followups

# Mark campaign as responded
node seo/tools/outreach-sequences.js mark-responded 456 "Yes, we'd love to feature you!"

# Set campaign outcome
node seo/tools/outreach-sequences.js set-outcome 456 accepted
```

### Monitoring

```bash
# Check all backlinks
node seo/tools/link-monitor.js check-all

# Generate report for specific site
node seo/tools/link-monitor.js report varnaai.com

# Check for alerts
node seo/tools/link-monitor.js alerts
```

## Expected Results

### Timeline

**Week 1-2:**
- Import 318 existing opportunities from VarnaAI Backlinks.xlsx
- Discover 50-100 new guest post opportunities
- Discover 30-50 resource page opportunities
- Start outreach to top 20 DA > 40 sites

**Week 3-4:**
- Send 140 initial outreach emails (20/day × 7 days)
- Process 60-80 follow-up emails (3-day, 7-day sequences)
- Expect 20-30 responses (20% response rate)
- Acquire 5-8 new backlinks (25% acquisition rate)

**Month 1 Target:**
- **50 backlinks acquired** across 5 sites (10 per site)
- **DA > 30 focus**: Quality over quantity
- **500+ opportunities discovered**: Guest posts, resource pages, broken links
- **Response rate: 20%+**: Personalized outreach with Claude AI
- **Acquisition rate: 25%+**: Professional, value-driven approach

**Q1 2025 Target (90 days):**
- **250+ backlinks acquired** (50 per site)
- **1,500+ opportunities discovered**
- **F → C grade**: Improve from F (3-12 domains) to C (50+ domains)
- **Organic traffic**: Begin seeing 10-20% increase in organic search traffic

### Budget

**Monthly Costs:**
- Hunter.io: $49/month (1,000 email searches)
- NeverBounce: $10/month (1,000 verifications)
- SendGrid: FREE (100 emails/day)
- **Total: $59/month**

**ROI Estimate:**
- 50 backlinks/month × $10 value each = $500/month value
- ROI: 8.5x ($500 / $59)
- Long-term SEO value: 5-15x investment

## Troubleshooting

### Database Connection Issues
```bash
# Test PostgreSQL connection
psql -U postgres -d backlink_campaigns -c "SELECT COUNT(*) FROM link_opportunities;"
```

### Hunter.io Rate Limits
- Free tier: 25 searches/month
- Paid tier ($49): 1,000 searches/month
- Solution: Discover emails in batches, prioritize high-DA sites

### SendGrid Free Tier Limits
- 100 emails/day limit
- Solution: Send 20 emails/day (conservative approach)
- Upgrade to $15/month for 40,000 emails/month if needed

### Webscrap Integration
- Verify Webscrap is running: `curl http://localhost:8000/api/health`
- If not running, start: `cd D:\VarnaAI\Webscrap && python main.py`

## Next Steps

1. ✅ Complete setup (database, API keys, env variables)
2. ✅ Import existing backlinks from Excel
3. ✅ Test each component individually
4. ✅ Schedule cron jobs
5. 📊 Monitor dashboard daily
6. 🚀 Start executing Q1 2025 campaign

## Support

For issues or questions:
- Check logs: `D:\VarnaAI\Websites\logs\backlink-automation.log`
- Review database: `psql -U postgres -d backlink_campaigns`
- Test components: See "Test Components" section above
