# 25-Point Security Checklist for Bulgarian SMEs

**Created**: 2025-12-21
**Purpose**: Lead magnet for varnaai.com (email gate for download)
**Target**: Bulgarian SMEs (10-500 employees) exploring AI and digital transformation
**Format**: 2-3 page PDF (this markdown → Google Doc → PDF)
**Distribution**: Landing page, LinkedIn, email signature, networking events (QR code)

---

## Introduction

**Why This Checklist?**

Bulgarian companies face increasing pressure from EU regulations (GDPR, NIS2, AI Act) while simultaneously adopting AI and cloud technologies. This checklist provides a practical starting point for SMEs to assess their security posture without expensive consultants.

**How to Use:**
- ☐ Check each item as you complete it
- ⚠️ Items marked with ⚠️ are CRITICAL for GDPR compliance
- 🤖 Items marked with 🤖 are specific to AI implementation
- If you check fewer than 15/25 items, consider a professional security audit

---

## SECTION 1: Basic Security Fundamentals (5 Points)

### 1. ☐ Strong Password Policy Enforced
**What it means**: Minimum 12 characters, mix of upper/lower/numbers/symbols
**Why it matters**: 80% of breaches involve weak passwords
**Quick action**: Use password manager (Bitwarden, 1Password, LastPass)
**GDPR relevance**: Article 32 - Security of Processing

### 2. ☐ Two-Factor Authentication (2FA) Enabled
**What it means**: Second verification step beyond password (SMS, app, hardware key)
**Why it matters**: Prevents 99.9% of automated attacks (Microsoft study)
**Quick action**: Enable 2FA on email, cloud services, admin accounts
**Priority accounts**: Office 365, Google Workspace, Banking, Admin panels

### 3. ☐ Automatic Software Updates Active
**What it means**: Operating systems, browsers, applications update automatically
**Why it matters**: 60% of breaches exploit known, patchable vulnerabilities
**Quick action**: Enable auto-updates on Windows/Mac, mobile devices
**Don't forget**: Router firmware, IoT devices, server software

### 4. ☐ Regular Backup Procedures (3-2-1 Rule)
**What it means**: 3 copies, 2 different media types, 1 offsite
**Why it matters**: Ransomware attacks can destroy business in 24 hours
**Quick action**: Cloud backup (Google Drive, OneDrive) + external drive
**Test monthly**: Restore a file to verify backups work

### 5. ☐ Antivirus/EDR Installed and Updated
**What it means**: Endpoint Detection and Response software on all devices
**Why it matters**: First line of defense against malware, ransomware
**Quick action**: Windows Defender (free, built-in) or enterprise EDR
**For businesses**: Microsoft Defender for Business, CrowdStrike, SentinelOne

---

## SECTION 2: GDPR Compliance Essentials (10 Points)

### 6. ☐ ⚠️ Complete Data Inventory Documented
**What it means**: List all personal data you collect, process, store
**Why it matters**: Article 30 GDPR - Record of Processing Activities (mandatory)
**Quick action**: Spreadsheet with: data type, purpose, location, retention
**Example**: Customer emails (marketing, CRM, 2 years retention)
**Tool**: Our C3 compliance app (c3.varnaai.com) generates this automatically

### 7. ☐ ⚠️ Privacy Policy Published (Bulgarian + English)
**What it means**: Public document explaining data collection and rights
**Why it matters**: Article 13 GDPR - Transparency obligation
**Quick action**: Use GDPR template generator, translate to Bulgarian
**Must include**: What data, why collected, how long kept, user rights
**Where**: Website footer, mobile app, email signup

### 8. ☐ ⚠️ Cookie Consent Banner Implemented
**What it means**: Website visitors must explicitly consent to cookies
**Why it matters**: ePrivacy Directive + GDPR Article 7 (valid consent)
**Quick action**: Cookiebot, OneTrust, or custom implementation
**Requirements**: Reject button, granular consent, no pre-ticked boxes
**Penalty**: Up to €20 million or 4% annual turnover

### 9. ☐ ⚠️ Data Processing Agreements (DPAs) Signed
**What it means**: Written contracts with ALL third-party services processing data
**Why it matters**: Article 28 GDPR - Controller-Processor contracts
**Quick action**: Request DPAs from: hosting, CRM, email, analytics providers
**Examples**: Google Workspace, Mailchimp, HubSpot, AWS, Azure
**Your liability**: YOU are liable if processor violates GDPR

