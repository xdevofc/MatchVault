import type { Player, ScoreState } from "../PingPongExpress";

interface tableProps {
    currentSet: number,
    scores: Record<Player, ScoreState>
    setsWon: Record<Player, number>
}

const Table = ({
    currentSet,
    scores,
    setsWon
}:tableProps) => {
    return (
        <table className="text-center border border-slate-600 w-full max-w-2xl">
        <thead>
          <tr className="bg-slate-800">
            <th className="p-2 border border-slate-600">Player</th>
            {[...Array(currentSet - 1)].map((_, i) => (
              <th key={i} className="p-2 border border-slate-600">Set {i + 1}</th>
            ))}
            <th className="p-2 border border-slate-600">Current</th>
            <th className="p-2 border border-slate-600">Sets Won</th>
          </tr>
        </thead>
        <tbody>
          {["playerA", "playerB"].map((player) => (
            <tr key={player} className="bg-slate-700">
              <td className="p-2 border border-slate-600 font-bold uppercase">
                {player === "playerA" ? "Player A" : "Player B"}
              </td>
              {scores[player as Player].sets.map((set, i) => (
                <td key={i} className="p-2 border border-slate-600">{set}</td>
              ))}
              <td className="p-2 border border-slate-600 text-2xl font-semibold">
                {scores[player as Player].points}
              </td>
              <td className="p-2 border border-slate-600">
                {setsWon[player as Player]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default Table;