import React, { useEffect } from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import { useSelector } from "react-redux";
import {
  changeCurrentPlayer,
  setCanGetScore,
  setCurrentChecker,
  setAvailableMoves,
} from "../redux/game/GameSlice";

import { useDispatch } from "react-redux";

import checkSquare from "../Game/Game";

function Checker({ color, position }) {
  const dispatch = useDispatch();
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const canGetScore = useSelector((state) => state.game.canGetScore);
  const loses = useSelector((state) => state.game.loses);
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
      console.log(currentPlayer);
      console.log(canGetScore);
      console.log(loses);
    }
  }

  useEffect(() => {
    if (currentPlayer === color) {
      if (checkSquare(position, color, board)) {
        dispatch(setCanGetScore(position));
      }
    }
  }, [board]);

  return (
    <div className="checker-container" ref={ref}>
      <DragPreviewImage src={ref} />
      <div
        style={{
          opacity: isDragging ? 0 : 1,
          fontSize: 25,
          fontWeight: "bold",
          zIndex: 3,
          paddingRight: 1,
          cursor: "pointer",
        }}
        className={`${
          color === 0
            ? "checker black-checker"
            : color === 1
            ? "checker white-checker"
            : ""
        } ${currentPlayer !== color && "not-draggable"}`}
        onClick={() => _currentChecker()}
        onDragStart={() => _currentChecker()}
      ></div>
    </div>
  );
}

export default Checker;
