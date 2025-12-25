# ABOUTME: Unit tests for scraper.py
# ABOUTME: Tests rate extraction, keyword matching, and scoring functions

import pytest
import sys
from pathlib import Path

# Add parent to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from scraper import extract_rate, match_keywords, calculate_score, load_config
from database import Job


class TestExtractRate:
    """Tests for the extract_rate function."""

    def test_extract_rate_range_with_euro_symbol(self):
        """Test parsing rate ranges like '100-120 €/h'."""
        min_r, max_r, text = extract_rate("100-120 €/h")
        assert min_r == 100
        assert max_r == 120

    def test_extract_rate_range_with_eur(self):
        """Test parsing rate ranges like '80 - 100 EUR/Stunde'."""
        min_r, max_r, text = extract_rate("80 - 100 EUR/Stunde")
        assert min_r == 80
        assert max_r == 100

    def test_extract_rate_single_value(self):
        """Test parsing single rates like '90 €/h'."""
        min_r, max_r, text = extract_rate("90 €/h")
        assert min_r == 90
        assert max_r == 90

    def test_extract_rate_with_ab_prefix(self):
        """Test parsing rates with 'ab' prefix like 'ab 100 €'."""
        min_r, max_r, text = extract_rate("ab 100 €")
        assert min_r == 100

    def test_extract_rate_with_from_prefix(self):
        """Test parsing rates with 'from' prefix like 'from 85 EUR'."""
        min_r, max_r, text = extract_rate("from 85 EUR")
        assert min_r == 85

    def test_extract_rate_stundensatz_format(self):
        """Test parsing 'Stundensatz: 110' format."""
        min_r, max_r, text = extract_rate("Stundensatz: 110")
        assert min_r == 110

    def test_extract_rate_no_rate(self):
        """Test handling of text without rate information."""
        min_r, max_r, text = extract_rate("Remote position, Berlin")
        assert min_r is None
        assert max_r is None

    def test_extract_rate_empty_string(self):
        """Test handling of empty string."""
        min_r, max_r, text = extract_rate("")
        assert min_r is None
        assert max_r is None

    def test_extract_rate_none(self):
        """Test handling of None input."""
        min_r, max_r, text = extract_rate(None)
        assert min_r is None
        assert max_r is None


class TestMatchKeywords:
    """Tests for the match_keywords function."""

    def test_match_single_keyword(self):
        """Test matching a single keyword."""
        text = "Looking for a Firewall specialist"
        keywords = ["Firewall", "CISO", "ISO 27001"]
        matched = match_keywords(text, keywords)
        assert "Firewall" in matched
        assert len(matched) == 1

    def test_match_multiple_keywords(self):
        """Test matching multiple keywords."""
        text = "ISO 27001 implementation for Firewall project with CISO oversight"
        keywords = ["Firewall", "CISO", "ISO 27001", "TISAX"]
        matched = match_keywords(text, keywords)
        assert "Firewall" in matched
        assert "CISO" in matched
        assert "ISO 27001" in matched
        assert "TISAX" not in matched
        assert len(matched) == 3

    def test_match_case_insensitive(self):
        """Test that matching is case-insensitive."""
        text = "firewall configuration needed"
        keywords = ["Firewall", "CISO"]
        matched = match_keywords(text, keywords)
        assert "Firewall" in matched

    def test_match_no_keywords(self):
        """Test when no keywords match."""
        text = "Looking for a web developer"
        keywords = ["Firewall", "CISO", "ISO 27001"]
        matched = match_keywords(text, keywords)
        assert len(matched) == 0

    def test_match_empty_text(self):
        """Test handling of empty text."""
        text = ""
        keywords = ["Firewall", "CISO"]
        matched = match_keywords(text, keywords)
        assert len(matched) == 0

    def test_match_none_text(self):
        """Test handling of None text."""
        text = None
        keywords = ["Firewall", "CISO"]
        matched = match_keywords(text, keywords)
        assert len(matched) == 0


class TestCalculateScore:
    """Tests for the calculate_score function."""

    @pytest.fixture
    def config(self):
        """Sample config for scoring tests."""
        return {
            "scoring": {
                "keyword_match": 10,
                "exact_match": 20,
                "rate_bonus": 5,
                "remote_bonus": 15
            },
            "filters": {
                "min_rate": 100
            }
        }

    def test_score_keyword_matches(self, config):
        """Test scoring based on keyword matches."""
        job = Job(
            site="test",
            title="Security Consultant",
            url="http://test.com",
            keywords_matched=["Firewall", "ISO 27001"]
        )
        score = calculate_score(job, config)
        assert score >= 20  # 2 keywords * 10 points

    def test_score_exact_title_match(self, config):
        """Test bonus for keyword in title."""
        job = Job(
            site="test",
            title="Firewall Administrator",
            url="http://test.com",
            keywords_matched=["Firewall"]
        )
        score = calculate_score(job, config)
        assert score >= 30  # 10 (keyword) + 20 (exact match)

    def test_score_remote_bonus(self, config):
        """Test bonus for remote work."""
        job = Job(
            site="test",
            title="Security Consultant",
            url="http://test.com",
            location="Remote",
            keywords_matched=["Security"]
        )
        score = calculate_score(job, config)
        assert score >= 25  # 10 (keyword) + 15 (remote)

    def test_score_homeoffice_bonus(self, config):
        """Test bonus for Homeoffice location."""
        job = Job(
            site="test",
            title="Security Consultant",
            url="http://test.com",
            location="Homeoffice möglich",
            keywords_matched=["Security"]
        )
        score = calculate_score(job, config)
        assert score >= 25  # 10 (keyword) + 15 (remote/homeoffice)

    def test_score_rate_bonus(self, config):
        """Test bonus for high rate."""
        job = Job(
            site="test",
            title="CISO Consultant",
            url="http://test.com",
            rate_min=130,  # > min_rate + 20
            keywords_matched=["CISO"]
        )
        score = calculate_score(job, config)
        assert score >= 15  # 10 (keyword) + 5 (rate bonus)

    def test_score_no_keywords(self, config):
        """Test scoring with no keyword matches."""
        job = Job(
            site="test",
            title="Web Developer",
            url="http://test.com",
            keywords_matched=[]
        )
        score = calculate_score(job, config)
        assert score == 0

    def test_score_combined_bonuses(self, config):
        """Test job with multiple bonuses."""
        job = Job(
            site="test",
            title="Firewall Specialist",
            url="http://test.com",
            location="Remote",
            rate_min=150,
            keywords_matched=["Firewall", "ISO 27001", "CISO"]
        )
        score = calculate_score(job, config)
        # 30 (3 keywords) + 20 (title match) + 15 (remote) + 5 (rate) = 70
        assert score >= 50


class TestLoadConfig:
    """Tests for config loading."""

    def test_load_config_returns_dict(self):
        """Test that load_config returns a dictionary."""
        config = load_config()
        assert isinstance(config, dict)

    def test_load_config_has_keywords(self):
        """Test that config has keywords section."""
        config = load_config()
        assert "keywords" in config
        assert "security" in config["keywords"]
        assert "ai" in config["keywords"]

    def test_load_config_has_filters(self):
        """Test that config has filters section."""
        config = load_config()
        assert "filters" in config
        assert "min_rate" in config["filters"]

    def test_load_config_has_scoring(self):
        """Test that config has scoring section."""
        config = load_config()
        assert "scoring" in config
        assert "keyword_match" in config["scoring"]


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
