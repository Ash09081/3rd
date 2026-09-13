/* =========================================
   SEASON 1 — EPISODE 3
   FALLING PINK PETALS
   Ashley ❤️ Jeanelle
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("petals-container");

    if (!container) {
        console.warn("Petal container not found.");
        return;
    }


    /* =========================================
       SETTINGS
    ========================================= */

    const PETAL_COUNT = 35;

    const petalSymbols = [
        "🌸",
        "🌸",
        "💗",
        "♡"
    ];


    /* =========================================
       CREATE PETAL
    ========================================= */

    function createPetal() {

        const petal = document.createElement("span");

        petal.classList.add("petal");

        // Random flower / heart
        petal.innerHTML =
            petalSymbols[
                Math.floor(Math.random() * petalSymbols.length)
            ];


        /* =========================================
           RANDOM POSITION
        ========================================= */

        petal.style.left =
            Math.random() * 100 + "vw";


        /* =========================================
           RANDOM SIZE
        ========================================= */

        const size =
            Math.random() * 14 + 12;

        petal.style.fontSize =
            size + "px";


        /* =========================================
           RANDOM ANIMATION SPEED
        ========================================= */

        const duration =
            Math.random() * 6 + 7;

        petal.style.animationDuration =
            duration + "s";


        /* =========================================
           RANDOM DELAY
        ========================================= */

        const delay =
            Math.random() * 8;

        petal.style.animationDelay =
            "-" + delay + "s";


        /* =========================================
           RANDOM OPACITY
        ========================================= */

        const opacity =
            Math.random() * 0.45 + 0.45;

        petal.style.opacity =
            opacity;


        /* =========================================
           RANDOM ROTATION
        ========================================= */

        const rotation =
            Math.random() * 360;

        petal.style.transform =
            `rotate(${rotation}deg)`;


        /* =========================================
           ADD TO PAGE
        ========================================= */

        container.appendChild(petal);


        /* =========================================
           REMOVE AFTER ANIMATION
        ========================================= */

        petal.addEventListener("animationend", () => {

            petal.remove();

            // Create a replacement
            createPetal();

        });

    }


    /* =========================================
       CREATE INITIAL PETALS
    ========================================= */

    for (let i = 0; i < PETAL_COUNT; i++) {

        createPetal();

    }


    /* =========================================
       PAUSE PETALS WHEN TAB IS HIDDEN
    ========================================= */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            container.style.animationPlayState =
                "paused";

            container.querySelectorAll(".petal")
                .forEach(petal => {

                    petal.style.animationPlayState =
                        "paused";

                });

        } else {

            container.style.animationPlayState =
                "running";

            container.querySelectorAll(".petal")
                .forEach(petal => {

                    petal.style.animationPlayState =
                        "running";

                });

        }

    });


    /* =========================================
       REDUCE PETALS ON SMALL DEVICES
    ========================================= */

    function optimizeForMobile() {

        const isMobile =
            window.innerWidth <= 600;

        const petals =
            container.querySelectorAll(".petal");

        petals.forEach((petal, index) => {

            if (isMobile && index >= 20) {

                petal.style.display = "none";

            } else {

                petal.style.display = "block";

            }

        });

    }


    optimizeForMobile();

    window.addEventListener(
        "resize",
        optimizeForMobile
    );


    /* =========================================
       CONSOLE MESSAGE
    ========================================= */

    console.log(
        "🌸 Falling pink petals initialized."
    );

});