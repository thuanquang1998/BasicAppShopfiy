// @flow
import { SET_LIST_METAFIELDS, SELECT_METAFIELD, AppNavAction } from '../types/metafields'
// import { ThunkAction } from '../types'

export const setListMetafields = (payload: Array<Object>): MetafieldsAction => {
  return {
    type: SET_LIST_METAFIELDS,
    payload,
  }
}

export const selectMefield = (payload: Object): MetafieldsAction => {
  return {
    type: SELECT_METAFIELD,
    payload,
  }
}
