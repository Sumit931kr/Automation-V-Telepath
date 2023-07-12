const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openAI = new OpenAIApi(configuration);

async function Image_generate(text) {
    const response = await openAI.createImage({
        prompt: text,
        n:1,
        size:"1024x1024"
    });

    return response.data.data[0].url ;
}

module.exports = {
    DalleGenerateImage : Image_generate
}

