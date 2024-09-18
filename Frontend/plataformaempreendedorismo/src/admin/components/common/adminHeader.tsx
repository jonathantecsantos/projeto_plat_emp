import RefreshIcon from '@mui/icons-material/Refresh'
import { Button, IconButton } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { InputComponent } from './input'

export interface AdminHeaderProps {
  onSearch: (query: string) => void
  onRefresh?: () => void
  onAdd?: () => void
  addButtonName?: string
  placeholder?: string
}

export const AdminHeader = ({ onSearch, onRefresh, addButtonName, onAdd, placeholder }: AdminHeaderProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTermFromUrl = searchParams.get('search') || ''
  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setSearchParams({ search: value })
    onSearch(value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm)
    }
  }


  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 shadow-md rounded-xl mb-4">
      <div className="flex items-center w-fit">
        <InputComponent
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          showSearchIcon
          // showLabel
          // label={"Pesquisar por nome ou ID"}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="sm:w-80 px-4 py-2 border border-gray-300 
          rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700"
        />
      </div>

      <div className='flex items-center'>
        {onRefresh && <IconButton
          onClick={onRefresh}
          className="mr-2"
        >
          <RefreshIcon />
        </IconButton>}

        {onAdd && <Button
          variant="contained" 
          onClick={onAdd}
          className={`flex bg-[#3B1E86] items-center px-4 py-2 ml-4 ${addButtonName ? 'rounded-md normal-case first-letter:uppercase' : 'rounded-full'}
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700`}>
          <svg
            className={`w-5 h-5 ${addButtonName ? 'mr-2' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          {addButtonName}
        </Button>}
      </div>
    </div>
  )
}
