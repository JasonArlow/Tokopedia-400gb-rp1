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


function startStory() {

    const intro =
        document.querySelector(".intro-section");

    if (intro) {

        intro.scrollIntoView({
            behavior: "smooth"
        });

    }

    if (music) {

        music.play().catch(() => {});

    }
}


function toggleMusic() {

    if (!music) return;


    if (music.paused) {

        music.play().catch(() => {});

        if (musicButton) {
            musicButton.textContent = "♫";
        }

    } else {

        music.pause();

        if (musicButton) {
            musicButton.textContent = "🔇";
        }

    }
}


/* =========================
   OPEN IT
========================= */

async function revealQuestion() {

    /*
       FIRST:
       Show the final black screen
       immediately.
    */

    const blackScreen =
        document.getElementById("blackScreen");

    if (!blackScreen) return;


    document.body.classList.add(
        "final-black"
    );


    blackScreen.style.display =
        "flex";


    window.scrollTo(0, 0);


    /*
       THEN:
       Send event to Firebase.
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