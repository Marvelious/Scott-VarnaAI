# Task ID: 74

**Title:** Bulgarian Payment Method Setup

**Status:** pending

**Dependencies:** None

**Priority:** high

**Description:** Configure payment processing for Bulgarian market. Bulgarians prefer bank transfers, not cards. Set up BGN invoicing.

**Details:**

**Per Expert Audit:**
> "Bulgarian companies prefer bank transfer, not card"

**Payment Setup:**
1. Verify VarnaAI can receive BGN payments
2. Set up bank transfer payment option
3. Configure Stripe/PayPal for BGN (backup)
4. Create Bulgarian invoice template

**Invoice Template (Bulgarian):**
Create: D:\VarnaAI\Websites\assets\invoice-template-bg.docx

Required fields:
- VarnaAI header
- BULSTAT: 206365963
- Bulgarian VAT number (if registered)
- Client details
- Service description (in Bulgarian)
- Amount in BGN (лв)
- VAT line (20% Bulgarian VAT)
- Bank details for transfer
- Payment terms (usually 14-30 days)

**VAT Considerations:**
- Bulgarian VAT is 20%
- Check if VarnaAI is VAT registered
- If not, may need to register if revenue exceeds threshold

**Test Strategy:**

1. Bank account can receive BGN
2. Invoice template created
3. VAT treatment clarified
4. Test invoice generated
5. Payment instructions clear in Bulgarian
