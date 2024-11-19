import React from 'react'
import './dashboard.css'
import { Outlet } from 'react-router-dom'
const AdminDashBoard = () => {
  return (
    <div>AdminDashBoard

        <Outlet />
    </div>
  )
}

export default AdminDashBoard