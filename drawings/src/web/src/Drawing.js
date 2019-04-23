import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Canvas from 'simple-react-canvas'
import { drawLine, subscribeToLines } from './io'

class Drawing extends Component {
  constructor(props) {
    super(props)
    this.state = { lines: [] }
  }
  componentDidMount() {
    this.linesSubs = subscribeToLines(this.props.drawing.id, lines => {
      this.setState(prevState => {
        return { lines: [...prevState.lines, ...lines] }
      })
    })
  }
  componentWillUnmount() {
    this.linesSubs.reconnectSub.unsubscribe()
    this.linesSubs.lineSub.unsubscribe()
  }
  handleDraw(line) {
    drawLine(this.props.drawing.id, line)
  }
  render() {
    if (!this.props.drawing) { return null }
    return (
      <div className='Drawing'>
        <div className="Drawing-name">
          {this.props.drawing.name}
        </div>
        <Canvas
          drawingEnabled={true}
          lines={this.state.lines}
          onDraw={line => this.handleDraw(line)}
        />
      </div>
    )
  }
}

Drawing.propTypes = {
  drawing: PropTypes.object
}

export default Drawing
