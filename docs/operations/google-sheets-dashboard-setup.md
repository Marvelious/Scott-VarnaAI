# Google Sheets Metrics Dashboard - Implementation Guide

**Date**: 2025-12-21
**Owner**: Gennadius (Nick Falshow)
**Purpose**: Track leads, pipeline, revenue, and activity for VarnaAI consulting business
**Tool**: Google Sheets (free, cloud-based, mobile-accessible)

---

# QUICK START GUIDE

## Create New Spreadsheet
1. Go to https://sheets.google.com/
2. Click **+ Blank** to create new spreadsheet
3. Rename: "VarnaAI Metrics Dashboard - 2026"
4. Create 5 tabs (rename sheets):
   - Tab 1: **Leads**
   - Tab 2: **Pipeline**
   - Tab 3: **Revenue**
   - Tab 4: **Activity**
   - Tab 5: **Monthly Reviews**

---

# TAB 1: LEADS

## Purpose
Track all prospects from first contact to discovery call stage.

## Column Setup

| Column | Header | Data Type | Notes |
|--------|--------|-----------|-------|
| A | Lead ID | Auto-number | Formula: `=ROW()-1` (starting row 2) |
| B | Lead Name | Text | First and last name |
| C | Company | Text | Company name |
| D | Industry | Dropdown | Finance, Healthcare, Tech, Manufacturing, Professional Services, Other |
| E | Email | Text | Email address |
| F | Phone | Text | +359 format |
| G | LinkedIn URL | Text | Profile link |
| H | Source | Dropdown | Networking Event, LinkedIn, Referral, Website, Cold Outreach |
| I | Date Added | Date | When first added to CRM |
| J | Last Contact Date | Date | Most recent interaction |
| K | Status | Dropdown | New, Contacted, Discovery Call Booked, Proposal Sent, Won, Lost |
| L | Priority | Dropdown | Hot, Warm, Cold |
| M | Pain Point | Text | What problem do they have? |
| N | Budget Awareness | Dropdown | Unknown, <€1K, €1-5K, €5-10K, >€10K |
| O | Notes | Text | Free-form notes |

