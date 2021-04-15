// @flow
import { CHANGE_APP_NAV, SWITCH_APP_NAV, AppNavAction } from '../types/app_nav'
// import { ThunkAction } from '../types'

export const changeAppNav = (payload: Object): AppNavAction => {
  return {
    type: CHANGE_APP_NAV,
    payload,
  }
}

export const switchAppNav = (payload: Object): AppNavAction => {
  return {
    type: SWITCH_APP_NAV,
    payload,
  }
}
