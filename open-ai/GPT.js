const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openAI = new OpenAIApi(configuration);

async function Telegpt(query){
    const response = await openAI.createCompletion({
        model: "text-davinci-003",
        prompt: query,
        temperature: 0.3,
        max_tokens: 1024,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      });
      return response.data.choices[0].text;
}

// export {tele}
// export module tele

module.exports = {
    teleV: Telegpt
}