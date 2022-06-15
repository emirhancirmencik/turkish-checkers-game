export let kingScorePositions = { positions: [], direction: "" };
export let checkerScorePositions = { positions: [] };
export let bestMoves = { positions: [] };

export default function checkSquare(position, color, board, kings, check) {
  let currentPosY = Number(position[0]);
  let currentPosX = Number(position[1]);
  console.log(kingScorePositions.direction);
  if (!kings.includes(position) && check) {
    if (color === 0) {
      if (currentPosY !== 7) {
        if (board[currentPosY + 1][currentPosX] === 1 && currentPosY !== 6) {
          if (board[currentPosY + 2][currentPosX] === -1) {
            checkerScorePositions.positions.push(
              `${currentPosY + 2}${currentPosX}`
            );
            return true;
          }
        }
      }
      if (currentPosX !== 0) {
        if (board[currentPosY][currentPosX - 1] === 1 && currentPosX !== 1) {
          if (board[currentPosY][currentPosX - 2] === -1) {
            checkerScorePositions.positions.push(
              `${currentPosY}${currentPosX - 2}`
            );
            return true;
          }
        }
      }
      if (currentPosX !== 7) {
        if (board[currentPosY][currentPosX + 1] === 1 && currentPosX !== 6) {
          if (board[currentPosY][currentPosX + 2] === -1) {
            checkerScorePositions.positions.push(
              `${currentPosY}${currentPosX + 2}`
            );
            return true;
          }
        }
      }
    } else {
      if (currentPosY !== 0) {
        if (board[currentPosY - 1][currentPosX] === 0 && currentPosY !== 1) {
          if (board[currentPosY - 2][currentPosX] === -1) {
            checkerScorePositions.positions.push(
              `${currentPosY - 2}${currentPosX}`
            );
            return true;
          }
        }
      }
      if (currentPosX !== 0) {
        if (board[currentPosY][currentPosX - 1] === 0 && currentPosX !== 1) {
          if (board[currentPosY][currentPosX - 2] === -1) {
            checkerScorePositions.positions.push(
              `${currentPosY}${currentPosX - 2}`
            );
            return true;
          }
        }
      }
      if (currentPosX !== 7) {
        if (board[currentPosY][currentPosX + 1] === 0 && currentPosX !== 6) {
          if (board[currentPosY][currentPosX + 2] === -1) {
            checkerScorePositions.positions.push(
              `${currentPosY}${currentPosX + 2}`
            );
            return true;
          }
        }
      }
    }
  } else {
    let canMove = false;
    for (let i = 1; i <= 6 - currentPosY; ) {
      if (board[currentPosY + i][currentPosX] === -1) {
        i++;
      } else if (board[currentPosY + i][currentPosX] === color) {
        i = 7;
      } else if (board[currentPosY + i][currentPosX] === Number(!color)) {
        if (
          board[currentPosY + i + 1][currentPosX] === -1 &&
          kingScorePositions.direction !== "up"
        ) {
          kingScorePositions.positions.push(
            `${currentPosY + i + 1}${currentPosX}`
          );

          canMove = true;
        }
        i = 7;
      }
    }
    for (let j = currentPosY - 1; 1 <= j; ) {
      if (board[j][currentPosX] === -1) {
        j--;
      } else if (board[j][currentPosX] === color) {
        j = 0;
      } else if (board[j][currentPosX] === Number(!color)) {
        if (
          board[j - 1][currentPosX] === -1 &&
          kingScorePositions.direction !== "down"
        ) {
          kingScorePositions.positions.push(`${j - 1}${currentPosX}`);

          canMove = true;
        }
        j = 0;
      }
    }

    for (let i = 1; i <= 6 - currentPosX; ) {
      if (board[currentPosY][currentPosX + i] === -1) {
        i++;
      } else if (board[currentPosY][currentPosX + i] === color) {
        i = 7;
      } else if (board[currentPosY][currentPosX + i] === Number(!color)) {
        if (
          board[currentPosY][currentPosX + i + 1] === -1 &&
          kingScorePositions.direction !== "left"
        ) {
          kingScorePositions.positions.push(
            `${currentPosY}${currentPosX + i + 1}`
          );

          canMove = true;
        }
        i = 7;
      }
    }

    for (let j = currentPosX - 1; 1 <= j; ) {
      if (board[currentPosY][j] === -1) {
        j--;
      } else if (board[currentPosY][j] === color) {
        j = 0;
      } else if (board[currentPosY][j] === Number(!color)) {
        if (
          board[currentPosY][j - 1] === -1 &&
          kingScorePositions.direction !== "right"
        ) {
          kingScorePositions.positions.push(`${currentPosY}${j - 1}`);

          canMove = true;
        }
        j = 0;
      }
    }

    return canMove;
  }
}

