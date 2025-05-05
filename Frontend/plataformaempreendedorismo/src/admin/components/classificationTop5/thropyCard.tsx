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
  height: number
}

const trophyColors = [
  "text-yellow-600", // 1st
  "text-gray-600",     // 2nd
  "text-amber-600",     // 3rd
  "text-cyan-600",     // 4th
  "text-green-600",   // 5th
]

// const rankLabelsTropy = ["1", "2", "3", "4", "5"]
const rankLabels = ["1º", "2º", "3º", "4º", "5º"]
const rankHeight = [60, 40, 28, 16, 16]

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
  // const rankLabelTropy = rankLabelsTropy[rank]
  const rankTrophyCard = rankImages[rank]
  const rankLabel = rankLabels[rank]
  const spacing = rankHeight[rank]

  return (
    <div
      className={`${visible ? "block" : "hidden "
        } ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"} w-full`}
    >
      <div
        className={`rounded-lg flex flex-col items-center justify-center w-80 h-full
         ${trophyColor} relative`}
      >
        <img src={rankTrophyCard} alt="Trophy" className="w-70" />
        <div className={`h-${spacing} bg-[#e4e9ec] w-full border-4 ${trophyTBorderColor}`}></div>
        {/* <div className="text-center font-bold text-8xl absolute inset-10">{rankLabelTropy}</div> Itens no centro do tropeu*/}
        <div className={`bg-[#e4e9ec] w-full h-44 border-4 ${trophyBBorderColor} `}>
          <div className="text-center font-bold text-4xl">{rankLabel}</div>
          <div className="text-center text-4xl font-bold">{teamName}</div>
          <div className="text-center text-4xl font-bold">{score}</div>
        </div>
      </div>
    </div>
  )
}
