import { useState } from 'react'
import './App.css'

import Game from './components/Game';
import Menu from './components/Menu';
function App() {
  const players = {
    playerOne: {
      piece: 'X',
      wins: 0
    },
    playerTwo: {
      piece: 'O',
      wins: 0
    },
    ties: 0
  }
  const [playersInfo, setPlayersInfo] = useState(players);
  const [isPlayingComputer, setIsPlayingComputer] = useState(false);
  const [seriesInPlay, setSeriesInPlay] = useState(false);

  function refreshAppState() {
    setPlayersInfo(players);
    setIsPlayingComputer(false);
    setSeriesInPlay(false);
  }

  function handleChangePlayerPiece() {
    const newPlayerInfo = {
      playerOne: {
        piece: playersInfo.playerTwo.piece,
        wins: playersInfo.playerOne.wins
      },
      playerTwo: {
        piece: playersInfo.playerOne.piece,
        wins: playersInfo.playerTwo.wins
      },
      ties: 0
    }
    setPlayersInfo(newPlayerInfo);
  }

  function updatePlayerScores(result) {
    let newPlayerInfo;
    if (result === 'draw') {
      newPlayerInfo = {
        playerOne: {
          piece: playersInfo.playerOne.piece,
          wins: playersInfo.playerOne.wins
        },
        playerTwo: {
          piece: playersInfo.playerTwo.piece,
          wins: playersInfo.playerTwo.wins
        },
        ties: playersInfo.ties + 1
      }
    } else if (result.piece == playersInfo.playerOne.piece) {
      newPlayerInfo = {
        playerOne: {
          piece: playersInfo.playerOne.piece,
          wins: playersInfo.playerOne.wins + 1
        },
        playerTwo: {
          piece: playersInfo.playerTwo.piece,
          wins: playersInfo.playerTwo.wins
        },
        ties: playersInfo.ties
      }
    } else {
      newPlayerInfo = {
        playerOne: {
          piece: playersInfo.playerOne.piece,
          wins: playersInfo.playerOne.wins
        },
        playerTwo: {
          piece: playersInfo.playerTwo.piece,
          wins: playersInfo.playerTwo.wins + 1
        },
        ties: playersInfo.ties
      }
    }
    setPlayersInfo(newPlayerInfo);
  }

  function newGameCpuClick() {
    setIsPlayingComputer(true);
    setSeriesInPlay(true);
  }

  function newGamePlayerClick() {
    setSeriesInPlay(true)
  }

  if (seriesInPlay) {
    return (
      <div className="main-container">
        <Game 
        playerInfo={playersInfo}
        isPlayingComputer={isPlayingComputer} 
        updatePlayerScores={updatePlayerScores}
        refreshAppState={refreshAppState}
        />
      </div>
    )
  } else {
    return (
      <div className="main-container">
        <Menu 
        newGameCpu={newGameCpuClick}
        newGamePlayer={newGamePlayerClick}
        handleChangePlayerPiece={handleChangePlayerPiece} 
        playerOne={playersInfo.playerOne}/>
      </div>
      
    )
  }
}

export default App