export function availableMovesFunction(
  canGetScore,
  currentPlayer,
  currentPosX,
  currentPosY,
  board,
  kings
) {
  let availableMoves = [];
  let check = canGetScore.length === 0;
  if (!kings.includes(`${currentPosY}${currentPosX}`)) {
    if (check) {
      if (currentPlayer === 0) {
        if (currentPosY !== 7) {
          if (board[currentPosY + 1][currentPosX] === -1) {
            availableMoves.push(String(currentPosY + 1) + String(currentPosX));
          }
        }
        if (currentPosX !== 0) {
          if (board[currentPosY][currentPosX - 1] === -1) {
            availableMoves.push(String(currentPosY) + String(currentPosX - 1));
          }
        }
        if (currentPosX !== 7) {
          if (board[currentPosY][currentPosX + 1] === -1) {
            availableMoves.push(String(currentPosY) + String(currentPosX + 1));
          }
        }
      } else if (currentPlayer === 1) {
        if (currentPosY !== 0) {
          if (board[currentPosY - 1][currentPosX] === -1) {
            availableMoves.push(String(currentPosY - 1) + String(currentPosX));
          }
        }
        if (currentPosX !== 0) {
          if (board[currentPosY][currentPosX - 1] === -1) {
            availableMoves.push(String(currentPosY) + String(currentPosX - 1));
          }
        }
        if (currentPosX !== 7) {
          if (board[currentPosY][currentPosX + 1] === -1) {
            availableMoves.push(String(currentPosY) + String(currentPosX + 1));
          }
        }
      }
    } else {
      if (
        currentPlayer === 0 &&
        canGetScore.includes(`${currentPosY}${currentPosX}`)
      ) {
        if (currentPosY !== 7) {
          if (board[currentPosY + 1][currentPosX] === 1 && currentPosY !== 6) {
            if (board[currentPosY + 2][currentPosX] === -1) {
              availableMoves.push(
                String(currentPosY + 2) + String(currentPosX)
              );
              checkerScorePositions.positions.push(
                String(currentPosY + 2) + String(currentPosX)
              );
            }
          }
        }
        if (currentPosX !== 0) {
          if (board[currentPosY][currentPosX - 1] === 1 && currentPosX !== 1) {
            if (board[currentPosY][currentPosX - 2] === -1) {
              availableMoves.push(
                String(currentPosY) + String(currentPosX - 2)
              );
              checkerScorePositions.positions.push(
                String(currentPosY) + String(currentPosX - 2)
              );
            }
          }
        }
        if (currentPosX !== 7) {
          if (board[currentPosY][currentPosX + 1] === 1 && currentPosX !== 6) {
            if (board[currentPosY][currentPosX + 2] === -1) {
              availableMoves.push(
                String(currentPosY) + String(currentPosX + 2)
              );
              checkerScorePositions.positions.push(
                String(currentPosY) + String(currentPosX + 2)
              );
            }
          }
        }
      } else if (
        currentPlayer === 1 &&
        canGetScore.includes(`${currentPosY}${currentPosX}`)
      ) {
        if (currentPosY !== 0) {
          if (board[currentPosY - 1][currentPosX] === 0 && currentPosY !== 1) {
            if (board[currentPosY - 2][currentPosX] === -1) {
              availableMoves.push(
                String(currentPosY - 2) + String(currentPosX)
              );
              checkerScorePositions.positions.push(
                String(currentPosY - 2) + String(currentPosX)
              );
            }
          }
        }
        if (currentPosX !== 0) {
          if (board[currentPosY][currentPosX - 1] === 0 && currentPosX !== 1) {
            if (board[currentPosY][currentPosX - 2] === -1) {
              availableMoves.push(
                String(currentPosY) + String(currentPosX - 2)
              );
              checkerScorePositions.positions.push(
                String(currentPosY) + String(currentPosX - 2)
              );
            }
          }
        }
        if (currentPosX !== 7) {
          if (board[currentPosY][currentPosX + 1] === 0 && currentPosX !== 6) {
            if (board[currentPosY][currentPosX + 2] === -1) {
              availableMoves.push(
                String(currentPosY) + String(currentPosX + 2)
              );
              checkerScorePositions.positions.push(
                String(currentPosY) + String(currentPosX + 2)
              );
            }
          }
        }
      }
    }
  } else {
    if (canGetScore.includes(`${currentPosY}${currentPosX}`)) {
      availableMoves.push(...kingScorePositions.positions);
    } else {
      for (let i = 1; i <= 7 - currentPosY; ) {
        if (board[currentPosY + i][currentPosX] === -1) {
          availableMoves.push(String(currentPosY + i) + String(currentPosX));
          i++;
        } else {
          i = 8;
        }
      }
      for (let j = currentPosY - 1; 0 <= j; ) {
        if (board[j][currentPosX] === -1) {
          availableMoves.push(String(j) + String(currentPosX));
          j--;
        } else {
          j = -1;
        }
      }

      for (let i = 1; i <= 7 - currentPosX; ) {
        if (board[currentPosY][currentPosX + i] === -1) {
          availableMoves.push(String(currentPosY) + String(currentPosX + i));
          i++;
        } else {
          i = 8;
        }
      }

      for (let j = currentPosX - 1; 0 <= j; ) {
        if (board[currentPosY][j] === -1) {
          availableMoves.push(String(currentPosY) + String(j));

          j--;
        } else {
          j = -1;
        }
      }
    }
  }

  bestMoves.positions = [];
  bestMoves.positions = findBestMove(
    board,
    currentPlayer,
    canGetScore,
    kings,
    `${currentPosY}${currentPosX}`
  );

  if (bestMoves.positions.length > 0) {
    return bestMoves.positions;
  } else {
    return availableMoves;
  }
}

