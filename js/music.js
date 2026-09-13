// ===============================
// BACKGROUND MUSIC
// ===============================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");

let isPlaying = false;

// Set volume
if (music) {
    music.volume = 0.5;
}

// Play / Pause music
function toggleMusic() {
    if (!music) return;

    if (isPlaying) {
        music.pause();
        isPlaying = false;

        if (musicIcon) {
            musicIcon.textContent = "🔇";
        }

        if (musicBtn) {
            musicBtn.classList.remove("playing");
        }

    } else {
        music.play()
            .then(() => {
                isPlaying = true;

                if (musicIcon) {
                    musicIcon.textContent = "🎵";
                }

                if (musicBtn) {
                    musicBtn.classList.add("playing");
                }
            })
            .catch(() => {
                console.log("Music playback was blocked. Click the music button to play.");
            });
    }
}

// Update button when music ends
if (music) {
    music.addEventListener("ended", () => {
        isPlaying = false;

        if (musicIcon) {
            musicIcon.textContent = "🔇";
        }

        if (musicBtn) {
            musicBtn.classList.remove("playing");
        }
    });
}

// Connect button
if (musicBtn) {
    musicBtn.addEventListener("click", toggleMusic);
}