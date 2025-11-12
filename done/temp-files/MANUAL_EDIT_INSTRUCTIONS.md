# Manual Edit Instructions for Internal Links

Since WordPress REST API doesn't allow programmatic editing, here are the exact text replacements Big Dick needs to make in the WordPress Code Editor.

## IT-Sicherheit Page (Post ID 317157)

**URL**: https://ai-projektmanager.de/wp-admin/post.php?post=317157&action=edit

### How to Edit:
1. Click the `⋮` (three dots) menu in top-right of WordPress editor
2. Select "Code editor" (if not already in code view)
3. Use Ctrl+F (Find) to locate each "FIND" text below
4. Replace with the corresponding "REPLACE" text
5. Click "Update" when all 3 changes are done

---

### ✏️ Edit 1: Add Compliance Management Link

**FIND THIS TEXT:**
```
Unsere Plattform wurde speziell für die hohen Anforderungen von IT-Sicherheitsteams entwickelt. Mit End-to-End-Verschlüsselung, detaillierten Audit-Trails und automatischer Compliance-Prüfung erfüllen Sie alle gesetzlichen Vorgaben – von DSGVO bis NIS2. Weiterführende Informationen zu Sicherheitsstandards erhalten Sie beim Bundesamt für Sicherheit in der Informationstechnik.<a href="https://www.bsi.bund.de" target="_blank" rel="noreferrer noopener">https://www.bsi.bund.de</a>
```

**REPLACE WITH:**
```
Unsere Plattform erfüllt alle gesetzlichen Vorgaben – von DSGVO bis NIS2. Für umfassende <a href="https://ai-projektmanager.de/compliance-management/">DSGVO und NIS2-konforme Compliance-Management-Lösungen</a> bieten wir automatisierte Dokumentation und Audit-Trails. Weiterführende Informationen zu Sicherheitsstandards erhalten Sie beim <a href="https://www.bsi.bund.de" target="_blank" rel="noreferrer noopener">Bundesamt für Sicherheit in der Informationstechnik</a>.
```

**What Changed:** Restructured sentence and added internal link to `/compliance-management/`

---

### ✏️ Edit 2: Add Fallstudien Link

**FIND THIS TEXT (look near the bottom of features section):**
```
<!-- /wp:kadence/rowlayout -->

<!-- wp:kadence/rowlayout
```

**INSERT BETWEEN THEM (add a new paragraph block):**
```
<!-- wp:paragraph -->
<p>Erfahren Sie mehr über <a href="https://ai-projektmanager.de/fallstudien/">erfolgreiche IT-Sicherheitsprojekte in unseren Fallstudien</a>, von Firewall-Migrationen bis zu Enterprise Security-Audits.</p>
<!-- /wp:paragraph -->

```

**Note:** This adds a completely new paragraph with link to case studies page.

---

### ✏️ Edit 3: Add Enterprise Link

**FIND THIS TEXT (look for second occurrence of row layout closing):**
```
<!-- /wp:kadence/rowlayout -->

<!-- wp:kadence/rowlayout
```

**INSERT BETWEEN THEM (at the SECOND occurrence):**
```
<!-- wp:paragraph -->
<p>Für Großunternehmen bieten wir <a href="https://ai-projektmanager.de/enterprise-projektmanagement/">Enterprise Projektmanagement mit globaler Skalierung</a>, inklusive SSO-Integration und 24/7 Premium Support.</p>
<!-- /wp:paragraph -->

```

**Note:** This adds a paragraph about enterprise features.

---

## Quick Verification Checklist

After making changes, verify:
- [ ] All 3 links are present (search for "compliance-management", "fallstudien", "enterprise-projektmanagement")
- [ ] No broken HTML tags
- [ ] Page preview looks correct
- [ ] Click "Update" to save

---

## Alternative: Simple Copy-Paste Method

If the find-replace approach is too complex, Big Dick can:

1. Switch to "Visual editor" mode
2. Manually locate the 3 paragraphs mentioned in `LINKS_TO_PASTE.md`
3. Edit them directly in the visual editor to add the links
4. WordPress will handle the HTML conversion automatically

This is slower but safer for someone not comfortable with code editing.

---

**Created:** November 9, 2025
**For:** ai-projektmanager.de internal linking optimization
**Expected Outcome:** +3 internal links on IT-Sicherheit page
