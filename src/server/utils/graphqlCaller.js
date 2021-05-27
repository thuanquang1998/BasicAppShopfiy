const axios = require('axios');
const { ResponseHandler } = require('./responseHandler');
const API_VERSION = '2020-07';
import {GraphQLClient, gql} from 'graphql-request';

/**
 *
 * @param {String} shop
 * @param {String} accessToken
 * @param {String} query
 * @param {Object} headers
 */
const graphqlCaller = async (shop, accessToken, query, headers = {}) => {
  try {
    return new Promise((resolve, reject) => {
      axios({
        url: `https://${shop}/admin/api/${API_VERSION}/graphql.json`,
        method: 'POST',
        headers: {
          ...headers,
          'X-Shopify-Access-Token': accessToken,
          'Content-type': 'application/json; charset=utf-8',
        },
        data: { query },
      })
        .then((res) => {
          if (res.data.errors) {
            if (
              res.data.errors[0].extensions &&
              res.data.errors[0].extensions.code == 'THROTTLED'
            ) {
              console.log(`\n-----------------------------------------`);
              console.log(`graphqlCaller THROTTLED`);
              let delay = Math.ceil(
                (res.data.extensions.cost.requestedQueryCost - res.data.extensions.cost.throttleStatus.currentlyAvailable) / 50,
              );
              console.log(`graphqlCaller re-call delay ${delay}s`);
              console.log(`\n-----------------------------------------`);
              
              setTimeout(async () => {
                axios({
                  url: `https://${shop}/admin/api/${API_VERSION}/graphql.json`,
                  method: 'POST',
                  headers: {
                    ...headers,
                    'X-Shopify-Access-Token': accessToken,
                    'Content-type': 'application/json; charset=utf-8',
                  },
                  data: { query },
                })
                  .then((_res) => {
                    if (_res.data.errors) {
                      reject(_res.data);
                    } else {
                      resolve(ResponseHandler.success(_res.data));
                    }
                  })
                  .catch((_err) => reject(_err));
              }, delay * 1000);
            } else {
              reject(res.data);
            }
          } else {
            resolve(ResponseHandler.success(res.data));
          }
        })
        .catch((err) => reject(err));
    });
  } catch (error) {
    console.log(`\n-------------------------------------------`);
    console.log(`graphqlCaller error`, error);
    console.log(`query`, query);
    console.log(`-------------------------------------------\n`);
    return ResponseHandler.error(error);
  }
};

module.exports.graphqlCaller = graphqlCaller;
