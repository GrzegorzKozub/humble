import React, { Component } from 'react'
import { subscribeToConnection } from './io'

class Connection extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    subscribeToConnection(conn => this.setState(conn))
  }
  render() {
    return (
      <div className={'Connection ' + (this.state.status === 'connection error' ? 'Connection-error' : '')}>
        {this.state.status} to port {this.state.port}
      </div>
    )
  }
}

export default Connection
