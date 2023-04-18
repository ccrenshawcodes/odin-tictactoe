let gameBoard = {
    firstRow: ["", "", ""],
    secondRow: ["", "", ""],
    thirdRow: ["", "", ""]
};

const createPlayerArray = (() => {
    let playerArray = [];

    function Player (name, token) {
        return {
            name,
            token
        }
    }

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

    return { playerArray }
})();

//decides whose turn it is
const turnController = () => {
    let activePlayer = createPlayerArray.playerArray[0];

    const switchPlayerTurn = () => {
        if (activePlayer === createPlayerArray.playerArray[0]) {
            activePlayer = createPlayerArray.playerArray[1];
        } else {
            activePlayer = createPlayerArray.playerArray[0];
        }
    }
};

