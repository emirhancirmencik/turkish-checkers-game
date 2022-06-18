/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import Checker from "./Checker";
import Square from "./Square";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../redux/game/GameSlice";

function Board() {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.game.board);
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const loses = useSelector((state) => state.game.loses);
  const [winner, setWinner] = useState("none");

  useEffect(() => {
    if (loses.white === 16 || loses.black === 16) {
      setWinner(loses.black > loses.white ? "WHITE" : "BLACK");
    }

    if (loses.white === 15 && loses.black === 15) {
      setWinner("DRAW");
    }

    if (loses.white === 0 || loses.black === 0) {
      setWinner("none");
    }
  }, [board]);

  return (
    <>
      <div className="stats-container">
        {winner === "none" ? (
          <>
            <div
              className={`current-player ${
                currentPlayer === 0 ? "black-player" : "white-player"
              }`}
            >
              {currentPlayer === 0 ? "BLACK" : "WHITE"} PLAYS
            </div>
            <div className="lose-container">
              <div className="lose">
                <div className="black-checker-lose">
                  {[...Array(loses.black)].map((e, i) => {
                    return <div className="black-checker" key={i}></div>;
                  })}
                </div>
                <div className="white-checker-lose">
                  {[...Array(loses.white)].map((e, i) => {
                    return <div className="white-checker" key={i}></div>;
                  })}
                </div>
              </div>
            </div>
          </>
        ) : winner === "draw" ? (
          <div className="winner">
            DRAW! <br />
            PRESS{" "}
            <span className="click" onClick={() => dispatch(resetGame())}>
              HERE
            </span>{" "}
            TO PLAY AGAIN
          </div>
        ) : winner === "WHITE" ? (
          <div className="winner">
            {winner} WINS! <br />
            PRESS{" "}
            <span className="click" onClick={() => dispatch(resetGame())}>
              HERE
            </span>{" "}
            TO PLAY AGAIN
          </div>
        ) : (
          <div className="winner">
            {winner} WINS! <br />
            PRESS{" "}
            <span className="click" onClick={() => dispatch(resetGame())}>
              HERE
            </span>{" "}
            TO PLAY AGAIN
          </div>
        )}
      </div>
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
      </div>{" "}
    </>
  );
}

export default Board;
