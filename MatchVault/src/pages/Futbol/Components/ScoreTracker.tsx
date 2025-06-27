//import type { EventoFutbol } from "../../../types/types"

import type { PropsScoreTracker } from "./interfaces/scoreTracker"




const ScoreTracker: React.FC<PropsScoreTracker> = ({
  titulo,
  score,
  setScore
}) => {

  return (

    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col items-center justify-center bg-[#1A1A1A] p-4 rounded-xl shadow text-[#EAEAEA] mx-auto">
      <h2 className="text-xl font-bold mb-4 text-[#D4AF37]">{titulo}</h2>
      <div className="flex flex-col items-center space-y-4">
        <span className="text-6xl font-extrabold text-white">{score}</span>
        <div className="grid grid-cols-2 gap-3 w-full max-w-[10rem]">
          <button className="px-4 py-2 bg-[#2E2E2E] hover:bg-[#3A3A3A] text-white rounded shadow transition" onClick={() => setScore(score + 1)}>+</button>
          <button className="px-4 py-2 bg-[#2E2E2E] hover:bg-[#3A3A3A] text-white rounded shadow transition" onClick={() => setScore(score - 1)}>-</button>
        </div>
      </div>
    </div>

  )
}

export default ScoreTracker
