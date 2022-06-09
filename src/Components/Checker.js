import React from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import {
  changeCurrentPlayer,
  setCurrentChecker,
  setAvailableMoves,
} from "../redux/game/GameSlice";

import { useDispatch } from "react-redux";

function Checker({ color, position }) {
  const dispatch = useDispatch();
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const currentChecker = useSelector((state) => state.game.currentChecker);
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

  return (
    <div
      ref={ref}
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
  );
}

export default Checker;