export function findBestMove(
  board,
  currentPlayer,
  canGetScore,
  kings,
  currentPosition
) {
  let moves = { positions: [] };
  canGetScore.forEach((checker) => {
    if (kings.includes(currentPosition)) {
      if (checkSquare(checker, currentPlayer, board, kings, false)) {
        kingScorePositions.positions.forEach((score) => {
          if (Number(score[0]) > Number(currentPosition[0])) {
            let currentPosY = Number(score[0]);
            let currentPosX = Number(score[1]);
            for (let i = currentPosY; i <= 6; ) {
              if (board[i][currentPosX] === -1) {
                for (let j = 1; j <= 6 - currentPosX; ) {
                  console.log(`${i}${currentPosX + j + 1}`);
                  if (board[i][currentPosX + j] === -1) {
                    j++;
                  } else if (board[i][currentPosX + j] === currentPlayer) {
                    j = 7;
                  } else if (
                    board[i][currentPosX + j] === Number(!currentPlayer)
                  ) {
                    if (
                      board[i][currentPosX + j + 1] === -1 &&
                      !moves.positions.includes(`${i}${currentPosX}`)
                    ) {
                      moves.positions.push(`${i}${currentPosX}`);
                    }
                    j = 7;
                  }
                }

                for (let j = currentPosX - 1; 1 <= j; ) {
                  if (board[i][j] === -1) {
                    console.log(`${i}${j - 1}`);

                    j--;
                  } else if (board[i][j] === currentPlayer) {
                    j = 0;
                  } else if (board[i][j] === Number(!currentPlayer)) {
                    if (
                      board[i][j - 1] === -1 &&
                      !moves.positions.includes(`${i}${currentPosX}`)
                    ) {
                      moves.positions.push(`${i}${currentPosX}`);
                    }
                    j = 0;
                  }
                }
                console.log(`c`);
                i++;
              } else {
                i = 7;
              }
            }
          } else if (Number(score[0]) < Number(currentPosition[0])) {
            let currentPosY = Number(score[0]);
            let currentPosX = Number(score[1]);
            for (let i = currentPosY; i >= 1; ) {
              if (board[i][currentPosX] === -1) {
                for (let j = 1; j <= 6 - currentPosX; ) {
                  console.log(`${i}${currentPosX + j + 1}`);
                  if (board[i][currentPosX + j] === -1) {
                    j++;
                  } else if (board[i][currentPosX + j] === currentPlayer) {
                    j = 7;
                  } else if (
                    board[i][currentPosX + j] === Number(!currentPlayer)
                  ) {
                    if (
                      board[i][currentPosX + j + 1] === -1 &&
                      !moves.positions.includes(`${i}${currentPosX}`)
                    ) {
                      moves.positions.push(`${i}${currentPosX}`);
                    }
                    j = 7;
                  }
                }

                for (let j = currentPosX - 1; 1 <= j; ) {
                  if (board[i][j] === -1) {
                    console.log(`${i}${j - 1}`);

                    j--;
                  } else if (board[i][j] === currentPlayer) {
                    j = 0;
                  } else if (board[i][j] === Number(!currentPlayer)) {
                    if (
                      board[i][j - 1] === -1 &&
                      !moves.positions.includes(`${i}${currentPosX}`)
                    ) {
                      moves.positions.push(`${i}${currentPosX}`);
                    }
                    j = 0;
                  }
                }
                console.log(`c`);
                i--;
              } else {
                i = 0;
              }
            }
          }

          if (Number(score[1]) > Number(currentPosition[1])) {
            let currentPosY = Number(score[0]);
            let currentPosX = Number(score[1]);
            for (let i = currentPosX; i <= 6; ) {
              if (board[currentPosY][i] === -1) {
                for (let j = 1; j <= 6 - currentPosY; ) {
                  console.log(`${currentPosY + j + 1}${i}`);
                  if (board[currentPosY + j][i] === -1) {
                    j++;
                  } else if (board[currentPosY + j][i] === currentPlayer) {
                    j = 7;
                  } else if (
                    board[currentPosY + j][i] === Number(!currentPlayer)
                  ) {
                    if (
                      board[currentPosY + j + 1][i] === -1 &&
                      !moves.positions.includes(`${currentPosY}${i}`)
                    ) {
                      moves.positions.push(`${currentPosY}${i}`);
                    }
                    j = 7;
                  }
                }

                for (let j = currentPosY - 1; 1 <= j; ) {
                  if (board[j][i] === -1) {
                    console.log(`${j}${i - 1}`);

                    j--;
                  } else if (board[j][i] === currentPlayer) {
                    j = 0;
                  } else if (board[j][i] === Number(!currentPlayer)) {
                    if (
                      board[j - 1][i] === -1 &&
                      !moves.positions.includes(`${currentPosY}${i}`)
                    ) {
                      moves.positions.push(`${currentPosY}${i}`);
                    }
                    j = 0;
                  }
                }
                console.log(`c`);
                i++;
              } else {
                i = 7;
              }
            }
          } else if (Number(score[1]) < Number(currentPosition[1])) {
            let currentPosY = Number(score[0]);
            let currentPosX = Number(score[1]);
            for (let i = currentPosX; i >= 1; ) {
              if (board[currentPosY][i] === -1) {
                for (let j = 1; j <= 6 - currentPosY; ) {
                  console.log(`${currentPosY + j + 1}${i}`);
                  if (board[currentPosY + j][i] === -1) {
                    j++;
                  } else if (board[currentPosY + j][i] === currentPlayer) {
                    j = 7;
                  } else if (
                    board[currentPosY + j][i] === Number(!currentPlayer)
                  ) {
                    if (
                      board[currentPosY + j + 1][i] === -1 &&
                      !moves.positions.includes(`${currentPosY}${i}`)
                    ) {
                      moves.positions.push(`${currentPosY}${i}`);
                    }
                    j = 7;
                  }
                }

                for (let j = currentPosY - 1; 1 <= j; ) {
                  if (board[j][i] === -1) {
                    console.log(`${j}${i - 1}`);

                    j--;
                  } else if (board[j][i] === currentPlayer) {
                    j = 0;
                  } else if (board[j][i] === Number(!currentPlayer)) {
                    if (
                      board[j - 1][i] === -1 &&
                      !moves.positions.includes(`${currentPosY}${i}`)
                    ) {
                      moves.positions.push(`${currentPosY}${i}`);
                    }
                    j = 0;
                  }
                }
                console.log(`c`);
                i--;
              } else {
                i = 0;
              }
            }
          }
        });
      }
    } else {
      if (checkSquare(checker, currentPlayer, board, kings, true)) {
        checkerScorePositions.positions.forEach((score) => {
          console.log(score);
          if (checkSquare(score, currentPlayer, board, kings, true)) {
            moves.positions.push(score);
          }
        });
      }
    }
  });

  let uniqeMoves = [...new Set(moves.positions)];
  console.log("bestmoves", uniqeMoves);

  return uniqeMoves;
}

