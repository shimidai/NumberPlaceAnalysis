const group_map = [
  [0, 0, 0, 1, 1, 1, 2, 2, 2],
  [0, 0, 0, 1, 1, 1, 2, 2, 2],
  [0, 0, 0, 1, 1, 1, 2, 2, 2],
  [3, 3, 3, 4, 4, 4, 5, 5, 5],
  [3, 3, 3, 4, 4, 4, 5, 5, 5],
  [3, 3, 3, 4, 4, 4, 5, 5, 5],
  [6, 6, 6, 7, 7, 7, 8, 8, 8],
  [6, 6, 6, 7, 7, 7, 8, 8, 8],
  [6, 6, 6, 7, 7, 7, 8, 8, 8],
]

const getGroupID = (ri: number, ci: number): number => {
  return group_map[ri][ci]
}

const getIndexesByGroupID = (id: number): number[][] => {
  const list = []
  for (let ri = 0; ri < 9; ri++) {
    for (let ci = 0; ci < 9; ci++) {
      if (group_map[ri][ci] == id) list.push([ri, ci])
    }
  }
  return list
}

const arrayCopy = (arr: (number | null)[][]): (number | null)[][] => {
  const copied = new Array(9)
  for (let i = 0; i < 9; i++) copied[i] = [...arr[i]]
  return copied
}

const _filterNotNull = (list: (number | null)[]): number[] =>
  list.filter(v => v !== null) as number[]

const getCandidate = (
  board: (number | null)[][],
  ri: number,
  ci: number
): number[] => {
  const r_candidate = _filterNotNull(board[ri])
  // 列に関して選択済みの数字一覧
  const c_candidate = _filterNotNull(board.map(row => row[ci]))
  // グループに関して選択済みの数字一覧
  const g_id = getGroupID(ri, ci)
  const g_candidate = _filterNotNull(
    getIndexesByGroupID(g_id).map(idx => board[idx[0]][idx[1]])
  )

  const tmp_list: number[] = []
  const selected_numbers = Array.from(
    new Set(tmp_list.concat(r_candidate, c_candidate, g_candidate))
  )

  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(v => !selected_numbers.includes(v))
}

const getNextCellId = (
  board: (number | null)[][]
): { ri: number; ci: number; candidate: number[] } => {
  let _ri = 0
  let _ci = 0
  let val = 9
  let candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (let ri = 0; ri < 9; ri++) {
    for (let ci = 0; ci < 9; ci++) {
      if (board[ri][ci] === null) {
        const candidate_ = getCandidate(board, ri, ci)
        const val_ = candidate_.length
        if (val_ < val) {
          val = val_
          candidate = candidate_
          _ri = ri
          _ci = ci
        }
      }
    }
  }
  return { ri: _ri, ci: _ci, candidate: candidate }
}

const countBlankCell = (board: (number | null)[][]): number => {
  let count = 0
  for (let ri = 0; ri < 9; ri++) {
    for (let ci = 0; ci < 9; ci++) {
      if (board[ri][ci] === null) count += 1
    }
  }
  return count
}

const countFilledCell = (board: (number | null)[][]): number => {
  let count = 0
  for (let ri = 0; ri < 9; ri++) {
    for (let ci = 0; ci < 9; ci++) {
      if (board[ri][ci] !== null) count += 1
    }
  }
  return count
}

export {
  arrayCopy,
  getGroupID,
  getIndexesByGroupID,
  getCandidate,
  getNextCellId,
  countBlankCell,
  countFilledCell,
}
