/* =========================================
   SEASON 1 — EPISODE 3
   PHOTO GALLERY
   Ashley ❤️ Jeanelle
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const images = document.querySelectorAll(
        ".gallery img, .carousel img, .gallery-item img"
    );

    if (images.length === 0) {
        console.log("No gallery images found.");
        return;
    }

    let currentIndex = 0;


    /* =========================================
       CREATE PHOTO VIEWER
    ========================================= */

    const viewer = document.createElement("div");

    viewer.className = "photo-viewer";

    viewer.innerHTML = `
        <button class="close-viewer" aria-label="Close">
            ✕
        </button>

        <button class="gallery-prev" aria-label="Previous photo">
            ❮
        </button>

        <div class="viewer-content">
            <img class="viewer-image" src="" alt="Memory">
            <div class="viewer-counter"></div>
        </div>

        <button class="gallery-next" aria-label="Next photo">
            ❯
        </button>
    `;

    document.body.appendChild(viewer);


    /* =========================================
       VIEWER ELEMENTS
    ========================================= */

    const viewerImage =
        viewer.querySelector(".viewer-image");

    const viewerCounter =
        viewer.querySelector(".viewer-counter");

    const closeButton =
        viewer.querySelector(".close-viewer");

    const previousButton =
        viewer.querySelector(".gallery-prev");

    const nextButton =
        viewer.querySelector(".gallery-next");


    /* =========================================
       OPEN IMAGE
    ========================================= */

    function openGallery(index) {

        if (index < 0) {
            index = images.length - 1;
        }

        if (index >= images.length) {
            index = 0;
        }

        currentIndex = index;

        const image = images[currentIndex];

        viewerImage.src = image.src;

        viewerImage.alt =
            image.alt || "Ashley and Jeanelle memory";

        viewerCounter.textContent =
            `${currentIndex + 1} / ${images.length}`;

        viewer.classList.add("active");

        document.body.classList.add("gallery-open");

    }


    /* =========================================
       CLOSE VIEWER
    ========================================= */

    function closeGallery() {

        viewer.classList.remove("active");

        document.body.classList.remove("gallery-open");

        // Clear image after transition
        setTimeout(() => {

            if (!viewer.classList.contains("active")) {
                viewerImage.src = "";
            }

        }, 300);

    }


    /* =========================================
       NEXT IMAGE
    ========================================= */

    function nextImage() {

        openGallery(currentIndex + 1);

    }


    /* =========================================
       PREVIOUS IMAGE
    ========================================= */

    function previousImage() {

        openGallery(currentIndex - 1);

    }


    /* =========================================
       IMAGE CLICK EVENTS
    ========================================= */

    images.forEach((image, index) => {

        image.style.cursor = "pointer";

        image.addEventListener("click", () => {

            openGallery(index);

        });

    });


    /* =========================================
       BUTTON EVENTS
    ========================================= */

    closeButton.addEventListener(
        "click",
        closeGallery
    );

    nextButton.addEventListener(
        "click",
        nextImage
    );

    previousButton.addEventListener(
        "click",
        previousImage
    );


    /* =========================================
       CLICK OUTSIDE IMAGE
    ========================================= */

    viewer.addEventListener("click", event => {

        if (
            event.target === viewer
        ) {

            closeGallery();

        }

    });


    /* =========================================
       KEYBOARD CONTROLS
    ========================================= */

    document.addEventListener("keydown", event => {

        if (!viewer.classList.contains("active")) {
            return;
        }


        if (event.key === "Escape") {

            closeGallery();

        }


        if (event.key === "ArrowRight") {

            nextImage();

        }


        if (event.key === "ArrowLeft") {

            previousImage();

        }

    });


    /* =========================================
       TOUCH SWIPE
    ========================================= */

    let touchStartX = 0;
    let touchEndX = 0;


    viewer.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    viewer.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            const difference =
                touchEndX - touchStartX;


            // Swipe left
            if (difference < -60) {

                nextImage();

            }


            // Swipe right
            if (difference > 60) {

                previousImage();

            }

        },
        { passive: true }
    );


    /* =========================================
       IMAGE LOADING
    ========================================= */

    images.forEach(image => {

        image.addEventListener("load", () => {

            image.classList.add("loaded");

        });


        image.addEventListener("error", () => {

            image.classList.add("image-error");

            console.warn(
                "Could not load image:",
                image.src
            );

        });

    });


    /* =========================================
       PRELOAD GALLERY IMAGES
    ========================================= */

    images.forEach(image => {

        const preload = new Image();

        preload.src = image.src;

    });


    /* =========================================
       PREVENT PAGE SCROLL WHILE VIEWER IS OPEN
    ========================================= */

    viewer.addEventListener(
        "wheel",
        event => {

            event.preventDefault();

        },
        { passive: false }
    );


    /* =========================================
       CONSOLE MESSAGE
    ========================================= */

    console.log(
        `📸 Gallery initialized with ${images.length} photos.`
    );

});