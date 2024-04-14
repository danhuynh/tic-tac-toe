const cells = document.querySelectorAll('.cell');
let turn = 'X';
const boardState = Array(cells.length);
boardState.fill(null);

function restartGame() {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    turn = 'X'; // Reset the turn to X
    alert('Game restarted! X goes first.');
}

function makeMove(cell, index) {
    if (boardState[index] || isGameOver()) {
        return;
    }
    cell.textContent = turn;
    boardState[index] = turn;
    if (checkWinner()) {
        alert(turn + ' wins!');
        return;
    }
    // After checking for a winner, check if the game has ended in a tie
    if (isGameOver()) { // Check if all cells are filled and no winner
        alert('It\'s a tie!');
        return;
    }
    turn = turn === 'X' ? 'O' : 'X'; // Switch turn
}

function checkWinner() {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    return lines.some(line => {
        const [a, b, c] = line;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function isGameOver() {
    return boardState.every(cell => cell !== null); // Checks if all cells are filled
}
