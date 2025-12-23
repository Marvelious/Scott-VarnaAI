# C3 Compliance - Bulgarian Payment Setup Guide
# Ръководство за плащания в България
# Task 74: Bulgarian Payment Method Setup

---

## Overview / Обзор

Bulgarian businesses strongly prefer **bank transfers** over card payments.
This document covers payment setup for the Bulgarian market.

**Key Points:**
- Bank transfer is primary payment method
- Card payments as backup option
- All prices in BGN (лв.)
- VAT considerations for B2B

---

## Payment Methods / Методи за плащане

### Primary: Bank Transfer / Банков превод

**Preferred by 90%+ of Bulgarian B2B customers**

**Setup Required:**
1. Bulgarian bank account (BGN)
2. IBAN and BIC codes
3. Invoice with payment details

**Advantages:**
- ✓ No transaction fees (or minimal)
- ✓ Trusted by Bulgarian businesses
- ✓ Proper paper trail for accounting
- ✓ Professional image

**Bank Account Requirements:**
```
Bank:           [NAME OF BULGARIAN BANK]
Account Name:   Varna AI / [LEGAL NAME]
IBAN:           BG[XX] [BANK CODE] [ACCOUNT NUMBER]
BIC/SWIFT:      [BIC CODE]
Currency:       BGN (Bulgarian Lev)
```

**Recommended Bulgarian Banks:**
- UniCredit Bulbank
- DSK Bank
- Postbank (Eurobank)
- Raiffeisenbank
- First Investment Bank (FIBank)

---

### Secondary: Card Payment / Картово плащане

**Backup option for smaller transactions**

**Options:**
1. **Stripe** (supports BGN)
   - 2.9% + €0.25 per transaction
   - Easy integration
   - Professional checkout

2. **PayPal** (EUR conversion)
   - Higher fees
   - Currency conversion losses
   - Some Bulgarian businesses don't use

3. **myPOS** (Bulgarian company)
   - 1.5-2.5% per transaction
   - Local support
   - BGN native

**Recommendation:** Set up Stripe for BGN as backup.

---

## Pricing in BGN / Цени в лева

### Official Pricing Table

| Service | EUR | BGN (approx) |
|---------|-----|--------------|
| **Pilot Program (3 months)** | €500 | 980 лв. |
| **Monthly Pilot Payment** | €167/mo | 330 лв./мес |
| **Monthly Managed Service** | €150/mo | 290 лв./мес |
| **One-Time Audit** | €250 | 490 лв. |

**Exchange Rate Note:**
- Fixed rate: 1 EUR = 1.95583 BGN (Bulgaria is in ERM II)
- Use round BGN numbers for easier accounting
- Actual prices should be set in BGN, not converted daily

---

## VAT Considerations / ДДС съображения

### Bulgarian VAT Rules

**Standard VAT Rate:** 20%

**VAT Registration Threshold:**
- Annual turnover > 50,000 BGN → Mandatory VAT registration
- Below threshold → No VAT registration required

### Scenarios:

#### Scenario A: VarnaAI NOT VAT Registered
- Do NOT charge VAT on invoices
- Invoice shows: "Не е регистриран по ДДС"
- Prices are final (no VAT addition)

**Example Invoice:**
```
C3 Pilot Program:     980.00 лв.
ДДС:                  Не се начислява
─────────────────────────────────
ОБЩО:                 980.00 лв.
```

#### Scenario B: VarnaAI IS VAT Registered
- Must charge 20% VAT
- Invoice shows net + VAT + gross
- File monthly VAT returns

**Example Invoice:**
```
C3 Pilot Program (нето): 816.67 лв.
ДДС 20%:                 163.33 лв.
─────────────────────────────────
ОБЩО:                    980.00 лв.
```

#### Scenario C: EU Client Outside Bulgaria (B2B)
- Reverse charge mechanism
- No VAT charged
- Client handles VAT in their country
- Invoice notes: "Обратно начисляване на ДДС / Reverse charge"

### Action Items:
- [ ] Check if VarnaAI is VAT registered
- [ ] If not, monitor turnover against 50,000 BGN threshold
- [ ] Get accountant advice before first invoice

---

## Invoice Requirements / Изисквания за фактура

### Mandatory Fields (Bulgarian Law):

1. **Invoice Number** - Sequential, unique
2. **Issue Date** - Date of invoice creation
3. **Supplier Details:**
   - Legal name
   - ЕИК/БУЛСТАТ (company ID)
   - ДДС номер (VAT number, if registered)
   - Address
   - Bank details
