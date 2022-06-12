import { useSelector } from "react-redux";
import Checker from "./Checker";
import Square from "./Square";

function Board() {
  const board = useSelector((state) => state.game.board);

  console.log(board);
  return (
    <div className="board-container">
      <div className="board">
        {board.map((row, rowindex) => {
          return (
            <div className="row" key={rowindex}>
              {row.map((checker, checkerindex) => {
                return (
                  <Square
                    isWhite={(checkerindex + rowindex) % 2 === 0}
                    key={checkerindex}
                    checker={checker}
                    isEmpty={checker === 0}
                    index={
                      String.fromCharCode(checkerindex + 97) +
                      String(8 - rowindex)
                    }
                    position={`${rowindex}${checkerindex}`}
                  >
                    {checker !== -1 && (
                      <Checker
                        color={checker}
                        position={`${rowindex}${checkerindex}`}
                      />
                    )}
                  </Square>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Board;
