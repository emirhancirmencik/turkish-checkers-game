import { createSlice } from "@reduxjs/toolkit";
import checkSquare from "../../Game/Game";

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
    canGetScore: [],
    scoredChecker: "",
    loses: { white: 0, black: 0 },
  },
  reducers: {
    changeCurrentPlayer: (state) => {
      if (state.scoredChecker.length !== 0) {
        console.log(state.scoredChecker, "changed");
        if (
          checkSquare(state.scoredChecker, state.currentPlayer, state.board)
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
      if (state.canGetScore.length === 0) {
        if (state.currentPlayer === 0) {
          if (currentPosY !== 7) {
            if (state.board[currentPosY + 1][currentPosX] === -1) {
              availableMoves.push(
                String(currentPosY + 1) + String(currentPosX)
              );
            }
          }
          if (currentPosX !== 0) {
            if (state.board[currentPosY][currentPosX - 1] === -1) {
              availableMoves.push(
                String(currentPosY) + String(currentPosX - 1)
              );
            }
          }
          if (currentPosX !== 7) {
            if (state.board[currentPosY][currentPosX + 1] === -1) {
              availableMoves.push(
                String(currentPosY) + String(currentPosX + 1)
              );
            }
          }
        } else if (state.currentPlayer === 1) {
          if (currentPosY !== 0) {
            if (state.board[currentPosY - 1][currentPosX] === -1) {
              availableMoves.push(
                String(currentPosY - 1) + String(currentPosX)
              );
            }
          }
          if (currentPosX !== 0) {
            if (state.board[currentPosY][currentPosX - 1] === -1) {
              availableMoves.push(
                String(currentPosY) + String(currentPosX - 1)
              );
            }
          }
          if (currentPosX !== 7) {
            if (state.board[currentPosY][currentPosX + 1] === -1) {
              availableMoves.push(
                String(currentPosY) + String(currentPosX + 1)
              );
            }
          }
        }
      } else {
        if (
          state.currentPlayer === 0 &&
          state.canGetScore.includes(`${currentPosY}${currentPosX}`)
        ) {
          if (currentPosY !== 7) {
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
          if (currentPosX !== 0) {
            if (
              state.board[currentPosY][currentPosX - 1] === 1 &&
              currentPosX !== 1
            ) {
              if (state.board[currentPosY][currentPosX - 2] === -1) {
                availableMoves.push(
                  String(currentPosY) + String(currentPosX - 2)
                );
              }
            }
          }
          if (currentPosX !== 7) {
            if (
              state.board[currentPosY][currentPosX + 1] === 1 &&
              currentPosX !== 6
            ) {
              if (state.board[currentPosY][currentPosX + 2] === -1) {
                availableMoves.push(
                  String(currentPosY) + String(currentPosX + 2)
                );
              }
            }
          }
        } else if (
          state.currentPlayer === 1 &&
          state.canGetScore.includes(`${currentPosY}${currentPosX}`)
        ) {
          if (currentPosY !== 0) {
            if (
              state.board[currentPosY - 1][currentPosX] === 0 &&
              currentPosY !== 1
            ) {
              if (state.board[currentPosY - 2][currentPosX] === -1) {
                availableMoves.push(
                  String(currentPosY - 2) + String(currentPosX)
                );
              }
            }
          }
          if (currentPosX !== 0) {
            if (
              state.board[currentPosY][currentPosX - 1] === 0 &&
              currentPosX !== 1
            ) {
              if (state.board[currentPosY][currentPosX - 2] === -1) {
                availableMoves.push(
                  String(currentPosY) + String(currentPosX - 2)
                );
              }
            }
          }
          if (currentPosX !== 7) {
            if (
              state.board[currentPosY][currentPosX + 1] === 0 &&
              currentPosX !== 6
            ) {
              if (state.board[currentPosY][currentPosX + 2] === -1) {
                availableMoves.push(
                  String(currentPosY) + String(currentPosX + 2)
                );
              }
            }
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
            if (state.currentPlayer === 1) {
              state.board[currentPosY - 1][currentPosX] = -1;
            } else {
              state.board[currentPosY + 1][currentPosX] = -1;
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
                state.board
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
  },
});

export const {
  changeCurrentPlayer,
  setCurrentChecker,
  setAvailableMoves,
  resetCurrentChecker,
  move,
  setCanGetScore,
} = gameSlice.actions;

export default gameSlice.reducer;
