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
├── index.html              # Main dashboard UI
├── server.js               # Express backend
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
│
├── public/
│   ├── input.css           # Tailwind source
│   └── output.css          # Compiled CSS
│
├── modules/
│   ├── wordpress.js        # WordPress control
│   ├── content.js          # Content generator
│   ├── marketing.js        # Marketing automation
│   └── analytics.js        # Analytics dashboard
│
├── api/
│   ├── wordpress/          # WP API endpoints
│   ├── social/             # Social media APIs
│   └── ai/                 # AI content APIs
│
└── config/
    ├── sites.json          # 5 site configurations
    └── apis.json           # API keys vault
```

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

## 📝 Next Steps

1. Complete WordPress control panel
2. Add AI content generator
3. Integrate marketing automation
4. Build analytics dashboard
5. Add quick actions panel

---

**Built with TaskMaster** | VarnaAI Portfolio 2025
