const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(async ctx => {
    await ctx.reply(`Seja bem vindo, ${ctx.update.message.from.first_name}! 😎`)
    await ctx.replyWithHTML(`Destacando mensagem <b>HTML</b> <i>de várias</i> <code>formas</code> <pre>possíveis</pre> <a href="https://www.google.com">Google</a>`)
    await ctx.replyWithMarkdown(`Destacando mensagem *Markdown*`)
    await ctx.replyWithPhoto({
        source: `${__dirname}/cat.jpg`
    })
    await ctx.replyWithPhoto({
        url: 'https://www.google.com.br/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    })
    await ctx.replyWithLocation(29.9773008, 31.1303068)
    await ctx.replyWithVideo('http://files.cod3r.com.br/curso-bot/cod3r-end.m4v')
})

bot.startPolling()
