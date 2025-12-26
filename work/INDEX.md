# Work Directory Index

**Location**: `D:\VarnaAI\Websites\work\`
**Last Updated**: 2025-12-26
**Purpose**: Active work projects, job hunting agent, and centralized secrets management

---

## Directory Structure

```
work/
├── accountant/         # Accountant communication drafts
├── crm/                # CRM Docker setup
├── gastro/             # Gastronomy project (empty)
├── IOT/                # IoT project (empty)
├── jobs/               # Freelance job hunter agent
├── realestate/         # Real estate project
└── secrets/            # Centralized credentials (keymanager)
```

---

## Secrets (`work/secrets/`) - CRITICAL

**Centralized credential management for all projects.**

| File | Purpose |
|------|---------|
| `keymanager.py` | Python script to get/set/list secrets |
| `secrets.yaml` | All API keys and passwords (**GITIGNORED**) |
| `README.md` | Keymanager documentation |
| `.gitignore` | Protects secrets.yaml from commits |

### Keymanager Usage

```bash
# View all WordPress credentials
cd D:\VarnaAI\Websites\work\secrets
python keymanager.py get wordpress varnaai.com

# Get specific credential
python keymanager.py get wordpress ai-projektmanager.de password

# List all available keys
python keymanager.py list
```

### In Python Code

```python
import sys
sys.path.insert(0, "D:/VarnaAI/Websites/work")
from secrets.keymanager import get_wordpress

creds = get_wordpress("varnaai.com")
# Returns: {"username": "claude", "password": "...", "login_url": "..."}
```

### Available Credential Categories

- `wordpress` - All 5 WordPress site credentials
- `api` - API keys (OpenAI, etc.)
- `database` - Database credentials
- `social` - Social media credentials

---

## Jobs (`work/jobs/`) - Freelance Job Hunter

Automated freelance job hunting agent:

| File | Purpose |
|------|---------|
| `hunter.py` | Main job hunting script |
| `scraper.py` | Job board scraper |
| `database.py` | Job database operations |
| `notifier.py` | Job notification system |
| `config.yaml` | Configuration settings |
| `requirements.txt` | Python dependencies |
| `README.md` | Job hunter documentation |
| `docker-compose.yml` | Docker setup |
| `Dockerfile` | Container definition |
| `pytest.ini` | Test configuration |

### Tests

| File | Purpose |
|------|---------|
| `tests/__init__.py` | Test package |
| `tests/test_database.py` | Database tests |
| `tests/test_notifier.py` | Notifier tests |
| `tests/test_scraper.py` | Scraper tests |

### Data

| Directory | Purpose |
|-----------|---------|
| `data/` | Job data storage (empty) |

---

## Accountant (`work/accountant/`)

| Directory | Purpose |
|-----------|---------|
| `drafts/` | Communication drafts |

| File | Purpose |
|------|---------|
| `drafts/2025-12_november_accountant_email.md` | November email draft |

---

## CRM (`work/crm/`)

| File | Purpose |
|------|---------|
| `docker-compose.yml` | CRM Docker configuration |

---

## Real Estate (`work/realestate/`)

| File | Purpose |
|------|---------|
| `WEDGE_OFFER_MVP.md` | Real estate wedge offer MVP |

---

## Empty Project Folders

| Directory | Purpose |
|-----------|---------|
| `gastro/` | Gastronomy project (future) |
| `IOT/` | IoT project (future) |

---

## Security Notes

- **secrets.yaml** is NEVER committed to git
- Always use keymanager.py to access credentials
- Rotate credentials periodically
- Keep README.md updated with new credential categories

---

## Cross-References

- **Main CLAUDE.md**: `D:\VarnaAI\Websites\CLAUDE.md`
- **Operations**: `D:\VarnaAI\Websites\operations\INDEX.md`
- **Apps (uses credentials)**: `D:\VarnaAI\Websites\apps\INDEX.md`

---

*Generated: 2025-12-26*
