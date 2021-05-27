// @flow
import apiCaller from '../utils/apiCaller'

const get = async (): Object => {
  return await apiCaller(`/admin/store-settings`)
}

const update = async ({ accepted_date }: Object): Object => {
  return await apiCaller(`/admin/store-settings`, 'PUT', { accepted_date })
}

const StoreSettingsApi = {
  get,
  update,
}

export default StoreSettingsApi
