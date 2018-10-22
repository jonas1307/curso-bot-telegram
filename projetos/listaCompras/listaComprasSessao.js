const env = require('../../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const bot = new Telegraf(env.token)

const gerarBotoes = (lista) =>
    Extra.markup(Markup.inlineKeyboard(lista.map(item => Markup.callbackButton(item, `delete ${item}`)), {
        columns: 3
    }))

bot.use(session())

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo(a), ${name}!`)
    await ctx.reply('Escreva os itens que deseja adicionar...')
    ctx.session.lista = []
})

bot.on('text', ctx => {
    const item = ctx.update.message.text
    if (ctx.session.lista === undefined) {
        ctx.session.lista = []
    }
    ctx.session.lista.push(item)
    ctx.reply(`O item '${item}' foi adicionado com sucesso.`, gerarBotoes(ctx.session.lista))
})

bot.action(/delete (.+)/, ctx => {
    ctx.session.lista = ctx.session.lista.filter(item => item !== ctx.match[1])
    ctx.reply(`O item '${ctx.match[1]}' foi excluído com sucesso.`, gerarBotoes(ctx.session.lista))
})

bot.startPolling()
