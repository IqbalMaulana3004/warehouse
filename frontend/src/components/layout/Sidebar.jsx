import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', emoji: '🏠' },
  { to: '/inventory', label: 'Inventory', emoji: '📦' },
  { to: '/receiving', label: 'Receiving', emoji: '📥' },
  { to: '/picking', label: 'Picking', emoji: '🧾' },
  { to: '/shipping', label: 'Shipping', emoji: '🚚' },
  { to: '/reports', label: 'Reports', emoji: '📊' },
]

export default function Sidebar(){
  return (
    <aside className="w-64 bg-white border-r h-screen p-4 hidden md:block">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-primary text-white rounded flex items-center justify-center font-bold">W</div>
        <div>
          <div className="font-semibold">WareHouse Pro</div>
          <div className="text-xs text-gray-500">Inventory & Operations</div>
        </div>
      </div>

      <nav className="space-y-1">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 ${isActive? 'bg-blue-50 text-primary font-medium' : 'text-gray-700'}`} end>
            <div className="text-lg">{l.emoji}</div>
            <div>{l.label}</div>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
