# Complaints Letter Generator

AI-powered complaint letter generation app for Bulgarian and German markets. Generates professional, legally-safe demand letters with multi-language support and platform recommendations.

## Features

- 🧙 **5-Step Wizard**: Guided form to collect complaint details
- 🤖 **AI Generation**: Local AI via Ollama (Llama 3.2 8B) for privacy-first letter generation
- 🌍 **Multi-Language**: Bulgarian, German, and English support
- 📊 **Platform Recommendations**: 17+ Bulgarian review platforms auto-recommended
- 🎨 **Dark Cyberpunk UI**: Modern design system from SEO Agent app
- 💾 **PostgreSQL Storage**: Complete data persistence for users, complaints, letters
- 📄 **PDF Export**: Professional letterhead format via jsPDF

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (dark cyberpunk theme)
- React Hook Form + Zod (form validation)
- React Router (navigation)
- Lucide React (icons)

### Backend
- Node.js + Express + TypeScript
- PostgreSQL 15+ (data persistence via postgres-c3 MCP)
- Ollama MCP (local AI - Llama 3.2 8B model)

### MCP Integrations
- **Task Master MCP**: Project management and task orchestration
- **Ollama MCP**: Local AI letter generation (privacy-first)
- **PostgreSQL MCP (postgres-c3)**: Database operations
- **Playwright MCP**: E2E testing and form validation
- **Exa MCP**: German platform research
- **Context7 MCP**: Legal framework references

## Project Structure

```
D:\VarnaAI\complaints-generator\
│
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── ComplaintWizard.tsx  # Main wizard orchestrator
│   │   │   ├── WizardStep1.tsx      # Complaint type selection
│   │   │   ├── WizardStep2.tsx      # Party details
│   │   │   ├── WizardStep3.tsx      # Problem description
│   │   │   ├── WizardStep4.tsx      # Evidence & attempts
│   │   │   └── WizardStep5.tsx      # Tone & language
│   │   ├── types/
│   │   │   └── complaint.ts    # TypeScript type definitions
│   │   ├── App.tsx             # Main app component
│   │   ├── index.css           # Tailwind + custom cyberpunk styles
│   │   └── main.tsx            # React entry point
│   ├── tailwind.config.js      # Dark cyberpunk theme config
│   └── package.json
│
├── backend/                    # Express + TypeScript backend
│   ├── src/
│   │   ├── routes/             # API route handlers
│   │   ├── controllers/        # Business logic controllers
│   │   ├── services/           # Service layer (AI, DB)
│   │   ├── models/             # Data models
│   │   ├── middleware/         # Express middleware
│   │   ├── utils/
│   │   │   └── db.ts           # PostgreSQL connection pool
│   │   └── index.ts            # Express server entry point
│   ├── database/
│   │   ├── schema.sql          # PostgreSQL schema
│   │   └── seed-platforms.sql  # Bulgarian platform seed data
│   ├── .env.example            # Environment variables template
│   ├── tsconfig.json           # TypeScript configuration
│   └── package.json
│
├── .taskmaster/                # Task Master MCP project data
│   ├── tasks/
│   │   └── tasks.json          # Task tracking
│   └── docs/
│       └── prd.txt             # Product Requirements Document
│
└── README.md                   # This file
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 15+
- Ollama (for local AI) - [Download](https://ollama.ai)
- Task Master MCP (installed via Claude)

### 1. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Database Setup

**Create PostgreSQL database:**
```sql
CREATE DATABASE complaints_db;
```

**Run schema:**
```bash
psql -U postgres -d complaints_db -f backend/database/schema.sql
```

**Seed platform data:**
```bash
psql -U postgres -d complaints_db -f backend/database/seed-platforms.sql
```

### 3. Configure Environment Variables

**Backend `.env`:**
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your PostgreSQL credentials:
```
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DATABASE=complaints_db
OLLAMA_API_URL=http://localhost:11434
```

### 4. Install Ollama Model

```bash
ollama pull llama3.2:8b
```

### 5. Run Development Servers

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
Server runs on http://localhost:4000

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
App runs on http://localhost:5173

## Database Schema

### Main Tables

- **users**: User accounts and authentication
- **complaints**: Complaint form data (all 5 wizard steps)
- **letters**: AI-generated letters with versioning
- **platform_recommendations**: Review platform suggestions
- **templates**: Letter templates and platform data
- **analytics**: Usage tracking and metrics

### Indexes

- Optimized queries on `user_id`, `complaint_id`, `letter_id`
- Time-based analytics indexing

## API Endpoints (Planned)

### Complaints
- `POST /api/complaints` - Save complaint form data
- `GET /api/complaints/:id` - Retrieve complaint by ID
- `PUT /api/complaints/:id` - Update complaint

### Letter Generation
- `POST /api/generate` - Generate letter via Ollama
- `GET /api/letters/:id` - Retrieve generated letter
- `GET /api/letters/:id/pdf` - Export letter as PDF

### Platforms
- `GET /api/platforms` - Get all platforms
- `GET /api/platforms/recommend` - Get recommendations based on complaint type

## Design System

### Color Palette (Dark Cyberpunk Theme)

**Dark Mode (Primary):**
- Background: `#0d0b1a` (Deep dark blue)
- Surface: `#16123a` (Dark blue-purple)
- Card: `#1e1749` (Medium blue-purple)
- Border: `#2d2476` (Bright blue-purple)
- Primary Accent: `#7c3aed` (Purple - WCAG AA compliant)
- Success: `#00ff88` (Neon green)
- Warning: `#ffaa00` (Amber)
- Error: `#ff4444` (Red)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Mono Font**: JetBrains Mono

