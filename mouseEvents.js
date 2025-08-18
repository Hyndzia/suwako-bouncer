window.addEventListener("click", startAudio, { once: true });
window.addEventListener("keydown", startAudio, { once: true });

window.addEventListener("mousedown", e => {
    if (e.button === 0) {
        gifs.forEach(obj => {
            const rect = obj.gif.getBoundingClientRect();
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                dragging = obj;
                dragging.offsetX = e.clientX - obj.x;
                dragging.offsetY = e.clientY - obj.y;
                dragging.isDragging = true;
            }
        });
    }
});
window.addEventListener("mouseup", e => {
    if (e.button === 0 && dragging) {
        dragging.dx = (mouseX - lastMouseX) * 0.5;
        dragging.dy = (mouseY - lastMouseY) * 0.5;
        dragging.isDragging = false;
        dragging = null;
    }
});
window.addEventListener("contextmenu", e => {
    e.preventDefault();
    createGif(e.clientX, e.clientY);
});

window.addEventListener("mousemove", e => {
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (dragging) {
        const targetX = mouseX - dragging.offsetX;
        const targetY = mouseY - dragging.offsetY;
        const force = 0.7;
        dragging.dx += (targetX - dragging.x) * force;
        dragging.dy += (targetY - dragging.y) * force;
        dragging.dx *= 1;
        dragging.dy *= 1;
        const speed = Math.sqrt(dragging.dx ** 2 + dragging.dy ** 2);
        const maxSpeed = 30;
        if (speed > maxSpeed) {
            dragging.dx = (dragging.dx / speed) * maxSpeed;
            dragging.dy = (dragging.dy / speed) * maxSpeed;
        }
        dragging.x = mouseX - dragging.offsetX;
        dragging.y = mouseY - dragging.offsetY
    }
});

let touchDragging = false;
window.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    touchDragging = false;
    dragging = null;
    gifs.forEach(obj => {
        const rect = obj.gif.getBoundingClientRect();
        if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
            touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
            dragging = obj;
            dragging.offsetX = touch.clientX - obj.x;
            dragging.offsetY = touch.clientY - obj.y;
            dragging.isDragging = true;
            touchDragging = true;
        }
    });
});

window.addEventListener("touchmove", e => {
    if (!dragging) return;
    const touch = e.touches[0];
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    mouseX = touch.clientX;
    mouseY = touch.clientY;

    const targetX = mouseX - dragging.offsetX;
    const targetY = mouseY - dragging.offsetY;
    const force = 0.7;
    dragging.dx += (targetX - dragging.x) * force;
    dragging.dy += (targetY - dragging.y) * force;
    dragging.dx *= 0.85;
    dragging.dy *= 0.85;

    const speed = Math.sqrt(dragging.dx**2 + dragging.dy**2);
    const maxSpeed = 30;
    if (speed > maxSpeed) {
        dragging.dx = (dragging.dx / speed) * maxSpeed;
        dragging.dy = (dragging.dy / speed) * maxSpeed;
    }
    dragging.x = mouseX - dragging.offsetX;
    dragging.y = mouseY - dragging.offsetY;
    e.preventDefault();
}, { passive: false });

window.addEventListener("touchend", e => {
    if (dragging) {
        dragging.isDragging = false;
        dragging = null;
    }

    if (!touchDragging) {
        const touch = e.changedTouches[0];
        createGif(touch.clientX, touch.clientY);
    }
});