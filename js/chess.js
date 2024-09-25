window.addEventListener('load', function() {
    // Keep the preloader visible for 5 seconds before hiding it
    setTimeout(function() {
      var preloader = document.getElementById('preloader');
      var content = document.getElementById('content');
      
      preloader.style.display = 'none';  // Hide the preloader
      content.style.display = 'block';   // Show the main content
    }, 3000);  // Delay of 5000 milliseconds (5 seconds)
  });

const audio = document.getElementById("bgMusic");

window.addEventListener("blur", () => {
    audio.pause();
  });
  
  // Resume the music when the window is focused again
  window.addEventListener("focus", () => {
    audio.play();
  });

const board = Chessboard('board', {
    draggable: true,
    position: 'start',
    pieceTheme: './img/chesspieces/alpha/{piece}.png',
    onDrop: onDrop
});

const game = new Chess();
let stockfish = new Worker('js/stockfish.js');
const moveSound = document.getElementById('moveSound');
const bgMusic = document.getElementById('bgMusic');
const timerDisplay = document.getElementById('timer');
const highScoreDisplay = document.getElementById('highScore');

let timerInterval;
let timeElapsed = 0; // Track elapsed time
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : Infinity; // Get high score from local storage

// Update high score display
function updateHighScoreDisplay() {
    if (highScore === Infinity) {
        highScoreDisplay.innerText = "High Score: ∞"; // Display if no high score exists
    } else {
        highScoreDisplay.innerText = `High Score: ${highScore}`; // Display current high score
    }
}

// Function to start the background music
function startBackgroundMusic() {
    bgMusic.play(); // Play the background music
}

// Function to update the timer
function updateTimer() {
    timeElapsed++; // Increment time
    timerDisplay.innerText = `Time: ${timeElapsed}`; // Update timer display
}

// Handle player's move
function onDrop(source, target) {
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (move === null) return 'snapback'; // Illegal move

    // Play sound
    moveSound.currentTime = 0; // Reset sound to start
    moveSound.play(); // Play the move sound

    // Start background music if not already playing
    if (bgMusic.paused) {
        startBackgroundMusic(); // Start playing music
        timerInterval = setInterval(updateTimer, 1000); // Start the timer
    }

    // Update board
    board.position(game.fen());

    // AI turn
    setTimeout(makeAIMove, 250);
}

// AI's move using Stockfish
function makeAIMove() {
    if (game.game_over()) {
        clearInterval(timerInterval); // Stop the timer when the game is over
        
        // Check for a new high score
        if (timeElapsed < highScore) {
            highScore = timeElapsed; // Update high score
            localStorage.setItem('highScore', highScore); // Save new high score to local storage
        }
        
        updateHighScoreDisplay(); // Update high score display
        alert('Game over');
        return;
    }

    stockfish.postMessage('position fen ' + game.fen());
    stockfish.postMessage('go depth 15');

    stockfish.onmessage = function(event) {
        const aiMove = event.data.split(' ')[1];
        game.move({
            from: aiMove.substring(0, 2),
            to: aiMove.substring(2, 4),
            promotion: 'q'
        });

        // Play sound for AI move
        moveSound.currentTime = 0; // Reset sound to start
        moveSound.play(); // Play the sound for AI move

        // Update board with AI move
        board.position(game.fen());

        if (game.game_over()) {
            clearInterval(timerInterval); // Stop the timer when the game is over
            
            // Check for a new high score
            if (timeElapsed < highScore) {
                highScore = timeElapsed; // Update high score
                localStorage.setItem('highScore', highScore); // Save new high score to local storage
            }
            
            updateHighScoreDisplay(); // Update high score display
            alert('Game over');
        }
    };
}

// Reset button handler
document.getElementById('resetButton').addEventListener('click', function() {
    game.reset();
    board.start();
    clearInterval(timerInterval); // Stop the timer on reset
    timeElapsed = 0; // Reset time elapsed
    timerDisplay.innerText = `Time: ${timeElapsed}`; // Reset timer display
});

// Initialize high score display on page load
updateHighScoreDisplay();