### Effects
- Gradient backgrounds (cyberpunk + neural)
- Glow effects (purple/blue halos)
- Liquid ether background animation

## Development Workflow

### Task Management (Task Master MCP)

View tasks:
```bash
tm get-tasks
```

Update task status:
```bash
tm set-status 1 done
```

Add new task:
```bash
tm add-task "Task description"
```

### Testing

**Frontend (planned):**
- Unit tests: Vitest
- E2E tests: Playwright MCP

**Backend (planned):**
- API tests: Jest + Supertest
- Database tests: PostgreSQL test database

## Deployment (Future)

- Frontend: Cloudflare Pages
- Backend: Cloudflare Workers (Edge runtime)
- Database: PostgreSQL on Supabase or Railway
- AI: Ollama self-hosted or OpenAI/Claude API for premium tier

## Roadmap

### Phase 1: MVP (Current)
- [x] React + Vite + TypeScript project
- [x] Dark cyberpunk design system
- [x] 5-step wizard form
- [x] Express + TypeScript backend
- [x] PostgreSQL schema
- [ ] Ollama integration for letter generation
- [ ] Platform recommendation engine
- [ ] PDF export functionality

### Phase 2: Enhanced Features
- [ ] User authentication (JWT)
- [ ] Letter history and drafts
- [ ] Multi-language content (BG/DE/EN)
- [ ] Template library
- [ ] Analytics dashboard

### Phase 3: Testing & Polish
- [ ] Playwright E2E tests
- [ ] Multi-language testing
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Mobile responsiveness

### Phase 4: Premium Features
- [ ] OpenAI/Claude integration (premium tier)
- [ ] Lawyer review service
- [ ] Automated follow-ups
- [ ] Evidence storage vault

## MCP Server Configuration

Task Master is configured to use OpenAI-compatible API with Opus model for task generation. See `.taskmaster/` directory for project configuration.

## Contributing

This is a VarnaAI portfolio project. For questions or issues, contact the project owner.

## License

Proprietary - All rights reserved © 2025 VarnaAI

## Privacy & Security

- **Local AI First**: Ollama processes data on-device for privacy
- **GDPR Compliant**: Minimal data collection, encryption at rest
- **No Personal Names**: Anonymous complaint generation option
- **Legal Safety**: AI generates factual, defensible language only

---

**Built with ❤️ using Claude Code and Task Master MCP**