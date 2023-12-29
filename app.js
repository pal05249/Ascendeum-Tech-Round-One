/*
on start- 
-timer starts
-box appears
- box dissapear based on timeout set by input

on pause 
-timer resets
-box dissapears

on reset
-timer resets
-table clears

onclick of box
- box dissapears
- timestamp stored
-timer resets


*/

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const boxElement = document.getElementById("box");
var timestamp;
var tableBody = document.querySelector("tbody");
var count = 0;
var timerInterval;
var timer = 0;

function startButtonClick(event) {

  const timeoutValue = document.getElementById("timeout").value;
  if (timeoutValue == 0 || timeoutValue === "") {
    alert("Please enter a valid timeout");
    return;
  }
  //implement hide and change position

  timerInterval = setInterval(() => {
    boxElement.style.visibility = boxElement.style.visibility === "hidden" ? "visible" : "hidden";
    if (boxElement.style.visibility === "visible") {
      boxElement.style.position = "absolute";
      boxElement.style.top = `${300 - Math.random() * 100}px`;
      boxElement.style.left = `${500 - Math.random() * 100}px`;
      timestamp = Date.now();

      // Capture timestamp when box appears
    }
  }, timeoutValue * 1000);
}

function storeTimeStamp(event) {
  if (boxElement.style.visibility === "visible") {
    // Calculate time taken to click the box
    const clickTime = Date.now();
    const timeTaken = (clickTime - timestamp) / 1000; // in seconds

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let tr = document.createElement("tr");
    td2.innerHTML = timeTaken.toFixed(2); // Display time taken with two decimal places
    td1.innerHTML = ++count;
    tr.appendChild(td1);
    tr.appendChild(td2);

    if (count === 1) tableBody.innerHTML = "";
    tableBody.appendChild(tr);
  }
}

function pauseButtonClick(event) {
  clearInterval(timerInterval);
  boxElement.style.visibility = "hidden";
}

function resetButtonClick(event) {
  count = 0;
  clearInterval(timerInterval);
  boxElement.style.visibility = "hidden";
  tableBody.innerHTML = "<tr><td></td><td></td></tr>";
}

startButton.addEventListener("click", startButtonClick);
pauseButton.addEventListener("click", pauseButtonClick);
resetButton.addEventListener("click", resetButtonClick);
boxElement.addEventListener("click", storeTimeStamp);
