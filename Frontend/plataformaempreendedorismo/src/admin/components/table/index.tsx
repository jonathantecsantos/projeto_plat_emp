import { LabelDisplayedRowsArgs, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material'
import * as locales from '@mui/material/locale'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'
import { CSSProperties, ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setCurrentPage, setRowsPerPage } from '../../../redux/reducers/table.slice'
import { RootState } from '../../../redux/store'
import TablePaginationActions from './actions'
import { TableBaseComponentProps } from './base'
import { StyledTableRow, SupportedLocales, TableComponentClickRowProps } from './common'

export interface TableComponentProps<T> extends TableBaseComponentProps<T> {
  onClickRow?: (event: TableComponentClickRowProps<T>) => void,
  rowStyle?: CSSProperties | undefined,
}

const StyledTableTitleCell = styled(TableCell)(({ }) => ({
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  backgroundColor: '#3B1E86',
  color: '#ffffff',
  padding: 5,
}))

export function renderTableHeader(columns: string[]) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((c, idx) => (
          <StyledTableTitleCell key={idx} align='left'>{c}</StyledTableTitleCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export const TableComponent = <T,>(props: TableComponentProps<T>) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const routePath = location.pathname;
  const { id } = useSelector((state: RootState) => state.userInfo)

  const rowsPerPage = useSelector((state: RootState) =>
    state.tableState[id]?.[routePath]?.rowsPerPage || 10
  );

  const page = useSelector((state: RootState) =>
    state.tableState[id]?.[routePath]?.currentPage || 0
  )

  const exportToCSVUTF8 = (data: any[]) => {
    if (!data.length) return;

    const processValue = (value: any): string => {
      if (value === null || value === undefined) return '';
      
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }
      
      const stringValue = String(value);
      
      // Se contém separador, quebra de linha ou aspas, envolver em aspas
      if (stringValue.includes(';') || stringValue.includes('\n') || stringValue.includes('"')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      
      return stringValue;
    };

    const headers = Object.keys(data[0]).join(';');
    const rows = data
      .map(item => 
        Object.values(item)
          .map(value => processValue(value))
          .join(';')
      )
      .join('\n');

    const csvContent = `${headers}\n${rows}`;
    

    const utf8 = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const csvBytes = new TextEncoder().encode(csvContent);
    const blob = new Blob([utf8, csvBytes], { 
      type: 'text/csv;charset=utf-8' 
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'export.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  useEffect(() => {
    if (props.setCurrPageRef)
      props.setCurrPageRef.current = setCurrPage
  }, [])

  const setCurrPage = (args: {
    page: number
  }) => {
    dispatch(setCurrentPage({ userId: id, route: routePath, currentPage: args.page }))
  }

  useEffect(() => {
    if (props.onPageChange)
      props.onPageChange(page)
  }, [page])

  useEffect(() => {
    if (props.onRowsPerPageChange)
      props.onRowsPerPageChange(rowsPerPage)
  }, [rowsPerPage])

  const handleChangePage = (_event: unknown, newPage: number) => dispatch(setCurrentPage({ userId: id, route: routePath, currentPage: newPage }))

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage({ userId: id, route: routePath, rowsPerPage: +event.target.value }))
    dispatch(setCurrentPage({ userId: id, route: routePath, currentPage: 0 }))
  }

  // TablePagination
  const [locale] = useState<SupportedLocales>('ptBR')
  const theme = useTheme()
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme],
  )

  const handleLabelDisplayedRows = (paginationInfo: LabelDisplayedRowsArgs) => {
    return defaultPageCount > 1 ? `${page + 1} ${paginationInfo.from}-${paginationInfo.to} de ${paginationInfo.count}` : ''
  }

  const items = props.bodyList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const defaultPageCount = Math.ceil(props.bodyList.length / 10)

  return (
    <div {...props.wrapperProps} className='table-and-pagination-wrapper'>
      <div className='table-wrapper' style={{ boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 3px', width: '100%', overflowX: 'auto', borderRadius: 5, overflow: 'auto' }}>
        <Table>
          {items.length ? props.header : null}
          {items.length ? renderTableHeader(props.colums || []) : null}
          <TableBody className='divide-y divide-gray-200 min-w-screen-md p-8'>
            {items.map((item: T, idx: number) => {
              return (
                <StyledTableRow hover key={idx}
                  className='hover:bg-[hsl(253,44%,45%)] hover:text-white hover:from-neutral-900 
                  even:bg-[hsl(253,44%,95%)] 	lowercase'
                  style={{
                    width: '100%',
                    cursor: props.onClickRow ? 'pointer' : 'default',
                    ...props.rowStyle,
                  }}
                  onClick={(event) => {
                    if (props.onClickRow)
                      props.onClickRow({
                        ...event,
                        item
                      })
                  }}
                >
                  {props.bodyRowBuilder(item, idx)}
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </div >

      {props.bodyList.length ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 10, minHeight: 60 }}>
          <ThemeProvider theme={themeWithLocale}>
            <TablePagination
              component="div"
              count={props.bodyList.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={(subprops) => <TablePaginationActions {...subprops}
                onExport={() => exportToCSVUTF8(props.bodyList)} />}

              labelDisplayedRows={handleLabelDisplayedRows}
              labelRowsPerPage={defaultPageCount > 1 ? undefined : ''}
              rowsPerPageOptions={defaultPageCount > 1 ? undefined : []}
            />
          </ThemeProvider >
        </div>
      ) : <></>}
    </div>
  )
}
