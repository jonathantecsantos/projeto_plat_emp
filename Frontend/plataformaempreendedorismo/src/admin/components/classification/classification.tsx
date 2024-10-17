import { CircularProgress } from '@mui/material'
import { useEffect, useRef } from "react"
import { useGetTeamClassificationQuery } from "../../../api/studentApi"
import { ReportClassification } from '../../../model/reports'
import { TableComponent } from "../table"
import { TableComponentSetCurrPageProps } from "../table/common"

export const ClassificationComponent = () => {
  const { data: classification, refetch, isLoading, error } = useGetTeamClassificationQuery()
  
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })

  useEffect(() => {
    if (classification) {
      if (classification?.length <= 0) {
        console.log('classification refetch')
        refetch()
      }
    }
  }, [])

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading classification.</p>


  return <div>
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          <TableComponent
            colums={[
              'Classificação',
              'Time',
              'Somátorio'
            ]}
            wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={classification || []}
            bodyRowBuilder={(classification: ReportClassification, idx) => (
              <>
                <td className="px-4 py-2 ">{idx + 1}º</td>
                <td className="px-4 py-2 capitalize">{classification.equipe.toLowerCase()}</td>
                <td className="px-4 py-2 capitalize">{classification.totalNota}</td>
              </>
            )}
          />
        </div>
      </div>
    </div>
  </div>
}