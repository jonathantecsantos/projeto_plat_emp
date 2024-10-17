import { useGetTeamReportClassificationByFormatQuery } from "../../../api/studentApi"
import { CircularProgress } from '@mui/material'
import { useEffect, useRef } from "react"
import { ReportClassificationByFormat } from '../../../model/reports'
import { TableComponent } from "../table"
import { TableComponentSetCurrPageProps } from "../table/common"

export const PitchClassificationComponent = () => {
  const { data: pitchClassification, refetch, isLoading, error } = useGetTeamReportClassificationByFormatQuery(2)



  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })

  useEffect(() => {
    if (pitchClassification) {
      if (pitchClassification?.length <= 0) {
        console.log('pitchClassification refetch')
        refetch()
      }
    }
  }, [])

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading pitchClassification.</p>


  return <div>
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          <TableComponent
            colums={[
              'Classificação',
              'Time',
              'Pitch'
            ]}
            wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={pitchClassification || []}
            bodyRowBuilder={(pitchClassification: ReportClassificationByFormat, idx) => (
              <>
                <td className="px-4 py-2 ">{idx + 1}º</td>
                <td className="px-4 py-2 capitalize">{pitchClassification.equipe.toLowerCase()}</td>
                <td className="px-4 py-2 capitalize">{pitchClassification.totalNota}</td>
              </>
            )}
          />
        </div>
      </div>
    </div>
  </div>
}