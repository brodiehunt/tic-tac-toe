import { useState } from 'react'
import './App.css'

import Game from './components/Game';
import Menu from './components/Menu';
function App() {
  const players = {
    playerOne: { piece: 'X', wins: 0 },
    playerTwo: { piece: 'O', wins: 0 },
    ties: 0
  }
  const [playersInfo, setPlayersInfo] = useState(players);
  const [isPlayingComputer, setIsPlayingComputer] = useState(false);
  const [seriesInPlay, setSeriesInPlay] = useState(false);

  // Refresh state to original - passed to Game - called in refreshEntireAppState
  function refreshAppState() {
    setPlayersInfo(players);
    setIsPlayingComputer(false);
    setSeriesInPlay(false);
  }

  // Switch state of player peice - toggled in menu component by checkbox
  function handleChangePlayerPiece() {
    const { playerOne, playerTwo } = playersInfo;
    const newPlayerInfo = {
      playerOne: {
        piece: playerTwo.piece,
        wins: playerOne.wins
      },
      playerTwo: {
        piece: playerOne.piece,
        wins: playerTwo.wins
      },
      ties: 0
    }
    setPlayersInfo(newPlayerInfo);
  }

  // Update player scores when game has finished. - called in endSingleGame
  function updatePlayerScores(result) {
    const { playerOne, playerTwo, ties} = playersInfo;
    let newPlayerInfo;

    if (result === 'draw') {
      newPlayerInfo = {
        playerOne,
        playerTwo,
        ties: ties + 1
      }
    } else if (result.piece == playerOne.piece) {
      newPlayerInfo = {
        playerOne: { ...playerOne, wins: playerOne.wins + 1} ,
        playerTwo,
        ties
      };
    } else {
      newPlayerInfo = {
        playerOne,
        playerTwo: { ...playerTwo, wins: playerTwo.wins + 1 },
        ties
      }
    }
    setPlayersInfo(newPlayerInfo);
  }

  // Menu button new game with cpu callback
  function newGameCpuClick() {
    setIsPlayingComputer(true);
    setSeriesInPlay(true);
  }

  // Menu button new game with other player callback
  function newGamePlayerClick() {
    setSeriesInPlay(true)
  }

  return (
    <div className="main-container">
      {seriesInPlay ? 
        <Game 
          playerInfo={playersInfo}
          isPlayingComputer={isPlayingComputer} 
          updatePlayerScores={updatePlayerScores}
          refreshAppState={refreshAppState}
        /> : 
        <Menu 
          newGameCpu={newGameCpuClick}
          newGamePlayer={newGamePlayerClick}
          handleChangePlayerPiece={handleChangePlayerPiece} 
          playerOne={playersInfo.playerOne}
        />
        }
    </div>
  )
}

export default App
