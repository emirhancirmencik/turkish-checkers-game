export default function checkSquare(position, color, board) {
  let currentPosY = Number(position[0]);
  let currentPosX = Number(position[1]);

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
}
