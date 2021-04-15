// @flow
export const CHANGE_APP_NAV: string = 'CHANGE_APP_NAV'
export const SWITCH_APP_NAV: string = 'SWITCH_APP_NAV'

export type AppNavData = {
  items: Array<object>,
  selected: object,
}

export type AppNavState = {
  +app_nav: AppNavData,
}

export type AppNavAction =
  | { type: CHANGE_APP_NAV, +payload: Object }
  | { type: SWITCH_APP_NAV, +payload: Object } // | Another Action
