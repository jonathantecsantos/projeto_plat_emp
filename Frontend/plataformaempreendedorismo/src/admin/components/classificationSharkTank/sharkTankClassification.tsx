import { CircularProgress } from '@mui/material'
import { useEffect, useRef } from "react"
import { useGetTeamReportClassificationByFormatQuery } from "../../../api/studentApi"
import { ReportClassificationByFormat } from '../../../model/reports'
import { TableComponent } from "../table"
import { TableComponentSetCurrPageProps } from "../table/common"


export const SharkTankClassificationComponent = () => {
  const { data: sharkTankClassification, refetch, isLoading, error } = useGetTeamReportClassificationByFormatQuery(3)
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })

  useEffect(() => {
    if (sharkTankClassification) {
      if (sharkTankClassification?.length <= 0) {
        console.log('sharkTankClassification refetch')
        refetch()
      }
    }
  }, [])

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading sharkTankClassification.</p>
  if (!sharkTankClassification?.length) return <p className="text-center mt-10">Nenhuma nota disponível até o momento.</p>

  return <div>
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          <TableComponent
            colums={[
              'Classificação',
              'Time',
              'Shark Tank'
            ]}
            wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={sharkTankClassification || []}
            bodyRowBuilder={(sharkTankClassification: ReportClassificationByFormat, idx) => (
              <>
                <td className="px-4 py-2 ">{idx + 1}º</td>
                <td className="px-4 py-2 capitalize">{sharkTankClassification.equipe.toLowerCase()}</td>
                <td className="px-4 py-2 capitalize">{sharkTankClassification.totalNota}</td>
              </>
            )}
          />
        </div>
      </div>
    </div>
  </div>
}