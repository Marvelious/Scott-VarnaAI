-- PostgreSQL Database Schema for Backlink Automation
-- VarnaAI Websites Portfolio - Backlink Campaign Management
-- Created: 2025-01-16

-- Drop existing tables if re-running
DROP TABLE IF EXISTS acquired_backlinks CASCADE;
DROP TABLE IF EXISTS outreach_campaigns CASCADE;
DROP TABLE IF EXISTS outreach_contacts CASCADE;
DROP TABLE IF EXISTS link_opportunities CASCADE;
DROP TABLE IF EXISTS campaign_stats CASCADE;

-- Link Opportunities Discovery Table
CREATE TABLE link_opportunities (
  id SERIAL PRIMARY KEY,
  domain VARCHAR(255) NOT NULL,
  page_url VARCHAR(500),
  type VARCHAR(50) NOT NULL, -- guest_post, resource_page, broken_link, directory, competitor, haro
  domain_authority INT,
  spam_score INT,
  contact_email VARCHAR(255),
  contact_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, responded, rejected, acquired
  target_site VARCHAR(100) NOT NULL, -- ai-projektmanager.de, varnaai.com, etc.
  discovered_method VARCHAR(100), -- google_search, competitor_analysis, broken_link_check
  discovered_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_opportunities_status ON link_opportunities(status);
CREATE INDEX idx_opportunities_target_site ON link_opportunities(target_site);
CREATE INDEX idx_opportunities_type ON link_opportunities(type);
CREATE INDEX idx_opportunities_da ON link_opportunities(domain_authority);

-- Outreach Contacts Table (separate from opportunities for relationship tracking)
CREATE TABLE outreach_contacts (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  domain VARCHAR(255),
  role VARCHAR(100), -- editor, webmaster, content_manager
  verified BOOLEAN DEFAULT FALSE,
  bounced BOOLEAN DEFAULT FALSE,
  opted_out BOOLEAN DEFAULT FALSE,
  last_contacted DATE,
  total_emails_sent INT DEFAULT 0,
  total_responses INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contacts_email ON outreach_contacts(email);
CREATE INDEX idx_contacts_domain ON outreach_contacts(domain);

-- Outreach Campaigns Table
CREATE TABLE outreach_campaigns (
  id SERIAL PRIMARY KEY,
  opportunity_id INT REFERENCES link_opportunities(id) ON DELETE CASCADE,
  contact_id INT REFERENCES outreach_contacts(id),
  template_name VARCHAR(100),
  subject_line TEXT,
  email_body TEXT,
  sequence_step INT DEFAULT 1, -- 1=initial, 2=followup1, 3=followup2, 4=breakup
  sent_date TIMESTAMP,
  opened BOOLEAN DEFAULT FALSE,
  clicked BOOLEAN DEFAULT FALSE,
  response_received BOOLEAN DEFAULT FALSE,
  response_date TIMESTAMP,
  response_text TEXT,
  outcome VARCHAR(50), -- pending, accepted, rejected, no_response
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_campaigns_opportunity ON outreach_campaigns(opportunity_id);
CREATE INDEX idx_campaigns_sent_date ON outreach_campaigns(sent_date);
CREATE INDEX idx_campaigns_sequence_step ON outreach_campaigns(sequence_step);

-- Acquired Backlinks Table
CREATE TABLE acquired_backlinks (
  id SERIAL PRIMARY KEY,
  opportunity_id INT REFERENCES link_opportunities(id),
  live_url VARCHAR(500) NOT NULL,
  anchor_text VARCHAR(255),
  link_type VARCHAR(50) DEFAULT 'dofollow', -- dofollow, nofollow
  acquired_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(50) DEFAULT 'active', -- active, broken, nofollow_changed, removed
  last_checked DATE,
  value_score DECIMAL(3,1), -- 1.0-10.0 based on DA, placement, relevance
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_backlinks_opportunity ON acquired_backlinks(opportunity_id);
CREATE INDEX idx_backlinks_status ON acquired_backlinks(status);
CREATE INDEX idx_backlinks_acquired_date ON acquired_backlinks(acquired_date);

-- Campaign Stats Rollup Table (for dashboard performance)
CREATE TABLE campaign_stats (
  id SERIAL PRIMARY KEY,
  target_site VARCHAR(100) NOT NULL,
  stat_date DATE DEFAULT CURRENT_DATE,
  opportunities_discovered INT DEFAULT 0,
  emails_sent INT DEFAULT 0,
  emails_opened INT DEFAULT 0,
  responses_received INT DEFAULT 0,
  backlinks_acquired INT DEFAULT 0,
  total_da_score INT DEFAULT 0, -- sum of all acquired backlink DA scores
  avg_response_rate DECIMAL(5,2), -- percentage
  avg_acquisition_rate DECIMAL(5,2), -- percentage
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_stats_target_site ON campaign_stats(target_site);
CREATE INDEX idx_stats_date ON campaign_stats(stat_date);

-- Import existing VarnaAI directory submissions
-- This would be populated from VarnaAI Backlinks.xlsx
-- Example: 318 opportunities, 23 already acquired

COMMENT ON TABLE link_opportunities IS 'All discovered link building opportunities across 5 portfolio sites';
COMMENT ON TABLE outreach_contacts IS 'Contact database for relationship tracking and opt-out management';
COMMENT ON TABLE outreach_campaigns IS 'Email outreach campaign tracking with 4-touch sequence support';
COMMENT ON TABLE acquired_backlinks IS 'Active backlinks with health monitoring';
COMMENT ON TABLE campaign_stats IS 'Daily rollup statistics for performance dashboard';
