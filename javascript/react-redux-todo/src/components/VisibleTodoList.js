import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers'
import TodoList from './TodoList'
import FetchError from './FetchError'

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData()
  }
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData()
    }
  }
  fetchData() {
    const { filter, fetchTodos } = this.props
    fetchTodos(filter)
  }
  render() {
    const { toggleTodo, todos, isFetching, errorMessage } = this.props
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    if (errorMessage && !todos.length) {
      return <FetchError
        message={errorMessage}
        onRetry={() => this.fetchData()}
      />
    }
    return <TodoList
      todos={todos}
      onTodoClick={toggleTodo}
    />
  }
}

VisibleTodoList.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    filter
  }
}

// eslint-disable-next-line no-class-assign
VisibleTodoList = withRouter(connect(mapStateToProps, actions)(VisibleTodoList))

export default VisibleTodoList
