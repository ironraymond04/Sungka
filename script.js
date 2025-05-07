const player1Store = document.getElementById('player1-store');
const player2Store = document.getElementById('player2-store');
const pits = document.querySelectorAll('.pit');
let currentPlayer = 1; // 1 for Player 1, 2 for Player 2

// Initial game setup
let board = new Array(14).fill(4); // Each pit starts with 4 stones

function updateBoard() {
    pits.forEach((pit, index) => {
        pit.textContent = board[index];
    });
    player1Store.textContent = board[7];
    player2Store.textContent = board[14];
}

function checkGameOver() {
    const player1Stones = board.slice(0, 7).reduce((a, b) => a + b, 0);
    const player2Stones = board.slice(7, 14).reduce((a, b) => a + b, 0);
    
    if (player1Stones === 0 || player2Stones === 0) {
        let winner = player1Stones > player2Stones ? 'Player 1' : 'Player 2';
        alert(`${winner} wins the game!`);
        resetGame();
    }
}

function handlePitClick(event) {
    const pitIndex = event.target.dataset.id;
    const currentPit = parseInt(pitIndex);

    // Check if the pit belongs to the current player and has stones to move
    if ((currentPlayer === 1 && currentPit >= 0 && currentPit <= 6) || 
        (currentPlayer === 2 && currentPit >= 7 && currentPit <= 13)) {
        if (board[currentPit] > 0) {
            let stones = board[currentPit];
            board[currentPit] = 0;
            let index = currentPit;

            // Distribute stones
            while (stones > 0) {
                index = (index + 1) % 14;
                if ((currentPlayer === 1 && index !== 13) || (currentPlayer === 2 && index !== 7)) {
                    board[index]++;
                    stones--;
                }
            }

            // Switch player turn
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            updateBoard();
            checkGameOver();
        }
    }
}

pits.forEach(pit => {
    pit.addEventListener('click', handlePitClick);
});

function resetGame() {
    board = new Array(14).fill(4);
    updateBoard();
    currentPlayer = 1;
}

updateBoard(); // Initial render