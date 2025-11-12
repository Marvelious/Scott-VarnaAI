# BETA DEPLOYMENT ADDENDUM
## Detailed Setup for FwChange & Pension Apps

---

## FWCHANGE APP (Enterprise Firewall Management)

### What FwChange Is
- **Purpose**: Enterprise firewall change management
- **Target**: Network/Security teams
- **Features**: Jira integration, Palo Alto/Check Point APIs, audit trails
- **Priority**: HIGH (B2B SaaS potential)

### Step 1: Check What You Have

```bash
# On your LOCAL machine
cd D:\VarnaAI\Old\fwchange
dir

# Look for:
# - package.json (Node.js app)
# - requirements.txt (Python app)
# - docker-compose.yml (existing setup)
# - main entry files (index.js, app.js, main.py)
```

### Step 2: FwChange Deployment (Assuming Node.js)

```bash
# Create Dockerfile for FwChange
cat > Dockerfile.fwchange << 'EOF'
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --production

# Copy application
COPY . .

# Environment setup
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {r.statusCode === 200 ? process.exit(0) : process.exit(1)})"

# Run the app
CMD ["node", "index.js"]
EOF

# Create production docker-compose
cat > docker-compose.fwchange.yml << 'EOF'
version: '3.8'

services:
  fwchange:
    build:
      context: .
      dockerfile: Dockerfile.fwchange
    container_name: fwchange-app
    environment:
      NODE_ENV: production
      PORT: 3000

      # Database
      DATABASE_URL: postgresql://fwchange_user:fwchange_pass@shared-postgres:5432/fwchange
      REDIS_URL: redis://:varna2025redis@shared-redis:6379

      # Jira Integration
      JIRA_URL: ${JIRA_URL:-https://yourcompany.atlassian.net}
      JIRA_USER: ${JIRA_USER:-admin@varnaai.com}
      JIRA_API_TOKEN: ${JIRA_API_TOKEN}

      # Firewall APIs (demo mode)
      PALO_ALTO_API: ${PALO_ALTO_API:-demo}
      CHECK_POINT_API: ${CHECK_POINT_API:-demo}

      # Auth
      JWT_SECRET: fwchange_jwt_secret_2025
      SESSION_SECRET: fwchange_session_2025

    volumes:
      - ./logs:/app/logs
      - ./uploads:/app/uploads

    networks:
      - web
      - database
      - redis

    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.fwchange.rule=Host(`fwchange.varnaai.com`)"
      - "traefik.http.services.fwchange.loadbalancer.server.port=3000"

    restart: unless-stopped

networks:
  web:
    external: true
  database:
    external: true
  redis:
    external: true
EOF
```

### Step 3: FwChange Database Schema

```sql
-- Create FwChange schema
-- Run this on the server in PostgreSQL

\c fwchange;

CREATE TABLE IF NOT EXISTS organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    jira_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS firewall_devices (
    id SERIAL PRIMARY KEY,
    org_id INTEGER REFERENCES organizations(id),
    name VARCHAR(255) NOT NULL,
    vendor VARCHAR(50), -- 'palo_alto', 'check_point', 'fortinet'
    ip_address INET,
    api_endpoint VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS change_requests (
    id SERIAL PRIMARY KEY,
    org_id INTEGER REFERENCES organizations(id),
    device_id INTEGER REFERENCES firewall_devices(id),
    jira_ticket VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, implemented
    risk_level VARCHAR(20), -- low, medium, high, critical
    created_by VARCHAR(255),
    approved_by VARCHAR(255),
    implemented_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS firewall_rules (
    id SERIAL PRIMARY KEY,
    device_id INTEGER REFERENCES firewall_devices(id),
    change_request_id INTEGER REFERENCES change_requests(id),
    rule_name VARCHAR(255),
    source_zone VARCHAR(100),
    dest_zone VARCHAR(100),
    source_ip VARCHAR(255),
    dest_ip VARCHAR(255),
    service VARCHAR(255),
    action VARCHAR(50), -- allow, deny, drop
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    org_id INTEGER REFERENCES organizations(id),
    user_email VARCHAR(255),
    action VARCHAR(100),
    resource_type VARCHAR(50),
    resource_id INTEGER,
    details JSONB,
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_change_requests_org ON change_requests(org_id);
CREATE INDEX idx_change_requests_status ON change_requests(status);
CREATE INDEX idx_audit_logs_org ON audit_logs(org_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
```

### Step 4: FwChange Demo Data

