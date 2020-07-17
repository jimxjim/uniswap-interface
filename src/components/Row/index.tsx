import styled from 'styled-components'
import { Box } from 'rebass/styled-components'

const Row = styled(Box)<{ align?: string; padding?: string; border?: string; borderRadius?: string }>`
  width: 100%;
  display: flex;
  padding: 0;
  align-items: center;
  align-items: ${({ align }) => align && align};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`

export const RowBetween = styled(Row)<{
  align?: string
  padding?: string
  border?: string
  borderRadius?: string
  minWidth?: string
}>`
  justify-content: space-between;
  ${minWidth => (minWidth ? `min-width: ${minWidth}` : '')}
`

export const RowFlat = styled.div`
  display: flex;
  align-items: flex-end;
`

export const AutoRow = styled(Row)<{
  gap?: string
  justify?: string
  flex?: string
  alignItems?: string
  noWrap?: boolean
  alignContent?: string
}>`
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};
  ${({ flex }) => flex && `flex: ${flex};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  flex-wrap: ${({ noWrap }) => (noWrap ? 'no-wrap' : 'wrap')};
  ${({ alignContent }) => alignContent && `align-content: ${alignContent};`}
  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`

export const RowFixed = styled(Row)<{ gap?: string; justify?: string }>`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`
export const RowToColumn = styled(AutoRow)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
    align-items: center;
  `};
`

export default Row
