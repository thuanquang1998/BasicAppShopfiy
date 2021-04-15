const Router = require('koa-router')
const WebhookRoutes = new Router()
const bodyParser = require('koa-bodyparser')
const verifyWebhook = require('./verify-webhook')
const AppStatus = require('../middlewares/app-status')
const UnsubscribeContact = require('../middlewares/unsubscribe-contact')

WebhookRoutes.use(bodyParser())
WebhookRoutes.use(verifyWebhook)

WebhookRoutes.post('/custom', async (ctx) => {
  const { shop, topic } = ctx.state

  if (topic === 'app/uninstalled') {
    AppStatus.UpdateAppStatus(shop, {
      status: 'uninstalled',
      install_date: null,
      uninstall_date: new Date(Date.now()).toISOString(),
      scopes: '',
    })

    /**
     * Send email to client + Send ticket to Freshdesk only work with live app
     */
    UnsubscribeContact(shop)
  }

  ctx.body = 'done'
})

/**
 * MANDATORY WEBHOOKS HANDLES
 */
WebhookRoutes.post('/mandatory/:type', async (ctx) => {
  const { shop, topic } = ctx.state
  const { type } = ctx.params

  // shop-redact: app uninstalled after 48 hours
  switch (type) {
    case 'shop-redact':
      console.log('Shop/Redact webhook')
      break

    case 'customers-redact':
      console.log('Customers/Redact webhook')
      break

    case 'customers-request':
      console.log('Customer/Request webhook')
      break

    default:
      break
  }

  ctx.body = 'done'
})

module.exports = WebhookRoutes
