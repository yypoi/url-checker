const urlInput = document.getElementById("urlInput");
const statusDisplay = document.getElementById("status");

let throttleTimeout = null;

// Überprüfung des URL-Formats
function isValidURL(url) {
  const pattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-z]{2,6})(\/.*)*$/;
  return pattern.test(url);
}

// mockt Server
function mockServerCheck(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      //// Gibt zufällig zurück, ob die URL existiert 
      const exists = Math.random() > 0.5;
      resolve(exists);
    }, 1000);
  });
}

// Verarbeitung bei Eingabe
urlInput.addEventListener("input", () => {
  const url = urlInput.value;

  // Throttling von 500 Millisekunden
  clearTimeout(throttleTimeout);
  throttleTimeout = setTimeout(async () => {
    if (!isValidURL(url)) {
      statusDisplay.textContent = "Ungültiges URL-Format!";
      statusDisplay.style.color = "red";
      return;
    }

    statusDisplay.textContent = "Prüfe, bitte warten...";
    statusDisplay.style.color = "blue";

    const exists = await mockServerCheck(url);
    if (exists) {
      statusDisplay.textContent = "URL existiert!";
      statusDisplay.style.color = "green";
    } else {
      statusDisplay.textContent = "URL existiert nicht!";
      statusDisplay.style.color = "orange";
    }
  }, 500);
});
