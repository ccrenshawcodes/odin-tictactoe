const gameBoard = ['x','','','x','','','','o',''];

const playerList = [];

function Player (playerName, token) {
  return {
    playerName,
    token
  }
};

function renderBoard (board) {
  const slots = document.querySelectorAll('.slot');
  let counter = 0;

  board.forEach(item => {
    slots[counter].textContent = item;
    counter++;
  })
}

renderBoard(gameBoard);

function placeToken (board, position, player) {
  if (board[position] === '') {
    board[position] = player;
  } else {
    document.querySelector('.winner-message').textContent = 'this spot is already taken.';
  }
  renderBoard(board);
}

const slots = document.querySelectorAll('.slot');
slots.forEach(slot => {
  slot.addEventListener('click', () => {
    placeToken(gameBoard, slot.getAttribute('data-position'), 'C');
  })
})