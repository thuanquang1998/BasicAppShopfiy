// @flow
import type { Action } from '../types'
import { CHANGE_STORE_SETTING, StoreSettingData } from '../types/store_setting'

const store_setting = (state: StoreSettingData = {}, action: Action): StoreSettingData => {
  switch (action.type) {
    case CHANGE_STORE_SETTING:
      return action.payload
    default:
      return state
  }
}

export default store_setting
