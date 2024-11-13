import React,{useEffect} from 'react'
import './home.css'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Logout } from '../redux/reducers/auth'
import axios from 'axios'
import Posts from '../posts/Posts'


const Home = () => {
  
  const token = localStorage.getItem('token')
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
      <img src='../../Preview.png'  className='MoltaqaIcon'/>
      <button onClick={handleLogout} className='LogoutButton'>logout</button>
      <Posts />
    </div>
  )
}

export default Home