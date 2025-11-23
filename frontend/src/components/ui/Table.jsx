import React from 'react'
export default function Table({columns, data}){
  return (
    <div className="overflow-auto">
      <table className="min-w-full divide-y bg-white rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(c => <th key={c.key} className="px-4 py-3 text-left text-xs font-medium text-gray-500">{c.title}</th>)}
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map(c => <td key={c.key} className={`px-4 py-2 text-sm ${c.align==='right' ? 'text-right' : ''}`}>{c.render ? c.render(row) : row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
