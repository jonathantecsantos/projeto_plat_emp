import thropy1 from '../../../assets/1.png'
import thropy2 from '../../../assets/2.png'
import thropy3 from '../../../assets/3.png'
import thropy4 from '../../../assets/4.png'
import thropy5 from '../../../assets/5.png'


interface TrophyCardProps {
  rank: number
  teamName: string
  score: number
  visible: boolean
}

const trophyColors = [
  "text-yellow-600", // 1st
  "text-gray-600",     // 2nd
  "text-amber-600",     // 3rd
  "text-cyan-600",     // 4th
  "text-green-600",   // 5th
]
//                1st, 2nd, 3rd, 4th, 5th
const rankHeight = [52, 40, 28, 20, 16]

const rankImages = [
  thropy1,
  thropy2,
  thropy3,
  thropy4,
  thropy5
]

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

export const TrophyCard = ({ rank, teamName, score, visible, }: TrophyCardProps) => {
  const trophyColor = trophyColors[rank]
  const trophyTBorderColor = trophyTBorderClasses[rank]
  const trophyBBorderColor = trophyBBorderClasses[rank]
  const rankTrophyCard = rankImages[rank]
  const spacing = rankHeight[rank]

  return (
    <div className={`${visible ? "block opacity-100 scale-100" : "hidden opacity-0 scale-95"} w-full`}>
      <div className={`flex flex-col items-center justify-start w-72 text-center`}>
        <img src={rankTrophyCard} alt="Trophy" className="w-44" />
        <div className={`bg-[#e4e9ec] w-full border-4 ${trophyTBorderColor}`} style={{ height: `${spacing * 2.4}px` }} />

        <div className="flex items-center justify-center bg-[#e4e9ec] w-full h-20">
          <div className={`text-3xl font-bold ${trophyColor}`}>{teamName}</div>
        </div>

        <div className={`bg-[#e4e9ec] w-full h-32 border-4 ${trophyBBorderColor} flex items-center justify-center`}>
          <div className={`${trophyColor} text-3xl font-bold`}>{score}</div>
        </div>
      </div>
    </div>
  )
}
