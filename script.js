let signDict = {};

async function loadSigns() {
  const response = await fetch("data/signs.json");
  signDict = await response.json();
}

// Call loadSigns when the page loads
window.addEventListener("DOMContentLoaded", loadSigns);

async function convertText() {
  const input = document.getElementById("inputText").value.toLowerCase();
  const words = input.split(/\s+/);
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  for (const word of words) {
    const imgSrc = signDict[word];
    if (imgSrc) {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = word;
      img.width = 200;
      outputDiv.appendChild(img);
    } else {
      outputDiv.appendChild(document.createTextNode(`[${word}] `));
    }
  }
}
