import type { Dispatch, SetStateAction } from 'react';

interface handleScoreProps {
    team: "teamA" | "teamB";
    points: number,
    prev:number
    isFinished: boolean,
    setScore: Dispatch<SetStateAction<{teamA: number, teamB:number}>>
}

  const handleScore = ({
    team,
    points,
    isFinished,
    setScore,

}: handleScoreProps) => {
    if (isFinished) return;
    setScore((prev) => ({ ...prev, [team]: prev[team] + points }));
  };

 export default handleScore