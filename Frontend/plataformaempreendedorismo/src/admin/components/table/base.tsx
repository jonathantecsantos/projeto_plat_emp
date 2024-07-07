import { LabelDisplayedRowsArgs, Table, TableBody, TablePagination } from '@mui/material'
import * as locales from '@mui/material/locale'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import React, { ChangeEvent, DetailedHTMLProps, ReactNode, useEffect, useMemo, useState } from 'react'
import { SupportedLocales, TableComponentSetCurrPageProps } from './common'
import TablePaginationActions from './actions'
import { CommonUtils } from 'essencials'

export interface TableBaseComponentProps<T> {
  bodyList: T[],
  header?: ReactNode,
  colums?: string[],
  bodyRowBuilder: (item: T, idx: number) => ReactNode,
  onPageChange?: (page: number) => void,
  onRowsPerPageChange?: (rowsPerPage: number) => void,
  wrapperProps?: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

  // EXPORTED METHOD...
  setCurrPageRef?: React.MutableRefObject<TableComponentSetCurrPageProps>
  // ...EXPORTED METHOD
}

function mergeArrays<T>(...arrays: T[][]): T[] {
  const combinedArray = arrays.reduce((acc, curr) => acc.concat(curr), [])
  const uniqueArray = Array.from(new Set(combinedArray))
  return uniqueArray
}

export const TableBaseComponent = <T,>(props: TableBaseComponentProps<T>) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // EXPORTED METHOD...  
  useEffect(() => {
    if (props.setCurrPageRef)
      props.setCurrPageRef.current = setCurrPage;
  }, []);

  const setCurrPage = (args: {
    page: number
  }) => {
    setPage(args.page)
  };
  // ...EXPORTED METHOD

  useEffect(() => {
    if (props.onPageChange)
      props.onPageChange(page)
  }, [page])

  useEffect(() => {
    if (props.onRowsPerPageChange)
      props.onRowsPerPageChange(rowsPerPage)
  }, [rowsPerPage])

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage)

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  //TablePagination
  const [locale] = useState<SupportedLocales>('ptBR')
  const theme = useTheme()
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme],
  )

  const handleLabelDisplayedRows = (paginationInfo: LabelDisplayedRowsArgs) => {
 
    return defaultPageCount > 1 ? `${page + 1} ${paginationInfo.from}-${paginationInfo.to} de ${paginationInfo.count}` : '';
  };

  const items = props.bodyList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
 
  const defaultPageCount = Math.ceil(props.bodyList.length / 10)

  return <>
    <div {...props.wrapperProps} className='table-and-pagination-wrapper'>
      <div className='table-wrapper' style={{ boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 3px', width: '100%', overflowX: 'auto', borderRadius: 5, overflow: 'auto' }}>
        <table className="table-auto min-w-full divide-y divide-gray-200 min-w-screen-md p-8 ">
          {items.length ? props.header : null}
          {items.length ? props.colums : null}
          <tbody className="divide-y w-full">
            {items.map((item: T, idx: number) => {
              return props.bodyRowBuilder(item, idx)
            })}
          </tbody>
        </table>
      </div >

      {props.bodyList.length ? <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 10, minHeight: 60 }}>
        <ThemeProvider theme={themeWithLocale}>
          <TablePagination
            component="div"
            count={props.bodyList.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={(subprops) => <TablePaginationActions {...subprops} onExport={() => CommonUtils.exportToCSV(props.bodyList)} />}

            labelDisplayedRows={handleLabelDisplayedRows}
            labelRowsPerPage={defaultPageCount > 1 ? undefined : ''}
            rowsPerPageOptions={defaultPageCount > 1 ? undefined : []}
          />
        </ThemeProvider >
      </div> : <></>}
    </div>
  </>
}