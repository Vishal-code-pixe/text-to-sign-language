const signDict = {}; // will load JSON

async function loadSigns() {
  const response = await fetch("data/signs.json");
  const data = await response.json();
  Object.assign(signDict, data);
}

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
      outputDiv.appendChild(img);
    } else {
      outputDiv.appendChild(document.createTextNode(`[${word}] `));
    }
  }
}
