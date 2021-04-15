// @flow
export const SET_LIST_METAFIELDS: string = 'SET_LIST_METAFIELDS'
export const SELECT_METAFIELD: string = 'SELECT_METAFIELD'

export type MetafieldsData = {
  items: Array<object>,
  selected: object,
}

export type MetafieldsState = {
  +metafields: MetafieldsData,
}

export type MetafieldsAction =
  | { type: SET_LIST_METAFIELDS, +payload: Array<Object> }
  | { type: SELECT_METAFIELD, +payload: Object } // | Another Action
