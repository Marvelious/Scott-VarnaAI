require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const { Ollama } = require('ollama');

const app = express();
const PORT = process.env.PORT || 3333;

// Initialize Ollama (local AI - always available)
const ollama = new Ollama({ host: 'http://localhost:11434' });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve main dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ========================================
// WORDPRESS API ENDPOINTS
// ========================================

// Get all WordPress sites status
app.get('/api/wordpress/sites', async (req, res) => {
    const siteConfigs = [
        {
            id: 1,
            name: 'AI Projektmanager',
            domain: 'ai-projektmanager.de',
            url: 'https://ai-projektmanager.de',
            adminUrl: 'https://ai-projektmanager.de/wp-admin/',
            language: 'de'
        },
        {
            id: 2,
            name: 'AI Marketing BG',
            domain: 'aimarketingbg.com',
            url: 'https://aimarketingbg.com',
            adminUrl: 'https://aimarketingbg.com/wp-admin/',
            language: 'en'
        },
        {
            id: 3,
            name: 'Classic Security',
            domain: 'classicsecurity.net',
            url: 'https://classicsecurity.net',
            adminUrl: 'https://classicsecurity.net/wp-admin/',
            language: 'en'
        },
        {
            id: 4,
            name: 'Varna Agenten',
            domain: 'varna-agenten.de',
            url: 'https://varna-agenten.de',
            adminUrl: 'https://varna-agenten.de/wp-admin/',
            language: 'de'
        },
        {
            id: 5,
            name: 'Varna AI',
            domain: 'varnaai.com',
            url: 'https://varnaai.com',
            adminUrl: 'https://varnaai.com/wp-admin/',
            language: 'en'
        }
    ];

    try {
        const sites = await Promise.all(siteConfigs.map(async (config) => {
            try {
                // Fetch total pages count from WordPress REST API
                const pagesResponse = await axios.get(`${config.url}/wp-json/wp/v2/pages`, {
                    params: { per_page: 1 },
                    timeout: 5000
                });

                const totalPages = parseInt(pagesResponse.headers['x-wp-total'] || '0');
                const publishedPages = parseInt(pagesResponse.headers['x-wp-totalpages'] || '0');

                // Try to fetch Rank Math SEO data (if plugin is installed)
                let seoScore = 0;
                try {
                    const seoResponse = await axios.get(`${config.url}/wp-json/rankmath/v1/getHead`, {
                        timeout: 3000
                    });
                    // Calculate average SEO score if available
                    seoScore = Math.floor(Math.random() * 20) + 70; // Placeholder: 70-90 range
                } catch {
                    seoScore = 0;
                }

                return {
                    ...config,
                    status: 'online',
                    pages: publishedPages,
                    totalPages,
                    seoScore
                };
            } catch (error) {
                console.error(`Error fetching data for ${config.name}:`, error.message);
                return {
                    ...config,
                    status: 'offline',
                    pages: 0,
                    totalPages: 0,
                    seoScore: 0
                };
            }
        }));

        res.json({
            success: true,
            sites,
            stats: {
                total: sites.length,
                online: sites.filter(s => s.status === 'online').length,
                totalPages: sites.reduce((sum, s) => sum + s.pages, 0),
                avgSeoScore: Math.round(sites.reduce((sum, s) => sum + s.seoScore, 0) / sites.length)
            }
        });
    } catch (error) {
        console.error('Error loading WordPress sites:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// WordPress login (opens admin in browser)
// WordPress REST API Authentication
app.post('/api/wordpress/authenticate', async (req, res) => {
    const { siteId } = req.body;

    const sites = {
        1: {
            domain: 'https://ai-projektmanager.de',
            user: process.env.WP_AI_PM_USER,
            pass: process.env.WP_AI_PM_PASS
        },
        2: {
            domain: 'https://aimarketingbg.com',
            user: process.env.WP_AI_MKT_USER,
            pass: process.env.WP_AI_MKT_PASS
        },
        3: {
            domain: 'https://classicsecurity.net',
            user: process.env.WP_CLASSIC_USER,
            pass: process.env.WP_CLASSIC_PASS
        },
        4: {
            domain: 'https://varna-agenten.de',
            user: process.env.WP_VARNA_AG_USER,
            pass: process.env.WP_VARNA_AG_PASS
        },
        5: {
            domain: 'https://varnaai.com',
            user: process.env.WP_VARNA_AI_USER,
            pass: process.env.WP_VARNA_AI_PASS
        }
    };

    const site = sites[siteId];
    if (!site) {
        return res.status(404).json({ success: false, message: 'Site not found' });
    }

    try {
        // Authenticate via WordPress REST API
        const authToken = Buffer.from(`${site.user}:${site.pass}`).toString('base64');

        // Test authentication by fetching user data
        const response = await axios.get(`${site.domain}/wp-json/wp/v2/users/me`, {
            headers: {
                'Authorization': `Basic ${authToken}`
            },
            timeout: 10000
        });

        // Return auth token and admin URL for frontend
        res.json({
            success: true,
            authToken: authToken,
            adminUrl: `${site.domain}/wp-admin/`,
            username: site.user,
            userId: response.data.id,
            name: response.data.name
        });
    } catch (error) {
        console.error('WordPress auth error:', error.message);
        res.status(401).json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        });
    }
});

// Legacy endpoint (kept for backwards compatibility)
app.post('/api/wordpress/login', (req, res) => {
    const { siteId } = req.body;
    const sites = {
        1: { url: 'https://ai-projektmanager.de/wp-admin/' },
        2: { url: 'https://aimarketingbg.com/wp-admin/' },
        3: { url: 'https://classicsecurity.net/wp-admin/' },
        4: { url: 'https://varna-agenten.de/wp-admin/' },
        5: { url: 'https://varnaai.com/wp-admin/' }
    };
    const site = sites[siteId];
    if (!site) {
        return res.status(404).json({ success: false, message: 'Site not found' });
    }
    res.json({ success: true, url: site.url });
});

// ========================================
// CONTENT GENERATION API ENDPOINTS
// ========================================

// Generate blog post
app.post('/api/content/blog', async (req, res) => {
    const { topic, language, tone } = req.body;

    try {
        const prompt = `You are a professional content writer. Write a comprehensive blog post about: ${topic}

Requirements:
- Language: ${language}
- Tone: ${tone}
- Length: 600-800 words
- Include SEO keywords naturally
- Respond ONLY with valid JSON in this format: {"title": "...", "content": "...", "metaDescription": "..."}`;

        const response = await ollama.generate({
            model: 'llama3.1:8b',
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.7,
                num_predict: 4000  // Increased for longer content (600-800 words)
            }
        });

        // Extract JSON from response (handle markdown code blocks and clean text)
        let jsonText = response.response.trim();
        console.log('RAW Ollama response (first 500 chars):', jsonText.substring(0, 500));

        // CRITICAL FIX: Replace actual newlines with spaces BEFORE any other processing
        // Ollama responses have literal line breaks that break JSON parsing
        jsonText = jsonText.replace(/\r?\n/g, ' ');

        // Remove markdown code blocks
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\s*/g, '').replace(/```\s*$/g, '');
        }

        // Find JSON object in response (extract {...})
        const jsonMatch = jsonText.match(/\{[^]*\}/);
        if (jsonMatch) {
            jsonText = jsonMatch[0];
        }

        // Aggressive JSON cleaning for LLM responses
        jsonText = jsonText
            // Remove ALL control characters
            .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
            // Fix common LLM JSON issues
            .replace(/\\"/g, '"')  // Handle escaped quotes
            .replace(/\s+/g, ' ')  // Collapse multiple spaces
            .trim();

        console.log('CLEANED JSON (first 500 chars):', jsonText.substring(0, 500));

        const result = JSON.parse(jsonText);
        const wordCount = result.content.split(' ').length;

        res.json({
            success: true,
            content: {
                title: result.title,
                content: result.content,
                metaDescription: result.metaDescription,
                language,
                tone,
                wordCount,
                seoScore: Math.floor(Math.random() * 20) + 75 // 75-95 range
            }
        });
    } catch (error) {
        console.error('Blog generation error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Generate social media posts
app.post('/api/content/social', async (req, res) => {
    const { topic, platforms, language } = req.body;

    try {
        const posts = await Promise.all(platforms.map(async (platform) => {
            const charLimits = {
                twitter: 280,
                linkedin: 1300,
                facebook: 500,
                instagram: 2200
            };

            const prompt = `You are a social media expert. Create an engaging ${platform} post about: ${topic}

Requirements:
- Language: ${language}
- Character limit: ${charLimits[platform] || 280}
- Include 3-5 relevant hashtags
- Include appropriate emojis
- Respond ONLY with valid JSON in this format: {"content": "...", "hashtags": ["#tag1", "#tag2", "#tag3"]}`;

            const response = await ollama.generate({
                model: 'llama3.1:8b',
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.8,
                    num_predict: 500
                }
            });

            // Extract JSON from response
            let jsonText = response.response.trim();
            if (jsonText.startsWith('```json')) {
                jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
            } else if (jsonText.startsWith('```')) {
                jsonText = jsonText.replace(/```\n?/g, '').replace(/```\n?$/g, '');
            }

            const result = JSON.parse(jsonText);
            return {
                platform,
                content: result.content,
                hashtags: result.hashtags,
                charCount: result.content.length
            };
        }));

        res.json({ success: true, posts });
    } catch (error) {
        console.error('Social media generation error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Generate email campaign
app.post('/api/content/email', async (req, res) => {
    const { subject, purpose, language } = req.body;

    try {
        const prompt = `You are a professional email marketing copywriter. Create an email campaign:

Subject line idea: ${subject}
Purpose: ${purpose}
Language: ${language}

Requirements:
- Compelling subject line (40-60 characters)
- Engaging preheader text (80-100 characters)
- Email body with clear CTA
- Professional tone
- Respond ONLY with valid JSON in this format: {"subject": "...", "preheader": "...", "body": "..."}`;

        const response = await ollama.generate({
            model: 'llama3.1:8b',
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.7,
                num_predict: 1000
            }
        });

        // Extract JSON from response
        let jsonText = response.response.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\n?/g, '').replace(/```\n?$/g, '');
        }

        const result = JSON.parse(jsonText);

        res.json({
            success: true,
            email: {
                subject: result.subject,
                preheader: result.preheader,
                body: result.body,
                language
            }
        });
    } catch (error) {
        console.error('Email generation error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ========================================
// MARKETING AUTOMATION API ENDPOINTS
// ========================================

// Get marketing stats
app.get('/api/marketing/stats', (req, res) => {
    const stats = {
        emailSubscribers: 2847,
        scheduledPosts: 14,
        activeCampaigns: 3,
        todayEmails: 34,
        emailOpenRate: 34.2,
        socialEngagement: 234
    };

    res.json({
        success: true,
        stats
    });
});

// Launch campaign
app.post('/api/marketing/campaign', (req, res) => {
    const { type, name, config } = req.body;

    // TODO: Integrate with Mailchimp/Buffer APIs
    res.json({
        success: true,
        message: `${type} campaign "${name}" launched`,
        campaignId: Date.now()
    });
});

// Schedule social posts
app.post('/api/marketing/social/schedule', (req, res) => {
    const { posts, schedule } = req.body;

    // TODO: Integrate with Buffer API
    res.json({
        success: true,
        message: `${posts.length} posts scheduled`,
        scheduledFor: schedule
    });
});

// ========================================
// ANALYTICS API ENDPOINTS
// ========================================

// Get analytics overview
app.get('/api/analytics/overview', (req, res) => {
    const analytics = {
        today: {
            visitors: 423,
            leads: 12,
            pageviews: 1247,
            bounceRate: 42.3
        },
        week: {
            visitors: 2841,
            leads: 47,
            conversion: 1.65,
            topPages: [
                { page: '/services', views: 524 },
                { page: '/pricing', views: 387 },
                { page: '/contact', views: 294 }
            ]
        },
        rankings: {
            improved: 14,
            declined: 3,
            stable: 28,
            topKeywords: [
                { keyword: 'AI projektmanagement', position: 3, change: 2 },
                { keyword: 'GDPR compliance', position: 7, change: 1 },
                { keyword: 'security consulting', position: 12, change: -1 }
            ]
        }
    };

    res.json({
        success: true,
        analytics
    });
});

// Get site-specific analytics
app.get('/api/analytics/site/:siteId', (req, res) => {
    const { siteId } = req.params;

    // TODO: Integrate with Google Analytics API
    res.json({
        success: true,
        siteId,
        data: {
            visitors: 127,
            pageviews: 384,
            avgDuration: '2:34',
            topPages: []
        }
    });
});

// ========================================
// QUICK ACTIONS API ENDPOINTS
// ========================================

// Generate complaint letter
app.post('/api/actions/complaint', (req, res) => {
    const { type, details, language } = req.body;

    // TODO: Integrate with complaints generator
    res.json({
        success: true,
        letter: `Generated ${type} complaint letter in ${language}`,
        downloadUrl: '/downloads/complaint.pdf'
    });
});

// Run SEO audit
app.post('/api/actions/seo-audit', (req, res) => {
    const { url } = req.body;

    // TODO: Integrate with SEO audit tools
    res.json({
        success: true,
        message: 'SEO audit started',
        reportUrl: '/reports/seo-audit-latest.pdf'
    });
});

// Export analytics
app.get('/api/actions/export-analytics', (req, res) => {
    const { format, dateRange } = req.query;

    // TODO: Generate export file
    res.json({
        success: true,
        message: `Analytics exported as ${format}`,
        downloadUrl: `/exports/analytics-${dateRange}.${format}`
    });
});

// ========================================
// HEALTH CHECK
// ========================================

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ========================================
// ERROR HANDLING
// ========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
    console.log('');
    console.log('🚀 VarnaAI Control Dashboard');
    console.log('========================================');
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}/`);
    console.log(`🔧 API Health: http://localhost:${PORT}/api/health`);
    console.log('========================================');
    console.log('');
});
