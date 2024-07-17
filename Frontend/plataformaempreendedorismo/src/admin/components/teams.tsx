import { CircularProgress } from '@mui/material'
import { useEffect, useMemo, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useGetAllTeamsQuery } from "../../api/teamApi.slice"
import { AdminHeader } from "../../components/common/adminHeader"
import { RoutesNames } from '../../globals'
import { Team } from "../../model/team"
import { TableComponent } from "./table"
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from "./table/common"

export const Teams = () => {
  const { data: teams, refetch, isLoading, error } = useGetAllTeamsQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''


  const navigate = useNavigate()
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })
  const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current
  if (tableComponentSetCurrPage) tableComponentSetCurrPage({ page: 0 })
  // const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (teams) {
      if (teams?.length <= 0) {
        console.log('teams refetch')
        refetch()
      }
    }
  }, [])


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
        <AdminHeader onSearch={handleSearch} onRefresh={refetch} placeholder='Pesquisar por nome ou ID'
        // onAdd={() => navigate(RoutesNames.team)}
        // addButtonName='Adicionar Equipe'
        />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          <TableComponent
            colums={[
              'ID',
              'Nome',
              'Link Pitch'
            ]}
            wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={filteredTeams!}
            bodyRowBuilder={(team: Team) => (
              <>
                <td className="px-4 py-2">{team.id}</td>
                <td className="px-4 py-2 capitalize">{team.nome.toLowerCase()}</td>
                <td className="px-4 py-2">{team.linkPitch ? team.linkPitch : '--'}</td>
              </>
            )}
            onClickRow={(team: TableComponentClickRowProps<Team>) => {
              navigate(RoutesNames.team.replace(':id', team.item?.id.toString()))
            }}
          />
        </div>
      </div>
    </div>
  )
}