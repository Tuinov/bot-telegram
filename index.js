import TelegramApi from 'node-telegram-bot-api';
import  { gameOptions }  from './options.js'

const token = '5189587103:AAFR3If806CKGMMLERuS_95qkV36-p5mYjs'

const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
    { command: '/start', description: 'начальная страница' },
    { command: '/info', description: 'информация' },
    { command: '/game', description: 'игра' }
])

const start = () => {
    bot.on('message', async msg => {
        // console.log(msg);
        const text = msg.text;
        const chatId = msg.chat.id;
        const userName = msg.from.first_name;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/7e8/aa6/7e8aa67b-ad91-4d61-8f62-301bde115989/192/3.webp')
            return bot.sendMessage(chatId, `привет ${userName}`);
        }
        if (text === '/game') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/a00/6a2/a006a2b4-4ec8-4068-88ff-9fcc18c7e1cc/2.webp')
            return bot.sendMessage(chatId, ` ${userName} угадай число?`, gameOptions);
        }
        return bot.sendMessage(chatId, `не понимаю тебя ${userName}`);


    })
}

bot.on('callback_query', msg => {
    console.log(msg);
    const chatId = msg.message.chat.id;
    

    bot.sendMessage(chatId, ` ${msg.data} ты нажал`);
})

start();