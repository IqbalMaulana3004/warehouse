import React from 'react'
export default function InventoryFilter({onFilter}){
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm flex gap-2">
      <input onChange={e=>onFilter({q: e.target.value})} placeholder="Search SKU / Name" className="px-3 py-2 border rounded-md flex-1" />
      <select onChange={e=>onFilter({location: e.target.value})} className="px-3 py-2 border rounded-md">
        <option value="">All locations</option>
        <option value="R1">R1</option>
        <option value="R2">R2</option>
      </select>
      <button className="px-3 py-2 rounded-md border">Reset</button>
    </div>
  )
}
