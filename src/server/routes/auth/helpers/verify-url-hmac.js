const crypto = require('crypto')

require('dotenv').config()
const { SHOPIFY_APP_SECRET } = process.env

const verifyUrlHMAC = (ctx) => {
  let urlToCheck = ''
  const { hmac } = ctx.query

  for (let key in ctx.query) {
    if (key !== 'hmac') {
      urlToCheck += `${key}=${ctx.query[key]}&`
    }
  }

  urlToCheck = urlToCheck.slice(0, -1)
  let hashToCheck = crypto.createHmac('SHA256', SHOPIFY_APP_SECRET).update(urlToCheck).digest('hex')
  return hashToCheck == hmac
}

module.exports = verifyUrlHMAC
