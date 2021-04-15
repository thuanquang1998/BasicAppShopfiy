// @flow
import * as NotificationAction from './notification'
import * as StoreSettingAction from './store_setting'
import * as AppNavAction from './app_nav'
import * as MetafieldsAction from './metafields'
import * as ProductsAction from './products'
const Actions = {
  ...NotificationAction,
  ...StoreSettingAction,
  ...AppNavAction,
  ...MetafieldsAction,
  ...ProductsAction,
  //...AnotherAction,
}

export default Actions
