/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import {
  setCanGetScore,
  setCurrentChecker,
  setAvailableMoves,
} from "../redux/game/GameSlice";

import { useDispatch } from "react-redux";

import checkSquare from "../Game/Game";

function Checker({ color, position }) {
  const dispatch = useDispatch();
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const kings = useSelector((state) => state.game.kings);
  const board = useSelector((state) => state.game.board);
  const [{ isDragging }, drag] = useDrag({
    type: "checker",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  let ref;

  if (currentPlayer === color) {
    ref = drag;
  }

  function _currentChecker() {
    if (currentPlayer === color) {
      dispatch(setCurrentChecker({ position: position, color: color }));
      dispatch(setAvailableMoves());
    }
  }

  useEffect(() => {
    if (currentPlayer === color) {
      if (checkSquare(position, color, board, kings, true)) {
        dispatch(setCanGetScore(position));
      }
    }
  }, [board]);

  return (
    <div
      className="checker-container"
      ref={ref}
      onClick={() => _currentChecker()}
      onDragStart={() => _currentChecker()}
    >
      <div
        style={{
          opacity: isDragging ? 0 : 1,
          fontSize: 25,
          fontWeight: "bold",
          zIndex: 3,
          paddingRight: 1,
          cursor: "pointer",
        }}
        className={`${kings.includes(position) ? `king` : ""} ${
          color === 0 && Number(position[0]) === 7 ? `king` : ""
        } ${color === 1 && Number(position[0]) === 0 ? `king` : ""} ${
          color === 0
            ? "checker black-checker"
            : color === 1
            ? "checker white-checker"
            : ""
        } ${currentPlayer !== color ? "not-draggable" : ""}`}
      ></div>
    </div>
  );
}

export default Checker;
