import { useDrop } from "react-dnd";
import { move, makeKing } from "../redux/game/GameSlice";

import { useDispatch, useSelector } from "react-redux";

function Square({ isWhite, checker, index, children, position }) {
  const currentChecker = useSelector((state) => state.game.currentChecker);
  const availableMoves = useSelector((state) => state.game.availableMoves);
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const dispatch = useDispatch();
  const [, drop] = useDrop(() => ({
    accept: "checker",
    drop: () => {
      dispatch(move({ x: position[1], y: position[0] }));
    },
  }));

  function handleOnClick() {
    if (availableMoves.includes(position)) {
      dispatch(move({ x: position[1], y: position[0] }));
      dispatch(makeKing({ position: position, color: currentPlayer }));
    }
  }

  return (
    <div
      ref={drop}
      index={index}
      square-position={position}
      className={`square ${
        availableMoves.includes(position) ? "available-square" : ""
      } ${currentChecker.position === position ? "current-square" : ""} ${
        isWhite === true ? "square-odd" : "square-even"
      }`}
      onClick={() => handleOnClick()}
    >
      {children}
    </div>
  );
}

export default Square;
