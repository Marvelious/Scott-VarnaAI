# ABOUTME: Unit tests for database.py
# ABOUTME: Tests job storage, retrieval, deduplication, and application tracking

import pytest
import sys
import sqlite3
import tempfile
from pathlib import Path
from unittest.mock import patch

# Add parent to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from database import (
    Job, init_db, save_job, save_jobs, get_jobs, get_new_jobs,
    mark_notified, get_job_by_id, create_application,
    update_application_status, get_application, get_stats
)
import database


@pytest.fixture
def temp_db(tmp_path):
    """Create a temporary database for testing."""
    test_db = tmp_path / "test_jobs.db"
    test_data_dir = tmp_path / "data"
    test_data_dir.mkdir()

    # Patch the module-level variables
    with patch.object(database, 'DATA_DIR', test_data_dir):
        with patch.object(database, 'DB_PATH', test_data_dir / "jobs.db"):
            init_db()
            yield test_data_dir / "jobs.db"


class TestJobDataclass:
    """Tests for the Job dataclass."""

    def test_job_creation_minimal(self):
        """Test creating a Job with minimal fields."""
        job = Job(site="freelance.de", title="Test Job", url="http://test.com")
        assert job.site == "freelance.de"
        assert job.title == "Test Job"
        assert job.url == "http://test.com"
        assert job.score == 0
        assert job.notified is False

    def test_job_creation_full(self):
        """Test creating a Job with all fields."""
        job = Job(
            site="freelancermap.de",
            title="Security Consultant",
            url="http://example.com/job/123",
            company="Tech Corp",
            external_id="123",
            rate_min=100,
            rate_max=120,
            rate_text="100-120 €/h",
            description="Looking for a security expert",
            location="Remote",
            keywords_matched=["Security", "ISO 27001"],
            score=45,
            id=1,
            found_at="2025-01-01 12:00:00",
            notified=True
        )
        assert job.company == "Tech Corp"
        assert job.rate_min == 100
        assert job.keywords_matched == ["Security", "ISO 27001"]


class TestInitDb:
    """Tests for database initialization."""

    def test_init_db_creates_tables(self, temp_db):
        """Test that init_db creates all required tables."""
        conn = sqlite3.connect(str(temp_db))
        cursor = conn.cursor()

        # Check jobs table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='jobs'")
        assert cursor.fetchone() is not None

        # Check applications table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='applications'")
        assert cursor.fetchone() is not None

        # Check analytics table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='analytics'")
        assert cursor.fetchone() is not None

        conn.close()

    def test_init_db_creates_indexes(self, temp_db):
        """Test that init_db creates indexes."""
        conn = sqlite3.connect(str(temp_db))
        cursor = conn.cursor()

        cursor.execute("SELECT name FROM sqlite_master WHERE type='index'")
        indexes = [row[0] for row in cursor.fetchall()]

        assert "idx_jobs_url" in indexes
        assert "idx_jobs_notified" in indexes
        assert "idx_jobs_site" in indexes

        conn.close()


class TestSaveJob:
    """Tests for saving jobs."""

    def test_save_new_job(self, temp_db):
        """Test saving a new job."""
        with patch.object(database, 'DB_PATH', temp_db):
            job = Job(
                site="freelance.de",
                title="Test Job",
                url="http://test.com/job/1",
                score=30
            )
            job_id, is_new = save_job(job)

            assert job_id > 0
            assert is_new is True

    def test_save_duplicate_job(self, temp_db):
        """Test that duplicate URLs are detected."""
        with patch.object(database, 'DB_PATH', temp_db):
            job = Job(
                site="freelance.de",
                title="Test Job",
                url="http://test.com/job/duplicate"
            )

            # Save first time
            job_id1, is_new1 = save_job(job)
            assert is_new1 is True

            # Try to save again
            job_id2, is_new2 = save_job(job)
            assert is_new2 is False
            assert job_id1 == job_id2

    def test_save_jobs_batch(self, temp_db):
        """Test saving multiple jobs at once."""
        with patch.object(database, 'DB_PATH', temp_db):
            jobs = [
                Job(site="freelance.de", title="Job 1", url="http://test.com/1"),
                Job(site="freelance.de", title="Job 2", url="http://test.com/2"),
                Job(site="freelance.de", title="Job 3", url="http://test.com/3"),
            ]

            new_count, dup_count = save_jobs(jobs)

            assert new_count == 3
            assert dup_count == 0


