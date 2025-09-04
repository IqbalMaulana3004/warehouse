const express = require('express');
const app = express();
const cors = require('cors');
const XLSX = require('xlsx');
const fs = require('fs');
const port = 3000;

app.use(cors());
app.use(express.json());

const FILE_PATH = './database.xlsx';

// Fungsi simpan ke sheet spesifik
function saveToExcel(newData, sheetName) {
  let workbook;
  let worksheet;
  let existingData = [];

  if (fs.existsSync(FILE_PATH)) {
    // Baca file
    workbook = XLSX.readFile(FILE_PATH);

    // Kalau sheet ada → ambil, kalau belum ada → bikin baru
    if (workbook.Sheets[sheetName]) {
      worksheet = workbook.Sheets[sheetName];
      existingData = XLSX.utils.sheet_to_json(worksheet);
    }
  } else {
    // Kalau file belum ada sama sekali → bikin workbook baru
    workbook = XLSX.utils.book_new();
  }

  // Tambah data baru
  existingData.push(newData);

  // Buat worksheet baru dari data gabungan
  worksheet = XLSX.utils.json_to_sheet(existingData);

  // Simpan worksheet ke workbook
//   XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
workbook.Sheets1rgftradsz[sheetName] = worksheet;

  // Tulis ke file
  XLSX.writeFile(workbook, FILE_PATH);
}

// Endpoint simpan ke sheet inbound
app.post('/api/inbound', (req, res) => {
  try {
    saveToExcel(req.body, 'inbound');
    res.json({ status: 'success', message: 'Data tersimpan di sheet inbound' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Gagal simpan inbound' });
  }
});

// Endpoint simpan ke sheet outbound
app.post('/api/outbound', (req, res) => {
  try {
    saveToExcel(req.body, 'outbound');
    res.json({ status: 'success', message: 'Data tersimpan di sheet outbound' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Gagal simpan outbound' });
  }
});

// Endpoint simpan ke sheet diffect
app.post('/api/diffect', (req, res) => {
  try {
    saveToExcel(req.body, 'diffect');
    res.json({ status: 'success', message: 'Data tersimpan di sheet diffect' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Gagal simpan diffect' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
