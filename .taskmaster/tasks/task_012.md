# Task ID: 12

**Title:** RetirementAI Static Site Deployment

**Status:** cancelled

**Dependencies:** 9 ✓, 10 ✗

**Priority:** medium

**Description:** Deploy RetirementAI landing page with PHP waitlist form

**Details:**

1. Create Dockerfile with PHP-FPM and Nginx
2. Configure PHP waitlist form handling
3. Set up Traefik routing for retirementai.varnaai.com
Pseudo-code:
```dockerfile
FROM php:8.2-fpm-alpine
COPY landing-page/ /var/www/html
# Add PHP waitlist processing script
```
```php
<?php
// Simple waitlist submission handler
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
  // Log or process email
}
```

**Test Strategy:**

1. Verify site loads via HTTPS
2. Test waitlist form submission
3. Check email validation
4. Confirm mobile responsiveness
