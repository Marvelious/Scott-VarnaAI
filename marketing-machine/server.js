/**
 * MARKETING MONSTER MACHINE - API SERVER
 * Backend server for marketing automation system
 *
 * Handles:
 * - Email capture form submissions
 * - Zapier webhook endpoints
 * - Conversion tracking
 * - API integrations (MailChimp, Buffer, etc.)
 */

require('dotenv').config({ path: './config/.env' });

const express = require('express');
const cors = require('cors');
const { handleSubscription, subscriptionLimiter } = require('./api/subscribe');
const webhookRouter = require('./integrations/zapier-webhooks');

// ==============================================
// SERVER CONFIGURATION
// ==============================================

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// ==============================================
// MIDDLEWARE
// ==============================================

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : [
      'https://ai-projektmanager.de',
      'https://aimarketingbg.com',
      'https://classicsecurity.net',
      'https://varna-agenten.de',
      'https://varnaai.com',
      'http://localhost:3000'
    ];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Request logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);

  if (ENV === 'development') {
    console.log('  Headers:', req.headers);
    console.log('  Body:', req.body);
  }

  next();
});

// ==============================================
// API ROUTES
// ==============================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: ENV,
    uptime: process.uptime()
  });
});

// Subscription endpoint (with rate limiting)
app.post('/api/subscribe', subscriptionLimiter, handleSubscription);

// Zapier webhooks
app.use('/webhooks', webhookRouter);

// Test endpoint (development only)
if (ENV === 'development') {
  app.get('/api/test', (req, res) => {
    res.json({
      message: 'Test endpoint',
      env: {
        mailchimp: !!process.env.MAILCHIMP_API_KEY,
        buffer: !!process.env.BUFFER_ACCESS_TOKEN,
        facebook: !!process.env.FACEBOOK_ACCESS_TOKEN,
        ga4: !!process.env.GA4_API_SECRET
      }
    });
  });
}

// ==============================================
// ERROR HANDLING
// ==============================================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(ENV === 'development' && { stack: err.stack })
  });
});

// ==============================================
// GRACEFUL SHUTDOWN
// ==============================================

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');

  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('⚠️  Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');

  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// ==============================================
// START SERVER
// ==============================================

const server = app.listen(PORT, () => {
  console.log('\n🚀 ===================================');
  console.log('   MARKETING MONSTER MACHINE');
  console.log('   ===================================\n');
  console.log(`   Environment: ${ENV}`);
  console.log(`   Port: ${PORT}`);
  console.log(`   API: http://localhost:${PORT}`);
  console.log('\n   Endpoints:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - POST /api/subscribe`);
  console.log(`   - POST /webhooks/blog-published`);
  console.log(`   - POST /webhooks/new-subscriber`);
  console.log(`   - POST /webhooks/form-submission`);
  console.log(`   - POST /webhooks/lead-qualified`);
  console.log(`   - POST /webhooks/demo-request`);
  console.log('\n   Configuration:`);
  console.log(`   - MailChimp: ${process.env.MAILCHIMP_API_KEY ? '✅ Connected' : '❌ Not configured'}`);
  console.log(`   - Buffer: ${process.env.BUFFER_ACCESS_TOKEN ? '✅ Connected' : '❌ Not configured'}`);
  console.log(`   - Facebook CAPI: ${process.env.FACEBOOK_ACCESS_TOKEN ? '✅ Connected' : '❌ Not configured'}`);
  console.log(`   - GA4 API: ${process.env.GA4_API_SECRET ? '✅ Connected' : '❌ Not configured'}`);
  console.log(`   - HubSpot: ${process.env.HUBSPOT_ACCESS_TOKEN ? '✅ Connected' : '❌ Not configured'}`);
  console.log('\n   🎉 Server ready! Marketing automation active!\n');
  console.log('===================================\n');
});

// ==============================================
// EXPORTS
// ==============================================

module.exports = app;
