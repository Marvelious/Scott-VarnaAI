# Google Sheets Dashboard - 30-Minute Quick Start

**Date**: 2025-12-21
**Goal**: Get basic dashboard running in 30 minutes (can enhance later)
**Tool**: Google Sheets (free, cloud-based)

---

## STEP 1: CREATE SPREADSHEET (2 minutes)

1. Open browser → https://sheets.google.com/
2. Click **+ Blank** (green button, top left)
3. Top left corner → Click "Untitled spreadsheet"
4. Rename: `VarnaAI Metrics Dashboard - 2026`
5. Press Enter

✅ **Checkpoint**: You should see blank spreadsheet with "VarnaAI Metrics Dashboard - 2026" as title

---

## STEP 2: CREATE 5 TABS (3 minutes)

**Bottom of screen**: See "Sheet1" tab

**Create Tab 1: Leads**
1. Right-click "Sheet1" → Rename → Type: `Leads` → Press Enter

**Create Tab 2: Pipeline**
1. Click **+** button (bottom left, next to tabs) → New sheet appears
2. Right-click "Sheet2" → Rename → Type: `Pipeline` → Press Enter

**Create Tab 3: Revenue**
1. Click **+** button → New sheet appears
2. Right-click "Sheet3" → Rename → Type: `Revenue` → Press Enter

**Create Tab 4: Activity**
1. Click **+** button → New sheet appears
2. Right-click "Sheet4" → Rename → Type: `Activity` → Press Enter

**Create Tab 5: Reviews**
1. Click **+** button → New sheet appears
2. Right-click "Sheet5" → Rename → Type: `Reviews` → Press Enter

✅ **Checkpoint**: Bottom of screen should show 5 tabs: Leads | Pipeline | Revenue | Activity | Reviews

---

## STEP 3: SET UP LEADS TAB (10 minutes)

**Click "Leads" tab** (bottom of screen)

### Add Headers (Row 1)

Click cell A1, type these headers across Row 1:

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 | J1 | K1 | L1 | M1 | N1 | O1 |
|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| Lead ID | Lead Name | Company | Industry | Email | Phone | LinkedIn | Source | Date Added | Last Contact | Status | Priority | Pain Point | Budget | Notes |

**Formatting Headers**:
1. Click A1
2. Hold Shift, click O1 (selects entire header row A1:O1)
3. Top toolbar: Click **Bold** (B icon)
4. Top toolbar: Click **Fill color** (paint bucket) → Choose dark blue
5. Top toolbar: Click **Text color** (A icon) → Choose white

### Freeze Header Row

1. Top menu: **View** → **Freeze** → **1 row**

✅ **Checkpoint**: Row 1 should be bold, dark blue background, white text, and stay visible when you scroll down

### Add Dropdowns (Data Validation)

**Industry Dropdown (Column D)**:
1. Click D2 (first cell below "Industry" header)
2. Top menu: **Data** → **Data validation** → **Add rule**
3. "Criteria" dropdown → Choose **List of items**
4. In text box, type: `Finance, Healthcare, Tech, Manufacturing, Professional Services, Other`
5. Click **Done**
6. Click D2 again → Copy (Ctrl+C)
7. Select D3:D100 → Paste (Ctrl+V)

**Source Dropdown (Column H)**:
1. Click H2
2. **Data** → **Data validation** → **Add rule**
3. **List of items**: `Networking Event, LinkedIn, Referral, Website, Cold Outreach`
4. Click **Done**
5. Copy H2 → Paste H3:H100

**Status Dropdown (Column K)**:
1. Click K2
2. **Data** → **Data validation** → **Add rule**
3. **List of items**: `New, Contacted, Discovery Call Booked, Proposal Sent, Won, Lost`
4. Click **Done**
5. Copy K2 → Paste K3:K100

**Priority Dropdown (Column L)**:
1. Click L2
2. **Data** → **Data validation** → **Add rule**
3. **List of items**: `Hot, Warm, Cold`
4. Click **Done**
5. Copy L2 → Paste L3:L100

**Budget Dropdown (Column N)**:
1. Click N2
2. **Data** → **Data validation** → **Add rule**
3. **List of items**: `Unknown, <€1K, €1-5K, €5-10K, >€10K`
4. Click **Done**
5. Copy N2 → Paste N3:N100

### Add Auto-Numbering for Lead ID (Column A)

