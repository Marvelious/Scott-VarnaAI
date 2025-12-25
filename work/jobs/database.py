# ABOUTME: SQLite database operations for the Freelance Job Hunter
# ABOUTME: Handles job storage, deduplication, and application tracking

import sqlite3
import json
import logging
from datetime import datetime, date
from pathlib import Path
from typing import Optional
from dataclasses import dataclass, asdict

# Configure logging
logger = logging.getLogger(__name__)


# Data directory (mounted in Docker)
DATA_DIR = Path(__file__).parent / "data"
DB_PATH = DATA_DIR / "jobs.db"


@dataclass
class Job:
    """Job listing data structure."""
    site: str
    title: str
    url: str
    company: Optional[str] = None
    external_id: Optional[str] = None
    rate_min: Optional[int] = None
    rate_max: Optional[int] = None
    rate_text: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    keywords_matched: Optional[list] = None
    score: int = 0
    id: Optional[int] = None
    found_at: Optional[str] = None
    notified: bool = False


def get_connection() -> sqlite3.Connection:
    """Get database connection with row factory."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Initialize database schema."""
    conn = get_connection()
    cursor = conn.cursor()

    # Jobs table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            site TEXT NOT NULL,
            external_id TEXT,
            title TEXT NOT NULL,
            company TEXT,
            rate_min INTEGER,
            rate_max INTEGER,
            rate_text TEXT,
            url TEXT UNIQUE NOT NULL,
            description TEXT,
            location TEXT,
            keywords_matched TEXT,
            score INTEGER DEFAULT 0,
            found_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            notified BOOLEAN DEFAULT FALSE
        )
    """)

    # Applications table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_id INTEGER REFERENCES jobs(id),
            status TEXT DEFAULT 'applied',
            applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            notes TEXT,
            updated_at DATETIME
        )
    """)

    # Analytics table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS analytics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATE UNIQUE,
            jobs_found INTEGER DEFAULT 0,
            avg_rate REAL,
            top_keywords TEXT
        )
    """)

    # Indexes
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_jobs_url ON jobs(url)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_jobs_notified ON jobs(notified)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_jobs_site ON jobs(site)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status)")

    conn.commit()
    conn.close()
    logger.info(f"Database initialized at {DB_PATH}")


def save_job(job: Job) -> tuple[int, bool]:
    """
    Save a job to the database.
    Returns (job_id, is_new) - is_new is False if job already existed.
    """
    conn = get_connection()
    cursor = conn.cursor()

    # Check if job already exists (by URL)
    cursor.execute("SELECT id FROM jobs WHERE url = ?", (job.url,))
    existing = cursor.fetchone()

    if existing:
        conn.close()
        return existing["id"], False

    # Insert new job
    keywords_json = json.dumps(job.keywords_matched) if job.keywords_matched else None

    cursor.execute("""
        INSERT INTO jobs (site, external_id, title, company, rate_min, rate_max,
                         rate_text, url, description, location, keywords_matched, score)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        job.site, job.external_id, job.title, job.company,
        job.rate_min, job.rate_max, job.rate_text, job.url,
        job.description, job.location, keywords_json, job.score
    ))

    job_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return job_id, True


def save_jobs(jobs: list[Job]) -> tuple[int, int]:
    """
    Save multiple jobs to the database.
    Returns (new_count, duplicate_count).
    """
    new_count = 0
    duplicate_count = 0

    for job in jobs:
        _, is_new = save_job(job)
        if is_new:
            new_count += 1
        else:
            duplicate_count += 1

    return new_count, duplicate_count


def get_jobs(
    site: Optional[str] = None,
    notified: Optional[bool] = None,
    min_score: Optional[int] = None,
    limit: int = 100
) -> list[Job]:
    """Get jobs with optional filters."""
    conn = get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM jobs WHERE 1=1"
    params = []

    if site:
        query += " AND site = ?"
        params.append(site)

    if notified is not None:
        query += " AND notified = ?"
        params.append(notified)

    if min_score is not None:
        query += " AND score >= ?"
        params.append(min_score)

    query += " ORDER BY found_at DESC LIMIT ?"
    params.append(limit)

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    jobs = []
    for row in rows:
        keywords = json.loads(row["keywords_matched"]) if row["keywords_matched"] else []
        jobs.append(Job(
            id=row["id"],
            site=row["site"],
            external_id=row["external_id"],
            title=row["title"],
            company=row["company"],
            rate_min=row["rate_min"],
            rate_max=row["rate_max"],
            rate_text=row["rate_text"],
            url=row["url"],
            description=row["description"],
            location=row["location"],
            keywords_matched=keywords,
            score=row["score"],
            found_at=row["found_at"],
            notified=bool(row["notified"])
        ))

    return jobs


def get_new_jobs(min_score: int = 0) -> list[Job]:
    """Get jobs that haven't been notified yet."""
    return get_jobs(notified=False, min_score=min_score)


def mark_notified(job_ids: list[int]) -> None:
    """Mark jobs as notified."""
    if not job_ids:
        return

    conn = get_connection()
    cursor = conn.cursor()

    placeholders = ",".join("?" * len(job_ids))
    cursor.execute(f"UPDATE jobs SET notified = TRUE WHERE id IN ({placeholders})", job_ids)

    conn.commit()
    conn.close()


