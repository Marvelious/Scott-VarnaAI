#!/usr/bin/env python3
# ABOUTME: Main CLI for the Freelance Job Hunter agent
# ABOUTME: Search, list, apply, and track freelance job opportunities

import sys
import click
from pathlib import Path
from datetime import datetime

# Ensure imports work
sys.path.insert(0, str(Path(__file__).parent))
sys.path.insert(0, str(Path(__file__).parent.parent))

from database import (
    init_db, save_jobs, get_jobs, get_new_jobs, mark_notified,
    get_job_by_id, create_application, update_application_status,
    get_application, get_stats, update_daily_analytics, Job
)
from scraper import scrape_all_sites, load_config
from notifier import notify_new_jobs, send_stats_summary, test_telegram_connection


@click.group()
@click.version_option(version="1.0.0")
def cli():
    """
    🎯 Freelance Job Hunter - Find your next gig!

    Scrapes freelance.de and freelancermap.de for matching jobs,
    stores them in SQLite, and sends Telegram notifications.
    """
    # Initialize database on first run
    init_db()


@cli.command()
@click.option("--site", type=click.Choice(["freelance.de", "freelancermap.de"]),
              help="Scrape only this site")
@click.option("--no-notify", is_flag=True, help="Don't send notifications")
@click.option("--headless/--visible", default=True, help="Browser visibility")
def search(site, no_notify, headless):
    """
    🔍 Search for new jobs matching your criteria.

    Scrapes enabled sites, saves new jobs to database,
    and optionally sends Telegram notifications.
    """
    click.echo("🔍 Searching for jobs...")

    # Scrape jobs
    jobs = scrape_all_sites(headless=headless)

    if not jobs:
        click.echo("❌ No matching jobs found.")
        return

    click.echo(f"✅ Found {len(jobs)} matching jobs")

    # Filter by site if specified
    if site:
        jobs = [j for j in jobs if j.site == site]
        click.echo(f"📌 Filtered to {len(jobs)} jobs from {site}")

    # Save to database
    new_count, dup_count = save_jobs(jobs)
    click.echo(f"💾 Saved: {new_count} new, {dup_count} duplicates")

    # Update analytics
    update_daily_analytics()

    # Send notifications
    if not no_notify and new_count > 0:
        new_jobs = get_new_jobs(min_score=30)  # Only notify for decent scores
        if new_jobs:
            click.echo(f"📱 Sending notifications for {len(new_jobs)} jobs...")
            sent, failed = notify_new_jobs(new_jobs)
            click.echo(f"📤 Sent: {sent}, Failed: {failed}")

            # Mark as notified
            job_ids = [j.id for j in new_jobs if j.id]
            mark_notified(job_ids)
    elif no_notify:
        click.echo("🔕 Notifications skipped (--no-notify)")


@cli.command("list")
@click.option("--new", "new_only", is_flag=True, help="Show only unnotified jobs")
@click.option("--site", type=click.Choice(["freelance.de", "freelancermap.de"]),
              help="Filter by site")
@click.option("--min-score", type=int, default=0, help="Minimum score filter")
@click.option("--limit", type=int, default=20, help="Max jobs to show")
def list_jobs(new_only, site, min_score, limit):
    """
    📋 List jobs in the database.
    """
    jobs = get_jobs(
        site=site,
        notified=False if new_only else None,
        min_score=min_score if min_score > 0 else None,
        limit=limit
    )

    if not jobs:
        click.echo("No jobs found matching criteria.")
        return

    click.echo(f"\n📋 Showing {len(jobs)} jobs:\n")
    click.echo("-" * 80)

    for job in jobs:
        # Score emoji
        if job.score >= 50:
            score_emoji = "🔥"
        elif job.score >= 30:
            score_emoji = "⭐"
        else:
            score_emoji = "📋"

        # Rate display
        if job.rate_min:
            rate_str = f"€{job.rate_min}/h"
        else:
            rate_str = "Rate: TBD"

        # Status
        status = "🆕" if not job.notified else "✓"

        click.echo(f"{score_emoji} [{job.id}] {job.title[:50]}")
        click.echo(f"   {status} {job.site} | {rate_str} | Score: {job.score}")
        click.echo(f"   📍 {job.location or 'N/A'} | 🏢 {job.company or 'N/A'}")
        click.echo(f"   🔗 {job.url[:60]}...")
        click.echo("-" * 80)


