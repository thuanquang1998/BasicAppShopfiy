// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { NotificationState, NotificationAction } from './notification'
import type { StoreSettingState, StoreSettingAction } from './store_setting'
import type { AppNavState, AppNavAction } from './app_nav'
import type { MetafieldsState, MetafieldsAction } from './metafields'
import type { ProductsState, ProductsAction } from './products'


export type ReduxInitAction = { type: '@@INIT' }

// APP STATE TYPE
export type State = NotificationState & StoreSettingState & AppNavState & MetafieldsState & ProductsState// & Another State

// APP ACTION TYPE
export type Action = NotificationAction & StoreSettingAction & AppNavAction & MetafieldsAction & ProductsAction// | Another Action

// APP STORE
export type Store = ReduxStore<State, Action>

export type Dispatch = ReduxDispatch<Action>

export type GetState = () => State

// APP THUNK ACTION TYPE
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
