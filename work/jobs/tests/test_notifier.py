# ABOUTME: Unit tests for notifier.py
# ABOUTME: Tests message formatting and Telegram notification functions

import pytest
import sys
from pathlib import Path
from unittest.mock import patch, MagicMock

# Add parent to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from notifier import (
    format_job_message, format_jobs_digest, send_telegram_message,
    get_telegram_credentials
)
from database import Job


class TestFormatJobMessage:
    """Tests for single job message formatting."""

    def test_format_basic_job(self):
        """Test formatting a basic job."""
        job = Job(
            site="freelance.de",
            title="Security Consultant",
            url="http://freelance.de/job/123",
            score=45
        )
        message = format_job_message(job)

        assert "Security Consultant" in message
        assert "Score: 45" in message
        assert "http://freelance.de/job/123" in message

    def test_format_job_with_rate_range(self):
        """Test formatting a job with rate range."""
        job = Job(
            site="freelance.de",
            title="Firewall Expert",
            url="http://test.com",
            rate_min=100,
            rate_max=120,
            score=50
        )
        message = format_job_message(job)

        assert "€100-120/h" in message

    def test_format_job_with_single_rate(self):
        """Test formatting a job with single rate."""
        job = Job(
            site="freelance.de",
            title="CISO",
            url="http://test.com",
            rate_min=150,
            rate_max=150,
            score=60
        )
        message = format_job_message(job)

        assert "€150/h" in message

    def test_format_job_with_location(self):
        """Test formatting a job with location."""
        job = Job(
            site="freelance.de",
            title="Test Job",
            url="http://test.com",
            location="Remote, Berlin",
            score=30
        )
        message = format_job_message(job)

        assert "Remote, Berlin" in message

    def test_format_job_with_company(self):
        """Test formatting a job with company."""
        job = Job(
            site="freelance.de",
            title="Test Job",
            url="http://test.com",
            company="Tech Corp GmbH",
            score=30
        )
        message = format_job_message(job)

        assert "Tech Corp GmbH" in message

    def test_format_job_with_keywords(self):
        """Test formatting a job with matched keywords."""
        job = Job(
            site="freelance.de",
            title="Test Job",
            url="http://test.com",
            keywords_matched=["Firewall", "ISO 27001", "CISO"],
            score=50
        )
        message = format_job_message(job)

        # Should have hashtags
        assert "#Firewall" in message or "#ISO27001" in message

    def test_format_high_score_emoji(self):
        """Test that high score jobs get fire emoji."""
        job = Job(
            site="test",
            title="High Score Job",
            url="http://test.com",
            score=55
        )
        message = format_job_message(job)

        assert "🔥" in message

    def test_format_medium_score_emoji(self):
        """Test that medium score jobs get star emoji."""
        job = Job(
            site="test",
            title="Medium Score Job",
            url="http://test.com",
            score=35
        )
        message = format_job_message(job)

        assert "⭐" in message

    def test_format_low_score_emoji(self):
        """Test that low score jobs get clipboard emoji."""
        job = Job(
            site="test",
            title="Low Score Job",
            url="http://test.com",
            score=20
        )
        message = format_job_message(job)

        assert "📋" in message


class TestFormatJobsDigest:
    """Tests for digest message formatting."""

    def test_format_empty_digest(self):
        """Test formatting empty job list."""
        message = format_jobs_digest([])
        assert "No new jobs found" in message

    def test_format_digest_with_jobs(self):
        """Test formatting digest with multiple jobs."""
        jobs = [
            Job(site="test", title="Job 1", url="http://test.com/1", score=40),
            Job(site="test", title="Job 2", url="http://test.com/2", score=55),
            Job(site="test", title="Job 3", url="http://test.com/3", score=25),
        ]
        message = format_jobs_digest(jobs, title="Test Digest")

        assert "Test Digest" in message
        assert "3 matching jobs" in message
        assert "Job 1" in message
        assert "Job 2" in message
        assert "Job 3" in message

    def test_format_digest_with_rates(self):
        """Test that digest includes rates."""
        jobs = [
            Job(site="test", title="Job", url="http://test.com", rate_min=100, score=40),
        ]
        message = format_jobs_digest(jobs)

        assert "€100/h" in message

    def test_format_digest_without_rate(self):
        """Test digest for job without rate."""
        jobs = [
            Job(site="test", title="Job", url="http://test.com", score=40),
        ]
        message = format_jobs_digest(jobs)

        assert "TBD" in message


class TestSendTelegramMessage:
    """Tests for Telegram API integration."""

    @patch('notifier.requests.post')
    @patch('notifier.get_telegram_credentials')
    def test_send_message_success(self, mock_creds, mock_post):
        """Test successful message sending."""
        mock_creds.return_value = ("test_token", "test_chat_id")
        mock_response = MagicMock()
        mock_response.raise_for_status = MagicMock()
        mock_post.return_value = mock_response

        result = send_telegram_message("Test message")

        assert result is True
        mock_post.assert_called_once()

    @patch('notifier.requests.post')
    @patch('notifier.get_telegram_credentials')
    def test_send_message_no_credentials(self, mock_creds, mock_post):
        """Test that missing credentials returns False."""
        mock_creds.return_value = (None, None)

        result = send_telegram_message("Test message")

        assert result is False
        mock_post.assert_not_called()

    @patch('notifier.requests.post')
    @patch('notifier.get_telegram_credentials')
    def test_send_message_api_error(self, mock_creds, mock_post):
        """Test handling of API errors."""
        mock_creds.return_value = ("test_token", "test_chat_id")
        mock_post.side_effect = Exception("API Error")

        result = send_telegram_message("Test message")

        assert result is False

    @patch('notifier.requests.post')
    def test_send_message_with_explicit_credentials(self, mock_post):
        """Test sending with explicitly provided credentials."""
        mock_response = MagicMock()
        mock_response.raise_for_status = MagicMock()
        mock_post.return_value = mock_response

        result = send_telegram_message(
            "Test message",
            bot_token="explicit_token",
            chat_id="explicit_chat_id"
        )

        assert result is True
        call_args = mock_post.call_args
        assert "explicit_token" in call_args[0][0]

    @patch('notifier.requests.post')
    @patch('notifier.get_telegram_credentials')
    def test_send_message_payload_structure(self, mock_creds, mock_post):
        """Test that payload has correct structure."""
        mock_creds.return_value = ("token", "chat_id")
        mock_response = MagicMock()
        mock_response.raise_for_status = MagicMock()
        mock_post.return_value = mock_response

        send_telegram_message("Test message")

        call_args = mock_post.call_args
        payload = call_args[1]["json"]

        assert payload["chat_id"] == "chat_id"
        assert payload["text"] == "Test message"
        assert payload["parse_mode"] == "HTML"
        assert payload["disable_web_page_preview"] is True


class TestGetTelegramCredentials:
    """Tests for credential retrieval."""

    @patch('notifier.get_secret')
    def test_get_credentials(self, mock_get_secret):
        """Test getting credentials from keymanager."""
        mock_get_secret.side_effect = lambda service, key: {
            ("telegram", "bot_token"): "test_token",
            ("telegram", "chat_id"): "test_chat_id"
        }.get((service, key))

        bot_token, chat_id = get_telegram_credentials()

        assert bot_token == "test_token"
        assert chat_id == "test_chat_id"

    @patch('notifier.get_secret')
    def test_get_credentials_missing(self, mock_get_secret):
        """Test handling of missing credentials."""
        mock_get_secret.return_value = None

        bot_token, chat_id = get_telegram_credentials()

        assert bot_token is None
        assert chat_id is None


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
