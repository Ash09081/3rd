/* =========================================
   SEASON 1 — EPISODE 3
   RELATIONSHIP TIMER
   Ashley ❤️ Jeanelle
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       RELATIONSHIP START DATE
       June 7, 2026
    ========================================= */

    const relationshipStart = new Date(
        "2026-06-07T00:00:00+08:00"
    );


    /* =========================================
       ELEMENTS
    ========================================= */

    const relationshipTimer =
        document.getElementById("relationshipTimer");

    const monthsaryCountdown =
        document.getElementById("monthsaryCountdown");


    /* =========================================
       GET NEXT MONTHSARY
    ========================================= */

    function getNextMonthsary() {

        const now = new Date();

        let year = now.getFullYear();
        let month = now.getMonth();

        // Monthsary is every 7th
        let nextMonthsary =
            new Date(year, month, 7, 0, 0, 0);

        // If this month's 7th has already passed,
        // move to next month.
        if (now >= nextMonthsary) {

            nextMonthsary =
                new Date(year, month + 1, 7, 0, 0, 0);

        }

        return nextMonthsary;
    }


    /* =========================================
       RELATIONSHIP TIMER
    ========================================= */

    function updateRelationshipTimer() {

        if (!relationshipTimer) {
            return;
        }

        const now = new Date();

        let difference =
            now.getTime() - relationshipStart.getTime();

        // Prevent negative values
        if (difference < 0) {
            difference = 0;
        }


        const totalSeconds =
            Math.floor(difference / 1000);

        const seconds =
            totalSeconds % 60;

        const totalMinutes =
            Math.floor(totalSeconds / 60);

        const minutes =
            totalMinutes % 60;

        const totalHours =
            Math.floor(totalMinutes / 60);

        const hours =
            totalHours % 24;

        const totalDays =
            Math.floor(totalHours / 24);


        /* =========================================
           CALCULATE MONTHS + DAYS
        ========================================= */

        let months =
            (now.getFullYear() - relationshipStart.getFullYear()) * 12;

        months +=
            now.getMonth() - relationshipStart.getMonth();

        let startDay =
            relationshipStart.getDate();

        let days =
            now.getDate() - startDay;


        if (days < 0) {

            months--;

            const previousMonth =
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    0
                );

            days += previousMonth.getDate();

        }

        if (months < 0) {
            months = 0;
        }


        /* =========================================
           DISPLAY
        ========================================= */

        relationshipTimer.innerHTML = `
            <div class="timer-row">

                <div class="timer-unit">
                    <span>${months}</span>
                    <small>MONTHS</small>
                </div>

                <div class="timer-unit">
                    <span>${days}</span>
                    <small>DAYS</small>
                </div>

                <div class="timer-unit">
                    <span>${String(hours).padStart(2, "0")}</span>
                    <small>HOURS</small>
                </div>

                <div class="timer-unit">
                    <span>${String(minutes).padStart(2, "0")}</span>
                    <small>MINUTES</small>
                </div>

                <div class="timer-unit">
                    <span>${String(seconds).padStart(2, "0")}</span>
                    <small>SECONDS</small>
                </div>

            </div>

            <p class="timer-caption">
                Together since June 7, 2026 ❤️
            </p>
        `;

    }


    /* =========================================
       MONTHSARY COUNTDOWN
    ========================================= */

    function updateMonthsaryCountdown() {

        if (!monthsaryCountdown) {
            return;
        }

        const now = new Date();

        let nextMonthsary =
            getNextMonthsary();

        let difference =
            nextMonthsary.getTime() - now.getTime();


        /* =========================================
           IF MONTHSARY IS TODAY
        ========================================= */

        if (
            now.getDate() === 7 &&
            now.getHours() >= 0
        ) {

            monthsaryCountdown.innerHTML = `
                <div class="countdown-message">
                    Happy Monthsary! ❤️
                </div>

                <p>
                    Another beautiful month with you.
                </p>
            `;

            return;
        }


        /* =========================================
           CALCULATE TIME
        ========================================= */

        const totalSeconds =
            Math.floor(difference / 1000);

        const seconds =
            totalSeconds % 60;

        const totalMinutes =
            Math.floor(totalSeconds / 60);

        const minutes =
            totalMinutes % 60;

        const totalHours =
            Math.floor(totalMinutes / 60);

        const hours =
            totalHours % 24;

        const days =
            Math.floor(totalHours / 24);


        /* =========================================
           DISPLAY
        ========================================= */

        monthsaryCountdown.innerHTML = `
            <div class="timer-row countdown-row">

                <div class="timer-unit">
                    <span>${days}</span>
                    <small>DAYS</small>
                </div>

                <div class="timer-unit">
                    <span>${String(hours).padStart(2, "0")}</span>
                    <small>HOURS</small>
                </div>

                <div class="timer-unit">
                    <span>${String(minutes).padStart(2, "0")}</span>
                    <small>MINUTES</small>
                </div>

                <div class="timer-unit">
                    <span>${String(seconds).padStart(2, "0")}</span>
                    <small>SECONDS</small>
                </div>

            </div>

            <p class="timer-caption">
                Until our next monthsary ❤️
            </p>
        `;

    }


    /* =========================================
       UPDATE BOTH TIMERS
    ========================================= */

    function updateTimers() {

        updateRelationshipTimer();
        updateMonthsaryCountdown();

    }


    /* =========================================
       START TIMER
    ========================================= */

    updateTimers();

    setInterval(updateTimers, 1000);


    /* =========================================
       OPTIONAL CONSOLE MESSAGE
    ========================================= */

    console.log(
        "❤️ Relationship timer initialized — June 7, 2026"
    );

});