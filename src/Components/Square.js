import React, { useEffect } from "react";
import Checker from "./Checker";
import { useDrop } from "react-dnd";
import {
  changeCurrentPlayer,
  setCurrentChecker,
  move,
  resetCurrentChecker,
} from "../redux/game/GameSlice";

import { useDispatch, useSelector } from "react-redux";

function Square({ isWhite, checker, index, children, position }) {
  const currentChecker = useSelector((state) => state.game.currentChecker);
  const availableMoves = useSelector((state) => state.game.availableMoves);
  const dispatch = useDispatch();
  const [{ isDropping }, drop] = useDrop(() => ({
    accept: "checker",
    drop: () => {
      dispatch(move({ x: position[1], y: position[0] }));
    },
  }));

  function handleOnClick() {
    if (availableMoves.includes(position)) {
      dispatch(move({ x: position[1], y: position[0] }));
    }
  }

  return (
    <div
      ref={drop}
      index={index}
      square-position={position}
      className={`square ${
        availableMoves.includes(position) && "available-square"
      } ${currentChecker.position === position && "current-square"} ${
        isWhite === true ? "square-odd" : "square-even"
      }`}
      onClick={() => handleOnClick()}
    >
      {children}
    </div>
  );
}

export default Square;
