import './App.css'
import Login from './components/login/Login'
import { Route,Routes } from 'react-router-dom'
import Register from './components/register/Register'
import Home from './components/dashboard/Home'
import Profile from "./components/profile/Profile"
function App() {
  

  return (
   <div>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
   </div>
  )
}

export default App
