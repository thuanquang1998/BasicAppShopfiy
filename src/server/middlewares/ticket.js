const rp = require('request-promise')

require('dotenv').config()
const { REMOTE_SERVER, APP_EMAIL, TICKET_AUTH, TICKET_GROUP } = process.env

const create = ({ shop, contact, plan_name, subject, tag, description }) => {
  try {
    // Send ticket to freshdesk
    const URL = `https://arenathemes.freshdesk.com/api/v2/tickets`

    let modifiedFields = {
      email: contact,
      subject: subject,
      type: 'Question',
      description,
      status: 2,
      group_id: Number(TICKET_GROUP),
      tags: ['arena_starter_app', tag, 'app'],
      custom_fields: {
        cf_your_store_name: shop,
        cf_plan: plan_name,
        cf_shop_owner: contact,
      },
    }

    rp({
      uri: URL,
      method: 'POST',
      body: JSON.stringify(modifiedFields),
      headers: {
        Authorization: TICKET_AUTH,
        'Content-type': 'application/json; charset=utf-8',
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log(`createTicket err`, err)
      })
  } catch (error) {
    console.log(`TicketMiddleware.create error`, error)
  }
}

module.exports.TicketMiddleware = {
  create,
}
