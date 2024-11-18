import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const AdminPanel = () => {
    const [role , setrole] = useState([])
    const userId = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
    useEffect(() => {
      axios.get(`http://localhost:5000/users/${userId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }).then((res)=>{
        setrole(res.data.User.name)
        
       
        

      }).catch((err)=>{
        console.log(err);
        
      })
   
    
      
    }, [])
    if (role === 'Admin') {
        
        return (
            
            <div>
                test

    </div>
  )
}
}

export default AdminPanel