import React,{useEffect} from 'react'
import './home.css'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate,Outlet } from 'react-router-dom'
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
      <br></br>
      <img src='../../Preview.png'  className='MoltaqaIcon'/>
      <br></br>
      <Link to={"/home/profile"}>profile</Link>
      <br></br>
      <Link to={"/home/"}>Feeds</Link>
      
      <br></br>
     
      <button onClick={handleLogout} className='LogoutButton'>logout</button>
      <br></br>
     
      {/* <Posts /> */}
      <Outlet/>
    </div>
  )
}

export default Home