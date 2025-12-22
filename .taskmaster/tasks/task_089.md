# Task 89: Set Up Google Sheets Metrics Dashboard

**Status**: pending
**Priority**: medium
**Tags**: operations, metrics, tracking
**Due Date**: Jan 5, 2026

## Description

Create comprehensive Google Sheets dashboard for tracking all business metrics.

## Dashboard Structure (5 Tabs)

### Tab 1: Leads
**Columns**:
- Lead Name
- Company
- Industry
- Contact Info (Email, Phone)
- Source (Networking Event, LinkedIn, Referral, Website)
- Date Added
- Last Contact Date
- Status (New, Contacted, Discovery Call Booked, Proposal Sent, Won, Lost)
- Notes

**Formulas**:
- Count by Status
- Count by Source
- Conversion rate (Leads → Discovery Calls)

### Tab 2: Pipeline
**Columns**:
- Opportunity Name
- Company
- Service (Entry/Project/Retainer)
- Estimated Value (€)
- Probability (%)
- Weighted Value (Value × Probability)
- Stage (Discovery, Proposal, Negotiation, Closed Won, Closed Lost)
- Expected Close Date
- Last Activity
- Notes

**Formulas**:
- Total pipeline value
- Weighted pipeline value
- Win rate (Won ÷ (Won + Lost))
- Average deal size
- Sales cycle length (days from discovery → close)

### Tab 3: Revenue
**Columns**:
- Month
- Client Name
- Service Type
- Amount (€)
- Payment Status (Invoiced, Paid, Overdue)
- Invoice Date
- Payment Date
- Notes

**Formulas**:
- Monthly revenue (total)
- Monthly recurring revenue (MRR from retainers)
- Revenue by service tier (Entry/Project/Retainer split)
- Year-to-date revenue
- Cash collected vs invoiced

### Tab 4: Activity
**Columns**:
- Week Starting
- Networking Events Attended
- Business Cards Collected
- LinkedIn Posts Published
- LinkedIn Profile Views
- Discovery Calls Completed
- Proposals Sent
- Hours Worked (Billable)
- Hours Worked (Non-Billable)
- Notes

**Formulas**:
- Activity → Results correlation
- LinkedIn engagement rate
- Discovery call → Proposal conversion
- Time allocation (billable % of total)

### Tab 5: Monthly Reviews
**Sections**:
- Month/Year
- Revenue Achieved vs Target
- MRR Achieved vs Target
- Clients Won (Count)
- Active Opportunities (Count)
- What Worked (Free text)
- What Didn't Work (Free text)
- Next Month Focus (Free text)
- Key Decisions Made (Free text)

## Update Frequency

- **Leads Tab**: Real-time (as leads come in)
- **Pipeline Tab**: Weekly Friday
- **Revenue Tab**: As invoices sent/paid
- **Activity Tab**: Weekly Friday
- **Monthly Reviews Tab**: Last Friday of month

## Sharing & Access

- **Primary User**: Nick/Gennadius only
- **Backup**: Google Drive auto-backup
- **Mobile Access**: Google Sheets app (can update on-the-go)

## Templates & Automation

- Conditional formatting (e.g., overdue invoices highlighted red)
- Data validation (dropdown lists for Status, Stage, Service Type)
- Charts: Monthly revenue trend, pipeline by stage, lead sources

## Dependencies

None - can create immediately

## Notes

Keep it simple initially. Add complexity only if needed. Primary goal: Know the numbers every Friday in 5 minutes.
