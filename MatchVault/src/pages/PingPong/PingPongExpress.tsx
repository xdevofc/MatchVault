import React, { useState } from "react";

type Player = "playerA" | "playerB";

type ScoreState = {
  sets: number[];
  points: number;
};

const PingPongExpress: React.FC = () => {
  const [scores, setScores] = useState<Record<Player, ScoreState>>({
    playerA: { sets: [], points: 0 },
    playerB: { sets: [], points: 0 },
  });
  const [currentSet, setCurrentSet] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [setsWon, setSetsWon] = useState<Record<Player, number>>({ playerA: 0, playerB: 0 });

  const maxPoints = 11;
  const setsToWin = 3;

  const handlePoint = (player: Player, delta: number) => {
    if (gameOver) return;
    setScores((prev) => {
      const updated = { ...prev };
      updated[player].points = Math.max(0, updated[player].points + delta);
      return updated;
    });
  };

  const checkSetEnd = () => {
    const a = scores.playerA.points;
    const b = scores.playerB.points;
    const diff = Math.abs(a - b);

    if ((a >= maxPoints || b >= maxPoints) && diff >= 2) {
      const winner: Player = a > b ? "playerA" : "playerB";

      setScores((prev) => {
        return {
          playerA: {
            sets: [...prev.playerA.sets, prev.playerA.points],
            points: 0,
          },
          playerB: {
            sets: [...prev.playerB.sets, prev.playerB.points],
            points: 0,
          },
        };
      });

      setSetsWon((prev) => {
        const updated = { ...prev };
        updated[winner] += 1;
        if (updated[winner] === setsToWin) setGameOver(true);
        return updated;
      });

      setCurrentSet((prev) => prev + 1);
    }
  };

  React.useEffect(() => {
    checkSetEnd();
  }, [scores.playerA.points, scores.playerB.points]);

  const resetMatch = () => {
    setScores({ playerA: { sets: [], points: 0 }, playerB: { sets: [], points: 0 } });
    setCurrentSet(1);
    setSetsWon({ playerA: 0, playerB: 0 });
    setGameOver(false);
  };

  return (
    <div className="w-screen h-screen bg-neutral-900 text-white p-4 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold">Ping Pong Express</h1>
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

      <div className="flex flex-wrap justify-center gap-6">
        {["playerA", "playerB"].map((player) => (
          <div key={player} className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-semibold">
              {player === "playerA" ? "Player A" : "Player B"}
            </h2>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                onClick={() => handlePoint(player as Player, 1)}
              >
                +1
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                onClick={() => handlePoint(player as Player, -1)}
              >
                -1
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        {gameOver ? (
          <>
            <p className="text-xl mb-2 font-bold text-yellow-400">
              Match Finished! Winner: {setsWon.playerA > setsWon.playerB ? "Player A" : "Player B"}
            </p>
            <button
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              onClick={resetMatch}
            >
              Reset Match
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PingPongExpress;