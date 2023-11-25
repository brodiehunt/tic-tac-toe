import { useState } from 'react'
import Board from '/src/components/Board';
import GameInfo from './GameInfo';
import Modal from './Modal';
import Logo from '/src/components/Logo';
import RestartButton from './RestartButton';
import iconO from '/src/assets/icon-o.svg';
import iconX from '/src/assets/icon-x.svg';
import iconRestart from '/src/assets/icon-restart.svg';

function Game({playerInfo, isPlayingComputer, updatePlayerScores, refreshAppState}) {

    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [gamePaused, setGamePaused] = useState(false);
    const [gameResult, setGameResult] = useState(null);
    const currentMove = history.length - 1;
    const currentSquares = history[currentMove];
  
    // Toggles Modal (when game finished or user presses restart button on gameboard)
    function togglePauseGame() {
      setGamePaused(!gamePaused);
    }
  
    // Handle history and xIsNext state when user (or computer makes move) - ends game if winner or all moves taken
    function handlePlay(nextSquares, isWinner) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
      setHistory(nextHistory);
      setXIsNext(!xIsNext);

      if (isWinner) {
        const winner = determineWinner();
        return endSingleGame(winner);
      }
      if (currentMove === 8) {
        return endSingleGame(null)
      }
    }

    // Entire series state refresh (All state in this function and in App function) - when players click 'quit'
    function refreshEntireAppState() {
      refreshGame()
      refreshAppState()
    }

    // Refresh all state in this function - when user click 'restart game' or 'next round'
    function refreshGame() {
      setXIsNext(true);
      setHistory([Array(9).fill(null)]);
      setGamePaused(false);
      setGameResult(null);
    }

    // Determines game result and builds object to pass to modal to display correct info
    // Updates playersInfo state from App
    function endSingleGame(winner) {
      const result = {...winner}
      if (winner) {
        result.result = 'win';
        result.isComputer = isPlayingComputer;
        updatePlayerScores(result);
      } else {
        result.result = 'draw';
        updatePlayerScores('draw');
      }
      setTimeout(() => {
        setGamePaused(true);
        setGameResult(result);
      }, 500)
         
    }

    // The determines the winning piece and the winning player who has been assigned this piece
    // returns object with player info to be used in end Single game func
    function determineWinner() {
      const winnerPiece = currentMove % 2 === 0 ? 'X' : 'O';
        let winner;
        if (playerInfo.playerOne.piece === winnerPiece) {
          winner = {...playerInfo.playerOne, player: 'Player One'}
          
        } else {
          winner = {...playerInfo.playerTwo, player: 'Player Two'}
        }
        return winner;
    }
    
    // Change current move back one - pop the latest array off history, flip xIsNextBoolean
    function moveBack() {
      if (currentMove === 0) {
        return;
      }
      setHistory(history.slice(0, history.length - 1));
      setXIsNext(!xIsNext);
    }

    // Determines if it is the computers turn
    // Player 1 is always human - if the current val (xIsNext) == player2s peice then it is the computers turn
    function isComputerTurn() {
      if (isPlayingComputer && xIsNext && playerInfo.playerTwo.piece === 'X') {
        return true
      }
      if (isPlayingComputer && !xIsNext && playerInfo.playerTwo.piece === 'O') {
        return true
      }
      return false;
    }

    // Builds an array of index values that represent the indexes of null elements in the 
    // most recent history subArray
    // Selects one of these indexs at random and returns it (to be used for computer move)
    function returnRandomIndex() {
        let nullIndexes = history[history.length - 1].map((item, index) => {
          return item === null ? index : null;
        }).filter(index => index !== null); 
        const randomIndex = Math.floor(Math.random() * (nullIndexes.length -1))
        const indexToSimulateClick = nullIndexes[randomIndex];
        return indexToSimulateClick;
    }

   

  
    return (

      <div className="game">
        {gamePaused && <Modal 
        playerInfo={playerInfo} 
        gameResult={gameResult}
        togglePauseGame={togglePauseGame}
        refreshGame={refreshGame}
        refreshEntireAppState={refreshEntireAppState}
        />}
        <div className="top-container">
          <Logo />
          <div className="turn-container">
            <img src={xIsNext ? iconX : iconO} ></img>
            <span>TURN</span>
          </div>
          <div className="game-buttons">
            <RestartButton imgClass="reverse" icon={iconRestart} handleClick={moveBack}/>
            <RestartButton imgClass="normal" icon={iconRestart} handleClick={togglePauseGame}/>
          </div>
          
        </div>
        <div className="game-board">
          <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay}
          isComputerTurn={isComputerTurn}
          returnRandomIndex={returnRandomIndex}
          isPlayingComputer={isPlayingComputer}
          gamePaused={gamePaused}
          />
        </div>
        <GameInfo isPlayingComputer={isPlayingComputer} playerInfo={playerInfo}/>
        
      </div>
    )
  }
  
  export default Game