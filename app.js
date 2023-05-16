const createGamePieces = (() => {
  let gameBoard = {
    firstRow: ["", "", ""],
    secondRow: ["", "", ""],
    thirdRow: ["", "", ""]
  };

  function Player (name, token) {
      return {
          name,
          token
      }
  };

  let playerArray = [];

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

  const getBoard = () => gameBoard;

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
      return activePlayer;
  }

  const getActive = () => activePlayer;

/*   function endGame (winner, display, myFunc) {
    display.forEach(item => {
      item.removeEventListener('click', myFunc);
      alert(`${winner} wins!`);
    })
  } */

  const checkForWinner = (board) => {

    let result = false;

    for (const row in board) {
      const horizontalCompareVal = board[row][0];
      if (horizontalCompareVal !== '') {
        if (horizontalCompareVal === board[row][1] && horizontalCompareVal === board[row][2]) {
          console.log(`winner: ${horizontalCompareVal}`); 
          result = true;
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      const verticalCompareVal = board.firstRow[i];
      if (verticalCompareVal !== '') {
        if (verticalCompareVal === board.secondRow[i] && verticalCompareVal === board.thirdRow[i]) {
          console.log(`winner: ${verticalCompareVal}`);
          result = true;
      }
      }
    }

    if (board.firstRow[0] === board.secondRow[1] && board.firstRow[0] === board.thirdRow[2] && board.firstRow[0] !== '') {
      console.log(`winner: ${board.firstRow[0]}`);
      result = true;
    }
  
    if (board.firstRow[2] === board.secondRow[1] && board.firstRow[2] === board.thirdRow[0] && board.firstRow[2] !== '') {
      console.log(`winner: ${board.firstRow[2]}`);
      result = true;
    }

/*     const checkForTie = (() => {
      let resultsArr = [];
      for (const arr in board) {
        let result = board[arr].every(item => item !== ''); //what am I doing here
        resultsArr.push(result);
        console.log(resultsArr);
      }
    })(board); */
    console.log(`result var in turncontroller: ${result}`);
    return result;
  };

  //updates the gameBoard object arrays
  const placeToken = (row, index, token) => {
    if (createGamePieces.getBoard()[row][index] === '') {
      createGamePieces.getBoard()[row].splice(index, 1, token);
      switchPlayerTurn();
    } else {
        alert('please choose another spot.');
    }

    //checkForWinner(createGamePieces.getBoard());
  }
  
  return { 
      placeToken,
      getActive, 
      //endGame,
      checkForWinner
  }

})();


const viewController = (() => {
  const btns = document.querySelectorAll('.slot');

  function drawBoard(obj, nodes) {
    let counter = 0;
    for (const arr in obj) {
      obj[arr].forEach((cell, index) => {
        nodes[counter].textContent = cell;
        nodes[counter].setAttribute('data-row', arr);
        counter++;
/*         console.log(`done variable: ${done}`);
        console.table(`current board: ${createGamePieces.getBoard().firstRow}`); */

      })
    }
  };
  
  drawBoard(createGamePieces.getBoard(), btns);

  const playOnClick = () => {

    const endGame = () => {
      btns.forEach(item => {
        console.log(`endgame's item: ${item}`);
        item.removeEventListener('click', listening);
      })
    }

    const listening = (e) => {
      let itemRow = e.target.getAttribute('data-row');
      let itemPosition = e.target.getAttribute('data-position');
      turnController.placeToken(itemRow, itemPosition, turnController.getActive().token);
      drawBoard(createGamePieces.getBoard(), btns);
      const done = turnController.checkForWinner(createGamePieces.getBoard());
      console.log(`this is done! ${done}`);
      if (done === true) {
        endGame();
      }
    }  


    const placeListeners = () => {
      btns.forEach(item => {
        console.log(`adding event listeners here`);
        item.addEventListener('click', listening)
/*           let itemRow = item.getAttribute('data-row');
          let itemPosition = item.getAttribute('data-position');
          turnController.placeToken(itemRow, itemPosition, turnController.getActive().token);
          drawBoard(createGamePieces.getBoard(), btns); */

          
        })
    }
    placeListeners();

  };
  playOnClick();

  //turnController.endGame(turnController.checkForWinner(), btns, playOnClick());

})();
