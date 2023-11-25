import { useState } from 'react'
import iconO from '/src/assets/icon-o.svg';
import iconX from '/src/assets/icon-x.svg';
function Square({value, onSquareClick, xIsNext, animateClass}) {
    
    if (value) {
        if (value === 'X') {
            value = iconX;
        } else {
            value = iconO;
        }
    }
    function getClass(val) {
        if (!val && xIsNext) {
            return 'square empty x'
        } else if (!val && !xIsNext) {
            return 'square empty o'
        } 
        return 'square';
    }
    
    return (
        <button className={getClass(value)} onClick={onSquareClick}>
            {value ? <img className={animateClass} src={value}></img> : value }
        </button>
    )
}

export default Square;