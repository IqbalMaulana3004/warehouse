import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Dashboard from '../pages/Dashboard'
import Inventory from '../pages/Inventory'
import Receiving from '../pages/Receiving'
import Picking from '../pages/Picking'
import Shipping from '../pages/Shipping'
import Reports from '../pages/Reports'

export default function Router(){
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Dashboard/>} />
        <Route path="inventory" element={<Inventory/>} />
        <Route path="receiving" element={<Receiving/>} />
        <Route path="picking" element={<Picking/>} />
        <Route path="shipping" element={<Shipping/>} />
        <Route path="reports" element={<Reports/>} />
      </Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}
