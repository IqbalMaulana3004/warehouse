import React from 'react'
import Modal from '../ui/Modal'

export default function ScanModal({onClose}){
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="text-sm text-gray-500 mb-3">Camera preview (mock)</div>
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Camera feed]</div>
        <div className="mt-3 flex gap-2 justify-center">
          <button className="px-3 py-2 rounded-md bg-primary text-white">Scan now</button>
        </div>
      </div>
    </Modal>
  )
}
