

function ModalButton({value, className, handleClick}) {
    return (
        <button className={className} onClick={handleClick}>{value}</button>
    )
}

export default ModalButton;