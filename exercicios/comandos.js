const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
    const name = ctx.update.message.from.first_name
    ctx.reply(`Seja bem vindo, ${name}!\nAvise se precisar de /ajuda`)
})

bot.command('ajuda', ctx => ctx.reply(
    '/ajuda: vou mostrar as opções\n' +
    '/ajuda2: para testar via hears\n' +
    '/op3: opção genérica\n' +
    '/op4: outra opção genérica.'
))

bot.hears('/ajuda2', ctx => ctx.reply('Eu também capturo comandos, mas use o /ajuda.'))

bot.hears(/op\d+/, ctx => ctx.reply('Handler para opções genéricas.'))

bot.startPolling()
