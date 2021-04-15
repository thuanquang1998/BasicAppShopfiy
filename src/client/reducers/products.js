// @flow
import type { Action } from '../types'
import { SET_LIST_PRODUCTS, SELECT_PRODUCTS, ProductsData } from '../types/products'

const products = (state: AppNavData = {}, action: Action): ProductsData => {
  switch (action.type) {
    case SET_LIST_PRODUCTS:
      return {
        items: action.payload,
        selected: {},
      }
    case SELECT_PRODUCTS:
      return { ...state, selected: action.payload }
    default:
      return state
  }
}

export default products
