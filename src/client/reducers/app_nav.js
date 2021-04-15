// @flow
import type { Action } from '../types'
import { CHANGE_APP_NAV, SWITCH_APP_NAV, AppNavData } from '../types/app_nav'

const app_nav = (state: AppNavData = {}, action: Action): AppNavData => {
  switch (action.type) {
    case CHANGE_APP_NAV:
      return action.payload
    case SWITCH_APP_NAV:
      return { ...state, selected: action.payload }
    default:
      return state
  }
}

export default app_nav
