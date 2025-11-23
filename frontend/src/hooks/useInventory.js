import { useState, useMemo } from 'react'

export default function useInventory(initial=[]){
  const [items, setItems] = useState(initial)
  const [filter, setFilter] = useState({})

  const filtered = useMemo(()=>{
    let r = items
    if(filter.q) r = r.filter(i => (i.sku + ' ' + i.name).toLowerCase().includes(filter.q.toLowerCase()))
    if(filter.location) r = r.filter(i => i.location === filter.location)
    return r
  }, [items, filter])

  return { items: filtered, raw: items, setItems, setFilter }
}
