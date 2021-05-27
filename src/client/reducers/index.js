// @flow
import { combineReducers } from 'redux'
import notification from './notification'
import store_setting from './store_setting'
import app_nav from './app_nav'
import metafields from './metafields'
import products from './products'

export default combineReducers({
  notification,
  store_setting,
  app_nav,
  metafields,
  products,
  //another_state_prop,
})