### 10. ☐ ⚠️ Data Breach Notification Plan Ready
**What it means**: Written procedure for what to do if data is compromised
**Why it matters**: Article 33 - 72-hour notification deadline to authority
**Quick action**: Document: detection → assessment → notification → mitigation
**Bulgarian authority**: Commission for Personal Data Protection (CPDP)
**Template**: "Who to call, what to document, when to notify"

### 11. ☐ Data Subject Rights Process Established
**What it means**: Process for handling access, deletion, portability requests
**Why it matters**: Articles 15-22 - Individual rights (access, erasure, portability)
**Quick action**: Email alias (privacy@yourcompany.bg) + response template
**Response deadline**: 1 month maximum
**Examples**: "Delete my account", "Export my data", "Correct my information"

### 12. ☐ Third-Party Risk Assessment Completed
**What it means**: Evaluate security of ALL vendors processing your data
**Why it matters**: You remain liable even when data is with third parties
**Quick action**: Questionnaire for vendors: certifications, security measures
**Red flags**: No SOC 2, no ISO 27001, vague security answers
**Alternatives**: Choose EU-based vendors with GDPR compliance

### 13. ☐ Employee GDPR Training Conducted
**What it means**: All staff understand GDPR basics and company policies
**Why it matters**: Human error causes 95% of data breaches
**Quick action**: 30-minute online course (free: GDPR.eu) + signed acknowledgment
**Annual refresh**: GDPR training should be repeated yearly
**Topics**: What is personal data, how to handle requests, reporting breaches

### 14. ☐ GDPR Documentation Repository Maintained
**What it means**: Central location for policies, procedures, DPAs, audit records
**Why it matters**: Article 5(2) - Accountability principle (prove compliance)
**Quick action**: Shared folder with: privacy policy, DPAs, training records
**Authority inspection**: Must produce documentation within 72 hours
**Tool**: Our C3 app organizes all GDPR documents automatically

### 15. ☐ ⚠️ Annual GDPR Compliance Audit Scheduled
**What it means**: Yearly review of all GDPR processes and documentation
**Why it matters**: Regulations change, business processes evolve
**Quick action**: Calendar reminder for Q1 each year
**Self-audit**: Use C3 app for quick compliance check (60 seconds)
**Professional audit**: €980 (Entry Tier) - contact@varnaai.com

---

## SECTION 3: AI-Specific Security (10 Points)

### 16. ☐ 🤖 Data Sovereignty Requirements Defined
**What it means**: Decide where AI can process data (EU only, on-premises, etc.)
**Why it matters**: GDPR Article 44 - Transfers outside EU require safeguards
**Quick action**: Policy: "Customer data stays in EU" or "Use local AI only"
**Options**: Azure EU regions, local LLMs (Llama, Mistral), Studio LM
**Red flag**: Sending Bulgarian customer data to US cloud without SCCs

### 17. ☐ 🤖 AI Model Security Assessment Done
**What it means**: Understand how AI models handle, store, learn from your data
**Why it matters**: Some AI services train on your data without permission
**Quick action**: Read AI provider's terms (OpenAI, Anthropic, Google)
**Key questions**: Is data used for training? How long stored? Encryption?
**Secure options**: Azure OpenAI (no training), local LLMs, enterprise plans

### 18. ☐ 🤖 API Security Controls Implemented
**What it means**: Authentication, rate limiting, encryption for AI API access
**Why it matters**: Exposed API keys = unauthorized access = data breach
**Quick action**: Use API keys (not hardcoded), rotate monthly, monitor usage
**Best practices**: Environment variables, Azure Key Vault, API gateways
**Alert triggers**: Unusual usage patterns, failed auth attempts

### 19. ☐ 🤖 Local vs Cloud AI Decision Documented
**What it means**: Written justification for using cloud AI or local models
**Why it matters**: GDPR accountability - must justify data processing decisions
**Quick action**: Risk assessment: sensitivity of data vs convenience of cloud
**Cloud AI**: Faster, more capable, but data leaves premises
**Local AI**: Full control, GDPR-safe, but requires infrastructure

### 20. ☐ 🤖 AI-GDPR Integration Verified
**What it means**: Confirm AI workflows comply with GDPR (consent, purpose, retention)
**Why it matters**: AI can't bypass GDPR - same rules apply
**Quick action**: Map AI use cases to GDPR lawful bases
**Example**: "AI analyzes customer emails" → Need consent or legitimate interest
**Document**: Purpose, legal basis, retention period for each AI workflow

