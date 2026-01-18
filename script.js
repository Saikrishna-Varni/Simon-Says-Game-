let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "blue", "green"];

let started = false;
let level = 0;

// persistent high score
let high_score = localStorage.getItem("highScore") || 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

// show high score on load
h3.innerText = `High score: ${high_score}`;

// ---------- START GAME (DESKTOP + MOBILE) ----------
function startGame() {
    if (!started) {
        started = true;
        levelup();
    }
}

// desktop keyboard (modern & reliable)
document.addEventListener("keydown", startGame);

// mobile + desktop click (safe area)
h2.addEventListener("click", startGame);

// --------------------------------------------------

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelup() {
    userseq = [];
    level++;

    // score = completed levels
    let score = level - 1;

    // update high score LIVE
    if (score > high_score) {
        high_score = score;
        localStorage.setItem("highScore", high_score);
        h3.innerText = `High score: ${high_score}`;
    }

    h2.innerText = `Level ${level}`;

    let randomidx = Math.floor(Math.random() * btns.length);
    let randomcolor = btns[randomidx];
    let randombtn = document.querySelector(`.${randomcolor}`);

    gameseq.push(randomcolor);
    gameflash(randombtn);
}

function check(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        let score = level - 1;

        h2.innerHTML = `Game over! Your score was <b>${score}</b><br>Press any key or tap here to start`;

        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress() {
    if (!started) return;

    let btn = this;
    let usercolor = btn.getAttribute("id");

    userflash(btn);
    userseq.push(usercolor);
    check(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
