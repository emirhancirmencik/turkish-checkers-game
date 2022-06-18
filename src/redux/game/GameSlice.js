import { createSlice } from "@reduxjs/toolkit";
import checkSquare, {
  availableMovesFunction,
  kingScorePositions,
  checkerScorePositions,
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
  },
  reducers: {
    changeCurrentPlayer: (state) => {
      if (state.scoredChecker.length !== 0) {
        if (
          checkSquare(
            state.scoredChecker,
            state.currentPlayer,
            state.board,
            state.kings,
            true
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
        if (Number(color) === 0 && Number(position[0]) === 7) {
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
        state.kings
      );
      state.availableMoves = availableMoves;
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

          if (state.kings.includes(`${currentPosY}${currentPosX}`)) {
            let index = state.kings.findIndex(
              (e) => e === `${currentPosY}${currentPosX}`
            );
            kingScorePositions.positions = [];
            state.kings[index] = `${targetPosY}${targetPosX}`;
          }

          state.currentChecker.position = "none";
          state.currentChecker.color = "none";
          state.availableMoves = [];
          state.canGetScore = [];
          state.scoredChecker = "";
          checkerScorePositions.positions = [];
          kingScorePositions.direction = "";
        }
      } else {
        if (state.availableMoves.includes(`${targetPosY}${targetPosX}`)) {
          state.board[targetPosY][targetPosX] = state.currentPlayer;
          state.board[currentPosY][currentPosX] = -1;

          state.scoredChecker = `${targetPosY}${targetPosX}`;

          if (targetPosX - currentPosX === 0) {
            if (state.kings.includes(`${currentPosY}${currentPosX}`)) {
              let index = state.kings.findIndex(
                (e) => e === `${currentPosY}${currentPosX}`
              );
              kingScorePositions.positions = [];
              state.kings[index] = `${targetPosY}${targetPosX}`;

              if (targetPosY > currentPosY) {
                for (let i = currentPosY; i < targetPosY; i++) {
                  state.board[i][currentPosX] = -1;
                  let isRemovedCheckerKing = state.kings.findIndex(
                    (e) => e === `${i}${targetPosX}`
                  );
                  if (isRemovedCheckerKing !== -1) {
                    state.kings.splice(isRemovedCheckerKing, 1);
                  }
                }
                kingScorePositions.direction = "down";
              } else if (targetPosY < currentPosY) {
                for (let i = targetPosY + 1; i <= currentPosY; i++) {
                  state.board[i][currentPosX] = -1;
                  let isRemovedCheckerKing = state.kings.findIndex(
                    (e) => e === `${i}${targetPosX}`
                  );
                  if (isRemovedCheckerKing !== -1) {
                    state.kings.splice(isRemovedCheckerKing, 1);
                  }
                }
                kingScorePositions.direction = "up";
              }
            } else {
              if (targetPosY > currentPosY) {
                state.board[targetPosY - 1][targetPosX] = -1;
                checkerScorePositions.positions = [];
                let isRemovedCheckerKing = state.kings.findIndex(
                  (e) => e === `${targetPosY - 1}${targetPosX}`
                );
                if (isRemovedCheckerKing !== -1) {
                  state.kings.splice(isRemovedCheckerKing, 1);
                }
              } else {
                state.board[targetPosY + 1][targetPosX] = -1;
                checkerScorePositions.positions = [];
                let isRemovedCheckerKing = state.kings.findIndex(
                  (e) => e === `${targetPosY + 1}${targetPosX}`
                );
                if (isRemovedCheckerKing !== -1) {
                  state.kings.splice(isRemovedCheckerKing, 1);
                }
              }
            }
          }
          if (targetPosY - currentPosY === 0) {
            if (state.kings.includes(`${currentPosY}${currentPosX}`)) {
              let index = state.kings.findIndex(
                (e) => e === `${currentPosY}${currentPosX}`
              );
              kingScorePositions.positions = [];
              state.kings[index] = `${targetPosY}${targetPosX}`;

              if (targetPosX > currentPosX) {
                kingScorePositions.direction = "right";
                for (let i = currentPosX; i < targetPosX; i++) {
                  state.board[currentPosY][i] = -1;
                  let isRemovedCheckerKing = state.kings.findIndex(
                    (e) => e === `${currentPosY}${i}`
                  );
                  if (isRemovedCheckerKing !== -1) {
                    state.kings.splice(isRemovedCheckerKing, 1);
                  }
                }
              } else if (targetPosX < currentPosX) {
                kingScorePositions.direction = "left";
                for (let i = targetPosX + 1; i <= currentPosX; i++) {
                  state.board[currentPosY][i] = -1;
                  let isRemovedCheckerKing = state.kings.findIndex(
                    (e) => e === `${currentPosY}${i}`
                  );
                  if (isRemovedCheckerKing !== -1) {
                    state.kings.splice(isRemovedCheckerKing, 1);
                  }
                }
              }
            } else {
              if (targetPosX > currentPosX) {
                state.board[targetPosY][targetPosX - 1] = -1;
                checkerScorePositions.positions = [];
                let isRemovedCheckerKing = state.kings.findIndex(
                  (e) => e === `${targetPosY}${targetPosX - 1}`
                );
                if (isRemovedCheckerKing !== -1) {
                  state.kings.splice(isRemovedCheckerKing, 1);
                }
              } else {
                state.board[targetPosY][targetPosX + 1] = -1;
                checkerScorePositions.positions = [];
                let isRemovedCheckerKing = state.kings.findIndex(
                  (e) => e === `${targetPosY}${targetPosX + 1}`
                );
                if (isRemovedCheckerKing !== -1) {
                  state.kings.splice(isRemovedCheckerKing, 1);
                }
              }
            }
          }

          if (state.currentPlayer === 0) {
            state.loses.white += 1;
          } else {
            state.loses.black += 1;
          }

          if (state.scoredChecker.length !== 0) {
            if (
              !checkSquare(
                state.scoredChecker,
                state.currentPlayer,
                state.board,
                state.kings,
                true
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
          kingScorePositions.direction = "";
        }
      }
    },
    setCanGetScore: (state, action) => {
      let a = action.payload;
      state.canGetScore.push(a);
    },
    resetGame: (state) => {
      state.board = [
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
      ];
      state.currentPlayer = 1;
      state.currentChecker = { position: "none", color: "none", king: false };
      state.availableMoves = [];
      state.canGetScore = [];
      state.scoredChecker = "";
      state.loses = { white: 0, black: 0 };
      state.kings = [];
      kingScorePositions.positions = [];
      checkerScorePositions.positions = [];
      kingScorePositions.direction = "";
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
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
