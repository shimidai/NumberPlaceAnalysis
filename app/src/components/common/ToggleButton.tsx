import React from 'react'
import styled from 'styled-components'

type Props = {
  toggled: boolean
  disabled: boolean
  onClick: () => void
}

const ToggleButton: React.FC<Props> = ({ toggled, disabled, onClick }) => {
  return <Container toggled={toggled} disabled={disabled} onClick={onClick} />
}

export default ToggleButton

const Container = styled.div<{ toggled: boolean; disabled: boolean }>`
  cursor: pointer;
  width: 3rem;
  height: 1rem;
  background: ${props => (props.toggled ? '#bada55' : 'gray')};
  border-radius: 1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0.1rem;
    left: ${props =>
      props.toggled ? 'calc(100% - 0.1rem - 0.8rem)' : '0.1rem'};
    width: 0.8rem;
    height: 0.8rem;
    background: #fff;
    border-radius: 0.4rem;
    transition: 0.3s;
  }
`
