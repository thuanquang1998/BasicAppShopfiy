// Koa
const Koa = require('koa')
// Koa Router
const Router = require('koa-router')
// Koa Ejs
const ejsRender = require('koa-ejs')
// Koa static cache
const staticCache = require('koa-static-cache')
// Koa Favicon
const favicon = require('koa-favicon')
// Koa Logger
const logger = require('koa-logger')

// Webpack
import webpack from 'webpack'
import { devMiddleware } from 'koa-webpack-middleware'
import devConfig from '../../webpack.config.js'
const compile = webpack(devConfig)

// Dotenv
require('dotenv').config()
const { SHOPIFY_APP_KEY } = process.env

// Create Koa
const app = new Koa()
// Create Koa router
const router = new Router()

// Create ejs render settings
ejsRender(app, {
  root: __dirname + '../../../views',
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false,
  async: true,
})

// APP SPECIFIC ROUTES
const AdminApi = require('./routes/admin')
const AuthRoutes = require('./routes/auth')
const WebhookRoutes = require('./routes/webhook')
const AppApi = require('./routes/app')

// app.use(logger())

app.use(favicon(__dirname + '../../../public/favicon.ico'))
app.use(staticCache(__dirname + '../../../public', { maxAge: 0 }))

app.use(async (ctx, next) => {
  if (ctx.path.search(/\install$/) == -1) {
    return next()
  } else {
    await ctx.render('pages/install', {
      page_title: 'ArenaCommerce App Installation',
    })
  }
})
app.use((ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', 'true');
  ctx.set('Access-Control-Allow-Origin', process.env.SHOPIFY_APP_HOST);
  ctx.set('Access-Control-Allow-Headers', '*');
  return next();
})

app.use(devMiddleware(compile))

app.use(router.routes())
app.use(router.allowedMethods())

router.get('/', async (ctx) => {
  const { shop } = ctx.query

  await ctx.render('pages/index', {
    page_title: 'Arena Starter App',
    api_key: SHOPIFY_APP_KEY,
    shop,
  })
})

// Admin type request handles - Admin side
router.use('/admin', AdminApi.routes(), AdminApi.allowedMethods())

// App type request handles - Store frontpage side
router.use('/app', AppApi.routes(), AppApi.allowedMethods())

// Webhook type request handles
router.use('/webhooks', WebhookRoutes.routes(), WebhookRoutes.allowedMethods())

// Auth type request handles
router.use('/auth', AuthRoutes.routes(), AuthRoutes.allowedMethods())

const PORT = process.env.PORT || 5005
app.listen(PORT);
