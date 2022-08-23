import React, { useState } from 'react'
import styled from 'styled-components'
import GameBoardCell from './GameBoardCell'
import ToggleButton2 from '../common/ToggleButton'
import {
  dfs,
  setCancelFlag,
  resetCancelFlag,
  arrayCopy,
  getGroupID,
  getCandidate,
  countFilledCell,
} from './helper'
import { getSampleData } from './sample'

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState<(number | null)[][]>(getSampleData())
  const [copy_board, setCopyBoard] = useState<(number | null)[][]>(
    getSampleData()
  )
  const [withAnimation, setWithAnimation] = useState<boolean>(false)
  const [isAnalysing, setIsAnalysing] = useState<boolean>(false)

  const setBoard_ = (board_: (number | null)[][]) => {
    setBoard(board_)
  }

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

  return (
    <Container>
      {board.map((row, ri) => (
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
      ))}
      残りマス数：{81 - countFilledCell(board)}
      <ControllArea>
        <FlexLeft>
          <div>アニメーション&nbsp;</div>
          <ToggleButton2
            toggled={withAnimation}
            disabled={false}
            onClick={() => setWithAnimation(!withAnimation)}
          />
        </FlexLeft>
        {isAnalysing ? (
          <CancelButton
            onClick={() => {
              setCancelFlag()
              setIsAnalysing(false)
              setBoard(copy_board)
            }}
          >
            中止
          </CancelButton>
        ) : (
          <>
            <Button
              onClick={async () => {
                if (isAnalysing || countFilledCell(board) == 81) return
                setIsAnalysing(true)
                resetCancelFlag()
                setCopyBoard(arrayCopy(board))
                dfs(
                  withAnimation,
                  countFilledCell(board),
                  board,
                  setBoard_
                ).finally(() => setIsAnalysing(false))
              }}
            >
              解析
            </Button>
            <Button onClick={() => setBoard(copy_board)}>リセット</Button>
            <Button
              onClick={() =>
                setBoard([...Array(9)].map(() => [...Array(9)].fill(null)))
              }
            >
              クリア
            </Button>
          </>
        )}

        <div>
          <h3>仕様</h3>
          <ul>
            <li>入力可能な数字しか入らない</li>
            <li>リセットは「解析」を押す前の状態に戻す</li>
          </ul>
        </div>
      </ControllArea>
    </Container>
  )
}

export default GameBoard

const Container = styled.div`
  height: 540px;
  width: 540px;
  margin: 1rem;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const GameBoardCellWithBGColor = styled(GameBoardCell)<{ fillBG: boolean }>`
  background: ${props => (props.fillBG ? 'lightgray' : '')};
`

const ControllArea = styled.div`
  margin-top: 1rem;
`

const FlexLeft = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`

const CancelButton = styled.button`
  width: 540px;
`

const Button = styled.button`
  width: 180px;
`
