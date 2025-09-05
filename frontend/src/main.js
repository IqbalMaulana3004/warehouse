import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import * as XLSX from "xlsx";

let scans = [];
let counter = 1; 

let selectedCodeId = ""; // taro global
let desc = "";
let data = "";
let sn = "";
let imei = "";
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeModal");
const closeBtn2 = document.getElementById("closeModal2");
const location = document.getElementById("location-info")

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});
closeBtn2.addEventListener("click", () => {
    modal.classList.add("hidden");
});

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
  // Update saat berubah
  selectEl.addEventListener("change", function () {
    selectedCodeId = this.value;
    desc = updateDesc(selectedCodeId);
      // console.log("Change:", desc);
  });
  
// ===================================
// SCAN
// ===================================
const radios = document.querySelectorAll('input[name="scanType"]');
let selectedScanner = null;

radios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    selectedScanner = e.target.value;
    console.log("Scanner yang dipilih:", selectedScanner);
    startSelectedScanner();
  });
});

// fungsi start scanner sesuai pilihan
function startSelectedScanner() {
  if (selectedScanner === "qr") {
    const onScanSuccess = (decodedText) => {
      if (!scans.find((s) => s.Result === decodedText)) {
        const today = new Date().toISOString().split("T")[0];

        if (!selectedCodeId) {
          alert("Tolong Pilih Device Yang Akan Discan");
          return;
        }

        if (selectedCodeId === "1030") {
          data = decodedText.split("|");
          sn = data[0];
          imei = data[1];
        } else if (selectedCodeId === "1003") {
          sn = decodedText;
          imei = "";
        } else if(selectedCodeId === "1018"){
          data = decodedText.match(/SN\s*:\s*(\S+)/)
          sn = data[1];
          imei = "";
        } else {
          alert("Invalid QR Code - SN Tidak Ditemukan");
        }

        const newData = {
          no: counter++,
          Date: today,
          CodeId: selectedCodeId,
          ItemDesc: desc,
          Qyt: 1,
          DeviceStatus: "none",
          Batch: "none",
          NoBox: "none",
          Result: sn,
          IMEICCID: imei,
          Location: location.value,
          Remarks: "none",
          Anydesk: "none",
        };

        scans.push(newData);

        document.getElementById("date").value = newData.Date;
        document.getElementById("codeId").value = newData.CodeId;
        document.getElementById("itemDesc").value = newData.ItemDesc;
        document.getElementById("qyt").value = newData.Qyt;
        document.getElementById("sn").value = newData.Result;
        document.getElementById("imeiccid").value = newData.IMEICCID;
        document.getElementById("location").value = newData.Location;

        modal.classList.remove("hidden");
      }
    };

    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });
    scanner.render(onScanSuccess);
  } else if(selectedScanner === "text"){

  }
}

// ⬇️ Tambahin ini supaya kamera langsung aktif sesuai default radio
const defaultChecked = document.querySelector("input[name='scanType']:checked");
if (defaultChecked) {
  selectedScanner = defaultChecked.value;
  startSelectedScanner();
}

// ===============
// SIMPAN DATA
// ===============

let url = "";

location.addEventListener("click", () => {
  console.log(location.value);
  if (location.value === "Inbound") {
    url = "http://localhost:3000/api/inbound"

  } else if(location.value === "Outbound"){
    url = "http://localhost:3000/api/outbound"

  } else if(location.value === "Diffect"){
    url = "http://localhost:3000/api/diffect"

  }
})

document.getElementById("btnSimpan").addEventListener("click", () => {

   // Ambil data dari modal
  const data = {
    date: document.getElementById("date").value,
    codeId: document.getElementById("codeId").value,
    itemDesc: document.getElementById("itemDesc").value,
    qty: document.getElementById("qyt").value,
    sn: document.getElementById("sn").value,
    imeiccid: document.getElementById("imeiccid").value,
    deviceStatus: document.getElementById("deviceStatus").value,
    location: document.getElementById("location").value,
    anydesk: document.getElementById("anydesk").value,
  };

  console.log("Data modal:", data);

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((msg) => {
      console.log("Response:", msg);
      alert(msg.message);
      modal.classList.add("hidden");
    })
    .catch((err) => console.error(err));
});