```sql
-- Insert demo data
INSERT INTO organizations (name, jira_url) VALUES
('Demo Corp', 'https://democorp.atlassian.net'),
('Test Bank AG', 'https://testbank.atlassian.net');

INSERT INTO firewall_devices (org_id, name, vendor, ip_address) VALUES
(1, 'PA-HQ-01', 'palo_alto', '10.0.1.1'),
(1, 'CP-DC-01', 'check_point', '10.0.2.1'),
(2, 'PA-BRANCH-01', 'palo_alto', '192.168.1.1');

INSERT INTO change_requests (org_id, device_id, jira_ticket, title, risk_level) VALUES
(1, 1, 'DEMO-123', 'Open port 443 for new web service', 'medium'),
(1, 2, 'DEMO-124', 'Block suspicious IP range', 'high'),
(2, 3, 'TEST-001', 'Update NAT rules for new subnet', 'low');
```

### Step 5: Deploy FwChange

```bash
# On LOCAL machine
cd D:\VarnaAI\Old\fwchange

# Archive it
tar czf fwchange.tar.gz --exclude=node_modules --exclude=.git .

# Copy to server
scp fwchange.tar.gz root@YOUR_SERVER_IP:/opt/apps/fwchange/

# On SERVER
ssh root@YOUR_SERVER_IP
cd /opt/apps/fwchange
tar xzf fwchange.tar.gz

# Build and run
docker-compose -f docker-compose.fwchange.yml up -d --build

# Check logs
docker logs -f fwchange-app
```

---

## PENSION APP (RetirementAI - YMYL Finance)

### What Pension/RetirementAI Is
- **Purpose**: AI-powered retirement planning
- **Target**: Consumers (B2C)
- **Features**: Monte Carlo simulations, portfolio optimization, calculators
- **Priority**: MEDIUM (YMYL requires careful handling)
- **Special Requirements**: Disclaimers, no financial advice claims

### Step 1: Check What You Have

```bash
# On LOCAL machine
cd D:\VarnaAI\Old\pension
dir

# Likely a React app with:
# - package.json
# - src/ folder
# - public/ folder
```

### Step 2: Pension App Deployment (React Frontend + Node Backend)

```bash
# Create multi-stage Dockerfile
cat > Dockerfile.pension << 'EOF'
# Build stage for React
FROM node:20-alpine as frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Backend API (if separate)
FROM node:20-alpine as backend
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --production
COPY server/ .
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "index.js"]

# Nginx to serve frontend
FROM nginx:alpine as production
COPY --from=frontend-build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Add disclaimer banner
RUN echo '<div style="background:yellow;padding:10px;text-align:center;position:fixed;top:0;width:100%;z-index:9999">⚠️ DEMO ONLY - Not Financial Advice - Consult Professional Advisor ⚠️</div>' \
    >> /usr/share/nginx/html/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# Create nginx config
cat > nginx.conf << 'EOF'
server {
    listen 80;
    server_name retire.varnaai.com;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers for YMYL
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Content-Security-Policy "default-src 'self'" always;

    # Disclaimer header
    add_header X-Disclaimer "Not Financial Advice" always;

    location / {
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://pension-backend:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

# Create docker-compose
cat > docker-compose.pension.yml << 'EOF'
version: '3.8'

services:
  pension-frontend:
    build:
      context: .
      dockerfile: Dockerfile.pension
      target: production
    container_name: pension-frontend
    networks:
      - web
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.pension.rule=Host(`retire.varnaai.com`)"
      - "traefik.http.services.pension.loadbalancer.server.port=80"
    restart: unless-stopped

  pension-backend:
    build:
      context: .
      dockerfile: Dockerfile.pension
      target: backend
    container_name: pension-backend
    environment:
      NODE_ENV: production
      PORT: 4000
      DATABASE_URL: postgresql://pension_user:pension_pass@shared-postgres:5432/pension
      REDIS_URL: redis://:varna2025redis@shared-redis:6379

      # Financial APIs (use demo/sandbox)
      ALPHA_VANTAGE_KEY: ${ALPHA_VANTAGE_KEY:-demo}
      IEX_CLOUD_KEY: ${IEX_CLOUD_KEY:-demo}

      # AI for calculations
      OPENAI_API_KEY: ${OPENAI_API_KEY}

      # Security
      JWT_SECRET: pension_jwt_2025

      # YMYL Flags
      DEMO_MODE: "true"
      SHOW_DISCLAIMER: "true"
      DISABLE_REAL_TRADING: "true"

    networks:
      - web
      - database
      - redis
    restart: unless-stopped

networks:
  web:
    external: true
  database:
    external: true
  redis:
    external: true
EOF
```

