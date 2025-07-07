import type { Dispatch } from "react";
import handlePoint from "../handlers/handlePoint";
import type { Player, ScoreState } from "../PingPongExpress";

interface controlBoardProps {
    setScores: Dispatch<Record<Player, ScoreState>>,
    gameOver: boolean,
}

const ControlBoard = ({
    setScores,
    gameOver
}: controlBoardProps) =>{

    return (
        <div className="flex flex-wrap justify-center gap-6">
        {["playerA", "playerB"].map((player) => (
          <div key={player} className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-semibold">
              {player === "playerA" ? "Player A" : "Player B"}
            </h2>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                onClick={() => {
                    handlePoint({
                        player: player as Player,
                        delta: 1,
                        setScores,
                        gameOver,
                    })
                }}
              >
                +1
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                onClick={() => {
                    handlePoint({
                        player: player as Player,
                        delta: -1,
                        setScores,
                        gameOver,
                    })
                }}
              >
                -1
              </button>
            </div>
          </div>
        ))}
      </div>
    )
}

export default ControlBoard;