const rp = require('request-promise')
const AppStatus = require('./app-status')
const { TicketMiddleware } = require('./ticket')

require('dotenv').config()
const { REMOTE_SERVER, APP_EMAIL, TICKET_AUTH, TICKET_GROUP } = process.env

module.exports = function UnsubscribeContact(shop) {
  return (async () => {
    const options = {
      method: 'post',
      uri: `${REMOTE_SERVER}/remote/unsubscribe-mail`,
      body: {
        address: APP_EMAIL, // Mailing list for this app
        product_name: 'JWT App',
        product_type: 'app',
        product_version: '1.0',
        shop,
      },
      json: true,
    }

    // Unsubscribe client when uninstall app
    let unsubscribe_task = await rp(options).catch((err) => {
      throw new Error(err.message)
    })

    /**
     * Send ticket to freshdesk
     */
    // TicketMiddleware.create({
    //   shop: storeInfo.store_name,
    //   contact: storeInfo.contact,
    //   plan_name: storeInfo.store_plan,
    //   subject: 'App Uninstall',
    //   tag: 'uninstall',
    //   description: `
    //     <html>
    //       <body>
    //         <p>Hi <b>${storeInfo.store_name}</b> shop's owner.</p>
    //         <p>We constantly conduct work on the improvement of our app quality.</p>
    //         <p>So we would appreciate it if you can take a few seconds to let us know what made you unhappy, or what we could have done better.</p>
    //         <br />
    //         <p>We’d love to hear from you.</p>
    //         <p>- ArenaCommerce Team</p>
    //       </body>
    //     </html>
    //   `,
    // })

    return unsubscribe_task
  })().catch((err) => {
    return {
      status: 'error',
      msg: err.message,
    }
  })
}
