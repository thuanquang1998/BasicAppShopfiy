// @flow
export const SET_LIST_PRODUCTS: string = 'SET_LIST_PRODUCTS'
export const SELECT_PRODUCTS: string = 'SELECT_PRODUCTS'

export type ProductsData = {
  items: Array<object>,
  selected: object,
}

export type ProductsState = {
  +products: ProductsData,
}

export type ProductsAction =
  | { type: SET_LIST_PRODUCTS, +payload: Array<Object> }
  | { type: SELECT_PRODUCTS, +payload: Object } // | Another Action
