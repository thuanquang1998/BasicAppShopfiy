const Router = require('koa-router')
const AuthRoutes = new Router()
const AuthInit = require('./init')
const AuthCallback = require('./callback')

AuthRoutes.get('/', async (ctx) => {
  await AuthInit(ctx)
})

AuthRoutes.get('/callback', async (ctx) => {
  await AuthCallback(ctx)
})

module.exports = AuthRoutes
