// window.onload=()=>{
//     const idvalue = document.body.id
//     const main = document.querySelector(".mainbdy")
//     switch(idvalue)
//     {
//         case "world-page":
//         main.style.backgroundImage = "url('./images/worldbg.jpg')";
//         break;
//         case "alarm-page":
//         main.style.backgroundImage = "url('./images/home-bg.jpg')";
//         break;
//         case "timer-page":
//         main.style.backgroundImage = "url('./images/home-bg.jpg')";
//         break;
//         default:
//             main.style.backgroundColor = "#183B4E";
//     }
// }


let minimize = document.querySelector(".minimize");
let max = document.querySelector(".maximum");
let navbar = document.querySelector("nav");
let settime = document.querySelector(".settime");
let mainBody = document.querySelector(".mainbdy");
let focus = document.querySelector(".focus");
let timer = document.querySelector(".timer");
let alarm = document.querySelector(".alarm");
let world = document.querySelector(".world");
let div = null; // Initialize as null
const alertSound = new Audio("./sound.mp3")
minimize.addEventListener("click", () => {
    navbar.style.left = "0";
});

max.addEventListener("click", () => {
    navbar.style.left = "-80%";
});

focus.addEventListener("click", () => {
    window.location.href = "./index.html";
});

timer.addEventListener("click", () => {
    window.location.href = "./timer.html";
});

alarm.addEventListener("click", () => {
    window.location.href = "./alarm.html";
});

world.addEventListener("click", () => {
    window.location.href = "./world.html";
});

settime.addEventListener("click", () => {
    settime.disabled = true;
    div = document.createElement("div");
    div.innerHTML = `
        <label for="appt">Select a time:</label>
        <input type="time" id="appt" name="appt">
        <p id="timeDisplay">Set focus time for 00:00</p>
        <button class="startFocus">Start</button>
    `;

    div.classList.add("timersetter", "column", "flex", "align", "jcentre");
    mainBody.insertBefore(div, mainBody.firstChild);

    let inputTime = div.querySelector("#appt");
    let startButton = div.querySelector(".startFocus");

    inputTime.addEventListener("change", () => {
        div.querySelector("#timeDisplay").innerText = `Set focus time for ${inputTime.value}`;
    });

    startButton.addEventListener("click", () => {
        if (inputTime.value) {
            let currentTime = new Date();
            let [hours, minutes] = inputTime.value.split(":");
            
            // Set the selected time on the current date
            let selectedTime = new Date(currentTime);
            selectedTime.setHours(hours);
            selectedTime.setMinutes(minutes);
            selectedTime.setSeconds(0);
            selectedTime.setMilliseconds(0);
            
            // Calculate the difference between current time and selected time
            let timeDifference = selectedTime - currentTime; // Difference in milliseconds

            if (timeDifference < 0) {
                timeDifference += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
            }

            createOverlay(); // Show overlay
            setTimeout(removeOverlay, timeDifference); // Remove overlay after the calculated time
        }
    });

    // Event listener to close the div when clicking outside
    setTimeout(() => {
        document.addEventListener("click", closeOnClickOutside);
    }, 100); // Timeout ensures this runs after div is created
});

function closeOnClickOutside(event) {
    if (div && !div.contains(event.target) && event.target !== settime) {
        div.remove();
        div = null;
        settime.disabled = false;
        document.removeEventListener("click", closeOnClickOutside); // Remove event listener after closing
    }
}

function createOverlay() {
    let overlay = document.createElement("div");
    overlay.id = "focusOverlay";
    overlay.innerHTML = `
        <h1>Stay Focused!</h1>
        <p>Don't close this screen until your session ends.</p>
    `;
    document.body.appendChild(overlay);
    document.body.style.cursor = "none";
}

function removeOverlay() {
    alertSound.currentTime = 0;
    alertSound.loop = true; 
    alertSound.play().catch(e => console.log(e));
    
    setTimeout(() => {
        alertSound.pause();
        alertSound.currentTime = 0;
        alertSound.loop = false;
    }, 1000); 
    let overlay = document.getElementById("focusOverlay");
    if (overlay) {
        overlay.remove();
    }
    alert("Your session is over")
    document.body.style.cursor = "default"; 

    if (div) {
        div.remove();
        div = null;
        settime.disabled = false;
    }
}
