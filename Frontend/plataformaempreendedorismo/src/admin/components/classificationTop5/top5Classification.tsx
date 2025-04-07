import { useEffect } from "react"
import { useGetTeamClassificationQuery } from "../../../api/studentApi"
import { CircularProgress } from '@mui/material'

export const Top5Classification = () => {
  const { data: classification, refetch, isLoading, error } = useGetTeamClassificationQuery()

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
  if (!classification?.length) return <p className="text-center mt-10">Nenhuma classificação disponível até o momento.</p>
  if (classification.length < 5) return <p className="text-center mt-10">Menos de 5 classificações disponíveis.</p>

  const top5Classification = classification.slice(0, 5)

  return (
    <div>
      <h1>Top 5 Classification</h1>
      <ul>
        {top5Classification.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
      <p>This is the Top 5 Classification component.</p>
    </div>
  )
}