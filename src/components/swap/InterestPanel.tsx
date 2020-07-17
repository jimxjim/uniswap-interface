import { Token } from '@uniswap/sdk'
import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Text } from 'rebass'
import { TYPE } from '../../theme'
import { AutoRow, RowFlat } from '../../components/Row'
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'

const InputPanel = styled.div<{
  hideInput?: boolean
  alignSelf?: string
}>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 8px;
  background-color: transparent;
  margin-bottom: 30px;
  z-index: 1;
  flex-grow: 1;
  width: 100%;
  max-width: 310px;
  align-self: ${({ alignSelf }) => alignSelf || 'inherit'};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-self: auto;
    max-width: 288px;
  `};
`

const InterestWrapper = styled.div`
  margin-right: 8px;
`
const PeriodSelect = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: flex-end;
  width: 100px;
  cursor: pointer;
  margin: auto 0 auto auto;
  padding: 0.25rem 0 0.25rem 0.5rem;
  user-select: none;
`
const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  margin: 0 0.25rem 0 0.5rem;
  height: 50%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
    stroke-width: 1.5px;
  }
`
const OptionsWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -6rem;
  right: 0px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 0.5rem;
  box-shadow: 8px 8px 32px 0 rgba(186, 196, 221, 0.4);
`
const Option = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  text-align: center;
  &:hover {
    background-color: ${({ theme }) => theme.paleGrey};
  }
`

interface InterestPanelProps {
  percent: number | string
  amount: number | string
  token: Token | string
  period: number | string
}

export default function InterestPanel({ percent, amount, token, period = 0 }: InterestPanelProps) {
  const { t } = useTranslation()

  const periodWords = {
    0: 'Yearly',
    1: 'Monthly'
  }
  const [periodSelected, setPeriodSelected] = useState(period)
  const [selectOpen, setSelectOpen] = useState(false)

  const theme = useContext(ThemeContext)

  return (
    <InputPanel>
      <TYPE.body fontWeight={'bold'} fontSize={16} padding={'0.75rem 0 10px 0'} color={'#352d33'}>
        {'Estimated Interest'}
      </TYPE.body>
      <AutoRow noWrap alignItems="flex-end">
        <InterestWrapper>
          <RowFlat>
            <Text fontSize={44} fontWeight="bold" lineHeight={1} color={theme.text2}>
              {percent}
            </Text>
            <Text fontSize={24} fontWeight="bold" lineHeight={1} color={theme.text2}>
              %
            </Text>
          </RowFlat>
        </InterestWrapper>
        <RowFlat>
          <Text fontSize={24} fontWeight="bold" lineHeight={1} color={theme.text2}>
            {`= ${amount} ${token}`}
          </Text>
        </RowFlat>
        <PeriodSelect onClick={() => setSelectOpen(!selectOpen)}>
          <Text fontSize={16} fontWeight="600" lineHeight={1.75} color={theme.text2}>
            {periodWords[periodSelected]}
          </Text>
          <StyledDropDown selected />
          {selectOpen && (
            <OptionsWrapper>
              <Option onClick={() => setPeriodSelected(0)}>
                <Text fontSize={16} fontWeight="600" lineHeight={1.75} color={theme.text2}>
                  Yearly
                </Text>
              </Option>
              <Option onClick={() => setPeriodSelected(1)}>
                <Text fontSize={16} fontWeight="600" lineHeight={1.75} color={theme.text2}>
                  Monthly
                </Text>
              </Option>
            </OptionsWrapper>
          )}
        </PeriodSelect>
      </AutoRow>
    </InputPanel>
  )
}
