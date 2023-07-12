
const { Telegraf } = require("telegraf");
const dotenv = require("dotenv");
const tele = require("./open-ai/GPT");
const generat = require("./cohere-ai/cohere");
const DalleGenerateImage = require("./open-ai/DALLE_AI");
const { spawn } = require("child_process");
const YTV = require("./Youtube/Youtube");
const express = require('express');
const session = require("express-session");


// import { Telegraf } from 'telegraf';
// import dotenv from 'dotenv';

// import {geerat} from './cohere-ai/cohere.js'
// import DalleGenerateImage from './open-ai/DALLE_AI.js';
// import 
// import { spawn } from 'child_process';
// import YTV from './Youtube/Youtube.js';
// import express from 'express';
// import { tele } from './open-ai/GPT.js';



// import fetch from 'node-fetch';
// const fetch = require('node-fetch');


const app = express();
app.use(session({
    secret: 'secret-key',
    // resaveL: false,
    saveUninitialized: true,
}))

const PORT = process.env.PORT || 4000


app.get('/', (req, res) => {
    res.send('running the server');
})

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log("Server initiated for Telegram Bot!!");



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

let index = 0
bot.on('message', (ctx) => {
    console.log(ctx);
    // console.log(bot);

    if (!index) {
        index = 0
    }

    let texture = ctx.message.text;
    console.log(index)

    if (texture == '/help') {
        ctx.reply(`

1. To Chat with Chat Gpt Type /chatgpt
2. Text to Image /TextToImage

    `)
    }
    else if (texture == '/chatgpt') {
        index = 1;
        ctx.reply('Ask your Question Now')
    }
    else if (texture == '/TextToImage') {
        index = 2;
        ctx.reply('Write Your Promt now For the Image')
    }




    else if (index == 1) {
        console.log("index : 1")
        console.log(texture)
        tele.teleV(texture).then((data) => {
            ctx.reply(data);
        }).catch(err => {
            console.log(err)
            console.log(err.message)
        });
    }
    else if (index == 2) {

        const response = spawn('python', ['./py_modules/Stable Diffusion/stable_diffusion.py', texture]);
        response.stdout.on('data', (data) => {
            const result = data.toString();
            const imgLink = result.split("'")[1];
            ctx.sendPhoto(imgLink);
            console.log(ctx.sendPhoto);
        })

    }
    else if (index == 0) {
        ctx.reply(`

1. To Chat with Chat Gpt Type /chatgpt
2. Text to Image /TextToImage

        `)
    }





    // console.log(texture)
    // let splitTexture = texture.split(": ");
    // let textCode = splitTexture[0];
    // let query = splitTexture[1];

    // console.log(ctx.message.photo);
    // let p  = ctx.message.photo[2].file_id;

    // let url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${p}`
    // console.log(url);

    // fetch(url)
    // .then((response) => response.json())
    // .then((data) => {
    // console.log(data)
    // console.log(data.result.file_path)
    //                     const response =  spawn('python',['./py_modules/nafnet/nafnet.py',data.result.file_path]);
    //                     response.stdout.on('data',(data)=>{
    //                         const result = data.toString();
    //                         console.log("res "+ result);
    //                         const imgLink = result.split("'")[1];
    //                         ctx.sendPhoto(imgLink);
    //                     });

    // });

    // ctx.sendPhoto(p)

    // console.log(p);


    //     switch(textCode){

    // // For Query using open-ai
    //         case 'Q':
    //             case 'q':
    //                 tele.teleV(query).then((data)=>{
    //                     ctx.reply(data);
    //                 }).catch(err=>console.log(err));
    //                 break;

    //         case 'C':
    //             case 'c':
    //                 generat.generate(query).then((data)=>{
    //                     ctx.reply(data);
    //                 }).catch(err=>console.log(err));
    //                 break;


    //  // For Generating image from text using Dalle-2
    //         case 'I1':
    //             case 'i1':
    //                 DalleGenerateImage.GI(query).then((data)=>{
    //                     ctx.sendPhoto(data);
    //                 }).catch(err=>console.log(err));  
    //                 break;  

    //  // For Generating image from text using stable-diffusion
    //         case 'I2':
    //             case 'i2':
    //                     const response =  spawn('python',['./py_modules/Stable Diffusion/stable_diffusion.py',query]);
    //                     response.stdout.on('data',(data)=>{
    //                         const result = data.toString();
    //                         const imgLink = result.split("'")[1];
    //                         ctx.sendPhoto(imgLink);
    //                     });
    //                     break;


    //         case 'Y':
    //             case 'y':
    //                 YTV.YT(query).then((data)=>{
    //                     // Gonna add this soon
    //                     console.log(data);
    //                     // ctx.replyWithVideo('https://drop-and-down-vidoes.netlify.app/New%20folder/05.mp4');
    //                     ctx.replyWithVideo('http://localhost:5500/videos/video.mp4?random=58')

    //                 // ctx.replyWithVideo('http://localhost:4000/Videos/video.mp4')
    //                 // ctx.sendVideo('https://automation-v-telepath/Videos/video.mp4');

    //                 //     fs.unlinkSync('http://127.0.0.1:5500/Automation/Automation-V-Telepath/Videos/video.mp4',()=>{
    //                 //         if(err) console.log(err);
    //                 //    else console.log("file deleted !!")

    //                 //       })

    //                 }).catch(err=>console.log(err));
    //                 break;


    //  // chat gpt modal 3.5
    //         case 'G':
    //             case 'g':
    //                 // console.log("i am here")
    //                 const resgpt = spawn('python', ['./open-ai/Gptpy.py', query]);
    //                 resgpt.stdout.on('data',(data)=>{
    //                     // console.log(data);
    //                     const result = data.toString();
    //                     const rep =  result.trim();
    //                     // console.log(rep);
    //                     // const rep = result.split("'")[1];
    //                     ctx.reply(result);
    //                 })
    //                 break;      



    //         default:
    //             ctx.reply("Just ask question. Don't spam here!!");
    //             break;
    //     }
})


// bot.on('image',(ctx)=>{
//     console.log("is here")
//     console.log(ctx);
// })


bot.launch();

app.listen(PORT, () => {
    console.log("server is running at 4000");
})