1. Click A2
2. Type formula: `=ROW()-1`
3. Press Enter
4. Click A2 again → Copy (Ctrl+C)
5. Select A3:A100 → Paste (Ctrl+V)

✅ **Checkpoint**: Click any dropdown cell (D2, H2, K2, L2, N2) → Should see dropdown arrow → Click arrow → Should see list of options

### Add Sample Lead (Test)

Click cell B2, add a fake lead to test:

| A2 | B2 | C2 | D2 | E2 | F2 | G2 | H2 | I2 | J2 | K2 | L2 | M2 | N2 | O2 |
|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| 1 | Test Person | Test Company | Tech | test@test.com | +359 88 XXX XXXX | linkedin.com/test | Networking Event | 2025-12-21 | 2025-12-21 | New | Hot | Testing the system | €1-5K | First test lead |

✅ **Checkpoint**: Lead ID (A2) should show "1" automatically

---

## STEP 4: SET UP PIPELINE TAB (5 minutes)

**Click "Pipeline" tab** (bottom of screen)

### Add Headers (Row 1)

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 | J1 |
|----|----|----|----|----|----|----|----|----|-------|
| Opp ID | Opportunity Name | Company | Service Type | Value (€) | Probability % | Weighted Value | Stage | Expected Close | Notes |

**Format headers**: Same as Leads tab (bold, dark blue, white text)
**Freeze row**: View → Freeze → 1 row

### Add Dropdowns

**Service Type (Column D)**:
1. Click D2 → **Data** → **Data validation** → **Add rule**
2. **List of items**: `Entry Audit (€980), Project (€4,900-€9,800), Retainer (€980/month)`
3. Click **Done** → Copy D2 → Paste D3:D100

**Stage (Column H)**:
1. Click H2 → **Data** → **Data validation** → **Add rule**
2. **List of items**: `Discovery, Proposal Sent, Negotiation, Verbal Commit, Closed Won, Closed Lost`
3. Click **Done** → Copy H2 → Paste H3:H100

### Add Formulas

**Opp ID (Column A)**:
- A2: `=ROW()-1` → Copy → Paste A3:A100

**Weighted Value (Column G)**:
- G2: `=F2*G2/100` → Copy → Paste G3:G100

**Add sample opportunity** (Row 2) to test:

| A2 | B2 | C2 | D2 | E2 | F2 | G2 | H2 | I2 | J2 |
|----|----|----|----|----|----|----|----|----|---|
| 1 | Test Co - ISO 27001 | Test Company | Project (€4,900-€9,800) | 4900 | 50 | 2450 | Discovery | 2026-01-31 | Test opp |

✅ **Checkpoint**: Weighted Value (G2) should show "2450" (4900 × 50%)

---

## STEP 5: SET UP REVENUE TAB (5 minutes)

**Click "Revenue" tab**

### Add Headers (Row 1)

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 |
|----|----|----|----|----|----|----|----|----|
| Invoice ID | Month | Client | Service Type | Amount (€) | Status | Invoice Date | Due Date | Payment Date |

**Format headers**: Bold, dark blue, white text
**Freeze row**: View → Freeze → 1 row

### Add Dropdowns

**Service Type (Column D)**:
1. D2 → **Data validation** → **List of items**: `Entry Audit, Project, Retainer`
2. Copy D2 → Paste D3:D100

**Status (Column F)**:
1. F2 → **Data validation** → **List of items**: `Invoiced, Paid, Overdue`
2. Copy F2 → Paste F3:F100

**Add sample invoice** (Row 2):

| A2 | B2 | C2 | D2 | E2 | F2 | G2 | H2 | I2 |
|----|----|----|----|----|----|----|----|----|
| INV-2026-001 | 2026-01-01 | Test Company | Project | 4900 | Paid | 2026-01-15 | 2026-01-30 | 2026-01-25 |

✅ **Checkpoint**: Status dropdown should show Invoiced/Paid/Overdue options

---

## STEP 6: SET UP ACTIVITY TAB (3 minutes)

**Click "Activity" tab**

### Add Headers (Row 1)

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 |
|----|----|----|----|----|----|----|----|----|
| Week Starting | Events Attended | Cards Collected | LinkedIn Posts | Profile Views | Discovery Calls | Proposals Sent | Billable Hours | Non-Billable Hours |

**Format headers**: Bold, dark blue, white text
**Freeze row**: View → Freeze → 1 row

**Add sample week** (Row 2):

