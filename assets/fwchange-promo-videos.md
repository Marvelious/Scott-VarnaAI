# FwChange Promo Video Scripts & Shot Lists

## Video 1: Teaser (45-60 seconds)

### Target: LinkedIn, Twitter/X, Website hero

---

### SCRIPT (Voiceover)

```
[0:00-0:05] HOOK
"Your firewall team spends 5 days on a single change request.
What if it took 4 hours?"

[0:05-0:12] PROBLEM
"Manual processes. Spreadsheet tracking. Policy conflicts
discovered in production. Sound familiar?"

[0:12-0:25] SOLUTION DEMO
"FwChange uses AI to analyze your changes against
existing policies in milliseconds.
Conflicts detected. Auto-resolved. Deployed to 3 firewalls.
Jira ticket updated. Audit log recorded."

[0:25-0:40] PROOF
"97% faster deployments. Zero audit findings.
$2.1 million in annual savings.
Trusted by Fortune 500 security teams."

[0:40-0:50] INTEGRATIONS
"Works with Palo Alto, Check Point, Cisco, Fortinet,
AWS, Azure — and your existing ITSM."

[0:50-0:60] CTA
"FwChange. Firewall changes made simple.
Request your demo at fwchange.com"
```

---

### SHOT LIST (with timecodes)

| Time | Shot | Section | Notes |
|------|------|---------|-------|
| 0:00-0:05 | Hero section with "95% Faster" stat | Hook | Zoom slowly into stats |
| 0:05-0:12 | Before/After comparison (Before side) | Problem | Show red X items |
| 0:12-0:18 | CLI Demo - `fwchange analyze` command | Solution | Type animation |
| 0:18-0:22 | CLI Demo - Conflict detection + resolution | Solution | Highlight green checkmarks |
| 0:22-0:25 | CLI Demo - Deploy success | Solution | All 3 green checks |
| 0:25-0:32 | Case Study cards (Bank - 97%, $2.1M) | Proof | Pan across cards |
| 0:32-0:40 | Trust badges scroll | Proof | Fortune 500, ISO, SOC2, PCI |
| 0:40-0:50 | Integrations grid | Integrations | Slow zoom out |
| 0:50-0:60 | Hero section with CTA button | CTA | End on "Request Demo" |

---

### PLAYWRIGHT AUTOMATION SEQUENCE

```javascript
// Teaser video automation - smooth scroll sequence
async function teaserDemo(page) {
  // Shot 1: Hero with stats (5 sec)
  await page.goto('http://localhost:3003');
  await page.waitForTimeout(5000);

  // Shot 2: Scroll to Before/After (7 sec)
  await page.evaluate(() => {
    document.querySelector('h2')?.closest('section')?.scrollIntoView({behavior: 'smooth'});
  });
  await page.waitForTimeout(3000);
  // Continue scroll to Before/After
  await page.evaluate(() => window.scrollBy({top: 800, behavior: 'smooth'}));
  await page.waitForTimeout(4000);

  // Shot 3-5: CLI Demo section (13 sec)
  await page.click('a[href="#demo"]');
  await page.waitForTimeout(13000);

  // Shot 6-7: Case Studies (15 sec)
  await page.click('a[href="#case-studies"]');
  await page.waitForTimeout(8000);
  await page.evaluate(() => window.scrollBy({top: 300, behavior: 'smooth'}));
  await page.waitForTimeout(7000);

  // Shot 8: Integrations (10 sec)
  await page.evaluate(() => window.scrollTo({top: 4500, behavior: 'smooth'}));
  await page.waitForTimeout(10000);

  // Shot 9: Back to hero CTA (10 sec)
  await page.evaluate(() => window.scrollTo({top: 0, behavior: 'smooth'}));
  await page.waitForTimeout(10000);
}
```

---

## Video 2: Walkthrough (2-3 minutes)

### Target: YouTube, Website demo page, Sales presentations

---

### SCRIPT (Voiceover)

```
[0:00-0:15] INTRO
"Hi, I'm showing you FwChange — the enterprise platform
that transforms how security teams manage firewall changes.

Let me walk you through how it works."

[0:15-0:40] THE PROBLEM
"Most organizations struggle with firewall changes.
Manual spreadsheet tracking prone to errors.
Hours spent on each change request.
Policy conflicts discovered in production.
Audit prep that takes weeks.
And a different process for every vendor.

FwChange solves all of this."

[0:40-1:15] CORE FEATURE: AI CONFLICT DETECTION
"Here's where the magic happens.

When you submit a new firewall rule, our AI analyzes it
against your existing policies in milliseconds.

Watch: I'm adding a new rule for the 10.0.0.0/8 network.

The AI scans 847 existing rules...
Detects a potential conflict with rule 423...
Shows exactly what's conflicting...
And suggests a resolution automatically.

One command to deploy with auto-resolve.
Rule deployed to 3 firewalls.
Jira ticket updated.
Audit log recorded.

What used to take 5 days now takes 4 hours."

[1:15-1:45] MULTI-VENDOR SUPPORT
"FwChange works with your entire security stack.

Palo Alto Networks. Check Point. Cisco ASA and Firepower.
Fortinet FortiGate. AWS Security Groups. Azure NSG and Firewall.

One unified interface. Consistent policies across all vendors.
No more context-switching between management consoles."

[1:45-2:15] COMPLIANCE & AUDIT
"Compliance is built in, not bolted on.

Every change is logged with full traceability.
Who changed what, when, and why.
Linked to your Jira or ServiceNow tickets.

ISO 27001. PCI-DSS. SOX. HIPAA. GDPR. SOC 2.

Generate audit-ready reports instantly.
No more weeks of manual prep before audits."

[2:15-2:40] CUSTOMER RESULTS
"Don't take my word for it. Here's what our customers achieved:

A global investment bank reduced change cycle time by 97%
while maintaining SOX compliance across 200+ firewalls.

An automotive manufacturer unified 6 vendors
across 36 global sites with 85% less overhead.

A hospital network achieved HIPAA compliance
and reduced security incidents by 73%."

[2:40-3:00] CTA
"Ready to transform your firewall operations?

FwChange starts at $499 per month for small teams.
Enterprise plans include unlimited firewalls,
custom workflows, and dedicated support.

Visit fwchange.com to request your personalized demo.

FwChange. Firewall changes made simple."
```

