const controlBoard = (() => {

  const gameBoard = ['x','','','x','','','','o',''];
  const getBoard = () => gameBoard;

  function placeToken (board, position, player) {
    if (board[position] === '') {
      board[position] = player;
      document.querySelector('.winner-message').textContent = '';
  
    } else {
      document.querySelector('.winner-message').textContent = 'this spot is already taken.';
    }
  }

  return {
    getBoard,
    placeToken,
  }

})();

const controlGameFlow = (() => {

  //  creating the list of players
  const playerList = [];

  function Player (playerName, token) {
    return {
      playerName,
      token
    }
  };

  function determineToken (arr) {
    if (arr.length <= 0) {
      return 'X';
    } else if (arr.length >= 1) {
      return 'O';
    }
  }

  const addNewPlayer = (() => {
    const addPlayerOne = document.querySelector('#add-player-one');
    const addPlayerTwo = document.querySelector('#add-player-two');
    let playerOneNameField = document.querySelector('#player-one');
    let playerTwoNameField = document.querySelector('#player-two');

    addPlayerOne.addEventListener('click', () => {
      playerList.push(Player(playerOneNameField.value, determineToken(playerList)));
    })

    addPlayerTwo.addEventListener('click', () => {
      playerList.push(Player(playerTwoNameField.value, determineToken(playerList)));
    })

  })();


  function checkForWinner (board) {
    //  code will go here
    //  it will be ugly. Guaranteed
  }

  return {
    playerList,
    checkForWinner,
  }

})();

const controlDisplay = (() => {

  function renderBoard (board) {
    const slots = document.querySelectorAll('.slot');
    let counter = 0;
  
    board.forEach(item => {
      slots[counter].textContent = item;
      counter++;
    })
  }
  renderBoard(controlBoard.getBoard());


  //  open and close the modal
  const openModal = document.querySelector('.start-game');
  openModal.addEventListener('click', () => {
    document.querySelector('.start-modal').style.display = 'block';
  })
  const closeBtn = document.querySelector('.exit');
  closeBtn.addEventListener('click', () => {
    document.querySelector('.start-modal').style.display = 'none';
  })
  
  //  adds event listeners to the slots to allow us to place tokens
  const slots = document.querySelectorAll('.slot');
  slots.forEach(slot => {
    slot.addEventListener('click', () => {
      controlBoard.placeToken(controlBoard.getBoard(), slot.getAttribute('data-position'), 'C'); //need to change the 'C' to something meaningful
      renderBoard(controlBoard.getBoard());
    })
  })
})();
