import { CircularProgress } from '@mui/material'
import { useEffect, useRef } from "react"
import { useGetTeamReportClassificationByFormatQuery } from "../../../api/studentApi"
import { ReportClassificationByFormat } from '../../../model/reports'
import { TableComponent } from "../table"
import { TableComponentSetCurrPageProps } from "../table/common"
import { EvaluationType } from '@/utils/types'

export const CanvasClassificationComponent = () => {
  const { data: canvasClassification, refetch, isLoading, error } = useGetTeamReportClassificationByFormatQuery(EvaluationType.CANVAS)
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })

  useEffect(() => {
    if (canvasClassification) {
      if (canvasClassification?.length <= 0) {
        console.log('pitchClassification refetch')
        refetch()
      }
    }
  }, [])

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading canvasClassification.</p>
  if (!canvasClassification?.length) return <p className="text-center mt-10">Nenhuma nota disponível até o momento.</p>

  return <div>
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto lg:p-4 p-1">
          <TableComponent
            colums={[
              'Classificação',
              'Time',
              'Canvas'
            ]}

            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={canvasClassification || []}
            bodyRowBuilder={(canvasClassification: ReportClassificationByFormat, idx) => (
              <>
                <td className="px-4 py-2 ">{idx + 1}º</td>
                <td className="px-4 py-2 capitalize">{canvasClassification.equipe.toLowerCase()}</td>
                <td className="px-4 py-2 capitalize">{canvasClassification.totalNota}</td>
              </>
            )}
          />
        </div>
      </div>
    </div>
  </div>
}