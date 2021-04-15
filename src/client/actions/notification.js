// @flow
import { SHOW_NOTIFICATION, NotificationAction } from '../types/notification'
// import { ThunkAction } from '../types'

export const showNotification = (payload: Object): NotificationAction => {
  return {
    type: SHOW_NOTIFICATION,
    payload,
  }
}
