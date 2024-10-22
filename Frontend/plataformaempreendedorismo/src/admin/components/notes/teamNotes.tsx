import { CircularProgress } from '@mui/material'
import { useEffect, useRef } from "react"
import { useGetTeamReportQuery } from "../../../api/studentApi"
import { ReportTeamId } from '../../../model/reports'
import { TableComponent } from "../table"
import { TableComponentSetCurrPageProps } from "../table/common"
import { EvaluationHeader } from '../common/evaluationHeader'
interface TeamNotesProps {
  id: number
}

export const TeamNotesComponent = ({ id }: TeamNotesProps) => {
  const { data: teamNotes, refetch, isLoading, error } = useGetTeamReportQuery(id)

  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })

  useEffect(() => {
    if (teamNotes) {
      if (teamNotes?.length <= 0) {
        console.log('teamNotes refetch')
        refetch()
      }
    }
  }, [])

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading teamNotes.</p>
  if (!teamNotes?.length) return <p className="text-center mt-10">Nenhuma nota disponível para esta equipe.</p>


  return <div>
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          {teamNotes?.length ? <EvaluationHeader teamName={teamNotes?.[0]?.equipe || ''} /> : null}
          <TableComponent
            colums={[
              'Formato Avaliação',
              'Critério',
              'Subcritério',
              'Nota'
            ]}
            wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={teamNotes || []}
            bodyRowBuilder={(teamNotes: ReportTeamId) => (
              <>
                <td className="px-4 py-2 capitalize text-nowrap">{teamNotes.formato}</td>
                <td className="px-4 py-2 capitalize text-nowrap">{teamNotes.criterio}</td>
                <td className="px-4 py-2 capitalize text-nowrap">{teamNotes.subcriterio}</td>
                <td className="px-4 py-2 capitalize text-nowrap">{teamNotes.totalNota}</td>
              </>
            )}
          />
        </div>
      </div>
    </div>
  </div>
}