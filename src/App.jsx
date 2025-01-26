import { ThemeProvider } from './contexts/ThemeContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Pomodoro from './pages/Pomodoro'
import About from './pages/About'
import Contact from './pages/Contact'
import TodoList from './components/TodoList'
import Footer from './pages/Footer'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen dark:bg-gray-900 bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/Pomodoro" element={<Pomodoro />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
