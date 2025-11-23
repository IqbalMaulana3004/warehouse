import React from 'react'
export default function Modal({children, onClose}){
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-4">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
