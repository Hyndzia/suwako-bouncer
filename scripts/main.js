const gifSrc = "assets/suwako.gif";
const gifs = [];
let gifCounter = 0;
window.hitCount = 0;

const removalSounds = [
    new Audio("assets/baka-cirno.mp3"),
    new Audio("assets/reimuuu.mp3"),
    new Audio("assets/ze.mp3"),
];
const backgrounds = [
    "assets/HakureiShrine.jpg",
    "assets/MoriyaShrine.png",
];

//background audio
const audioLong = new Audio("https://hyndzia.xyz/native-faith.mp3");
audioLong.volume = 0.07;
let audioStarted = false;

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const isIntelMac = navigator.userAgent.toLowerCase().includes("intel mac os x");
const SPAWN_RATE_TIME = 3500; //ms
const MAX_OBJ_AMOUNT = (isMobile || isIntelMac) ? 9 : 15;
const DESKTOP_OBJ_WIDTH = "170px";
const DESKTOP_OBJ_HEIGHT = "170px";
const MOBILE_OBJ_WIDTH = "105px";
const MOBILE_OBJ_HEIGHT = "105px";

const gifWidth  = (isMobile || isIntelMac) ? MOBILE_OBJ_WIDTH  : DESKTOP_OBJ_WIDTH;
const gifHeight = (isMobile || isIntelMac) ? MOBILE_OBJ_HEIGHT : DESKTOP_OBJ_HEIGHT;

let currentBg = 0;
let mouseX = 0;
let mouseY = 0;
let dragging = null;
let lastMouseX = 0;
let lastMouseY = 0;


function startAudio() {
    if (!audioStarted) {
        audioLong.play().catch(e => console.log("Autoplay blocked:", e));
        audioCtx.resume().then(() => {
            console.log("AudioContext resumed");
            animateGlow(); 
        });

        audioStarted = true;
    }
}

function changeBackground() {
    currentBg = (currentBg + 1) % backgrounds.length;
    document.body.style.backgroundImage = `
        linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
        url(${backgrounds[currentBg]})
    `;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
}

const hitCounterEl = document.createElement("div");
hitCounterEl.style.position = "fixed";
hitCounterEl.style.top = "10px";
hitCounterEl.style.right = "10px";
hitCounterEl.style.padding = "10px 15px";
hitCounterEl.style.background = "rgba(0,0,0,0.5)";
hitCounterEl.style.color = "white";
hitCounterEl.style.fontSize = "20px";
hitCounterEl.style.fontFamily = "sans-serif";
hitCounterEl.style.borderRadius = "10px";
hitCounterEl.style.zIndex = "1000";
hitCounterEl.innerText = `Hits: 0`;
document.body.appendChild(hitCounterEl);
console.log(window.hitCount)

setInterval(() => {
	const randX = Math.random() * (window.innerWidth - 150);
    const randY = Math.random() * (window.innerHeight - 150);
    createGif(randX, randY);
}, SPAWN_RATE_TIME);

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const source = audioCtx.createMediaElementSource(audioLong);
const analyser = audioCtx.createAnalyser();





