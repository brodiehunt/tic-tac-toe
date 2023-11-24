import { useState } from 'react'
import iconO from '/src/assets/icon-o.svg';
import iconX from '/src/assets/icon-x.svg';
function Square({value, onSquareClick}) {
    
    if (value) {
        if (value === 'X') {
            value = iconX;
        } else {
            value = iconO;
        }
    }
    
    return (
        <button className="square" onClick={onSquareClick}>
            {value ? <img src={value}></img> : value }
        </button>
    )
}

export default Square;