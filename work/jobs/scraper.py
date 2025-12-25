# ABOUTME: Playwright-based scrapers for freelance job sites
# ABOUTME: Handles freelance.de and freelancermap.de with login and search

import re
import sys
import time
import logging
import yaml
from pathlib import Path
from typing import Optional
from playwright.sync_api import sync_playwright, Page, Browser, TimeoutError as PlaywrightTimeout

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Add secrets to path
SECRETS_PATH = Path(__file__).parent.parent / "secrets"
sys.path.insert(0, str(SECRETS_PATH.parent))

from secrets.keymanager import get_secret
from database import Job


def load_config() -> dict:
    """Load configuration from config.yaml."""
    config_path = Path(__file__).parent / "config.yaml"
    with open(config_path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def get_all_keywords(config: dict) -> list[str]:
    """Get flattened list of all keywords."""
    keywords = []
    for category in config.get("keywords", {}).values():
        keywords.extend(category)
    return keywords


def extract_rate(text: str) -> tuple[Optional[int], Optional[int], str]:
    """
    Extract hourly rate from text.
    Returns (min_rate, max_rate, original_text).
    """
    if not text:
        return None, None, ""

    # Patterns for rate extraction
    patterns = [
        # "100-120 €/h" or "100 - 120 EUR/Stunde"
        r"(\d+)\s*[-–]\s*(\d+)\s*(?:€|EUR|Euro)?\s*/?\s*(?:h|Std|Stunde|hour)?",
        # "ab 100 €/h" or "from 100 €"
        r"(?:ab|from|min\.?)\s*(\d+)\s*(?:€|EUR|Euro)",
        # "100 €/h" or "100 EUR/Stunde"
        r"(\d+)\s*(?:€|EUR|Euro)\s*/?\s*(?:h|Std|Stunde|hour)",
        # "Stundensatz: 100"
        r"(?:Stundensatz|Rate|Hourly)[:\s]*(\d+)",
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            groups = match.groups()
            if len(groups) == 2 and groups[1]:
                return int(groups[0]), int(groups[1]), match.group(0)
            elif groups[0]:
                rate = int(groups[0])
                return rate, rate, match.group(0)

    return None, None, ""


def calculate_score(job: Job, config: dict) -> int:
    """Calculate job score based on configuration."""
    score = 0
    scoring = config.get("scoring", {})

    # Points per keyword match
    keyword_points = scoring.get("keyword_match", 10)
    if job.keywords_matched:
        score += len(job.keywords_matched) * keyword_points

    # Bonus for exact title match
    exact_match_bonus = scoring.get("exact_match", 20)
    if job.keywords_matched and job.title:
        title_lower = job.title.lower()
        for kw in job.keywords_matched:
            if kw.lower() in title_lower:
                score += exact_match_bonus
                break

    # Rate bonus
    rate_bonus = scoring.get("rate_bonus", 5)
    min_rate = config.get("filters", {}).get("min_rate", 100)
    if job.rate_min and job.rate_min > min_rate + 20:
        score += rate_bonus

    # Remote bonus
    remote_bonus = scoring.get("remote_bonus", 15)
    if job.location:
        location_lower = job.location.lower()
        if any(term in location_lower for term in ["remote", "homeoffice", "home office"]):
            score += remote_bonus

    return score


def match_keywords(text: str, keywords: list[str]) -> list[str]:
    """Find which keywords appear in the text."""
    if not text:
        return []

    text_lower = text.lower()
    matched = []

    for keyword in keywords:
        if keyword.lower() in text_lower:
            matched.append(keyword)

    return matched


def scrape_freelance_de(browser: Browser, config: dict) -> list[Job]:
    """
    Scrape jobs from freelance.de.
    Requires login credentials in keymanager.
    """
    jobs = []
    keywords = get_all_keywords(config)
    site_config = config.get("sites", {}).get("freelance.de", {})

    if not site_config.get("enabled", True):
        print("freelance.de is disabled in config")
        return jobs

    # Get credentials
    username = get_secret("freelance.de", "username")
    password = get_secret("freelance.de", "password")

    if not username or not password:
        logger.error("freelance.de credentials not found in keymanager")
        logger.error("Run: python keymanager.py set freelance.de username 'your@email.com'")
        logger.error("Run: python keymanager.py set freelance.de password 'yourpassword'")
        return jobs

    page = browser.new_page()

    try:
        logger.info("Logging into freelance.de...")
        page.goto("https://www.freelance.de/login")
        page.wait_for_load_state("networkidle")

        # Accept cookies if present
        try:
            page.click("button:has-text('Akzeptieren')", timeout=3000)
        except PlaywrightTimeout:
            logger.debug("No cookie banner found on freelance.de")

        # Fill login form
        page.fill("input[name='username'], input[type='email']", username)
        page.fill("input[name='password'], input[type='password']", password)
        page.click("button[type='submit'], input[type='submit']")
        page.wait_for_load_state("networkidle")

        # Check if login successful
        if "login" in page.url.lower():
            logger.error("Login failed on freelance.de - check credentials")
            return jobs

        logger.info("Login successful on freelance.de")

        # Search for each keyword category
        max_pages = site_config.get("max_pages", 3)

        for search_term in keywords[:5]:  # Limit to avoid rate limiting
            logger.info(f"Searching freelance.de for: {search_term}")
            time.sleep(2)  # Rate limiting between searches

            search_url = f"https://www.freelance.de/projekte?query={search_term}"
            page.goto(search_url)
            page.wait_for_load_state("networkidle")

            # Parse job listings
            job_cards = page.query_selector_all(".project-list-item, .search-result, [class*='project']")

            for card in job_cards[:20]:  # Limit per search
                try:
                    title_el = card.query_selector("h2 a, .title a, [class*='title'] a")
                    if not title_el:
                        continue

                    title = title_el.inner_text().strip()
                    url = title_el.get_attribute("href")
                    if url and not url.startswith("http"):
                        url = f"https://www.freelance.de{url}"

                    # Get other details
                    company_el = card.query_selector(".company, [class*='company']")
                    company = company_el.inner_text().strip() if company_el else None

                    location_el = card.query_selector(".location, [class*='location']")
                    location = location_el.inner_text().strip() if location_el else None

                    desc_el = card.query_selector(".description, [class*='desc'], p")
                    description = desc_el.inner_text().strip() if desc_el else None

                    # Extract rate
                    rate_el = card.query_selector("[class*='rate'], [class*='budget']")
                    rate_text = rate_el.inner_text().strip() if rate_el else ""
                    rate_min, rate_max, rate_found = extract_rate(rate_text or description or "")

                    # Match keywords
                    full_text = f"{title} {description or ''} {location or ''}"
                    matched = match_keywords(full_text, keywords)

                    if not matched:
                        continue  # Skip if no keywords match

                    job = Job(
                        site="freelance.de",
                        title=title,
                        url=url,
                        company=company,
                        location=location,
                        description=description[:500] if description else None,
                        rate_min=rate_min,
                        rate_max=rate_max,
                        rate_text=rate_found,
                        keywords_matched=matched
                    )

                    job.score = calculate_score(job, config)
                    jobs.append(job)

                except Exception as e:
                    logger.warning(f"Error parsing job card on freelance.de: {e}")
                    continue

        logger.info(f"Found {len(jobs)} matching jobs on freelance.de")

    except Exception as e:
        logger.error(f"Error scraping freelance.de: {e}")

    finally:
        page.close()

    return jobs


def scrape_freelancermap_de(browser: Browser, config: dict) -> list[Job]:
    """
    Scrape jobs from freelancermap.de.
    Requires login credentials in keymanager.
    """
    jobs = []
    keywords = get_all_keywords(config)
    site_config = config.get("sites", {}).get("freelancermap.de", {})

    if not site_config.get("enabled", True):
        print("freelancermap.de is disabled in config")
        return jobs

    # Get credentials
    username = get_secret("freelancermap.de", "username")
    password = get_secret("freelancermap.de", "password")

    if not username or not password:
        logger.error("freelancermap.de credentials not found in keymanager")
        logger.error("Run: python keymanager.py set freelancermap.de username 'your@email.com'")
        logger.error("Run: python keymanager.py set freelancermap.de password 'yourpassword'")
        return jobs

    page = browser.new_page()

    try:
        logger.info("Logging into freelancermap.de...")
        page.goto("https://www.freelancermap.de/login")
        page.wait_for_load_state("networkidle")

        # Accept cookies if present
        try:
            page.click("button:has-text('Akzeptieren'), [id*='cookie'] button", timeout=3000)
        except PlaywrightTimeout:
            logger.debug("No cookie banner found on freelancermap.de")

        # Fill login form
        page.fill("input[name='email'], input[type='email']", username)
        page.fill("input[name='password'], input[type='password']", password)
        page.click("button[type='submit']")
        page.wait_for_load_state("networkidle")

        # Check if login successful
        if "login" in page.url.lower():
            logger.error("Login failed on freelancermap.de - check credentials")
            return jobs

        logger.info("Login successful on freelancermap.de")

        # Search for jobs
        for search_term in keywords[:5]:  # Limit to avoid rate limiting
            logger.info(f"Searching freelancermap.de for: {search_term}")
            time.sleep(2)  # Rate limiting between searches

            search_url = f"https://www.freelancermap.de/projektboerse.html?query={search_term}"
            page.goto(search_url)
            page.wait_for_load_state("networkidle")

            # Parse job listings
            job_cards = page.query_selector_all(".project-item, .search-result-item, [class*='project']")

            for card in job_cards[:20]:  # Limit per search
                try:
                    title_el = card.query_selector("h3 a, .project-title a, [class*='title'] a")
                    if not title_el:
                        continue

                    title = title_el.inner_text().strip()
                    url = title_el.get_attribute("href")
                    if url and not url.startswith("http"):
                        url = f"https://www.freelancermap.de{url}"

                    # Get other details
                    company_el = card.query_selector(".company-name, [class*='company']")
                    company = company_el.inner_text().strip() if company_el else None

                    location_el = card.query_selector(".location, [class*='location'], [class*='ort']")
                    location = location_el.inner_text().strip() if location_el else None

                    desc_el = card.query_selector(".project-description, [class*='desc'], p")
                    description = desc_el.inner_text().strip() if desc_el else None

                    # Extract rate
                    rate_el = card.query_selector("[class*='rate'], [class*='stundensatz'], [class*='budget']")
                    rate_text = rate_el.inner_text().strip() if rate_el else ""
                    rate_min, rate_max, rate_found = extract_rate(rate_text or description or "")

                    # Match keywords
                    full_text = f"{title} {description or ''} {location or ''}"
                    matched = match_keywords(full_text, keywords)

                    if not matched:
                        continue  # Skip if no keywords match

                    job = Job(
                        site="freelancermap.de",
                        title=title,
                        url=url,
                        company=company,
                        location=location,
                        description=description[:500] if description else None,
                        rate_min=rate_min,
                        rate_max=rate_max,
                        rate_text=rate_found,
                        keywords_matched=matched
                    )

                    job.score = calculate_score(job, config)
                    jobs.append(job)

                except Exception as e:
                    logger.warning(f"Error parsing job card on freelancermap.de: {e}")
                    continue

        logger.info(f"Found {len(jobs)} matching jobs on freelancermap.de")

    except Exception as e:
        logger.error(f"Error scraping freelancermap.de: {e}")

    finally:
        page.close()

    return jobs


def scrape_all_sites(headless: bool = True) -> list[Job]:
    """Scrape all enabled sites and return combined job list."""
    config = load_config()
    all_jobs = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=headless)

        try:
            # Scrape each site
            freelance_jobs = scrape_freelance_de(browser, config)
            all_jobs.extend(freelance_jobs)

            freelancermap_jobs = scrape_freelancermap_de(browser, config)
            all_jobs.extend(freelancermap_jobs)

        finally:
            browser.close()

    # Filter by minimum rate
    min_rate = config.get("filters", {}).get("min_rate", 0)
    if min_rate > 0:
        filtered = []
        for job in all_jobs:
            # Keep jobs without rate info (might be hidden) or above min
            if job.rate_min is None or job.rate_min >= min_rate:
                filtered.append(job)
        all_jobs = filtered

    # Sort by score (highest first)
    all_jobs.sort(key=lambda j: j.score, reverse=True)

    return all_jobs


if __name__ == "__main__":
    # Test scraping
    logger.info("Testing scraper...")
    jobs = scrape_all_sites(headless=False)  # Visible browser for debugging
    logger.info(f"Total jobs found: {len(jobs)}")
    for job in jobs[:5]:
        logger.info(f"- {job.title}")
        logger.info(f"  Rate: {job.rate_text or 'N/A'}")
        logger.info(f"  Score: {job.score}")
        logger.info(f"  Keywords: {job.keywords_matched}")
