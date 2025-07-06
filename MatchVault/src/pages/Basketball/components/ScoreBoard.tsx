import type { Dispatch, SetStateAction } from "react"
import formatTime from "../handlers/formatTime"
import switchPossession from "../handlers/switchPossesion"

interface scoreBoardProps {
    timeLeft: number,
    possession: string,
    setPossession: Dispatch<SetStateAction<string>>
}

const ScoreBoard = ({
    timeLeft,
    possession,
    setPossession
}:scoreBoardProps)=>{

    return (
         <div className="text-center text-6xl font-mono font-bold text-slate-200">
        {formatTime(timeLeft)}
        <div className="flex justify-center mt-2 space-x-6 text-sm">
          <div className="flex items-center gap-1">
            <span className={`w-3 h-3 rounded-full ${possession === "teamA" ? "bg-blue-400" : "bg-gray-500"}`}></span>
            <span className="uppercase">Team A</span>
          </div>
          <div className="flex items-center gap-1">
            <span className={`w-3 h-3 rounded-full ${possession === "teamB" ? "bg-red-400" : "bg-gray-500"}`}></span>
            <span className="uppercase">Team B</span>
          </div>
        </div>
        <button
          className="mt-4 px-4 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded"
          onClick={() =>{
            switchPossession({setPossession})
          }}
        >
          Switch Possession
        </button>
      </div>
    )
}

export default ScoreBoard