// This file will handle music and sound effects for the UNDERCOVER game.
// Usage: Call playBackgroundMusic(), playCardFlip(), playVote(), playResult(correct) from script.js

let bgMusic;
let cardFlipSound;
let voteSound;
let resultCorrectSound;
let resultWrongSound;

function playBackgroundMusic() {
    if (!bgMusic) {
        bgMusic = new Audio('assets/music.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.3;
    }
    bgMusic.play();
}

function stopBackgroundMusic() {
    if (bgMusic) bgMusic.pause();
}

function playCardFlip() {
    if (!cardFlipSound) cardFlipSound = new Audio('assets/card-flip.mp3');
    cardFlipSound.currentTime = 0;
    cardFlipSound.play();
}

function playVote() {
    if (!voteSound) voteSound = new Audio('assets/vote.mp3');
    voteSound.currentTime = 0;
    voteSound.play();
}

function playResult(correct) {
    if (correct) {
        if (!resultCorrectSound) resultCorrectSound = new Audio('assets/correct.mp3');
        resultCorrectSound.currentTime = 0;
        resultCorrectSound.play();
    } else {
        if (!resultWrongSound) resultWrongSound = new Audio('assets/wrong.mp3');
        resultWrongSound.currentTime = 0;
        resultWrongSound.play();
    }
}
