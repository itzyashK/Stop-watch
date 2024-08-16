const minutesLabel = document.getElementById('mins');
const secondsLabel = document.getElementById('secs');
const milliSecondsLabel = document.getElementById('millisecs');

const startButton =  document.getElementById('start');
const stopButton =  document.getElementById('stop');
const pauseButton =  document.getElementById('pause');
const resetButton =  document.getElementById('reset');

const lapList = document.getElementById('lapList');

let minutes = 0;
let seconds = 0;
let milliSeconds = 0;
let interval;

startButton.addEventListener('click',startTimer);
stopButton.addEventListener('click',stopTimer);
pauseButton.addEventListener('click',pauseTimer);
resetButton.addEventListener('click',resetTimer);

function startTimer() {
    interval = setInterval(updateTimer,10);
    startButton.disabled = true;
    
}
function stopTimer() {
    clearInterval(interval);
    addToLapList();
    resetTimerData();
    startButton.disabled = false;
}
function pauseTimer() {
    clearInterval(interval);
    startButton.disabled = false;
}
function resetTimer() {
    clearInterval(interval);
    resetTimerData();
    startButton.disabled = false;
}

function updateTimer() {
    milliSeconds++;
    if (milliSeconds === 100) {
        milliSeconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            
        }
        
    }
    displayTimer();
}

function displayTimer() {
    milliSecondsLabel.textContent = padTime(milliSeconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);

}

function padTime(time) {
    return time.toString().padStart(2,'0')
}

function resetTimerData() {
    minutes = 0;
    seconds = 0;
    milliSeconds = 0;
    displayTimer();
}

function addToLapList() {
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliSeconds)}`;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${lapList.childElementCount + 1} </span>${lapTime}`;
    lapList.appendChild(listItem);
}