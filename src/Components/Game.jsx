import React from 'react';
import Board from './Board';
import styles from './Game.module.css'
import { useState, useEffect } from 'react';

function Game() {
  const [boardSize, setBoardSize] = useState(5); 
  const [board, setBoard] = useState(Array(boardSize).fill().map(() => new Array(boardSize).fill(null)))
  const [winner, setWinner] = useState(null);
  const [move, setMove] = useState(0);
  const xIsNext = Boolean(move %2 === 0);
  const [history, setHistory] = useState([]);

  const handleMove = (r,c) => {
    if(!board[r][c] && !winner) {
      const newBoard = JSON.parse(JSON.stringify(Array.from(board)));
      newBoard[r][c] = xIsNext ? 'X' : 'O';
      setBoard(newBoard);
      setMove(move+1)
      const newHistory = JSON.parse(JSON.stringify(history.slice(0, move+1)));
      newHistory.push({board: newBoard, move});
      setHistory(newHistory);
    }
  }

  const resetGame = () => {
    setBoard(Array(boardSize).fill().map(() => new Array(boardSize).fill(null)));
    setWinner(null);
    setHistory([]);
    setMove(0);
  }

  const jumpTo = (move) => {
    move < history.length && setBoard(history[move].board);
    move < history.length && setMove(move+1);
  }

  useEffect(() => {
    const calculateWinner = () => {
      const n = board.length;

      // Helper function to check if all elements in an array are the same and not null
      function allSame(arr) {
        return arr.every(val => val !== null && val === arr[0]);
      }

      // Check rows
      for (let i = 0; i < n; i++) {
        if (allSame(board[i])) {
            return board[i][0];
        }
      }

      // Check columns
      for (let j = 0; j < n; j++) {
        const column = board.map(row => row[j]);
        if (allSame(column)) {
            return column[0];
        }
      }

      // Check main diagonal
      const mainDiagonal = [];
      for (let i = 0; i < n; i++) {
        mainDiagonal.push(board[i][i]);
      }
      if (allSame(mainDiagonal)) {
        return mainDiagonal[0];
      }

      // Check anti-diagonal
      const antiDiagonal = [];
      for (let i = 0; i < n; i++) {
        antiDiagonal.push(board[i][n - 1 - i]);
      }
      if (allSame(antiDiagonal)) {
        return antiDiagonal[0];
      }

      // No winner found
      return null;
    }
    const winner = calculateWinner();
    setWinner(winner);
  }, [board])

  return (
    <div className={styles.game}>
      <div className={styles.gameColumn}>
        <h2 style={{'margin-bottom': '20px'}}> {!winner ? `Next Move is ${xIsNext ? 'X' : 'O' }` : `Winner is ${winner}`}</h2> 
        <Board board={board} handleMove={handleMove}></Board>
        { winner ? <button onClick={resetGame} style={{'margin-top': '22px', padding: '7px'}}>RESET</button> : null }
      </div>
      <div className={styles.gameColumn} style={{margin: '50px 0 0 0'}}>
        <ul>
          {history.map((_,move) => <li key={move+1}>
            <button onClick={() => jumpTo(move)}>Move #{move+1}</button>
          </li>)}
        </ul>
      </div>
    </div>
  )
}

export default Game
