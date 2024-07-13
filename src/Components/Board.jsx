
import Cell from './Cell';
import Styles from './Board.module.css'

function Board({board, handleMove }) {
  
  return (
    <>
      <div className={Styles.board}>
        {
          board.map((row, r) => <div className={Styles.boardRow}>
            {row.map((cell, c) => <Cell value={board[r][c]} onClick={() => handleMove(r,c)}></Cell>)}
        </div>)
        }
      </div>
    </>
  )
}

export default Board
