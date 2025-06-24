import type { Dispatch } from "react"
//import type { EventoFutbol } from "../../../types/types"

interface PropsScoreTracker {
    titulo: string,
    score: number,
    setScore: Dispatch<React.SetStateAction<number>>
    //evento: EventoFutbol
}



const ScoreTracker : React.FC<PropsScoreTracker>  = ({
        titulo,
        score,
        setScore
    }) => {

    return (

        <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-2">{titulo}</h2>
            <div className="flex flex-col items-center space-y-2">
            <span className="text-6xl font-bold">{score}</span>
            <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2 bg-white rounded shadow" onClick={() => setScore(score + 1)}>+</button>
                <button className="px-4 py-2 bg-white rounded shadow" onClick={() => setScore(score - 1)}>-</button>
            </div>
            </div>
        </div>
    )
}

export default ScoreTracker