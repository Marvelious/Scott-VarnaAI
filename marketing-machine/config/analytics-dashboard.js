/**
 * ANALYTICS DASHBOARD CONFIGURATION
 * Google Analytics 4 custom dashboard setup
 *
 * Purpose: Track marketing performance across all 5 websites
 */

// ==============================================
// GA4 CUSTOM DIMENSIONS
// ==============================================

const customDimensions = {
  website: {
    parameter: 'website',
    scope: 'EVENT',
    description: 'Which VarnaAI website (ai-projektmanager.de, etc.)'
  },
  form_source: {
    parameter: 'form_source',
    scope: 'EVENT',
    description: 'Form type (exit-intent, sidebar, content-upgrade, etc.)'
  },
  lead_magnet: {
    parameter: 'lead_magnet',
    scope: 'EVENT',
    description: 'Which lead magnet was downloaded'
  },
  language: {
    parameter: 'language',
    scope: 'USER',
    description: 'User language preference (de, en, bg)'
  },
  business_type: {
    parameter: 'business_type',
    scope: 'USER',
    description: 'B2B or B2C website'
  }
};

// ==============================================
// GA4 CONVERSION EVENTS
// ==============================================

const conversionEvents = [
  {
    name: 'generate_lead',
    description: 'Email capture form submission',
    parameters: ['website', 'form_source', 'form_type']
  },
  {
    name: 'lead_magnet_download',
    description: 'Lead magnet delivered',
    parameters: ['website', 'lead_magnet', 'email_hash']
  },
  {
    name: 'demo_request',
    description: 'Demo booking requested',
    parameters: ['website', 'company', 'preferred_time']
  },
  {
    name: 'contact_form_submit',
    description: 'Contact form submitted',
    parameters: ['website', 'message_length', 'has_company']
  },
  {
    name: 'blog_engagement',
    description: 'Blog post read (>50% scroll)',
    parameters: ['website', 'post_title', 'category', 'read_time']
  },
  {
    name: 'social_share',
    description: 'Content shared on social media',
    parameters: ['website', 'platform', 'content_type']
  }
];

// ==============================================
// DASHBOARD REPORTS
// ==============================================

const dashboardReports = {
  // Report 1: Traffic Overview
  trafficOverview: {
    name: 'Marketing Traffic Overview',
    metrics: [
      'sessions',
      'users',
      'newUsers',
      'bounceRate',
      'averageSessionDuration'
    ],
    dimensions: ['website', 'source', 'medium', 'campaign'],
    filters: {
      // Last 30 days
      dateRange: 'last_30_days'
    }
  },

  // Report 2: Conversion Funnel
  conversionFunnel: {
    name: 'Lead Generation Funnel',
    steps: [
      {
        name: 'Page Visit',
        event: 'page_view',
        metrics: ['eventCount', 'uniqueUsers']
      },
      {
        name: 'Form View',
        event: 'form_view',
        metrics: ['eventCount', 'uniqueUsers']
      },
      {
        name: 'Form Start',
        event: 'form_start',
        metrics: ['eventCount', 'uniqueUsers']
      },
      {
        name: 'Lead Generated',
        event: 'generate_lead',
        metrics: ['eventCount', 'uniqueUsers']
      },
      {
        name: 'Lead Magnet Downloaded',
        event: 'lead_magnet_download',
        metrics: ['eventCount', 'uniqueUsers']
      }
    ],
    dimensions: ['website', 'form_source']
  },

  // Report 3: Form Performance
  formPerformance: {
    name: 'Email Capture Form Performance',
    metrics: [
      'form_starts',
      'form_submissions',
      'conversion_rate'
    ],
    dimensions: ['website', 'form_source', 'page_path'],
    calculatedMetrics: {
      conversion_rate: 'form_submissions / form_starts'
    }
  },

  // Report 4: Content Engagement
  contentEngagement: {
    name: 'Blog & Content Performance',
    metrics: [
      'pageviews',
      'averageEngagementTime',
      'scrollDepth',
      'socialShares'
    ],
    dimensions: ['website', 'pageTitle', 'contentCategory'],
    filters: {
      pagePath: {
        contains: '/blog/'
      }
    }
  },

  // Report 5: Campaign Performance
  campaignPerformance: {
    name: 'Marketing Campaign ROI',
    metrics: [
      'sessions',
      'leads',
      'cost',
      'costPerLead',
      'leadValue',
      'roi'
    ],
    dimensions: ['website', 'campaign', 'source', 'medium'],
    calculatedMetrics: {
      costPerLead: 'cost / leads',
      roi: '(leadValue - cost) / cost * 100'
    }
  },

  // Report 6: Website Comparison
  websiteComparison: {
    name: 'Cross-Website Performance',
    metrics: [
      'users',
      'sessions',
      'leads',
      'conversionRate',
      'avgSessionDuration'
    ],
    dimensions: ['website', 'businessType'],
    calculatedMetrics: {
      conversionRate: 'leads / sessions * 100'
    }
  }
};