@cli.command()
@click.argument("job_id", type=int)
def show(job_id):
    """
    📄 Show detailed information about a job.
    """
    job = get_job_by_id(job_id)

    if not job:
        click.echo(f"❌ Job {job_id} not found")
        return

    click.echo(f"\n📄 Job #{job.id}\n")
    click.echo("=" * 60)
    click.echo(f"Title:    {job.title}")
    click.echo(f"Company:  {job.company or 'N/A'}")
    click.echo(f"Location: {job.location or 'N/A'}")
    click.echo(f"Site:     {job.site}")
    click.echo(f"Rate:     {job.rate_text or 'N/A'}")
    click.echo(f"Score:    {job.score}")
    click.echo(f"Keywords: {', '.join(job.keywords_matched or [])}")
    click.echo(f"Found:    {job.found_at}")
    click.echo(f"URL:      {job.url}")
    click.echo("=" * 60)

    if job.description:
        click.echo(f"\nDescription:\n{job.description}")

    # Check application status
    app = get_application(job_id)
    if app:
        click.echo(f"\n📝 Application Status: {app['status']}")
        if app.get('notes'):
            click.echo(f"   Notes: {app['notes']}")


@cli.command()
@click.argument("job_id", type=int)
@click.option("--notes", help="Optional notes about the application")
def apply(job_id, notes):
    """
    ✍️ Mark a job as applied.
    """
    job = get_job_by_id(job_id)

    if not job:
        click.echo(f"❌ Job {job_id} not found")
        return

    # Check if already applied
    existing = get_application(job_id)
    if existing:
        click.echo(f"⚠️ Already applied to this job (status: {existing['status']})")
        return

    app_id = create_application(job_id, notes)
    click.echo(f"✅ Marked job #{job_id} as applied!")
    click.echo(f"   {job.title}")
    click.echo(f"   Application ID: {app_id}")


@cli.command()
@click.argument("job_id", type=int)
@click.argument("status", type=click.Choice(["applied", "interview", "offer", "rejected", "won"]))
@click.option("--notes", help="Optional notes")
def status(job_id, status, notes):
    """
    📊 Update application status for a job.

    Statuses: applied, interview, offer, rejected, won
    """
    job = get_job_by_id(job_id)

    if not job:
        click.echo(f"❌ Job {job_id} not found")
        return

    # Check if application exists
    existing = get_application(job_id)
    if not existing:
        click.echo(f"⚠️ No application found for job #{job_id}")
        click.echo("   Use 'hunter apply {job_id}' first")
        return

    update_application_status(job_id, status, notes)

    emoji = {
        'applied': '📝',
        'interview': '💬',
        'offer': '🎉',
        'rejected': '❌',
        'won': '🏆'
    }.get(status, '•')

    click.echo(f"{emoji} Updated job #{job_id} to: {status}")


@cli.command()
@click.option("--telegram", is_flag=True, help="Send stats to Telegram")
def stats(telegram):
    """
    📊 Show job hunting statistics.
    """
    statistics = get_stats()

    click.echo("\n📊 Job Hunter Statistics\n")
    click.echo("=" * 40)
    click.echo(f"Total jobs:          {statistics.get('total_jobs', 0)}")
    click.echo(f"Found today:         {statistics.get('today', 0)}")
    click.echo(f"Pending notify:      {statistics.get('unnotified', 0)}")
    click.echo(f"Average rate:        €{statistics.get('avg_rate', 0)}/h")
    click.echo("=" * 40)

    click.echo("\nJobs by site:")
    for site, count in statistics.get('by_site', {}).items():
        click.echo(f"  • {site}: {count}")

    if statistics.get('applications'):
        click.echo("\nApplications:")
        for s, count in statistics.get('applications', {}).items():
            emoji = {'applied': '📝', 'interview': '💬', 'offer': '🎉',
                     'rejected': '❌', 'won': '🏆'}.get(s, '•')
            click.echo(f"  {emoji} {s}: {count}")

    if statistics.get('top_keywords'):
        click.echo("\nTop keywords:")
        for kw, count in list(statistics.get('top_keywords', {}).items())[:5]:
            click.echo(f"  • {kw}: {count}")

    if telegram:
        click.echo("\n📱 Sending to Telegram...")
        if send_stats_summary(statistics):
            click.echo("✅ Stats sent!")
        else:
            click.echo("❌ Failed to send stats")


@cli.command()
def test():
    """
    🧪 Test Telegram connection.
    """
    click.echo("Testing Telegram connection...")
    if test_telegram_connection():
        click.echo("✅ Telegram is working!")
    else:
        click.echo("❌ Telegram connection failed")
        click.echo("\nMake sure you've set credentials:")
        click.echo("  python ../secrets/keymanager.py set telegram bot_token 'YOUR_TOKEN'")
        click.echo("  python ../secrets/keymanager.py set telegram chat_id 'YOUR_CHAT_ID'")


@cli.command()
def init():
    """
    🔧 Initialize/reset the database.
    """
    init_db()
    click.echo("✅ Database initialized!")


if __name__ == "__main__":
    cli()
