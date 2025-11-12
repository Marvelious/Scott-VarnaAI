# WordPress Content Creation Automation Rules

## Quick Reference Workflow

### 🚨 MANDATORY SEQUENCE 🚨
```
1. Create blank WordPress page
2. STOP → Wait for Big Dick to add Kadence design blocks
3. Big Dick confirms "design blocks added"
4. ONLY THEN → Fill text areas with content
5. Optimize for SEO (600+ words, focus keyword, external link)
6. Save and verify (80+/100 SEO score)
```

## Automation Checkpoints

### Before Starting ANY Page
- [ ] Verify correct WordPress site logged in
- [ ] Check post ID matches user's instructions
- [ ] Confirm this is a NEW page or existing page with design
- [ ] **CRITICAL**: If new page, STOP after creation and wait for design

### After Page Creation (New Pages Only)
- [ ] **DO NOT** add any content yet
- [ ] Notify Big Dick: "Blank page created at [URL], ready for design"
- [ ] **WAIT** for confirmation: "design blocks added" or similar
- [ ] Verify design blocks are visible in editor before proceeding

### During Content Creation
- [ ] Identify all empty text areas in Kadence blocks
- [ ] Write content top-to-bottom, left-to-right
- [ ] Save after each major section (click "Aktualisieren")
- [ ] Never modify images, buttons, or block structure
- [ ] Track word count (visible in Rank Math panel)

### SEO Optimization Checklist
- [ ] **Word count**: 600+ words minimum
- [ ] **Focus keyword**: Appears at beginning of second/third paragraph
- [ ] **External link**: At least 1 DoFollow link to authoritative source (BSI for German sites)
- [ ] **Internal links**: Link to other pages on same site
- [ ] **Keyword density**: 0.8-0.9% (Rank Math shows this)
- [ ] **H2/H3 headings**: Include focus keyword in at least one heading

### Final Verification
- [ ] SEO score: 80+/100 in Rank Math
- [ ] All text blocks filled (no empty areas)
- [ ] Content is German for .de sites
- [ ] External link opens in new tab (DoFollow)
- [ ] No images added or modified
- [ ] Page saved successfully ("Aktualisieren" clicked)

## Common Automation Patterns

### Pattern 1: Fill Hero Section
```
Hero Block (Kadence):
├─ Title: Already set by Big Dick (don't change)
├─ Description: 2-3 sentences, value proposition
└─ Button: Already set by Big Dick (don't change)

Action: Only fill description if empty
```

### Pattern 2: Fill Feature Blocks
```
Features (Usually 3-4 blocks):
├─ Icon: Set by Big Dick (don't change)
├─ Heading: May need content
└─ Description: 2-4 sentences per feature

Action: Fill all descriptions with relevant technical details
```

### Pattern 3: Add Focus Keyword at Beginning
```
Target: Second or third paragraph
Format: "[Focus Keyword] verbindet/bietet/ermöglicht [rest of sentence]..."

Example:
"IT-Sicherheit Projektmanagement verbindet technische Expertise mit
professionellem Projektmanagement: Von Penetrationstests über
Compliance-Audits..."
```

### Pattern 4: Insert External Link
```
Target: Paragraph discussing standards/regulations
Format: Natural sentence with inline link

German Sites: Link to BSI, BfDI, or official EU sites
Anchor Text: Natural phrase (not "click here" or "mehr info")

Example:
"Weiterführende Informationen zu Sicherheitsstandards erhalten Sie beim
Bundesamt für Sicherheit in der Informationstechnik."
[Link: https://www.bsi.bund.de]
```

## Automation Error Prevention

### Error: Started Content Before Design
**Prevention**: Always check if page has Kadence blocks before writing
**Detection**: Empty page with only Gutenberg default blocks
**Fix**: Stop immediately, notify Big Dick, wait for design blocks

### Error: Wrong Page Being Edited
**Prevention**: Verify post ID in URL matches user's instruction
**Detection**: User says "wtf are you doing" or "wrong page"
**Fix**: Navigate to correct post ID provided by user

### Error: SEO Score Won't Improve
**Complete Rank Math Error Reference**:

**🔴 CRITICAL ERRORS (Must Fix)**:

1. **"Das Fokus-Schlüsselwort wurde nicht in der URL gefunden"**
   - **Fix**: URL slug must contain focus keyword separated by hyphens
   - Example: Focus keyword "Enterprise Projektmanagement" → URL: `/enterprise-projektmanagement`
   - Big Dick handles URL slugs in Rank Math settings

2. **"Das Fokus-Schlüsselwort erscheint nicht am Anfang deines Inhalts"**
   - **Fix**: Start paragraph 2 or 3 with EXACT focus keyword phrase
   - Template: `[Focus Keyword] verbindet/bietet/ermöglicht [rest of content]...`
   - Example: `Enterprise Projektmanagement verbindet globale Teams mit KI-gestützter Koordination...`

