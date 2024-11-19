import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
   
   
    //role id static
   
        return (
        <div>
             test
        </div>
  )

}

export default AdminPanel