const { postgresql } = require('../connector/postgresql')

module.exports = {
  /**
   * FUNCTION TO LOAD NONCE VALUE FOR INSTALLATION APP  PROCESS
   */
  GetNonce: async (shop) => {
    try {
      let res = await postgresql.query(
        `SELECT nonce FROM store_settings WHERE store_name='${shop}'`
      )
      if (res.rowCount) {
        return {
          status: 'success',
          nonce: res.rows[0].nonce,
        }
      } else {
        throw { message: 'Cannot get nonce value' }
      }
    } catch (error) {
      console.log(`AppStatus.GetNonce error`, error)
      return {
        status: 'error',
        msg: error.message,
      }
    }
  },

  /**
   * FUNCTION TO SAVE NONCE VALUE FOR INSTALLATION APP PROCESS
   */
  SetNonce: async (shop, nonce) => {
    try {
      let res = await postgresql.query(
        `INSERT INTO store_settings (store_name, status, nonce)
        SELECT '${shop}', 'installing', '${nonce}'
        WHERE NOT EXISTS
        (SELECT * FROM store_settings WHERE store_name='${shop}')`
      )
      if (!res.rowCount) {
        res = await postgresql.query(
          `UPDATE store_settings SET (status, nonce) = ('installing', '${nonce}') WHERE store_name='${shop}'`
        )
        if (!res.rowCount) {
          throw { message: 'Cannot set nonce value' }
        }
      }

      return {
        status: 'success',
      }
    } catch (error) {
      console.log(`AppStatus.SetNonce error`, error)
      return {
        status: 'error',
        msg: error.message,
      }
    }
  },

  /**
   * FUNCTION TO GET STORE INFO TO CHECK INSTALLING STATUS
   */
  GetStore: async (shop) => {
    try {
      let res = await postgresql.query(
        `SELECT store_name, status, token FROM store_settings WHERE store_name='${shop}'`
      )
      
      return {
        status: 'success',
        store: res.rows[0],
      }
    } catch (error) {
      console.log(`AppStatus.GetStore error`, error)
      return {
        status: 'error',
        msg: error.message,
      }
    }
  },

  /**
   * PREVIOUS FUNCTION TO CHECK STORE INFO FROM DB
   */
  GetAppStatus: async (shop) => {
    try {
      let res = await postgresql.query(
        `SELECT store_plan, app_plan, status, install_date at time zone 'UTC' as install_date, uninstall_date at time zone 'UTC' as uninstall_date FROM store_settings WHERE store_name='${shop}'`
      )
      if (res.rowCount) {
        let install_date = res.rows[0].install_date ? res.rows[0].install_date : null
        let uninstall_date = res.rows[0].uninstall_date ? res.rows[0].uninstall_date : null

        return {
          status: 'success',
          step: 'Step --> After get app status',
          app_status: res.rows[0].status,
          install_date,
          uninstall_date,
          store_plan: res.rows[0].store_plan,
          app_plan: res.rows[0].app_plan,
        }
      } else {
        throw { message: 'Invalid shop session' }
      }
    } catch (error) {
      console.log(`AppStatus.GetAppStatus error`, error)
      return {
        status: 'error',
        step: 'Step --> When get app status',
        msg: 'There is an unexpected error when getting app status',
      }
    }
  },

  /**
   * FUNCTION TO UPDATE STORE INFO RECORD FORM DB
   */
  UpdateAppStatus: async (shop, body) => {
    try {
      // Handle query string
      let columns = [],
        values = []
      let colStr = '',
        valStr = ''

      for (let key in body) {
        columns.push(key)
        values.push(body[key])
      }

      columns.map((col, index) => {
        if (index != columns.length - 1) {
          colStr += `${col},`
          valStr += values[index] ? `'${values[index]}',` : `null,`
        } else {
          colStr += `${col}`
          valStr += values[index] ? `'${values[index]}'` : `null`
        }
      })

      const queryStr =
        columns.length > 1
          ? `UPDATE store_settings SET (${colStr}) = (${valStr}) WHERE store_name='${shop}'`
          : `UPDATE store_settings SET ${colStr} = ${valStr} WHERE store_name='${shop}'`

      let res = await postgresql.query(queryStr)

      return {
        status: 'success',
      }
    } catch (error) {
      console.log(`AppStatus.UpdateAppStatus error`, error)
      return {
        status: 'error',
        msg: error.message,
      }
    }
  },

  /**
   * FUNCTION TO GET STORE INFO TO CHECK INSTALLING STATUS
   */
  GetStore2: async (shop) => {
    try {
      let res = await postgresql.query(
        `SELECT store_name, contact, store_plan FROM store_settings WHERE store_name='${shop}'`
      )
      if (res.rowCount) {
        return {
          status: 'success',
          store_name: res.rows[0].store_name,
          store_plan: res.rows[0].store_plan,
          contact: res.rows[0].contact,
        }
      } else {
        throw { message: 'Invalid shop session' }
      }
    } catch (error) {
      console.log(`AppStatus.GetStore2 error`, error)
      return {
        status: 'error',
        msg: error.message,
      }
    }
  },
}
