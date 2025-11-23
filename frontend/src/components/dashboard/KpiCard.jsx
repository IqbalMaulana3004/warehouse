import React from 'react'
export default function KpiCard({title, value, delta}){
  const positive = delta >= 0
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-2xl font-bold">{value}</div>
        <div className={`text-sm font-medium ${positive? 'text-green-600': 'text-red-600'}`}>{positive? `▲ ${delta}%` : `▼ ${Math.abs(delta)}%`}</div>
      </div>
    </div>
  )
}
