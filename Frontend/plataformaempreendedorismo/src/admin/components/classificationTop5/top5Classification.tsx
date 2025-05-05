import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { useGetTeamClassificationQuery } from "../../../api/studentApi"
import { TrophyCard } from "./thropyCard"

export const Top5Classification = () => {
  const { data: classification, refetch, isLoading, error } = useGetTeamClassificationQuery()
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (classification) {
      if (classification?.length <= 0) {
        console.log("classification refetch")
        refetch()
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setIsRunning((prev) => !prev)
      }

      if (isRunning) {
        if (event.key === "ArrowRight") {
          setCurrentIndex((prev) => (prev < 4 ? prev + 1 : 4))
        } else if (event.key === "ArrowLeft") {
          setCurrentIndex((prev) => (prev > -1 ? prev - 1 : -1))
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isRunning])

  if (isLoading) return <div className="text-center"><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading classification.</p>
  if (!classification?.length) return <p className="text-center mt-10">Nenhuma classificação disponível até o momento.</p>
  if (classification?.length < 5) return <p className="text-center mt-10">Menos de 5 classificações disponíveis.</p>

  const top5Classification = classification.slice(0, 5)
  const podiumOrder = [4, 2, 0, 1, 3]
  const heights = [140, 220, 400, 220, 140]
  const displayOrder = [4, 3, 2, 1, 0]

  return (
    <div className="">
      <div className="flex items-end justify-center">
        {podiumOrder.map((orderedIndex, i) => {
          const item = top5Classification[orderedIndex]
          return (
            <div
              key={i}
              className={`flex flex-col  justify-center p-2 h-full`}
            >
              <TrophyCard
                rank={orderedIndex}
                teamName={item.equipe}
                score={item.totalNota}
                height={heights[i]}
                visible={currentIndex >= displayOrder.indexOf(orderedIndex)}
              />
            </div>
          )
        })}
      </div>
      {!isRunning && <p className="text-center text-sm mt-20 text-gray-500">
        Pressione <kbd className="px-1 border rounded">Enter</kbd> para iniciar/parar, E
        <kbd className="mx-1 px-1 border rounded">←</kbd>
        <kbd className="px-1 border rounded">→</kbd> para navegar
      </p>}
    </div>
  )
}