---

### SHOT LIST (with timecodes)

| Time | Shot | Section | Notes |
|------|------|---------|-------|
| 0:00-0:15 | Hero section full view | Intro | Slow pan down |
| 0:15-0:25 | Before/After - Before side | Problem | Highlight each pain point |
| 0:25-0:40 | Before/After - After side | Problem/Solution | Show transformation |
| 0:40-0:50 | CLI Demo - Start | AI Demo | Type command slowly |
| 0:50-1:00 | CLI Demo - Analysis running | AI Demo | Highlight "847 rules" |
| 1:00-1:08 | CLI Demo - Conflict detected | AI Demo | Zoom on warning |
| 1:08-1:15 | CLI Demo - Resolution + deploy | AI Demo | Green checkmarks |
| 1:15-1:30 | Integrations grid - top row | Multi-vendor | Palo Alto, Check Point, Cisco, Fortinet |
| 1:30-1:45 | Integrations grid - bottom row | Multi-vendor | AWS, Azure, Jira, ServiceNow |
| 1:45-2:00 | Features section - Compliance card | Compliance | Zoom on compliance features |
| 2:00-2:15 | Trust badges | Compliance | Pan across certifications |
| 2:15-2:25 | Case Study - Bank card | Results | Highlight 97%, $2.1M |
| 2:25-2:32 | Case Study - Automotive card | Results | Highlight 6 vendors, 36 sites |
| 2:32-2:40 | Case Study - Healthcare card | Results | Highlight 73%, HIPAA |
| 2:40-2:50 | Pricing section | CTA | Show 3 tiers |
| 2:50-3:00 | Hero with Request Demo button | CTA | End on button hover |

---

### PLAYWRIGHT AUTOMATION SEQUENCE

```javascript
// Walkthrough video automation - detailed tour
async function walkthroughDemo(page) {
  // Intro: Hero (15 sec)
  await page.goto('http://localhost:3003');
  await page.waitForTimeout(5000);
  await page.evaluate(() => window.scrollBy({top: 400, behavior: 'smooth'}));
  await page.waitForTimeout(10000);

  // Problem: Before/After (25 sec)
  await page.evaluate(() => window.scrollTo({top: 2200, behavior: 'smooth'}));
  await page.waitForTimeout(12000);
  await page.evaluate(() => window.scrollBy({top: 200, behavior: 'smooth'}));
  await page.waitForTimeout(13000);

  // AI Demo: CLI section (35 sec)
  await page.click('a[href="#demo"]');
  await page.waitForTimeout(35000);

  // Multi-vendor: Integrations (30 sec)
  await page.evaluate(() => window.scrollTo({top: 4500, behavior: 'smooth'}));
  await page.waitForTimeout(30000);

  // Compliance: Features + Trust badges (30 sec)
  await page.click('a[href="#features"]');
  await page.waitForTimeout(15000);
  await page.evaluate(() => window.scrollBy({top: 400, behavior: 'smooth'}));
  await page.waitForTimeout(15000);

  // Results: Case Studies (25 sec)
  await page.click('a[href="#case-studies"]');
  await page.waitForTimeout(25000);

  // CTA: Pricing + Hero (20 sec)
  await page.click('a[href="#pricing"]');
  await page.waitForTimeout(10000);
  await page.evaluate(() => window.scrollTo({top: 0, behavior: 'smooth'}));
  await page.waitForTimeout(10000);
}
```

---

## Recording Instructions for Big Dick

### Windows Screen Recorder Setup

1. **Open Game Bar**: Press `Win + G`
2. **Start Recording**: Press `Win + Alt + R`
3. **Stop Recording**: Press `Win + Alt + R` again
4. **Files saved to**: `Videos\Captures` folder

### Recommended Settings

- **Resolution**: 1920x1080 (Full HD)
- **Frame Rate**: 60 FPS for smooth scrolling
- **Audio**: Record system audio (for any UI sounds)
- **Browser**: Full screen (F11) with clean URL bar

### Post-Production Tips

1. **Add voiceover** using the scripts above
2. **Add background music** (subtle, professional)
3. **Add text overlays** for key stats (97%, $2.1M, etc.)
4. **Add logo animation** at start/end
5. **Export**: 1080p MP4, H.264 codec

### Recommended Tools

- **Free**: DaVinci Resolve, Clipchamp (Windows built-in)
- **Paid**: Adobe Premiere Pro, Camtasia

---

## Screenshots Captured

Located in: `D:\VarnaAI\Websites\.playwright-mcp\`

1. `fwchange-hero.png` - Hero section with stats
2. `fwchange-cli-demo.png` - CLI demo with AI analysis
3. `fwchange-case-studies.png` - Customer success stories
4. `fwchange-integrations.png` - Vendor integrations grid

---

## Next Steps

1. [ ] Start Docker containers for full app demo (if needed)
2. [ ] Run Playwright automation while screen recording
3. [ ] Record voiceover separately (cleaner audio)
4. [ ] Edit video with text overlays and music
5. [ ] Export final versions for each platform
