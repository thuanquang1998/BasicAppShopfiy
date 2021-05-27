// @flow
import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import AppContainer from '../AppContainer'
import '@shopify/polaris/dist/styles.css'

window.SHOPIFY_APP_HOST = 'https://a079eb20d922.ngrok.io'
console.log('window.SHOPIFY_APP_HOST :>> ', window.SHOPIFY_APP_HOST);

class App extends Component {
  render() {
    return <AppContainer />
  }
}

export default hot(module)(App)
