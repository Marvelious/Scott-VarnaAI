# ABOUTME: Telegram notification system for job alerts
# ABOUTME: Sends formatted job listings to Telegram chat

import sys
import logging
import requests
from pathlib import Path
from typing import Optional

# Configure logging
logger = logging.getLogger(__name__)

# Add secrets to path
SECRETS_PATH = Path(__file__).parent.parent / "secrets"
sys.path.insert(0, str(SECRETS_PATH.parent))

from secrets.keymanager import get_secret
from database import Job


def get_telegram_credentials() -> tuple[Optional[str], Optional[str]]:
    """Get Telegram bot token and chat ID from keymanager."""
    bot_token = get_secret("telegram", "bot_token")
    chat_id = get_secret("telegram", "chat_id")
    return bot_token, chat_id


def send_telegram_message(
    message: str,
    bot_token: Optional[str] = None,
    chat_id: Optional[str] = None,
    parse_mode: str = "HTML"
) -> bool:
    """
    Send a message via Telegram Bot API.
    Returns True if successful, False otherwise.
    """
    if not bot_token or not chat_id:
        bot_token, chat_id = get_telegram_credentials()

    if not bot_token or not chat_id:
        logger.error("Telegram credentials not found in keymanager")
        logger.error("Run: python keymanager.py set telegram bot_token 'YOUR_BOT_TOKEN'")
        logger.error("Run: python keymanager.py set telegram chat_id 'YOUR_CHAT_ID'")
        return False

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"

    payload = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": parse_mode,
        "disable_web_page_preview": True
    }

    try:
        response = requests.post(url, json=payload, timeout=10)
        response.raise_for_status()
        return True

    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to send Telegram message: {e}")
        return False


def format_job_message(job: Job) -> str:
    """Format a single job for Telegram message."""
    # Emoji based on score
    if job.score >= 50:
        score_emoji = "🔥"
    elif job.score >= 30:
        score_emoji = "⭐"
    else:
        score_emoji = "📋"

    # Rate display
    if job.rate_min and job.rate_max and job.rate_min != job.rate_max:
        rate_str = f"€{job.rate_min}-{job.rate_max}/h"
    elif job.rate_min:
        rate_str = f"€{job.rate_min}/h"
    elif job.rate_text:
        rate_str = job.rate_text
    else:
        rate_str = "Rate: TBD"

    # Keywords as hashtags
    keywords_str = " ".join(f"#{kw.replace(' ', '')}" for kw in (job.keywords_matched or [])[:3])

    message = f"""
{score_emoji} <b>{job.title}</b>

💰 {rate_str}
📍 {job.location or 'Location: TBD'}
🏢 {job.company or 'Company: TBD'}
📊 Score: {job.score}

{keywords_str}

🔗 <a href="{job.url}">View Job</a>
"""
    return message.strip()


def format_jobs_digest(jobs: list[Job], title: str = "New Jobs Found") -> str:
    """Format multiple jobs as a digest message."""
    if not jobs:
        return "No new jobs found matching your criteria."

    lines = [f"<b>🎯 {title}</b>", f"<i>{len(jobs)} matching jobs found</i>", ""]

    for i, job in enumerate(jobs, 1):
        # Rate display
        if job.rate_min:
            rate_str = f"€{job.rate_min}/h"
        else:
            rate_str = "TBD"

        # Score emoji
        if job.score >= 50:
            score_emoji = "🔥"
        elif job.score >= 30:
            score_emoji = "⭐"
        else:
            score_emoji = "📋"

        lines.append(f"{score_emoji} <b>{i}. {job.title[:50]}</b>")
        lines.append(f"   💰 {rate_str} | 📊 Score: {job.score}")
        lines.append(f"   🔗 <a href=\"{job.url}\">View</a>")
        lines.append("")

    return "\n".join(lines)


def notify_new_jobs(jobs: list[Job], batch_size: int = 10) -> tuple[int, int]:
    """
    Send notifications for new jobs.
    Returns (sent_count, failed_count).
    """
    if not jobs:
        logger.info("No jobs to notify about.")
        return 0, 0

    bot_token, chat_id = get_telegram_credentials()
    if not bot_token or not chat_id:
        logger.error("Telegram not configured")
        return 0, len(jobs)

    sent = 0
    failed = 0

    # Send individual messages for high-score jobs
    high_score_jobs = [j for j in jobs if j.score >= 50]
    for job in high_score_jobs:
        message = format_job_message(job)
        if send_telegram_message(message, bot_token, chat_id):
            sent += 1
        else:
            failed += 1

    # Send digest for remaining jobs
    remaining_jobs = [j for j in jobs if j.score < 50]
    if remaining_jobs:
        # Split into batches
        for i in range(0, len(remaining_jobs), batch_size):
            batch = remaining_jobs[i:i + batch_size]
            message = format_jobs_digest(batch, f"More Jobs ({i + 1}-{i + len(batch)})")
            if send_telegram_message(message, bot_token, chat_id):
                sent += len(batch)
            else:
                failed += len(batch)

    return sent, failed


def send_stats_summary(stats: dict) -> bool:
    """Send a statistics summary to Telegram."""
    message = f"""
<b>📊 Job Hunter Stats</b>

📋 Total jobs in database: <b>{stats.get('total_jobs', 0)}</b>
📅 Found today: <b>{stats.get('today', 0)}</b>
🔔 Pending notifications: <b>{stats.get('unnotified', 0)}</b>
💰 Average rate: <b>€{stats.get('avg_rate', 0)}/h</b>

<b>Jobs by site:</b>
"""

    for site, count in stats.get('by_site', {}).items():
        message += f"• {site}: {count}\n"

    if stats.get('applications'):
        message += "\n<b>Applications:</b>\n"
        for status, count in stats.get('applications', {}).items():
            emoji = {
                'applied': '📝',
                'interview': '💬',
                'offer': '🎉',
                'rejected': '❌',
                'won': '🏆'
            }.get(status, '•')
            message += f"{emoji} {status}: {count}\n"

    if stats.get('top_keywords'):
        message += "\n<b>Top Keywords:</b>\n"
        for kw, count in list(stats.get('top_keywords', {}).items())[:5]:
            message += f"• {kw}: {count}\n"

    return send_telegram_message(message.strip())


def test_telegram_connection() -> bool:
    """Test Telegram connection by sending a test message."""
    return send_telegram_message("🤖 Job Hunter bot is connected and working!")


if __name__ == "__main__":
    # Test notification
    logging.basicConfig(level=logging.INFO)
    logger.info("Testing Telegram connection...")
    if test_telegram_connection():
        logger.info("Telegram connection successful!")
    else:
        logger.error("Telegram connection failed - check credentials")
