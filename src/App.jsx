import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from "react-hot-toast";
import Dashboard from './pages/dashboard/dashboard'
import Protected from './guards/protected'
import LoginForm from './pages/auth/LoginForm'
import RegisterForm from './pages/auth/RegisterForm'
import Layout from './components/Layout'
import Income from './pages/incomes/Income'

function App() {

  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route path='/' element={<Protected />} >
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/income' element={<Income />} />
          </Route>
        </Route>

        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