def get_job_by_id(job_id: int) -> Optional[Job]:
    """Get a single job by ID."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM jobs WHERE id = ?", (job_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None

    keywords = json.loads(row["keywords_matched"]) if row["keywords_matched"] else []
    return Job(
        id=row["id"],
        site=row["site"],
        external_id=row["external_id"],
        title=row["title"],
        company=row["company"],
        rate_min=row["rate_min"],
        rate_max=row["rate_max"],
        rate_text=row["rate_text"],
        url=row["url"],
        description=row["description"],
        location=row["location"],
        keywords_matched=keywords,
        score=row["score"],
        found_at=row["found_at"],
        notified=bool(row["notified"])
    )


def create_application(job_id: int, notes: str = None) -> int:
    """Create an application record for a job."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO applications (job_id, status, notes)
        VALUES (?, 'applied', ?)
    """, (job_id, notes))

    app_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return app_id


def update_application_status(job_id: int, status: str, notes: str = None) -> bool:
    """Update application status. Valid statuses: applied, interview, offer, rejected, won."""
    valid_statuses = {"applied", "interview", "offer", "rejected", "won"}
    if status not in valid_statuses:
        raise ValueError(f"Invalid status. Must be one of: {valid_statuses}")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE applications
        SET status = ?, notes = COALESCE(?, notes), updated_at = CURRENT_TIMESTAMP
        WHERE job_id = ?
    """, (status, notes, job_id))

    updated = cursor.rowcount > 0
    conn.commit()
    conn.close()

    return updated


def get_application(job_id: int) -> Optional[dict]:
    """Get application status for a job."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT a.*, j.title, j.company, j.url
        FROM applications a
        JOIN jobs j ON a.job_id = j.id
        WHERE a.job_id = ?
    """, (job_id,))

    row = cursor.fetchone()
    conn.close()

    if row:
        return dict(row)
    return None


def get_stats() -> dict:
    """Get overall statistics."""
    conn = get_connection()
    cursor = conn.cursor()

    stats = {}

    # Total jobs
    cursor.execute("SELECT COUNT(*) as count FROM jobs")
    stats["total_jobs"] = cursor.fetchone()["count"]

    # Jobs by site
    cursor.execute("SELECT site, COUNT(*) as count FROM jobs GROUP BY site")
    stats["by_site"] = {row["site"]: row["count"] for row in cursor.fetchall()}

    # Average rate
    cursor.execute("SELECT AVG(rate_min) as avg FROM jobs WHERE rate_min > 0")
    row = cursor.fetchone()
    stats["avg_rate"] = round(row["avg"], 2) if row["avg"] else 0

    # Jobs today
    cursor.execute("SELECT COUNT(*) as count FROM jobs WHERE DATE(found_at) = DATE('now')")
    stats["today"] = cursor.fetchone()["count"]

    # Unnotified jobs
    cursor.execute("SELECT COUNT(*) as count FROM jobs WHERE notified = FALSE")
    stats["unnotified"] = cursor.fetchone()["count"]

    # Application stats
    cursor.execute("""
        SELECT status, COUNT(*) as count
        FROM applications
        GROUP BY status
    """)
    stats["applications"] = {row["status"]: row["count"] for row in cursor.fetchall()}

    # Top keywords
    cursor.execute("SELECT keywords_matched FROM jobs WHERE keywords_matched IS NOT NULL")
    all_keywords = []
    for row in cursor.fetchall():
        keywords = json.loads(row["keywords_matched"])
        all_keywords.extend(keywords)

    from collections import Counter
    keyword_counts = Counter(all_keywords).most_common(10)
    stats["top_keywords"] = dict(keyword_counts)

    conn.close()
    return stats


def update_daily_analytics() -> None:
    """Update analytics for today."""
    conn = get_connection()
    cursor = conn.cursor()

    today = date.today().isoformat()

    # Get today's stats
    cursor.execute("""
        SELECT COUNT(*) as count, AVG(rate_min) as avg_rate
        FROM jobs
        WHERE DATE(found_at) = DATE('now')
    """)
    row = cursor.fetchone()
    jobs_found = row["count"]
    avg_rate = row["avg_rate"]

    # Get top keywords for today
    cursor.execute("""
        SELECT keywords_matched FROM jobs
        WHERE DATE(found_at) = DATE('now') AND keywords_matched IS NOT NULL
    """)
    all_keywords = []
    for row in cursor.fetchall():
        keywords = json.loads(row["keywords_matched"])
        all_keywords.extend(keywords)

    from collections import Counter
    top_keywords = dict(Counter(all_keywords).most_common(5))

    # Upsert analytics
    cursor.execute("""
        INSERT INTO analytics (date, jobs_found, avg_rate, top_keywords)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(date) DO UPDATE SET
            jobs_found = excluded.jobs_found,
            avg_rate = excluded.avg_rate,
            top_keywords = excluded.top_keywords
    """, (today, jobs_found, avg_rate, json.dumps(top_keywords)))

    conn.commit()
    conn.close()


# Initialize database on import
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    init_db()
    logger.info("Database ready!")
