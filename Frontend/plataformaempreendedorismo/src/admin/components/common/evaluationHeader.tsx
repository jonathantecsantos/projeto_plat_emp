
interface EvaluationHeaderProps {
  teamName: string
}

export const EvaluationHeader = ({ teamName }: EvaluationHeaderProps) => {
  return <div className={`p-3 mb-4 rounded-lg w-fit min-h-10  text-[#cecece] *: bg-gradient-to-r from-indigo-500 to-indigo-900  shadow-lg transform hover:scale-105 transition-transform duration-300`}>
    <p className={`font-bold capitalize text-white mr-2`}>
      {teamName}
    </p>
    <p className="font-semibold">Time</p>
  </div>
}