import { useEffect, type Dispatch, type SetStateAction } from "react";
import checkSetEnd from "../handlers/checkSet";
import type { Player, ScoreState } from "../PingPongExpress";


interface useEndMatchProps {
    scores: Record<Player, ScoreState>
    setScores: Dispatch<Record<Player, ScoreState>>,
    setGameOver: Dispatch<SetStateAction<boolean>>,
    setCurrentSet: Dispatch<SetStateAction<number>>,
    setSetsWon: Dispatch<Record<Player, number>>;
}

const useEndMatch = ({
    scores,
    setScores,
    setSetsWon,
    setCurrentSet,
    setGameOver
}: useEndMatchProps) =>{

    
    useEffect(() => {
        checkSetEnd({
            scores,
            setScores,
            setSetsWon,
            setCurrentSet,
            setGameOver
        });
  }, [scores.playerA.points, scores.playerB.points]);

    
}

export default useEndMatch