import Square from '/src/components/Square';


function Board({xIsNext, squares, onPlay}) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      console.log('Calculate winner handle clik', calculateWinner(squares))
      return;
    }
    const nextSquares = squares.slice();
    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = '0';
    onPlay(nextSquares, calculateWinner(nextSquares));
  }
  
  return (
    <>
        {squares.map((square, index) => {
            return (
                <Square key={index} value={square} onSquareClick={() => handleClick(index)}/>
            )
        })}
    </>
  )
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
        return true;
      }
    }
    return null;
  }
  

export default Board;