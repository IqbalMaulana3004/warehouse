import { useEffect, useState } from 'react'
import parseCSV from '../utils/csvParser'

export default function useSheetData(csvUrl){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    if(!csvUrl) return
    setLoading(true)
    fetch(csvUrl)
      .then(res => { if(!res.ok) throw new Error('Failed to fetch sheet'); return res.text() })
      .then(text => setData(parseCSV(text)))
      .catch(e => setError(e.message))
      .finally(()=>setLoading(false))
  }, [csvUrl])

  return { data, loading, error }
}
