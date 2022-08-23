type BoardType = (number | null)[][]

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

const arrayCopy = (arr: BoardType): BoardType => {
  const copied = new Array(9)
  for (let i = 0; i < 9; i++) copied[i] = [...arr[i]]
  return copied
}

const _filterNotNull = (list: (number | null)[]): number[] =>
  list.filter(v => v !== null) as number[]

const getCandidate = (board: BoardType, ri: number, ci: number): number[] => {
  const r_candidate = _filterNotNull(board[ri])
  const c_candidate = _filterNotNull(board.map(row => row[ci]))
  const g_candidate = _filterNotNull(
    getIndexesByGroupID(getGroupID(ri, ci)).map(idx => board[idx[0]][idx[1]])
  )

  const tmp_list: number[] = []
  const selected_numbers = Array.from(
    new Set(tmp_list.concat(r_candidate, c_candidate, g_candidate))
  )

  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(v => !selected_numbers.includes(v))
}

const getNextCellId = (
  board: BoardType
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

const countFilledCell = (board: BoardType): number => {
  let count = 0
  for (let ri = 0; ri < 9; ri++) {
    for (let ci = 0; ci < 9; ci++) {
      if (board[ri][ci] !== null) count += 1
    }
  }
  return count
}

const sleep = (waitTime: number) =>
  new Promise(resolve => setTimeout(resolve, waitTime))

/**
 * 解析を途中でキャンセルした際に true となる
 */
let cancelFlag = false

const setCancelFlag = (): void => {
  cancelFlag = true
}
const resetCancelFlag = (): void => {
  cancelFlag = false
}

const _dfsWithAnimation = async (
  filledCount: number,
  board: BoardType,
  setBoard: (board: BoardType) => void
): Promise<BoardType | null> => {
  if (cancelFlag) return null
  setBoard(board)
  await sleep(5)
  const { ri, ci, candidate } = getNextCellId(board)
  for (let i = 0; i < candidate.length; i++) {
    const tmp = arrayCopy(board)
    tmp[ri][ci] = candidate[i]
    if (filledCount + 1 == 81) return tmp
    const board_ = await _dfsWithAnimation(filledCount + 1, tmp, setBoard)
    if (board_ !== null) return board_
  }
  return null
}

const _dfsWithoutAnimation = (
  filledCount: number,
  board: BoardType
): BoardType | null => {
  if (cancelFlag) return null
  const { ri, ci, candidate } = getNextCellId(board)
  for (let i = 0; i < candidate.length; i++) {
    const tmp = arrayCopy(board)
    tmp[ri][ci] = candidate[i]
    if (filledCount + 1 == 81) return tmp
    const board_ = _dfsWithoutAnimation(filledCount + 1, tmp)
    if (board_ !== null) return board_
  }
  return null
}

const dfs = async (
  withAnimation: boolean,
  filledCount: number,
  board: BoardType,
  setBoard: (board_: BoardType) => void
): Promise<void> => {
  let board_: BoardType | null = null
  if (withAnimation) {
    board_ = await _dfsWithAnimation(filledCount, board, setBoard)
  } else {
    board_ = _dfsWithoutAnimation(filledCount, board)
  }
  if (board_ !== null) setBoard(board_)
  else if (!cancelFlag) window.alert('解が得られませんでした')
}

export {
  dfs,
  setCancelFlag,
  resetCancelFlag,
  arrayCopy,
  getGroupID,
  getCandidate,
  countFilledCell,
}
