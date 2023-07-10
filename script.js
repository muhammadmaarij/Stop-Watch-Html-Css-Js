let timerId;
let startTime;
var lastTwo = "";
let splitCount = 1;
let elapsedTime;
let isPaused = true;

function startPause() {
  const startPauseButton = document.getElementById("start-pause");
  const splitButton = document.getElementById("split");
  const resetButton = document.getElementById("reset");

  if (startPauseButton.innerText === "Start") {
    startPauseButton.innerText = "Pause";
    splitButton.disabled = false;
    resetButton.disabled = true;
    startPauseButton.style.backgroundColor = "palevioletred";
    resetButton.style.backgroundColor = "#EEEEEE";
    splitButton.style.backgroundColor = "#F79327";
    splitButton.style.borderWidth = "0";
    splitButton.style.color = "white";

    if (startTime === undefined) {
      startTime = Date.now() - (splitCount - 1) * 1000;
    } else {
      startTime = Date.now() - elapsedTime;
    }
    timerId = setInterval(updateTime, 10);
    isPaused = false;
  } else {
    startPauseButton.style.backgroundColor = "darkcyan";
    startPauseButton.innerText = "Start";
    splitButton.style.backgroundColor = "#EEEEEE";
    resetButton.style.backgroundColor = "#30A2FF";
    resetButton.style.color = "white";
    resetButton.style.borderWidth = "0";
    splitButton.disabled = true;
    resetButton.disabled = false;
    isPaused = true;
    const splitTimes = document.getElementById("time2");
    split();
    clearInterval(timerId);
    elapsedTime = Date.now() - startTime;
    splitTimes.innerText = formatTime(elapsedTime) + lastTwo;
  }
}

function split() {
  const splitTimes = document.getElementById("split-times");
  const time = document.getElementById("time").innerText;
  const splitEntry = document.createElement("li");
  if (isPaused) {
    splitEntry.innerHTML = `#${splitCount}: <span class="split-pause">${time}${lastTwo}</span>  Pause`;
  } else {
    splitEntry.innerHTML = `#${splitCount}: <span class="split">${time}${lastTwo}</span>  Split`;
  }
  splitTimes.appendChild(splitEntry);
  splitCount++;
}

function reset() {
  const splitTimes = document.getElementById("split-times");
  splitTimes.innerHTML = "";

  document.getElementById("time").innerText = "00:00:00.0";
  splitCount = 1;

  const startPauseButton = document.getElementById("start-pause");
  const splitButton = document.getElementById("split");
  const resetButton = document.getElementById("reset");

  startPauseButton.innerText = "Start";
  splitButton.disabled = true;
  resetButton.disabled = true;

  const time2 = document.getElementById("last2");
  time2.innerText = "00";

  const splitTimes2 = document.getElementById("time2");

  splitTimes2.innerText = "SPLIT TIME";
  clearInterval(timerId);
}

function updateTime() {
  const timeElement = document.getElementById("time");
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  timeElement.innerText = formattedTime;
  const time2 = document.getElementById("last2");
  time2.innerText = lastTwo;
}

function formatTime(time) {
  const milliseconds = String(time % 1000).padStart(3, "0");
  const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
  const minutes = String(Math.floor((time / 1000 / 60) % 60)).padStart(2, "0");
  const hours = String(Math.floor((time / 1000 / 60 / 60) % 24)).padStart(
    2,
    "0"
  );
  lastTwo = milliseconds.slice(-2);

  return `${hours}:${minutes}:${seconds}.${milliseconds.slice(0, 1)}`;
}
