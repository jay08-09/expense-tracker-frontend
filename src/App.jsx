import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Dashboard from './pages/dashboard/dashboard'
import Protected from './guards/protected'
import LoginForm from './pages/auth/LoginForm'
import RegisterForm from './pages/auth/RegisterForm'
import Layout from './components/Layout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Protected />} >
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Route>

        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
