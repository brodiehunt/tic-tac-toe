import iconRestart from '/src/assets/icon-restart.svg';


function RestartButton({icon, handleClick}) {
    
    return (
    
        <button className="restart-button" onClick={handleClick}>
            <img src={icon}></img>
        </button>
    )
}

export default RestartButton;