# PostgreSQL Database Setup Guide

Complete step-by-step guide to set up the complaints_db PostgreSQL database.

## Connection Details

- **Host**: localhost
- **Port**: 5432
- **User**: postgres
- **Password**: changeme
- **Database**: complaints_db
- **Connection String**: `postgresql://postgres:changeme@localhost:5432/complaints_db`
- **psql Path**: `C:\Program Files\PostgreSQL\18\bin\psql.exe`

## Method 1: Automated Setup (Recommended)

### Step 1: Create Database

Open Command Prompt or PowerShell and run:

```bash
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE complaints_db;"
```

When prompted, enter password: `changeme`

### Step 2: Run Setup Script

Navigate to the backend/database directory and run:

```bash
cd D:\VarnaAI\complaints-generator\backend\database
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d complaints_db -f setup.sql
```

This will:
1. Create all tables (users, complaints, letters, etc.)
2. Create indexes for performance
3. Seed Bulgarian platform data (17+ platforms)
4. Verify setup completed successfully

### Step 3: Verify Setup

```bash
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d complaints_db
```

Then run:
```sql
-- Check tables were created
\dt

-- Check platform templates were seeded
SELECT COUNT(*) FROM templates;

-- Should show 17+ platform templates
SELECT name, category, language FROM templates LIMIT 5;

-- Exit psql
\q
```

## Method 2: Manual Setup

### Step 1: Create Database

```bash
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres
```

Enter password: `changeme`

```sql
CREATE DATABASE complaints_db;
\c complaints_db
```

### Step 2: Create Schema

```sql
\i D:/VarnaAI/complaints-generator/backend/database/schema.sql
```

### Step 3: Seed Platform Data

```sql
\i D:/VarnaAI/complaints-generator/backend/database/seed-platforms.sql
```

### Step 4: Verify

```sql
-- Check tables
\dt

-- Check data
SELECT COUNT(*) FROM templates;

\q
```

## Method 3: Using MCP PostgreSQL Tool

If you have the postgres-c3 MCP server configured:

```bash
# List schemas
mcp postgres-c3 list_schemas

# List tables
mcp postgres-c3 list_tables --schema=public

# Describe table structure
mcp postgres-c3 describe_table --table=complaints
```

## Database Schema Overview

### Tables Created

1. **users** - User accounts and authentication
2. **complaints** - Complaint form data (all 5 wizard steps)
3. **letters** - AI-generated letters with versioning
4. **platform_recommendations** - Review platform suggestions
5. **templates** - Letter templates and platform data (17+ Bulgarian platforms seeded)
6. **analytics** - Usage tracking and metrics

### Sample Queries

**Check platform templates:**
```sql
SELECT name, category, priority
FROM templates
WHERE category LIKE '%Platform%'
ORDER BY
  CASE priority
    WHEN 'high' THEN 1
    WHEN 'medium' THEN 2
    WHEN 'low' THEN 3
  END;
```

**Bulgarian high-priority platforms:**
```sql
SELECT name, content, variables->>'url' as url
FROM templates
WHERE language = 'bg' AND category LIKE '%Platform%' AND variables->>'priority' = 'high';
```

## Troubleshooting

### "CREATE DATABASE" fails with "already exists"

Database already created. Skip to Step 2.

```bash
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d complaints_db -f setup.sql
```

### "psql: FATAL: password authentication failed"

1. Verify password is `changeme`
2. Check `pg_hba.conf` authentication method
3. Restart PostgreSQL service if needed

### "permission denied for schema public"

Grant permissions:
```sql
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
```

### "relation already exists" errors

Tables already exist. You can:

**Option A: Drop and recreate**
```sql
DROP TABLE IF EXISTS analytics CASCADE;
DROP TABLE IF EXISTS platform_recommendations CASCADE;
DROP TABLE IF EXISTS letters CASCADE;
DROP TABLE IF EXISTS complaints CASCADE;
DROP TABLE IF EXISTS templates CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Then run setup.sql again
```

**Option B: Keep existing data**
Skip schema creation, only seed new platform data:
```bash
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d complaints_db -f seed-platforms.sql
```

## Next Steps

After database setup is complete:

1. **Configure backend `.env`**:
   - Already configured with correct PostgreSQL credentials
   - Located at: `D:\VarnaAI\complaints-generator\backend\.env`

2. **Test database connection**:
   ```bash
   cd D:\VarnaAI\complaints-generator\backend
   npm run dev
   ```
   Should see: `✅ Connected to PostgreSQL database`

3. **Test API endpoint**:
   ```bash
   curl http://localhost:4000/health
   ```
   Should return: `{"status":"ok","message":"Complaints Generator API is running"}`

## Environment Variables

Backend `.env` file is already configured with these values:

```
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=changeme
PG_DATABASE=complaints_db
```

No changes needed unless you used different credentials.

---

**Database setup complete!** 🎉

Next: Start the backend server and test the API endpoints.