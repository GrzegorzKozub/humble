import React, { Component } from 'react'
import { createDrawing } from './io'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = { name: '' }
  }
  handleSubmit(evt) {
    evt.preventDefault()
    createDrawing(this.state.name)
    this.setState({ name: '' })
  }
  render() {
    return (
      <div className='Form'>
        <form onSubmit={evt => this.handleSubmit(evt)}>
          <input
            type='text'
            className='Form-nameInput'
            placeholder='drawing name'
            value={this.state.name}
            onChange={evt => this.setState({ name: evt.target.value })}
            required
          />
          <button
            type='submit'
            className='Form-submitButton'
          >
            Create
          </button>
        </form>
      </div>
    )
  }
}

export default Form
