// This Component is finished

function GameInfo({isPlayingComputer, playerInfo}) {
    
    return (
        <div className="game-info">
            <div className="x-container container">
                <div className="player-piece">X 
                    <span>
                        {isPlayingComputer ? 
                            (playerInfo.playerOne.piece === 'X' ? ' (You)' : ' (Computer)') :
                            (playerInfo.playerOne.piece === 'X' ? ' (Player 1)' : ' (Player 2)')
                        }
                    </span>
                </div>
                <div className="stat">
                    {playerInfo.playerOne.piece === 'X' ? playerInfo.playerOne.wins : playerInfo.playerTwo.wins}
                </div>
            </div>
            <div className="ties-container container">
                <div className="player-piece">TIES</div>
                <div className="stat">{playerInfo.ties}</div>
            </div>
            <div className="o-container container">
                <div className="player-piece">O 
                    <span>
                        {isPlayingComputer ? 
                            (playerInfo.playerOne.piece === 'O' ? ' (You)' : ' (Computer)') :
                            (playerInfo.playerOne.piece === 'O' ? ' (Player 1)' : ' (Player 2)')
                        }
                    </span>
                </div>
                <div className="stat">
                {playerInfo.playerOne.piece === 'O' ? playerInfo.playerOne.wins : playerInfo.playerTwo.wins}
                </div>
            </div>
        </div>
    )
}

export default GameInfo;