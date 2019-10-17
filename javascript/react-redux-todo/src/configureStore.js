import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import todoApp from './reducers/index'

const configureStore = () => {
  let middlewares = [thunk]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
  }
  return createStore(todoApp, applyMiddleware(...middlewares))
}

export default configureStore
