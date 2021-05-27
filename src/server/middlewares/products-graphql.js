const { graphqlCaller } = require('../utils/graphqlCaller');
const { ResponseHandler } = require('../utils/responseHandler');
const axios = require('axios');
var jsonlines = require('jsonlines')
var parser = jsonlines.parse({ emitInvalidLines: true })
const LIMIT_PER_REQUEST = 250

const find = async ({
  shop,
  accessToken,
  id,
  limit,
  nextPageInfo,
  previousPageInfo,
  search,
  vendor,
  status
}) => {
  try {
    if (id) {
      const query = `
        {
          product(id: "${id}") {
            id
            title
            description
            featuredImage {
              originalSrc
            }
            productType
            vendor
            options {
              id
            }
            variants (first: 10) {
              edges {
                node {
                  id
                }
              }
            }
            onlineStorePreviewUrl 
          }
        }`

      return await graphqlCaller(shop, accessToken, query)
    } else {
      // set default value
      console.log('vendor :>> ', vendor);
      let _limit = parseInt(limit)
      if (!_limit || _limit > LIMIT_PER_REQUEST || _limit < 1) {
        _limit = 50
      }
      let searchStr = ``
      if (search || vendor || status) {
        searchStr += `, query: "${search ? `title:*${search}*` :''}
                               ${vendor ? ` vendor:${vendor}`:''}
                               ${status ? ` status:${status}` : ''}     
                      "`
      }

      let page_info = ``
      if (nextPageInfo) {
        page_info = `, first: ${_limit}, after: "${nextPageInfo}"`
      }
      if (previousPageInfo) {
        page_info = `, last: ${_limit}, before: "${previousPageInfo}"`
      }
      if (!page_info) {
        page_info = `, first: ${_limit}`
      }

      const query = `
        {
          products(sortKey: TITLE${page_info}${searchStr}) {
            edges {
              node {
                id
                title
                description
                featuredImage {
                  originalSrc
                }
                productType
                vendor
                options {
                  id
                }
                variants (first: 10) {
                  edges {
                    node {
                      id
                    }
                  }
                }
                onlineStorePreviewUrl 
              }
              cursor
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
          } 
        }`

      let res = await graphqlCaller(shop, accessToken, query)
      if (res.success) {
        let data = res.payload.data.products
        let payload = {
          items: data.edges.map((item) => item.node),
          limit: _limit,
          pageInfo: {
            hasNextPage: data.pageInfo.hasNextPage,
            hasPreviousPage: data.pageInfo.hasPreviousPage,
            nextPageInfo: data.pageInfo.hasNextPage ? data.edges[data.edges.length - 1].cursor : '',
            previousPageInfo: data.pageInfo.hasNextPage ? data.edges[0].cursor : '',
          },
        }

        return ResponseHandler.success(payload)
      } else {
        throw res.error
      }
    }
  } catch (error) {
    console.log(`ProductsGraphqlMiddleware.find error`, error)
    return ResponseHandler.error(error)
  }
}
const create = async ({shop, accessToken, data}) => {
  try {
    // validate params
    // let paramObj = { data }
    // let paramKeys = Object.keys(paramObj)
    // for (let i = 0, leng = paramKeys.length; i < leng; i++) {
    //   if (!paramObj[paramKeys[i]]) {
    //     throw { message: `Field "${paramKeys[i]}" cannot be blank` }
    //   }
    // }

    // validate body params
    // const { title } = data
    // let bodyObj = { title }
    // let bodyKeys = Object.keys(bodyObj)
    // for (let i = 0, leng = bodyKeys.length; i < leng; i++) {
    //   if (!bodyObj[bodyKeys[i]]) {
    //     throw { message: `Field "${bodyKeys[i]}" cannot be blank` }
    //   }
    // }
    let _data = '';
    _data += ` {title: "${data.title}", 
                    bodyHtml: "${data.body_html}", 
                    productType: "${data.product_type}", 
                    vendor: "${data.vendor}"}`
    const query = `mutation {
      productCreate(input: ${_data}) {
        product {
          id
        }
      }
    }`
    let res = await graphqlCaller(shop, accessToken, query)
    console.log('res :>> ', res);
    if (res.success) {
        let payload = res.payload.data.productCreate.product;
        return ResponseHandler.success(payload)
      } else {
        throw res.error
      }
  } catch (error) {
    console.log(`ProductsMiddleware.create error`, error)
    return ResponseHandler.error(error)
  }
}
const update = async ({shop, accessToken, data}) => {
  try {
    // validate params
    // let paramObj = { data }
    // let paramKeys = Object.keys(paramObj)
    // for (let i = 0, leng = paramKeys.length; i < leng; i++) {
    //   if (!paramObj[paramKeys[i]]) {
    //     throw { message: `Field "${paramKeys[i]}" cannot be blank` }
    //   }
    // }

    // validate body params
    // const { title } = data
    // let bodyObj = { title }
    // let bodyKeys = Object.keys(bodyObj)
    // for (let i = 0, leng = bodyKeys.length; i < leng; i++) {
    //   if (!bodyObj[bodyKeys[i]]) {
    //     throw { message: `Field "${bodyKeys[i]}" cannot be blank` }
    //   }
    // }
    let _data = '';
    _data += ` {title: "${data.title}",
                id: "${data.id}"
                }`
    const query = `mutation {
      productUpdate(input: ${_data}) {
        product {
          id
          title
        }
        userErrors {
          field
          message
        }
      }
    }`
    let res = await graphqlCaller(shop, accessToken, query)
    if (res.success) {
        let payload = res.payload.data.productUpdate.product;
        return ResponseHandler.success(payload)
      } else {
        throw res.error
      }
  } catch (error) {
    console.log(`ProductsMiddleware.update error`, error)
    return ResponseHandler.error(error)
  }
}
const _delete = async ({shop, accessToken, id}) => {
  try {
    const _id = id || "";
    
    const query = `mutation  {
      productDelete(input: {id: "${_id}"}) {
        deletedProductId
        shop {
          id
        }
        userErrors {
          field
          message
        }
      }
    }`
    console.log('query :>> ', query);
    let res = await graphqlCaller(shop, accessToken, query)
    console.log('res :>> ', res);
    if (res.success) {
        let payload = res.payload.data.productDelete;
        return ResponseHandler.success(payload)
      } else {
        throw res.error
      }
  } catch (error) {
    console.log(`ProductsMiddleware.update error`, error)
    return ResponseHandler.error(error)
  }
}
const getAllProducts = async ({shop, accessToken}) => {
  try {
    // 1. Identify a potential bulk query
    const query = `{
        products(query: "", first: 50) {
          edges {
            cursor
            node {
              id
              title
              status
              productType
              vendor
              featuredImage {
                id
                originalSrc
              }
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }`
    // 2. Write a bulk operation
    const bulkOperation = `
        mutation {
          bulkOperationRunQuery(
            query:"""
            ${query}
            """
          ) {
            bulkOperation {
              id
              status
            }
            userErrors {
              field
              message
            }
          }
        }`
        console.log('bulkOperation :>> ', bulkOperation);
      // call bulk operation
    let bulkOperationRes = await graphqlCaller(shop, accessToken, bulkOperation);
    if (bulkOperationRes.success) {
      console.log('bulkOperationRes.payload.data :>> ', bulkOperationRes.payload.data.bulkOperationRunQuery.userErrors);
      let payload =  bulkOperationRes.payload.data.bulkOperationRunQuery;
      return ResponseHandler.success(payload);
    } else {
      throw bulkOperationRes.error
    }
  } catch (error) {
    console.log(`getAllProducts`, error)
    return ResponseHandler.error(error)
  }
}
const pollGetAllProducts = async ({shop, accessToken, id}) => {
  try {
    // 1. Identify a potential bulk query
    let pollBulk = `
        {
          node(id: "${id}") {
            ... on BulkOperation {
              id
              status
              errorCode
              objectCount
              url
            }
          }
        }
      `
    const res = await graphqlCaller(shop, accessToken,pollBulk);
    if(res.success) {
      let payload = res.payload.data.node;
      return ResponseHandler.success(payload);
    } else {
      throw res.error;
    }
  } catch (error) {
    console.log(`ProductsMiddleware.update error`, error)
    return ResponseHandler.error(error)
  }
}
const getAllData = async ({shop, accessToken, url}) => {
   try {
    const res = await axios.get(url)
    .then((response) => {
      const dataJsonl = response.data;
      const _data = [];
      parser.on('data', function (dataJsonl) {
        _data.push(dataJsonl);
      })
      parser.on('invalid-line', function (err) {
        console.log('Got text:', err.source)
      })
      parser.write(dataJsonl)
      console.log('_data :>> ', _data);
      
    })
    .catch ((error)=> {
      throw error.message
    });
    // if(res.success) {
    //   console.log('res.data :>> ', res.data);
    //   // let payload = res.payload.data.node;
    //   // return ResponseHandler.success(payload);
    // } else {
    //   throw res.error;
    // }
  } catch (error) {
    console.log(`getAllData error`, error)
    return ResponseHandler.error(error)
  }
}
const getAll = async ({shop, accessToken}) => {
  try {
    let items = []
    let hasNextPage = true
    let cursor = ''
    let res = null
    let query = ``

    while(hasNextPage) {
      query = `
        {
          products(first: 250${cursor ? `, after: "${cursor}"` : ``}, reverse: true) {
            edges {
              node{
                id
                title
                handle
              }
              cursor
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
          }
        }
      `
  
      res = await graphqlCaller(shop, accessToken, query)
      if (res.success) {
        hasNextPage = res.payload.data.products.pageInfo.hasNextPage
        cursor = res.payload.data.products.edges[res.payload.data.products.edges.length - 1].cursor
        res.payload.data.products.edges.forEach(item => items.push(item.node))
      } else {
        throw res.error
      }
    }

    return ResponseHandler.success(items)
  } catch (error) {
    console.log(`ProductsMiddleware.error`, error);
    return ResponseHandler.error(error)
  }
}
module.exports.ProductsGraphqlMiddleware = {
  find,
  create,
  update,
  delete:_delete,
  getAll,
  getAllProducts,
  pollGetAllProducts,
  getAllData
}

