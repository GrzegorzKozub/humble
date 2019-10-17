import { combineReducers } from 'redux'
import createList, * as fromCreateList from './createList'
import byId, * as fromById from './byId'

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

const todos = combineReducers({ byId, listByFilter })
export default todos

export const getVisibleTodos = (state, filter) => {
  const ids = fromCreateList.getIds(state.listByFilter[filter])
  return ids.map(id => fromById.getTodo(state.byId, id))
}

export const getIsFetching = (state, filter) =>
  fromCreateList.getIsFetching(state.listByFilter[filter])

export const getErrorMessage = (state, filter) =>
  fromCreateList.getErrorMessage(state.listByFilter[filter])
