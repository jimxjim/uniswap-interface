import React, { useState, useRef, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Text } from 'rebass'

import { TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import { RowBetween, RowFixed } from '../Row'

import { darken } from 'polished'

enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh'
}

enum DeadlineError {
  InvalidInput = 'InvalidInput'
}

const FancyButton = styled.button`
  color: ${({ theme }) => theme.primary6};
  align-items: center;
  min-width: 64px;
  width: auto;
  height: 3rem;
  line-height: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.paleGrey};
  outline: none;
  background: ${({ theme }) => theme.paleGrey};
  :hover {
    border: 1px solid ${({ theme }) => theme.bg4};
  }
  :active {
    border: 1px solid ${({ theme }) => theme.bg4};
  }
  :focus {
    background: ${({ theme }) => theme.bgBlue};
    border: 1px solid ${({ theme }) => theme.bg4};
  }
`

const Option = styled(FancyButton)<{ active: boolean }>`
  margin-right: 8px;
  background: ${({ active, theme }) => active && theme.bgBlue};
  color: ${({ active, theme }) => (active ? theme.white : theme.primary6)};
  :hover {
    cursor: pointer;
    border: 1px solid ${({ active, theme }) => !active && theme.bg4};
  }
  &:last-of-type {
    margin-right: 0px;
  }
`

const Input = styled.input`
  background: ${({ theme }) => theme.bg1};
  font-size: 16px;
  width: auto;
  outline: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
  text-align: right;
`

const OptionCustom = styled(FancyButton)<{ active?: boolean; warning?: boolean }>`
  color: ${({ theme }) => theme.text2};
  position: relative;
  padding: 0 0.75rem;
<<<<<<< HEAD
  flex: 1;
=======
  margin-right: 8px;
  background-color: ${({ theme }) => theme.paleGrey};
>>>>>>> e18d886... hToken panel v1
  border: ${({ theme, active, warning }) => active && `1px solid ${warning ? theme.red1 : theme.primary1}`};
  :hover {
    border: ${({ theme, active, warning }) =>
      active && `1px solid ${warning ? darken(0.1, theme.red1) : darken(0.1, theme.primary1)}`};
  }
  :active {
    background-image: none;
    background-color: ${({ theme }) => theme.paleGrey};
    border: 1px solid ${({ theme }) => theme.bg4};
  }
  :focus {
    background-image: none;
    background-color: ${({ theme }) => theme.paleGrey};
    border: 1px solid ${({ theme }) => theme.bg4};
  }
  input {
    width: 100%;
    height: 100%;
    border: 0px;
    border-radius: 2rem;
    background-color: ${({ theme }) => theme.paleGrey};
    text-align: left;
  }
`

const SlippageEmojiContainer = styled.span`
  color: #f3841e;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;  
  `}
