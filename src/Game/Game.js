export let kingScorePositions = { positions: [] };

export default function checkSquare(position, color, board, kings, check) {
  let currentPosY = Number(position[0]);
  let currentPosX = Number(position[1]);

  if (!kings.includes(position) && check) {
    console.log("aaa");
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
    let canMove = false;
    for (let i = 1; i <= 6 - currentPosY; ) {
      console.log("a");
      if (board[currentPosY + i][currentPosX] === -1) {
        i++;
      } else if (board[currentPosY + i][currentPosX] === color) {
        i = 7;
      } else if (board[currentPosY + i][currentPosX] === Number(!color)) {
        if (board[currentPosY + i + 1][currentPosX] === -1) {
          kingScorePositions.positions.push(
            `${currentPosY + i + 1}${currentPosX}`
          );
          canMove = true;
        }
        i = 7;
      }
    }
    for (let j = currentPosY - 1; 1 <= j; ) {
      console.log("b");
      console.log("test1");
      if (board[j][currentPosX] === -1) {
        console.log("test2");
        j--;
      } else if (board[j][currentPosX] === color) {
        console.log("test3");
        j = 0;
      } else if (board[j][currentPosX] === Number(!color)) {
        console.log("test4");
        if (board[j - 1][currentPosX] === -1) {
          console.log("test6");
          kingScorePositions.positions.push(`${j - 1}${currentPosX}`);
          console.log(kingScorePositions.positions);
          canMove = true;
        }
        j = 0;
      }
    }

    for (let i = 1; i <= 6 - currentPosX; ) {
      console.log("c");
      if (board[currentPosY][currentPosX + i] === -1) {
        i++;
      } else if (board[currentPosY][currentPosX + i] === color) {
        i = 7;
      } else if (board[currentPosY][currentPosX + i] === Number(!color)) {
        if (board[currentPosY][currentPosX + i + 1] === -1) {
          kingScorePositions.positions.push(
            `${currentPosY}${currentPosX + i + 1}`
          );
          canMove = true;
        }
        i = 7;
      }
    }

    for (let j = currentPosX - 1; 1 <= j; ) {
      console.log("d");
      console.log("test1");
      if (board[currentPosY][j] === -1) {
        console.log("test2");
        j--;
      } else if (board[currentPosY][j] === color) {
        console.log("test3");
        j = 0;
      } else if (board[currentPosY][j] === Number(!color)) {
        console.log("test4");
        if (board[currentPosY][j - 1] === -1) {
          console.log("test6");
          kingScorePositions.positions.push(`${currentPosY}${j - 1}`);
          console.log(kingScorePositions.positions);
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

  return availableMoves;
}
