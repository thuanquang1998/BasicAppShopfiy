// @flow
import axios from 'axios'
import { getSessionToken } from '@shopify/app-bridge-utils'

const apiCaller = async (endpoint: string, method?: string = 'GET', data?: Object, headers?: Object = {}): Object => {
  try {
    let token = await getSessionToken(window.app)

    let res = await axios({
      url: endpoint,
      method,
      data,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.data?.success && res.data?.error?.message === 'INVALID_SHOP_SESSION') {
      console.log(`INVALID SHOP SESSION`)
      console.log(`Re-call api after 1s`)

      return await new Promise((resolve, reject) => {
        setTimeout(async () => {
          token = await getSessionToken(window.app)
          res = await axios({
            url: endpoint,
            method,
            data,
            headers: {
              ...headers,
              Authorization: `Bearer ${token}`,
            },
          })

          resolve(res.data)
        }, 1000)
      })
    } else {
      return res.data
    }
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message
        ? error.response.data
        : error?.message
        ? { message: error.message }
        : { message: 'Error: #' },
    }
  }
}

export default apiCaller
