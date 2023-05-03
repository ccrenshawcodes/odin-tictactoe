let gameBoard = {
    firstRow: ["a", "", ""],
    secondRow: ["", "b", ""],
    thirdRow: ["", "c", ""]
};

//prompt()s twice for player name.
//assigns a token based on whether it's the first or second name.
//pushes new Player objects to the playerArray 
//returns the array, accessible as createPlayerArray.makePlayer() outside the scope
const createPlayerArray = (() => {
    let playerArray = [];

    function Player (name, token) {
        return {
            name,
            token
        }
    }

    const makePlayer = () => {
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
  
    return { makePlayer };
})();

//should: place token, check win conditions, switch player
const turnController = (() => {
    const playerArray = createPlayerArray.makePlayer();
    let activePlayer = playerArray[0]; //can put .name or .token after the index
    let activeToken = activePlayer.token;
    const boardSpace = document.querySelector('game-board');

    //loop through the array values in gameBoard and
    //print them as buttons in the DOM
    //should probably be executed right away
    //for some reason it is not working. it works in codepen more or less
    //but is less nested there.
    const drawBoard = (obj, space) => {
      for (const arr in obj) {
        obj[arr].forEach((cell, index) => {
          const slotBtn = document.createElement('button');
          slotBtn.classList.add('slot');
          slotBtn.textContent = cell;
          slotBtn.setAttribute('id', index);
          space.appendChild(slotBtn);
        });
      }
    };
    drawBoard(gameBoard, boardSpace);

    const switchPlayerTurn = () => {
        if (activePlayer === playerArray[0]) {
            activePlayer = playerArray[1];
        } else {
            activePlayer = playerArray[0];
        }
        return activePlayer;
    }
    
    return { 
        switchPlayerTurn,
        activePlayer
    };
})();

//pass in:
//object.firstRow etc.,
//0-indexed index
//and player token (X or O)
function placeToken (row, index, token) {
    if (row[index] === '') {
      row.splice(index, 1, token);
    } else {
        alert('please choose another spot.');
    }
}

//win conditions
//horizontal, vertical and diagonal
//ugliest code ever. i hate it
//I can use "every" for this...
const checkForWinner = ((board) => {
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
  
})(gameBoard);