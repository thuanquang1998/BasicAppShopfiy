// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { AppProvider } from '@shopify/polaris'
import { Provider as ProviderBridge } from '@shopify/app-bridge-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './components/App'
// import { createLogger } from 'redux-logger'

import createApp from '@shopify/app-bridge'

const middlewares = [
  thunk,
  // createLogger(),
]

const root = document.getElementById('root')

import { initState } from './initState'

const appStore = createStore(rootReducer, initState, applyMiddleware(...middlewares))

if (root !== null) {
  window.app = createApp({
    apiKey: window.apiKey,
    shopOrigin: window.shopOrigin,
  })

  ReactDOM.render(
    <Provider store={appStore}>
      <AppProvider>
        <ProviderBridge
          config={{
            shopOrigin: window.shopOrigin,
            apiKey: window.apiKey,
            forceRedirect: true,
          }}
        >
          <Router>
            <App />
          </Router>
        </ProviderBridge>
      </AppProvider>
    </Provider>,

    root
  )
}
