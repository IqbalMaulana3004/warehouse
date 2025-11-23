import { useState } from 'react'
export default function useScanner(){
  const [last, setLast] = useState(null)
  const simulate = (code) => setLast(code)
  return { last, simulate }
}
