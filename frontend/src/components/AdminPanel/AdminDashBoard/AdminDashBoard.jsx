import React, { useEffect,useState } from 'react'
import './dashboard.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAllUsers } from '../../redux/reducers/sliceUser'
import { setPosts } from '../../redux/reducers/slicePosts'
import AdminSide from './AdminSide'

const AdminDashBoard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const [admin, setAdmin] = useState(null)
    const users = useSelector((users)=>{
        return users.users.users
    })
    const posts = useSelector((posts)=>{
        return posts.posts.posts
    })
    const isLogin = users.filter((elem)=>{
        return elem?.is_login == true
    })

    const isLoggedIn = useSelector((auth) => {
        return auth.auth.isLoggedIn;
      });
const AdminProfile = users.find((user=>{return user?.role_id===1}))
    
      useEffect(() => {
        if (!isLoggedIn) {
          navigate("/");
        }
        
      }, [isLoggedIn]);
    
  return (
   
         <div className="parent">
     
     <div className="AdNav">
       {" "}
       <img src="../../Preview.png" className="MoltaqaIcon" />
       <h3>Hi {AdminProfile?.user_name}</h3> 
      
     </div>
     <div className="org">
       <div className="sidebar">
       <AdminSide />
       </div>
       <div className="content">
         <Outlet />
       </div>
       

       {/* <div className="messages">messages here</div> */}
     </div>

     <br></br>

   </div>)
   
   
  
}

export default AdminDashBoard