const nonceCreate = require('nonce')()

const AppStatus = require('../../../middlewares/app-status')

require('dotenv').config()
const { SHOPIFY_APP_HOST, SHOPIFY_APP_KEY, SHOPIFY_APP_SCOPES } = process.env

module.exports = async function getInstallUrl(shop) {
  let nonce = nonceCreate()
  let callBackLink = `${SHOPIFY_APP_HOST}/auth/callback`

  /**
   * UPDATE NONCE TO DB
   */
  let saveNonce = AppStatus.SetNonce(shop, nonce)

  if (saveNonce.status === 'error') {
    return false
  }

  return `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_APP_KEY}&scope=${SHOPIFY_APP_SCOPES}&redirect_uri=${callBackLink}&state=${nonce}`
}
