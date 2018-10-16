const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
    ctx.reply(`Seja bem vindo(a), ${ctx.update.message.from.first_name}!`)
})

bot.on('text', async (ctx, next) => {
    await ctx.reply('mid 1')
    next()
})

bot.on('text', async ctx => {
    await ctx.reply('mid 2')
})

bot.startPolling()
