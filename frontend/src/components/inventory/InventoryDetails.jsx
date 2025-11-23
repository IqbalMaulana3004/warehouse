import React from 'react'
export default function InventoryDetails({item}){
  if(!item) return <div className="p-4">Select an item to view details.</div>
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold">{item.name} <span className="text-sm text-gray-500">({item.sku})</span></h3>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div>Location: <strong>{item.location || '-'}</strong></div>
        <div>Qty: <strong>{item.qty}</strong></div>
        <div>Inbound: <strong>{item.inbound}</strong></div>
        <div>Outbound: <strong>{item.outbound}</strong></div>
        <div>Defect: <strong>{item.defect}</strong></div>
      </div>
    </div>
  )
}
