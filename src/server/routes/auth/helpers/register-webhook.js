const rp = require('request-promise')

require('dotenv').config()
const { SHOPIFY_APP_WEBHOOK } = process.env

const API_VERSION = '2020-07'

const registerWebhook = (shop, accessToken, webhooks) => {
  return new Promise((resolve, reject) => {
    let taskCount = webhooks.length
    for (let i = 0; i < webhooks.length; i++) {
      setTimeout(() => {
        let payload = {
          webhook: {
            topic: webhooks[i],
            address: SHOPIFY_APP_WEBHOOK,
            format: 'json',
          },
        }

        rp({
          uri: `https://${shop}/admin/api/${API_VERSION}/webhooks.json`,
          method: 'POST',
          json: true,
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-type': 'application/json; charset=utf-8',
          },
          body: payload,
        })
          .then((response) => {})
          .catch((err) => {})
          .finally(() => {
            taskCount--
            if (!taskCount) {
              resolve(1)
            }
          })
      }, i * 500)
    }
  })
}

module.exports = registerWebhook
