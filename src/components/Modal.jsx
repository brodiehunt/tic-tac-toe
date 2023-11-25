import Button from './Button';
import iconO from '/src/assets/icon-o.svg';
import iconX from '/src/assets/icon-x.svg';


function Modal({ gameResult, togglePauseGame, refreshGame, refreshEntireAppState}) {
    
    const blue = {
        color: '#31C3BD'
    }
    const orange = {
        color: '#F2B137'
    }
    // If the game is paused manually or the result is a draw
    if (!gameResult || gameResult.result === 'draw') {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="winner">
                        <div className="who-wins">{!gameResult ? "RESTART GAME" : 'ROUND TIED'}</div>
                    </div>
                    <div className="modal-buttons">
                        {!gameResult ? 
                        (<Button className="btn quit" handleClick={togglePauseGame} value="NO, CANCEL"/>) :
                        (<Button className="btn quit" handleClick={refreshEntireAppState} value="QUIT"/>)
                        }
                        {!gameResult ? 
                        (<Button className="btn next" handleClick={refreshGame} value="YES, RESTART"/>) :
                        (<Button className="btn next" handleClick={refreshGame} value="NEXT ROUND"/>)
                        }
                        
                        
                    </div>
                </div>
            </div>
        )
    } else {
        // If the result is a win or loss
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="statement">
                    {gameResult.isComputer ? 
                    (gameResult.player === 'Player One' ? 'YOU WON!' : 'OH NO, YOU LOST...')
                    :
                    (gameResult.player === 'Player One' ? 'PLAYER 1 WINS!' : ' PLAYER 2 WINS!')
                    }
                    </div>
                    <div className="winner">
                        <img src={gameResult.piece == 'X' ? iconX : iconO} ></img>
                        <div className="who-wins" style={gameResult.piece == 'X' ? blue : orange}>TAKES THE ROUND</div>
                    </div>
                    <div className="modal-buttons">
                        <Button className="btn quit" handleClick={refreshEntireAppState} value="QUIT"/>
                        <Button className="btn next" handleClick={refreshGame} value="NEXT ROUND"/>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Modal;