`

export interface SlippageTabsProps {
  rawSlippage: number
  setRawSlippage: (rawSlippage: number) => void
  deadline: number
  setDeadline: (deadline: number) => void
}

export default function SlippageTabs({ rawSlippage, setRawSlippage, deadline, setDeadline }: SlippageTabsProps) {
  const theme = useContext(ThemeContext)

  const inputRef = useRef<HTMLInputElement>()

  const [slippageInput, setSlippageInput] = useState('')
  const [deadlineInput, setDeadlineInput] = useState('')

  const slippageInputIsValid =
    slippageInput === '' || (rawSlippage / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2)
  const deadlineInputIsValid = deadlineInput === '' || (deadline / 60).toString() === deadlineInput

  let slippageError: SlippageError
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput
  } else if (slippageInputIsValid && rawSlippage < 50) {
    slippageError = SlippageError.RiskyLow
  } else if (slippageInputIsValid && rawSlippage > 500) {
    slippageError = SlippageError.RiskyHigh
  }

  let deadlineError: DeadlineError
  if (deadlineInput !== '' && !deadlineInputIsValid) {
    deadlineError = DeadlineError.InvalidInput
  }

  function parseCustomSlippage(event) {
    setSlippageInput(event.target.value)

    let valueAsIntFromRoundedFloat: number
    try {
      valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(event.target.value) * 100).toString())
    } catch {}

    if (
      typeof valueAsIntFromRoundedFloat === 'number' &&
      !Number.isNaN(valueAsIntFromRoundedFloat) &&
      valueAsIntFromRoundedFloat < 5000
    ) {
      setRawSlippage(valueAsIntFromRoundedFloat)
    }
  }

  function parseCustomDeadline(event) {
    setDeadlineInput(event.target.value)

    let valueAsInt: number
    try {
      valueAsInt = Number.parseInt(event.target.value) * 60
    } catch {}

    if (typeof valueAsInt === 'number' && !Number.isNaN(valueAsInt) && valueAsInt > 0) {
      setDeadline(valueAsInt)
    }
  }

  return (
    <AutoColumn gap="4px">
      <AutoColumn gap="sm">
        <Text fontWeight={'bold'} fontSize={16}>
          Slippage tolerance
        </Text>
      </AutoColumn>
      <AutoColumn gap="md" margin={'0 0 16px 0;'}>
        <RowFixed>
          <TYPE.black
            fontWeight={'normal'}
            fontSize={14}
            color={theme.text2}
            lineHeight={'normal'}
            letterSpacing={1}
            padding={'0 0.5rem 0 0'}
          >
            Your transaction will revert if the price changes unfavorably by more than this percentage.
          </TYPE.black>
        </RowFixed>
        <RowBetween minWidth="auto">
          <OptionCustom active={![10, 50, 100].includes(rawSlippage)} warning={!slippageInputIsValid} tabIndex={-1}>
            <RowBetween>
              {/* {!!slippageInput &&
              (slippageError === SlippageError.RiskyLow || slippageError === SlippageError.RiskyHigh) ? (
                <span role="img" aria-label="warning" style={{ color: '#F3841E' }}>
                  ⚠️
                </span>
              ) : null} */}
              <Input
                ref={inputRef}
                placeholder={(rawSlippage / 100).toFixed(2)}
                value={slippageInput}
                onBlur={() => {
                  parseCustomSlippage({ target: { value: (rawSlippage / 100).toFixed(2) } })
                }}
                onChange={parseCustomSlippage}
                color={!slippageInputIsValid ? 'red' : ''}
              />
              %
            </RowBetween>
          </OptionCustom>
          <Option
            onClick={() => {
              setSlippageInput('')
              setRawSlippage(10)
            }}
            active={rawSlippage === 10}
          >
            0.1%
          </Option>
          <Option
            onClick={() => {
              setSlippageInput('')
              setRawSlippage(50)
            }}
            active={rawSlippage === 50}
          >
            0.5%
          </Option>
          <Option
            onClick={() => {
              setSlippageInput('')
              setRawSlippage(100)
            }}
            active={rawSlippage === 100}
          >
            1%
          </Option>
        </RowBetween>
        {!!slippageError && (
          <RowBetween
            style={{
              fontSize: '14px',
              paddingTop: '7px',
              color: slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E'
            }}
          >
            {slippageError === SlippageError.InvalidInput
              ? 'Enter a valid slippage percentage'
              : slippageError === SlippageError.RiskyLow
              ? 'Your transaction may fail'
              : 'Your transaction may be frontrun'}
          </RowBetween>
        )}
      </AutoColumn>

      <AutoColumn gap="sm">
        <Text fontWeight={'bold'} fontSize={16}>
          Transaction Deadline
        </Text>
      </AutoColumn>
      <AutoColumn gap="md">
        <RowFixed>
          <TYPE.black
            fontWeight={'normal'}
            fontSize={14}
            color={theme.text2}
            lineHeight={'normal'}
            letterSpacing={1}
            padding={'0 0.5rem 0 0'}
          >
            Your transaction will revert if it is pending for more than this long.
          </TYPE.black>
        </RowFixed>
        <RowBetween minWidth="auto">
          <OptionCustom style={{ width: '100%', margin: '0px' }} tabIndex={-1}>
            <RowBetween>
              <Input
                color={!!deadlineError ? 'red' : undefined}
                onBlur={() => {
                  parseCustomDeadline({ target: { value: (deadline / 60).toString() } })
                }}
                placeholder={(deadline / 60).toString()}
                value={deadlineInput}
                onChange={parseCustomDeadline}
              />
              minutes
            </RowBetween>
          </OptionCustom>
          {/* <TYPE.body style={{ paddingLeft: '8px' }} fontSize={14}>
            minutes
          </TYPE.body> */}
        </RowBetween>
      </AutoColumn>
    </AutoColumn>
  )
}
