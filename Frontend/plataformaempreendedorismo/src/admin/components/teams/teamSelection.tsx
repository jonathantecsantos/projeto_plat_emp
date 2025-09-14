import { CircularProgress } from '@mui/material'
import { useEffect, useMemo } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { useGetAllTeamsQuery } from '../../../api/studentApi'
import { RoutesNames } from '../../../globals'
import { TeamsResponse } from "../../../model/team"
import { RootState } from '../../../redux/store'
import { TableComponent } from "../table"
import { TableComponentClickRowProps } from "../table/common"

export const TeamSelection = () => {
  const { data: teams, isLoading, error } = useGetAllTeamsQuery()
  const navigate = useNavigate()
  const userInfo = useSelector((state: RootState) => state.userInfo)

  const professorTeams = useMemo(() => {
    if (!teams || !userInfo.idEquipe) return []

    return teams.filter(team =>
      userInfo.idEquipe.includes(team.id)
    )
  }, [teams, userInfo.idEquipe])

  useEffect(() => {
    if (userInfo.idEquipe && userInfo.idEquipe.length === 1) {
      navigate(RoutesNames.team.replace(':id', userInfo.idEquipe[0].toString()))
    } else if (!userInfo.idEquipe || userInfo.idEquipe.length === 0) {
      navigate(RoutesNames.login)
    }
  }, [userInfo.idEquipe, navigate])

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Erro ao carregar equipes.</p>
  if (!professorTeams.length) return <p className="text-center">Nenhuma equipe encontrada.</p>

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="overflow-x-auto">
            <TableComponent
              colums={[
                'Equipe'
              ]}
              bodyList={professorTeams}
              bodyRowBuilder={(team: TeamsResponse) => (
                <>
                  <td className="px-4 py-3 capitalize text-lg font-medium">
                    {team.nome.toLowerCase()}
                  </td>
                </>
              )}
              onClickRow={(event: TableComponentClickRowProps<TeamsResponse>) => {
                navigate(RoutesNames.team.replace(':id', event.item.id.toString()))
              }}
              rowStyle={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
