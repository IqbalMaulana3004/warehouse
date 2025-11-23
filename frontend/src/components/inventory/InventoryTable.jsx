import React from 'react'
import Table from '../ui/Table'
import Button from '../ui/Button'

export default function InventoryTable({data, onView}){
  const columns = [
    { key: 'sku', title: 'SKU' },
    { key: 'name', title: 'Name' },
    { key: 'location', title: 'Location' },
    { key: 'qty', title: 'Qty', align: 'right' },
    { key: 'inbound', title: 'Inbound', align: 'right' },
    { key: 'outbound', title: 'Outbound', align: 'right' },
    { key: 'defect', title: 'Defect', align: 'right' },
    { key: 'action', title: 'Action', align: 'right', render: (r)=> <Button className="bg-blue-50 text-blue-700 px-3 py-1" onClick={()=>onView(r)}>View</Button> }
  ]
  return <Table columns={columns} data={data} />
}
