# VarnaAI Control Dashboard

Modern SaaS-style control center for managing 5 WordPress portfolio sites and marketing automation.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd D:/VarnaAI/Websites/dashboard
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Build Tailwind CSS
```bash
npm run build:css
```

### 4. Start Server
```bash
npm start
```

### 5. Open Dashboard
```
http://localhost:3333
```

---

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#0066cc` - Main actions, links
- **Purple Gradient**: `#667eea → #764ba2` - Headers, highlights
- **Dark Background**: `#2d3748` - Main background
- **Success Green**: `#48bb78` - Success states
- **Alert Red**: `#ff6b6b` - Errors, warnings

### Technology Stack
- **Frontend**: HTML5, Tailwind CSS, Alpine.js
- **Backend**: Express.js, Node.js
- **Charts**: Chart.js
- **Design**: Modern SaaS dark theme

---

## 📁 Project Structure

```
dashboard/
├── index.html              # Main dashboard UI (all frontend)
├── server.js               # Express backend (all API endpoints)
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── .env.example            # Environment variable template
│
├── public/
│   ├── input.css           # Tailwind source
│   └── output.css          # Compiled CSS (generated)
│
└── config/
    └── sites.json          # 5 WordPress site configurations
```

**Architecture**: Monolithic single-file app - all backend logic in `server.js`, all frontend in `index.html`.

---

## 🌐 Managed Sites

1. **ai-projektmanager.de** - German AI Project Management
2. **aimarketingbg.com** - AI Marketing (EN/BG)
3. **classicsecurity.net** - Security Services
4. **varna-agenten.de** - AI Agents (German)
5. **varnaai.com** - AI Services

---

## 🛠️ Features

### WordPress Control
- Quick login to all 5 sites
- Page creation tracking
- SEO score monitoring
- Content health dashboard

### Content Generation
- AI blog post writer
- Social media content
- Email campaigns
- Multi-language (DE/EN/BG)

### Marketing Automation
- Mailchimp email lists
- Buffer social scheduling
- Campaign launcher
- Lead tracking

### Analytics
- Google Analytics 4
- Real-time visitors
- Keyword rankings
- Social engagement

---

## 🔧 Development

```bash
# Watch Tailwind CSS changes
npm run build:css

# Run with auto-reload
npm run dev
```

---

## ✅ Features Complete

All core features implemented:
- ✅ WordPress REST API integration (real-time data from 5 sites)
- ✅ OpenAI GPT-4 content generation (blog, social, email)
- ✅ Marketing automation endpoints
- ✅ Analytics dashboard with Chart.js
- ✅ Quick actions panel (complaint letters, SEO audit, analytics export)
- ✅ Toast notifications and loading states

---

## 🔐 Security

- All credentials stored in `.env` (excluded from git)
- Environment variables for API keys
- No hardcoded passwords or sensitive data

---

**VarnaAI Portfolio 2025** | Built with Claude Code
