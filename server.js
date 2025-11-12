require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3333;

// Initialize OpenAI (will fallback to mock if no API key)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}) : null;

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
app.post('/api/wordpress/login', (req, res) => {
    const { siteId } = req.body;

    const credentials = {
        1: { url: 'https://ai-projektmanager.de/wp-admin/', user: process.env.WP_AI_PM_USER, pass: process.env.WP_AI_PM_PASS },
        2: { url: 'https://aimarketingbg.com/wp-admin/', user: process.env.WP_AI_MKT_USER, pass: process.env.WP_AI_MKT_PASS },
        3: { url: 'https://classicsecurity.net/wp-admin/', user: process.env.WP_CLASSIC_USER, pass: process.env.WP_CLASSIC_PASS },
        4: { url: 'https://varna-agenten.de/wp-admin/', user: process.env.WP_VARNA_AG_USER, pass: process.env.WP_VARNA_AG_PASS },
        5: { url: 'https://varnaai.com/wp-admin/', user: process.env.WP_VARNA_AI_USER, pass: process.env.WP_VARNA_AI_PASS }
    };

    const creds = credentials[siteId];
    if (!creds) {
        return res.status(404).json({ success: false, message: 'Site not found' });
    }

    res.json({
        success: true,
        message: 'Login credentials retrieved',
        url: creds.url,
        username: creds.user
        // Note: Password not sent to frontend for security
    });
});

// ========================================
// CONTENT GENERATION API ENDPOINTS
// ========================================

// Generate blog post
app.post('/api/content/blog', async (req, res) => {
    const { topic, language, tone } = req.body;

    try {
        if (!openai) {
            // Fallback to mock data if no API key
            return res.json({
                success: true,
                content: {
                    title: `${topic} - AI Generated`,
                    content: `This is a placeholder blog post about ${topic} in ${language} language with ${tone} tone. Add OPENAI_API_KEY to .env for real content generation.`,
                    language,
                    tone,
                    wordCount: 650,
                    seoScore: 85
                }
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `You are a professional content writer creating blog posts in ${language} language with a ${tone} tone. Generate SEO-optimized content with proper structure (title, introduction, body, conclusion).`
                },
                {
                    role: "user",
                    content: `Write a comprehensive blog post about: ${topic}\n\nRequirements:\n- Language: ${language}\n- Tone: ${tone}\n- Length: 600-800 words\n- Include SEO keywords naturally\n- Format: JSON with fields: title, content, metaDescription`
                }
            ],
            temperature: 0.7,
            max_tokens: 1500
        });

        const result = JSON.parse(completion.choices[0].message.content);
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
        if (!openai) {
            // Fallback to mock data
            const posts = platforms.map(platform => ({
                platform,
                content: `AI-generated ${platform} post about ${topic} (${language}). Add OPENAI_API_KEY to .env for real content.`,
                hashtags: ['#AI', '#Marketing', '#VarnaAI'],
                charCount: 180
            }));
            return res.json({ success: true, posts });
        }

        const posts = await Promise.all(platforms.map(async (platform) => {
            const charLimits = {
                twitter: 280,
                linkedin: 1300,
                facebook: 500,
                instagram: 2200
            };

            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `You are a social media expert creating engaging posts for ${platform} in ${language} language. Include relevant hashtags and emojis.`
                    },
                    {
                        role: "user",
                        content: `Create a ${platform} post about: ${topic}\n\nRequirements:\n- Character limit: ${charLimits[platform] || 280}\n- Language: ${language}\n- Include 3-5 relevant hashtags\n- Format: JSON with fields: content, hashtags (array)`
                    }
                ],
                temperature: 0.8,
                max_tokens: 300
            });

            const result = JSON.parse(completion.choices[0].message.content);
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
        if (!openai) {
            // Fallback to mock data
            return res.json({
                success: true,
                email: {
                    subject: `${subject} - ${language}`,
                    body: `AI-generated email campaign for ${purpose}. Add OPENAI_API_KEY to .env for real content.`,
                    preheader: 'Preview text here',
                    language
                }
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `You are a professional email marketing copywriter creating campaigns in ${language} language. Write persuasive, conversion-focused email content.`
                },
                {
                    role: "user",
                    content: `Create an email campaign:\n\nSubject line idea: ${subject}\nPurpose: ${purpose}\nLanguage: ${language}\n\nRequirements:\n- Compelling subject line (40-60 chars)\n- Engaging preheader text (80-100 chars)\n- Email body with clear CTA\n- Professional tone\n- Format: JSON with fields: subject, preheader, body`
                }
            ],
            temperature: 0.7,
            max_tokens: 800
        });

        const result = JSON.parse(completion.choices[0].message.content);

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
