

// contains methods to alter the display on the page
const displayController = (() => {
  const gameContainer = document.querySelector('.grid-game-container');

  const createNewGame = () => {
    gameContainer.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      let gridItem = document.createElement('div');
      gridItem.classList.add('grid-game-item');
      gridItem.id = i;
      gameContainer.appendChild(gridItem);
    }
  }

  const createPlayerInfo = (player, playerNumber) => {
    if (playerNumber === 1) {
      const infoContainerEl = document.querySelector('.player-1.info-container');
      infoContainerEl.style.display = 'flex';
      const playerNameDisplay = document.querySelector('.player-1.player-name');
      playerNameDisplay.innerText = player.getName();
      const playerWinDisplay = document.querySelector('.player-1.player-wins');
      playerWinDisplay.classList.add(`${player.getName()}`);
    } else {
      const infoContainerEl = document.querySelector('.player-2.info-container');
      infoContainerEl.style.display = 'flex';
      const playerNameDisplay = document.querySelector('.player-2.player-name');
      playerNameDisplay.innerText = player.getName();
      const playerWinDisplay = document.querySelector('.player-2.player-wins');
      playerWinDisplay.classList.add(`${player.getName()}`);
    }
   
  }

  const resetGame = () => {
    const gridItems = document.querySelectorAll('.grid-game-item');
    gridItems.forEach((item) => {
      item.innerText = '';
    })
  }

  const gridItemEventSetup = (turnAttempted) => {
    const gridItems = document.querySelectorAll('.grid-game-item');
    gridItems.forEach((item) => {
      item.addEventListener('click', turnAttempted);
    })
  }

  const addCharacter = (character, id) => {
    const clickedGrid = document.getElementById(id);
    clickedGrid.innerHTML = character;
  }

  const gameEndDraw = () => {
    const endGameModalEl = document.createElement('div');
    endGameModalEl.classList.add('draw-modal');

    const endGameMessageEl = document.createElement('p');
    endGameMessageEl.classList.add('modal-message');
    endGameMessageEl.innerText = 'It is a Draw!';

    const newGameButtonEl = document.createElement('button');
    newGameButtonEl.innerText = 'New Game';
    newGameButtonEl.classList.add('modal-button');
    newGameButtonEl.addEventListener('click', () => {
      endGameModalEl.remove();
      resetGame();
    })

    endGameModalEl.appendChild(endGameMessageEl);
    endGameModalEl.appendChild(newGameButtonEl);
    gameContainer.appendChild(endGameModalEl);

  }

  const gameEndWin = (winningPlayer) => {
    const endGameModalEl = document.createElement('div');
    endGameModalEl.classList.add('draw-modal');

    const endGameMessageEl = document.createElement('p');
    endGameMessageEl.classList.add('modal-message');
    endGameMessageEl.innerText = `${winningPlayer.getName()} Wins! Congratulations!`;

    const newGameButtonEl = document.createElement('button');
    newGameButtonEl.innerText = 'New Game';
    newGameButtonEl.classList.add('modal-button');
    newGameButtonEl.addEventListener('click', () => {
      endGameModalEl.remove();
      resetGame();
    })

    const winsDisplay = document.querySelector(`.${winningPlayer.getName()}`);
    winsDisplay.innerText = winningPlayer.getWins();
    endGameModalEl.appendChild(endGameMessageEl);
    endGameModalEl.appendChild(newGameButtonEl);
    gameContainer.appendChild(endGameModalEl);
  }

  return {createNewGame, addCharacter, gridItemEventSetup, gameEndDraw, gameEndWin, createPlayerInfo}

})();


const gameBoard = (() => {
  let gameBoardArr = Array(9).fill('');

  const checkWinOrDraw = (character) => {

    let gameWon = false;
    let gameDraw = false;

    const winningSequences = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]

    for (let i = 0; i < winningSequences.length; i++) {
      let completeSequence = winningSequences[i].every((val) => gameBoardArr[val] === character);
      if (completeSequence) {
        gameWon = true;
        break;
      }
    }
    
    if (!gameBoardArr.includes('') && !gameWon) {
      gameDraw = true;
    }
    
    return {gameWon, gameDraw};
  }

  const resetGameBoard = () => {
    gameBoardArr = Array(9).fill('');
  };

  const checkValid = (position) => {

    if (gameBoardArr[position] === '') {
      return true;
    } else {
      return false;
    }
  }

  const addTurn = (character, position) => {

    gameBoardArr[position] = character;
  }

  const playerTurn = (character, position) => {

    if (checkValid(position)) {
      addTurn(character, position);
      let gameWonOrDraw = checkWinOrDraw(character);
      return {gameBoardArr, gameWonOrDraw}
    } else {
      return false;
    }
  }

  const getBoard = () => {
    return gameBoardArr;
  }

  return {playerTurn, getBoard, resetGameBoard}

})();


const player = (name, character) => {
  let wins = 0; 
  const getName = () => {
    return name;
  };
  
  const getCharacter = () => {
    return character
  };

  const getWins = () => {
    return wins;
  };

  const addWin = () => {
    return wins++
  };

  return {getName, getCharacter, getWins, addWin};

}

const game = (player1, player2, board ) => {

  let currentPlayer = player1.getCharacter() === 'X' ? player1 : player2;

  //Switch current player after successful turn
  const switchCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }

  const turnAttempted = (event) => {
    
    let position = parseInt(event.target.id);
    let turnResult = gameBoard.playerTurn(currentPlayer.getCharacter(), position);

    if (turnResult) {

      displayController.addCharacter(currentPlayer.getCharacter(), position)
      if (turnResult.gameWonOrDraw.gameWon) {
        currentPlayer.addWin();
        gameEndWin(currentPlayer);
        return
      } else if (turnResult.gameWonOrDraw.gameDraw) {
        gameEndDraw();
        return
      }
      switchCurrentPlayer();
    } else {
      // get board to shake
      console.log('invalid move');
    }
  }

  const gameEndDraw = () => {
   
    displayController.gameEndDraw();
    gameBoard.resetGameBoard();
  }

  const gameEndWin = (winningPlayer) => {

    displayController.gameEndWin(winningPlayer);
    gameBoard.resetGameBoard();
    currentPlayer = player1.getCharacter() === 'X' ? player1 : player2;
  }


  displayController.createNewGame();
  displayController.gridItemEventSetup(turnAttempted);
  
}

const gamesController = () => {

}

function runNewGame(event) {
  event.preventDefault();
  const form = document.getElementById('new-game-form');
  const formModal = document.querySelector('.new-game-form-container');

  const player1Name = event.target[0].value;
  const player2Name = event.target[1].value;

  const firstPlayer = player(player1Name, 'X');
  const secondPlayer = player(player2Name, 'O');
  let currentGame = game(firstPlayer, secondPlayer);

  displayController.createPlayerInfo(firstPlayer, 1);
  displayController.createPlayerInfo(secondPlayer, 2);
  
  form.reset();
  formModal.style.display = 'none';
}