class TestGetJobs:
    """Tests for retrieving jobs."""

    def test_get_jobs_all(self, temp_db):
        """Test getting all jobs."""
        with patch.object(database, 'DB_PATH', temp_db):
            # Save some jobs
            jobs = [
                Job(site="freelance.de", title="Job 1", url="http://test.com/1"),
                Job(site="freelancermap.de", title="Job 2", url="http://test.com/2"),
            ]
            save_jobs(jobs)

            # Retrieve all
            retrieved = get_jobs()
            assert len(retrieved) == 2

    def test_get_jobs_by_site(self, temp_db):
        """Test filtering jobs by site."""
        with patch.object(database, 'DB_PATH', temp_db):
            jobs = [
                Job(site="freelance.de", title="Job 1", url="http://test.com/1"),
                Job(site="freelancermap.de", title="Job 2", url="http://test.com/2"),
                Job(site="freelance.de", title="Job 3", url="http://test.com/3"),
            ]
            save_jobs(jobs)

            freelance_jobs = get_jobs(site="freelance.de")
            assert len(freelance_jobs) == 2
            assert all(j.site == "freelance.de" for j in freelance_jobs)

    def test_get_jobs_by_min_score(self, temp_db):
        """Test filtering jobs by minimum score."""
        with patch.object(database, 'DB_PATH', temp_db):
            jobs = [
                Job(site="test", title="Low Score", url="http://test.com/1", score=20),
                Job(site="test", title="High Score", url="http://test.com/2", score=60),
                Job(site="test", title="Medium Score", url="http://test.com/3", score=40),
            ]
            save_jobs(jobs)

            high_score_jobs = get_jobs(min_score=50)
            assert len(high_score_jobs) == 1
            assert high_score_jobs[0].score == 60

    def test_get_new_jobs(self, temp_db):
        """Test getting unnotified jobs."""
        with patch.object(database, 'DB_PATH', temp_db):
            job = Job(site="test", title="New Job", url="http://test.com/new", score=40)
            save_job(job)

            new_jobs = get_new_jobs(min_score=30)
            assert len(new_jobs) == 1
            assert new_jobs[0].notified is False


class TestMarkNotified:
    """Tests for marking jobs as notified."""

    def test_mark_notified(self, temp_db):
        """Test marking jobs as notified."""
        with patch.object(database, 'DB_PATH', temp_db):
            job = Job(site="test", title="Test Job", url="http://test.com/notify")
            job_id, _ = save_job(job)

            # Initially not notified
            job = get_job_by_id(job_id)
            assert job.notified is False

            # Mark as notified
            mark_notified([job_id])

            # Check it's now notified
            job = get_job_by_id(job_id)
            assert job.notified is True


class TestApplicationTracking:
    """Tests for application status tracking."""

    def test_create_application(self, temp_db):
        """Test creating an application."""
        with patch.object(database, 'DB_PATH', temp_db):
            job = Job(site="test", title="Test Job", url="http://test.com/apply")
            job_id, _ = save_job(job)

            app_id = create_application(job_id, notes="Applied via email")
            assert app_id > 0

    def test_get_application(self, temp_db):
        """Test retrieving an application."""
        with patch.object(database, 'DB_PATH', temp_db):
            job = Job(site="test", title="Test Job", url="http://test.com/getapp")
            job_id, _ = save_job(job)
            create_application(job_id, notes="Test notes")

            app = get_application(job_id)
            assert app is not None
            assert app["status"] == "applied"
            assert app["notes"] == "Test notes"

    def test_update_application_status(self, temp_db):
        """Test updating application status."""
        with patch.object(database, 'DB_PATH', temp_db):
            job = Job(site="test", title="Test Job", url="http://test.com/update")
            job_id, _ = save_job(job)
            create_application(job_id)

            # Update to interview
            update_application_status(job_id, "interview", notes="Scheduled for Monday")

            app = get_application(job_id)
            assert app["status"] == "interview"

    def test_update_application_invalid_status(self, temp_db):
        """Test that invalid status raises error."""
        with patch.object(database, 'DB_PATH', temp_db):
            job = Job(site="test", title="Test Job", url="http://test.com/invalid")
            job_id, _ = save_job(job)
            create_application(job_id)

            with pytest.raises(ValueError):
                update_application_status(job_id, "invalid_status")


class TestStats:
    """Tests for statistics retrieval."""

    def test_get_stats_empty(self, temp_db):
        """Test getting stats with empty database."""
        with patch.object(database, 'DB_PATH', temp_db):
            stats = get_stats()
            assert stats["total_jobs"] == 0

    def test_get_stats_with_jobs(self, temp_db):
        """Test getting stats with jobs."""
        with patch.object(database, 'DB_PATH', temp_db):
            jobs = [
                Job(site="freelance.de", title="Job 1", url="http://test.com/1",
                    rate_min=100, keywords_matched=["Firewall"]),
                Job(site="freelancermap.de", title="Job 2", url="http://test.com/2",
                    rate_min=120, keywords_matched=["ISO 27001"]),
            ]
            save_jobs(jobs)

            stats = get_stats()
            assert stats["total_jobs"] == 2
            assert "freelance.de" in stats["by_site"]
            assert stats["by_site"]["freelance.de"] == 1
            assert stats["avg_rate"] > 0


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
