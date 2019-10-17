const r = require('rethinkdb')
const io = require('socket.io')()

const subscribeToDrawings = (client, conn) => {
  r.table('drawings')
    .changes({ includeInitial: true })
    .run(conn)
    .then(cursor => {
      cursor.each((error, row) => {
        if (row.new_val === null) {
          client.emit('drawingDeleted', row.old_val.id)
        } else {
          client.emit('drawingCreated', row.new_val)
        }
      })
    })
    .then(() => console.log(`subscribeToDrawings from client ${client.client.id}`))
}

const subscribeToLines = (client, conn, drawingId, from) => {
  let query = r.row('drawingId').eq(drawingId)
  if (from) {
    query = query.and(r.row('timestamp').ge(new Date(from)))
  }
  r.table('lines')
    .filter(query)
    .changes({ includeInitial: true, includeTypes: true })
    .run(conn)
    .then(cursor => {
      cursor.each((error, row) => client.emit(`line:${drawingId}`, row.new_val))
    })
    .then(() => console.log(`subscribeToLines for drawing ${drawingId} from client ${client.client.id}`))
}

const createDrawing = (client, conn, name) => {
  r.table('drawings')
    .insert({ name, timestamp: new Date() })
    .run(conn)
    .then(() => console.log(`createDrawing ${name} from client ${client.client.id}`))
}

const deleteDrawing = (client, conn, id) => {
  r.table('lines')
    .filter({ drawingId: id })
    .delete()
    .run(conn)
  r.table('drawings')
    .get(id)
    .delete()
    .run(conn)
    .then(() => console.log(`deleteDrawing ${id} from client ${client.client.id}`))
}

const drawLine = (client, conn, line, callback) => {
  r.table('lines')
    .insert(Object.assign(line, { timestamp: new Date() }))
    .run(conn)
    .then(callback)
    .then(() => console.log(`drawLine for drawing ${line.drawingId} from client ${client.client.id}`))
}

r.connect({ host: 'localhost', port: 28015, db: 'drawings' })
  .then(conn => {
    console.log(`rethinkdb connected to ${conn.db} db`)
    return conn
  })
  .then(conn => {
    io.on('connection', client => {
      client.on('subscribeToDrawings', () => subscribeToDrawings(client, conn))
      client.on('subscribeToLines', ({ drawingId, from }) => subscribeToLines(client, conn, drawingId, from))
      client.on('createDrawing', name => createDrawing(client, conn, name))
      client.on('deleteDrawing', id => deleteDrawing(client, conn, id))
      client.on('drawLine', (line, callback) => drawLine(client, conn, line, callback))
    })
  })

const port = parseInt(process.argv[2], 10) || 8000
io.listen(port)
console.log(`socket.io is listening on port ${port}`)
