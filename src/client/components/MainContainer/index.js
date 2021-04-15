// @flow
import React, { Component } from 'react'
import StoreSettingsApi from '../../apis/store_settings'
import Preloader from '../Preloader'
import Privacy from '../Privacy'
import { Toast, TitleBar } from '@shopify/app-bridge-react'
import Home from '../../pages/Home'
import Products from '../../pages/Products'
import { Page } from '@shopify/polaris'
import axios from "axios";
import axios2 from "../../funcs/axios";
import Metafields from '../../pages/Metafields'

const INITIAL_STATE = {
  isReady: false,
  showPrivacy: false,
}

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE))
  }

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.store_setting) !== '{}') {
      return { isReady: true }
    }
    return null
  }

  getStoreSetting = async () => {
    const { actions } = this.props
    let res = await StoreSettingsApi.get()
    if (res.success) {
      actions.changeStoreSetting(res.payload)
    } else {
      actions.showNotification({ show: true, error: true, content: res.error.message })
    }
  }

  componentDidMount() {
    this.getStoreSetting()
  }

  handleAcceptPrivacy = async () => {
    const { actions } = this.props
    let res = await StoreSettingsApi.update({ accepted_date: Date.now() })
    if (res.success) {
      actions.changeStoreSetting(res.payload)
    } else {
      actions.showNotification({ show: true, error: true, content: res.error.message })
    }
  }

  hideNotify = () => {
    const { actions } = this.props
    actions.showNotification({ show: false, error: false, content: '' })
  }

  renderMainContent = () => {
    const { app_nav } = this.props

    switch (app_nav.selected.key) {
      case 'home':
        return <Home {...this.props} />
    
      case 'products':
        return <Products {...this.props} />
    
      case 'metafields':
        return <Metafields {...this.props} />
    
      default:
        break
    }
  }

  render() {
    const { actions, store_setting, notification, app_nav } = this.props
    const { isReady, showPrivacy } = this.state
    // App Toast
    const notifyToast = notification.show 
      ? (
        <Toast
          error={notification.error}
          content={notification.content}
          onDismiss={() => this.hideNotify()}
          duration={2000}
        />
      ) 
      : null

    const SECONDARY_ACTIONS = app_nav.items.map((item) => ({
      content: item.title,
      disabled: item.key === app_nav.selected.key,
      onAction: () => actions.switchAppNav(item),
    }))

    return isReady 
      ? (
        store_setting.accepted_date 
        ? (
          <>
            <TitleBar
              title="Arena Starter WebApp"
              primaryAction={{
                content: 'Terms Of Service',
                disabled: false,
                onAction: () => this.setState({ showPrivacy: true }),
              }}
              secondaryActions={SECONDARY_ACTIONS}
            />

            {showPrivacy 
              ? (
                <Privacy
                  onAction={() => this.setState({ showPrivacy: false })}
                  acceptedDate={store_setting.accepted_date}
                />
              )
              : (
                <Page>
                  {this.renderMainContent()}
                </Page>
              )}

            {notifyToast}
          </>
        ) 
        : (
          <Privacy onAction={() => this.handleAcceptPrivacy()} />
        )
      ) 
      : (
        <Preloader />
      )
  }
}

export default MainContainer
