import { Html5QrcodeScanner } from "html5-qrcode";
import * as XLSX from "xlsx";

let scans = [];

// Simpan ke Google Sheet (gunakan URL Web App dari Google Apps Script)
const saveToGoogleSheet = (text) => {
  fetch("https://script.google.com/macros/s/AKfyc.../exec", {
    method: "POST",
    body: JSON.stringify({ qr: text }),
  });
};

// Export ke Excel
const exportExcel = () => {
  const ws = XLSX.utils.json_to_sheet(scans);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "QR Data");
  XLSX.writeFile(wb, "qr-data.xlsx");
};

document.getElementById("exportExcel").addEventListener("click", exportExcel);

// Saat berhasil scan
const onScanSuccess = (decodedText) => {
  if (!scans.find((s) => s.qr === decodedText)) {
    const newData = { qr: decodedText, time: new Date().toLocaleString() };
    scans.push(newData);

    // simpan ke Google Sheet
    saveToGoogleSheet(decodedText);

    // tampilkan di list
    const li = document.createElement("li");
    li.textContent = `${newData.qr} (${newData.time})`;
    document.getElementById("resultList").appendChild(li);
  }
};

// Jalankan scanner
const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
scanner.render(onScanSuccess);
