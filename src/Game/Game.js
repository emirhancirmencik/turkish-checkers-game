export let kingScorePositions = { positions: [] };

export default function checkSquare(position, color, board, kings) {
  let currentPosY = Number(position[0]);
  let currentPosX = Number(position[1]);
  if (!kings.includes(position)) {
    if (color === 0) {
      if (currentPosY !== 7) {
        if (board[currentPosY + 1][currentPosX] === 1 && currentPosY !== 6) {
          if (board[currentPosY + 2][currentPosX] === -1) {
            return true;
          }
        }
      }
      if (currentPosX !== 0) {
        if (board[currentPosY][currentPosX - 1] === 1 && currentPosX !== 1) {
          if (board[currentPosY][currentPosX - 2] === -1) {
            return true;
          }
        }
      }
      if (currentPosX !== 7) {
        if (board[currentPosY][currentPosX + 1] === 1 && currentPosX !== 6) {
          if (board[currentPosY][currentPosX + 2] === -1) {
            return true;
          }
        }
      }
    } else {
      if (currentPosY !== 0) {
        if (board[currentPosY - 1][currentPosX] === 0 && currentPosY !== 1) {
          if (board[currentPosY - 2][currentPosX] === -1) {
            return true;
          }
        }
      }
      if (currentPosX !== 0) {
        if (board[currentPosY][currentPosX - 1] === 0 && currentPosX !== 1) {
          if (board[currentPosY][currentPosX - 2] === -1) {
            return true;
          }
        }
      }
      if (currentPosX !== 7) {
        if (board[currentPosY][currentPosX + 1] === 0 && currentPosX !== 6) {
          if (board[currentPosY][currentPosX + 2] === -1) {
            return true;
          }
        }
      }
    }
  } else {
    if (color === 0) {
      for (let i = 1; i < 7 - currentPosY; ) {
        if (board[currentPosY + i][currentPosX] === -1) {
          console.log("test1");
          i++;
        } else if (board[currentPosY + i][currentPosX] === 0) {
          console.log("test2");
          return false;
        } else if (board[currentPosY + i][currentPosX] === 1 && i !== 7) {
          console.log("test3");
          if (board[currentPosY + i + 1][currentPosX] === -1) {
            kingScorePositions.positions.push(
              `${currentPosY + i + 1}${currentPosX}`
            );
            console.log(i, kingScorePositions);
            return true;
          }
        }
      }
      for (let i = currentPosY - 1; 1 <= i; ) {
        if (board[i][currentPosX] === -1) {
          i--;
        } else if (board[i][currentPosX] === 0) {
          return false;
        } else if (board[i][currentPosX] === 1 && i !== 7) {
          if (board[i - 1][currentPosX] === -1) {
            kingScorePositions.positions.push(`${i - 1}${currentPosX}`);
            return true;
          }
        }
      }
    }
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
  if (!kings.includes(`${currentPosY}${currentPosX}`)) {
    if (canGetScore.length === 0) {
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
            }
          }
        }
        if (currentPosX !== 0) {
          if (board[currentPosY][currentPosX - 1] === 1 && currentPosX !== 1) {
            if (board[currentPosY][currentPosX - 2] === -1) {
              availableMoves.push(
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
            }
          }
        }
        if (currentPosX !== 0) {
          if (board[currentPosY][currentPosX - 1] === 0 && currentPosX !== 1) {
            if (board[currentPosY][currentPosX - 2] === -1) {
              availableMoves.push(
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
            }
          }
        }
      }
    }
  } else {
    if (canGetScore.includes(`${currentPosY}${currentPosX}`)) {
      availableMoves.push(...kingScorePositions.positions);
    }
  }

  return availableMoves;
}

export function findBestMove(board, currentPlayer, canGetScore, kings) {}
