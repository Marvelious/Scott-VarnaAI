/**
 * BUFFER API INTEGRATION
 * Social media scheduling and posting automation
 *
 * Setup: npm install buffer
 * API Key: Get from buffer.com/developers/api
 * Free Plan: 3 social profiles, 10 scheduled posts
 */

const axios = require('axios');

// ==============================================
// CONFIGURATION
// ==============================================

const BUFFER_API_BASE = 'https://api.bufferapp.com/1';
const ACCESS_TOKEN = process.env.BUFFER_ACCESS_TOKEN;

// Social profile IDs for each brand
const SOCIAL_PROFILES = {
  'ai-projektmanager.de': {
    linkedin: process.env.BUFFER_PROFILE_AI_PROJEKT_LINKEDIN,
    facebook: process.env.BUFFER_PROFILE_AI_PROJEKT_FACEBOOK,
    twitter: process.env.BUFFER_PROFILE_AI_PROJEKT_TWITTER
  },
  'aimarketingbg.com': {
    linkedin: process.env.BUFFER_PROFILE_AI_MARKETING_LINKEDIN,
    facebook: process.env.BUFFER_PROFILE_AI_MARKETING_FACEBOOK,
    twitter: process.env.BUFFER_PROFILE_AI_MARKETING_TWITTER
  },
  'classicsecurity.net': {
    linkedin: process.env.BUFFER_PROFILE_SECURITY_LINKEDIN,
    facebook: process.env.BUFFER_PROFILE_SECURITY_FACEBOOK,
    twitter: process.env.BUFFER_PROFILE_SECURITY_TWITTER
  },
  'varna-agenten.de': {
    linkedin: process.env.BUFFER_PROFILE_AGENTEN_LINKEDIN,
    facebook: process.env.BUFFER_PROFILE_AGENTEN_FACEBOOK,
    twitter: process.env.BUFFER_PROFILE_AGENTEN_TWITTER
  },
  'varnaai.com': {
    linkedin: process.env.BUFFER_PROFILE_VARNAAI_LINKEDIN,
    facebook: process.env.BUFFER_PROFILE_VARNAAI_FACEBOOK,
    twitter: process.env.BUFFER_PROFILE_VARNAAI_TWITTER
  }
};

// ==============================================
// SCHEDULE POST TO BUFFER
// ==============================================

async function schedulePost(data) {
  const {
    website,
    platforms = ['linkedin', 'facebook', 'twitter'], // Which platforms to post to
    text,
    link,
    imageUrl,
    scheduleTime, // Optional: ISO timestamp, leave empty for queue
    now = false, // Post immediately
    customTexts = {} // Platform-specific text variations
  } = data;

  const profiles = SOCIAL_PROFILES[website];
  if (!profiles) {
    throw new Error(`Unknown website: ${website}`);
  }

  const results = [];

  for (const platform of platforms) {
    const profileId = profiles[platform];
    if (!profileId) {
      console.warn(`⚠️  No ${platform} profile configured for ${website}`);
      continue;
    }

    // Use custom text for platform if provided, otherwise use default
    const postText = customTexts[platform] || text;

    try {
      const payload = {
        profile_ids: [profileId],
        text: postText,
        shorten: true, // Auto-shorten links
        now: now
      };

      // Add link if provided
      if (link) {
        payload.media = {
          link: link
        };
      }

      // Add image if provided
      if (imageUrl) {
        payload.media = payload.media || {};
        payload.media.photo = imageUrl;
      }

      // Add schedule time if provided
      if (scheduleTime && !now) {
        payload.scheduled_at = Math.floor(new Date(scheduleTime).getTime() / 1000);
      }

      const response = await axios.post(
        `${BUFFER_API_BASE}/updates/create.json`,
        payload,
        {
          params: { access_token: ACCESS_TOKEN }
        }
      );

      console.log(`✅ Scheduled ${platform} post for ${website}`);
      results.push({
        platform,
        success: true,
        updateId: response.data.updates[0].id,
        scheduledAt: response.data.updates[0].due_at
      });

    } catch (error) {
      console.error(`❌ ${platform} scheduling error:`, error.response?.data || error.message);
      results.push({
        platform,
        success: false,
        error: error.response?.data?.error || error.message
      });
    }
  }

  return results;
}