4. **Recipient Details:**
   - Legal name
   - ЕИК/БУЛСТАТ
   - ДДС номер (if applicable)
   - Address
5. **Service Description** - Clear description of services
6. **Amounts:**
   - Net amount (данъчна основа)
   - VAT amount (ДДС)
   - Gross total (общо за плащане)
7. **Payment Terms** - Due date

### Invoice File Location:
`D:\VarnaAI\Websites\assets\sales-materials-bg\invoice-template-bg.md`

---

## Payment Instructions for Clients / Инструкции за плащане

### Bulgarian / На български:

```
═══════════════════════════════════════════════════════════════
                    ИНСТРУКЦИИ ЗА ПЛАЩАНЕ
═══════════════════════════════════════════════════════════════

За Вашето удобство, моля заплатете по банков път:

Банка:          [ИМЕ НА БАНКА]
Получател:      Varna AI / [LEGAL NAME]
IBAN:           BG[XX] [BANK CODE] [ACCOUNT NUMBER]
BIC/SWIFT:      [BIC CODE]
Сума:           [СУМА] лв.
Основание:      Фактура № [НОМЕР] / C3 Compliance

Срок на плащане: 14 дни от датата на фактурата

При въпроси: [EMAIL] или [ТЕЛЕФОН]

Благодарим Ви за бизнеса!

═══════════════════════════════════════════════════════════════
```

### English / На английски:

```
═══════════════════════════════════════════════════════════════
                    PAYMENT INSTRUCTIONS
═══════════════════════════════════════════════════════════════

For your convenience, please pay via bank transfer:

Bank:           [BANK NAME]
Beneficiary:    Varna AI / [LEGAL NAME]
IBAN:           BG[XX] [BANK CODE] [ACCOUNT NUMBER]
BIC/SWIFT:      [BIC CODE]
Amount:         [AMOUNT] BGN
Reference:      Invoice # [NUMBER] / C3 Compliance

Payment due: 14 days from invoice date

Questions? [EMAIL] or [PHONE]

Thank you for your business!

═══════════════════════════════════════════════════════════════
```

---

## Accounting Integration / Счетоводна интеграция

### Recommended Tools:

1. **Romanian/Bulgarian Accounting Software:**
   - Microinvest
   - Busiland
   - Ажур (Ajur)

2. **International Options:**
   - Xero (supports BGN)
   - FreshBooks
   - Wave (free)

3. **Spreadsheet Tracking:**
   - Simple Excel/Sheets for small volume
   - Track: Invoice #, Date, Client, Amount, Status, Payment Date

### Record Keeping:
- Keep digital copies of all invoices
- Minimum 10 years retention (Bulgarian law)
- Organize by year: `invoices/2024/`, `invoices/2025/`

---

## Setup Checklist / Контролен списък

### Before First Sale:

- [ ] Bulgarian bank account opened (BGN)
- [ ] IBAN and BIC codes documented
- [ ] VAT registration status confirmed
- [ ] Invoice template ready
- [ ] Accountant consulted (recommended)

### Per Client:

- [ ] Client company details collected (ЕИК, address)
- [ ] Service agreed and documented
- [ ] Invoice issued
- [ ] Payment instructions sent
- [ ] Payment received and recorded
- [ ] Receipt/confirmation sent

### Monthly:

- [ ] All invoices recorded in accounting
- [ ] Payments reconciled with bank
- [ ] VAT return filed (if registered)
- [ ] Cash flow reviewed

---

## Common Questions / Често задавани въпроси

**Q: Do I need a Bulgarian bank account?**
A: Strongly recommended for B2B sales. Bulgarian companies prefer paying to BG IBANs.

**Q: Can I invoice in EUR?**
A: Yes, but Bulgarian companies prefer BGN. They avoid currency risk.

**Q: What if payment is late?**
A: Send reminder at day 7, call at day 14, escalate at day 21.

**Q: Do I need an accountant?**
A: Recommended if you're not familiar with Bulgarian tax law. Cost: 50-150 лв./month for basic service.

---

## Next Steps / Следващи стъпки

1. **Immediate:** Choose Bulgarian bank and open account
2. **Week 1:** Finalize invoice template with real details
3. **Week 2:** Consult accountant on VAT status
4. **Week 3:** Test invoice process with first pilot client
5. **Ongoing:** Track payments and maintain records

---

*Created: December 2024*
*Task 74 - Bulgarian Payment Method Setup*