### 21. ☐ 🤖 AI Output Validation Process Established
**What it means**: Human review of AI-generated content before use
**Why it matters**: AI can hallucinate, produce biased or incorrect output
**Quick action**: "No AI output goes to customers without human review" policy
**Use cases**: Customer emails, financial advice, legal documents, HR decisions
**EU AI Act**: High-risk AI systems require human oversight (2026)

### 22. ☐ 🤖 AI Access Controls Configured
**What it means**: Role-based access to AI tools (not everyone gets GPT-4 API)
**Why it matters**: Prevent data exfiltration, unauthorized AI usage costs
**Quick action**: Assign AI access by role (sales, dev, admin)
**Monitor**: Who uses AI, what prompts, what data accessed
**Budget control**: Set spending limits per user/team

### 23. ☐ 🤖 AI Audit Logging Enabled
**What it means**: Record all AI interactions (prompts, responses, users)
**Why it matters**: GDPR Article 30 - Processing records; incident investigation
**Quick action**: Enable logging in AI platforms (Azure, AWS, local systems)
**Retention**: 12 months minimum for compliance, 24 months recommended
**Privacy**: Log metadata, not full customer data in prompts

### 24. ☐ 🤖 AI Incident Response Plan Written
**What it means**: Procedure for handling AI-related security incidents
**Why it matters**: AI can cause unique incidents (data leaks, bias, hallucinations)
**Quick action**: Extend existing incident plan with AI-specific scenarios
**Scenarios**: API key leak, AI generates harmful content, data sent to wrong model
**Contacts**: AI vendor support, legal team, CPDP (if personal data involved)

### 25. ☐ 🤖 Quarterly AI Security Review Scheduled
**What it means**: Regular assessment of AI security posture
**Why it matters**: AI landscape changes rapidly (new models, new risks)
**Quick action**: Calendar reminder every 3 months
**Review items**: New AI tools, access logs, cost trends, compliance changes
**Update**: Security policies, employee training, vendor assessments

---

## Your Security Score

**Count your checked items:**
- ✅ **20-25 items**: Excellent - Strong security posture, keep it up!
- ✅ **15-19 items**: Good - Some gaps, prioritize ⚠️ GDPR items
- ⚠️ **10-14 items**: At Risk - Significant gaps, professional audit recommended
- 🚨 **0-9 items**: Critical - Immediate action required, high breach risk

---

## Next Steps

### If you scored 15+:
- Focus on remaining gaps (especially ⚠️ GDPR items)
- Schedule annual compliance review
- Consider advanced security (ISO 27001, NIS2)

### If you scored 10-14:
- **Immediate**: Fix all ⚠️ GDPR items (6-15)
- **This month**: Complete basic security (1-5)
- **Next quarter**: AI security items (16-25)
- **Get help**: Free 30-min discovery call → contact@varnaai.com

### If you scored below 10:
- **Urgent**: You may be operating illegally under GDPR
- **Risk**: Potential fines up to €20M or 4% annual turnover
- **Action**: Professional security audit (€980, 5-7 days)
- **Contact**: contact@varnaai.com or +359 88 252 1755

---

## Free Resources

1. **C3 Compliance Scanner**: 60-second GDPR check → https://c3.varnaai.com/
2. **Discovery Call**: 30-min consultation (no sales pressure) → [Calendly link]
3. **LinkedIn**: Weekly security tips → [Gennadius LinkedIn]
4. **Email Newsletter**: Monthly GDPR/AI updates → subscribe@varnaai.com

---

## About the Author

**Gennadius** - AI Security Specialist
17+ years securing enterprise systems for Deutsche Bank, Porsche, BASF, and Caterpillar. Now helping Bulgarian SMEs adopt AI safely with ISO 27001, GDPR compliance, and Azure AI implementation.

**Certifications**:
- ISO/IEC 27001 Lead Implementer
- CCIE Security (Written)
- Azure AI-102, AZ-500, AI-900
- TOGAF 9 Certified

**Based in**: Varna, Bulgaria
**Website**: varnaai.com
**Email**: contact@varnaai.com
**Phone**: +359 88 252 1755

---

**© 2026 Classic Security EOOD | GDPR Compliant**

*This checklist is for educational purposes. For formal compliance certification, consult with qualified legal and security professionals.*
