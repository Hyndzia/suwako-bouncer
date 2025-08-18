
source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 256; // smaller = faster response
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Glow effect element (overlay)
const glowOverlay = document.createElement("div");
glowOverlay.style.position = "fixed";
glowOverlay.style.top = "0";
glowOverlay.style.left = "0";
glowOverlay.style.width = "100%";
glowOverlay.style.height = "100%";
glowOverlay.style.background = "rgba(255, 255, 255, 0.1)";
glowOverlay.style.pointerEvents = "none";
glowOverlay.style.mixBlendMode = "overlay";
glowOverlay.style.transition = "background 0.05s linear";
document.body.appendChild(glowOverlay);

function animateGlow() {
    analyser.getByteFrequencyData(dataArray);

    // Take average of frequency data (general loudness)
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    const avg = sum / dataArray.length;

    // Map loudness to opacity (0 → quiet, 0.6 → loud)
    const opacity = Math.min(avg / 150, 0.5);

    glowOverlay.style.background = `rgba(255, 255, 255, ${opacity})`;

    requestAnimationFrame(animateGlow);
}
