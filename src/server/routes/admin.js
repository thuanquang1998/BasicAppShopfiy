const Router = require('koa-router')
const AdminApi = new Router()
const bodyParser = require('koa-bodyparser')
const asyncBusboy = require('async-busboy')


const AppStatus = require('../middlewares/app-status')
const verifyToken = require('./verify-token')
const { StoreSettingsMiddleware } = require('../middlewares/store_settings')
const { ProductsMiddleware } = require('../middlewares/products')
const { ProductsGraphqlMiddleware } = require('../middlewares/products-graphql')

const { Pool } = require('pg');
const {
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PWD,
  POSTGRES_PORT, 
} = process.env;
const conObj = {
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PWD, 
  port: POSTGRES_PORT
};

const pool = new Pool(conObj);
const getAppToken = async (ctx, next) => {
  try {
    const storeInfo = await AppStatus.GetStore(ctx.state.shop)
    if (storeInfo.status === 'error') {
      throw new Error(storeInfo.msg)
    }

    if (storeInfo.store.status !== 'installed' && storeInfo.store.status !== 'running') {
      throw new Error('App still not installed')
    }

    if (!storeInfo.store.token) {
      throw new Error('Invalid app token')
    }

    ctx.state.accessToken = storeInfo.store.token
    return next()
  } catch (err) {
    ctx.body = {
      status: 'error',
      msg: err.message,
    }
    return
  }
}

AdminApi.use(verifyToken)
AdminApi.use(getAppToken)

/**
 * ================================================
 * STORE SETTINGS
 */
AdminApi.get('/store-settings', async (ctx) => {
  console.log("store-settings");
  const { shop, accessToken } = ctx.state
  ctx.body = await StoreSettingsMiddleware.find({ shop, accessToken })
})

AdminApi.put('/store-settings', bodyParser(), async (ctx) => {
  const { shop, accessToken } = ctx.state
  const { accepted_date } = ctx.request.body
  ctx.body = await StoreSettingsMiddleware.update({ shop, accessToken, accepted_date })
})
/**
 * ================================================
 */

/**
 * ================================================
 * PRODUCTS
 */
AdminApi.get('/products', async (ctx) => {
  const { shop, accessToken } = ctx.state
  const { limit, pageInfo, search, status, vendor } = ctx.request.query
  ctx.body = await ProductsMiddleware.find({ shop, accessToken, limit, pageInfo, search, status, vendor })
})

AdminApi.get('/products/:id', async (ctx) => {
  const { shop, accessToken } = ctx.state
  const { id } = ctx.params
  ctx.body = await ProductsMiddleware.findById({ shop, accessToken, id })
})

AdminApi.get('/products-count', async (ctx) => {
  const { shop, accessToken } = ctx.state
  ctx.body = await ProductsMiddleware.getCount({ shop, accessToken })
})

AdminApi.post('/products', bodyParser(), async (ctx) => {
  const { shop, accessToken } = ctx.state
  const { product } = ctx.request.body
  ctx.body = await ProductsMiddleware.create({ shop, accessToken, product })
})

AdminApi.put('/products', bodyParser(), async (ctx) => {
  const { shop, accessToken } = ctx.state
  const { product } = ctx.request.body
  ctx.body = await ProductsMiddleware.update({ shop, accessToken, product })
})

AdminApi.delete('/products', bodyParser(), async (ctx) => {
  const { shop, accessToken } = ctx.state
  const { id } = ctx.request.body
  ctx.body = await ProductsMiddleware.delete({ shop, accessToken, id })
})
/**
 * ================================================
 */

/**
 * ================================================
 * PRODUCTS
 */
AdminApi.get('/graphql-products', async (ctx) => {
  const { shop, accessToken } = ctx.state
  const { id, limit, nextPageInfo, previousPageInfo, search, vendor, status } = ctx.request.query
  ctx.body = await ProductsGraphqlMiddleware.find({ 
    shop, 
    accessToken, 
    id, 
    limit, 
    nextPageInfo, 
    previousPageInfo, 
    search, 
    vendor,
    status
  })
})
AdminApi.post('/graphql-products', bodyParser(), async (ctx) => {
  const { shop, accessToken } = ctx.state
  const { data } = ctx.request.body
  ctx.body = await ProductsGraphqlMiddleware.create({ shop, accessToken, data })
})
AdminApi.put('/graphql-products', bodyParser(), async (ctx) => {
  const { shop, accessToken } = ctx.state
  const { data } = ctx.request.body
  ctx.body = await ProductsGraphqlMiddleware.update({ shop, accessToken, data })
})
AdminApi.delete('/graphql-products', bodyParser(), async (ctx) => {
  const { shop, accessToken } = ctx.state
  const { id } = ctx.request.body
  ctx.body = await ProductsGraphqlMiddleware.delete({ shop, accessToken, id })
})
AdminApi.get('/graphql-products-bulk', async (ctx) => {
  const { shop, accessToken } = ctx.state
  ctx.body = await ProductsGraphqlMiddleware.getAllProducts({shop, accessToken})
})
AdminApi.post('/graphql-products-bulk', bodyParser(), async (ctx) => {
  const { shop, accessToken } = ctx.state
  const { id } = ctx.request.body
  ctx.body = await ProductsGraphqlMiddleware.pollGetAllProducts({ shop, accessToken, id })
})
AdminApi.post('/graphql-products-getAll', bodyParser(), async (ctx) => {
  const { shop, accessToken } = ctx.state
  const { url } = ctx.request.body
  ctx.body = await ProductsGraphqlMiddleware.getAllData({ shop, accessToken, url })
})
/**
 * ================================================
 */

 AdminApi.get(
  `/get-codes`,
  async(ctx)=>{
    const { shop, accessToken } = ctx.state;
    const client = await pool.connect();
    const result = await client.query(`select * from Codes`);
    client.release();
    ctx.body=result;
  }
)

AdminApi.delete(
  `/delete-code/:code`,
  async (ctx) => {
      const { shop, accessToken } = ctx.state;
      const bodyData = ctx.params.code;
      console.log('code', bodyData);
      const client = await pool.connect();
      await client.query(`delete from Codes where code= upper('${bodyData}')`);
      client.release()
      ctx.body = 'ok'; 
  }
)
module.exports = AdminApi
