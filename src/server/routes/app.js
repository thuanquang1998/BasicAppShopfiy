const Router = require('koa-router')
const AppApi = new Router()
const bodyParser = require('koa-bodyparser')
const asyncBusboy = require('async-busboy')
const AppStatus = require('../middlewares/app-status')
const fs = require("fs");
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
    const storeInfo = await AppStatus.GetStore(ctx.query.shop)

    if (storeInfo.status === 'error') {
      throw new Error(storeInfo.msg)
    }

    if (storeInfo.store.status !== 'installed' && storeInfo.store.status !== 'running') {
      throw new Error('App still not installed')
    }

    if (!storeInfo.store.token) {
      throw new Error('Invalid app token')
    }

    ctx.state.shop = ctx.query.shop
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

const setCors = async (ctx, next) => {
  const { accessToken } = ctx.state
  if (accessToken) {
    ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set('Access-Control-Allow-Origin', '*')

    return next()
  } else {
    ctx.body = {
      status: 'error',
      msg: 'Invalid app token',
    }
    return
  }
}

AppApi.use(getAppToken)
AppApi.use(setCors)

AppApi.post("/checkcode", async (ctx) => {
	const { shop, accessToken } = ctx.state;
	const { files, fields } = await asyncBusboy(ctx.req);
  const client = await pool.connect();
  const result = await client.query(`select * from Codes`);
  const codes=result.rows;
  const code=fields.code
  console.log(code);
  let dem=0;
  for(let i=0;i<codes.length;i++){
    if(codes[i].code===code && codes[i].status==="NoUse"){
      await client.query(`update Codes set status='Use' where code= upper('${codes[i].code}')`);
      client.release()
      ctx.body={status:'ok'};
      
    }
    else if(codes[i].code===code && codes[i].status==="Use"){
      console.log('used');
      ctx.body={status:'used'};
    }
    else{
      dem+=1   
    }
  }
  if(dem===codes.length)
  {
    console.log('illegal');
    ctx.body={status:'illegal'};
  }
}
)


module.exports = AppApi
