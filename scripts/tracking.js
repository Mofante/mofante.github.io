let mouseClicks = 0;
let time;
let keyPresses = 0;
let charactersTyped = 0;

time = Date.now();

document.getElementById("register").onclick = () => {
    document.getElementById("behavioral-data").innerHTML = 
    "Time spent on this website: " + Math.floor((Date.now() - time) / 1000) + "s" +
    "Clicks " + mouseClicks +
    "Key presses" + keyPresses +
    "Characters typed " + charactersTyped;
    document.getElementById("behavioral-data").style.display = "block";
}

for(let e of document.querySelectorAll("input")) {
    e.addEventListener("keypress", (event) => {
        charactersTyped++;
    });
}

document.addEventListener("click", (event) => {
    mouseClicks++;
});

document.addEventListener("keydown", (event) => {
    keyPresses++;
});