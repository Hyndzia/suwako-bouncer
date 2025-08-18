const speedMultiplier = (isMobile || isIntelMac) ? 1 : 1;


function createGif(x = 100, y = 100) {
    if (gifCounter === MAX_OBJ_AMOUNT) return;
    gifCounter++;

    const gif = document.createElement("img");
    gif.src = gifSrc;
    gif.style.position = "fixed";
    gif.style.width = gifWidth;
    gif.style.height = gifHeight;
    gif.style.pointerEvents = "none";
    document.body.appendChild(gif);

    const dx = (Math.random() * 4 + 1) * speedMultiplier * (Math.random() > 0.5 ? 1 : -1);
    const dy = (Math.random() * 3 + 1) * speedMultiplier * (Math.random() > 0.5 ? 1 : -1);
    const rotationSpeed = 0.7 * (Math.random() > 0.5 ? 1 : -1);
    const rotation = Math.random() * 360;

    gifs.push({ gif, x, y, dx, dy, rotation, rotationSpeed, isDragging: false });
    const spawnSound = new Audio("suwako-bouncer/spawn.mp3");
    spawnSound.volume = 0.1;
    spawnSound.play();
}

function animate() {
    const wallBounceDamping = (isMobile || isIntelMac) ? 0.6 : 0.95;
    const friction = (isMobile || isIntelMac) ? 0.98 : 0.3;

    gifs.forEach(obj => {
        if (!obj.isDragging) {
            obj.x += obj.dx;
            obj.y += obj.dy;

            const w = obj.gif.offsetWidth;
            const h = obj.gif.offsetHeight;

            // bounces on the x axis
            if (obj.x <= 0) {
                obj.x = 0;
                obj.dx = Math.abs(obj.dx) * wallBounceDamping;
                obj.rotationSpeed = Math.abs(obj.rotationSpeed) * wallBounceDamping;
            } else if (obj.x + w >= window.innerWidth) {
                obj.x = window.innerWidth - w;
                obj.dx = -Math.abs(obj.dx) * wallBounceDamping;
                obj.rotationSpeed = -Math.abs(obj.rotationSpeed) * wallBounceDamping;
            }

            if (obj.y <= 0) {
                obj.y = 0;
                obj.dy = Math.abs(obj.dy) * wallBounceDamping;
                obj.rotation += -10;
            } else if (obj.y + h >= window.innerHeight) {
                obj.y = window.innerHeight - h;
                obj.dy = -Math.abs(obj.dy) * wallBounceDamping;
                obj.rotation += 10;
            }

            obj.rotation += obj.rotationSpeed;
        }

        obj.gif.style.left = obj.x + "px";
        obj.gif.style.top = obj.y + "px";
        obj.gif.style.transform = `rotate(${obj.rotation}deg)`;
    });

    checkCollisions();
    requestAnimationFrame(animate);
}

createGif();
animate();

