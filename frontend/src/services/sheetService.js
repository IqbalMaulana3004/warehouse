import parseCSV from '../utils/csvParser'

export async function fetchInventoryFromCsv(url){
  const res = await fetch(url)
  if(!res.ok) throw new Error('fetch failed')
  const txt = await res.text()
  const rows = parseCSV(txt)
  // map to inventory shape
  return rows.map(r => ({
    sku: r['Code'] || r['ID'] || r['No'] || '',
    name: r['Item Description'] || r['Description'] || '',
    qty: Number(r['Stock'] || r['Total'] || 0),
    inbound: Number(r['Inbound'] || 0),
    outbound: Number(r['Outbound'] || 0),
    defect: Number(r['Defect'] || 0),
    transfer: Number(r['Transfer'] || 0),
    location: r['Location'] || ''
  }))
}
