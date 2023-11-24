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
    const [currentMove, setCurrentMove] = useState(0);
    const [gamePaused, setGamePaused] = useState(false);
    const [gameResult, setGameResult] = useState(null);
    const currentSquares = history[currentMove];

    function togglePauseGame() {
      setGamePaused(!gamePaused);
    }
  
    function handlePlay(nextSquares, isWinner) {
      // Placing the square.
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      setXIsNext(!xIsNext);

      if (isWinner) {
        const winner = determineWinner();
        return endSingleGame(winner);
      }
      if (currentMove === 8) {
        return endSingleGame(null)
      }
    }

    function refreshEntireAppState() {
      refreshGame()
      refreshAppState()
    }

    function refreshGame() {
      setXIsNext(true);
      setHistory([Array(9).fill(null)]);
      setCurrentMove(0);
      setGamePaused(false);
      setGameResult(null);
    }

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
        setGamePaused(true);
        setGameResult(result) 
    }

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
  
    function moveBack() {
      if (currentMove === 0) {
        return;
      }
      setCurrentMove(currentMove - 1);
      setXIsNext(!xIsNext);
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
            <RestartButton handleClick={moveBack}/>
            <RestartButton icon={iconRestart} handleClick={togglePauseGame}/>
          </div>
          
        </div>
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <GameInfo isPlayingComputer={isPlayingComputer} playerInfo={playerInfo}/>
        
      </div>
    )
  }
  
  export default Game