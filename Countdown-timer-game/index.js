/* Where I left off & what to do:
added the random logic function
to do: add a warning so it warns user of oncoming snipe and how much

*/

console.log('hello!')

let timeIntBegin = 40;
let timeInt=timeIntBegin
let tooMuch = 55;
let tooLittle = 25;

let score = 0;

let highScore=0

let timerr = document.querySelector('.timer');
let scoreInt = document.querySelector('.scoreNum');
let hsNum = document.querySelector('.highScoreNum');

let posWarn = document.querySelector('.pos-warn');
let negWarn = document.querySelector('.neg-warn');
// interval id (stored here so clearInterval can stop it)
let countdown = null;

function boop() {
    const boop = new Audio('./assets/Untitled video - Made with Clipchamp.m4a');
    boop.volume = 0.1;
    boop.cloneNode(true).play();
}



function updateView() {

    timerr.textContent = timeInt
    scoreInt.textContent = score
    hsNum.textContent = highScore
}
function updateWarnView(snipeAmount) {
    // only set if the elements exist
    if (posWarn) posWarn.textContent = snipeAmount;
    if (negWarn) negWarn.textContent = snipeAmount;
}
let inplay = false
function plus() {
    if (inplay){
    timeInt++;
    if(timeInt >= tooMuch) {
        gameOver();
    }
    updateView();   
    boop.play();
    } else {
        gameOver()
    }
    
}
function min() {
    if (inplay) {
    timeInt--;
    if(timeInt <= tooLittle) {
        gameOver();
    }
    updateView();
    } else {
        gameOver()
    }
    
}
function gameOver() {
    // stop the interval if it's running
    if (countdown !== null) {
        
        clearInterval(countdown);
        clearInterval(snipers);
        countdown = null;
    }
    inplay = false;
    timeInt = timeIntBegin;
    if(score >= highScore) {
        highScore = score
    }
    alert('Game Over. \nScore: ' + score);
    console.log('score: ' + score);
    score=0
    updateView();
}

function test() {
    // require all three conditions: within bounds and inplay
    // Math.random() returns a number between 0 and 1
    // Less than 0.5 means 50% chance
    if (timeInt > tooLittle && timeInt < tooMuch && inplay) {
    inplay=true
    if(Math.random() <0.5) {
        timeInt++;
        score++;
        //        boop();
    } else {
        timeInt--;
        score++;
        //         boop();
    }
    // Decrease half the time
    if (timeInt <= tooLittle) {
        gameOver();
        } else if (timeInt >= tooMuch) {
            gameOver();
        }
        updateView();
        
    }
}

function snipePosEvent(snipeAmount) {
     posWarn.style.opacity = '0%'
    timeInt += snipeAmount;
    updateView();
    if(timeInt >= tooMuch) {
        gameOver();
    }
}

function snipeNegEvent(snipeAmount) {
    negWarn.style.opacity = '0%'
    timeInt -= snipeAmount;
    updateView();
    if(timeInt <= tooLittle) {
        gameOver();
    }
}



function sniperWarn() {
    let rand = Math.random();
    let snipeAmount;
    console.log('rand unrounded: ' + rand)
    if(rand <= .5) {
        snipeAmount = Math.round(rand * 20);
        updateNegWarnView(snipeAmount);
        // clear the warning after 1 second
        setTimeout(() => { if (negWarn) negWarn.textContent = 0; snipeNegEvent(snipeAmount); negWarn.style.opacity = '0%'}, 3000);
        console.log('snipeAmount: -' + snipeAmount);  // Round the final number
    } else {
        snipeAmount = Math.round(rand * 10);
        updatePosWarnView(snipeAmount);
        // clear the warning after 1 second
        setTimeout(() => { if (posWarn) posWarn.textContent = 0; snipePosEvent(snipeAmount);}, 3000);
        console.log('snipeAmount: ' + snipeAmount); // Round the final number
    }
}

function updatePosWarnView(snipeAmount) {
    posWarn.style.opacity = '70%'
    if (posWarn) posWarn.textContent = snipeAmount;
}

function updateNegWarnView(snipeAmount) {
    negWarn.style.opacity = '70%'
    if (negWarn) negWarn.textContent = snipeAmount;
}

function start() {
    timeInt = timeIntBegin
    // if an interval is already running, don't start another
    if (countdown !== null) return;
    inplay = true;
    countdown = setInterval(test, 100);
    snipers = setInterval(sniperWarn, 5000)
}

updateView();