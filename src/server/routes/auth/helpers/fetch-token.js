const rp = require('request-promise')

require('dotenv').config()
const { SHOPIFY_APP_KEY, SHOPIFY_APP_SECRET } = process.env

module.exports = function FetchToken(shop, code) {
  return new Promise((resolve, reject) => {
    const bodyData = {
      client_id: SHOPIFY_APP_KEY,
      client_secret: SHOPIFY_APP_SECRET,
      code: code,
    }
    rp({
      uri: `https://${shop}/admin/oauth/access_token`,
      method: 'POST',
      json: true,
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      body: bodyData,
    })
      .then((result) => {
        resolve({
          status: 'success',
          data: result,
        })
      })
      .catch((err) => {
        resolve({
          status: 'error',
          msg: err.message,
        })
      })
  })
}
