import React, { Component } from 'react'
import './App.css'
import Connection from './Connection'
import Form from './Form'
import List from './List'
import Drawing from './Drawing'
import { deleteDrawing } from './io'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedDrawing: {} }
  }
  selectDrawing(drawing) {
    this.setState({ selectedDrawing: drawing })
  }
  unselectDrawing(id) {
    if (this.state.selectedDrawing.id === id) {
      this.setState({ selectedDrawing: {} })
    }
  }
  deleteDrawing(id) {
    this.unselectDrawing(id)
    deleteDrawing(id)
  }
  render() {
    const drawing = this.state.selectedDrawing.id ? (
      <Drawing
        drawing={this.state.selectedDrawing}
        key={this.state.selectedDrawing.id}
      />
    ) : (
      null
    )
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>drawings</h2>
        </div>
        <Connection />
        <Form />
        <List
          selectDrawing={drawing => this.selectDrawing(drawing)}
          deleteDrawing={id => this.deleteDrawing(id)}
        />
        {drawing}
      </div>
    )
  }
}

export default App
