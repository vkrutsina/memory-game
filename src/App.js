import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


const NUMBER_INPUT = ['red', 'pink', 'yellow', 'orange', 'aqua', 'lime'];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

function App() {

  const [ board, setBoard ] = useState(() => shuffleArray([...NUMBER_INPUT, ...NUMBER_INPUT]));
  const [ selectedCells, setSelectedCells ] = useState([])
  const [ matchingCells, setMatchingCells ] = useState([])
  let hasWin = matchingCells.length === board.length ? true : false; 
  let header = hasWin ? 'You Won!' : 'Play Game'

  console.log('board', board, board.length)

  useEffect(() => {
    if(selectedCells.length < 2) return; 

    if(board[selectedCells[0]] === board[selectedCells[1]]) {
      console.log('in if')
      setMatchingCells([...matchingCells, ...selectedCells]);
      setSelectedCells([]);
    } else {
      console.log('in else')
      const timeoutId = setTimeout(() => setSelectedCells([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCells, matchingCells, board])


  const handleCellClick = (i) => {
    if(selectedCells.length >= 2 || selectedCells.includes(i))return; 
    setSelectedCells([...selectedCells, i]);
  } 

  const handleRestartGame = () => {
    setSelectedCells([]);
    setMatchingCells([]);
    setBoard(shuffleArray([...NUMBER_INPUT, NUMBER_INPUT]));

  }


  return (
    <div className="App">
      <header className="App-header">Memory Game!</header>
      <h2>{header}</h2>
      <div className='board-game'>
        {board.map((cell, index) => {
          let isTurnedOver = selectedCells.includes(index) || matchingCells.includes(index) ? true : false; 
          let classname = isTurnedOver ? `cell ${cell}` : 'cell';
           return (
            <div key={index} className={classname} onClick={() => handleCellClick(index)}></div>
           )
         }
        )}
      </div>
      {hasWin && <button onClick={handleRestartGame}>Restart Game</button>}
    </div>
  );
}

export default App;
