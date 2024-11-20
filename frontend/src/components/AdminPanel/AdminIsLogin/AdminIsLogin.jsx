import React, { useEffect } from 'react'
import './islogin.css'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from 'antd'
import axios from 'axios'
import { getAllUsers } from '../../redux/reducers/sliceUser'
const AdminIsLogin = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    const users = useSelector((users)=>{
        return users.users.users
    })

    const isLogin = users.filter((elem)=>{
        return elem.is_login == true
    })
    // console.log(users);
    
    useEffect(() => {
        axios.get('http://localhost:5000/users/all',{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }).then((res)=>{
            dispatch(getAllUsers(res.data.Users))
            
            
        }).catch((err)=>{
            console.log(err);
            
        })
       
    }, [users]);
  return (
    <div>
        {isLogin?.map((user)=>{
            return (
                <div key={user.user_id}>
                    <h2>{user.user_name}</h2>
                    <Avatar src={user.profile_image}/>
                </div>
            )
        })}
    </div>
  )
}

export default AdminIsLogin