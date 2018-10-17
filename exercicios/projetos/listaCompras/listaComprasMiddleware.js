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

const verificarUsuario = (ctx, next) => {
    const sameIdMessage = ctx.update.message && ctx.update.message.from.id === env.userId
    const sameIdCallback = ctx.update.callback_query && ctx.update.callback_query.from.id === env.userId

    if (sameIdMessage || sameIdCallback) {
        next()
    } else {
        ctx.reply('Desculpe, não estou autorizado a conversar com você.')
    }
}

const processando = (ctx, next) => ctx.reply('Processando...').then(() => next())

bot.use(session())

bot.start(verificarUsuario, async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo(a), ${name}!`)
    await ctx.reply('Escreva os itens que deseja adicionar...')
    ctx.session.lista = []
})

bot.on('text', verificarUsuario, processando, ctx => {
    const item = ctx.update.message.text
    if (ctx.session.lista === undefined) {
        ctx.session.lista = []
    }
    ctx.session.lista.push(item)
    ctx.reply(`O item '${item}' foi adicionado com sucesso.`, gerarBotoes(ctx.session.lista))
})

bot.action(/delete (.+)/, verificarUsuario, processando, ctx => {
    ctx.session.lista = ctx.session.lista.filter(item => item !== ctx.match[1])
    ctx.reply(`O item '${ctx.match[1]}' foi excluído com sucesso.`, gerarBotoes(ctx.session.lista))
})

bot.startPolling()
