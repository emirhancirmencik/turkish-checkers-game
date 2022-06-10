import { createSlice } from "@reduxjs/toolkit";
import checkSquare, {
  availableMovesFunction,
  kingScorePositions,
} from "../../Game/Game";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    board: [
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
    ],
    currentPlayer: 1,
    currentChecker: { position: "none", color: "none", king: false },
    availableMoves: [],
    canGetScore: [],
    scoredChecker: "",
    loses: { white: 0, black: 0 },
    kings: [],
    kingScorePositions: [],
  },
  reducers: {
    changeCurrentPlayer: (state) => {
      if (state.scoredChecker.length !== 0) {
        console.log(state.scoredChecker, "changed");
        if (
          checkSquare(
            state.scoredChecker,
            state.currentPlayer,
            state.board,
            state.kings,
            state.kingScorePositions
          )
        ) {
          if (state.currentPlayer === 1) {
            state.currentPlayer = 0;
          } else {
            state.currentPlayer = 1;
          }
        }
      }
      if (state.currentPlayer === 1) {
        state.currentPlayer = 0;
      } else {
        state.currentPlayer = 1;
      }
      console.log(state.scoredChecker, "changed");
    },
    setCurrentChecker: (state, action) => {
      const pos = action.payload.position;
      const color = action.payload.color;
      if (state.currentPlayer === color) {
        state.currentChecker.position = pos;
        state.currentChecker.color = color;

        if (state.kings.includes(pos)) {
          state.currentChecker.king = true;
        } else {
          state.currentChecker.king = false;
        }
      }
    },
    makeKing: (state, action) => {
      let position = action.payload.position;
      let color = action.payload.color;

      if (!state.kings.includes(position)) {
        console.log(color);
        if (Number(color) === 0 && Number(position[0]) === 7) {
          console.log("2");
          state.kings.push(position);
        }
      }
      if (Number(color) === 1 && Number(position[0]) === 0) {
        if (!state.kings.includes(position)) {
          state.kings.push(position);
        }
      }
    },
    resetCurrentChecker: (state) => {
      state.currentChecker.position = "none";
      state.currentChecker.color = "none";
      state.availableMoves = [];
    },
    setAvailableMoves: (state) => {
      let currentPosX = Number(state.currentChecker.position[1]);
      let currentPosY = Number(state.currentChecker.position[0]);
      let availableMoves = availableMovesFunction(
        state.canGetScore,
        state.currentPlayer,
        currentPosX,
        currentPosY,
        state.board,
        state.kings,
        state.kingScorePositions
      );
      state.availableMoves = availableMoves;
      console.log(availableMoves);
    },
    move: (state, action) => {
      let currentPosX = Number(state.currentChecker.position[1]);
      let currentPosY = Number(state.currentChecker.position[0]);

      let targetPosX = Number(action.payload.x);
      let targetPosY = Number(action.payload.y);

      if (state.canGetScore.length === 0) {
        if (state.availableMoves.includes(`${targetPosY}${targetPosX}`)) {
          state.board[targetPosY][targetPosX] = state.currentPlayer;
          state.board[currentPosY][currentPosX] = -1;

          if (state.currentPlayer === 1) {
            state.currentPlayer = 0;
          } else {
            state.currentPlayer = 1;
          }

          state.currentChecker.position = "none";
          state.currentChecker.color = "none";
          state.availableMoves = [];
          state.canGetScore = [];
          state.scoredChecker = "";
        }
      } else {
        if (state.availableMoves.includes(`${targetPosY}${targetPosX}`)) {
          state.board[targetPosY][targetPosX] = state.currentPlayer;
          state.board[currentPosY][currentPosX] = -1;
          state.scoredChecker = `${targetPosY}${targetPosX}`;

          if (targetPosX - currentPosX === 0) {
            if (state.kings.includes(`${currentPosY}${currentPosX}`)) {
              if (targetPosY > currentPosY) {
                state.board[targetPosY - 1][targetPosX] = -1;
              } else {
                state.board[targetPosY + 1][targetPosX] = -1;
              }

              let index = state.kings.findIndex(
                (e) => e === `${currentPosY}${currentPosX}`
              );

              state.kings[index] = `${targetPosY}${targetPosX}`;
              state.kingScorePositions = [];
            } else {
              if (state.currentPlayer === 1) {
                state.board[currentPosY - 1][currentPosX] = -1;
              } else {
                state.board[currentPosY + 1][currentPosX] = -1;
              }
            }
          }

          if (targetPosY - currentPosY === 0) {
            if (targetPosX > currentPosX)
              state.board[currentPosY][currentPosX + 1] = -1;
            else {
              state.board[currentPosY][currentPosX - 1] = -1;
            }
          }

          if (state.currentPlayer === 0) {
            state.loses.white += 1;
          } else {
            state.loses.black += 1;
          }

          if (state.scoredChecker.length !== 0) {
            console.log(state.scoredChecker, "changed", state.currentPlayer);
            if (
              !checkSquare(
                state.scoredChecker,
                state.currentPlayer,
                state.board,
                state.kings,
                state.kingScorePositions
              )
            ) {
              if (state.currentPlayer === 1) {
                state.currentPlayer = 0;
              } else {
                state.currentPlayer = 1;
              }
            }
          }

          state.currentChecker.position = "none";
          state.currentChecker.color = "none";
          state.availableMoves = [];
          state.canGetScore = [];
        }
      }
    },
    setCanGetScore: (state, action) => {
      let a = action.payload;
      state.canGetScore.push(a);
    },
    setKingScorePos: (state, action) => {
      let pos = action.payload;
      state.kingScorePositions.push(pos);
    },
  },
});

export const {
  changeCurrentPlayer,
  setCurrentChecker,
  setAvailableMoves,
  resetCurrentChecker,
  move,
  setCanGetScore,
  makeKing,
  setKingScorePos,
} = gameSlice.actions;

export default gameSlice.reducer;
