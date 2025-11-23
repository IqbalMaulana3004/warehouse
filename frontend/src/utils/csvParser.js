/* Very small CSV parser; for robust parsing use PapaParse */
export default function parseCSV(text){
  if(!text) return []
  const lines = text.trim().split(/\r?\n/)
  const headers = lines[0].split(',').map(h=>h.trim())
  const rows = lines.slice(1).map(line => {
    const cols = line.split(',')
    const obj = {}
    headers.forEach((h,i)=> obj[h]= (cols[i]||'').trim())
    return obj
  })
  return rows
}
