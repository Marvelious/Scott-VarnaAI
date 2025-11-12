# Schema.org Templates for VarnaAI Portfolio Sites

## CRITICAL RULE: Never Generate Schema Without User Confirmation

**STOP AND ASK** before creating any Schema markup. The user will provide the correct Schema format.

## Common Schema Mistakes to AVOID

### ❌ WRONG: Assuming FAQ Schema for FAQ Content
Just because a page has FAQ questions doesn't mean it needs FAQPage Schema.
- Services pages with FAQs → Often better without FAQ Schema
- Pricing pages → Use ItemList + Product Schema (see below)
- Portfolio pages → Use specific schemas the user provides

### ❌ WRONG: Creating Schema Without Context
Don't generate Schema based on page content alone. User knows:
- What Google Search Console requires
- What rich snippets they want
- What Schema is already working on other sites

## Correct Schema Templates (User-Approved)

### Pricing Page Schema (ItemList + Product)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Product",
      "position": 1,
      "name": "Varna AI Basic Plan",
      "description": "GDPR-compliant AI tools for startups and small businesses. Includes secure EU-based cloud hosting, task automation, and email support.",
      "brand": {
        "@type": "Brand",
        "name": "Varna AI"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://varnaai.com/secure-ai-saas-pricing/",
        "priceCurrency": "EUR",
        "price": "Contact for pricing",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "Varna AI"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127"
      }
    },
    {
      "@type": "Product",
      "position": 2,
      "name": "Varna AI Regular Plan",
      "description": "For SMEs needing stronger security and compliance. Includes AI project management dashboard, AES-256 encryption, priority support, and monthly compliance reports.",
      "brand": {
        "@type": "Brand",
        "name": "Varna AI"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://varnaai.com/secure-ai-saas-pricing/",
        "priceCurrency": "EUR",
        "price": "Contact for pricing",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "Varna AI"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "89"
      }
    },
    {
      "@type": "Product",
      "position": 3,
      "name": "Varna AI Premium Plan",
      "description": "Enterprise-grade AI with strict compliance and automation. Includes dedicated account manager, custom GDPR audits, AI-powered workflow automation, and 24/7 security monitoring.",
      "brand": {
        "@type": "Brand",
        "name": "Varna AI"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://varnaai.com/secure-ai-saas-pricing/",
        "priceCurrency": "EUR",
        "price": "Contact for pricing",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "Varna AI"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "42"
      }
    }
  ]
}
```

## Workflow for Schema Markup

1. **User requests Schema** → Ask: "What Schema type do you need?"
2. **User provides example** → Use their exact format
3. **Never assume** → Don't generate Schema based on page content alone
4. **Validate first** → Check if Schema already exists on page
5. **User adds Schema** → Claude doesn't have Rank Math Schema panel access

## Schema Types Available (Reference Only)

- Organization (already implemented site-wide)
- Article (already implemented for pages)
- BreadcrumbList (already implemented)
- ItemList + Product (for pricing pages - see template above)
- Service (requires user approval)
- FAQPage (requires user approval and confirmation)
- HowTo (requires user approval)
- Review/Rating (requires user approval)

## Remember

**Claude's Role**: Content optimization (keywords, links, word count)
**User's Role**: Schema markup, metadata, design blocks, images

Never cross into user's territory without explicit instruction.
