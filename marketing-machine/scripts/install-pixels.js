/**
 * PIXEL INSTALLATION SCRIPT
 * Copy this to header.php or use WordPress plugin "Insert Headers and Footers"
 *
 * Replace YOUR_PIXEL_IDS with actual values from:
 * - Facebook: business.facebook.com/events_manager
 * - Google Analytics: analytics.google.com/admin
 */

// ==============================================
// FACEBOOK PIXEL (Meta Conversions API)
// ==============================================
const FACEBOOK_PIXEL_ID = 'YOUR_FACEBOOK_PIXEL_ID';

const facebookPixelCode = `
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FACEBOOK_PIXEL_ID}');
fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->
`;

// ==============================================
// GOOGLE ANALYTICS 4
// ==============================================
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';

const googleAnalyticsCode = `
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA4_MEASUREMENT_ID}', {
    'send_page_view': true,
    'anonymize_ip': true  // GDPR compliance
  });
</script>
<!-- End Google Analytics 4 -->
`;

// ==============================================
// GOOGLE TAG MANAGER (Alternative to GA4)
// ==============================================
const GTM_CONTAINER_ID = 'GTM-XXXXXXX';

const googleTagManagerCode = `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');</script>
<!-- End Google Tag Manager -->
`;

const gtmBodyCode = `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
`;

// ==============================================
// MICROSOFT CLARITY (Heatmaps & Session Recording)
// ==============================================
const CLARITY_PROJECT_ID = 'YOUR_CLARITY_ID';

const clarityCode = `
<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
</script>
<!-- End Microsoft Clarity -->
`;

// ==============================================
// LINKEDIN INSIGHT TAG (B2B Sites Only)
// ==============================================
const LINKEDIN_PARTNER_ID = 'YOUR_LINKEDIN_ID';

const linkedinInsightCode = `
<!-- LinkedIn Insight Tag -->
<script type="text/javascript">
_linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script><script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
<noscript>
<img height="1" width="1" style="display:none;" alt=""
     src="https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif" />
</noscript>
<!-- End LinkedIn Insight Tag -->
`;

// ==============================================
// COMPLETE INSTALLATION CODE
// ==============================================

const completeHeaderCode = `
${facebookPixelCode}
${googleAnalyticsCode}
${clarityCode}
`;

// For B2B sites (ai-projektmanager.de, varnaai.com, classicsecurity.net)
const b2bHeaderCode = `
${completeHeaderCode}
${linkedinInsightCode}
`;

// ==============================================
// WEBSITE-SPECIFIC CONFIGURATIONS
// ==============================================

const websiteConfigs = {
  'ai-projektmanager.de': {
    pixels: ['facebook', 'ga4', 'clarity', 'linkedin'],
    language: 'de',
    currency: 'EUR',
    businessType: 'B2B'
  },
  'aimarketingbg.com': {
    pixels: ['facebook', 'ga4', 'clarity'],
    language: 'en',
    currency: 'BGN',
    businessType: 'B2C'
  },
  'classicsecurity.net': {
    pixels: ['facebook', 'ga4', 'clarity', 'linkedin'],
    language: 'en',
    currency: 'EUR',
    businessType: 'B2B'
  },
  'varna-agenten.de': {
    pixels: ['facebook', 'ga4', 'clarity'],
    language: 'de',
    currency: 'EUR',
    businessType: 'B2C'
  },
  'varnaai.com': {
    pixels: ['facebook', 'ga4', 'clarity', 'linkedin'],
    language: 'en',
    currency: 'USD',
    businessType: 'B2B'
  }
};

// ==============================================
// CONVERSION TRACKING EVENTS
// ==============================================

// Form submission tracking
const trackFormSubmission = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Track all form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const formName = form.id || form.name || 'unknown_form';

      // Facebook Pixel
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          content_name: formName,
          value: 0.00,
          currency: 'EUR'
        });
      }

      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
          'event_category': 'form',
          'event_label': formName
        });
      }

      // Microsoft Clarity
      if (typeof clarity !== 'undefined') {
        clarity('set', 'FormSubmission', formName);
      }
    });
  });
});
</script>
`;

// Button click tracking
const trackButtonClicks = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Track CTA button clicks
  const ctaButtons = document.querySelectorAll('a[href*="contact"], a[href*="demo"], .cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const buttonText = this.textContent.trim();
      const buttonHref = this.getAttribute('href');

      // Facebook Pixel
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Contact', {
          content_name: buttonText
        });
      }

      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          'event_category': 'CTA',
          'event_label': buttonText,
          'value': buttonHref
        });
      }
    });
  });
});
</script>
`;

// Page scroll depth tracking
const trackScrollDepth = `
<script>
let scrollDepth = 0;
const scrollThresholds = [25, 50, 75, 90, 100];
const scrollTracked = {};

window.addEventListener('scroll', function() {
  const scrollPercent = Math.round(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  );

  scrollThresholds.forEach(threshold => {
    if (scrollPercent >= threshold && !scrollTracked[threshold]) {
      scrollTracked[threshold] = true;

      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll', {
          'event_category': 'engagement',
          'event_label': threshold + '%',
          'value': threshold
        });
      }

      // Microsoft Clarity
      if (typeof clarity !== 'undefined') {
        clarity('set', 'ScrollDepth', threshold + '%');
      }
    }
  });
});
</script>
`;

// ==============================================
// INSTALLATION INSTRUCTIONS
// ==============================================

console.log(`
==============================================
PIXEL INSTALLATION INSTRUCTIONS
==============================================

METHOD 1: WordPress Plugin (RECOMMENDED)
1. Install "Insert Headers and Footers" plugin
2. Go to Settings > Insert Headers and Footers
3. Paste the code in "Scripts in Header" section
4. Save changes

METHOD 2: Theme Functions
1. Edit your theme's header.php file
2. Paste code before closing </head> tag
3. Save file

METHOD 3: Google Tag Manager (ADVANCED)
1. Install GTM container code
2. Add all pixels as Custom HTML tags
3. Set triggers to fire on All Pages

==============================================
WEBSITE-SPECIFIC CODES
==============================================

AI Projektmanager (B2B):
${b2bHeaderCode}
${trackFormSubmission}

AI Marketing BG (B2C):
${completeHeaderCode}
${trackFormSubmission}

Classic Security (B2B):
${b2bHeaderCode}
${trackFormSubmission}

Varna Agenten (B2C):
${completeHeaderCode}
${trackFormSubmission}

Varna AI (B2B):
${b2bHeaderCode}
${trackFormSubmission}

==============================================
ADDITIONAL TRACKING (Optional)
==============================================

Button Click Tracking:
${trackButtonClicks}

Scroll Depth Tracking:
${trackScrollDepth}

==============================================
TESTING
==============================================

1. Facebook Pixel: Install "Facebook Pixel Helper" Chrome extension
2. Google Analytics: Use GA Debugger Chrome extension
3. Microsoft Clarity: Check dashboard after 24 hours
4. LinkedIn: Use "LinkedIn Insight Tag Helper" extension

==============================================
`);

module.exports = {
  facebookPixelCode,
  googleAnalyticsCode,
  clarityCode,
  linkedinInsightCode,
  trackFormSubmission,
  trackButtonClicks,
  trackScrollDepth,
  websiteConfigs
};
