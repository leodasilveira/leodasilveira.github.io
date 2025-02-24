if ("NDEFReader" in window) {
  consoleLog("Web NFC é compatível com o navegador");
}

// Chame a função para solicitar permissão
readTag();

async function enableNfc() {
  document.querySelector("#enableNfc").onclick = event => {
    // Prompt user to allow UA to send and receive info when they tap NFC devices.
    document.querySelector("#enableNfc").disabled = true;
    readTag();
  }; 
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
      document.querySelector("#enableNfc").disabled = false;
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
