import React, { useState } from 'react'
import ScanModal from '../scan/ScanModal'

export default function Header(){
  const [open, setOpen] = useState(false)
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Warehouse Dashboard</h2>
        <div className="hidden sm:block">
          <input placeholder="Search SKU, name, barcode..." className="px-3 py-2 border rounded-md w-80" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => setOpen(true)} className="px-3 py-2 rounded-md border">📷 Scan</button>
        <div className="text-sm text-gray-600">Iqbal Maulana</div>
        <img src="/avatar.jpg" alt="avatar" className="h-8 w-8 rounded-full object-cover" />
      </div>

      {open && <ScanModal onClose={() => setOpen(false)} />}
    </header>
  )
}
