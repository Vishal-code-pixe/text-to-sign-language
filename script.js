let signDict = {};

async function loadSigns() {
  const response = await fetch("data/signs.json");
  signDict = await response.json();
}

async function fetchSign(word) {
  const url = `https://api.spreadthesign.com/en.us/search/${word}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0 && data[0].videos.length > 0) {
      return data[0].videos[0].url;
    }
  } catch (err) {
    console.error("Error fetching sign:", err);
  }
  return null;
}

async function convertText() {
  const input = document.getElementById("inputText").value.toLowerCase();
  const words = input.split(/\s+/);
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  for (const word of words) {
    let signUrl = signDict[word];

    if (!signUrl) {
      signUrl = await fetchSign(word);
    }

    if (signUrl) {
      const video = document.createElement("video");
      video.src = signUrl;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.width = 200;
      outputDiv.appendChild(video);
    } else {
      const span = document.createElement("span");
      span.textContent = `[${word}] `;
      outputDiv.appendChild(span);
    }
  }
}

loadSigns();
