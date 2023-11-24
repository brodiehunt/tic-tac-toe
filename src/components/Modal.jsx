import ModalButton from './ModalButton';
import iconO from '/src/assets/icon-o.svg';
import iconX from '/src/assets/icon-x.svg';


function Modal({playerInfo, gameResult, togglePauseGame, refreshGame, refreshEntireAppState}) {
    console.log(playerInfo, gameResult);
    const blue = {
        color: '#31C3BD'
    }
    const orange = {
        color: '#F2B137'
    }

    if (!gameResult || gameResult.result === 'draw') {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="winner">
                        <div className="who-wins">{!gameResult ? "RESTART GAME" : 'ROUND TIED'}</div>
                    </div>
                    <div className="modal-buttons">
                        {!gameResult ? 
                        (<ModalButton className="btn quit" handleClick={togglePauseGame} value="NO, CANCEL"/>) :
                        (<ModalButton className="btn quit" handleClick={refreshEntireAppState} value="QUIT"/>)
                        }
                        {!gameResult ? 
                        (<ModalButton className="btn next" handleClick={refreshGame} value="YES, RESTART"/>) :
                        (<ModalButton className="btn next" handleClick={refreshGame} value="NEXT ROUND"/>)
                        }
                        
                        
                    </div>
                </div>
            </div>
        )
    } else {
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
                        <ModalButton className="btn quit" handleClick={refreshEntireAppState} value="QUIT"/>
                        <ModalButton className="btn next" handleClick={refreshGame} value="NEXT ROUND"/>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Modal;