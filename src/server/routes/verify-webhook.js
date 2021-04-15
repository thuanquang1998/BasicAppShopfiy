const crypto = require('crypto')

require('dotenv').config()
const { SHOPIFY_APP_SECRET } = process.env

const verifyWebhook = async (ctx, next) => {
  const domain = ctx.request.headers['x-shopify-shop-domain']
  const hmac = ctx.request.headers['x-shopify-hmac-sha256']
  const topic = ctx.request.headers['x-shopify-topic']
  const body = ctx.request.rawBody
  const hash = crypto
    .createHmac('sha256', SHOPIFY_APP_SECRET)
    .update(body, 'utf8', 'hex')
    .digest('base64')

  if (hash === hmac) {
    ctx.status = 200
    ctx.state.shop = domain
    ctx.state.topic = topic

    return next()
  } else {
    ctx.status = 403
    ctx.body = 'Not sent from Shopify'
    return
  }
}

module.exports = verifyWebhook
