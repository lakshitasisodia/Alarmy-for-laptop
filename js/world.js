
window.onload = () => {
    update();
    const main = document.querySelector(".mainbdy")
     main.style.backgroundImage = "url('./images/worldbg.jpg')";

    setInterval(update, 1000); // 🔁 Update every second
};

function update() {
    const time = new Date();
    let hours = String(time.getHours()).padStart(2, '0');
    if(hours>12)
    {
        hours = String(hours-12).padStart(2,'0');
    }
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;

    document.getElementById("clock-display").innerHTML = currentTime;
}

