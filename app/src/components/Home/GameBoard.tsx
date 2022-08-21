import React, { useState } from 'react'
import styled from 'styled-components'
import GameBoardCell from './GameBoardCell'
import {
  getGroupID,
  arrayCopy,
  getCandidate,
  getNextCellId,
  countFilledCell,
} from './helper'
import { getSampleData } from './sample'

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState<(number | null)[][]>(getSampleData())
  let copy_board = getSampleData()

  const onChangeCell = (
    ri: number,
    ci: number,
    candidate: number[],
    value: string
  ) => {
    let val = Number(value)
    if (val > 9) val %= 10
    const tmp = arrayCopy(board)
    if (isNaN(val) || val === 0) tmp[ri][ci] = null
    else if (candidate.includes(val)) tmp[ri][ci] = val
    setBoard(tmp)
  }

  /**
   * 全探索
   */
  const dfs = async (filledCount: number, board_: (number | null)[][]) => {
    setBoard(board_)
    await sleep(5)
    console.log(filledCount)
    if (filledCount == 81) return
    const { ri, ci, candidate } = getNextCellId(board_)
    candidate.map(v => {
      const tmp = arrayCopy(board_)
      tmp[ri][ci] = v
      dfs(filledCount + 1, tmp)
    })
  }

  const dfsWithoutTrace = async (
    filledCount: number,
    board_: (number | null)[][]
  ) => {
    if (filledCount == 81) {
      setBoard(board_)
      return
    }
    const { ri, ci, candidate } = getNextCellId(board_)
    candidate.map(v => {
      const tmp = arrayCopy(board_)
      tmp[ri][ci] = v
      dfsWithoutTrace(filledCount + 1, tmp)
    })
  }

  return (
    <Container>
      {board.map((row, ri) => {
        return (
          <Row key={ri}>
            {row.map((val, ci) => {
              const candidate = getCandidate(board, ri, ci)
              return (
                <GameBoardCellWithBGColor
                  key={ci}
                  value={val}
                  candidate={candidate}
                  onChangeCell={(val: string) =>
                    onChangeCell(ri, ci, candidate, val)
                  }
                  fillBG={[0, 2, 4, 6, 8].includes(getGroupID(ri, ci))}
                />
              )
            })}
          </Row>
        )
      })}
      <button
        onClick={() => {
          // setExecDFS(true)
          copy_board = arrayCopy(board)
          dfs(countFilledCell(board), board)
        }}
      >
        解析
      </button>
      <button
        onClick={() => {
          // setExecDFS(true)
          copy_board = arrayCopy(board)
          dfsWithoutTrace(countFilledCell(board), board)
        }}
      >
        解析(アニメーションなし)
      </button>
      <button onClick={() => setBoard(copy_board)}>リセット</button>
      <button
        onClick={() =>
          setBoard([...Array(9)].map(() => [...Array(9)].fill(null)))
        }
      >
        クリア
      </button>
      <div>
        <h3>仕様</h3>
        <ul>
          <li>入力可能な数字しか入らない</li>
          <li>リセットは「解析」を押す前の状態に戻す</li>
        </ul>
      </div>
    </Container>
  )
}

export default GameBoard

const Container = styled.div`
  height: calc(60px * 9);
  width: calc(60px * 9);
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const GameBoardCellWithBGColor = styled(GameBoardCell)<{ fillBG: boolean }>`
  background: ${props => (props.fillBG ? 'lightgray' : '')};
`

const sleep = (waitTime: number) =>
  new Promise(resolve => setTimeout(resolve, waitTime))
