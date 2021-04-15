// @flow
import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import AppContainer from '../AppContainer'
import '@shopify/polaris/dist/styles.css'

window.SHOPIFY_APP_HOST = 'https://c117bb0d7c24.ngrok.io'

class App extends Component {
  render() {
    return <AppContainer />
  }
}

export default hot(module)(App)