export function fakeMove(
  currentChecker,
  targetMove,
  board,
  kings,
  currentPlayer,
  kingScorePositions
) {
  let currentPosX = Number(currentChecker[1]);
  let currentPosY = Number(currentChecker[0]);

  let targetPosX = Number(targetMove[1]);
  let targetPosY = Number(targetMove[0]);

  board[targetPosY][targetPosX] = currentPlayer;
  board[currentPosY][currentPosX] = -1;

  if (targetPosX - currentPosX === 0) {
    if (kings.includes(`${currentPosY}${currentPosX}`)) {
      let index = kings.findIndex((e) => e === `${currentPosY}${currentPosX}`);
      kingScorePositions.positions = [];
      kings[index] = `${targetPosY}${targetPosX}`;

      if (targetPosY > currentPosY) {
        for (let i = currentPosY; i < targetPosY; i++) {
          board[i][currentPosX] = -1;
          let isRemovedCheckerKing = kings.findIndex(
            (e) => e === `${i}${targetPosX}`
          );
          if (isRemovedCheckerKing !== -1) {
            kings.splice(isRemovedCheckerKing, 1);
          }
        }
      } else if (targetPosY < currentPosY) {
        for (let i = targetPosY + 1; i <= currentPosY; i++) {
          board[i][currentPosX] = -1;
          let isRemovedCheckerKing = kings.findIndex(
            (e) => e === `${i}${targetPosX}`
          );
          if (isRemovedCheckerKing !== -1) {
            kings.splice(isRemovedCheckerKing, 1);
          }
        }
      }
    } else {
      if (targetPosY > currentPosY) {
        board[targetPosY - 1][targetPosX] = -1;
        checkerScorePositions.positions = [];
        let isRemovedCheckerKing = kings.findIndex(
          (e) => e === `${targetPosY - 1}${targetPosX}`
        );
        if (isRemovedCheckerKing !== -1) {
          kings.splice(isRemovedCheckerKing, 1);
        }
      } else {
        board[targetPosY + 1][targetPosX] = -1;
        checkerScorePositions.positions = [];
        let isRemovedCheckerKing = kings.findIndex(
          (e) => e === `${targetPosY + 1}${targetPosX}`
        );
        if (isRemovedCheckerKing !== -1) {
          kings.splice(isRemovedCheckerKing, 1);
        }
      }
    }
  }
  if (targetPosY - currentPosY === 0) {
    if (kings.includes(`${currentPosY}${currentPosX}`)) {
      let index = kings.findIndex((e) => e === `${currentPosY}${currentPosX}`);
      kingScorePositions.positions = [];
      kings[index] = `${targetPosY}${targetPosX}`;

      if (targetPosX > currentPosX) {
        for (let i = currentPosX; i < targetPosX; i++) {
          board[currentPosY][i] = -1;
          let isRemovedCheckerKing = kings.findIndex(
            (e) => e === `${currentPosY}${i}`
          );
          if (isRemovedCheckerKing !== -1) {
            kings.splice(isRemovedCheckerKing, 1);
          }
        }
      } else if (targetPosX < currentPosX) {
        for (let i = targetPosX + 1; i <= currentPosX; i++) {
          board[currentPosY][i] = -1;
          let isRemovedCheckerKing = kings.findIndex(
            (e) => e === `${currentPosY}${i}`
          );
          if (isRemovedCheckerKing !== -1) {
            kings.splice(isRemovedCheckerKing, 1);
          }
        }
      }
    } else {
      if (targetPosX > currentPosX) {
        board[targetPosY][targetPosX - 1] = -1;
        checkerScorePositions.positions = [];
        let isRemovedCheckerKing = kings.findIndex(
          (e) => e === `${targetPosY}${targetPosX - 1}`
        );
        if (isRemovedCheckerKing !== -1) {
          kings.splice(isRemovedCheckerKing, 1);
        }
      } else {
        board[targetPosY][targetPosX + 1] = -1;
        checkerScorePositions.positions = [];
        let isRemovedCheckerKing = kings.findIndex(
          (e) => e === `${targetPosY}${targetPosX + 1}`
        );
        if (isRemovedCheckerKing !== -1) {
          kings.splice(isRemovedCheckerKing, 1);
        }
      }
    }
  }
}

function calculateMove(board, kings) {}
