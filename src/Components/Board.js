import { useState } from "react";
import { useSelector } from "react-redux";

function Board() {
  const board = useSelector((state) => state.game.board);
  console.log(board);
  return (
    <div className="board">
      {board.map((col, colindex) => {
        return (
          <div className="col" key={colindex}>
            {col.map((row, rowindex) => {
              if ((rowindex + colindex) % 2 === 1) {
                return (
                  <div
                    className="square square-even"
                    key={rowindex}
                    index={
                      String.fromCharCode(colindex + 97) + String(8 - rowindex)
                    }
                  >
                    <div className="checker black-checker"></div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="square square-odd"
                    key={rowindex}
                    index={
                      String.fromCharCode(colindex + 97) + String(8 - rowindex)
                    }
                  >
                    <div className="checker white-checker"></div>
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
