import React, { useState, } from "react";
import useTimer from "./hooks/useTimer";
import FlowButtons from "./components/FlowButtons";
import ScoreBoard from "./components/ScoreBoard";
import ShowTeams from "./components/ShowTeams";



const BasketBallExpress = () => {
  const MATCH_DURATION = 20 * 60; // 20 minutes

  const [timeLeft, setTimeLeft] = useState(MATCH_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [possession, setPossession] = useState<"teamA" | "teamB" | string>("teamA");
  const [score, setScore] = useState({ teamA: 0, teamB: 0 });
  const [isFinished, setIsFinished] = useState(false);

// LLamamndo a los hooks 
    useTimer({isRunning, isFinished, setTimeLeft, setIsFinished, setIsRunning})



  return (
    <div className="w-screen h-screen p-4 grid gap-6 text-white bg-neutral-900 font-sans">

    <ScoreBoard
        timeLeft={timeLeft}
        possession={possession}
        setPossession={setPossession}
    /> 

    <ShowTeams
        score={score}
  isFinished={isFinished}
  setScore={setScore}
    />

        <FlowButtons
            isFinished={isFinished}
            isRunning={isRunning}
            setIsFinished={setIsFinished}
            setIsRunning={setIsRunning}
        />
      
    </div>
  );
};

export default BasketBallExpress;
