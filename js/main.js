/* =========================================
   SEASON 1 — EPISODE 3
   ASHLEY ❤️ JEANELLE
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const scenes = document.querySelectorAll(".scene");
    const nextButtons = document.querySelectorAll(".next-btn");

    const bgMusic = document.getElementById("bgMusic");

    let currentScene = document.querySelector(".scene.active");
    let musicStarted = false;


    /* =========================================
       SCENE NAVIGATION
    ========================================= */

    function showScene(sceneId) {

        const nextScene = document.getElementById(sceneId);

        if (!nextScene || nextScene === currentScene) {
            return;
        }

        // Remove active state from current scene
        if (currentScene) {
            currentScene.classList.remove("active");
            currentScene.classList.add("leaving");

            setTimeout(() => {
                currentScene.classList.remove("leaving");
            }, 1000);
        }

        // Show next scene
        nextScene.classList.add("active");

        currentScene = nextScene;

        // Reset animations
        resetSceneAnimations(nextScene);

        // Start music when moving past intro
        startMusic();

        // Pause videos from previous scenes
        pauseInactiveVideos(nextScene);
    }


    /* =========================================
       RESET SCENE ANIMATIONS
    ========================================= */

    function resetSceneAnimations(scene) {

        const animatedElements = scene.querySelectorAll(
            ".hero-content, " +
            ".intro-wrapper, " +
            ".content-card, " +
            ".glass-card, " +
            ".letter, " +
            ".credits, " +
            ".scene-title, " +
            ".featured-photo, " +
            ".gallery-item, " +
            ".reason-card, " +
            ".video-grid video"
        );

        animatedElements.forEach(element => {

            element.style.animation = "none";

            // Force browser reflow
            void element.offsetWidth;

            element.style.animation = "";
        });
    }


    /* =========================================
       NEXT BUTTONS
    ========================================= */

    nextButtons.forEach(button => {

        button.addEventListener("click", () => {

            const nextSceneId = button.getAttribute("data-next");

            if (!nextSceneId) {
                return;
            }

            showScene(nextSceneId);

        });

    });


    /* =========================================
       START BACKGROUND MUSIC
    ========================================= */

    function startMusic() {

        if (!bgMusic) {
            return;
        }

        if (!musicStarted) {

            bgMusic.volume = 0.45;

            const playPromise = bgMusic.play();

            if (playPromise !== undefined) {

                playPromise
                    .then(() => {
                        musicStarted = true;
                        updateMusicButton();
                    })
                    .catch(() => {
                        // Browser blocked autoplay.
                        // Music will start after user interaction.
                    });

            }

        }

    }


    /* =========================================
       MUSIC AFTER USER INTERACTION
    ========================================= */

    document.addEventListener("click", () => {

        if (!bgMusic) {
            return;
        }

        if (!musicStarted) {

            bgMusic.volume = 0.45;

            bgMusic.play()
                .then(() => {
                    musicStarted = true;
                    updateMusicButton();
                })
                .catch(() => {});

        }

    }, { once: false });


    /* =========================================
       MUSIC BUTTON
    ========================================= */

    function createMusicButton() {

        if (!bgMusic) {
            return;
        }

        // Don't create another button
        if (document.querySelector(".music-btn")) {
            return;
        }

        const button = document.createElement("button");

        button.className = "music-btn";
        button.id = "musicToggle";
        button.setAttribute("aria-label", "Toggle background music");

        button.innerHTML = "🎵";

        document.body.appendChild(button);

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            if (bgMusic.paused) {

                bgMusic.play()
                    .then(() => {
                        musicStarted = true;
                        updateMusicButton();
                    })
                    .catch(() => {});

            } else {

                bgMusic.pause();
                updateMusicButton();

            }

        });

        updateMusicButton();
    }


    /* =========================================
       UPDATE MUSIC BUTTON
    ========================================= */

    function updateMusicButton() {

        const musicButton = document.querySelector(".music-btn");

        if (!musicButton || !bgMusic) {
            return;
        }

        if (bgMusic.paused) {

            musicButton.innerHTML = "🔇";
            musicButton.classList.remove("playing");

            musicButton.setAttribute(
                "aria-label",
                "Play background music"
            );

        } else {

            musicButton.innerHTML = "🎵";
            musicButton.classList.add("playing");

            musicButton.setAttribute(
                "aria-label",
                "Pause background music"
            );

        }

    }


    /* =========================================
       PAUSE VIDEOS FROM INACTIVE SCENES
    ========================================= */

    function pauseInactiveVideos(activeScene) {

        const videos = document.querySelectorAll("video");

        videos.forEach(video => {

            if (!activeScene.contains(video)) {
                video.pause();
            }

        });

    }


    /* =========================================
       VIDEO AUDIO CONTROL
    ========================================= */

    const videos = document.querySelectorAll("video");

    videos.forEach(video => {

        video.addEventListener("play", () => {

            // Pause background music while watching a video
            if (bgMusic && !bgMusic.paused) {
                bgMusic.pause();
                updateMusicButton();
            }

            // Pause other videos
            videos.forEach(otherVideo => {

                if (otherVideo !== video) {
                    otherVideo.pause();
                }

            });

        });

        video.addEventListener("ended", () => {

            // Resume background music after video
            if (bgMusic && musicStarted) {

                bgMusic.play()
                    .then(() => {
                        updateMusicButton();
                    })
                    .catch(() => {});

            }

        });

    });


    /* =========================================
       IMAGE VIEWER
    ========================================= */

    const galleryImages = document.querySelectorAll(
        ".carousel img, " +
        ".gallery img, " +
        ".gallery-item img, " +
        ".featured-photo"
    );

    const viewer = document.querySelector(".photo-viewer");
    const viewerImage = viewer
        ? viewer.querySelector("img")
        : null;

    const closeViewer = document.querySelector(".close-viewer");


    galleryImages.forEach(image => {

        image.addEventListener("click", () => {

            if (!viewer || !viewerImage) {
                return;
            }

            viewerImage.src = image.src;

            viewer.classList.add("active");

        });

    });


    /* =========================================
       CLOSE IMAGE VIEWER
    ========================================= */

    if (closeViewer && viewer) {

        closeViewer.addEventListener("click", () => {

            viewer.classList.remove("active");

        });

    }


    if (viewer) {

        viewer.addEventListener("click", event => {

            if (event.target === viewer) {
                viewer.classList.remove("active");
            }

        });

    }


    /* =========================================
       KEYBOARD CONTROLS
    ========================================= */

    document.addEventListener("keydown", event => {

        // ESC closes photo viewer
        if (event.key === "Escape") {

            if (viewer) {
                viewer.classList.remove("active");
            }

            return;
        }


        // Don't navigate while typing
        if (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
        ) {
            return;
        }


        // ENTER / SPACE
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            const activeButton = currentScene
                ? currentScene.querySelector(".next-btn")
                : null;

            if (activeButton) {
                activeButton.click();
            }

        }

    });


    /* =========================================
       SWIPE NAVIGATION
       MOBILE FRIENDLY
    ========================================= */

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", event => {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    document.addEventListener("touchend", event => {

        touchEndX = event.changedTouches[0].screenX;

        handleSwipe();

    }, { passive: true });


    function handleSwipe() {

        const difference = touchEndX - touchStartX;

        // Ignore very small movements
        if (Math.abs(difference) < 80) {
            return;
        }

        // Don't swipe while watching video
        if (
            eventIsVideo() ||
            document.querySelector(".photo-viewer.active")
        ) {
            return;
        }

        if (difference < 0) {

            // Swipe left = next
            goToNextScene();

        }

    }


    /* =========================================
       GO TO NEXT SCENE
    ========================================= */

    function goToNextScene() {

        if (!currentScene) {
            return;
        }

        const nextButton = currentScene.querySelector(".next-btn");

        if (nextButton) {
            nextButton.click();
        }

    }


    /* =========================================
       CHECK IF VIDEO IS ACTIVE
    ========================================= */

    function eventIsVideo() {

        if (!currentScene) {
            return false;
        }

        const activeVideo = currentScene.querySelector("video");

        return activeVideo && !activeVideo.paused;

    }


    /* =========================================
       PREVENT ACCIDENTAL PAGE SCROLLING
    ========================================= */

    document.body.addEventListener("wheel", event => {

        if (document.body.classList.contains("allow-scroll")) {
            return;
        }

        event.preventDefault();

    }, { passive: false });


    /* =========================================
       HIDE CURSOR AFTER INACTIVITY
    ========================================= */

    let cursorTimer;

    function resetCursorTimer() {

        document.body.classList.remove("cursor-hidden");

        clearTimeout(cursorTimer);

        cursorTimer = setTimeout(() => {

            document.body.classList.add("cursor-hidden");

        }, 4000);

    }

    document.addEventListener("mousemove", resetCursorTimer);
    document.addEventListener("touchstart", resetCursorTimer);

    resetCursorTimer();


    /* =========================================
       RESTART BUTTON
    ========================================= */

    const restartButtons = document.querySelectorAll(
        ".restart-btn"
    );

    restartButtons.forEach(button => {

        button.addEventListener("click", () => {

            scenes.forEach(scene => {
                scene.classList.remove("active");
                scene.classList.remove("leaving");
            });

            const intro = document.getElementById("introScene");

            if (intro) {

                intro.classList.add("active");

                currentScene = intro;

            }

            window.scrollTo(0, 0);

            if (bgMusic) {

                bgMusic.currentTime = 0;
                bgMusic.pause();

                musicStarted = false;

                updateMusicButton();

            }

        });

    });


    /* =========================================
       INITIALIZE MUSIC BUTTON
    ========================================= */

    createMusicButton();


    /* =========================================
       INITIAL SCENE
    ========================================= */

    if (!currentScene && scenes.length > 0) {

        currentScene = scenes[0];

        currentScene.classList.add("active");

    }


    /* =========================================
       INITIALIZE VIDEO SETTINGS
    ========================================= */

    videos.forEach(video => {

        video.setAttribute("playsinline", "");
        video.setAttribute("preload", "metadata");

    });


    /* =========================================
       INITIALIZE IMAGES
    ========================================= */

    galleryImages.forEach(image => {

        image.setAttribute("loading", "lazy");

        image.addEventListener("error", () => {

            image.classList.add("image-error");

        });

    });


    /* =========================================
       PAGE VISIBILITY
       Pause music when tab is hidden
    ========================================= */

    document.addEventListener("visibilitychange", () => {

        if (!bgMusic) {
            return;
        }

        if (document.hidden) {

            if (!bgMusic.paused) {
                bgMusic.dataset.wasPlaying = "true";
                bgMusic.pause();
            }

        } else {

            if (bgMusic.dataset.wasPlaying === "true") {

                bgMusic.play()
                    .then(() => {
                        updateMusicButton();
                    })
                    .catch(() => {});

                delete bgMusic.dataset.wasPlaying;

            }

        }

    });


    /* =========================================
       DEBUG MESSAGE
    ========================================= */

    console.log(
        "❤️ Ashley & Jeanelle — Season 1 Episode 3 loaded successfully."
    );

});