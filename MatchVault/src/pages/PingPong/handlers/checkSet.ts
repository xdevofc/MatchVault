import type { Dispatch, SetStateAction } from "react";
import type { ScoreState, Player } from "../PingPongExpress";



interface checkSetEndProps {
    scores: Record<Player, ScoreState>
    setScores: Dispatch<Record<Player, ScoreState>>,
    setGameOver: Dispatch<SetStateAction<boolean>>,
    setCurrentSet: Dispatch<SetStateAction<number>>,
    setSetsWon: Dispatch<Record<Player, number>>;
}

  const maxPoints = 11;
  const setsToWin = 3;

const checkSetEnd = ({
    scores,
    setScores,
    setSetsWon,
    setCurrentSet,
    setGameOver
}:checkSetEndProps) => {
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

  export default checkSetEnd;