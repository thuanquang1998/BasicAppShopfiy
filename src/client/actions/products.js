// @flow
import { SET_LIST_PRODUCTS, SELECT_PRODUCTS, AppNavAction } from '../types/products'
// import { ThunkAction } from '../types'

export const setListProducts = (payload: Array<Object>): ProductsAction => {
  return {
    type: SET_LIST_PRODUCTS,
    payload,
  }
}

export const selectProducts = (payload: Object): ProductsAction => {
  return {
    type: SELECT_PRODUCTS,
    payload,
  }
}