| A2 | B2 | C2 | D2 | E2 | F2 | G2 | H2 | I2 |
|----|----|----|----|----|----|----|----|----|
| 2026-01-06 | 2 | 15 | 4 | 250 | 3 | 2 | 20 | 10 |

✅ **Checkpoint**: Activity tab should have 9 columns with sample week data

---

## STEP 7: ADD KEY METRICS (2 minutes)

**Go back to "Leads" tab**

Scroll down to Row 1001 (or any empty area below your data)

### Add Summary Statistics

**A1001**: Type `Lead Statistics`
**A1002**: Type `Total Leads`
**B1002**: Type formula `=COUNTA(B2:B999)`

**A1004**: Type `Status Breakdown`
**A1005**: Type `New`
**B1005**: Type formula `=COUNTIF(K2:K999,"New")`

**A1006**: Type `Contacted`
**B1006**: Type formula `=COUNTIF(K2:K999,"Contacted")`

**A1007**: Type `Discovery Calls Booked`
**B1007**: Type formula `=COUNTIF(K2:K999,"Discovery Call Booked")`

**A1008**: Type `Won`
**B1008**: Type formula `=COUNTIF(K2:K999,"Won")`

✅ **Checkpoint**: B1002 should show "1" (your test lead), B1005 should show "1" (status = "New")

---

## WHAT YOU NOW HAVE (BASIC DASHBOARD)

✅ **Leads Tab**:
- 15 columns with dropdowns
- Auto-numbering
- Status tracking (New → Contacted → Discovery → Proposal → Won/Lost)
- Summary statistics below data

✅ **Pipeline Tab**:
- 10 columns tracking opportunities
- Weighted pipeline value calculation
- Stage tracking (Discovery → Closed Won/Lost)

✅ **Revenue Tab**:
- 9 columns tracking invoices
- Payment status tracking
- Basic invoice management

✅ **Activity Tab**:
- 9 columns tracking weekly activities
- Networking events, LinkedIn metrics, calls, hours

✅ **Reviews Tab**:
- Empty (ready for monthly review notes)

---

## NEXT STEPS (OPTIONAL ENHANCEMENTS)

**Conditional Formatting** (makes statuses colorful):
1. Leads tab → Select column K (Status)
2. **Format** → **Conditional formatting**
3. Add rules:
   - If "Won" → Green background
   - If "Lost" → Gray background
   - If "Proposal Sent" → Yellow background

**Add Charts**:
1. **Insert** → **Chart**
2. Chart editor → Choose data range (e.g., B1005:B1008 for status breakdown)
3. Chart type → Bar chart or Pie chart

**Mobile Access**:
1. Install **Google Sheets** app on phone (iOS/Android)
2. Sign in → Find "VarnaAI Metrics Dashboard - 2026"
3. Star it for quick access

---

## DAILY USAGE (5 minutes/day)

**After networking event**:
1. Open Leads tab
2. Add new row for each business card collected
3. Fill in: Name, Company, Industry, Source, Status = "New"

**After discovery call**:
1. Open Pipeline tab
2. Add new row: Opportunity Name, Company, Service Type, Value, Stage = "Discovery"

**When invoice paid**:
1. Open Revenue tab
2. Find invoice row
3. Update Status = "Paid", add Payment Date

**Weekly (Friday afternoon, 30 minutes)**:
1. Activity tab: Add new row with week's metrics
2. Leads tab: Update all statuses (who did you contact?)
3. Pipeline tab: Update stages (what moved forward?)

---

## BACKUP (Once a month)

1. **File** → **Download** → **Microsoft Excel (.xlsx)**
2. Save to: `D:\VarnaAI\Backups\Dashboard\VarnaAI-Dashboard-2026-01.xlsx`

---

## TROUBLESHOOTING

**Problem**: Formulas showing #REF!
**Fix**: Check tab names match exactly ("Leads" not "leads")

**Problem**: Dropdowns not working
**Fix**: Re-apply data validation to cells

**Problem**: Can't find spreadsheet
**Fix**: Google Sheets homepage → Recent files → Should be at top

**Problem**: Lost data
**Fix**: **File** → **Version history** → **See version history** → Restore old version

---

**Status**: Basic dashboard ready in 30 minutes
**Full guide**: See `google-sheets-dashboard-setup.md` for advanced features
**Next**: Start using daily, add real lead data as you collect business cards

**Questions?** Follow the steps exactly, don't skip "✅ Checkpoint" validations
