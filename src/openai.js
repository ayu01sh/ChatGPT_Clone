const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: 'sk-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',
  dangerouslyAllowBrowser: true
});

const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAI(message) {
    try {
        const res = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: message,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });

        return res.data.choices[0].text;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // Rate limit exceeded, add a retry mechanism
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
            return sendMsgToOpenAI(message); // Retry the request
        }
        console.error('Error sending message to OpenAI:', error);
        throw error; // Rethrow the error for handling in your application
    }
}