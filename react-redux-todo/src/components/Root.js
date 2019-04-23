import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import App from './App'

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path='/:filter?' component={App} />
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
