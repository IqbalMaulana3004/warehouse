import { Html5QrcodeScanner } from "html5-qrcode";
import * as XLSX from "xlsx";

let scans = [];
let counter = 1; 

let selectedCodeId = ""; // taro global
let desc = "";
let data = "";
let sn = "";
let imei = "";

const selectEl = document.getElementById("device");
selectedCodeId = selectEl.value; // default pas load

  function updateDesc(codeId) {
    switch (codeId) {
      case "1003": return "Interceptor Box";
      case "1018": return "Sunmi P2";
      case "1006": return "Modem";
      case "1030": return "SIM Card Indosat";
      default: return "";
    }
  }

  // EXCEL 
  const saveToGoogleSheet = (text) => { fetch("https://script.google.com/macros/s/AKfyc.../exec", { 
    method: "POST", body: JSON.stringify({ qr: text }), 
  }); };

  const exportExcel = () => { 
    const ws = XLSX.utils.json_to_sheet(scans); const wb = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, "QR Data"); 
    XLSX.writeFile(wb, "warehouse-kalsel.xlsx"); 
  }; 
  document.getElementById("exportExcel").addEventListener("click", exportExcel);

  // Update saat berubah
  selectEl.addEventListener("change", function () {
    selectedCodeId = this.value;
    desc = updateDesc(selectedCodeId);
      // console.log("Change:", desc);
  });
  // desc = updateDesc(selectedCodeId);
  
// ===================================
// SCAN
// ===================================
const radios = document.querySelectorAll('input[name="scanType"]');
let selectedScanner = null;

radios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    selectedScanner = e.target.value;
    console.log("Scanner yang dipilih:", selectedScanner);
  
    if (selectedScanner === "qr") {
      const onScanSuccess = (decodedText) => {
        if (!scans.find((s) => s.Result === decodedText)) {
          const today = new Date().toISOString().split("T")[0]; // hanya tanggal
          
            if (selectedCodeId === null || selectedCodeId === "") {
              alert("Tolong Pilih Device Yang Akan Discan")
            } else{
                console.log("INI KODENYA",selectedCodeId);
                console.log("INI DESKRIPSI KODE",desc);
                console.log(decodedText);
                
                if (selectedCodeId === "1030") {
                  data = decodedText.split("|")
                  sn = data[0]
                  imei = data[1]
                } else{
                  sn = decodedText.match(/Serial Number\s*:\s*(\S+)/);
                  imei = ""
                }

                const newData = {
                  no: counter++,
                  Date: today,
                  CodeId: selectedCodeId, // <- selalu ambil dari variabel global
                  ItemDesc: desc,
                  Qyt: 1,
                  DeviceStatus: "none",
                  Batch: "none",
                  NoBox: "none",
                  Result: sn,
                  IMEICCID: imei,
                  Location: "none",
                  Remarks: "none",
                  Anydesk: "none",
                };

                scans.push(newData);

                // tampilkan ke list
                const li = document.createElement("li");
                li.textContent = `${newData.Result} (${newData.Date}) [${newData.CodeId}] [${newData.ItemDesc}]`;
                document.getElementById("resultList").appendChild(li);

                document.getElementById("date").value = newData.Date;
                document.getElementById("codeId").value = newData.CodeId;
                document.getElementById("itemDesc").value = newData.ItemDesc;
                document.getElementById("qyt").value = newData.Qyt;
                document.getElementById("sn").value = newData.Result;
            }
         
        }
      };

      const scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: 250,
      });
      scanner.render(onScanSuccess);
    }
  });
});
