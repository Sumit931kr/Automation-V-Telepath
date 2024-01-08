const { Telegraf } = require('telegraf');

const dotenv = require("dotenv");
const tele = require("./open-ai/GPT");
const generat = require("./cohere-ai/cohere");
const DalleGenerateImage = require("./open-ai/DALLE_AI");
const { spawn } = require("child_process");
const YTV = require("./Youtube/Youtube");
const express = require('express');
// const session = require("express-session");
const session = require('telegraf-session-redis');
const Redis = require('redis');


const app = express();

const PORT = process.env.PORT || 4000


app.get('/', (req, res) => {
    res.send('running the server');
})

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log("Server initiated for Telegram Bot!!");

// Create a Redis client
const redisClient = Redis.createClient();

// Enable sessions using Redis
bot.use(session({ store: { client: redisClient } }).middleware());

bot.start((ctx) => ctx.reply(`Welcome ,,


1. To Chat with Chat Gpt Type /chatgpt
2. Text to Image /TextToImage


`));


bot.help((ctx) => {

    ctx.reply(`
   
   1. To Chat with Chat Gpt Type /chatgpt
2. Text to Image /TextToImage
   
   
   `)
})

// bot.command('chatwithgpt', (ctx) => {
//     msg = ctx.message.text
//     msgArray = msg.split(' ');
//     console.log(msgArray);
//     ctx.reply(msg);

// })

// let ctx.session.index = 0
bot.on('message', (ctx) => {
    console.log(ctx);
    // console.log(bot);

    if (!ctx.session.index) {
        ctx.session.index = 0
    }

    let texture = ctx.message.text;
    console.log(ctx.session.index)

    if (texture == '/help') {
        ctx.reply(`

1. To Chat with Chat Gpt Type /chatgpt
2. Text to Image /TextToImage

    `)
    }
    else if (texture == '/chatgpt') {
        ctx.session.index = 1;
        ctx.reply('Ask your Question Now')
    }
    else if (texture == '/TextToImage') {
        ctx.session.index = 2;
        ctx.reply('Write Your Promt now For the Image')
    }




    else if (ctx.session.index == 1) {
        console.log("ctx.session.index : 1")
        console.log(texture)
        tele.teleV(texture).then((data) => {
            ctx.reply(data);
        }).catch(err => {
            console.log(err)
            console.log(err.message)
        });
    }
    else if (ctx.session.index == 2) {

        const response = spawn('python', ['./py_modules/Stable Diffusion/stable_diffusion.py', texture]);
        response.stdout.on('data', (data) => {
            const result = data.toString();
            const imgLink = result.split("'")[1];
            ctx.sendPhoto(imgLink);
            console.log(ctx.sendPhoto);
        })

    }
    else if (ctx.session.index == 0) {
        ctx.reply(`

1. To Chat with Chat Gpt Type /chatgpt
2. Text to Image /TextToImage

        `)
    }


})



bot.launch();

app.listen(PORT, () => {
    console.log("server is running at 4000");
})
