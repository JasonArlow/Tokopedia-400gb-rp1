import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";


/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyBF9DyTvKfy4dsReRa6ABBPIdXDrV-XkB0",

    authDomain:
        "tokopedia-400gb-1rp.firebaseapp.com",

    projectId:
        "tokopedia-400gb-1rp",

    storageBucket:
        "tokopedia-400gb-1rp.firebasestorage.app",

    messagingSenderId:
        "110459851237",

    appId:
        "1:110459851237:web:7b5b8f98003ac9e8741f0c",

    measurementId:
        "G-22WV3ZTWVP",

    databaseURL:
        "https://tokopedia-400gb-1rp-default-rtdb.asia-southeast1.firebasedatabase.app"
};


/* =========================
   INITIALIZE FIREBASE
========================= */

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


/* =========================
   MUSIC
========================= */

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

let savedMusicTime =
    parseFloat(
        sessionStorage.getItem("musicTime")
    ) || 0;


/* =========================
   RESTORE MUSIC POSITION
========================= */

if (music) {

    music.addEventListener(
        "loadedmetadata",
        () => {

            if (
                savedMusicTime > 0 &&
                savedMusicTime < music.duration
            ) {

                music.currentTime =
                    savedMusicTime;

            }

        }
    );

}


/* =========================
   SAVE MUSIC POSITION
========================= */

setInterval(() => {

    if (
        music &&
        !music.paused &&
        music.currentTime > 0
    ) {

        sessionStorage.setItem(
            "musicTime",
            music.currentTime
        );

    }

}, 500);


/* =========================
   START MUSIC
========================= */

function playMusic() {

    if (!music) return;

    music.play().then(() => {

        if (musicButton) {
            musicButton.textContent = "♫";
        }

    }).catch(() => {

        console.log(
            "Autoplay blocked. Waiting for user interaction."
        );

    });

}


/* =========================
   START STORY
========================= */

function startStory() {

    sessionStorage.setItem(
        "storyStarted",
        "true"
    );

    document.body.classList.remove(
        "story-locked"
    );

    if (music) {

        music.currentTime = 0;

        playMusic();

    }

    const intro =
        document.querySelector(
            ".intro-section"
        );

    if (intro) {

        intro.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================
   MUSIC BUTTON
========================= */

function toggleMusic() {

    if (!music) return;

    if (music.paused) {

        playMusic();

    } else {

        music.pause();

        if (musicButton) {
            musicButton.textContent = "🔇";
        }

    }

}


/* =========================
   AFTER RELOAD
========================= */

if (
    sessionStorage.getItem(
        "storyStarted"
    ) === "true"
) {

    document.body.classList.remove(
        "story-locked"
    );


    /*
       Wait until audio metadata
       is available.
    */

    if (music) {

        music.addEventListener(
            "loadedmetadata",
            () => {

                if (
                    savedMusicTime > 0 &&
                    savedMusicTime < music.duration
                ) {

                    music.currentTime =
                        savedMusicTime;

                }

                playMusic();

            },
            { once: true }
        );

    }


    /*
       Browser fallback.
       If autoplay is blocked,
       first tap resumes the song.
    */

    const resumeAfterTap =
        () => {

            if (
                music &&
                music.paused
            ) {

                if (
                    savedMusicTime > 0 &&
                    savedMusicTime < music.duration
                ) {

                    music.currentTime =
                        savedMusicTime;

                }

                playMusic();

            }

            document.removeEventListener(
                "pointerdown",
                resumeAfterTap
            );

        };


    document.addEventListener(
        "pointerdown",
        resumeAfterTap
    );

}


/* =========================
   OPEN IT
========================= */

async function revealQuestion() {

    const blackScreen =
        document.getElementById(
            "blackScreen"
        );


    if (!blackScreen) return;


    /*
       STOP MUSIC
    */

    if (music) {

        music.pause();

    }


    /*
       SHOW FINAL BLACK SCREEN
    */

    document.body.classList.add(
        "final-black"
    );


    blackScreen.style.display =
        "flex";


    window.scrollTo(
        0,
        0
    );


    /*
       SEND EVENT TO FIREBASE
    */

    const statusRef =
        ref(
            database,
            "loveStory/status"
        );


    try {

        await set(
            statusRef,
            {

                opened: true,

                event: "open_it",

                openedAt:
                    new Date().toISOString()

            }
        );


        console.log(
            "❤️ Open it event sent to Firebase"
        );


    } catch (error) {

        console.error(
            "Firebase error:",
            error
        );

    }

}


/* =========================
   MAKE FUNCTIONS AVAILABLE
========================= */

window.startStory =
    startStory;

window.toggleMusic =
    toggleMusic;

window.revealQuestion =
    revealQuestion;