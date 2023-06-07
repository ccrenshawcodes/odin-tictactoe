const controlBoard = (() => {

  let gameBoard = ['','','','','','','','',''];
  const getBoard = () => gameBoard;

  const resetBoard = () => gameBoard = ['','','','','','','','',''];

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
    resetBoard,
  }

})();

const controlGameFlow = (() => {

  let playerList = [];

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
      playerOneNameField.disabled = true;
      addPlayerOne.style.display = 'none';
      activePlayer = playerList[0];
    })

    addPlayerTwo.addEventListener('click', () => {
      playerList.push(Player(playerTwoNameField.value, determineToken(playerList)));
      playerTwoNameField.disabled = true;
      addPlayerTwo.style.display = 'none';
    })

  })();

  const clearPlayers = () => {
    playerList = [];
  }

  let activePlayer = playerList[0];
  const switchPlayer = () => {
    activePlayer === playerList[0] ? activePlayer = playerList[1] : activePlayer = playerList[0];
  };

  const getActive = () => activePlayer;

  function checkForWinner (board) {
    if (
      // horizontal
      (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) ||
      (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) ||
      (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) ||
      //  vertical
      (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) ||
      (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) ||
      (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) ||
      //  diagonal
      (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) ||
      (board[2] !== '' && board[2] === board[4] && board[2] === board[6])
    ) {
      return true;
    } else if (!board.includes('')) { //handle tie
      return 'tie';
    }
  }

  return {
    checkForWinner,
    playerList,
    getActive,
    switchPlayer,
    clearPlayers,
  }

})();


const controlDisplay = (() => {
  const slots = document.querySelectorAll('.slot');
  const winnerMessage = document.querySelector('.winner-message');
  const turnReminder = document.querySelector('.turn-display');


  function renderBoard (board) {
    let counter = 0;
  
    board.forEach(item => {
      slots[counter].textContent = item;
      counter++;
    })
  }
  renderBoard(controlBoard.getBoard());

  const endGame = () => {
    turnReminder.textContent = '';
    slots.forEach(slot => {
      slot.removeEventListener('click', handleClick);
    })
  }

  const handleClick = (e) => {
    controlBoard.placeToken(controlBoard.getBoard(), e.target.getAttribute('data-position'), controlGameFlow.getActive().token);
    renderBoard(controlBoard.getBoard());

    const done = controlGameFlow.checkForWinner(controlBoard.getBoard());
    if (done === true || done === 'tie') {
      endGame();
      if (done === true) {
        winnerMessage.textContent = `Winner: ${controlGameFlow.getActive().playerName}!`;
      } else if (done === 'tie') {
        winnerMessage.textContent = `It's a tie!`;
      } 
    } else {
      controlGameFlow.switchPlayer(); 
      turnReminder.textContent = "It is " + controlGameFlow.getActive().playerName + "'s turn!";
    }


  }

  const enableButtons = () => {
    slots.forEach(slot => {
      slot.addEventListener('click', handleClick)
    })
  }

  //  open and close the modal
  const openModal = document.querySelector('.start-game');
  openModal.addEventListener('click', () => {
    document.querySelector('.start-modal').style.display = 'block';
  })
  const closeBtn = document.querySelector('.exit');
  closeBtn.addEventListener('click', () => {
    document.querySelector('.start-modal').style.display = 'none';
  })

  const startBtn = document.querySelector('.play-game');
  startBtn.addEventListener('click', () => {
    document.querySelector('.start-modal').style.display = 'none';
    enableButtons();
    document.querySelector('.game-board').style.display = 'grid';
    turnReminder.textContent = "It is " + controlGameFlow.getActive().playerName + "'s turn!";
  })

  const resetBtn = document.querySelector('.reset');
  resetBtn.addEventListener('click', () => {
    endGame();
    controlBoard.resetBoard();
    renderBoard(controlBoard.getBoard());
    controlGameFlow.clearPlayers();
    document.querySelector('.game-board').style.display = 'none';
    document.querySelector('.winner-message').textContent = '';

    const addPlayerOne = document.querySelector('#add-player-one');
    const addPlayerTwo = document.querySelector('#add-player-two');
    let playerOneNameField = document.querySelector('#player-one');
    let playerTwoNameField = document.querySelector('#player-two');
    addPlayerOne.style.display = 'block';
    addPlayerTwo.style.display = 'block';
    playerOneNameField.value = '';
    playerOneNameField.disabled = false;
    playerTwoNameField.value = '';
    playerTwoNameField.disabled = false;

  })

})();
