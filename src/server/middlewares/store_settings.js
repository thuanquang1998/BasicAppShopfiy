const { postgresql } = require('../connector/postgresql')
const { ResponseHandler } = require('../utils/responseHandler')

const toJson = (storeSetting) => {
  delete storeSetting.token
  delete storeSetting.scopes
  return storeSetting
}

const find = async ({ shop, accessToken }) => {
  try {
    let res = await postgresql.query(`select * from store_settings where store_name = '${shop}'`)
    if (res.rowCount) {
      return ResponseHandler.success(toJson(res.rows[0]))
    } else {
      throw { message: 'Invalid shop session' }
    }
  } catch (error) {
    console.log(`StoreSettingsMiddleware.find error`, error)
    return ResponseHandler.error(error)
  }
}

const update = async ({ shop, accessToken, accepted_date }) => {
  try {
    let updateStr = ``

    if (accepted_date) {
      updateStr = `accepted_date = now(), status = 'running'`
    }

    if (updateStr) {
      let res = await postgresql.query(
        `update store_settings set ${updateStr} where store_name = '${shop}' returning *;`
      )
      if (res.rowCount) {
        return ResponseHandler.success(toJson(res.rows[0]))
      } else {
        throw { message: 'Update store setting failed' }
      }
    } else {
      throw { message: 'Invalid params' }
    }
  } catch (error) {
    console.log(`StoreSettingsMiddleware.update error`, error)
    return ResponseHandler.error(error)
  }
}

module.exports.StoreSettingsMiddleware = {
  toJson,
  find,
  update,
}
