#!/usr/bin/env python3
"""
Import Existing Backlinks from VarnaAI Backlinks.xlsx
Imports 318 directory submission opportunities into PostgreSQL database
"""

import openpyxl
import psycopg2
from datetime import datetime

# Database connection
conn = psycopg2.connect(
    host="localhost",
    database="backlink_campaigns",
    user="postgres",
    password="changeme"
)
cur = conn.cursor()

# Load Excel workbook
excel_path = r"C:\Users\nfals\My Drive\2025\DM\VarnaAI Backlinks.xlsx"
wb = openpyxl.load_workbook(excel_path)

print(f"Loading workbook: {excel_path}")
print(f"Sheets available: {wb.sheetnames}")

# Import from Backlinks 1 sheet
ws = wb['Backlinks 1']
print(f"\nProcessing sheet: Backlinks 1")

opportunities_imported = 0
backlinks_acquired = 0

# Skip header row, process data rows
for row in list(ws.rows)[1:]:
    domain_url = row[0].value  # Links column
    score = row[1].value       # Score column (DA estimate)
    live_url = row[2].value    # Live Backlinks column

    if not domain_url:
        continue

    # Extract clean domain from URL
    domain_clean = str(domain_url).replace('https://', '').replace('http://', '').split('/')[0]

    # Determine status
    status = 'acquired' if (live_url and str(live_url).startswith('http')) else 'new'

    try:
        # Insert opportunity
        cur.execute("""
            INSERT INTO link_opportunities
            (domain, page_url, type, domain_authority, status, target_site, discovered_method, discovered_date)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
            RETURNING id
        """, (
            domain_clean,
            domain_url,
            'directory',
            int(score) if score else 0,
            status,
            'varnaai.com',
            'manual_import',
            datetime.now().date()
        ))

        result = cur.fetchone()
        if result:
            opportunity_id = result[0]
            opportunities_imported += 1

            # If backlink acquired, insert into acquired_backlinks
            if status == 'acquired' and live_url:
                cur.execute("""
                    INSERT INTO acquired_backlinks
                    (opportunity_id, live_url, link_type, acquired_date, status)
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT DO NOTHING
                """, (
                    opportunity_id,
                    live_url,
                    'dofollow',
                    datetime.now().date(),
                    'active'
                ))
                backlinks_acquired += 1

    except Exception as e:
        print(f"Warning: Error importing {domain_clean}: {str(e)}")
        continue

conn.commit()

print(f"\nImport complete!")
print(f"   Opportunities imported: {opportunities_imported}")
print(f"   Backlinks acquired: {backlinks_acquired}")

# Verify import
cur.execute("SELECT COUNT(*) FROM link_opportunities WHERE discovered_method = 'manual_import'")
total_opportunities = cur.fetchone()[0]

cur.execute("""
    SELECT COUNT(*) FROM acquired_backlinks ab
    JOIN link_opportunities lo ON ab.opportunity_id = lo.id
    WHERE lo.discovered_method = 'manual_import'
""")
total_backlinks = cur.fetchone()[0]

print(f"\nDatabase verification:")
print(f"   Total opportunities in DB: {total_opportunities}")
print(f"   Total acquired backlinks in DB: {total_backlinks}")

cur.close()
conn.close()

print("\nReady to start backlink automation!")
