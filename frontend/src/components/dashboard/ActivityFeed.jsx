import React from 'react'
export default function ActivityFeed({events=[]}){
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h4 className="font-semibold mb-2">Activity Feed</h4>
      <ul className="text-sm text-gray-600 space-y-2">
        {events.map((e,i) => <li key={i}>{e}</li>)}
      </ul>
    </div>
  )
}
