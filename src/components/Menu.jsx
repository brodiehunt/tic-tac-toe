import Logo from '/src/components/Logo';
import iconO from '/src/assets/icon-o.svg'
import iconX from '/src/assets/icon-x.svg'
import MenuButton from '/src/components/MenuButton'
function Menu({handleChangePlayerPiece, newGameCpu, newGamePlayer, playerOne}) {



    return (
        <div className="menu">
            <Logo />
            <div className="pick-player-container">
                <p className="instructions">Pick Player 1's Mark</p>
                <div className="toggle-box">
                    <label htmlFor="input-checkbox" className="toggle-input"></label>
                    <input className="toggle-input" onChange={handleChangePlayerPiece} type="checkbox" id="input-checkbox"></input>
                    <div className="toggle-slider">
                        <div className={playerOne.piece === 'X' ? "active" : ""}>
                            <img src={iconX} className="icon" alt="Tic-tac-toe Logo" />
                        </div>
                        <div className={playerOne.piece === 'O' ? "active" : ""}>
                            <img src={iconO} className="icon" alt="Tic-tac-toe Logo" />
                        </div>
                    
                    </div>
                </div>
                <p className="hint">Remember: X goes first</p>
            </div>
            <MenuButton handleClick={newGameCpu} className="btn menu secondary" value="NEW GAME (VS CPU)"/>
            <MenuButton handleClick={newGamePlayer} className="btn menu primary" value="NEW GAME (VS PLAYER)"/>
        </div>
    )
}

export default Menu;