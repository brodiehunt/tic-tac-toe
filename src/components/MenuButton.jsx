function MenuButton({value, handleClick, className}) {
    
    return (
        <button className={className} onClick={handleClick}>{value}</button>
    )
}

export default MenuButton;