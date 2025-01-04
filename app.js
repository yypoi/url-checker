const urlInput = document.getElementById("urlInput");
const statusDisplay = document.getElementById("status");

let throttleTimeout = null;
let lastCheckedUrl = "";
let currentRequestId = 0;


// Überprüfung des URL-Formats
function isValidURL(url) {
  const pattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-z]{2,6})(\/.*)*$/;
  return pattern.test(url);
}

// mockt Server
function mockServerCheck(url) {
  const isFile = url.endsWith(".html") || url.endsWith(".js");
  const isFolder = !isFile;
  return new Promise((resolve) => {
    setTimeout(() => {
      //// Gibt zufällig zurück, ob die URL existiert 
      const exists = Math.random() > 0.5;
      resolve({ exists, type: isFile ? "File" : "Folder" });
    }, 1000);
  });
}


// Verarbeitung bei Eingabe
urlInput.addEventListener("input", () => {
  const url = urlInput.value;

  // Sofortige URL-Format-Prüfung
  if (!isValidURL(url)) {
    statusDisplay.textContent = "Ungültiges URL-Format!";
    statusDisplay.style.color = "red";
    lastCheckedUrl = ""; // Zurücksetzen der letzten URL
    return;
  }


  // Throttling von 500 Millisekunden
  clearTimeout(throttleTimeout);
  throttleTimeout = setTimeout(async () => {
    if (url === lastCheckedUrl) {
      return; // Verhindert doppelte Prüfung
    }

    lastCheckedUrl = url;
    const requestId = ++currentRequestId; // Generiert eine eindeutige Anfrage-ID

    statusDisplay.textContent = "Prüfe, bitte warten...";
    statusDisplay.style.color = "black";

    const result = await mockServerCheck(url);

    // Stellt sicher, dass nur das aktuellste Ergebnis angezeigt wird
    if (requestId !== currentRequestId) {
      return;
    }

    if (result.exists) {
      statusDisplay.textContent = `URL existiert als ${result.type}!`;
      statusDisplay.style.color = "green";
    } else {
      statusDisplay.textContent = "URL existiert nicht!";
      statusDisplay.style.color = "red";
    }
  }, 500);
});
