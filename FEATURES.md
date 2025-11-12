# VarnaAI Dashboard - Complete Features Guide

## 🎯 Overview

This dashboard manages 5 WordPress sites with AI-powered content generation, real-time analytics, and marketing automation.

---

## 🌐 Managed WordPress Sites

1. **ai-projektmanager.de** - German AI Project Management
2. **aimarketingbg.com** - AI Marketing (EN/BG)
3. **classicsecurity.net** - IT Security & GDPR Services
4. **varna-agenten.de** - AI Agents (German)
5. **varnaai.com** - AI Services (Global)

---

## 📊 Dashboard Tabs

### 1. Overview Tab
**What it shows:**
- Total sites managed (5)
- Total published pages across all sites
- Average SEO score
- Marketing stats (email subscribers, scheduled posts, campaigns)
- Quick action buttons

**Real-time data:**
- WordPress REST API calls to fetch actual page counts
- Site online/offline status
- SEO scores (if Rank Math plugin installed)

---

### 2. WordPress Control Tab

**Features:**
- View all 5 WordPress sites in card layout
- Real-time status (online/offline)
- Published pages count (live data from WordPress REST API)
- SEO score per site
- Language indicator
- Quick login buttons (opens wp-admin in browser)

**How it works:**
```
Dashboard → WordPress REST API → /wp-json/wp/v2/pages
Fetches: x-wp-total header (page count)
Timeout: 5 seconds per site
Parallel requests: All 5 sites checked simultaneously
```

**Data displayed:**
- Site name
- Domain
- Pages published (real count)
- SEO score (0-100)
- Online/Offline status
- Login button

---

### 3. Content Generation Tab

**Three AI-Powered Generators:**

#### A) Blog Post Generator

**Input fields:**
- Topic (required)
- Language (German, English, Bulgarian)
- Tone (Professional, Casual, Technical, Friendly)

**AI Prompt Used:**
```
System: You are a professional content writer creating blog posts in [language]
language with a [tone] tone. Generate SEO-optimized content with proper structure
(title, introduction, body, conclusion).

User: Write a comprehensive blog post about: [topic]

Requirements:
- Language: [language]
- Tone: [tone]
- Length: 600-800 words
- Include SEO keywords naturally
- Format: JSON with fields: title, content, metaDescription
```

**Output:**
- Blog post title
- Full content (600-800 words)
- Meta description
- Word count
- SEO score (calculated)
- Ready to copy/paste

**Model:** GPT-4 (temperature: 0.7)

---

#### B) Social Media Generator

**Input fields:**
- Topic (required)
- Platforms (Twitter, LinkedIn, Facebook, Instagram - multi-select)
- Language (German, English, Bulgarian)

**AI Prompts Used (per platform):**

**Twitter:**
```
System: You are a social media expert creating engaging posts for Twitter in
[language] language. Include relevant hashtags and emojis.

User: Create a Twitter post about: [topic]

Requirements:
- Character limit: 280
- Language: [language]
- Include 3-5 relevant hashtags
- Format: JSON with fields: content, hashtags (array)
```

**LinkedIn:**
```
System: You are a social media expert creating professional posts for LinkedIn in
[language] language. Include relevant hashtags.

User: Create a LinkedIn post about: [topic]

Requirements:
- Character limit: 1300
- Language: [language]
- Include 3-5 relevant hashtags
- Professional tone
- Format: JSON with fields: content, hashtags (array)
```

**Facebook:**
```
System: You are a social media expert creating engaging posts for Facebook in
[language] language. Include relevant hashtags and emojis.

User: Create a Facebook post about: [topic]

Requirements:
- Character limit: 500
- Language: [language]
- Include 3-5 relevant hashtags
- Format: JSON with fields: content, hashtags (array)
```

**Instagram:**
```
System: You are a social media expert creating visual posts for Instagram in
[language] language. Include relevant hashtags and emojis.

User: Create an Instagram post about: [topic]

Requirements:
- Character limit: 2200
- Language: [language]
- Include 3-5 relevant hashtags
- Visual storytelling style
- Format: JSON with fields: content, hashtags (array)
```

**Output (per platform):**
- Platform name
- Post content
- Character count
- Hashtag array
- Ready to copy/paste

**Model:** GPT-4 (temperature: 0.8 - more creative)

---

#### C) Email Campaign Generator

**Input fields:**
- Subject line idea (required)
- Campaign purpose (required)
- Language (German, English, Bulgarian)

