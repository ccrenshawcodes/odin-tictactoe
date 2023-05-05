const createGamePieces = (() => {
  let gameBoard = {
    firstRow: ["a", "", ""],
    secondRow: ["", "b", "f"],
    thirdRow: ["", "c", ""]
  };

  const getBoard = () => gameBoard;

  let playerArray = [];

  function Player (name, token) {
      return {
          name,
          token
      }
  }

  const makePlayers = () => {
    for (let i = 0; i < 2; i++) {

      function promptForName () {
        return prompt('player name: ');
      }

      function determineToken () {
        if (i === 0) {
          return 'X';
        } else if (i === 1) {
          return 'O';
        }
      }
        
      playerArray.push(Player(promptForName(), determineToken()));
        
    }
    return playerArray;
  };

  return { 
    makePlayers,
    getBoard 
  };
})();


//should: place token, check win conditions, switch player
const turnController = (() => {
  const playerArray = createGamePieces.makePlayers();
  let activePlayer = playerArray[0];

  const switchPlayerTurn = () => {

      if (activePlayer === playerArray[0]) {
        activePlayer = playerArray[1];
      } else {
        activePlayer = playerArray[0];
      }
      console.log(activePlayer);
      return activePlayer;
  }

  const getActive = () => activePlayer;

  //updates the gameBoard object arrays
  const placeToken = (row, index, token) => {
    if (createGamePieces.getBoard()[row][index] === '') {
      createGamePieces.getBoard()[row].splice(index, 1, token);
      switchPlayerTurn();
    } else {
        alert('please choose another spot.');
    }
  }

  //win conditions
  //horizontal, vertical and diagonal
  //ugliest code ever. i hate it
  //I can use "every" for this...
  const checkForWinner = (board) => {
    for (const row in board) {
      if (board[row][0] !== '') {
        if (board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
          console.log(`Winner: ${board[row][0]}`);
        }
      }
    }
    
  for (let i = 0; i < 3; i++) {
    if (board.firstRow[i] !== '') {
      if (board.firstRow[i] === board.secondRow[i] && board.firstRow[i] === board.thirdRow[i]) {
      console.log(`winner! ${board.firstRow[i]}`);
    }
    }
  }

  if (board.firstRow[0] === board.secondRow[1] && board.firstRow[0] === board.thirdRow[2] && board.firstRow[0] !== '') {
    console.log(`winner! ${board.firstRow[0]}`);
  }

  if (board.firstRow[2] === board.secondRow[1] && board.firstRow[2] === board.thirdRow[0] && board.firstRow[2] !== '') {
    console.log(`winner! ${board.firstRow[2]}`);
  }

  };
  
  return { 
      placeToken,
      checkForWinner,
      getActive
  };
})();


const viewController = (() => {
  const boardSpace = document.querySelector('.game-board');

  //loop through the array values in gameBoard and
  //print them as buttons in the DOM
  const drawBoard = (obj, space) => {
    boardSpace.textContent = '';
    for (const arr in obj) {
      obj[arr].forEach((cell, index) => {
        console.log(cell);
        const slotBtn = document.createElement('button');
        slotBtn.classList.add('slot');
        slotBtn.textContent = cell;
        slotBtn.setAttribute('data-row', arr);
        slotBtn.setAttribute('id', index);
        space.appendChild(slotBtn);
      });
    }
  };
  drawBoard(createGamePieces.getBoard(), boardSpace); //i think this has to be here. somehow


  const playOnClick = (() => {
    const slot = document.querySelectorAll('.slot');
    slot.forEach(item => {
      item.addEventListener('click', () => {
        let itemRow = item.getAttribute('data-row');
        turnController.placeToken(itemRow, item.id, turnController.getActive().token);
        console.table(createGamePieces.getBoard());
        //console.log(turnController.activePlayer.token);
        //drawBoard(createGamePieces.getBoard(), boardSpace); //with this here, we can only click once
        turnController.checkForWinner(createGamePieces.getBoard());
        })
      })
  })();


})();