// ==============================================
// REAL-TIME MONITORING
// ==============================================

const realTimeAlerts = {
  // Alert 1: High Traffic Spike
  trafficSpike: {
    condition: 'sessions > 1000 in 5 minutes',
    notification: 'slack',
    message: '🚀 Traffic spike detected on {website}'
  },

  // Alert 2: Conversion Drop
  conversionDrop: {
    condition: 'conversion_rate < 2% for 1 hour',
    notification: 'email',
    message: '⚠️ Low conversion rate alert: {website} at {conversion_rate}%'
  },

  // Alert 3: High-Value Lead
  highValueLead: {
    condition: 'demo_request OR contact_form with company',
    notification: 'slack',
    channel: '#sales',
    message: '🎯 High-value lead: {email} from {company} on {website}'
  },

  // Alert 4: Form Error Rate
  formErrors: {
    condition: 'form_error_rate > 10%',
    notification: 'email',
    message: '❌ Form errors detected on {website} {form_source}'
  }
};

// ==============================================
// KPI TRACKING
// ==============================================

const kpiTargets = {
  'ai-projektmanager.de': {
    monthly_leads: 150,
    conversion_rate: 3.5,
    avg_session_duration: 180, // seconds
    bounce_rate_max: 45, // percentage
    cost_per_lead_max: 15 // EUR
  },
  'aimarketingbg.com': {
    monthly_leads: 120,
    conversion_rate: 4.0,
    avg_session_duration: 150,
    bounce_rate_max: 50,
    cost_per_lead_max: 10
  },
  'classicsecurity.net': {
    monthly_leads: 80,
    conversion_rate: 2.5,
    avg_session_duration: 240,
    bounce_rate_max: 40,
    cost_per_lead_max: 25
  },
  'varna-agenten.de': {
    monthly_leads: 100,
    conversion_rate: 3.0,
    avg_session_duration: 160,
    bounce_rate_max: 48,
    cost_per_lead_max: 12
  },
  'varnaai.com': {
    monthly_leads: 200,
    conversion_rate: 4.5,
    avg_session_duration: 200,
    bounce_rate_max: 35,
    cost_per_lead_max: 20
  }
};

// ==============================================
// AUTOMATED REPORTS
// ==============================================

const scheduledReports = {
  dailySnapshot: {
    name: 'Daily Marketing Snapshot',
    schedule: 'every day at 9:00 AM',
    recipients: ['team@varnaai.com'],
    format: 'email',
    includes: [
      'Yesterday traffic by website',
      'New leads count',
      'Top performing content',
      'Campaign spend summary'
    ]
  },

  weeklyPerformance: {
    name: 'Weekly Performance Review',
    schedule: 'every Monday at 9:00 AM',
    recipients: ['team@varnaai.com', 'management@varnaai.com'],
    format: 'pdf',
    includes: [
      'Week-over-week traffic trends',
      'Lead generation by source',
      'Conversion rate trends',
      'Campaign ROI analysis',
      'Top 10 blog posts',
      'Form performance comparison'
    ]
  },

  monthlyExecutive: {
    name: 'Monthly Executive Summary',
    schedule: '1st of month at 9:00 AM',
    recipients: ['management@varnaai.com'],
    format: 'pdf',
    includes: [
      'Month-over-month growth',
      'KPI achievement vs targets',
      'Website performance comparison',
      'Marketing spend vs revenue',
      'Strategic recommendations'
    ]
  }
};