**AI Prompt Used:**
```
System: You are a professional email marketing copywriter creating campaigns in
[language] language. Write persuasive, conversion-focused email content.

User: Create an email campaign:

Subject line idea: [subject]
Purpose: [purpose]
Language: [language]

Requirements:
- Compelling subject line (40-60 chars)
- Engaging preheader text (80-100 chars)
- Email body with clear CTA
- Professional tone
- Format: JSON with fields: subject, preheader, body
```

**Output:**
- Subject line (optimized)
- Preheader text
- Email body (full HTML-ready content)
- Ready to copy/paste into Mailchimp/email tool

**Model:** GPT-4 (temperature: 0.7)

---

### 4. Marketing Automation Tab

**Current Stats Displayed:**
- Email subscribers: 2,847
- Scheduled social posts: 14
- Active campaigns: 3
- Today's emails sent: 34
- Email open rate: 34.2%
- Social engagement: 234

**Features:**
- Launch email campaign button
- Schedule social posts button
- View campaign analytics

**Note:** Currently uses mock data. Ready for Mailchimp/Buffer API integration.

---

### 5. Analytics Tab

**Dashboard Metrics:**

**Today:**
- Visitors: 423
- Leads: 12
- Pageviews: 1,247
- Bounce rate: 42.3%

**This Week:**
- Visitors: 2,841
- Leads: 47
- Conversion rate: 1.65%
- Top pages (with view counts)

**SEO Rankings:**
- Keywords improved: 14
- Keywords declined: 3
- Keywords stable: 28
- Top keywords with positions and changes

**Charts:**
- Line chart: Visitors over time (7 days)
- Bar chart: Top pages by views

**Note:** Currently uses mock data. Ready for Google Analytics API integration.

---

### 6. Quick Actions Tab

**Four Action Cards:**

#### A) Complaint Letter Generator

**Input fields:**
- Complaint type (dropdown: Product, Service, Billing, Other)
- Details (textarea)
- Language (German, English, Bulgarian)

**Endpoint:** `POST /api/actions/complaint`

**Response:**
- Generated complaint letter
- Download link (PDF format)

---

#### B) SEO Audit Tool

**Input fields:**
- Website URL (required)

**Endpoint:** `POST /api/actions/seo-audit`

**What it checks:**
- Meta tags
- Heading structure
- Image alt texts
- Page speed
- Mobile responsiveness
- SSL certificate

**Response:**
- Audit status
- Report download link

---

#### C) Export Analytics

**Input fields:**
- Format (CSV, Excel, PDF)
- Date range (Last 7 days, Last 30 days, Last 90 days, Custom)

**Endpoint:** `GET /api/actions/export-analytics`

**Response:**
- Export status
- Download link

---

#### D) Batch Operations

**Three Quick Buttons:**

1. **Update All Sites** - Bulk WordPress updates
2. **Backup All** - Create backups of all 5 sites
3. **Check Security** - Run security scans

**Endpoint:** Ready for WordPress API integration

---

## 🤖 AI Content Generation Details

### OpenAI Configuration

**Model:** GPT-4 (gpt-4)
**API Key:** Required in `.env` file as `OPENAI_API_KEY`

**Temperature Settings:**
- Blog posts: 0.7 (balanced creativity/accuracy)
- Email campaigns: 0.7 (balanced)
- Social media: 0.8 (more creative)

**Max Tokens:**
- Blog posts: 1,500 tokens
- Social media: 300 tokens per platform
- Email campaigns: 800 tokens

**Response Format:** JSON structured output

### Fallback Behavior

**Without OpenAI API Key:**
- Dashboard shows placeholder content
- Message displayed: "Add OPENAI_API_KEY to .env for real content"
- Mock data structure matches real API response
- All features remain functional

**With OpenAI API Key:**
- Real GPT-4 generated content
- Multi-language support
- Tone customization
- SEO-optimized output

---

## 🔧 Technical Architecture

### Backend (server.js)

**Framework:** Express.js
**Port:** 3333
**Middleware:**
- CORS enabled
- Body parser (JSON & URL-encoded)
- Static file serving (public/)

**API Endpoints:**

```
WordPress:
- GET  /api/wordpress/sites
- POST /api/wordpress/login

Content Generation:
- POST /api/content/blog
- POST /api/content/social
- POST /api/content/email

Marketing:
- GET  /api/marketing/stats
- POST /api/marketing/campaign
- POST /api/marketing/social/schedule

Analytics:
- GET  /api/analytics/overview
- GET  /api/analytics/site/:siteId

Quick Actions:
- POST /api/actions/complaint
- POST /api/actions/seo-audit
- GET  /api/actions/export-analytics

Health:
- GET  /api/health
```

### Frontend (index.html)

**Framework:** Vanilla JavaScript + Alpine.js
**Styling:** Tailwind CSS
**Charts:** Chart.js
**Icons:** Heroicons

