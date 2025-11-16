require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: 'backlink_campaigns',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'changeme'
});

async function testDatabase() {
  try {
    // Test connection
    const result = await pool.query('SELECT id, domain, type, target_site, status FROM link_opportunities LIMIT 5');

    console.log('✓ Database connection successful!');
    console.log('\nFirst 5 opportunities:');
    result.rows.forEach((row, i) => {
      console.log(`  ${i+1}. [${row.id}] ${row.domain} (${row.type}) -> ${row.target_site} [${row.status}]`);
    });

    // Get summary stats
    const stats = await pool.query(`
      SELECT
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'new' THEN 1 END) as new,
        COUNT(CASE WHEN status = 'acquired' THEN 1 END) as acquired
      FROM link_opportunities
    `);

    console.log('\nDatabase Summary:');
    console.log(`  Total opportunities: ${stats.rows[0].total}`);
    console.log(`  New (ready for outreach): ${stats.rows[0].new}`);
    console.log(`  Already acquired: ${stats.rows[0].acquired}`);

    await pool.end();
    console.log('\n✓ Test complete!');
  } catch (err) {
    console.error('Error:', err.message);
    await pool.end();
    process.exit(1);
  }
}

testDatabase();
