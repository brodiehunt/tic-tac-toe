import Square from '/src/components/Square';
import {useState} from 'react';

function Board({xIsNext, squares, onPlay, isComputerTurn, returnRandomIndex, isPlayingComputer, gamePaused}) {
  const [winningSquares, setWinningSquares] = useState([]);
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = '0';
    onPlay(nextSquares, calculateWinner(nextSquares));
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for(let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningSquares([a, b, c])
        return true;
      }
    }
    setWinningSquares([]);
    return null;
  }

  if (!gamePaused && isPlayingComputer && isComputerTurn()) {
    // Delay state change of game until after board renders.
    setTimeout(() => {
      const randomComputerMove = returnRandomIndex();
      handleClick(randomComputerMove);
    }, 1000);
  }
  
  return (
    <>
        {squares.map((square, index) => {
            return (
                <Square 
                key={index} 
                value={square} 
                xIsNext={xIsNext} 
                onSquareClick={() => handleClick(index)}
                animateClass={winningSquares.includes(index) ? 'winning-square' : ''}
                />
            )
        })}
    </>
  )
}


  

export default Board;