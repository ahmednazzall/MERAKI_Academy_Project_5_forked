import React,{useEffect} from 'react'
import './home.css'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Logout } from '../redux/reducers/auth'

const Home = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout=()=>{
    dispatch(Logout())
  }
  const isLoggedIn=useSelector(auth=>{
    return auth.auth.isLoggedIn
  })

useEffect(() => {
  if(!isLoggedIn){
    navigate("/")
  }
}, [isLoggedIn])


  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Home