3. **"Das Fokus-Schlüsselwort erscheint nicht im Inhalt"**
   - **Fix**: Use focus keyword 3-5 times naturally throughout content
   - Locations: Paragraph 2/3 (beginning), one H2/H3 heading, 1-2 body paragraphs
   - **Keyword density target**: 0.8-0.9% (Rank Math calculates automatically)

4. **"Dein Inhalt ist [X] Wörter lang. Erwäge, mindestens 600 Wörter zu verwenden"**
   - **Fix**: Expand content to 600+ words minimum (target: 600-650)
   - Strategy: Expand feature descriptions, add use cases, technical details
   - Don't add fluff - every sentence must provide value

5. **"Das Fokus-Schlüsselwort ist nicht in Zwischenüberschrift(en) wie H2, H3, H4"**
   - **Fix**: Include focus keyword in at least ONE heading (H2 or H3)
   - Example: `## Enterprise Projektmanagement für globale Teams`
   - Natural integration - don't force keyword into every heading

6. **"Es wurden keine ausgehenden Links gefunden"**
   - **Fix**: Add 1-2 DoFollow external links to authoritative sources
   - German sites: BSI (https://www.bsi.bund.de), BfDI, official EU sites
   - Format: Natural sentence with inline link, anchor text NOT "click here"
   - Example: `"Weiterführende Informationen zu Sicherheitsstandards erhalten Sie beim Bundesamt für Sicherheit in der Informationstechnik."`

**🟡 OPTIONAL IMPROVEMENTS** (Big Dick Handles):

7. **"Füge ein Bild mit deinem Fokus-Schlüsselwort als Alt-Text hinzu"**
   - Big Dick adds images - NOT Claude
   - Note: Claude never modifies images

8. **"Dein Titel enthält kein power word"**
   - Big Dick optimizes SEO titles in Rank Math
   - Power words: revolutioniert, maximale, kritische, bewährte, garantiert
   - Example: `Enterprise Projektmanagement: 5 kritische Funktionen für globale Skalierung`

9. **"Dein SEO-Titel enthält keine Zahl"**
   - Big Dick adds numbers to SEO titles
   - Examples: "5 Funktionen", "3 Strategien", "10 Vorteile"
   - Increases click-through rate

**Quick Fix Checklist**:
- [ ] Focus keyword in URL slug ← Big Dick
- [ ] Focus keyword at START of paragraph 2/3 ← Claude
- [ ] Focus keyword used 3-5 times in content ← Claude
- [ ] Focus keyword in one H2/H3 heading ← Claude
- [ ] 600+ words total content ← Claude
- [ ] 1-2 external DoFollow links (BSI, etc.) ← Claude
- [ ] Power word in SEO title ← Big Dick
- [ ] Number in SEO title ← Big Dick
- [ ] Images with keyword alt text ← Big Dick

### Error: File Chooser Modal Blocking
**Prevention**: Don't click image upload areas
**Detection**: Modal overlay appears with file browser
**Fix**: `browser_file_upload({ paths: [] })` to dismiss

## Content Templates

### German Security/Compliance Sites (ai-projektmanager.de, varna-agenten.de)

**Paragraph 2 Template** (Focus Keyword Introduction):
```
[Focus Keyword] verbindet [concept A] mit [concept B]: Von [use case 1] über
[use case 2] nach [standard] bis hin zu [use case 3] gemäß [regulation] –
unser KI-gestützter [product] bietet [target audience] die Werkzeuge, um
[goal] zu [action] und alle gesetzlichen Anforderungen zu erfüllen.
```

**Paragraph 3 Template** (External Link):
```
Unsere Plattform wurde speziell für die hohen Anforderungen von [target audience]
entwickelt. Mit [feature 1], [feature 2] und [feature 3] erfüllen Sie alle
gesetzlichen Vorgaben – von DSGVO bis NIS2. Weiterführende Informationen zu
[topic] erhalten Sie beim Bundesamt für Sicherheit in der Informationstechnik.
```

**Feature Description Template**:
```
[Feature Name]
[Technical capability or benefit in 1 sentence]. [How it helps the user in
1 sentence]. [Specific outcome or metric if available].
```

**Info Box Template** (Trust Signals):
```
[Certification Type]
[Standard 1], [Standard 2] und [Standard 3]-zertifiziert. [Brief explanation
of what this means for the customer]. [Compliance outcome or guarantee].
```

## Automation Decision Trees

### When to Wait vs. Proceed
```
New page creation requested?
├─ YES → Create blank page → STOP → Wait for design confirmation
└─ NO → Existing page with design?
    ├─ YES → Proceed with content creation
    └─ NO → Ask Big Dick "Should I wait for design blocks?"
```

### Content Length Decision
```
Current word count?
├─ < 500 words → Add more content to all sections
├─ 500-599 words → Expand 2-3 sections to reach 600+
├─ 600-650 words → Perfect, finalize
└─ > 650 words → Good, but check for fluff/redundancy
```

### SEO Score Decision
```
Current SEO score?
├─ < 60 → Critical issues → Check focus keyword, links, word count
├─ 60-79 → Good → Minor optimizations needed
├─ 80-89 → Excellent → Publish ready
└─ 90-100 → Perfect → Publish immediately
```

## Automation Metrics

### Target Performance
- **Page Creation**: 1-2 minutes (blank page + notify Big Dick)
- **Content Writing**: 5-10 minutes (600 words across blocks)
- **SEO Optimization**: 2-3 minutes (keyword placement, external link)
- **Total per Page**: 8-15 minutes (after design blocks added)

### Quality Gates
- **Word Count**: Must exceed 600 (target: 600-650)
- **SEO Score**: Must reach 80+ (target: 85+)
- **Keyword Density**: 0.8-0.9% (Rank Math calculates)
- **External Links**: Minimum 1 DoFollow
- **Empty Blocks**: Zero (all text areas filled)

## Site-Specific Rules

### ai-projektmanager.de (German)
- Language: German (formal, professional)
- Focus: DSGVO, NIS2, BSI IT-Grundschutz, ISO 27001
- External Links: BSI (https://www.bsi.bund.de), BfDI
- Tone: Technical, authoritative, compliance-focused
- Keywords: Sicherheit, Compliance, KI, Projektmanagement

### aimarketingbg.com (English/Bulgarian)
- Language: Primarily English (Bulgarian for specific sections)
- Focus: AI marketing, automation, digital transformation
- External Links: Industry authorities, marketing associations
- Tone: Modern, innovative, results-driven
- Keywords: AI marketing, automation, ROI, campaigns

### classicsecurity.net (English)
- Language: English (UK spelling)
- Focus: Physical security, access control, surveillance
- External Links: Security industry standards, certifications
- Tone: Professional, trustworthy, experienced
- Keywords: Security, protection, monitoring, safety

### varna-agenten.de (German)
- Language: German (formal, professional)
- Focus: AI agents, automation, intelligent systems
- External Links: German AI authorities, research institutions
- Tone: Technical, innovative, future-focused
- Keywords: KI-Agenten, Automatisierung, Intelligenz

### varnaai.com (English)
- Language: English (US spelling)
- Focus: AI services, consulting, implementation
- External Links: AI research, industry leaders
- Tone: Expert, approachable, results-oriented
- Keywords: AI, artificial intelligence, automation, solutions

## Standard Portfolio Page Types

All 5 portfolio sites use these page types:
- **Home** - Homepage/landing page
- **About** - Company/service information
- **Kontakt** - Contact page
- **Services** - Service offerings
- **Portfolio** - Case studies, projects, success stories
- **Gallery** - Visual showcase
- **Team** - Team members

## Remaining Work Queue (AI Projektmanager.de)

| Status | Page | Type | URL | Notes |
|--------|------|------|-----|-------|
| ✅ | IT-Sicherheit | Services | /anwendungsfaelle/it-sicherheit | 605 words, 86/100 SEO |
| ✅ | Compliance | Services | /anwendungsfaelle/compliance | COMPLETED |
| ✅ | Enterprise | Services | /anwendungsfaelle/enterprise | COMPLETED |
| 🔄 | Fallstudien | Portfolio | /fallstudien | Blank created, waiting for design |
| ⏳ | Integrationen | Services | /integrationen | Not started |
| ⏳ | EU AI Act | Services | /eu-ai-act | Not started |
| ⏳ | DSGVO | Services | /dsgvo-konform | Not started |

## After All Pages Complete

1. **Add portfolio footer cross-links** to all 5 sites
2. **Clear WordPress cache** on each site
3. **Verify all pages** load correctly
4. **Run SEO audit** across all new pages
5. **Report completion** to Big Dick with metrics

## Emergency Protocols

### If Uncertain About Design
**STOP → Ask Big Dick**: "Have you added the design blocks for [page]?"

### If SEO Won't Optimize
**STOP → Report to Big Dick**: "SEO stuck at [score]/100, need help with [issue]"

### If Content Direction Unclear
**STOP → Ask Big Dick**: "What should be the focus for [topic]?"

### If Wrong Page/Site
**STOP → Verify with Big Dick**: "Confirming I should work on [post ID] for [page name]?"

## Success Criteria

**Page Considered Complete When**:
- ✅ 600+ words of content
- ✅ 80+/100 SEO score
- ✅ Focus keyword at beginning
- ✅ External authoritative link added
- ✅ All text blocks filled
- ✅ No empty content areas
- ✅ Saved successfully in WordPress
- ✅ Big Dick confirms completion

**DO NOT** proceed to next page until current page meets ALL criteria above.