### Step 3: Pension Database Schema

```sql
-- Pension/RetirementAI schema
\c pension;

-- User accounts (with GDPR considerations)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    date_of_birth DATE,
    country VARCHAR(2) DEFAULT 'US',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    gdpr_consent BOOLEAN DEFAULT false,
    gdpr_consent_date TIMESTAMP
);

-- Retirement profiles
CREATE TABLE IF NOT EXISTS retirement_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    current_age INTEGER,
    retirement_age INTEGER DEFAULT 65,
    life_expectancy INTEGER DEFAULT 85,
    current_savings DECIMAL(12,2),
    monthly_contribution DECIMAL(10,2),
    risk_tolerance VARCHAR(20), -- conservative, moderate, aggressive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio allocations
CREATE TABLE IF NOT EXISTS portfolios (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES retirement_profiles(id) ON DELETE CASCADE,
    asset_class VARCHAR(50), -- stocks, bonds, real_estate, commodities
    allocation_percent DECIMAL(5,2),
    current_value DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Monte Carlo simulation results
CREATE TABLE IF NOT EXISTS simulations (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES retirement_profiles(id) ON DELETE CASCADE,
    simulation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    iterations INTEGER DEFAULT 1000,
    success_rate DECIMAL(5,2), -- percentage
    median_outcome DECIMAL(12,2),
    worst_case DECIMAL(12,2),
    best_case DECIMAL(12,2),
    parameters JSONB -- store all simulation parameters
);

-- Calculator usage (for analytics)
CREATE TABLE IF NOT EXISTS calculator_usage (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    calculator_type VARCHAR(50), -- compound_interest, roth_conversion, etc
    inputs JSONB,
    results JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- IMPORTANT: Audit table for YMYL compliance
CREATE TABLE IF NOT EXISTS disclaimer_acknowledgments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    ip_address INET,
    disclaimer_text TEXT,
    acknowledged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_profiles_user ON retirement_profiles(user_id);
CREATE INDEX idx_simulations_profile ON simulations(profile_id);
CREATE INDEX idx_calculator_usage_user ON calculator_usage(user_id);
```

### Step 4: Pension Demo Data + Disclaimers

```sql
-- Demo accounts with clear demo flags
INSERT INTO users (email, name, date_of_birth, country, gdpr_consent) VALUES
('demo@retire.varnaai.com', 'Demo User', '1970-01-01', 'US', true),
('test@retire.varnaai.com', 'Test User', '1985-06-15', 'DE', true);

INSERT INTO retirement_profiles (user_id, current_age, retirement_age, current_savings, monthly_contribution, risk_tolerance) VALUES
(1, 55, 65, 250000, 1000, 'moderate'),
(2, 40, 67, 100000, 500, 'aggressive');

INSERT INTO portfolios (profile_id, asset_class, allocation_percent, current_value) VALUES
(1, 'stocks', 60, 150000),
(1, 'bonds', 30, 75000),
(1, 'real_estate', 10, 25000),
(2, 'stocks', 80, 80000),
(2, 'bonds', 20, 20000);

-- CRITICAL: Disclaimer that shows on every page
INSERT INTO disclaimer_acknowledgments (user_id, ip_address, disclaimer_text) VALUES
(1, '127.0.0.1', 'This is a demonstration only. Not financial advice. Consult a qualified financial advisor.'),
(2, '127.0.0.1', 'This is a demonstration only. Not financial advice. Consult a qualified financial advisor.');
```

### Step 5: Deploy Pension App

```bash
# On LOCAL
cd D:\VarnaAI\Old\pension

# If it's just a frontend app, create simple static deployment
tar czf pension.tar.gz --exclude=node_modules --exclude=.git .
scp pension.tar.gz root@YOUR_SERVER_IP:/opt/apps/pension/

# On SERVER
cd /opt/apps/pension
tar xzf pension.tar.gz

# Build and deploy
docker-compose -f docker-compose.pension.yml up -d --build

# Verify disclaimer is showing
curl https://retire.varnaai.com | grep -i disclaimer
```

---

## SPECIAL CONSIDERATIONS

### FwChange Security Requirements

```yaml
Security Features:
  - API rate limiting (100 requests/min)
  - Audit logging for all changes
  - Role-based access (viewer, operator, admin)
  - Change approval workflow
  - Rollback capability

Demo Limitations:
  - No real firewall connections in demo
  - Mock Jira integration
  - Simulated rule changes
  - Pre-populated audit logs
```

