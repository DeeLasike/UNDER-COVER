// UNDERCOVER Game Logic
// Import sound functions
// Assumes sound.js is loaded before this script
// If not, add <script src="sound.js"></script> before script.js in index.html
const playerForm = document.getElementById('player-form');
const playerNameInput = document.getElementById('player-name');
const addPlayerBtn = document.getElementById('add-player');
const playerList = document.getElementById('player-list');
const startGameBtn = document.getElementById('start-game');
const setupSection = document.getElementById('setup-section');
// Word section removed
const cardSection = document.getElementById('card-section');
const cardsContainer = document.getElementById('cards-container');
const cardPlayerTitle = document.getElementById('card-player-title');
const voteSection = document.getElementById('vote-section');
const voteList = document.getElementById('vote-list');
const revealBtn = document.getElementById('reveal-btn');
const resultSection = document.getElementById('result-section');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

let players = [];
let undercoverIndex = null;
let civilianWord = '';
let undercoverWord = '';
let words = [
	['apple', 'pear'],
	['cat', 'dog'],
	['car', 'bus'],
	['pizza', 'burger'],
	['sun', 'moon'],
	['river', 'lake'],
	['pen', 'pencil'],
	['table', 'desk'],
	['phone', 'tablet'],
	['book', 'magazine']
];
let currentWordPlayer = 0;
let cardWords = [];
let votes = [];
// Add missing updatePlayerList function
function updatePlayerList() {
	playerList.innerHTML = '';
	players.forEach((name, i) => {
		const li = document.createElement('li');
		li.textContent = name;
		playerList.appendChild(li);
	});
	startGameBtn.disabled = players.length < 3;
}

// Add player on button click
addPlayerBtn.onclick = function() {
	const name = playerNameInput.value.trim();
	if (name && !players.includes(name)) {
		players.push(name);
		updatePlayerList();
		playerNameInput.value = '';
	}
};

// Add player on Enter key
playerNameInput.addEventListener('keydown', function(e) {
	if (e.key === 'Enter') {
		e.preventDefault();
		addPlayerBtn.click();
	}
});

// Start game logic
startGameBtn.onclick = function() {
	// Assign words
	// Play background music as soon as the site loads
	window.addEventListener('DOMContentLoaded', function() {
		playBackgroundMusic();
	});
	const wordPair = words[Math.floor(Math.random() * words.length)];
	if (Math.random() < 0.5) {
		civilianWord = wordPair[0];
		undercoverWord = wordPair[1];
	} else {
		civilianWord = wordPair[1];
		undercoverWord = wordPair[0];
	}
	undercoverIndex = Math.floor(Math.random() * players.length);
	// Prepare card words for each player
	cardWords = players.map((_, i) => (i === undercoverIndex ? undercoverWord : civilianWord));
	setupSection.style.display = 'none';
	cardsContainer.innerHTML = '';
	cardPlayerTitle.textContent = `Everyone, hold your card to reveal!`;
	let flippedCount = 0;
	for (let i = 0; i < players.length; i++) {
		const card = document.createElement('div');
		card.className = 'gold-card card-flip';
		card.innerHTML = `<div class="card-inner"><div class="card-front">Card</div><div class="card-back"><div class="card-word">${cardWords[i]}</div><div class="card-player-name">${players[i]}</div></div></div>`;
		card.dataset.playerIndex = i;
		let isHolding = false;
		let flipped = false;
		const flipCard = () => {
			if (flipped) return;
			flipped = true;
			card.classList.add('flipped');
			playCardFlip();
			setTimeout(() => {
				card.style.visibility = 'hidden';
				flippedCount++;
				if (flippedCount === players.length) {
					cardSection.style.display = 'none';
					startVoting();
				}
			}, 900);
		};
		// Mouse events
		card.addEventListener('mousedown', function(e) {
			if (flipped) return;
			isHolding = true;
		});
		card.addEventListener('mouseup', function(e) {
			if (flipped || !isHolding) return;
			isHolding = false;
			flipCard();
		});
		card.addEventListener('mouseleave', function(e) {
			if (flipped) return;
			isHolding = false;
		});
		// Touch events
		card.addEventListener('touchstart', function(e) {
			if (flipped) return;
			isHolding = true;
		});
		card.addEventListener('touchend', function(e) {
			if (flipped || !isHolding) return;
			isHolding = false;
			flipCard();
		});
		card.addEventListener('touchcancel', function(e) {
			if (flipped) return;
			isHolding = false;
		});
		cardsContainer.appendChild(card);
	}
	cardSection.style.display = '';
};

// Voting logic
function startVoting() {
	voteSection.style.display = '';
	voteList.innerHTML = '';
	votes = Array(players.length).fill(0);
	playVote();
	players.forEach((name, i) => {
		const li = document.createElement('li');
		li.innerHTML = `<label><input type="radio" name="vote" value="${i}"> ${name}</label>`;
		voteList.appendChild(li);
	});
}

// Reveal undercover logic

revealBtn.onclick = function() {
	const selected = document.querySelector('input[name="vote"]:checked');
	if (!selected) {
		alert('Please select a player to vote out!');
		return;
	}
	const votedIndex = parseInt(selected.value);
	voteSection.style.display = 'none';
	resultSection.style.display = '';
	if (votedIndex === undercoverIndex) {
		resultMessage.innerHTML = `<span style="color:green;">Correct! <strong>${players[undercoverIndex]}</strong> was the UNDERCOVER with the word "${undercoverWord}".</span>`;
		playResult(true);
	} else {
		resultMessage.innerHTML = `<span style="color:red;">Wrong! <strong>${players[undercoverIndex]}</strong> was the UNDERCOVER with the word "${undercoverWord}".<br>You voted out <strong>${players[votedIndex]}</strong>.</span>`;
		playResult(false);
	}
};

// Restart game logic
restartBtn.onclick = function() {
	// Reset all game state
	players = [];
	undercoverIndex = null;
	civilianWord = '';
	undercoverWord = '';
	currentWordPlayer = 0;
	cardWords = [];
	votes = [];
	playerNameInput.value = '';
	updatePlayerList();
	setupSection.style.display = '';
	cardSection.style.display = 'none';
	voteSection.style.display = 'none';
	resultSection.style.display = 'none';
	cardsContainer.innerHTML = '';
	voteList.innerHTML = '';
	resultMessage.innerHTML = '';
	stopBackgroundMusic();
};
