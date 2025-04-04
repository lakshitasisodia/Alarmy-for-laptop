

window.onload = ()=> {
     const main = document.querySelector(".mainbdy")
     main.style.backgroundImage = "url('./images/alarmbg.jpg')";
    for (let i = 10; i > 0; i--) {
        
        let hours = 0;
        let minutes = i;
        let seconds = 0;
        let formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
        // Creating the timer card element
        let div = document.createElement("div");
        div.classList.add("cards", "flex", "column", "justify");
    
        div.innerHTML = `
            <div class="cardheading">${i} min</div>
            <div class="timerboxholder flex align jcentre">
                <div class="timerbox flex align jcentre">${formattedTime}</div>
            </div>
            <div class="timerboxbutton flex align jcentre">
                <div role="button" class="play flex align jcentre"><img src="./svg/play.svg" alt=""></div>
                <div role="button" class="restart flex align jcentre"><img src="./svg/repeat.svg" alt=""></div>
            </div>
        `;
    
        document.querySelector(".cardholder").prepend(div);
        startCountdown(div, hours, minutes, seconds);
        i-=2
    }
}

let addtime = document.querySelector(".addtimer");
let imagepen = document.querySelector(".imagepen");
let timerbox = document.getElementById("set-timer-modal");
const closeSetTimerModal=()=>{
    timerbox.style.display = "none"; 
}
imagepen.addEventListener("click", () => {
    timerbox.style.display = "block"; 
});

addtime.addEventListener("click", () => {
    let hours = parseInt(document.getElementById("custom-hours").value) || 0;
    let minutes = parseInt(document.getElementById("custom-minutes").value) || 0;
    let seconds = parseInt(document.getElementById("custom-seconds").value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert("Please enter a valid time!");
        return;
    }

    // Format the time (ensuring two-digit numbers)
    let formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    let div = document.createElement("div");
    div.classList.add("cards", "flex", "column", "justify");

    div.innerHTML = `
        <div class="cardheading">${formattedTime}</div>
        <div class="timerboxholder flex align jcentre">
            <div class="timerbox flex align jcentre">${formattedTime}</div>
        </div>
        <div class="timerboxbutton flex align jcentre">
            <div role="button" class="play flex align jcentre"><img src="./svg/play.svg" alt=""></div>
            <div role="button" class="restart flex align jcentre"><img src="./svg/repeat.svg" alt=""></div>
        </div>
    `;

    document.querySelector(".cardholder").prepend(div);
    inputReset();

    timerbox.style.display = "none";

    startCountdown(div, hours, minutes, seconds);
});

function inputReset() {
    document.getElementById("custom-hours").value = "";
    document.getElementById("custom-minutes").value = "";
    document.getElementById("custom-seconds").value = "";
}
function startCountdown(timerElement, hours, minutes, seconds) {

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    let timerDisplay = timerElement.querySelector(".timerbox");
    let playButton = timerElement.querySelector(".play");
    let restartButton = timerElement.querySelector(".restart");
    const alertSound = new Audio("./sound.mp3");
    let interval;

    function updateDisplay() {
        let hrs = Math.floor(totalSeconds / 3600);
        let mins = Math.floor((totalSeconds % 3600) / 60);
        let secs = totalSeconds % 60;
        timerDisplay.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function startTimer() {
        if (interval) return; // Prevent multiple intervals

        interval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(interval);
                interval = null;
                alertSound.currentTime = 0;
                alertSound.loop = true; // loop it so it keeps beeping
                alertSound.play().catch(e => console.log(e));

                setTimeout(() => {
                    alertSound.pause();
                    alertSound.currentTime = 0;
                    alertSound.loop = false;
                }, 5000); 
                return;
            }
            totalSeconds--;
            updateDisplay();
        }, 1000);
    }

    function resetTimer() {
        clearInterval(interval);
        interval = null;
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
        updateDisplay();
    }

    playButton.addEventListener("click", startTimer);
    restartButton.addEventListener("click", resetTimer);

    updateDisplay(); // Initial display update
}
