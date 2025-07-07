import type { Dispatch, SetStateAction } from "react";
import type { Player, ScoreState } from "../PingPongExpress";

  
interface resetMatchProps {
    setScores: Dispatch<SetStateAction<Record<Player, ScoreState>>>,
    setCurrentSet: Dispatch<SetStateAction<number>>,
    setSetsWon: Dispatch<Record<Player, number>>;
    setGameOver: Dispatch<SetStateAction<boolean>>,
}

  const resetMatch = ({
    setScores,
    setCurrentSet,
    setSetsWon,
    setGameOver
  }: resetMatchProps) => {
    setScores({ playerA: { sets: [], points: 0 }, playerB: { sets: [], points: 0 } });
    setCurrentSet(1);
    setSetsWon({ playerA: 0, playerB: 0 });
    setGameOver(false);
  };


export default resetMatch;