import CheckIcon from '@mui/icons-material/Check'
import { CircularProgress } from '@mui/material'
import { useEffect, useMemo, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useGetTeamsEvaluationsQuery } from '../../../api/studentApi'
import { TeamEvaluation, TeamEvaluationResponse } from '../../../model/evaluationFormat'
import { AdminHeader } from "../common/adminHeader"
import { TableComponent } from "../table"
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from "../table/common"


interface TeamsTableProps {
  routeName: string
  teamEvaluation: TeamEvaluation
}

export const TeamsTable = ({ routeName, teamEvaluation }: TeamsTableProps) => {
  const { data: teams, refetch, isLoading, error } = useGetTeamsEvaluationsQuery(
    {
      evaluationTypeId: teamEvaluation.evaluationTypeId,
      evaluatorId: teamEvaluation.evaluatorId
    })

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
      team.nome.toLowerCase().includes(searchTerm.toLowerCase())
      // || team.id.toString().includes(searchTerm)
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
        <AdminHeader onSearch={handleSearch} onRefresh={refetch} placeholder='Pesquisar por nome' />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          <TableComponent
            colums={['Nome', '', 'Ação']}
            wrapperProps={{
              style: {
                width: '100%'
              }
            }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={filteredTeams!}
            bodyRowBuilder={(team: TeamEvaluationResponse) => {
              return (
                <>
                  <td className="px-4 py-2 capitalize whitespace-nowrap w-full">
                    {team.nome.toLowerCase()}
                  </td>
                  <td className="text-center">
                    {team.equipeAvaliada && <CheckIcon className='text-green-500 hover:text-white' />}
                  </td>
                  <td className="py-2 px-2 underline capitalize text-left whitespace-nowrap">
                    {team.equipeAvaliada ? 'Av. concluída' : 'Avaliar'}
                  </td>
                </>
              );
            }}

            onClickRow={(team: TableComponentClickRowProps<TeamEvaluationResponse>) => {
              navigate(routeName.replace(':id', team.item?.id.toString()), {
                state: {
                  id: team.item.id,
                  nomeEquipe: team.item.nome,
                  teams: teams,
                  teamEvaluation: teamEvaluation
                },
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}
