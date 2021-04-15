const AppStatus = require('../../middlewares/app-status')

const getInstallUrl = require('./helpers/get-install-url')

const { GetStoreContact } = require('../../middlewares/get-store-contact')

module.exports = async function Init(ctx) {
  if (ctx.query.shop && ctx.query.shop.indexOf('myshopify') !== -1) {
    let store = ctx.query.shop.replace(/https:\/\/|http:\/\//gm, '').toLowerCase()
    let checkStore = await AppStatus.GetStore(store)

    if (checkStore.status === 'error') {
      ctx.body = checkStore.msg
      return
    }

    let storeObject = checkStore.store

    /**
     * STORE HAS INSTALLED APP BUT NEED TO CHECK THE CASE OF CLIENT UNINSTALLED THE APP BUT WEBHOOK STILL NOT RECEIVED
     */
    if (storeObject && (storeObject.status === 'running' || storeObject.status === 'installed')) {
      try {
        // Has token
        if (storeObject.token) {
          let storeInfo = await GetStoreContact({ shop: store, accessToken: storeObject.token })
          if (storeInfo.status === 'error') {
            throw new Error('No token')
          }

          ctx.redirect(`/?shop=${store}`)
          return
        }
        // No token
        else {
          throw new Error('No token')
        }
      } catch (err) {
        let installUrl = await getInstallUrl(store)

        if (installUrl) {
          ctx.redirect(installUrl)
          return
        } else {
          ctx.body = 'There is an unexpected error when starting install the app'
          return
        }
      }
    } else {
    /**
     * STORE HAS NOT INSTALLED APP. REDIRECT TO INSTALL PAGE
     */
      let installUrl = await getInstallUrl(store)

      if (installUrl) {
        ctx.redirect(installUrl)
        return
      } else {
        ctx.body = 'There is an unexpected error when starting install the app'
        return
      }
    }
  } else {
    // Missing shop parameter
    ctx.body = 'shop parameter missing or invalid. Please check again.'
    return
  }
}
