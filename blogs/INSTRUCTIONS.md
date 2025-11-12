# Blog Generation Instructions

Essential SEO rules and WordPress formatting for 100/100 Rank Math scores.

---

## The 3 Critical Rules

1. **Embed links IN content** - Not in code blocks (invisible to SEO)
2. **Use WordPress blocks** - With spacers before every H2
3. **External links DOFOLLOW** - rel="noopener" ONLY (NO nofollow on authority citations)

---

## WordPress Block Format (MANDATORY)

**WRONG ❌**: Plain HTML (sections run together)
```html
<h2>Section Title</h2>
<p>Content here.</p>
<h2>Next Section</h2>
```

**RIGHT ✅**: WordPress blocks with spacers
```
<!-- wp:heading -->
<h2 class="wp-block-heading">Section Title</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Content with <a href="/services" target="_blank">embedded link</a> naturally.</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Next Section</h2>
<!-- /wp:heading -->
```

**Rules**:
- ALL headings: `<!-- wp:heading -->` wrapper (or `{"level":3}` for H3)
- ALL paragraphs: `<!-- wp:paragraph -->` wrapper
- Spacer: `<!-- wp:spacer {"height":"40px"} -->` BEFORE every H2
- Schemas: Only use `<!-- wp:html -->` for schema scripts at END

---

## Link Formatting

### Internal Links (7 per post)
```html
<a href="/services" target="_blank">our AI services</a>
```
- Format: HTML with target="_blank"
- Placement: IN sentences, not lists or code blocks
- Validation: Check URLS.md BEFORE using

### External Authority Links (3 per post - DOFOLLOW)
```html
<a href="https://www.gartner.com" target="_blank" rel="noopener">Gartner Research</a>
```
- Format: rel="noopener" ONLY (NO nofollow!)
- Sources: Gartner, McKinsey, ISO, EU sites, BSI, Adobe
- Why DOFOLLOW: Shows Google you cite quality sources, improves SEO

**Never use nofollow on authority citations** - blocks PageRank flow and reduces SEO value.

**When to use nofollow**:
- ✅ Sponsored/paid links
- ✅ Affiliate links
- ❌ NEVER for authority citations

---

## Focus Keyword Rules

### Exact Phrase Matching
Rank Math counts EXACT phrases only!

**These DON'T count**:
- "KI Projektassistenten" (missing "trainieren")
- "KI-Projektassistenten trainieren" (hyphen breaks it)
- "trainieren KI Projektassistenten" (wrong order)

**These DO count**:
- "KI Projektassistenten trainieren" (exact match)

### Tracking Method
- **Target**: 18-22 occurrences in 2000-word post
- **Track**: After each section, Ctrl+F for exact phrase
- **Running count**: Keep tally in comment: `<!-- Focus: 5/22 -->`
- **Distribution**: 2-3 per major section, not clustered

### Natural Placement
```
Introduction: "[Focus keyword] transforms how enterprises work..."
Problem: "Without [focus keyword], companies struggle with..."
Solution: "Our [focus keyword] platform addresses these..."
Benefits: "When implementing [focus keyword], organizations see..."
Conclusion: "Start your [focus keyword] journey today..."
```

---

## Paragraph Rules

**Maximum 3 sentences per paragraph** - Rank Math penalizes 4+

**WRONG ❌** (5 sentences):
```
Traditional project management struggles to keep pace. Project managers spend 40%
of time manually assigning tasks. Human errors lead to resource conflicts. In contrast,
AI systems automatically balance resources. This saves time and reduces errors.
```

**RIGHT ✅** (2 paragraphs of 3 sentences):
```
Traditional project management struggles to keep pace. Project managers spend 40%
of time manually assigning tasks. Human errors lead to resource conflicts.

In contrast, AI systems automatically balance resources based on availability
and skills. They analyze workload and predict bottlenecks. This saves time
and reduces errors.
```

---

## SEO Title Format

**Template**: `[Number] [Power Word] [Focus Keyword] [Year]`

**Power Words** (use ONE):
- Revolutionary, Explosive, Massive, Breakthrough, Critical, Ultimate, Proven, Game-Changing, Essential

**Example**:
```
7 Revolutionary Secure AI Project Management Strategies 2025
```

---

## Meta Description Format

**CRITICAL**: Focus keyword must appear in FIRST 10 words!

**WRONG ❌**: "Discover how Varna AI enables enterprises to manage..."
- Focus keyword starts at word 5
- Rank Math penalizes this

**RIGHT ✅**: "Secure AI project management with Varna AI enables enterprises to automate..."
- Focus keyword in first 4 words
- Rank Math scores 100/100

**Template**: `[FOCUS KEYWORD] with [Company] [benefit verb] [target audience] to [outcome]`

---

## Validation Checklist

**Pre-Writing**:
- [ ] Read URLS.md for target site
- [ ] Verify 7 internal URLs exist
- [ ] Plan 3 external authority links
- [ ] Select power word for title
- [ ] Check topic not used (TOPIC_DIVERSITY_MATRIX.md)

**While Writing**:
- [ ] H1 with: Number + Power Word + Keyword + Year
- [ ] WordPress block format throughout
- [ ] Embed links IN content as I write
- [ ] Track focus keyword: <!-- Count: X/22 -->
- [ ] Break paragraphs at 3 sentences max
- [ ] Add spacer before EVERY H2

**Post-Writing**:
- [ ] Focus keyword appears 18-22 times (Ctrl+F exact phrase)
- [ ] All 7 internal links IN content (not code blocks)
- [ ] All 3 external links with rel="noopener" ONLY
- [ ] Zero paragraphs exceed 3 sentences
- [ ] Meta description: keyword in first 10 words
- [ ] WordPress block format with spacers verified
- [ ] JSON schemas in <!-- wp:html --> blocks at end

---

## Common Mistakes

1. ❌ Writing content first, adding links after
2. ❌ Using markdown links instead of HTML
3. ❌ Forgetting target="_blank" attribute
4. ❌ Adding rel="nofollow" to external authority links
5. ❌ Listing links in metrics without embedding in content
6. ❌ Using non-existent URLs (/demo, /signup, /features)
7. ❌ Forgetting power word in title
8. ❌ Exceeding 3 sentences per paragraph
9. ❌ Using plain HTML instead of WordPress blocks
10. ❌ Forgetting spacer blocks between sections

---

## Success Metrics

When done right:
- ✅ 100/100 Rank Math score
- ✅ All links embedded on first pass
- ✅ Perfect WordPress spacing
- ✅ Zero retrofitting needed
- ✅ ~56K tokens saved vs fixing errors
