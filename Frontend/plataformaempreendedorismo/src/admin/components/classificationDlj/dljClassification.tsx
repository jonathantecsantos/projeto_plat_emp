import { CircularProgress } from '@mui/material'
import { useEffect, useRef } from "react"
import { useGetTeamReportClassificationByFormatQuery } from "../../../api/studentApi"
import { ReportClassificationByFormat } from '../../../model/reports'
import { TableComponent } from "../table"
import { TableComponentSetCurrPageProps } from "../table/common"

export const DljClassificationComponent = () => {
  const { data: dljClassification, refetch, isLoading, error } = useGetTeamReportClassificationByFormatQuery(1)
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })

  useEffect(() => {
    if (dljClassification) {
      if (dljClassification?.length <= 0) {
        console.log('dljClassification refetch')
        refetch()
      }
    }
  }, [])

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading dljClassification.</p>
  if (!dljClassification?.length) return <p className="text-center mt-10">Nenhuma nota disponível até o momento.</p>
  
  return <div>
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          <TableComponent
            colums={[
              'Classificação',
              'Time',
              'DLJ'
            ]}
            wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={dljClassification || []}
            bodyRowBuilder={(dljClassification: ReportClassificationByFormat, idx) => (
              <>
                <td className="px-4 py-2 ">{idx + 1}º</td>
                <td className="px-4 py-2 capitalize">{dljClassification.equipe.toLowerCase()}</td>
                <td className="px-4 py-2 capitalize">{dljClassification.totalNota}</td>
              </>
            )}
          />
        </div>
      </div>
    </div>
  </div>
}