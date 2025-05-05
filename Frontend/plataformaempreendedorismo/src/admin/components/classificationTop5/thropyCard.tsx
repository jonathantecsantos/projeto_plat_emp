import trophyIcon from "../../../assets/trophy.svg"

interface TrophyCardProps {
  rank: number
  teamName: string
  score: number
  visible: boolean
  height: number
}

const trophyColors = [
  "text-yellow-600", // 1st
  "text-blue-600",     // 2nd
  "text-cyan-600",     // 3rd
  "text-gray-600",     // 4th
  "text-green-600",   // 5th
]

const trophyBorderColors = [
  '#ffa828',
  '#89e1ff',
  ' #c5c8d0',
  '#89eeeb',
  '#dafd89'
]

const rankLabelsTropy = ["1", "2", "3", "4", "5"]
const rankLabels = ["1º", "2º", "3º", "4º", "5º"]
const rankHeight = [60, 40, 28, 16, 16]

const trophyTBorderClasses = [
  'border-t-trophy-1', // 1st
  'border-t-trophy-2', // 2nd
  'border-t-trophy-3', // 3rd
  'border-t-trophy-4', // 4th
  'border-t-trophy-5'  // 5th
]

const trophyBBorderClasses = [
  'border-b-trophy-1',
  'border-b-trophy-2',
  'border-b-trophy-3',
  'border-b-trophy-4',
  'border-b-trophy-5',
]

export const TrophyCard = ({ rank, teamName, score, visible, height }: TrophyCardProps) => {
  const trophyColor = trophyColors[rank]
  const trophyTBorderColor = trophyTBorderClasses[rank]
  const trophyBBorderColor = trophyBBorderClasses[rank]
  const rankLabelTropy = rankLabelsTropy[rank]
  const rankLabel = rankLabels[rank]
  const spacing = rankHeight[rank]

  return (
    <div
      className={`transition-all  duration-700 ease-in-out transform ${visible ? "block" : "hidden"
        } ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"} w-full`}
    >
      <div
        className={`rounded-lg flex flex-col items-center justify-center w-80 h-full
         ${trophyColor} relative`}
      >
        <img src={trophyIcon} alt="Trophy" className="w-80" />
        <div className={`h-${spacing} bg-[#e4e9ec] w-full border-4 ${trophyTBorderColor}`}></div>
        <div className="text-center font-bold text-8xl absolute inset-10">{rankLabelTropy}</div>
        <div className={`bg-[#e4e9ec] w-full h-44 border-4 ${trophyBBorderColor}`}>
          <div className="text-center font-bold text-4xl">{rankLabel}</div>
          <div className="text-center text-4xl font-bold">{teamName}</div>
          <div className="text-center text-4xl font-bold">{score}</div>
        </div>
      </div>
    </div>
  )
}
