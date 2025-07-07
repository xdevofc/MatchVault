import type { Dispatch, SetStateAction } from "react"
import resetMatch from "../handlers/resetMatch"
import type { Player, ScoreState } from "../PingPongExpress"


interface footerProps {
    gameOver: boolean
    setScores: Dispatch<SetStateAction<Record<Player, ScoreState>>>,
    setCurrentSet: Dispatch<SetStateAction<number>>,
    setSetsWon: Dispatch<Record<Player, number>>;
    setGameOver: Dispatch<SetStateAction<boolean>>,
    setsWon: Record<Player, number>
}

const Footer = ({
    gameOver,
    setScores,
    setCurrentSet,
    setSetsWon,
    setGameOver,
    setsWon
}:footerProps) => {
    return (
        <div className="mt-6">
        {gameOver ? (
          <>
            <p className="text-xl mb-2 font-bold text-yellow-400">
              Match Finished! Winner: {setsWon.playerA > setsWon.playerB ? "Player A" : "Player B"}
            </p>
            <button
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              onClick={() =>{
                resetMatch({
                    setScores,
                    setCurrentSet,
                    setSetsWon,
                    setGameOver
                })
              }}
            >
              Reset Match
            </button>
          </>
        ) : null}
      </div>   
    )
}

export default Footer