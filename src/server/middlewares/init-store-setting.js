const { GetStoreContact } = require('./get-store-contact')
const { postgresql } = require('../connector/postgresql')

module.exports.InitStoreSetting = async ({ shop, accessToken, scopes }) => {
  try {
    let contact = await GetStoreContact({ shop, accessToken })

    let res = await postgresql.query(
      `INSERT INTO store_settings (store_name, store_plan, status, install_date, contact, token, nonce, scopes)
      SELECT '${shop}', '${contact.plan_name}', 'installed', null, '${contact.email}', '${accessToken}', null, '${scopes}'
      WHERE NOT EXISTS
      (SELECT * FROM store_settings WHERE store_name='${shop}')`
    )

    // If rowCount is zero there are 2 cases:
    //  - App has already installed on store ==> not update status
    //  - App record still in db but its status is uninstalled and merchant re-install again
    //      ==> need update status
    if (!res.rowCount) {
      res = await postgresql.query(
        `UPDATE store_settings 
        SET (store_plan, status, install_date, uninstall_date, contact, token, nonce, scopes) = ('${contact.plan_name}', 'installed', null, null, '${contact.email}', '${accessToken}', null, '${scopes}') 
        WHERE store_name='${shop}' AND status!='installed'`
      )
      if (!res.rowCount) {
        throw { message: 'Cannot update store record' }
      }
    }

    return {
      status: 'success',
      msg: 'Init store setting to db successfully',
      contact,
    }
  } catch (error) {
    console.log(`InitStoreSetting error`, error)
    return {
      status: 'error',
      msg: error.message,
    }
  }
}
