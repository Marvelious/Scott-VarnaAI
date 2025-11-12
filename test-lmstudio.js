const axios = require('axios');

// Test LM Studio with a real model
async function testLMStudio() {
    try {
        const response = await axios.post('http://localhost:1234/v1/chat/completions', {
            model: 'mistralai/mistral-7b-instruct-v0.3',
            messages: [
                { role: 'user', content: 'You are a professional content writer. Write a blog post about AI. Respond with valid JSON only: {"title": "...", "content": "...", "metaDescription": "..."}' }
            ],
            max_tokens: 500,
            temperature: 0.7
        });

        console.log('✅ LM Studio SUCCESS!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('❌ LM Studio ERROR:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

testLMStudio();
