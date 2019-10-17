import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { subscribeToDrawings } from './io'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = { drawings: [] }
    subscribeToDrawings(
      drawing => {
        this.setState(prevState => {
          return { drawings: prevState.drawings.concat([drawing]) }
        })
      },
      id => {
        this.setState(prevState => {
          return { drawings: prevState.drawings.filter(drawing => drawing.id !== id) }
        })
      }
    )
  }
  render() {
    const drawings = this.state.drawings.map(drawing => (
      <li
        className='List-item'
        key={drawing.id}
        onClick={() => this.props.selectDrawing(drawing)}
      >
        {drawing.name}
        <span
          className='List-delete'
          onClick={evt => {
            evt.stopPropagation()
            this.props.deleteDrawing(drawing.id)
          }}
        >
          x
        </span>
      </li>
    ))
    return (
      <ul className='List'>
        {drawings}
      </ul>
    )
  }
}

List.propTypes = {
  selectDrawing: PropTypes.func.isRequired,
  deleteDrawing: PropTypes.func.isRequired
}

export default List
