import trophyIcon from "../../../assets/trophy.svg"

interface TrophyCardProps {
  rank: number
  teamName: string
  score: number
  visible: boolean
  height: number
}

const trophyColors = [
  "border-yellow-500 text-yellow-600", // 1st 
  "border-blue-500 text-blue-600",     // 2nd
  "border-cyan-500 text-cyan-600",     // 3rd 
  "border-gray-500 text-gray-600",     // 4th 
  "border-green-500 text-green-600",   // 5th 
]

const rankLabels = ["1º", "2º", "3º", "4º", "5º"]
const rankHeight = [36, 28, 16, 16, 16]

export const TrophyCard = ({ rank, teamName, score, visible, height }: TrophyCardProps) => {
  const trophyColor = trophyColors[rank]
  const rankLabel = rankLabels[rank]
  const spacing = rankHeight[rank]

  return (
    <div
      className={`transition-all duration-700 ease-in-out transform ${visible ? "block" : "hidden"
        } ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
    >
      <div
        className={`rounded-lg flex flex-col items-center justify-center w-40 h-[${height}px] 
        border-4 ${trophyColor} p-4 shadow-md`}
      >
        <img src={trophyIcon} alt="Trophy" className="w-24" />
        <div className={`h-${spacing}`}></div>
        <div className="text-center text-sm font-bold">{rankLabel}</div>
        <div className="text-center text-sm font-bold">{teamName}</div>
        <div className="text-center text-sm font-bold">{score}</div>
      </div>
    </div>
  )
}
