// @flow
export const SHOW_NOTIFICATION_ACTION: string = 'SHOW_NOTIFICATION_ACTION'

export type NotificationData = {
  show: boolean,
  error: boolean,
  content: string,
}

export type NotificationState = {
  +notification: NotificationData,
}

export type NotificationAction = { type: SHOW_NOTIFICATION_ACTION, +payload: Object } // | Another Action
