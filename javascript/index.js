
const circleElement = document.querySelector('.circle');
const timeELement = document.querySelector('.time');
const timeModeElement = document.querySelector('.time-mode');
const turnElement = document.querySelector('.turns');
const startTimeButton = document.querySelector('.timer-control');
const resetButton =document.querySelector('.reset-button');
const notificationSound = document.querySelector('#notification');

let isRunning,
    isBreakingTime,
    workTime,
    breakTime,
    longBreakTime,
    totalTurns,
    currentTurn,
    totalTime,
    timeRemaining,
    timer;

startTimeButton.addEventListener('click', toogleStartPause);
resetButton.addEventListener('click', reset);

function startValues(){
    isRunning = false;
    isBreakingTime = false;
    workTime = 25 * 60;
    breakTime = 5 * 60;
    longBreakTime = 15 * 60;
    totalTurns = 4;
    currentTurn = 1;
    totalTime = workTime;
    timeRemaining = totalTime;
    timer = null;
}

function toogleStartPause(){
    isRunning ? pause(): start();
}

function start(){
    isRunning = true;
    startTimeButton.innerText = 'Pause';
    timer = setInterval(updateTimer, 1000);
}

function pause(){
    isRunning = false;
    startTimeButton.innerText = 'Start';
    clearInterval(timer);
}

function reset(){
    pause();
    startValues();
    drawTime();
    drawTurn();
}

function updateTimer(){
    if(timeRemaining > 0){
        timeRemaining--;
    }else{
        finishTurn();
    }
    drawTime();
}

function finishTurn(){
    pause();
    notificationSound.play();
    nextTurn();
    drawTurn();
}

function nextTurn(){
    isBreakingTime = !isBreakingTime;
    if(!isBreakingTime){
        currentTurn++;
    }if (currentTurn <= totalTurns){
        if(isBreakingTime){
            if(currentTurn < totalTurns){
                totalTime = breakTime;
            }else{
                totalTime = longBreakTime;
            }
        }else{
            totalTime = workTime;
        }
        timeRemaining = totalTime;
    }else{
        reset();
    }
}


function drawTime(){
    const minutes = Math.floor(timeRemaining/60).toString().padStart(2,'0');
    const seconds = Math.floor(timeRemaining%60).toString().padStart(2,'0');

    timeELement.innerText = `${minutes}:${seconds}`;
    circlePercent(timeRemaining/totalTime*100);
}


function drawTurn(){
    let timeMode = 'Work';
    if(isBreakingTime){
        timeMode = currentTurn < totalTurns ? 'Rest' : 'Long Rest';
    }
    timeModeElement.innerText = timeMode;
    turnElement.innerText = `${currentTurn} / ${totalTurns}`;
}


function circlePercent(percent){
    const circlePerimeter = 597;
    const dashOffset = (circlePerimeter * (percent / 100));
    circleElement.style.setProperty('--dash-offset', circlePerimeter - dashOffset)
}

reset();
