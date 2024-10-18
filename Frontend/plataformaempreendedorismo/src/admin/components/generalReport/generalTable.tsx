import {
  Table,
  TablePagination
} from '@mui/material'
import * as locales from '@mui/material/locale'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import { CommonUtils } from 'essencials'
import { useMemo, useState } from 'react'
import { renderTableHeader } from '../table'
import TablePaginationActions from '../table/actions'
import { StyledTableCell, StyledTableRow } from '../table/common'

interface Score {
  totalNota: number | string
}

interface BodyItem {
  criterio: string
  subcriterio: string
  scores: Record<string, Score> // Chave como o nome da equipe e valor como Score
}

interface TableComponentProps {
  columns: string[]
  bodyList: BodyItem[]
  teams: string[] // Array de strings representando os times
}

export const GeneralTableComponent = ({ columns, bodyList, teams }: TableComponentProps) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  const theme = useTheme()
  const themeWithLocale = useMemo(() => createTheme(theme, locales['ptBR']), [theme])

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLElement>) => {
    const target = event.target as HTMLSelectElement // Garantindo que target é HTMLSelectElement
    setRowsPerPage(+target.value)
    setPage(0)
  }

  const handleLabelDisplayedRows = ({ from, to, count }: { from: number, to: number, count: number }) =>
    `${from}-${to} de ${count}`

  const paginatedItems = bodyList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <div style={{ boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 3px', width: '100%', overflowX: 'auto', borderRadius: 5 }}>
      <Table>
        {paginatedItems.length ? renderTableHeader(columns || []) : null}
        <tbody className='cursor-default overflow-auto'>
          {paginatedItems.map((item, idx) => (
            <StyledTableRow hover key={idx} className='hover:bg-[hsl(253,44%,45%)] hover:text-white hover:from-neutral-900 even:bg-[hsl(253,44%,95%)]' >
              <StyledTableCell className='text-nowrap'>{item.criterio}</StyledTableCell>
              <StyledTableCell className='text-nowrap'>{item.subcriterio}</StyledTableCell>

              {teams.map((team, index) => (
                <StyledTableCell className='text-center' key={index}>
                  {item.scores[team] ? item.scores[team].totalNota : 'Sem nota'}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </tbody>
      </Table>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
        <ThemeProvider theme={themeWithLocale}>
          <TablePagination
            component="div"
            count={bodyList.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={handleLabelDisplayedRows}
            ActionsComponent={(subprops) => (
              <TablePaginationActions {...subprops} onExport={() => CommonUtils.exportToCSV(bodyList)} />
            )}
          />
        </ThemeProvider>
      </div>
    </div >
  )
}
