import { useGetTeamReportClassificationByFormatQuery } from "../../../api/studentApi"
import { CircularProgress } from '@mui/material'
import { useEffect, useRef } from "react"

import { ReportClassificationByFormat } from '../../../model/reports'
import { TableComponent } from "../table"
import { TableComponentSetCurrPageProps } from "../table/common"

export const ExpoDleiClassificationComponent = () => {
  const { data: expoDleiClassification, refetch, isLoading, error } = useGetTeamReportClassificationByFormatQuery(4)

  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })

  useEffect(() => {
    if (expoDleiClassification) {
      if (expoDleiClassification?.length <= 0) {
        console.log('expoDleiClassification refetch')
        refetch()
      }
    }
  }, [])

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading expoDleiClassification.</p>
  if (!expoDleiClassification?.length) return <p className="text-center mt-10">Nenhuma nota disponível até o momento.</p>

  return <div>
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          <TableComponent
            colums={[
              'Classificação',
              'Time',
              'ExpoDlei'
            ]}
            wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={expoDleiClassification || []}
            bodyRowBuilder={(expoDleiClassification: ReportClassificationByFormat, idx) => (
              <>
                <td className="px-4 py-2 ">{idx + 1}º</td>
                <td className="px-4 py-2 capitalize">{expoDleiClassification.equipe.toLowerCase()}</td>
                <td className="px-4 py-2 capitalize">{expoDleiClassification.totalNota}</td>
              </>
            )}
          />
        </div>
      </div>
    </div>
  </div>
}