// ==============================================
// DASHBOARD WIDGETS
// ==============================================

const dashboardWidgets = [
  // Row 1: Overview Cards
  {
    type: 'scorecard',
    title: 'Total Leads (30 days)',
    metric: 'generate_lead',
    comparison: 'previous_period',
    goal: 650 // Sum of all website targets
  },
  {
    type: 'scorecard',
    title: 'Overall Conversion Rate',
    metric: 'conversion_rate',
    comparison: 'previous_period',
    goal: 3.5
  },
  {
    type: 'scorecard',
    title: 'Avg Cost Per Lead',
    metric: 'cost_per_lead',
    comparison: 'previous_period',
    goal: 15
  },
  {
    type: 'scorecard',
    title: 'Marketing ROI',
    metric: 'roi',
    comparison: 'previous_period',
    goal: 300 // 300% ROI target
  },

  // Row 2: Traffic & Engagement
  {
    type: 'timeseries',
    title: 'Daily Traffic by Website',
    metric: 'sessions',
    dimension: 'website',
    dateRange: 'last_30_days'
  },
  {
    type: 'pie',
    title: 'Traffic Source Breakdown',
    metric: 'sessions',
    dimension: 'source',
    dateRange: 'last_30_days'
  },

  // Row 3: Conversion Funnel
  {
    type: 'funnel',
    title: 'Lead Generation Funnel',
    steps: dashboardReports.conversionFunnel.steps
  },
  {
    type: 'bar',
    title: 'Form Performance Comparison',
    metric: 'conversion_rate',
    dimension: 'form_source',
    sortBy: 'conversion_rate',
    sortOrder: 'desc'
  },

  // Row 4: Content Performance
  {
    type: 'table',
    title: 'Top 10 Blog Posts',
    metrics: ['pageviews', 'avgEngagementTime', 'leads'],
    dimension: 'pageTitle',
    filter: {
      pagePath: { contains: '/blog/' }
    },
    sortBy: 'leads',
    limit: 10
  },
  {
    type: 'table',
    title: 'Campaign Performance',
    metrics: ['sessions', 'leads', 'cost', 'costPerLead', 'roi'],
    dimension: 'campaign',
    sortBy: 'roi',
    sortOrder: 'desc',
    limit: 10
  }
];

// ==============================================
// EXPORT CONFIGURATION
// ==============================================

module.exports = {
  customDimensions,
  conversionEvents,
  dashboardReports,
  realTimeAlerts,
  kpiTargets,
  scheduledReports,
  dashboardWidgets
};

// ==============================================
// SETUP INSTRUCTIONS
// ==============================================

/*
STEP 1: Enable Custom Dimensions in GA4
1. Go to: Admin → Data display → Custom definitions
2. Create each dimension from customDimensions object above
3. Set scope (EVENT or USER) as specified

STEP 2: Mark Events as Conversions
1. Go to: Admin → Events
2. For each event in conversionEvents, toggle "Mark as conversion"

STEP 3: Create Custom Reports
1. Go to: Explore → Blank report
2. Use dashboardReports configuration above
3. Save each report with specified name

STEP 4: Set Up Real-Time Alerts
1. Go to: Admin → Custom alerts
2. Create alerts based on realTimeAlerts configuration
3. Connect to Slack/email notifications

STEP 5: Schedule Automated Reports
1. Go to: Explore → Share report → Schedule email
2. Configure recipients and schedule from scheduledReports

STEP 6: Build Custom Dashboard
1. Go to: Reports → Library → Create new collection
2. Add widgets based on dashboardWidgets configuration
3. Set as default homepage for team

STEP 7: Install Measurement Protocol (Server-Side)
- Already implemented in api/subscribe.js
- Tracks server-side conversions via GA4 Measurement Protocol
- Requires GA4_MEASUREMENT_ID and GA4_API_SECRET in .env
*/
