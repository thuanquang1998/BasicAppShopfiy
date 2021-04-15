// @flow
import type { Action } from '../types'
import { SHOW_NOTIFICATION_ACTION, NotificationData } from '../types/notification'

const notification = (state: NotificationData = {}, action: Action): NotificationData => {
  switch (action.type) {
    case SHOW_NOTIFICATION_ACTION:
      return action.payload
    default:
      return state
  }
}

export default notification
