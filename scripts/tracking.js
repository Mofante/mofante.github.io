let mouseClicks = 0;
let time;
let keyPresses = 0;
let charactersTyped = 0;

time = Date.now();

let showTrackingData = () => {
    document.getElementById("behavioral-data").innerHTML = 
    "<h1>Behavioral data</h1>" +
    "Time spent on this website: " + Math.floor((Date.now() - time) / 1000) + "s<br>" +
    "Clicks: " + mouseClicks + "<br>" +
    "Key presses: " + keyPresses + "<br>" +
    "Characters typed: " + charactersTyped;

    document.getElementById("behavioral-data").style.display = "block";
};

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