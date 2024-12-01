//new test 
// 1) Define the required variables used to track the state of the game.
let board, turn, winner, tie;

// 2) Store cached element references.
const squareEls = document.querySelectorAll('.square');
const messageEl = document.querySelector('.message');
const resetBtnEl = document.getElementById('reset');

// 5) Define the required constants.
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],


    
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// 3) Upon loading, the game state should be initialized, and a function should be called to render this game state.
function init() {
    console.log('Initializing game...');
    board = ['', '', '', '', '', '', '', '', '']; // Reset the board
    turn = 'X'; // Start with player X
    winner = false; // No winner yet
    tie = false; // No tie yet
    render(); // Render the initial state
}

// 4) The state of the game should be rendered to the user.
function render() {
    updateBoard(); // Update the board visually
    updateMessage(); // Update the game message
}

function updateBoard() {
    board.forEach((cell, index) => {
        squareEls[index].textContent = cell; // Set the text content for each square
    });
}

function updateMessage() {
    if (winner) {
        messageEl.textContent = `Player ${turn} wins!`; // Display winner message
    } else if (tie) {
        messageEl.textContent = "It's a tie!"; // Display tie message
    } else {
        messageEl.textContent = `Player ${turn}'s turn.`; // Display turn message
    }
}

// 6) Handle a player clicking a square with a handleClick function.
function handleClick(event) {
    const squareIndex = parseInt(event.target.id); // Get the index of the clicked square

    if (board[squareIndex] || winner) return; // Ignore clicks if square is taken or game is over

    placePiece(squareIndex); // Place the player's piece
    checkForWinner(); // Check if the move caused a win
    checkForTie(); // Check if the move caused a tie
    switchPlayerTurn(); // Switch to the next player's turn
    render(); // Update the game state visually
}

function placePiece(index) {
    board[index] = turn; // Update the board at the clicked square
    console.log(board); // Log the board for debugging
}

function checkForWinner() {
    winner = winningCombos.some(combo => 
        board[combo[0]] && 
        board[combo[0]] === board[combo[1]] && 
        board[combo[0]] === board[combo[2]]
    );
}


function checkForTie() {
    if (winner) return; // No tie if there's a winner
    tie = !board.includes(''); // Check if there are no empty squares left
}

function switchPlayerTurn() {
    if (winner) return; // Don't switch turns if someone has won

    // Switch between X and O
    if(turn === 'X') {
        turn = 'O';
    } 
    else {
        turn = 'X';
    } 
}

// Add event listeners to each square
squareEls.forEach(square => {
    square.addEventListener('click', handleClick); // Attach click event listener
});

// Reset the game when the reset button is clicked
resetBtnEl.addEventListener('click', init);

// Initialize the game when the page loads
init();