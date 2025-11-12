# Lessons Learned (Error Archive)

**Total Token Waste**: 56,000 tokens (~$0.84) from 7 errors in 2025-01-04 & 2025-01-08 sessions

These errors are NOW PREVENTED by the workflow in START_HERE.md and INSTRUCTIONS.md.

---

## Error #1: Links Not Embedded in Content (30K tokens wasted)

**What Happened**:
- Generated 5 complete posts
- Listed links in metrics: "Internal Links: /security /pricing /demo"
- Did NOT embed links as HTML in actual content
- User: "mate where are the fucking links?"

**Fix**: Went back and embedded all 7 internal + 3 external links per post

**Prevention**: INSTRUCTIONS.md now requires embedding links AS YOU WRITE

---

## Error #2: Keyword Density Too Low (2K tokens wasted)

**What Happened**:
- Focus keyword appeared 16 times (0.48% density)
- Target: 18-22 times (0.9-1.0% density)

**Fix**: Added 4 more natural occurrences

**Prevention**: INSTRUCTIONS.md requires tracking keyword count WHILE writing

---

## Error #3: Missing Power Words (500 tokens wasted)

**What Happened**:
- Titles had no power words
- Rank Math: "Your title doesn't contain a power word"

**Fix**: Added power words (Revolutionary, Massive, Explosive, Breakthrough, Critical)

**Prevention**: INSTRUCTIONS.md lists power words and requires them in titles

---

## Error #4: Non-Existent Internal URLs (15K tokens wasted)

**What Happened**:
- Used imaginary URLs: /demo, /signup, /security, /features
- All 35+ internal URLs across 5 posts were WRONG
- Violated "Evidence > assumptions" principle

**Fix**: Created URLS.md with actual existing pages, corrected all 35 URLs

**Prevention**: URLS.md now mandatory validation BEFORE writing

---

## Error #5: Using www. Prefix (500 tokens wasted)

**What Happened**:
- Used www.varnaai.com instead of varnaai.com

**Fix**: Removed www. prefix from all links

**Prevention**: URLS.md shows canonical format without www.

---

## Error #6: No Visual Spacing (5K tokens wasted)

**What Happened**:
- Used plain HTML instead of WordPress blocks
- WordPress theme CSS stripped all margins
- Sections ran together with 0px spacing

**Fix**: Converted to WordPress block format with spacer blocks

**Prevention**: INSTRUCTIONS.md requires WordPress blocks with <!-- wp:spacer -->

---

## Error #7: External Links Nofollow (3K tokens wasted)

**What Happened**:
- Used rel="nofollow noopener" on authority links
- Rank Math: "all outbound links are nofollow"
- Blocks SEO benefit of citing credible sources

**Fix**: Changed to rel="noopener" ONLY (removed nofollow)

**Prevention**: INSTRUCTIONS.md emphasizes DOFOLLOW for authority citations

---

## Key Lessons

1. **Workflow Order Matters**: Validate URLs → Plan links → Write with embedded links
2. **Evidence > Assumptions**: NEVER guess URLs, verify in URLS.md first
3. **Prevention > Correction**: Reading workflow completely saves massive token waste
4. **Checklist Discipline**: Having checklist ≠ following checklist
5. **Platform-Specific Formatting**: WordPress requires block format, not plain HTML
6. **Visual Spacing Matters**: Theme CSS strips margins - use spacer blocks
7. **Link Attributes Matter**: Authority links should be DOFOLLOW (no nofollow!)

---

## Correct Workflow (Now Automated in START_HERE.md)

1. Read URLS.md for target website's actual pages
2. Verify topic uniqueness in TOPIC_DIVERSITY_MATRIX.md
3. Plan 7 internal links using ONLY verified URLs
4. Plan 3 external authority links
5. Write in WordPress block format (<!-- wp:heading -->, <!-- wp:paragraph -->)
6. Embed all 10 links AS YOU WRITE in HTML format
7. Add <!-- wp:spacer {"height":"40px"} --> before EVERY H2
8. Count focus keyword occurrences (target: 18-22)
9. Break paragraphs at 3 sentences max
10. Use rel="noopener" ONLY on external links (NO nofollow)

---

**Last Updated**: 2025-01-08
**Status**: All errors now prevented by automated workflow
