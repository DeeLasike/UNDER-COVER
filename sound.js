// This file will handle music and sound effects for the UNDERCOVER game.
// Usage: Call playBackgroundMusic(), playCardFlip(), playVote(), playResult(correct) from script.js

let bgMusic;
let cardFlipSound;
let voteSound;
let resultCorrectSound;
let resultWrongSound;


function playBackgroundMusic() {
    if (!bgMusic) {
        bgMusic = new Audio('assets/Untitled.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.3;
    }
    // Only play if not already playing
    if (bgMusic.paused) {
        bgMusic.play();
    }
}

function stopBackgroundMusic() {
    if (bgMusic) bgMusic.pause();
}


function playCardFlip() {
    if (!cardFlipSound) cardFlipSound = new Audio('assets/Untitled.mp3');
    cardFlipSound.currentTime = 0;
    cardFlipSound.play();
}


function playVote() {
    if (!voteSound) voteSound = new Audio('assets/Untitled.mp3');
    voteSound.currentTime = 0;
    voteSound.play();
}


function playResult(correct) {
    if (!resultCorrectSound) resultCorrectSound = new Audio('assets/Untitled.mp3');
    resultCorrectSound.currentTime = 0;
    resultCorrectSound.play();
}
