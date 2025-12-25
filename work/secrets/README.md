# Local Secrets Manager

Simple YAML-based secrets manager for local agent development.

## Quick Start

```bash
cd D:\VarnaAI\Websites\work\secrets

# Add credentials
python keymanager.py set freelance.de username "your@email.com"
python keymanager.py set freelance.de password "yourpassword"
python keymanager.py set freelancermap.de username "your@email.com"
python keymanager.py set freelancermap.de password "yourpassword"
python keymanager.py set discord webhook_url "https://discord.com/api/webhooks/..."

# List all (shows masked values)
python keymanager.py list

# Get a specific value
python keymanager.py get freelance.de username
```

## Usage in Python

```python
import sys
sys.path.insert(0, "D:/VarnaAI/Websites/work")
from secrets.keymanager import get_secret, get_all

# Get single value
username = get_secret("freelance.de", "username")
password = get_secret("freelance.de", "password")

# Get all keys for a service
creds = get_all("freelance.de")
# Returns: {"username": "...", "password": "..."}
```

## Security Notes

- Secrets stored in plain YAML (gitignored)
- For LOCAL development only
- Never commit secrets.yaml
- You're the only user on this machine, so this is fine
