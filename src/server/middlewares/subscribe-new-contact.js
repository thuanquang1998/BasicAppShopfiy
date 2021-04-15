const rp = require('request-promise')
const { TicketMiddleware } = require('./ticket')

require('dotenv').config()
const { REMOTE_SERVER, APP_EMAIL } = process.env

module.exports = function SubscribeNewContact(contact, shop) {  
  const { email, customer_email, plan_name, shop_owner } = contact

  return (async () => {
    if (email || customer_email) {
      const options = {
        method: 'post',
        uri: `${REMOTE_SERVER}/remote/subscribe-mail`,
        json: true,
        body: {
          // Email of client install this app
          email: email,
          // Second option for email of client install this app
          customer_email: customer_email,
          // mail list - each match with each arena product app or theme
          address: APP_EMAIL,
          // product's name
          product_name: 'Arena Starter App',
          // product's type app or theme
          product_type: 'app',
          // app still not use version so always 1.0 as defaut
          product_version: '1.0',
          // store url of client
          shop,
          // welcome mail template
          welcome_tpl: 'welcome_tpl',
          // welcome again mail template
          welcome_back_tpl: 'welcome_back_tpl',
        },
      }

      // Subscribe client using app to remote mail server
      let subscribe_task = await rp(options).catch((err) => {
        throw new Error(err.message)
      })

      /**
       * Send ticket to freshdesk
       */
      // TicketMiddleware.create({
      //   shop,
      //   contact: email || customer_email || shop_owner,
      //   plan_name,
      //   subject: 'App Installing',
      //   tag: 'install',
      //   description: `
      //     <html>
      //       <body>
      //         <p>Welcome to <b>Arena Starter App</b> application.</p>
      //         <p>Now, you can translate your store into multi languages.</p>
      //         <br />
      //         <p>Thank you!</p>
      //         <p>- ArenaCommerce Team</p>
      //       </body>
      //     </html>
      //   `,
      // })

      return subscribe_task
    }
  })().catch((err) => {
    return {
      status: 'error',
      msg: err.message,
    }
  })
}
