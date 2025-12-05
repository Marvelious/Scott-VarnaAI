-- ABOUTME: Complete database setup script - creates database, schema, and seeds data
-- ABOUTME: Run this file to initialize the complaints_db from scratch

-- Step 1: Create the database (run as postgres superuser)
-- This line should be run separately if database doesn't exist:
-- CREATE DATABASE complaints_db;

-- Step 2: Connect to the database
\c complaints_db

-- Step 3: Create tables (schema)
\i schema.sql

-- Step 4: Seed platform data
\i seed-platforms.sql

-- Step 5: Verify setup
SELECT 'Database setup complete!' as status;
SELECT COUNT(*) as total_tables FROM information_schema.tables WHERE table_schema = 'public';
SELECT COUNT(*) as total_platform_templates FROM templates WHERE category LIKE '%Platform%';