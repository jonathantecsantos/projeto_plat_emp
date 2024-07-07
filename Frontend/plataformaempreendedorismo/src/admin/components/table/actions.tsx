import React from 'react'
import { IconButton, Box } from '@mui/material'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import Tooltip from '@mui/material/Tooltip'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  onExport: () => void
}

const TablePaginationActions: React.FC<TablePaginationActionsProps> = (props) => {
  const { count, page, rowsPerPage, onPageChange, onExport } = props

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }
  const defaultPageCount = Math.ceil(count / rowsPerPage)

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      {defaultPageCount > 1 ? <>
        <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
          <KeyboardArrowRight />
        </IconButton>
        <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
          <LastPageIcon />
        </IconButton>
      </> : <></>}
      <Tooltip title={'Download CSV'}>
        <IconButton onClick={onExport} aria-label="export">
          <SaveAltIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default TablePaginationActions