// @flow
import React, { Component } from 'react'
import StoreSettingsApi from '../../apis/store_settings'
import Preloader from '../Preloader'
import Privacy from '../Privacy'
import { Toast, TitleBar } from '@shopify/app-bridge-react'
import Home from '../../pages/Home'
import Products from '../../pages/Products'
import Customers from '../../pages/Customers'
import Forms from '../../pages/Forms'
import DataColumns from '../../pages/DataColumns'
import { Page } from '@shopify/polaris'
import axios from "axios"
import queryString from 'query-string'
import axios2 from "../../funcs/axios"
import Metafields from '../../pages/Metafields'
import AddCustomer from '../../pages/Customers/components/AddCustomer/index.js';
// import MessengerCustomerChat from 'react-messenger-customer-chat';
import { History, Redirect } from '@shopify/app-bridge/actions'
import createApp from '@shopify/app-bridge'
import { Route, Switch } from 'react-router-dom'


const INITIAL_STATE = {
  isReady: false,
  showPrivacy: false,
}

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...JSON.parse(JSON.stringify(INITIAL_STATE)),

    }
    this.adminHistory = History.create(
      createApp({
        apiKey: window.apiKey,
        shopOrigin: window.shopOrigin,
      }),
    )
    

  }

  redirectAdminPage(path: string) {
    this.adminHistory.dispatch(History.Action.REPLACE, path)
  }

  gotoPage(_page: string) {
    console.log('_page :>> ', _page);
    const { actions, history } = this.props

    actions.switchAppNav(_page)

    switch (_page) {
      case 'home':
        history.push(`/home`)
        this.redirectAdminPage(`/home`)
        break

      default:
        history.push(`/${_page}`)
        this.redirectAdminPage(`/${_page}`)
        break
    }
    return
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

  // renderMainContent = () => {
  //   const { app_nav } = this.props
  //   const query = queryString.parse(this.props.location); // Object

  //   console.log('query :>> ', query);

  //   switch (query) {
  //     case 'home':
  //       return <Home {...this.props} gotoPage={(page) => this.gotoPage(page)} />
  //     case 'customers': 
  //       return <Customers {...this.props} gotoPage={(page) => this.gotoPage(page)} />
  //     case 'forms':
  //       return <Forms {...this.props} gotoPage={(page) => this.gotoPage(page)} />
  //     case 'data-columns':
  //       return <DataColumns {...this.props} gotoPage={(page) => this.gotoPage(page)} />
  //     case 'products':
  //       return <Products {...this.props} gotoPage={(page) => this.gotoPage(page)} />
  //     case 'metafields':
  //       return <Metafields {...this.props} gotoPage={(page) => this.gotoPage(page)} />
  //     case 'add-customer': 
  //       return <AddCustomer {...this.props} gotoPage={(page) => this.gotoPage(page)}/>
  //     default:
  //       return <Home {...this.props} gotoPage={(page) => this.gotoPage(page)} />
  //       break
  //   }
  // }

  renderContent = () => {
    const { app_nav, store_settings } = this.props
    return (
      <Switch>
        <Route
          exact
          path="(/|/home)"
          render={(props) => <Home {...this.props} gotoPage={(_page) => this.gotoPage(_page)} />}
        />
        <Route
          path="/customers"
          render={(props) => (
            <Customers {...this.props} gotoPage={(_page) => this.gotoPage(_page)} />
          )}
        />
        <Route
          exact
          path="/forms"
          render={(props) => <Forms {...this.props} gotoPage={(page) => this.gotoPage(page)} />}
        />
        <Route
          exact
          path="/data-columns"
          render={(props) => <DataColumns {...this.props} gotoPage={(page) => this.gotoPage(page)} />}
        />
        <Route
          exact
          path="/products"
          render={(props) => <Products {...this.props} gotoPage={(page) => this.gotoPage(page)} />}
        />
        <Route
          exact
          path="/metafields"
          render={(props) => <Metafields {...this.props} gotoPage={(page) => this.gotoPage(page)} />}
        />
        <Route
          exact
          path="/add-customer"
          render={(props) => <AddCustomer {...this.props} gotoPage={(page) => this.gotoPage(page)}/>}
        />
      </Switch>
    )
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
      // disabled: item.key === app_nav.selected.key,
      // onAction: () => actions.switchAppNav(item),
      disabled: this.props.location.pathname.includes(item.key),
      onAction: () =>    this.gotoPage(item.key) 
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
                  {this.renderContent()}
                  
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
