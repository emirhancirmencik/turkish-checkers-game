import { createSlice, current } from "@reduxjs/toolkit";

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
    currentChecker: { position: "none", color: "none" },
    availableMoves: [],
  },
  reducers: {
    changeCurrentPlayer: (state) => {
      if (state.currentPlayer === 1) {
        state.currentPlayer = 0;
      } else {
        state.currentPlayer = 1;
      }
    },
    setCurrentChecker: (state, action) => {
      const pos = action.payload.position;
      const color = action.payload.color;
      if (state.currentPlayer === color) {
        state.currentChecker.position = pos;
        state.currentChecker.color = color;
      }
    },
    resetCurrentChecker: (state) => {
      state.currentChecker.position = "none";
      state.currentChecker.color = "none";
      state.availableMoves = [];
    },
    setAvailableMoves: (state) => {
      let availableMoves = [];
      let currentPosX = Number(state.currentChecker.position[1]);
      let currentPosY = Number(state.currentChecker.position[0]);
      if (state.currentPlayer === 0) {
        if (currentPosY !== 7) {
          if (state.board[currentPosY + 1][currentPosX] === -1) {
            availableMoves.push(String(currentPosY + 1) + String(currentPosX));
          }

          if (
            state.board[currentPosY + 1][currentPosX] === 1 &&
            currentPosY !== 6
          ) {
            if (state.board[currentPosY + 2][currentPosX] === -1) {
              availableMoves.push(
                String(currentPosY + 2) + String(currentPosX)
              );
            }
          }
        }
      } else if (state.currentPlayer === 1) {
        if (currentPosY !== 0) {
          if (state.board[currentPosY - 1][currentPosX] === -1) {
            availableMoves.push(String(currentPosY - 1) + String(currentPosX));
          }
        }
      }
      state.availableMoves = availableMoves;
      console.log(availableMoves);
    },
    move: (state, action) => {
      let currentPosX = Number(state.currentChecker.position[1]);
      let currentPosY = Number(state.currentChecker.position[0]);

      let targetPosX = Number(action.payload.x);
      let targetPosY = Number(action.payload.y);

      console.log(targetPosX, targetPosY);

      if (state.availableMoves.includes(`${targetPosY}${targetPosX}`)) {
        state.board[targetPosY][targetPosX] = state.currentPlayer;
        state.board[currentPosY][currentPosX] = -1;

        if (state.currentPlayer === 1) {
          state.currentPlayer = 0;
        } else {
          state.currentPlayer = 1;
        }
      }

      state.currentChecker.position = "none";
      state.currentChecker.color = "none";
      state.availableMoves = [];
    },
  },
});

export const {
  changeCurrentPlayer,
  setCurrentChecker,
  setAvailableMoves,
  resetCurrentChecker,
  move,
} = gameSlice.actions;

export default gameSlice.reducer;
