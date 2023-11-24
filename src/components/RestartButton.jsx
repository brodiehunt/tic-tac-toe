import iconRestart from '/src/assets/icon-restart.svg';


function RestartButton({icon, handleClick, imgClass}) {
    
    return (
    
        <button className="restart-button" onClick={handleClick}>
            <img className={imgClass} src={icon}></img>
        </button>
    )
}

export default RestartButton;