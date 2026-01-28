// UNDERCOVER Game Logic
const playerForm = document.getElementById('player-form');
const playerNameInput = document.getElementById('player-name');
const addPlayerBtn = document.getElementById('add-player');
const playerList = document.getElementById('player-list');
const startGameBtn = document.getElementById('start-game');
const setupSection = document.getElementById('setup-section');
const wordSection = document.getElementById('word-section');
const wordInstructions = document.getElementById('word-instructions');
const nextPlayerBtn = document.getElementById('next-player');
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
let votes = [];

function updatePlayerList() {
	playerList.innerHTML = '';
	players.forEach((name, i) => {
		const li = document.createElement('li');
		li.textContent = name;
		playerList.appendChild(li);
	});
	startGameBtn.disabled = players.length < 3;
}

addPlayerBtn.onclick = function() {
	const name = playerNameInput.value.trim();
	if (name && !players.includes(name)) {
		players.push(name);
		updatePlayerList();
		playerNameInput.value = '';
	}
};

playerNameInput.addEventListener('keydown', function(e) {
	if (e.key === 'Enter') {
		e.preventDefault();
		addPlayerBtn.click();
	}
});

startGameBtn.onclick = function() {
	// Assign words
	const wordPair = words[Math.floor(Math.random() * words.length)];
	if (Math.random() < 0.5) {
		civilianWord = wordPair[0];
		undercoverWord = wordPair[1];
	} else {
		civilianWord = wordPair[1];
		undercoverWord = wordPair[0];
	}
	undercoverIndex = Math.floor(Math.random() * players.length);
	setupSection.style.display = 'none';
	wordSection.style.display = '';
	currentWordPlayer = 0;
	showWordForPlayer();
};

function showWordForPlayer() {
	if (currentWordPlayer < players.length) {
		wordInstructions.innerHTML = `<strong>${players[currentWordPlayer]}</strong>, click to see your word!`;
		nextPlayerBtn.textContent = 'Show Word';
		nextPlayerBtn.onclick = function() {
			let word = (currentWordPlayer === undercoverIndex) ? undercoverWord : civilianWord;
			wordInstructions.innerHTML = `<strong>Your word: ${word}</strong><br>Pass to the next player when ready.`;
			nextPlayerBtn.textContent = (currentWordPlayer === players.length - 1) ? 'Start Voting' : 'Next Player';
			nextPlayerBtn.onclick = function() {
				currentWordPlayer++;
				showWordForPlayer();
			};
		};
	} else {
		wordSection.style.display = 'none';
		startVoting();
	}
}

function startVoting() {
	voteSection.style.display = '';
	voteList.innerHTML = '';
	votes = Array(players.length).fill(0);
	players.forEach((name, i) => {
		const li = document.createElement('li');
		li.innerHTML = `<label><input type="radio" name="vote" value="${i}"> ${name}</label>`;
		voteList.appendChild(li);
	});
}

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
	} else {
		resultMessage.innerHTML = `<span style="color:red;">Wrong! <strong>${players[undercoverIndex]}</strong> was the UNDERCOVER with the word "${undercoverWord}".<br>You voted out <strong>${players[votedIndex]}</strong>.</span>`;
	}
};

restartBtn.onclick = function() {
	// Reset everything
	players = [];
	undercoverIndex = null;
	civilianWord = '';
	undercoverWord = '';
	currentWordPlayer = 0;
	votes = [];
	updatePlayerList();
	setupSection.style.display = '';
	wordSection.style.display = 'none';
	voteSection.style.display = 'none';
	resultSection.style.display = 'none';
};

// Initial state
updatePlayerList();
