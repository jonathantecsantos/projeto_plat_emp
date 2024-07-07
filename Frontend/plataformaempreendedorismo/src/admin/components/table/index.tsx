import { LabelDisplayedRowsArgs, Table, TableBody, TablePagination } from '@mui/material';
import * as locales from '@mui/material/locale';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { CSSProperties, ChangeEvent, useEffect, useMemo, useState } from 'react';
import { TableBaseComponentProps } from './base';
import { StyledTableRow, SupportedLocales, TableComponentClickRowProps } from './common';
import TablePaginationActions from './actions';
import { CommonUtils } from 'essencials';
import { TableHead, TableRow, TableCell } from '@mui/material';
import { styled } from '@mui/system';

export interface TableComponentProps<T> extends TableBaseComponentProps<T> {
  onClickRow?: (event: TableComponentClickRowProps<T>) => void,
  rowStyle?: CSSProperties | undefined,
}

const StyledTableTitleCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  backgroundColor: '#152259', 
  color: '#ffffff',
  padding: 5,
}));

function renderTableHeader(columns: string[]) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((c, idx) => (
          <StyledTableTitleCell key={idx} align='left'>{c}</StyledTableTitleCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export const TableComponent = <T,>(props: TableComponentProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (props.setCurrPageRef)
      props.setCurrPageRef.current = setCurrPage;
  }, []);

  const setCurrPage = (args: {
    page: number
  }) => {
    setPage(args.page);
  };

  useEffect(() => {
    if (props.onPageChange)
      props.onPageChange(page);
  }, [page]);

  useEffect(() => {
    if (props.onRowsPerPageChange)
      props.onRowsPerPageChange(rowsPerPage);
  }, [rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // TablePagination
  const [locale] = useState<SupportedLocales>('ptBR');
  const theme = useTheme();
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme],
  );

  const handleLabelDisplayedRows = (paginationInfo: LabelDisplayedRowsArgs) => {
    return defaultPageCount > 1 ? `${page + 1} ${paginationInfo.from}-${paginationInfo.to} de ${paginationInfo.count}` : '';
  };

  const items = props.bodyList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const defaultPageCount = Math.ceil(props.bodyList.length / 10);

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
                  className='hover:bg-[#509CDB] hover:text-white hover:from-neutral-900 
                  even:bg-[#EBF6FF] 	lowercase'
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
                      });
                  }}
                >
                  {props.bodyRowBuilder(item, idx)}
                </StyledTableRow>
              );
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
                onExport={() => CommonUtils.exportToCSV(props.bodyList)} />}

              labelDisplayedRows={handleLabelDisplayedRows}
              labelRowsPerPage={defaultPageCount > 1 ? undefined : ''}
              rowsPerPageOptions={defaultPageCount > 1 ? undefined : []}
            />
          </ThemeProvider >
        </div>
      ) : <></>}
    </div>
  );
};
