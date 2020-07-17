import React from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import useLast from '../../hooks/useLast'
import { AdvancedSwapDetails, AdvancedSwapDetailsProps } from './AdvancedSwapDetails'

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  padding-top: calc(20px + 2rem);
  padding-bottom: 20px;
  margin-top: -2rem;
  width: 100%;
  max-width: 350px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.white};
  z-index: -1;
  align-self: flex-end;
  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-90%)')};
  transition: transform 300ms ease-in-out;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 420px;
    align-self: inherit;
  `};
`

export default function AdvancedSwapDetailsDropdown({ trade, ...rest }: AdvancedSwapDetailsProps) {
  const lastTrade = useLast(trade)

  return (
    <AdvancedDetailsFooter show={Boolean(trade)}>
      <AdvancedSwapDetails {...rest} trade={trade ?? lastTrade} />
    </AdvancedDetailsFooter>
  )
}
