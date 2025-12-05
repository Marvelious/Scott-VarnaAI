-- ABOUTME: PostgreSQL database schema for Complaints Generator
-- ABOUTME: Tables for users, complaints, letters, platforms, templates, and analytics

-- Create database (run this separately as postgres superuser)
-- CREATE DATABASE complaints_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  language VARCHAR(2) DEFAULT 'en',
  country VARCHAR(2) DEFAULT 'BG',
  subscription_tier VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  complaint_type VARCHAR(50) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  business_type VARCHAR(255),
  location VARCHAR(255),
  date_of_agreement DATE,
  date_work_supposed DATE,
  payment_amount DECIMAL(10, 2),
  payment_method VARCHAR(50),
  what_promised TEXT,
  what_not_delivered TEXT,
  financial_impact DECIMAL(10, 2),
  has_contract BOOLEAN DEFAULT FALSE,
  has_receipts BOOLEAN DEFAULT FALSE,
  has_photos BOOLEAN DEFAULT FALSE,
  has_messages BOOLEAN DEFAULT FALSE,
  has_witnesses BOOLEAN DEFAULT FALSE,
  contact_attempts INTEGER DEFAULT 0,
  responses_received TEXT,
  tone VARCHAR(50),
  language VARCHAR(2) DEFAULT 'en',
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Generated letters table
CREATE TABLE IF NOT EXISTS letters (
  id SERIAL PRIMARY KEY,
  complaint_id INTEGER REFERENCES complaints(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  ai_provider VARCHAR(50) DEFAULT 'ollama',
  tone VARCHAR(50),
  language VARCHAR(2),
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Platform recommendations table
CREATE TABLE IF NOT EXISTS platform_recommendations (
  id SERIAL PRIMARY KEY,
  letter_id INTEGER REFERENCES letters(id) ON DELETE CASCADE,
  platform_name VARCHAR(255) NOT NULL,
  platform_url TEXT NOT NULL,
  priority VARCHAR(20),
  category VARCHAR(100),
  description TEXT,
  clicked BOOLEAN DEFAULT FALSE,
  review_posted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  language VARCHAR(2),
  content TEXT NOT NULL,
  variables JSONB,
  is_premium BOOLEAN DEFAULT FALSE,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  action_type VARCHAR(100) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_complaints_user_id ON complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_letters_complaint_id ON letters(complaint_id);
CREATE INDEX IF NOT EXISTS idx_platform_recommendations_letter_id ON platform_recommendations(letter_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON complaints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();