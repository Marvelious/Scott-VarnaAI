# Task ID: 48

**Title:** C3 Bulgarian Language Toggle - Deploy bg.json and Implement Language Switcher

**Status:** pending

**Dependencies:** 13 ✓, 35 ✓

**Priority:** high

**Description:** Deploy the existing bg.json Bulgarian translation file to the C3 Compliance React app and implement a language switcher UI component with EN/DE/BG flags in the header. Deploy via Docker to Hetzner VPS.

**Details:**

**Context:** C3 app at D:\VarnaAI\dashboard. Live at https://c3.varnaai.com/. Tech: React 18 + TypeScript. Per CLAUDE.md: bg.json created locally but NOT deployed yet.

**Phase 1: Translation File Setup**
1. Locate existing bg.json in D:\VarnaAI\dashboard (likely src/locales/)
2. Verify coverage against en.json/de.json for all UI strings
3. Structure: src/locales/{en,de,bg}.json + src/i18n/i18n.ts

**Phase 2: React-i18next Configuration**
1. Install react-i18next and i18next if not present
2. Create i18n config with browser detection + localStorage persistence
3. Wrap App with I18nextProvider

**Phase 3: Language Switcher Component**
```typescript
// src/components/LanguageSwitcher.tsx
const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'bg', label: 'Български', flag: '🇧🇬' }
];
```
- Dropdown in header, persist to localStorage
- Keyboard accessible with ARIA labels

**Phase 4: UI Integration**
- Replace hardcoded strings with t() calls
- Add switcher to Header component (top-right)
- Tailwind CSS styling to match C3 design

**Phase 5: Docker Deployment**
```bash
cd D:\VarnaAI\dashboard
npm run build
docker-compose up -d --build c3
```
Verify at https://c3.varnaai.com/?lang=bg

**Phase 6: Bulgarian Market Readiness**
- BGN currency display (лв) for pricing
- NIS2 Bulgarian terminology (Директива за киберсигурност)
- Sample Bulgarian compliance report for demos

**Test Strategy:**

1. **Translation Coverage**: bg.json has 100% key parity with en.json/de.json
2. **Switcher UI**: Flags display, clicking changes language, persists on refresh
3. **Deployment**: https://c3.varnaai.com/ loads, switcher visible, no console errors
4. **Bulgarian Flow**: Complete scan → results → pricing journey in Bulgarian
5. **Pricing**: BGN currency (лв) shows when BG selected
6. **Mobile**: Responsive dropdown works on mobile viewport
