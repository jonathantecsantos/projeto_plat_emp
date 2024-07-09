import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RoutesNames } from '../../globals'
import { InputComponent } from './input'
import { Button } from '@mui/material'

export const AdminHeader = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTermFromUrl = searchParams.get('search') || ''
  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl)
  const navigate = useNavigate()

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



  const handleAddUser = () => {
    navigate(RoutesNames.createStudent)
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 shadow-md rounded-xl mb-4">
      <div className="flex items-center w-fit">
        <InputComponent
          type="text"
          placeholder="Pesquisar por nome ou ID"
          value={searchTerm}
          showSearchIcon
          // showLabel
          // label={"Pesquisar por nome ou ID"}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Button
        variant="contained" color="primary"
        onClick={handleAddUser}
        className="flex items-center px-4 py-2 ml-4 normal-case first-letter:uppercase rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <svg
          className="w-5 h-5 mr-2"
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
        Adicionar Aluno
      </Button>
    </div>
  )
}
