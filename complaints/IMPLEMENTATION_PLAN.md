# Complaints Generator - Implementation Plan

**Project**: Complaints Letter Generator (BG + DE markets)
**Status**: Planning Phase
**Date**: 2025-01-12
**Owner**: VarnaAI Portfolio

---

## AI Provider Decision (CRITICAL)

### Option 1: OpenAI GPT-4
**Pros**:
- Excellent multilingual support (Bulgarian, German, English)
- High-quality formal letter generation
- Reliable API, good documentation
- Best for complex legal phrasing

**Cons**:
- **EXPENSIVE**: ~$0.03 per letter (assuming 1K input + 1K output tokens)
- User data sent to OpenAI servers (privacy concern)
- Requires OpenAI API key (setup barrier for users)
- Monthly costs scale with usage

**Best For**: Premium tier users, high-stakes complaints

---

### Option 2: Anthropic Claude
**Pros**:
- Excellent multilingual capabilities
- Strong at formal/professional writing
- Slightly cheaper than GPT-4
- Good API reliability

**Cons**:
- Still **EXPENSIVE**: ~$0.025 per letter
- User data sent to Anthropic servers
- Requires API key setup
- Monthly costs scale with usage

**Best For**: Premium tier, alternative to OpenAI

---

### Option 3: Ollama (LOCAL AI) ⭐ **RECOMMENDED FOR MVP**
**Pros**:
- **100% FREE** - No API costs
- **Privacy-first** - User data NEVER leaves their machine
- **No API keys required** - Lower barrier to entry
- Available models:
  - **Llama 3.2 8B** - Best for Bulgarian/German
  - **Mistral 7B** - Fast, decent quality
  - **Qwen 2.5** - Good multilingual support
- Can run on user's local machine OR our server
- Perfect for Bulgarian/German privacy regulations

**Cons**:
- Quality slightly lower than GPT-4 (but good enough for formal letters)
- Requires Ollama installation (or we host it)
- Slower than API calls (5-10 seconds vs 2-3 seconds)
- May struggle with very complex legal phrasing

**Best For**: MVP, free tier, privacy-conscious users

---

### Option 4: Studio LM (LOCAL AI - GUI)
**Pros**:
- Same privacy benefits as Ollama
- User-friendly GUI for model management
- Same model selection (Llama, Mistral, etc.)

**Cons**:
- Requires desktop app installation
- Less suitable for web app integration
- Better for power users, not general public

**Best For**: Not ideal for this use case (web app needs API, not GUI)

---

### Option 5: Hybrid Approach ⭐ **BEST LONG-TERM**
**Architecture**:
1. **Default (Free)**: Ollama on our server (self-hosted)
2. **Premium**: OpenAI GPT-4 or Claude API
3. **Privacy Mode**: User's local Ollama (advanced users only)

**Costs**:
- **Server**: €20/month VPS (Hetzner CPX31) can handle 500+ requests/day
- **Premium**: €9.99/month subscription unlocks GPT-4 letters

**Benefits**:
- Free tier attracts users (Ollama server-side)
- Premium tier covers API costs (GPT-4 for critical letters)
- Privacy-conscious users can self-host (local Ollama)
- Scalable architecture

---

## AI Provider Comparison Table

