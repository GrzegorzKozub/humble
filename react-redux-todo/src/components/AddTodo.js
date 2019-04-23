import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTodo } from '../actions/index'

let AddTodo = ({ dispatch }) => {
  let input
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) { return }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input ref={node => { input = node }} />
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

AddTodo.propTypes = {
  dispatch: PropTypes.func.isRequired
}

AddTodo = connect()(AddTodo)
export default AddTodo
