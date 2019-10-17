import { parse } from 'query-string'
import { connect } from 'socket.io-client'
import { Observable } from 'rxjs/Observable'
import createSync from 'rxsync'
import 'rxjs/add/observable/fromEventPattern'
import 'rxjs/add/operator/bufferTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/withLatestFrom'

const port = parseInt(parse(window.location.search).port, 10) || 8000
const io = connect(`http://localhost:${port}`)

const subscribeToConnection = callback => {
  callback({ status: 'connecting', port })
  io.on('connect', () => callback({ status: 'connected', port }))
  io.on('disconnect', () => callback({ status: 'not connected', port }))
  io.on('connect_error', () => callback({ status: 'connection error', port }))
}

const subscribeToDrawings = (createdCallback, deletedCallback) => {
  io.on('drawingCreated', drawing => createdCallback(drawing))
  io.on('drawingDeleted', drawing => deletedCallback(drawing))
  io.emit('subscribeToDrawings')
}

const subscribeToLines = (drawingId, callback) => {
  const reconnectStream = Observable.fromEventPattern(
    handler => io.on('connect', handler),
    handler => io.off('connect', handler)
  )
  const lineStream = Observable.fromEventPattern(
    handler => io.on(`line:${drawingId}`, handler),
    handler => io.off(`line:${drawingId}`, handler)
  )
  const mostRecentLineStream = lineStream
    .map(line => new Date(line.timestamp).getTime())
    .scan((a, b) => (a > b ? a : b), 0)
  const reconnectSub = reconnectStream
    .withLatestFrom(mostRecentLineStream)
    .subscribe(joined => {
      io.emit('subscribeToLines', { drawingId, from: joined[1] })
    })
  const lineSub = lineStream
    .bufferTime(100)
    .subscribe(lines => callback(lines))
  io.emit('subscribeToLines', { drawingId })
  return { reconnectSub, lineSub }
}

const createDrawing = name => {
  io.emit('createDrawing', name)
}

const deleteDrawing = id => {
  io.emit('deleteDrawing', id)
}

const sync = createSync({
  maxRetries: 10,
  delayBetweenRetries: 1000,
  syncAction: line => new Promise((resolve, reject) => {
    let sent = false
    io.emit('drawLine', line, () => {
      sent = true
      resolve()
    })
    setTimeout(() => {
      if (!sent) { reject() }
    }, 3000)
  })
})

sync.syncedItems.subscribe(line => console.log('line sync success: ', line))
sync.failedItems.subscribe(line => console.error('line sync failure: ', line))

const drawLine = (drawingId, line) => {
  sync.queue({ drawingId, ...line })
}

export {
  subscribeToConnection,
  subscribeToDrawings,
  subscribeToLines,
  createDrawing,
  deleteDrawing,
  drawLine
}
