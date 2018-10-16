const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(async (context) => {
    const id = context.update.message.from.id
    if (id === env.userId) {
        await context.reply('Ao seu dispor, mestre!')
    } else {
        await context.reply('Sinto muito mas falo apenas com meu mestre.')
    }
})

bot.startPolling()
