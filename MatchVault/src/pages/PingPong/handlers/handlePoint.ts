import type { Dispatch } from "react";
import type { Player, ScoreState } from "../PingPongExpress";

    
    interface handlePointProps {
        setScores: Dispatch<Record<Player, ScoreState>>,
        gameOver: boolean,
        player: Player,
        delta: number
    }


  const handlePoint = ({
    player, 
    delta,
    setScores,
    gameOver} : handlePointProps) => {
    if (gameOver) return;
    setScores((prev) => {
      const updated = { ...prev };
      updated[player].points = Math.max(0, updated[player].points + delta);
      return updated;
    });
  };


  export default handlePoint;