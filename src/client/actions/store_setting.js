// @flow
import { CHANGE_STORE_SETTING, StoreSettingAction } from '../types/store_setting'
// import { ThunkAction } from '../types'

export const changeStoreSetting = (payload: Object): StoreSettingAction => {
  return {
    type: CHANGE_STORE_SETTING,
    payload,
  }
}
