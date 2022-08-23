import React from 'react'
import styled from 'styled-components'

type Props = {
  value: number | null
  candidate: number[]
  onChangeCell: (val: string) => void
  className?: string
}

const GameBoardCell: React.FC<Props> = ({
  value,
  candidate,
  onChangeCell,
  className,
}) => {
  return (
    <label>
      <Container className={className}>
        {value
          ? value
          : [0, 1, 2].map((v1, k1) => (
              <InternalRow key={k1}>
                {[1, 2, 3].map((v2, k2) => (
                  <InternalCell
                    key={k2}
                    isShow={candidate.includes(3 * v1 + v2)}
                  >
                    {3 * v1 + v2}
                  </InternalCell>
                ))}
              </InternalRow>
            ))}

        <InputCell
          type="number"
          value={value ? value : ''}
          onChange={e => onChangeCell(e.target.value)}
        />
      </Container>
    </label>
  )
}

export default GameBoardCell

const Container = styled.div`
  height: 58px;
  width: 58px;
  border: 1px solid black;
  line-height: 58px;
  text-align: center;
  font-size: 25px;

  :focus-within {
    background: #ffff9e;
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`

const InternalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InternalCell = styled.div<{ isShow: boolean }>`
  height: 20px;
  width: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 1px;
  opacity: ${props => (props.isShow ? 1 : 0)};
`

const InputCell = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  height: 0px;
  width: 0px;
`
