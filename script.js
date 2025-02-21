let timer;
let remainingTime = 0;
let isRunning = false;
let audio = new Audio("https://cms-artifacts.motionarray.com/content/motion-array/109678/sfx4_MP3.mp3?Expires=2031957701487&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=i5AP-FmzxD0LAgVEwveLU7BPdbV7J1miuYoQkOKoD~Zd1Zyoo55Vb-vjQ7bedlobLiYTqX6rpTc1K-0goUvhsIqWqZHfMVyinQI3XbJzwR2EgND~5Xe94F6v5dD1c9rI6DWfB6DwnUj0rL-r0nr8JG6z8ngeZsJr0ivzEacCYjCbD62wREEpBiagBTZXseojVMpkS40Esobe6ox3niTds2iSxOq2FwK1aT71E7qZltqdA63fx4UFYFqWu9x1-KN8UxIs3vmAJGKzo9xePGF~HFHMf~iHg8ca~rXoJl~zHg6k3vlDGTMhDAaMnunGhW3Tr91gf~2DGcUKgpXmV3fVyQ__");

function startTimer() {
  if (isRunning) return;
  if (remainingTime <= 0) return;
  isRunning = true;
  updateDisplay();
  timer = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
      updateClock();
    } else {
      clearInterval(timer);
      audio.play();
      // alert("Time's up!");
      isRunning = false;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  remainingTime = 0;
  updateDisplay();
  updateClock();
}

function setPreset(minutes, seconds) {
  remainingTime = minutes * 60 + seconds;
  updateDisplay();
  updateClock();
}

function setCustomTime() {
  let minutes =
    parseInt(document.getElementById("custom-minutes").value) || 0;
  let seconds =
    parseInt(document.getElementById("custom-seconds").value) || 0;
  setPreset(minutes, seconds);
}

function updateDisplay() {
  let minutes = Math.floor(remainingTime / 60);
  let seconds = remainingTime % 60;
  document.getElementById("display").textContent =
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds;
}

function updateClock() {
  let angle = (remainingTime / 600) * 360;
  document.getElementById("hand").style.transform = `rotate(${angle}deg)`;
}
