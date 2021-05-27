const { apiCaller } = require('../utils/apiCaller')
const { ResponseHandler } = require('../utils/responseHandler')

const API_VERSION = '2021-01'
const LIMIT_PER_REQUEST = 250

const find = async ({ shop, accessToken, limit, pageInfo, search, status, vendor}) => {
  try {
    // default params
    let _limit = parseInt(limit)
    if (!_limit || _limit > LIMIT_PER_REQUEST || _limit < 1) {
      _limit = 50
    }
    let _search = search || ''

    let res = await apiCaller({
      shop,
      accessToken,
      endpoint: `/admin/api/${API_VERSION}/products.json?limit=${_limit}${pageInfo ? `&page_info=${pageInfo}` : ``}${search ? `&title=${search}` : ``}${status ? `&status=${status.toLowerCase()}` : ``}${vendor ? `&vendor=${vendor}` : ``}`,
      method: 'GET',
      pageInfo: true,
    })

    if (res.success) {
      return ResponseHandler.success({
        ...res.payload,
        limit: _limit,
      })
    } else {
      throw res.error
    }
  } catch (error) {
    console.log(`ProductsMiddleware.find error`, error)
    return ResponseHandler.error(error)
  }
}

const findById = async ({ shop, accessToken, id }) => {
  try {
    // validate params
    let paramObj = { id }
    let paramKeys = Object.keys(paramObj)
    for (let i = 0, leng = paramKeys.length; i < leng; i++) {
      if (!paramObj[paramKeys[i]]) {
        throw { message: `Field "${paramKeys[i]}" cannot be blank` }
      }
    }

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `/admin/api/${API_VERSION}/products/${id}.json`,
      method: 'GET',
    })
  } catch (error) {
    console.log(`ProductsMiddleware.findById error`, error)
    return ResponseHandler.error(error)
  }
}

const getCount = async ({shop, accessToken}) => {
  try {
    return await apiCaller({
      shop,
      accessToken,
      endpoint: `/admin/api/${API_VERSION}/products/count.json`,
      method: 'GET',
    })
  } catch (error) {
    console.log(`ProductsMiddleware.getCount error`, error)
    return ResponseHandler.error(error)
  }
}

const create = async ({shop, accessToken, product}) => {
  try {
    // validate params
    let paramObj = { product }
    let paramKeys = Object.keys(paramObj)
    for (let i = 0, leng = paramKeys.length; i < leng; i++) {
      if (!paramObj[paramKeys[i]]) {
        throw { message: `Field "${paramKeys[i]}" cannot be blank` }
      }
    }

    // validate body params
    const { title } = product
    let bodyObj = { title }
    let bodyKeys = Object.keys(bodyObj)
    for (let i = 0, leng = bodyKeys.length; i < leng; i++) {
      if (!bodyObj[bodyKeys[i]]) {
        throw { message: `Field "${bodyKeys[i]}" cannot be blank` }
      }
    }

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `/admin/api/${API_VERSION}/products.json`,
      method: 'POST',
      data: { product },
    })
  } catch (error) {
    console.log(`ProductsMiddleware.create error`, error)
    return ResponseHandler.error(error)
  }
}

const update = async ({shop, accessToken, product}) => {
  try {
    // validate params
    let paramObj = { product }
    let paramKeys = Object.keys(paramObj)
    for (let i = 0, leng = paramKeys.length; i < leng; i++) {
      if (!paramObj[paramKeys[i]]) {
        throw { message: `Field "${paramKeys[i]}" cannot be blank` }
      }
    }

    // validate body params
    const { id } = product
    let bodyObj = { id }
    let bodyKeys = Object.keys(bodyObj)
    for (let i = 0, leng = bodyKeys.length; i < leng; i++) {
      if (!bodyObj[bodyKeys[i]]) {
        throw { message: `Field "${bodyKeys[i]}" cannot be blank` }
      }
    }

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `/admin/api/${API_VERSION}/products/${id}.json`,
      method: 'PUT',
      data: { product },
    })
  } catch (error) {
    console.log(`ProductsMiddleware.update error`, error)
    return ResponseHandler.error(error)
  }
}

const _delete = async ({shop, accessToken, id}) => {
  try {
    // validate params
    let paramObj = { id }
    let paramKeys = Object.keys(paramObj)
    for (let i = 0, leng = paramKeys.length; i < leng; i++) {
      if (!paramObj[paramKeys[i]]) {
        throw { message: `Field "${paramKeys[i]}" cannot be blank` }
      }
    }

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `/admin/api/${API_VERSION}/products/${id}.json`,
      method: 'DELETE',
    })
  } catch (error) {
    console.log(`ProductsMiddleware._delete error`, error)
    return ResponseHandler.error(error)
  }
}

module.exports.ProductsMiddleware = {
  find,
  findById,
  getCount,
  create,
  update,
  delete: _delete,
}

