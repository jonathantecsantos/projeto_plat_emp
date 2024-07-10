import { ListItemText } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import * as locales from '@mui/material/locale'
import styled from '@mui/material/styles/styled'
import React from 'react'

export type SupportedLocales = keyof typeof locales

export const StyledListItemText = styled(ListItemText)(({ }) => ({
  margin: 0
}))

export const StyledTableCell = styled(TableCell)(({ }) => ({
  padding: '8px 16px',
  boxSizing: 'border-box',
}))

export const StyledTableRow = styled(TableRow)<{
  odd?: boolean
}>(({ theme, odd }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: odd ? theme.palette.action.hover : 'initial',
  },
}))

export interface TableComponentClickRowProps<T> extends React.MouseEvent<HTMLTableRowElement, MouseEvent> {
  item: T
}

// EXPORTED METHOD...
export type TableComponentSetCurrPageProps = ((args: {
  page: number
}) => void) | null
// ...EXPORTED METHOD