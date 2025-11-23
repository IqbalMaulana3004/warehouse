import React from 'react'
import KpiCard from '../components/dashboard/KpiCard'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import { useInventoryStore } from '../store/inventoryStore'

export default function Dashboard(){
  const { items } = useInventoryStore()

  const kpis = [
    { title: 'Total SKU', value: items.length, delta: 1.2 },
    { title: 'On-hand Qty', value: items.reduce((s,i)=>s+(i.qty||0),0), delta: -0.8 },
    { title: 'Incoming Today', value: items.filter(i=>i.inbound>0).length, delta: 10 },
    { title: 'Outgoing Today', value: items.filter(i=>i.outbound>0).length, delta: 5 },
    { title: 'Low Stock', value: items.filter(i=> (i.qty||0) < 5).length, delta: -2 }
  ]

  const events = [
    '📥 Received PO#1023 — 120 units (2 hours ago)',
    '🧾 Picklist #553 assigned to Asep (3 hours ago)',
    '⚠️ Low stock: SKU-1005 (qty 3) (yesterday)'
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {kpis.map((k,i)=> <KpiCard key={k.title} {...k} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold">Overview</h3>
            <p className="text-sm text-gray-500 mt-2">Quick glance on stock and recent activity.</p>
            {/* placeholder for charts */}
            <div className="mt-4 h-40 bg-gray-50 rounded flex items-center justify-center text-gray-400">Charts placeholder</div>
          </div>
        </div>

        <div>
          <ActivityFeed events={events} />
        </div>
      </div>
    </div>
  )
}
