-- ABOUTME: Seed data for Bulgarian review platforms
-- ABOUTME: Populates templates table with platform recommendations

-- Bulgarian Review Platforms
INSERT INTO templates (name, category, language, content, variables, is_premium, usage_count) VALUES
-- High Priority Platforms
('Google Reviews', 'Review Platform', 'bg', 'Google Reviews - Highest visibility, appears in search results', '{"url": "https://support.google.com/maps/answer/6230175", "priority": "high"}', false, 0),
('Facebook Reviews', 'Social Media', 'bg', 'Facebook Business Pages and Local Groups', '{"url": "https://www.facebook.com", "priority": "high"}', false, 0),
('MaistorPlus', 'Contractor Platform', 'bg', 'Contractor marketplace with reviews - HIGH impact for renovation sector', '{"url": "https://maistorplus.com/pros", "priority": "high"}', false, 0),
('Remonti.bg', 'Contractor Platform', 'bg', 'Renovation and construction marketplace', '{"url": "https://remonti.bg", "priority": "high"}', false, 0),
('BG-Mamma Forum', 'Community Forum', 'bg', 'Popular Bulgarian parenting forum with construction/renovation section', '{"url": "https://www.bg-mamma.com", "priority": "high"}', false, 0),

-- Secondary Platforms
('TvoetoMnenie.bg', 'Review Platform', 'bg', 'Consumer opinion platform', '{"url": "https://tvoetomnenie.bg", "priority": "medium"}', false, 0),
('Mneniq.bg', 'Review Platform', 'bg', 'Most trusted reviews for Bulgarian companies', '{"url": "https://mneniq.bg", "priority": "medium"}', false, 0),
('GoldenPages.bg', 'Business Directory', 'bg', 'Business directory with reviews', '{"url": "https://www.goldenbook.bg/en", "priority": "medium"}', false, 0),
('Trustpilot Bulgaria', 'Review Platform', 'bg', 'International + Bulgarian audience', '{"url": "https://help.trustpilot.com/s/article/Write-a-review", "priority": "medium"}', false, 0),
('Business.bg', 'Business Directory', 'bg', 'Business directory and marketplace', '{"url": "https://www.business.bg", "priority": "medium"}', false, 0),

-- Tertiary Platforms
('Directory.bg', 'Business Directory', 'bg', 'Bulgarian business directory', '{"url": "https://www.directory.bg", "priority": "low"}', false, 0),
('Firm.bg', 'Business Directory', 'bg', 'Online business catalog', '{"url": "https://firm.bg", "priority": "low"}', false, 0),
('BGDIR.eu', 'Business Directory', 'bg', 'Business catalog and directory', '{"url": "https://bgdir.eu", "priority": "low"}', false, 0),
('BG Firmi', 'Review Platform', 'bg', 'Testimonials and company reviews', '{"url": "https://bgfirmi.net/testimonials", "priority": "low"}', false, 0),
('Apple Maps', 'Maps Platform', 'bg', 'iOS user visibility', '{"url": "https://support.apple.com/guide/iphone/rate-places-and-add-photos-iphc3e29e15d/ios", "priority": "low"}', false, 0),
('Fix! App', 'Service Platform', 'bg', 'Service marketplace for home repairs', '{"url": "https://fix-app.eu/en/overview-of-the-fix-function/", "priority": "low"}', false, 0),
('OLX.bg', 'Classifieds Platform', 'bg', 'Profile ratings (if contractor uses platform)', '{"url": "https://help.olx.bg/olxbghelp/s/article/рейтинг-система-за-оценка-и-обратна-връзка-V40", "priority": "low"}', false, 0);

-- German Review Platforms (to be researched and added)
INSERT INTO templates (name, category, language, content, variables, is_premium, usage_count) VALUES
('Google Reviews DE', 'Review Platform', 'de', 'Google Reviews - Deutschland', '{"url": "https://support.google.com/maps/answer/6230175", "priority": "high"}', false, 0),
('Facebook DE', 'Social Media', 'de', 'Facebook Business Pages - Deutschland', '{"url": "https://www.facebook.com", "priority": "high"}', false, 0),
('Trustpilot Deutschland', 'Review Platform', 'de', 'Trustpilot Germany', '{"url": "https://de.trustpilot.com", "priority": "high"}', false, 0);