| Feature | OpenAI GPT-4 | Claude | Ollama (Server) | Ollama (Local) |
|---------|--------------|--------|-----------------|----------------|
| **Cost per letter** | $0.03 | $0.025 | $0.00 | $0.00 |
| **Quality** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Speed** | 2-3s | 2-3s | 8-12s | 5-10s |
| **Privacy** | ❌ (Cloud) | ❌ (Cloud) | ✅ (Our server) | ✅ (User's PC) |
| **Setup** | API key | API key | None | Install Ollama |
| **Bulgarian** | ✅ Excellent | ✅ Excellent | ✅ Good | ✅ Good |
| **German** | ✅ Excellent | ✅ Excellent | ✅ Good | ✅ Good |
| **Scalability** | ∞ | ∞ | 500/day | N/A |

---

## Recommended Architecture (MVP)

### Phase 1: Free Tier Only (Ollama Server-Hosted)
```
User Browser → React App → Backend API → Ollama (our server) → Generated Letter
```

**Infrastructure**:
- **Frontend**: Cloudflare Pages (free)
- **Backend**: Hetzner VPS CPX31 (€10.69/month)
  - 4 vCPU, 8GB RAM (enough for Llama 3.2 8B)
  - Node.js + Express API
  - Ollama running Llama 3.2 8B model
- **Database**: PostgreSQL (store templates, not user data)

**Cost**: ~€11/month total (vs €50-100/month with OpenAI for 1000 users)

---

### Phase 2: Freemium (Ollama + OpenAI Premium)
```
Free Users → Ollama (our server) → Good quality letters
Premium Users → OpenAI GPT-4 → Excellent quality letters
```

**Pricing**:
- **Free**: 2 letters/month with Ollama
- **Premium**: €9.99/month - unlimited GPT-4 letters + advanced features

**Cost Analysis** (1000 users, 10% premium):
- Free tier: 1800 letters/month × €0 = €0
- Premium tier: 100 users × €9.99 = €999/month revenue
- OpenAI costs: 100 users × 10 letters × €0.03 = €30/month
- **Net profit**: €969/month - €11 server = €958/month

---

## Project Structure

```
D:\VarnaAI\complaints-generator\
│
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
│
├── frontend/                      # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── wizard/            # Multi-step form
│   │   │   │   ├── Step1_ComplaintType.tsx
│   │   │   │   ├── Step2_PartyDetails.tsx
│   │   │   │   ├── Step3_ProblemDescription.tsx
│   │   │   │   ├── Step4_Evidence.tsx
│   │   │   │   └── Step5_ToneSelection.tsx
│   │   │   ├── LetterPreview.tsx
│   │   │   ├── PlatformList.tsx
│   │   │   └── PDFExport.tsx
│   │   ├── hooks/
│   │   │   └── useLetterGenerator.ts
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   └── pdfGenerator.ts
│   │   ├── types/
│   │   │   └── complaint.types.ts
│   │   ├── i18n/                  # Translations
│   │   │   ├── bg.json            # Bulgarian
│   │   │   ├── de.json            # German
│   │   │   └── en.json            # English
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── public/
│       └── assets/
│
├── backend/                       # Node.js + Express API
│   ├── src/
│   │   ├── routes/
│   │   │   └── letter.routes.ts
│   │   ├── services/
│   │   │   ├── ollama.service.ts  # Ollama integration
│   │   │   ├── openai.service.ts  # OpenAI integration (premium)
│   │   │   └── letterGenerator.service.ts
│   │   ├── prompts/
│   │   │   ├── bulgarian.prompts.ts
│   │   │   ├── german.prompts.ts
│   │   │   └── templates.ts
│   │   ├── middleware/
│   │   │   ├── rateLimit.ts
│   │   │   └── validation.ts
│   │   ├── utils/
│   │   │   └── platforms.ts       # Platform lists
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── shared/                        # Shared types/constants
│   └── types.ts
│
├── docs/                          # Documentation
│   ├── PRD-complaints-generator.md
│   ├── bulgarian-review-platforms.md
│   ├── german-review-platforms.md (TODO)
│   └── API.md
│
└── docker/                        # Deployment
    ├── Dockerfile.frontend
    ├── Dockerfile.backend
    └── docker-compose.yml
```

---

## Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **UI Library**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **i18n**: react-i18next (Bulgarian, German, English)
- **PDF Generation**: jsPDF or react-pdf
- **State Management**: Zustand (lightweight)
- **Hosting**: Cloudflare Pages

### Backend
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js
- **Language**: TypeScript
- **AI Integration**:
  - Ollama SDK (for free tier)
  - OpenAI SDK (for premium tier)
- **Database**: PostgreSQL 15 (templates only, no PII storage)
- **Rate Limiting**: express-rate-limit
- **Hosting**: Hetzner VPS CPX31

### DevOps
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Containerization**: Docker + Docker Compose
- **Monitoring**: (Future: Sentry, Plausible Analytics)

---

## Development Phases

### Phase 1: MVP - Free Tier Only (2-3 weeks)
**Goal**: Launch working app with Ollama backend

**Week 1: Frontend Foundation**
- [ ] Set up React + Vite + TypeScript project
- [ ] Build 5-step wizard form UI
- [ ] Implement form validation (React Hook Form + Zod)
- [ ] Add Bulgarian/German translations (react-i18next)
- [ ] Design responsive UI (Tailwind CSS)

**Week 2: Backend + AI Integration**
- [ ] Set up Express backend
- [ ] Install Ollama on development machine
- [ ] Create Bulgarian letter generation prompts
- [ ] Create German letter generation prompts
- [ ] Test Llama 3.2 8B quality for both languages
- [ ] Build API endpoint: `POST /api/generate-letter`
- [ ] Add platform list generator (based on complaint type + country)

**Week 3: Export + Testing**
- [ ] Implement PDF export (jsPDF)
- [ ] Add plain text export (copy to clipboard)
- [ ] Test with real complaint scenarios (George case)
- [ ] Fix Bulgarian/German grammar issues
- [ ] Deploy to Hetzner VPS
- [ ] Deploy frontend to Cloudflare Pages
- [ ] User testing with 5-10 real users

---

### Phase 2: Freemium + Premium (1-2 weeks)
**Goal**: Add OpenAI GPT-4 for premium users

**Tasks**:
- [ ] Add user authentication (JWT)
- [ ] Implement subscription system (Stripe)
- [ ] Add OpenAI GPT-4 integration
- [ ] Build tier selection UI (Free vs Premium)
- [ ] Add usage limits (2 letters/month for free)
- [ ] Email delivery system (optional)

---

### Phase 3: Advanced Features (2-3 weeks)
**Goal**: Enhance user experience and retention

**Tasks**:
- [ ] Save draft letters (requires auth)
- [ ] Letter template library
- [ ] Success stories section (user submissions)
- [ ] Legal escalation timeline generator
- [ ] Photo upload for evidence attachment
- [ ] Lawyer directory (Bulgarian + German)

---

## AI Prompt Engineering

### Bulgarian Complaint Letter Prompt Template
```typescript
const bulgarianPrompt = `
Ти си опитен юрист, специализиран в потребителско право в България.

ЗАДАЧА: Генерирай формално писмо за рекламация на български език.

ДЕТАЙЛИ НА ЖАЛБАТА:
- Тип жалба: ${complaintType}
- Бизнес/Лице: ${businessName}
- Проблем: ${problemDescription}
- Договор сключен на: ${contractDate}
- Платена сума: ${amountPaid} лв.
- Искана сума за връщане: ${refundAmount} лв.
- Опити за контакт: ${contactAttempts}

ТОН НА ПИСМОТО: ${tone}
- "Professional": Формално, неутрално, бизнес-подобно
- "Firm": Директни искания, споменаване на последици
- "Aggressive": Силен език, правни заплахи, предупреждение за отзиви
- "Maximum": Всички правни опции, Комисия за защита на потребителите, съдебни действия

СТРУКТУРА НА ПИСМОТО:
1. Дата и заглавие
2. До: [Име на бизнес/лице]
3. Относно: Рекламация за незавършена работа/услуга
4. Уводен параграф (референция към договор)
5. Описание на проблема (само факти)
6. Списък на доказателства
7. Искания (сума за връщане, краен срок)
8. Последици при непълнение:
   ${tone === 'Aggressive' || tone === 'Maximum' ? `
   - Публикуване на фактически отзиви със снимки на следните платформи:
     * Google Reviews
     * Facebook (бизнес страница + локални групи)
     * MaistorPlus
     * Remonti.bg
     * BG-Mamma форум
   ` : ''}
   ${tone === 'Maximum' ? `
   - Жалба до Комисията за защита на потребителите (КЗП)
   - Гражданска/правна процедура
   ` : ''}
9. Заключение
10. Подпис

ПРАВИЛА:
- Използвай САМО факти, НИКАКВИ обиди
- Всички заплахи трябва да са законни и защитими
- Формален бизнес език
- Без емоционален език
- Ясна структура и параграфи

Генерирай писмото:
`;
```

### German Complaint Letter Prompt Template
```typescript
const germanPrompt = `
Sie sind ein erfahrener Anwalt, spezialisiert auf Verbraucherrecht in Deutschland.

AUFGABE: Erstellen Sie ein formelles Beschwerdebrief auf Deutsch.

BESCHWERDEDETAILS:
- Beschwerdetyp: ${complaintType}
- Unternehmen/Person: ${businessName}
- Problem: ${problemDescription}
- Vertrag geschlossen am: ${contractDate}
- Gezahlter Betrag: ${amountPaid} €
- Rückerstattungsbetrag: ${refundAmount} €
- Kontaktversuche: ${contactAttempts}

TONFALL: ${tone}
- "Professional": Formell, neutral, geschäftsmäßig
- "Firm": Direkte Forderungen, Konsequenzen erwähnt
- "Aggressive": Starke Sprache, rechtliche Drohungen, Bewertungswarnung
- "Maximum": Alle rechtlichen Optionen, Verbraucherzentrale, Gerichtsverfahren

STRUKTUR DES BRIEFES:
1. Datum und Betreff
2. An: [Name des Unternehmens/Person]
3. Betreff: Reklamation wegen unvollständiger Arbeiten/Dienstleistung
4. Einleitungsabsatz (Vertragsverweis)
5. Problembeschreibung (nur Fakten)
6. Liste der Beweise
7. Forderungen (Rückerstattungsbetrag, Frist)
8. Konsequenzen bei Nichterfüllung:
   ${tone === 'Aggressive' || tone === 'Maximum' ? `
   - Veröffentlichung sachlicher Bewertungen mit Fotodokumentation auf folgenden Plattformen:
     * Google Reviews
     * Facebook (Unternehmensseite + lokale Gruppen)
     * Trustpilot
     * ProvenExpert
     * [weitere deutsche Plattformen]
   ` : ''}
   ${tone === 'Maximum' ? `
   - Beschwerde bei der Verbraucherzentrale
   - Einleitung zivilrechtlicher Schritte
   ` : ''}
9. Schluss
10. Unterschrift

REGELN:
- Nur FAKTEN verwenden, KEINE Beleidigungen
- Alle Drohungen müssen legal und vertretbar sein
- Formale Geschäftssprache
- Keine emotionale Sprache
- Klare Struktur und Absätze

Erstellen Sie den Brief:
`;
```

---

## Platform List Generator Logic

### Bulgarian Contractor Platforms (Auto-Generated)
```typescript
const getBulgarianContractorPlatforms = () => [
  {
    name: 'Google Reviews',
    url: 'https://support.google.com/maps/answer/6230175',
    priority: 'HIGH',
    impact: '⭐⭐⭐⭐⭐'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com',
    priority: 'HIGH',
    impact: '⭐⭐⭐⭐⭐'
  },
  {
    name: 'MaistorPlus',
    url: 'https://maistorplus.com',
    priority: 'HIGH',
    impact: '⭐⭐⭐⭐⭐'
  },
  {
    name: 'Remonti.bg',
    url: 'https://remonti.bg',
    priority: 'HIGH',
    impact: '⭐⭐⭐⭐'
  },
  {
    name: 'BG-Mamma Forum',
    url: 'https://www.bg-mamma.com',
    priority: 'HIGH',
    impact: '⭐⭐⭐⭐'
  },
  // ... secondary platforms
];
```

---

## Success Metrics

### Technical Metrics
- **Letter generation time**: <10 seconds (Ollama) or <3 seconds (OpenAI)
- **Uptime**: 99.5%+
- **Error rate**: <1%
- **Mobile responsive**: 100%

### Business Metrics (3 months)
- **Users**: 500+ unique users
- **Letters generated**: 1,000+ letters
- **Conversion to premium**: 5-10%
- **User satisfaction**: 4.5+ stars

### Cost Metrics (per 1000 users/month)
- **Ollama only**: €11/month (server costs only)
- **Hybrid (10% premium)**: €999 revenue - €30 API - €11 server = **€958 profit/month**

---

## Risk Mitigation

### Legal Risks
- **Defamation**: AI filters ensure factual language only
- **Liability**: Clear disclaimer: "Not legal advice, consult lawyer for high-stakes cases"
- **GDPR**: Minimal data collection, no PII storage without consent

### Technical Risks
- **Ollama quality**: Test extensively with real complaints, compare to GPT-4
- **Server capacity**: Monitor usage, scale VPS if needed (CPX31 → CPX41)
- **API costs**: If premium tier grows, OpenAI costs scale linearly with revenue

---

## Next Steps (Decision Points)

### Big Dick, confirm these decisions:

1. **AI Provider for MVP**:
   - [ ] Ollama (self-hosted, free, privacy-first) ⭐ **RECOMMENDED**
   - [ ] OpenAI GPT-4 (expensive, highest quality)
   - [ ] Hybrid (Ollama free + GPT-4 premium)

2. **Project Location**:
   - [ ] `D:\VarnaAI\complaints-generator\` (new standalone project)
   - [ ] `D:\VarnaAI\Websites\complaints\` (keep with docs)

3. **Development Approach**:
   - [ ] Full MVP (all features) - 3 weeks
   - [ ] Minimal prototype (basic form + Ollama) - 1 week - test concept first
   - [ ] Phased build (frontend → backend → AI → export)

4. **Ollama Model**:
   - [ ] Llama 3.2 8B (best multilingual, 8GB RAM)
   - [ ] Mistral 7B (faster, decent quality, 6GB RAM)
   - [ ] Test both and pick winner

5. **Launch Strategy**:
   - [ ] Bulgarian market first (validate concept)
   - [ ] German market first (larger market)
   - [ ] Both markets simultaneously

**Once confirmed, I'll start building immediately.**

---

**Document Version**: 1.0
**Last Updated**: 2025-01-12
**Next Review**: After Big Dick's decisions
