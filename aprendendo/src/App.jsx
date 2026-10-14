import { useState } from 'react'
import './App.css'

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function WinnerModal({ winner, isDraw, onRestart }) {
  if (!winner && !isDraw) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{winner ? `🎉 O Ganhador foi: ${winner.toUpperCase()}` : "🤝 Deu Velha (Empate)!"}</h2>
        <button className="reset-button" onClick={onRestart}>
          Jogar Novamente
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares){
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

  for(let i = 0; i < lines.length; i++ ){
    const [a,b,c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;    
}

function isBoardFull(squares) {
  return squares.every((square) => square !== null);
}

function App() {
  const [nextSquare, setNextSquare] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [gameStarted, setGameStarted] = useState(false);
  
  const winner = calculateWinner(squares);
  const boardFull = isBoardFull(squares);
  let status;

  function handleClick(i){
    if(!gameStarted || squares[i] || winner || boardFull){
      return ;
    }

    const nextsquare = squares.slice();
    nextsquare[i] = nextSquare ? 'x': 'o';
    setSquares(nextsquare);
    setNextSquare(!nextSquare);
  }

  if (!gameStarted) {
    status = "Clique em 'Iniciar Jogo' para começar!";
  } else if (winner) {
    status = "O Ganhador foi: " + winner;
  } else if (boardFull) {
    status = "Deu Velha (Empate)!";
  } else {
    status = "Próximo jogador é: " + (nextSquare ? 'x': 'o' );
  }

  function handleStartGame() {
    setGameStarted(true);
    setSquares(Array(9).fill(null));
    setNextSquare(true);
  }

  return (
    <>
      <WinnerModal 
        winner={winner} 
        isDraw={boardFull} 
        onRestart={handleStartGame} 
      />

      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      
      <div style={{ display: 'flex', gap: '12px', marginTop: '15px' }}>
        {!gameStarted && (
          <button className="start-button" onClick={handleStartGame}>
            Iniciar Jogo
          </button>
        )}

        {gameStarted && (
          <button className="reset-button" onClick={handleStartGame}>
            Reiniciar Jogo
          </button>
        )}
      </div>

      <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#94a3b8' }}>
        Este jogo foi criado por Nicolas
      </p>
    </>
  )
}

export default App