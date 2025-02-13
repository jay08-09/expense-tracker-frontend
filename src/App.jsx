import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Dashboard from './pages/dashboard/dashboard'
import Protected from './guards/protected'
import Login from './pages/auth/login'

function App() {

  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Protected />} >
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
