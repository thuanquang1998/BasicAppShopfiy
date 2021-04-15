const axios = require('axios')
const { ResponseHandler } = require('./responseHandler')

/**
 * 
 * @param {String} link 
 * @returns Object
 */
const getPageInfo = (link) => {
  let pageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
    nextPageInfo: '',
    previousPageInfo: '',
  }

  if (link) {
    if (link.indexOf('>; rel="previous"') >= 0) {
      pageInfo.hasPreviousPage = true
      pageInfo.previousPageInfo = link.slice(
        link.indexOf('page_info=') + 'page_info='.length,
        link.indexOf('>; rel="previous"')
      )
    }

    if (link.indexOf('>; rel="next"') >= 0) {
      pageInfo.hasNextPage = true
      pageInfo.nextPageInfo = link.slice(
        link.lastIndexOf('page_info=') + 'page_info='.length,
        link.indexOf('>; rel="next"')
      )
    }
  }

  return pageInfo
}

/**
 * 
 * @param {shop: string, accessToken: string, method: string, data: object, headers: object, pageInfo: boolean} param0 
 * @returns Object
 */
const apiCaller = async ({ shop, accessToken, endpoint, method, data, headers, pageInfo }) => {
  try {
    // validate params
    let paramObj = { shop, accessToken }
    let paramKeys = Object.keys(paramObj)
    for (let i = 0, leng = paramKeys.length; i < leng; i++) {
      if (!paramObj[paramKeys[i]]) {
        throw { message: `Field "${paramKeys[i]}" cannot be blank` }
      }
    }

    let _method = method || 'GET'
    let _headers = headers || {}

    const res = await axios({
      url: `https://${shop}${endpoint}`,
      method: _method,
      headers: {
        ..._headers,
        'X-Shopify-Access-Token': accessToken,
        'Content-type': 'application/json; charset=utf-8',
      },
      data,
    })
    
    let payload = res.data

    if (pageInfo) {
      payload.pageInfo = getPageInfo(res.headers.link)
    }

    return ResponseHandler.success(payload)
  } catch (error) {
    let _error = null

    if (error.response && error.response.data) {
      _error = error.response.data
    } else {
      _error = error
    }

    console.log(`apiCaller error`, _error)
    return ResponseHandler.error(_error)
  }
}

module.exports.apiCaller = apiCaller
