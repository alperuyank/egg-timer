let timer;
let remainingTime = 0;
let isRunning = false;
let audio = new Audio("/sounds/default.mp3");

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