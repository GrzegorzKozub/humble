import { v4 } from 'node-uuid'

const db = {
  todos: [
    { id: v4(), text: 'hey', completed: true },
    { id: v4(), text: 'ho', completed: true },
    { id: v4(), text: 'let’s go', completed: false }
  ]
}

const delay = () => new Promise(resolve => setTimeout(resolve, 500))

export const fetchTodos = (filter) =>
  delay().then(() => {
    if (Math.random() > 0.75) { throw new Error('Random api fail!') }
    switch (filter) {
      case 'active':
        return db.todos.filter(todo => !todo.completed)
      case 'completed':
        return db.todos.filter(todo => todo.completed)
      case 'all':
      default:
        return db.todos
    }
  })

export const addTodo = (text) =>
  delay().then(() => {
    const todo = { id: v4(), text: text, completed: false }
    db.todos.push(todo)
    return todo
  })

export const toggleTodo = (id) =>
  delay().then(() => {
    const todo = db.todos.find(td => td.id === id)
    todo.completed = !todo.completed
    return todo
  })