**Features:**
- Single-page application (SPA)
- Tab-based navigation
- Toast notification system
- Loading states for all async operations
- Responsive design (mobile-friendly)
- Dark theme

---

## 🎨 UI Components

### Toast Notifications

**Types:**
- Success (green) - Operations completed
- Error (red) - Operations failed
- Info (blue) - General information

**Behavior:**
- Appear top-right corner
- Auto-dismiss after 5 seconds
- Manual close button (X)
- Slide-in/out animations

**Triggers:**
- WordPress sites loaded
- Content generation complete
- Form validation errors
- API request failures

### Loading States

**Components with spinners:**
- WordPress site cards (during fetch)
- Generate buttons (during AI generation)
- Form submit buttons (during processing)

**Visual feedback:**
- Spinning icon in button
- Button disabled state
- Opacity change

---

## 📝 Content Prompts Reference

### Blog Post Prompt Template

```javascript
const blogPrompt = `Write a comprehensive blog post about: ${topic}

Requirements:
- Language: ${language}
- Tone: ${tone}
- Length: 600-800 words
- Include SEO keywords naturally
- Format: JSON with fields: title, content, metaDescription`;
```

### Social Media Prompt Template

```javascript
const socialPrompt = `Create a ${platform} post about: ${topic}

Requirements:
- Character limit: ${charLimits[platform]}
- Language: ${language}
- Include 3-5 relevant hashtags
- Format: JSON with fields: content, hashtags (array)`;
```

### Email Campaign Prompt Template

```javascript
const emailPrompt = `Create an email campaign:

Subject line idea: ${subject}
Purpose: ${purpose}
Language: ${language}

Requirements:
- Compelling subject line (40-60 chars)
- Engaging preheader text (80-100 chars)
- Email body with clear CTA
- Professional tone
- Format: JSON with fields: subject, preheader, body`;
```

---

## 🔐 Environment Variables

**Required:**
```env
# WordPress Credentials (5 sites)
WP_AI_PM_USER=claude
WP_AI_PM_PASS=[password]
WP_AI_MKT_USER=claude
WP_AI_MKT_PASS=[password]
WP_CLASSIC_USER=claude
WP_CLASSIC_PASS=[password]
WP_VARNA_AG_USER=claude
WP_VARNA_AG_PASS=[password]
WP_VARNA_AI_USER=claude
WP_VARNA_AI_PASS=[password]
```

**Optional:**
```env
# OpenAI API Key (for real AI content generation)
OPENAI_API_KEY=sk-proj-...

# Server Port (default: 3333)
PORT=3333
```

---

## 🚀 Setup Instructions

1. **Clone repository:**
   ```bash
   git clone https://github.com/Marvelious/varnaai-seo.git
   cd varnaai-seo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   # Edit .env with real credentials
   ```

4. **Build Tailwind CSS:**
   ```bash
   npm run build:css
   ```

5. **Start server:**
   ```bash
   npm start
   ```

6. **Open dashboard:**
   ```
   http://localhost:3333
   ```

---

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "body-parser": "^1.20.2",
  "dotenv": "^16.3.1",
  "axios": "^1.6.2",
  "openai": "^4.20.1"
}
```

**Dev Dependencies:**
```json
{
  "tailwindcss": "^3.3.5",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32"
}
```

---

## 🎯 Use Cases

### For Content Creators
- Generate 10 blog posts in 5 minutes
- Create week's worth of social media content
- Write email campaigns in multiple languages

### For Marketing Teams
- Manage multiple WordPress sites from one dashboard
- Schedule social media across platforms
- Track analytics and SEO rankings

### For Agencies
- Client WordPress site management
- Bulk content generation
- Multi-language content support

---

## 🔮 Future Enhancements

**Ready to implement:**
- Google Analytics API integration (replace mock data)
- Mailchimp API integration (email campaigns)
- Buffer API integration (social scheduling)
- WordPress publishing automation (direct from dashboard)
- Image generation (DALL-E integration)
- Content calendar view
- Multi-user support with authentication

---

## 💡 Tips & Best Practices

### AI Content Generation
- Be specific with topics for better results
- Use "Professional" tone for business content
- Use "Casual" tone for social media
- Use "Technical" tone for documentation
- Always review AI-generated content before publishing

### WordPress Management
- Check site status daily
- Monitor SEO scores
- Keep track of published pages
- Use quick login for fast access

### Performance
- Dashboard loads all sites in parallel (fast)
- AI generation takes 3-10 seconds per request
- Cache WordPress data to reduce API calls

---

**Built with Claude Code** | VarnaAI Portfolio 2025
