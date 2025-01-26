import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isThisWeek, isThisMonth } from 'date-fns'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [alert, setAlert] = useState({ show: false, message: '', type: '' })

  const categories = [
    { id: 'all', name: 'All lists', color: 'blue', count: todos.length },
    { id: 'today', name: 'Today', color: 'indigo', count: todos.filter(todo => isToday(new Date(todo.date))).length },
    { id: 'week', name: 'This week', color: 'purple', count: todos.filter(todo => isThisWeek(new Date(todo.date))).length },
    { id: 'month', name: 'This month', color: 'pink', count: todos.filter(todo => isThisMonth(new Date(todo.date))).length },
    { id: 'work', name: 'Work', color: 'sky', count: todos.filter(todo => todo.category === 'work').length },
    { id: 'home', name: 'Home', color: 'violet', count: todos.filter(todo => todo.category === 'home').length },
    { id: 'fun', name: 'Fun', color: 'orange', count: todos.filter(todo => todo.category === 'fun').length },
  ]

  const filteredTodos = todos.filter(todo => {
    switch(selectedCategory) {
      case 'today':
        return isToday(new Date(todo.date))
      case 'week':
        return isThisWeek(new Date(todo.date))
      case 'month':
        return isThisMonth(new Date(todo.date))
      case 'work':
        return todo.category === 'work'
      case 'home':
        return todo.category === 'home'
      case 'fun':
        return todo.category === 'fun'
      default:
        return true
    }
  })

  const addTodo = (e) => {
    e.preventDefault()
    if (newTodo.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: newTodo, 
        completed: false,
        category: selectedCategory === 'all' ? 'work' : selectedCategory,
        date: new Date().toISOString(),
        important: false
      }])
      setNewTodo('')
    }
  }

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type })
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000)
  }

  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
    showAlert('Tasks saved successfully! 🎉')
  }

  const deleteTodo = (id) => {
    setAlert({
      show: true,
      message: 'Are you sure you want to delete this task?',
      type: 'confirm',
      onConfirm: () => {
        setTodos(todos.filter(todo => todo.id !== id))
        showAlert('Task deleted successfully')
      }
    })
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Alert Modal */}
      <AnimatePresence>
        {alert.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 w-full max-w-[320px] sm:max-w-md"
            >
              <div className="text-center">
                {alert.type === 'confirm' ? (
                  <>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-yellow-100 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">⚠️</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Confirm Action</h3>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">✅</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Success</h3>
                  </>
                )}
                
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{alert.message}</p>
                
                <div className="flex space-x-3 justify-center">
                  {alert.type === 'confirm' ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          alert.onConfirm?.()
                          setAlert({ show: false, message: '', type: '' })
                        }}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setAlert({ show: false, message: '', type: '' })}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAlert({ show: false, message: '', type: '' })}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Okay
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar - Now collapsible on mobile */}
      <div className="w-full md:w-80 bg-white shadow-lg overflow-auto">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center justify-between p-2 sm:p-3 rounded-lg transition-colors ${
                  selectedCategory === category.id 
                    ? `bg-${category.color}-100 text-${category.color}-900`
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-${category.color}-500`} />
                  <span className="text-sm sm:text-base font-medium">{category.name}</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">{category.count} items</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <h1 className="text-xl sm:text-2xl font-bold">
              Today: {format(new Date(), 'd MMMM')}
            </h1>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveTodos}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Save All
              </motion.button>
            </div>
          </div>

          {/* Todo Form */}
          <form onSubmit={addTodo} className="mb-6 sm:mb-8">
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-2">
              <div className="flex items-center space-x-3 bg-gray-50 group-hover:bg-white rounded-xl p-2 transition-all duration-300">
                <span className="pl-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                  ✏️
                </span>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-base sm:text-lg placeholder-gray-400 text-gray-600"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm hover:shadow transition-all duration-200"
                >
                  Add Task
                </motion.button>
              </div>
            </div>
          </form>

          {/* Todo List */}
          <ul className="space-y-2 sm:space-y-3">
            <AnimatePresence>
              {filteredTodos.map((todo) => (
                <motion.li
                  key={todo.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-lg shadow"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => 
                      setTodos(todos.map(t => 
                        t.id === todo.id ? {...t, completed: !t.completed} : t
                      ))
                    }
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 text-blue-600"
                  />
                  <span className={`text-sm sm:text-base ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                    {todo.text}
                  </span>
                  <div className="flex-1" />
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setTodos(todos.map(t => 
                        t.id === todo.id ? {...t, important: !t.important} : t
                      ))}
                      className={`text-sm sm:text-base px-2 sm:px-3 py-1 rounded ${
                        todo.important ? 'text-red-500' : 'text-gray-400'
                      }`}
                    >
                      !
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteTodo(todo.id)}
                      className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TodoList