### Pension YMYL Requirements

```yaml
Legal Requirements:
  - Disclaimer on EVERY page
  - No "guaranteed returns" language
  - No personalized advice
  - Clear "demo/educational" marking
  - GDPR consent for EU users

Demo Features:
  - Use historical market data
  - Monte Carlo with clear assumptions
  - Educational calculators only
  - No real trading connections
```

---

## MONITORING BOTH APPS

```bash
# Add to health check script
cat >> /opt/apps/health-check.sh << 'EOF'

# FwChange specific checks
echo "FwChange Status:"
curl -s -o /dev/null -w "FwChange App: %{http_code}\n" https://fwchange.varnaai.com
docker exec -i shared-postgres psql -U postgres -d fwchange -c "SELECT COUNT(*) as devices FROM firewall_devices;" 2>/dev/null

# Pension specific checks
echo "RetirementAI Status:"
curl -s -o /dev/null -w "RetirementAI App: %{http_code}\n" https://retire.varnaai.com
curl -s https://retire.varnaai.com | grep -q "disclaimer" && echo "Disclaimer: Present" || echo "WARNING: Disclaimer missing!"
docker exec -i shared-postgres psql -U postgres -d pension -c "SELECT COUNT(*) as users FROM users;" 2>/dev/null
EOF
```

---

## DEMO SCRIPTS

### FwChange Demo Script

```markdown
## FwChange Demo Flow (10 minutes)

1. **Login** as demo@varnaai.com
2. **Show Dashboard**
   - 3 firewalls connected
   - 15 pending changes
   - Risk distribution chart

3. **Create Change Request**
   - Title: "Open HTTPS for new service"
   - Select firewall: PA-HQ-01
   - Auto-creates Jira ticket

4. **Approval Workflow**
   - Show pending approvals
   - Risk assessment
   - Impact analysis

5. **Implementation**
   - Show rule preview
   - Simulate deployment
   - Show audit log

6. **Reports**
   - Change velocity
   - Compliance report
   - Audit trail
```

### Pension Demo Script

```markdown
## RetirementAI Demo Flow (10 minutes)

1. **Show Disclaimer** - Point out educational purpose
2. **Quick Calculator**
   - Compound interest calculator
   - Show instant results

3. **Create Profile**
   - Age: 45
   - Retirement: 65
   - Current savings: $200,000

4. **Run Monte Carlo**
   - 1000 simulations
   - Show success probability
   - Explain assumptions

5. **Portfolio Optimizer**
   - Current vs recommended
   - Risk-adjusted returns
   - Rebalancing suggestions

6. **Export Report**
   - PDF with all disclaimers
   - "Consult advisor" messaging
```

---

## QUICK FIXES

### If FwChange Won't Start

```bash
# Check if it needs Python instead
cd /opt/apps/fwchange
ls -la

# If you see requirements.txt:
cat > Dockerfile.python << 'EOF'
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
EOF

# Use python image in docker-compose
```

### If Pension Shows Real Trading

```javascript
// Add to frontend code
if (process.env.REACT_APP_DEMO_MODE === 'true') {
  console.warn('DEMO MODE - No real transactions');
  window.DEMO_MODE = true;

  // Disable real API calls
  window.fetch = new Proxy(window.fetch, {
    apply(target, thisArg, args) {
      const [url] = args;
      if (url.includes('real-trading-api')) {
        console.error('Blocked real trading API in demo mode');
        return Promise.resolve({ ok: false });
      }
      return target.apply(thisArg, args);
    }
  });
}
```

---

## DNS RECORDS UPDATE

Add these to your Cloudflare:

```
fwchange.varnaai.com  A  YOUR_SERVER_IP  # FwChange
retire.varnaai.com    A  YOUR_SERVER_IP  # Pension/RetirementAI
```

---

## FINAL DEPLOYMENT COMMAND

```bash
# Deploy both apps at once
cd /opt/apps

# FwChange
cd fwchange && docker-compose -f docker-compose.fwchange.yml up -d --build

# Pension
cd ../pension && docker-compose -f docker-compose.pension.yml up -d --build

# Check both
docker ps | grep -E "fwchange|pension"

# Test URLs
curl -I https://fwchange.varnaai.com
curl -I https://retire.varnaai.com
```

---

That's FwChange and Pension covered! Both apps now have:
- Complete Docker setups
- Database schemas
- Demo data
- Security considerations
- Monitoring integration
- Demo scripts

Ready to deploy them alongside your other apps!