const { apiCaller } = require('../utils/apiCaller')

const API_VERSION = '2020-07'

module.exports.GetStoreContact = async ({ shop, accessToken }) => {

  // plan name enum: trial, affiliate, basic, professional, unlimited, enterprise.

  try {
    let res = await apiCaller({
      shop,
      accessToken,
      endpoint: `/admin/api/${API_VERSION}/shop.json?fields=email,customer_email,plan_name,shop_owner`,
      method: 'GET',
    })
    if (res.success) {
      let storeData = res.payload.shop
      const { email, customer_email, plan_name, shop_owner } = storeData
      return {
        status: 'success',
        email,
        customer_email,
        plan_name,
        shop_owner,
      }
    } else {
      throw res.error
    }
  } catch (error) {
    console.log(`GetStoreContact error`, error)
    return {
      status: 'error',
      msg: error.message,
    }
  }
}
