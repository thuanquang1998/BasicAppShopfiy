const verifyUrlHMAC = require('./helpers/verify-url-hmac')

const AppStatus = require('../../middlewares/app-status')

const FetchToken = require('./helpers/fetch-token')

const { InitStoreSetting } = require('../../middlewares/init-store-setting')

const registerWebhook = require('./helpers/register-webhook')

const SubscribeNewContact = require('../../middlewares/subscribe-new-contact')

module.exports = async function AuthCallback(ctx) {
  // STEP 1: VERIFY HMAC
  if (!verifyUrlHMAC(ctx)) {
    ctx.body = 'Unauthenticated Request HMAC!'
    return
  }

  // STEP 2: CHECK NONCE
  const { state, shop, code } = ctx.query
  const storeInfo = await AppStatus.GetNonce(shop)
  if (storeInfo.status === 'error') {
    ctx.body = storeInfo.msg
    return
  }
  if (state !== storeInfo.nonce) {
    ctx.body = 'Unauthenticated Request!'
    return
  }

  // STEP 3: GET ACCESS TOKEN FROM STORE
  const fetchToken = await FetchToken(shop, code)
  if (fetchToken.status === 'error') {
    ctx.body = fetchToken.msg
    return
  }

  const accessToken = fetchToken.data.access_token

  // STEP 4: GET STORE INFO AND STORE ON DB
  const setStoreInfo = await InitStoreSetting({ shop, accessToken, scopes: fetchToken.data.scope })
  if (setStoreInfo.status === 'error') {
    ctx.body = setStoreInfo.msg
    return
  }

  // EXTRA STEPS
  // Register Webhooks
  registerWebhook(shop, accessToken, ['app/uninstalled'])

  /**
   * Subscribe client email + Send welcome email to client + Send Freshdesk ticket only works with live app
   */
  if (setStoreInfo.status === 'success') {
    SubscribeNewContact(setStoreInfo.contact, shop)
  }

  ctx.redirect(`/?shop=${shop}`)
  return
}