// ==============================================
// AUTO-POST NEW BLOG POST
// ==============================================

async function postBlogArticle(data) {
  const {
    website,
    title,
    excerpt,
    url,
    imageUrl,
    category
  } = data;

  // Platform-specific formatting
  const posts = {
    linkedin: {
      text: `${title}\n\n${excerpt}\n\n🔗 Read more:`,
      link: url
    },
    facebook: {
      text: `${title}\n\n${excerpt}`,
      link: url
    },
    twitter: {
      text: `${title}\n\n${excerpt.substring(0, 180)}...`,
      link: url
    }
  };

  // Add hashtags based on category
  const hashtags = getCategoryHashtags(category, website);
  posts.twitter.text += `\n\n${hashtags}`;
  posts.linkedin.text += `\n\n${hashtags}`;

  return await schedulePost({
    website,
    platforms: ['linkedin', 'facebook', 'twitter'],
    text: posts.linkedin.text, // Default text
    link: url,
    imageUrl,
    customTexts: {
      linkedin: posts.linkedin.text,
      facebook: posts.facebook.text,
      twitter: posts.twitter.text
    },
    now: false // Add to queue
  });
}

// ==============================================
// GET PROFILE SCHEDULES
// ==============================================

async function getProfileSchedule(website, platform) {
  const profileId = SOCIAL_PROFILES[website]?.[platform];
  if (!profileId) {
    throw new Error(`No ${platform} profile for ${website}`);
  }

  try {
    const response = await axios.get(
      `${BUFFER_API_BASE}/profiles/${profileId}/schedules.json`,
      {
        params: { access_token: ACCESS_TOKEN }
      }
    );

    return response.data;
  } catch (error) {
    console.error(`❌ Get schedule error:`, error.response?.data || error.message);
    throw error;
  }
}

// ==============================================
// GET PENDING POSTS
// ==============================================

async function getPendingPosts(website, platform) {
  const profileId = SOCIAL_PROFILES[website]?.[platform];
  if (!profileId) {
    throw new Error(`No ${platform} profile for ${website}`);
  }

  try {
    const response = await axios.get(
      `${BUFFER_API_BASE}/profiles/${profileId}/updates/pending.json`,
      {
        params: { access_token: ACCESS_TOKEN }
      }
    );

    return response.data.updates.map(update => ({
      id: update.id,
      text: update.text,
      scheduledAt: new Date(update.due_at * 1000),
      link: update.media?.link,
      status: update.status
    }));

  } catch (error) {
    console.error(`❌ Get pending posts error:`, error.response?.data || error.message);
    throw error;
  }
}

// ==============================================
// DELETE SCHEDULED POST
// ==============================================

async function deletePost(updateId) {
  try {
    const response = await axios.post(
      `${BUFFER_API_BASE}/updates/${updateId}/destroy.json`,
      {},
      {
        params: { access_token: ACCESS_TOKEN }
      }
    );

    console.log(`✅ Deleted post ${updateId}`);
    return { success: true };

  } catch (error) {
    console.error(`❌ Delete post error:`, error.response?.data || error.message);
    throw error;
  }
}

// ==============================================
// REORDER QUEUE
// ==============================================

async function reorderQueue(website, platform, updateIds) {
  const profileId = SOCIAL_PROFILES[website]?.[platform];
  if (!profileId) {
    throw new Error(`No ${platform} profile for ${website}`);
  }

  try {
    const response = await axios.post(
      `${BUFFER_API_BASE}/profiles/${profileId}/updates/reorder.json`,
      {
        order: updateIds
      },
      {
        params: { access_token: ACCESS_TOKEN }
      }
    );

    console.log(`✅ Reordered ${platform} queue for ${website}`);
    return { success: true };

  } catch (error) {
    console.error(`❌ Reorder queue error:`, error.response?.data || error.message);
    throw error;
  }
}

