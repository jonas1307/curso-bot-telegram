const env = require('../../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let lista = []

const gerarBotoes = () =>
    Extra.markup(Markup.inlineKeyboard(lista.map(item =>
        Markup.callbackButton(item, `delete ${item}`)), {
        columns: 3
    }))

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo(a), ${name}!`)
    await ctx.reply('Escreva os itens que deseja adicionar...')
})

bot.on('text', ctx => {
    const item = ctx.update.message.text
    lista.push(item)
    ctx.reply(`O item '${item}' foi adicionado com sucesso.`, gerarBotoes())
})

bot.action(/delete (.+)/, ctx => {
    lista = lista.filter(item => item !== ctx.match[1])
    ctx.reply(`O item '${ctx.match[1]}' foi excluído com sucesso.`, gerarBotoes())
})

bot.startPolling()
