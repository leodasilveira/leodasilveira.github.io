if ("NDEFReader" in window) {
  consoleLog("Web NFC é compatível com o navegador");
}

const nfcPermissionStatus = await navigator.permissions.query({ name: "nfc" });
if (nfcPermissionStatus.state === "granted") {
  // NFC access was previously granted, so we can start NFC scanning now.
  readTag();
} else {
  // Show a "scan" button.
  // document.querySelector("#scanButton").style.display = "block";
  // document.querySelector("#scanButton").onclick = event => {
  //   // Prompt user to allow UA to send and receive info when they tap NFC devices.
  //   readTag();
  // };
}

async function readTag() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
      await ndef.scan();
      ndef.onreading = event => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          // consoleLog(JSON.stringify(record));
          consoleLog("\n\nID da Tag: " + record.id);
          consoleLog("Record type:  " + record.recordType);
          consoleLog("MIME type:    " + record.mediaType);
          consoleLog("=== dados ===\n" + decoder.decode(record.data));
        }
      }
    } catch(error) {
      consoleLog(error);
    }
  } else {
    consoleLog("Web NFC não é compatível com o navegador.");
  }
}

async function writeTag() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
      await ndef.write("Mensagem de teste");
      consoleLog("Mensagem de teste escrita na tag!");
    } catch(error) {
      consoleLog(error);
    }
  } else {
    consoleLog("Web NFC não é compatível com o navegador.");
  }
}

function consoleLog(data) {
  var logElement = document.getElementById('log');
  logElement.innerHTML += data + '\n';
}

function clearLog() { 
  var logElement = document.getElementById('log');
  logElement.innerHTML = '';
}
