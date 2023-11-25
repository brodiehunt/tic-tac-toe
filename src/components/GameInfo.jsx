
function GameInfo({isPlayingComputer, playerInfo}) {
    const {playerOne, playerTwo, ties} = playerInfo;
    return (
        <div className="game-info">
            <div className="x-container container">
                <div className="player-piece">X 
                    <span>
                        {isPlayingComputer ? 
                            (playerOne.piece === 'X' ? ' (You)' : ' (Computer)') :
                            (playerOne.piece === 'X' ? ' (Player 1)' : ' (Player 2)')
                        }
                    </span>
                </div>
                <div className="stat">
                    {playerOne.piece === 'X' ? playerOne.wins : playerTwo.wins}
                </div>
            </div>
            <div className="ties-container container">
                <div className="player-piece">TIES</div>
                <div className="stat">{ties}</div>
            </div>
            <div className="o-container container">
                <div className="player-piece">O 
                    <span>
                        {isPlayingComputer ? 
                            (playerOne.piece === 'O' ? ' (You)' : ' (Computer)') :
                            (playerOne.piece === 'O' ? ' (Player 1)' : ' (Player 2)')
                        }
                    </span>
                </div>
                <div className="stat">
                {playerOne.piece === 'O' ? playerOne.wins : playerTwo.wins}
                </div>
            </div>
        </div>
    )
}

export default GameInfo;