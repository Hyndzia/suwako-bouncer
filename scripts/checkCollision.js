const MAX_HIT_COUNT = 10;
const hitSound = new Audio("assets/pop.mp3");
hitSound.volume = 0.3;

function checkCollisions() {
    for (let i = 0; i < gifs.length; i++) {
        for (let j = i + 1; j < gifs.length; j++) {
            const a = gifs[i];
            const b = gifs[j];

            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDist = (a.gif.offsetWidth + b.gif.offsetWidth) / 2;

            if (distance < minDist) {
                const tempDx = a.dx;
                const tempDy = a.dy;

                a.dx = b.dx;
                a.dy = b.dy;

                b.dx = tempDx;
                b.dy = tempDy;

                const overlap = minDist - distance;
                const adjustX = (dx / distance) * (overlap / 2);
                const adjustY = (dy / distance) * (overlap / 2);

                if (!a.isDragging) { a.x -= adjustX; a.y -= adjustY; }
                if (!b.isDragging) { b.x += adjustX; b.y += adjustY; }
				if (!isMobile || isIntelMac){
					if (hitSound.paused) {
						hitSound.currentTime = 0;
						hitSound.play();
					} else {
						const clone = hitSound.cloneNode();
						clone.volume = 0.3;
						clone.play();
					}
				}
                window.hitCount++;
				hitCounterEl.innerText = `Hits: ${window.hitCount}`;

                if (!a.isDragging && !b.isDragging) {
                    if (hitCount % MAX_HIT_COUNT === 0 && gifs.length > 0) {
                        const removed = gifs.find(g => !g.isDragging);
                        if (removed) {
                            removed.gif.style.transition = "opacity 0.7s ease";
                            removed.gif.style.opacity = "0";
                            setTimeout(() => removed.gif.remove(), 500);
                            gifs.splice(gifs.indexOf(removed), 1);
                            gifCounter--;
                            const sound = removalSounds[Math.floor(Math.random() * removalSounds.length)];
                            sound.volume = 0.3;
                            sound.play();
                        }
                    }
                }
            }
        }
    }
}