### Header Row Setup (Row 1)
- **Font**: Bold, 11pt
- **Background**: Dark blue (#1155cc)
- **Text Color**: White
- **Freeze**: Freeze row 1 (View → Freeze → 1 row)
- **Filter**: Add filter (Data → Create a filter)

### Data Validation (Dropdowns)

**Column D (Industry)**:
```
Finance, Healthcare, Tech, Manufacturing, Professional Services, Retail, Hospitality, Government, Education, Other
```

**Column H (Source)**:
```
Networking Event, LinkedIn, Referral, Website, Cold Outreach, Partner
```

**Column K (Status)**:
```
New, Contacted, Discovery Call Booked, Proposal Sent, Won, Lost
```

**Column L (Priority)**:
```
Hot, Warm, Cold
```

**Column N (Budget Awareness)**:
```
Unknown, <€1K, €1-5K, €5-10K, >€10K
```

### Conditional Formatting

**Priority Colors (Column L)**:
- **Hot**: Background red (#f4c7c3), Text dark red (#cc0000)
- **Warm**: Background orange (#fce5cd), Text dark orange (#e69138)
- **Cold**: Background light blue (#cfe2f3), Text dark blue (#0000ff)

**Status Colors (Column K)**:
- **Won**: Background green (#d9ead3), Text dark green (#38761d)
- **Lost**: Background gray (#cccccc), Text dark gray (#666666)
- **Proposal Sent**: Background yellow (#fff2cc), Text dark yellow (#bf9000)

**Overdue Follow-Up** (Column J - Last Contact Date):
- If last contact >7 days ago AND status = "Contacted", highlight row orange
- Formula: `=AND($K2="Contacted", $J2<TODAY()-7)`

### Formulas Section (Below Data)

**Summary Statistics** (Row 1000+ for easy scrolling):

```
Row 1001:
A1001: Lead Statistics
B1001: [empty]

Row 1002:
A1002: Total Leads
B1002: =COUNTA(B2:B999)

Row 1003:
A1003: Status Breakdown
B1003: [empty]

Row 1004:
A1004: New
B1004: =COUNTIF(K2:K999,"New")

Row 1005:
A1005: Contacted
B1005: =COUNTIF(K2:K999,"Contacted")

Row 1006:
A1006: Discovery Call Booked
B1006: =COUNTIF(K2:K999,"Discovery Call Booked")

Row 1007:
A1007: Proposal Sent
B1007: =COUNTIF(K2:K999,"Proposal Sent")

Row 1008:
A1008: Won
B1008: =COUNTIF(K2:K999,"Won")

Row 1009:
A1009: Lost
B1009: =COUNTIF(K2:K999,"Lost")

Row 1011:
A1011: Conversion Rates
B1011: [empty]

Row 1012:
A1012: Leads → Discovery Calls
B1012: =B1006/B1002
Format: Percentage

Row 1013:
A1013: Discovery Calls → Proposals
B1013: =B1007/B1006
Format: Percentage

Row 1015:
A1015: Source Breakdown
B1015: [empty]

Row 1016:
A1016: Networking Events
B1016: =COUNTIF(H2:H999,"Networking Event")

Row 1017:
A1017: LinkedIn
B1017: =COUNTIF(H2:H999,"LinkedIn")

Row 1018:
A1018: Referrals
B1018: =COUNTIF(H2:H999,"Referral")

Row 1019:
A1019: Website
B1019: =COUNTIF(H2:H999,"Website")
```

---

# TAB 2: PIPELINE

## Purpose
Track active sales opportunities from discovery call to closed (won/lost).

## Column Setup

| Column | Header | Data Type | Notes |
|--------|--------|-----------|-------|
| A | Opportunity ID | Auto-number | Formula: `=ROW()-1` |
| B | Opportunity Name | Text | Format: "[Company] - [Service]" |
| C | Company | Text | Company name |
| D | Contact Name | Text | Decision maker |
| E | Service Type | Dropdown | Entry Audit (€980), Project (€4,900-€9,800), Retainer (€980/month) |
| F | Estimated Value (€) | Currency | Expected revenue |
| G | Probability (%) | Number | 0-100% likelihood to close |
| H | Weighted Value (€) | Formula | `=F2*G2/100` |
| I | Stage | Dropdown | Discovery, Proposal Sent, Negotiation, Verbal Commit, Closed Won, Closed Lost |
| J | Expected Close Date | Date | When do you expect decision? |
| K | Discovery Call Date | Date | When was discovery call? |
| L | Proposal Sent Date | Date | When was proposal sent? |
| M | Last Activity | Date | Most recent interaction |
| N | Next Action | Text | What's the next step? |
| O | Blocker | Text | What's preventing close? |
| P | Notes | Text | Free-form notes |

### Data Validation (Dropdowns)

**Column E (Service Type)**:
```
Entry Audit (€980), Project - ISO 27001 (€4,900), Project - Azure AI (€6,500), Project - Firewall Migration (€9,800), Retainer (€980/month), Custom
```

**Column I (Stage)**:
```
Discovery, Proposal Sent, Negotiation, Verbal Commit, Closed Won, Closed Lost
```

### Conditional Formatting

**Stage Colors (Column I)**:
- **Closed Won**: Background green (#d9ead3), Text dark green (#38761d)
- **Closed Lost**: Background gray (#cccccc), Text dark gray (#666666)
- **Verbal Commit**: Background light green (#b6d7a8), Text dark green (#38761d)
- **Negotiation**: Background yellow (#fff2cc), Text dark yellow (#bf9000)

**Overdue Expected Close** (Column J):
- If expected close date has passed AND stage NOT "Closed Won" or "Closed Lost", highlight red
- Formula: `=AND($J2<TODAY(), NOT(OR($I2="Closed Won",$I2="Closed Lost")))`

**Stale Opportunities** (Column M - Last Activity):
- If last activity >14 days ago AND stage NOT "Closed Won" or "Closed Lost", highlight orange
- Formula: `=AND($M2<TODAY()-14, NOT(OR($I2="Closed Won",$I2="Closed Lost")))`

### Formulas Section (Below Data)

```
Row 1001:
A1001: Pipeline Statistics
B1001: [empty]

Row 1002:
A1002: Total Active Opportunities
B1002: =COUNTIFS(I2:I999,"<>Closed Won",I2:I999,"<>Closed Lost")

Row 1003:
A1003: Total Pipeline Value
B1003: =SUMIFS(F2:F999,I2:I999,"<>Closed Won",I2:I999,"<>Closed Lost")
Format: Currency (€)

Row 1004:
A1004: Weighted Pipeline Value
B1004: =SUMIFS(H2:H999,I2:I999,"<>Closed Won",I2:I999,"<>Closed Lost")
Format: Currency (€)

Row 1006:
A1006: Closed Deals
B1006: [empty]

Row 1007:
A1007: Won
B1007: =COUNTIF(I2:I999,"Closed Won")

Row 1008:
A1008: Lost
B1008: =COUNTIF(I2:I999,"Closed Lost")

Row 1009:
A1009: Win Rate
B1009: =B1007/(B1007+B1008)
Format: Percentage

Row 1011:
A1011: Average Deal Size (Won)
B1011: =AVERAGEIF(I2:I999,"Closed Won",F2:F999)
Format: Currency (€)

Row 1013:
A1013: Sales Cycle Length (Days)
B1013: =AVERAGE(IF(I2:I999="Closed Won",L2:L999-K2:K999))
Note: Array formula - enter with Ctrl+Shift+Enter

Row 1015:
A1015: Stage Breakdown
B1015: [empty]

Row 1016:
A1016: Discovery
B1016: =COUNTIF(I2:I999,"Discovery")

Row 1017:
A1017: Proposal Sent
B1017: =COUNTIF(I2:I999,"Proposal Sent")

Row 1018:
A1018: Negotiation
B1018: =COUNTIF(I2:I999,"Negotiation")

Row 1019:
A1019: Verbal Commit
B1019: =COUNTIF(I2:I999,"Verbal Commit")
```

### Charts

**Chart 1: Pipeline by Stage (Bar Chart)**
- Data range: A1016:B1019 (Stage names + counts)
- Chart type: Horizontal bar chart
- Title: "Active Opportunities by Stage"
- Insert: Insert → Chart → Bar chart

**Chart 2: Pipeline Value Over Time (Line Chart)**
- Create helper column with monthly snapshot of total pipeline value
- Chart type: Line chart with markers
- X-axis: Month
- Y-axis: Total pipeline value (€)
- Title: "Pipeline Value Trend"

---

# TAB 3: REVENUE

## Purpose
Track invoices, payments, and revenue performance.

## Column Setup

| Column | Header | Data Type | Notes |
|--------|--------|-----------|-------|
| A | Invoice ID | Text | Format: "INV-2026-001" |
| B | Month | Date | First day of month (e.g., 2026-01-01) |
| C | Client Name | Text | Company name |
| D | Service Type | Dropdown | Entry Audit, Project, Retainer |
| E | Amount (€) | Currency | Invoice amount |
| F | Payment Status | Dropdown | Invoiced, Paid, Overdue |
| G | Invoice Date | Date | When invoice sent |
| H | Due Date | Date | Payment deadline (usually invoice date + 15 days) |
| I | Payment Date | Date | When payment received |
| J | Days to Payment | Formula | `=I2-G2` (if paid) |
| K | Bank Account | Dropdown | Business, Personal (for tax tracking) |
| L | Notes | Text | Free-form notes |

### Data Validation (Dropdowns)

**Column D (Service Type)**:
```
Entry Audit, Project - ISO, Project - Azure, Project - Firewall, Retainer, Other
```

**Column F (Payment Status)**:
```
Invoiced, Paid, Overdue
```

**Column K (Bank Account)**:
```
Business (Classic Security EOOD), Personal
```

### Conditional Formatting

**Payment Status Colors (Column F)**:
- **Paid**: Background green (#d9ead3), Text dark green (#38761d)
- **Overdue**: Background red (#f4c7c3), Text dark red (#cc0000)
- **Invoiced**: Background yellow (#fff2cc), Text dark yellow (#bf9000)

**Overdue Invoices** (Automatic highlighting):
- If payment status = "Invoiced" AND due date < today, set status to "Overdue"
- Use script or manual update

### Formulas Section (Below Data)

```
Row 1001:
A1001: Revenue Statistics
B1001: [empty]

Row 1002:
A1002: Year-to-Date Revenue
B1002: =SUMIFS(E2:E999,F2:F999,"Paid",B2:B999,">="&DATE(YEAR(TODAY()),1,1))
Format: Currency (€)

Row 1003:
A1003: Current Month Revenue
B1003: =SUMIFS(E2:E999,F2:F999,"Paid",B2:B999,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))
Format: Currency (€)

Row 1005:
A1005: Monthly Recurring Revenue (MRR)
B1005: =SUMIFS(E2:E999,D2:D999,"Retainer",F2:F999,"Paid",B2:B999,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))
Format: Currency (€)

Row 1007:
A1007: Outstanding Invoices
B1007: =SUMIFS(E2:E999,F2:F999,"Invoiced")+SUMIFS(E2:E999,F2:F999,"Overdue")
Format: Currency (€)

Row 1009:
A1009: Revenue by Service Type
B1009: [empty]

Row 1010:
A1010: Entry Audit
B1010: =SUMIFS(E2:E999,D2:D999,"Entry Audit",F2:F999,"Paid")

Row 1011:
A1011: Project
B1011: =SUMIFS(E2:E999,D2:D999,"Project*",F2:F999,"Paid")
Note: Use wildcards or sum multiple project types

Row 1012:
A1012: Retainer
B1012: =SUMIFS(E2:E999,D2:D999,"Retainer",F2:F999,"Paid")

Row 1014:
A1014: Average Days to Payment
B1014: =AVERAGEIF(F2:F999,"Paid",J2:J999)
Format: Number (no decimals)

Row 1016:
A1016: Overdue Count
B1016: =COUNTIF(F2:F999,"Overdue")
```

### Charts

**Chart 1: Monthly Revenue (Column Chart)**
- X-axis: Month (Column B)
- Y-axis: Sum of Amount where Payment Status = "Paid"
- Group by month
- Chart type: Column chart
- Title: "Monthly Revenue Trend"

**Chart 2: Revenue Mix (Pie Chart)**
- Data: Revenue by Service Type (Row 1010:1012)
- Chart type: Pie chart
- Title: "Revenue by Service Type"
- Show percentages on slices

---

# TAB 4: ACTIVITY

## Purpose
Track weekly business development activities and correlate with results.

## Column Setup

| Column | Header | Data Type | Notes |
|--------|--------|-----------|-------|
| A | Week Starting | Date | Monday of each week (e.g., 2026-01-06) |
| B | Networking Events Attended | Number | Count of events |
| C | Business Cards Collected | Number | Count of cards |
| D | LinkedIn Posts Published | Number | Count of posts |
| E | LinkedIn Profile Views | Number | From LinkedIn analytics |
| F | LinkedIn Connection Requests Sent | Number | Count of requests |
| G | Discovery Calls Completed | Number | Count of calls |
| H | Proposals Sent | Number | Count of proposals |
| I | Hours Worked (Billable) | Number | Client work hours |
| J | Hours Worked (Non-Billable) | Number | Marketing, admin, learning |
| K | Total Hours | Formula | `=I2+J2` |
| L | Billable % | Formula | `=I2/K2` |
| M | Notes | Text | What worked this week? What didn't? |

### Formulas Section (Below Data)

```
Row 1001:
A1001: Activity Statistics (Last 4 Weeks)
B1001: [empty]

Row 1002:
A1002: Avg Events/Week
B1002: =AVERAGE(B2:B5)
Note: Adjust range to last 4 weeks

Row 1003:
A1003: Avg Cards Collected/Week
B1003: =AVERAGE(C2:C5)

Row 1004:
A1004: Avg LinkedIn Posts/Week
B1004: =AVERAGE(D2:D5)

Row 1005:
A1005: Avg Profile Views/Week
B1005: =AVERAGE(E2:E5)

Row 1006:
A1006: Avg Discovery Calls/Week
B1006: =AVERAGE(G2:G5)

Row 1008:
A1008: Activity → Results Correlation
B1008: [empty]

Row 1009:
A1009: Cards Collected → Discovery Calls Ratio
B1009: =SUM(G2:G999)/SUM(C2:C999)
Format: Percentage

Row 1010:
A1010: Discovery Calls → Proposals Ratio
B1010: =SUM(H2:H999)/SUM(G2:G999)
Format: Percentage

Row 1012:
A1012: Time Allocation
B1012: [empty]

Row 1013:
A1013: Total Billable Hours (YTD)
B1013: =SUM(I2:I999)

Row 1014:
A1014: Total Non-Billable Hours (YTD)
B1014: =SUM(J2:J999)

Row 1015:
A1015: Billable % (YTD)
B1015: =B1013/(B1013+B1014)
Format: Percentage
```

### Charts

**Chart 1: Weekly Activity Trend (Multi-Line Chart)**
- X-axis: Week Starting (Column A)
- Y-axis (multiple series):
  - LinkedIn Posts (Column D)
  - Discovery Calls (Column G)
  - Proposals Sent (Column H)
- Chart type: Line chart with markers
- Title: "Weekly Activity Metrics"

**Chart 2: Billable vs Non-Billable Hours (Stacked Column Chart)**
- X-axis: Week Starting (Column A)
- Y-axis (stacked):
  - Billable Hours (Column I) - green
  - Non-Billable Hours (Column J) - orange
- Chart type: Stacked column chart
- Title: "Time Allocation by Week"

---

# TAB 5: MONTHLY REVIEWS

## Purpose
Structured monthly retrospectives to track progress and plan adjustments.

## Layout Structure

### Section 1: Monthly Summary (Rows 1-10)

```
A1: Month/Year
B1: January 2026

A2: Review Date
B2: 2026-01-31

A3: Days Worked
B3: 20 (business days in month)
```

### Section 2: Financial Performance (Rows 12-25)

```
A12: FINANCIAL PERFORMANCE
[Empty row]

A14: Metric | B14: Target | C14: Actual | D14: Variance | E14: % of Target

A15: Revenue (€)
B15: 5000
C15: =Revenue!B1003 (pull from Revenue tab current month)
D15: =C15-B15
E15: =C15/B15
Format E15: Percentage

A16: MRR (€)
B16: 980
C16: =Revenue!B1005
D16: =C16-B16
E16: =C16/B16

A17: Clients Won (Count)
B17: 3
C17: =COUNTIFS(Pipeline!I:I,"Closed Won",Pipeline!L:L,">="&DATE(YEAR(B1),MONTH(B1),1),Pipeline!L:L,"<="&EOMONTH(DATE(YEAR(B1),MONTH(B1),1),0))
D17: =C17-B17
E17: =C17/B17

A18: Average Deal Size (€)
B18: 2500
C18: =Pipeline!B1011
D18: =C18-B18
E18: =C18/B18
```

### Section 3: Pipeline Health (Rows 27-35)

```
A27: PIPELINE HEALTH

A29: Active Opportunities (Count)
B29: =Pipeline!B1002

A30: Total Pipeline Value (€)
B30: =Pipeline!B1003

A31: Weighted Pipeline Value (€)
B31: =Pipeline!B1004

A32: Win Rate (%)
B32: =Pipeline!B1009

A33: Sales Cycle (Days)
B33: =Pipeline!B1013
```

### Section 4: Activity Summary (Rows 37-45)

```
A37: ACTIVITY SUMMARY

A39: Networking Events Attended
B39: =SUMIFS(Activity!B:B,Activity!A:A,">="&DATE(YEAR($B$1),MONTH($B$1),1),Activity!A:A,"<="&EOMONTH(DATE(YEAR($B$1),MONTH($B$1),1),0))

A40: Business Cards Collected
B40: =SUMIFS(Activity!C:C,Activity!A:A,">="&DATE(YEAR($B$1),MONTH($B$1),1),Activity!A:A,"<="&EOMONTH(DATE(YEAR($B$1),MONTH($B$1),1),0))

A41: LinkedIn Posts Published
B41: =SUMIFS(Activity!D:D,Activity!A:A,">="&DATE(YEAR($B$1),MONTH($B$1),1),Activity!A:A,"<="&EOMONTH(DATE(YEAR($B$1),MONTH($B$1),1),0))

A42: Discovery Calls Completed
B42: =SUMIFS(Activity!G:G,Activity!A:A,">="&DATE(YEAR($B$1),MONTH($B$1),1),Activity!A:A,"<="&EOMONTH(DATE(YEAR($B$1),MONTH($B$1),1),0))

A43: Billable Hours
B43: =SUMIFS(Activity!I:I,Activity!A:A,">="&DATE(YEAR($B$1),MONTH($B$1),1),Activity!A:A,"<="&EOMONTH(DATE(YEAR($B$1),MONTH($B$1),1),0))

A44: Billable %
B44: =B43/(B43+SUMIFS(Activity!J:J,Activity!A:A,">="&DATE(YEAR($B$1),MONTH($B$1),1),Activity!A:A,"<="&EOMONTH(DATE(YEAR($B$1),MONTH($B$1),1),0)))
Format: Percentage
```

### Section 5: Qualitative Review (Rows 47-70)

```
A47: WHAT WORKED (Free Text)
A48: [Merge cells A48:E55, enable text wrapping]
Example text:
- Networking events generated 60% of leads (keep attending)
- LinkedIn posts on GDPR got 3x engagement vs. technical posts
- Discovery call conversion improved when showing C3 demo live
- Entry audit (€980) is easy sell, good foot-in-door for larger projects

A57: WHAT DIDN'T WORK (Free Text)
A58: [Merge cells A58:E65, enable text wrapping]
Example text:
- Cold LinkedIn outreach had 5% response rate (too low, stop)
- Proposals taking too long to write (need templates)
- Lost 2 deals because no retainer option (need to add)
- Website not generating inbound leads yet (needs SEO work)

A67: NEXT MONTH FOCUS (Free Text)
A68: [Merge cells A68:E75, enable text wrapping]
Example text:
- Target: €8K revenue, 5 clients won
- Attend 4 networking events minimum
- Publish 12 LinkedIn posts (3x/week)
- Add retainer tier to all proposals
- Get 2 LinkedIn recommendations from former colleagues

A77: KEY DECISIONS MADE (Free Text)
A78: [Merge cells A78:E85, enable text wrapping]
Example text:
- Decision: Focus on ISO 27001 implementation over GDPR audits (higher value, less competition)
- Decision: Increase entry audit price from €980 → €1,200 starting Feb 1
- Decision: Stop cold outreach, focus on warm network and referrals
- Decision: Hire part-time VA for administrative tasks if billable hours >40/month
```

### Monthly Review Template (Copy for Each Month)

Create one review per month (January 2026, February 2026, etc.). Each month starts at Row 1 of this structure, so:
- January 2026: Rows 1-85
- February 2026: Rows 87-171
- March 2026: Rows 173-257
- Etc.

Or create separate sub-tabs: "Jan 2026", "Feb 2026", etc.

---

# UPDATE FREQUENCY & WORKFLOW

## Daily (5 minutes)
- **Leads Tab**: Add new leads as they come in
- **Pipeline Tab**: Update last activity date for active opportunities
- **Activity Tab**: No daily update (weekly batch)

## Weekly (Friday afternoon, 30 minutes)
- **Leads Tab**: Review and update all lead statuses
- **Pipeline Tab**: Update all opportunity stages, expected close dates, next actions
- **Activity Tab**: Fill in weekly activity row (events, posts, calls, hours)
- **Revenue Tab**: Add any new invoices sent this week

## Monthly (Last Friday, 60 minutes)
- **Revenue Tab**: Reconcile all payments received
- **Monthly Reviews Tab**: Complete full monthly review
- **All Tabs**: Clean up any stale data, archive closed opportunities

---

# MOBILE ACCESS

## Google Sheets App (iOS/Android)
1. Install Google Sheets app
2. Sign in with Google account
3. Open "VarnaAI Metrics Dashboard - 2026"
4. Star the file for quick access

## Quick Mobile Updates
- **After networking event**: Immediately add leads (Leads tab) and business cards count (Activity tab note for next Friday update)
- **After discovery call**: Update Pipeline tab with new opportunity or move existing opportunity to next stage
- **Payment received notification**: Update Revenue tab payment status to "Paid" and add payment date

---

# BACKUP & SECURITY

## Auto-Backup
- Google Sheets auto-saves to Google Drive (no action needed)
- Version history: File → Version history → See version history

## Manual Backup (Monthly)
- File → Download → Microsoft Excel (.xlsx)
- Save to local backup folder: `D:\VarnaAI\Backups\Dashboard\VarnaAI-Dashboard-[YYYY-MM].xlsx`

## Sharing & Privacy
- **Current**: Private to Nick/Gennadius only
- **Future**: If hiring VA or partner, share specific tabs only (not full dashboard)

---

# CUSTOMIZATION TIPS

## Add Custom Columns
- Industry-specific fields (e.g., "Requires NIS2 Compliance?" Yes/No)
- Lead score (A/B/C rating based on budget + pain + timeline)
- Competitor mentioned (which competitors are you up against?)

## Add Custom Charts
- Lead source effectiveness (which sources convert best?)
- Monthly revenue by service type (stacked bar chart)
- Billable utilization trend (target: 60%+ billable)

## Integrate with Other Tools
- **Calendly**: Manually log discovery calls from Calendly in Pipeline tab
- **Gmail**: Use Gmail labels to track proposal sent dates
- **LinkedIn**: Export profile views weekly and paste into Activity tab

---

# SUCCESS METRICS (3-Month Checkpoints)

## Month 1 (January 2026)
- **Leads Tab**: 30+ leads collected
- **Pipeline Tab**: 10+ active opportunities
- **Revenue Tab**: €5K revenue (entry audits focus)
- **Activity Tab**: 4 networking events, 12 LinkedIn posts

## Month 2 (February 2026)
- **Leads Tab**: 50+ total leads
- **Pipeline Tab**: 15+ active opportunities, 2+ closed won
- **Revenue Tab**: €8K revenue (first project tier sale)
- **Activity Tab**: Billable % >50%

## Month 3 (March 2026)
- **Leads Tab**: 75+ total leads, 20%+ conversion to discovery calls
- **Pipeline Tab**: 20+ active opportunities, win rate >30%
- **Revenue Tab**: €10K revenue, 1+ retainer client
- **Activity Tab**: Billable % >60%, predictable lead flow

---

# TROUBLESHOOTING

## Problem: Formulas showing #REF! error
**Solution**: Check that referenced cells exist and tab names are correct. Example: `=Revenue!B1003` requires "Revenue" tab to exist.

## Problem: Conditional formatting not working
**Solution**: Ensure formula references are correct (use $ for absolute references). Example: `$K2="Won"` locks column K, allows row to change.

## Problem: Charts not updating
**Solution**: Right-click chart → Edit chart → Update data range to include new rows.

## Problem: Can't find specific lead/opportunity
**Solution**: Use Ctrl+F (Find) or enable filter on header row (Data → Create a filter) and filter by company name or status.

---

# NEXT STEPS FOR BIG DICK

1. **Create Spreadsheet**: Follow "Quick Start Guide" to create 5 tabs
2. **Set Up Headers**: Copy column headers from this guide to each tab
3. **Add Data Validation**: Set up dropdowns for all specified columns
4. **Add Conditional Formatting**: Apply color rules for status tracking
5. **Add Formulas**: Copy formulas from "Formulas Section" for each tab
6. **Test with Sample Data**: Add 3-5 fake leads/opportunities to verify formulas work
7. **Bookmark in Browser**: Add to bookmarks bar for daily access
8. **Install Mobile App**: Set up Google Sheets app on phone
9. **Schedule Weekly Review**: Add recurring Friday 4pm calendar reminder "Update VarnaAI Dashboard"

---

**Status**: Complete implementation guide ready
**Complexity**: Medium (requires 2-3 hours initial setup, then 30 min/week maintenance)
**Value**: High - this becomes your single source of truth for business metrics
