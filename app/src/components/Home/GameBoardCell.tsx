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
          min={1}
          max={9}
          value={value ? value : undefined}
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
  /* reset css start */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: none;
  border-radius: 0;
  font: inherit;
  outline: none;
  padding: 0;
  margin: 0;
  /* reset css end */
  height: 0px;
  width: 0px;
  font-size: 1px;
`
