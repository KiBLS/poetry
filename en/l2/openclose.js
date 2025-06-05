// Check if URL of browser window has hash tag
if (location.hash) {
  // Get URL hash tag
  const hash = window.location.hash;
  // Select radio with ID of hashtag
  const radio = document.querySelector(hash);
  // Check if radio exists
  if(radio) {
    // Set selected radio as checked
    radio.checked = true;
  }
}

// Delay href for the fade out effect
function delayUrlLoad(url, mils)
{
    setTimeout(function() {
        window.location.href = url;
    }, mils);
}

// Fade out effect for every element
/* eslint-env es6 */
const fadeTarget = document.getElementById("main-content");
const fadeOutTime = 250; // in milliseconds
const opacityStep = 0.1;

function fadeOutEffect() {
  let opacity = 1;
  const fadeInterval = setInterval(() => {
    opacity -= opacityStep;
    fadeTarget.style.opacity = opacity;
    if (opacity <= 0) {
      clearInterval(fadeInterval);
    }
  }, fadeOutTime * opacityStep);
}

document.querySelectorAll('[id^="menubtn"]').forEach(btn => {
  btn.addEventListener('click', () => {
    fadeOutEffect();
  });
});

// Funktion zum Laden einer Datei aus dem lokalen Speicher
function loadFromLocalStorage(url) {
  let data = localStorage.getItem(url);
  if (data) {
    let blob = new Blob([data], { type: 'image/jpeg' });
    return Promise.resolve(URL.createObjectURL(blob));
  } else {
    return Promise.reject();
  }
}

// Funktion zum Speichern einer Datei im lokalen Speicher
function saveToLocalStorage(url, data) {
  localStorage.setItem(url, data);
}

// Funktion zum Laden einer Datei vom Server und Speichern im lokalen Speicher
function loadAndSave(url) {
  return fetch(url)
    .then(response => response.blob())
    .then(blob => {
      let reader = new FileReader();
      reader.onload = () => {
        saveToLocalStorage(url, reader.result);
      };
      reader.readAsArrayBuffer(blob);
      return URL.createObjectURL(blob);
    });
}

// Pfade zu den Dateien
let paths = [
  '../../schachbrettwhite.jpg',
  '../schachbrettwhite.jpg',
];

// Versuche, die Dateien aus dem lokalen Speicher zu laden
// Wenn das fehlschlägt, lade sie vom Server und speichere sie im lokalen Speicher
Promise.all(paths.map(loadFromLocalStorage).map(p => p.catch(() => null)))
  .then(urls => {
    let whiteUrl = urls[0] || urls[1] || loadAndSave(paths[0]);
    let blackUrl = urls[2] || urls[3] || loadAndSave(paths[2]);
    // Setze die URLs in die img-Tags der HTML-Datei ein
    document.getElementById('schachbrettwhite').src = whiteUrl;
    document.getElementById('schachbrettblack').src = blackUrl;
  });
