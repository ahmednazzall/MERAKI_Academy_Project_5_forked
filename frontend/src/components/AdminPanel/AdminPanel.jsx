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
        setrole(`${res.data.User.role_id}`)
        
       
        

      }).catch((err)=>{
        console.log(err);
        
      })
   
    
      
    }, [role])
   
    //role id static
    if (role == 2 ) {
        
        
        return (
            
            <div>
                test

             </div>
  )
}
}

export default AdminPanel