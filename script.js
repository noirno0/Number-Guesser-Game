const MAX_GUESSES = 7;

let secret = 0;
let guessesUsed = 0;

// Grab the elements by their ids
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const startBtn = document.getElementById("start-btn");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");

const guessInput = document.getElementById("guess-input");
const guessCount = document.getElementById("guess-count");
const message = document.getElementById("message");
const endTitle = document.getElementById("end-title");
const endMessage = document.getElementById("end-message");

// Show one screen and hide the other two
function showScreen(screen) {
    startScreen.classList.add("hidden");
    gameScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    screen.classList.remove("hidden");
}

// Pure game logic: no page code in here
function checkGuess(secret, guess) {
    if (guess === secret) {
        return "correct";
    } else if (guess > secret) {
        return "high";
    } else {
        return "low";
    }
}

// New random number and fresh counter, once per game
function newGame() {
    secret = Math.floor(Math.random() * 100) + 1;
    guessesUsed = 0;
    guessInput.value = "";
    message.textContent = "";
    guessCount.textContent = `Guess 1 of ${MAX_GUESSES}`;
    showScreen(gameScreen);
    guessInput.focus();
}

function endGame(won) {
    if (won) {
        endTitle.textContent = "You won!";
        endMessage.textContent = `You got it in ${guessesUsed} guesses. The number was ${secret}.`;
    } else {
        endTitle.textContent = "Game over";
        endMessage.textContent = `You ran out of guesses. The number was ${secret}.`;
    }
    showScreen(endScreen);
}

function handleGuess() {
    const text = guessInput.value.trim();

    // Number("") is 0, so check for empty first
    if (text === "") {
        message.textContent = "Please enter a number.";
        return;
    }

    const guess = Number(text);

    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
        message.textContent = "Enter a whole number from 1 to 100.";
        return;
    }

    guessesUsed++;
    const result = checkGuess(secret, guess);

    if (result === "correct") {
        endGame(true);
        return;
    }

    if (guessesUsed === MAX_GUESSES) {
        endGame(false);
        return;
    }

    message.textContent = result === "high" ? "Too high" : "Too low";
    guessCount.textContent = `Guess ${guessesUsed + 1} of ${MAX_GUESSES}`;
    guessInput.value = "";
    guessInput.focus();
}

// Connect buttons to functions
startBtn.addEventListener("click", newGame);
restartBtn.addEventListener("click", newGame);
guessBtn.addEventListener("click", handleGuess);

// Press Enter to guess
guessInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleGuess();
    }
});