if ("NDEFReader" in window) {
  consoleLog("Web NFC é compatível com o navegador");
} else {
  consoleLog("Web NFC não é compatível com o navegador");
}
async function readTag() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
      await ndef.scan();
      ndef.onreading = event => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          consoleLog("ID da Tag: " + record.id);
          // consoleLog("Record type:  " + record.recordType);
          // consoleLog("MIME type:    " + record.mediaType);
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
