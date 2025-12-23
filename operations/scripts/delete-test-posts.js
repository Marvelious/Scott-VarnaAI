#!/usr/bin/env node

const https = require('https');

const site = {
  domain: 'aimarketingbg.com',
  username: 'BigDick',
  appPassword: 'JcVk zSSU 3sgF K1wR TcXC s2Au'
};

const postsToDelete = [317426, 317428];

function deletePost(postId) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${site.username}:${site.appPassword}`).toString('base64');
    
    const options = {
      hostname: site.domain,
      path: `/wp-json/wp/v2/posts/${postId}?force=true`,
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ Deleted post ${postId}`);
          resolve();
        } else {
          console.log(`⚠️  Post ${postId}: ${res.statusCode} - ${data}`);
          resolve(); // Don't fail if already deleted
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function deleteAllTestPosts() {
  console.log('🗑️  Deleting old test posts...\n');
  
  for (const postId of postsToDelete) {
    await deletePost(postId);
  }
  
  console.log('\n✅ Cleanup complete!');
}

deleteAllTestPosts();
