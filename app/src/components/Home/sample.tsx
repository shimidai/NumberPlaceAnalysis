const getSampleData = (): (number | null)[][] => {
  return _sample2()
}

export { getSampleData }

const _sample1 = (): (number | null)[][] => {
  // 世界一難しいと言われる Arto Inkala さんの問題
  const board = [...Array(9)].map(() => [...Array(9)].fill(null))
  board[0][0] = 8
  board[1][2] = 3
  board[1][3] = 6
  board[2][1] = 7
  board[2][4] = 9
  board[2][6] = 2
  board[3][1] = 5
  board[3][5] = 7
  board[4][4] = 4
  board[4][5] = 5
  board[4][6] = 7
  board[5][3] = 1
  board[5][7] = 3
  board[6][2] = 1
  board[6][7] = 6
  board[6][8] = 8
  board[7][2] = 8
  board[7][3] = 5
  board[7][7] = 1
  board[8][1] = 9
  board[8][6] = 4
  return board
}

const _sample2 = (): (number | null)[][] => {
  const board = [...Array(9)].map(() => [...Array(9)].fill(null))
  board[0][4] = 6
  board[0][6] = 7
  board[1][0] = 6
  board[1][1] = 8
  board[1][4] = 7
  board[1][7] = 9
  board[2][1] = 9
  board[2][5] = 4
  board[2][6] = 5
  board[3][0] = 8
  board[3][7] = 4
  board[4][2] = 4
  board[4][3] = 6
  board[4][5] = 2
  board[4][6] = 9
  board[5][1] = 5
  board[5][5] = 3
  board[5][7] = 2
  board[5][8] = 8
  board[6][2] = 9
  board[6][3] = 3
  board[6][7] = 7
  board[6][8] = 4
  board[7][1] = 4
  board[7][4] = 5
  board[7][7] = 3
  board[7][8] = 6
  board[8][0] = 7
  board[8][2] = 3
  board[8][5] = 8
  return board
}
