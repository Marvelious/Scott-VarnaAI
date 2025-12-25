# Freelance Job Hunter

Automated job hunting agent for freelance.de and freelancermap.de with Telegram notifications.

## Features

- 🔍 Scrapes freelance.de and freelancermap.de for matching jobs
- 🎯 Keyword-based filtering (Security, AI, Compliance)
- 💰 Rate filtering (€100+/hour minimum)
- 📊 Job scoring based on keyword matches and criteria
- 💾 SQLite database for job tracking
- 📱 Telegram notifications for new matches
- ✍️ Application status tracking
- 🐳 Docker-ready

## Quick Start

### 1. Add Credentials

```bash
cd D:\VarnaAI\Websites\work\secrets

# Freelance sites
python keymanager.py set freelance.de username "your@email.com"
python keymanager.py set freelance.de password "yourpassword"
python keymanager.py set freelancermap.de username "your@email.com"
python keymanager.py set freelancermap.de password "yourpassword"

# Telegram (get from @BotFather)
python keymanager.py set telegram bot_token "123456:ABC-DEF..."
python keymanager.py set telegram chat_id "your_chat_id"
```

### 2. Run with Docker

```bash
cd D:\VarnaAI\Websites\work\jobs

# Build
docker-compose build

# Search for jobs
docker-compose run --rm hunter python hunter.py search

# List jobs
docker-compose run --rm hunter python hunter.py list

# Show stats
docker-compose run --rm hunter python hunter.py stats
```

### 3. Or Run Locally

```bash
# Install dependencies
pip install -r requirements.txt
playwright install chromium

# Search
python hunter.py search

# List jobs
python hunter.py list --new
```

## CLI Commands

```bash
# Search for new jobs
python hunter.py search
python hunter.py search --site freelance.de
python hunter.py search --no-notify
python hunter.py search --visible  # Show browser

# List jobs
python hunter.py list
python hunter.py list --new
python hunter.py list --min-score 50
python hunter.py list --site freelancermap.de

# Show job details
python hunter.py show 123

# Track applications
python hunter.py apply 123 --notes "Applied via portal"
python hunter.py status 123 interview
python hunter.py status 123 won --notes "Start date: Feb 1"

# Statistics
python hunter.py stats
python hunter.py stats --telegram

# Test Telegram
python hunter.py test

# Initialize database
python hunter.py init
```

## Configuration

Edit `config.yaml` to customize:

```yaml
keywords:
  security:
    - Firewall
    - Palo Alto
    - CISO
    - ISO 27001
  ai:
    - KI
    - Projektmanagement
    - Azure

filters:
  min_rate: 100
  location_preference:
    - remote
    - Remote

scoring:
  keyword_match: 10
  exact_match: 20
  remote_bonus: 15
```

## File Structure

```
work/jobs/
├── hunter.py           # Main CLI
├── scraper.py          # Playwright scrapers
├── database.py         # SQLite operations
├── notifier.py         # Telegram notifications
├── config.yaml         # Keywords & settings
├── requirements.txt    # Python dependencies
├── pytest.ini          # Test configuration
├── Dockerfile
├── docker-compose.yml
├── data/
│   └── jobs.db         # SQLite database
├── tests/
│   ├── test_scraper.py   # Scraper tests
│   ├── test_database.py  # Database tests
│   └── test_notifier.py  # Notifier tests
└── README.md
```

## Testing

Run the test suite:

```bash
# Install test dependencies
pip install pytest pytest-cov

# Run all tests
pytest

# Run with coverage
pytest --cov=. --cov-report=term-missing

# Run specific test file
pytest tests/test_scraper.py

# Run specific test
pytest tests/test_scraper.py::TestExtractRate::test_extract_rate_range_with_euro_symbol
```

## Database Schema

**jobs** - Found job listings
- id, site, title, company, rate_min, rate_max, url, description
- location, keywords_matched, score, found_at, notified

**applications** - Your application tracking
- id, job_id, status, applied_at, notes, updated_at

**analytics** - Daily statistics
- date, jobs_found, avg_rate, top_keywords

## Application Statuses

| Status | Emoji | Description |
|--------|-------|-------------|
| applied | 📝 | Initial application sent |
| interview | 💬 | Interview scheduled/completed |
| offer | 🎉 | Received an offer |
| rejected | ❌ | Application rejected |
| won | 🏆 | Got the contract! |

## Telegram Setup

1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Send `/newbot` and follow prompts
3. Copy the bot token
4. Get your chat ID:
   - Message [@userinfobot](https://t.me/userinfobot)
   - Or message your bot and check `https://api.telegram.org/bot<TOKEN>/getUpdates`
5. Add credentials to keymanager

## Tips

- Run `search` daily to catch new jobs
- High-score jobs (50+) get individual Telegram messages
- Lower-score jobs get bundled in digests
- Use `--visible` flag to debug scraping issues
- Check `stats` weekly to track your progress
