import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <nav>Admin Layout</nav>
        <Outlet />
    </div>
  )
}
