import { CircularProgress } from '@mui/material'
import { useEffect, useMemo, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useGetAllTeamsQuery } from "../../../api/teamApi.slice"
import { TeamsResponse } from "../../../model/team"
import { AdminHeader } from "../common/adminHeader"
import { TableComponent } from "../table"
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from "../table/common"

interface TeamsTableProps {
  routeName: string
}

export const TeamsTable = ({ routeName }: TeamsTableProps) => {
  const { data: teams, refetch, isLoading, error } = useGetAllTeamsQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  const navigate = useNavigate()
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })
  const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current
  if (tableComponentSetCurrPage) tableComponentSetCurrPage({ page: 0 })

  useEffect(() => {
    if (teams) {
      if (teams?.length <= 0) {
        console.log('teams refetch')
        refetch()
      }
    }
  }, [teams, refetch])

  const filteredTeams = useMemo(() => {
    if (!teams) return []
    return teams.filter((team) =>
      team.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.id.toString().includes(searchTerm)
    )
  }, [teams, searchTerm])

  const handleSearch = (query: string) => {
    setSearchParams({ search: query })
  }

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading teams.</p>

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10">
        <AdminHeader onSearch={handleSearch} onRefresh={refetch} placeholder='Pesquisar por nome ou ID' />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          <TableComponent
            colums={['Nome', '', '', 'Ação']}
            wrapperProps={{
              style: {
                maxWidth: 'calc(100% - 10px)',
              }
            }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={filteredTeams!}
            bodyRowBuilder={(team: TeamsResponse) => (
              <>
                <td className="px-4 py-2 capitalize">{team.nome.toLowerCase()}</td>
                <td className="sm:pr-96"></td>
                <td className="xl:pr-96 pr-0"></td>
                <td className="py-2 underline capitalize">Avaliar</td>
              </>
            )}
            onClickRow={(team: TableComponentClickRowProps<TeamsResponse>) => {
              navigate(routeName.replace(':id', team.item?.id.toString()), {
                state: {
                  id: team.item.id,
                  nomeEquipe: team.item.nome
                }
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}
