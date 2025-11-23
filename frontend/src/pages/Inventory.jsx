import React, { useEffect, useState } from 'react'
import InventoryFilter from '../components/inventory/InventoryFilter'
import InventoryTable from '../components/inventory/InventoryTable'
import InventoryDetails from '../components/inventory/InventoryDetails'
import { useInventoryStore } from '../store/inventoryStore'
import { fetchInventoryFromCsv } from '../services/sheetService'

const CSV_URL = 'https://docs.google.com/spreadsheets/d/1B95pA8eiY-lnM25qVBg8kNObJ9oF_5krfrHfcLTtltQ/export?format=csv&gid=1498946183'

export default function Inventory(){
  const { items, setItems } = useInventoryStore()
  const [selected, setSelected] = useState(null)
  useEffect(()=>{
    fetchInventoryFromCsv(CSV_URL).then(data => setItems(data)).catch(console.error)
  }, [])

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        <InventoryFilter onFilter={(f)=>{/* simple: not wired to store filter in this boilerplate*/}} />
        <InventoryTable data={items} onView={(r)=>setSelected(r)} />
      </div>

      <div>
        <InventoryDetails item={selected} />
      </div>
    </div>
  )
}
