const crypto = require('crypto')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const { SHOPIFY_APP_SECRET, SHOPIFY_APP_KEY } = process.env

const verifyToken = async (ctx, next) => {
  const { authorization } = ctx.headers
  let token = authorization.replace('Bearer ', '')
  let [header, payload, signature] = token.split('.')

  //Verifying the auth
  const checkhmac = decodeURI(header + '.' + payload)
  const genHash = crypto
    .createHmac('sha256', SHOPIFY_APP_SECRET)
    .update(checkhmac)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')

  if (genHash === signature) {
    const payload = jwt.verify(token, SHOPIFY_APP_SECRET, {
      algorithms: ['HS256'],
      complete: true,
      clockTolerance: 1000,
    }).payload

    const cTime = Date.now() / 1000

    if (
      payload.exp + 1000 < cTime ||
      payload.nbf - 1000 > cTime ||
      payload.iss.replace('https://', '').split('.')[0] !=
        payload.dest.replace('https://', '').split('.')[0] ||
      payload.aud != SHOPIFY_APP_KEY
    ) {
      ctx.body = {
        status: 'error',
        msg: 'Token Verification Failed',
      }
      return
    }

    ctx.state.shop = payload.dest.replace('https://', '')
    return next()
  } else {
    ctx.body = {
      status: 'error',
      msg: 'Token Verification Failed',
    }
    return
  }
}

module.exports = verifyToken
