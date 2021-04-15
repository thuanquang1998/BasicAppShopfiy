// @flow
export const CHANGE_STORE_SETTING: string = 'CHANGE_STORE_SETTING'

export type StoreSettingData = {}

export type StoreSettingState = {
  +store_setting: StoreSettingData,
}

export type StoreSettingAction = { type: CHANGE_STORE_SETTING, +payload: Object } // | Another Action
