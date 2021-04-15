// @flow
import type { Action } from '../types'
import { SET_LIST_METAFIELDS, SELECT_METAFIELD, MetafieldsData } from '../types/metafields'

const metafields = (state: AppNavData = {}, action: Action): MetafieldsData => {
  switch (action.type) {
    case SET_LIST_METAFIELDS:
      return {
        items: action.payload,
        selected: {},
      }
    case SELECT_METAFIELD:
      return { ...state, selected: action.payload }
    default:
      return state
  }
}

export default metafields