// ==============================================
// GET ANALYTICS
// ==============================================

async function getPostAnalytics(updateId) {
  try {
    const response = await axios.get(
      `${BUFFER_API_BASE}/updates/${updateId}.json`,
      {
        params: { access_token: ACCESS_TOKEN }
      }
    );

    const update = response.data;
    return {
      id: update.id,
      text: update.text,
      postedAt: new Date(update.sent_at * 1000),
      clicks: update.statistics?.clicks || 0,
      reach: update.statistics?.reach || 0,
      likes: update.statistics?.likes || 0,
      shares: update.statistics?.shares || 0,
      comments: update.statistics?.comments || 0
    };

  } catch (error) {
    console.error(`❌ Get analytics error:`, error.response?.data || error.message);
    throw error;
  }
}

// ==============================================
// BULK SCHEDULE (CONTENT CALENDAR)
// ==============================================

async function bulkSchedulePosts(website, posts) {
  /*
  posts = [
    {
      platforms: ['linkedin', 'facebook'],
      text: "Post content here...",
      link: "https://...",
      scheduleTime: "2025-01-15T09:00:00Z"
    },
    // ... more posts
  ]
  */

  const results = [];

  for (const post of posts) {
    const result = await schedulePost({
      website,
      ...post
    });

    results.push({
      post: post.text.substring(0, 50) + '...',
      results: result
    });

    // Rate limiting: Wait 500ms between posts
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return results;
}

// ==============================================
// HELPER FUNCTIONS
// ==============================================

function getCategoryHashtags(category, website) {
  const isGerman = website.endsWith('.de');

  const hashtags = {
    'ai': isGerman
      ? '#KünstlicheIntelligenz #KI #Automation #DigitaleTransformation'
      : '#ArtificialIntelligence #AI #MachineLearning #Automation',

    'security': isGerman
      ? '#ITSicherheit #Cybersecurity #DSGVO #Datenschutz'
      : '#Cybersecurity #InfoSec #DataProtection #Security',

    'project-management': isGerman
      ? '#Projektmanagement #Digitalisierung #Effizienz'
      : '#ProjectManagement #ProductivityTools #TeamCollaboration',

    'marketing': isGerman
      ? '#DigitalesMarketing #SEO #ContentMarketing'
      : '#DigitalMarketing #MarketingAutomation #GrowthHacking'
  };

  return hashtags[category] || '';
}

// ==============================================
// EXPORTS
// ==============================================

module.exports = {
  schedulePost,
  postBlogArticle,
  getProfileSchedule,
  getPendingPosts,
  deletePost,
  reorderQueue,
  getPostAnalytics,
  bulkSchedulePosts
};

// ==============================================
// USAGE EXAMPLES
// ==============================================

/*
// Schedule single post
await schedulePost({
  website: 'ai-projektmanager.de',
  platforms: ['linkedin', 'facebook'],
  text: 'Neuer Artikel: KI im Projektmanagement 🚀',
  link: 'https://ai-projektmanager.de/blog/ki-projektmanagement',
  imageUrl: 'https://ai-projektmanager.de/images/article.jpg',
  scheduleTime: '2025-01-15T09:00:00Z'
});

// Auto-post blog article
await postBlogArticle({
  website: 'classicsecurity.net',
  title: 'Zero-Trust Security Implementation Guide',
  excerpt: 'Learn how to implement zero-trust architecture in your enterprise...',
  url: 'https://classicsecurity.net/blog/zero-trust-guide',
  imageUrl: 'https://classicsecurity.net/images/zero-trust.jpg',
  category: 'security'
});

// Get pending posts
const pending = await getPendingPosts('varnaai.com', 'linkedin');
console.log(`${pending.length} posts scheduled`);

// Get post analytics
const analytics = await getPostAnalytics('abc123updateid');
console.log(`Clicks: ${analytics.clicks}, Reach: ${analytics.reach}`);
*/
