# ABOUTME: Centralized secrets manager for all VarnaAI credentials
# ABOUTME: Stores secrets in plain YAML (gitignored) - for local use only

import yaml
import sys
from pathlib import Path
from typing import Any

SECRETS_FILE = Path(__file__).parent / "secrets.yaml"


def _load_secrets() -> dict:
    """Load secrets from YAML file."""
    if not SECRETS_FILE.exists():
        return {}
    with open(SECRETS_FILE, "r", encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def _save_secrets(secrets: dict) -> None:
    """Save secrets to YAML file."""
    with open(SECRETS_FILE, "w", encoding="utf-8") as f:
        yaml.dump(secrets, f, default_flow_style=False, allow_unicode=True, sort_keys=False)


def get_secret(*keys: str) -> Any:
    """
    Get a secret value using dot notation or multiple keys.

    Usage:
        get_secret("wordpress", "varnaai.com", "password")
        get_secret("discord", "webhook_url")
        get_secret("freelance.de", "username")
    """
    secrets = _load_secrets()
    current = secrets
    for key in keys:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            return None
    return current


def set_secret(*args) -> None:
    """
    Set a secret value. Last argument is the value.

    Usage:
        set_secret("freelance.de", "username", "my@email.com")
        set_secret("discord", "webhook_url", "https://...")
    """
    if len(args) < 2:
        raise ValueError("Need at least key and value")

    keys = args[:-1]
    value = args[-1]

    secrets = _load_secrets()
    current = secrets

    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]

    current[keys[-1]] = value
    _save_secrets(secrets)
    print(f"  Set {'.'.join(keys)}")


def get_wordpress(site: str) -> dict:
    """Get WordPress credentials for a site."""
    return get_secret("wordpress", site) or {}


def get_freelance(site: str) -> dict:
    """Get freelance site credentials."""
    return get_secret(site) or {}


def list_secrets(show_values: bool = False) -> None:
    """List all services and keys."""
    secrets = _load_secrets()
    if not secrets:
        print("No secrets stored.")
        return

    def print_dict(d: dict, indent: int = 0):
        for key, val in d.items():
            prefix = "  " * indent
            if isinstance(val, dict):
                print(f"{prefix}{key}:")
                print_dict(val, indent + 1)
            else:
                if show_values:
                    print(f"{prefix}{key}: {val}")
                elif val and isinstance(val, str) and len(val) > 4:
                    masked = val[:2] + "*" * min(len(val) - 4, 10) + val[-2:]
                    print(f"{prefix}{key}: {masked}")
                elif val:
                    print(f"{prefix}{key}: ****")
                else:
                    print(f"{prefix}{key}: (empty)")

    print("\n=== VARNA AI SECRETS ===\n")
    print_dict(secrets)


def export_env(service: str = None) -> None:
    """Export secrets as environment variables format."""
    secrets = _load_secrets()

    def flatten(d: dict, prefix: str = "") -> list:
        items = []
        for key, val in d.items():
            new_key = f"{prefix}_{key}".upper() if prefix else key.upper()
            new_key = new_key.replace(".", "_").replace("-", "_")
            if isinstance(val, dict):
                items.extend(flatten(val, new_key))
            elif val:
                items.append(f"{new_key}={val}")
        return items

    if service and service in secrets:
        lines = flatten(secrets[service], service)
    else:
        lines = flatten(secrets)

    for line in lines:
        print(line)


# CLI interface
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("""
╔════════════════════════════════════════════════════════════╗
║           VARNA AI SECRETS MANAGER                         ║
╚════════════════════════════════════════════════════════════╝

USAGE:
  python keymanager.py list                    List all secrets (masked)
  python keymanager.py list --show             List all secrets (visible)
  python keymanager.py get <key> [key...]      Get a secret value
  python keymanager.py set <key> [key...] <v>  Set a secret value
  python keymanager.py env [service]           Export as ENV format

EXAMPLES:
  # Freelance credentials
  python keymanager.py set freelance.de username "my@email.com"
  python keymanager.py set freelance.de password "secret123"
  python keymanager.py get freelance.de username

  # Discord notifications
  python keymanager.py set discord webhook_url "https://discord.com/..."

  # WordPress (already populated)
  python keymanager.py get wordpress varnaai.com password

  # Export for shell
  python keymanager.py env discord
""")
        sys.exit(0)

    cmd = sys.argv[1].lower()

    if cmd == "list":
        show = "--show" in sys.argv
        list_secrets(show_values=show)

    elif cmd == "get":
        if len(sys.argv) < 3:
            print("Usage: python keymanager.py get <key> [key...]")
            sys.exit(1)
        value = get_secret(*sys.argv[2:])
        if value is not None:
            if isinstance(value, dict):
                for k, v in value.items():
                    print(f"{k}: {v}")
            else:
                print(value)
        else:
            print(f"Not found: {'.'.join(sys.argv[2:])}")
            sys.exit(1)

    elif cmd == "set":
        if len(sys.argv) < 4:
            print("Usage: python keymanager.py set <key> [key...] <value>")
            sys.exit(1)
        set_secret(*sys.argv[2:])

    elif cmd == "env":
        service = sys.argv[2] if len(sys.argv) > 2 else None
        export_env(service)

    else:
        print(f"Unknown command: {cmd}")
        sys.exit(1)
