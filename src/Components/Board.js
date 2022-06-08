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
              return (
                <div
                  className={`square ${
                    (colindex + rowindex) % 2 === 0
                      ? "square-odd"
                      : "square-even"
                  }`}
                  key={rowindex}
                  index={
                    String.fromCharCode(rowindex + 97) + String(8 - colindex)
                  }
                >
                  <div className="checker-container">
                    <div
                      className={`${
                        row === -1
                          ? "checker black-checker"
                          : row === 1
                          ? "checker white-checker"
                          : ""
                      } `}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
