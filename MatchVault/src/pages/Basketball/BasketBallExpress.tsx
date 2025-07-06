import React, { useState, useEffect } from "react";

const formatTime = (totalSeconds: number) => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const Scoreboard = () => {
  const MATCH_DURATION = 20 * 60; // 20 minutes

  const [timeLeft, setTimeLeft] = useState(MATCH_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [possession, setPossession] = useState<"teamA" | "teamB">("teamA");
  const [score, setScore] = useState({ teamA: 0, teamB: 0 });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isRunning || isFinished) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, isFinished]);

  const handleScore = (team: "teamA" | "teamB", points: number) => {
    if (isFinished) return;
    setScore((prev) => ({ ...prev, [team]: prev[team] + points }));
  };

  const switchPossession = () => {
    setPossession((prev) => (prev === "teamA" ? "teamB" : "teamA"));
  };

  const handlePause = () => setIsRunning(false);
  const handleStart = () => setIsRunning(true);
  const handleFinish = () => {
    setIsFinished(true);
    setIsRunning(false);
  };

  return (
    <div className="w-screen h-screen p-4 grid gap-6 text-white bg-neutral-900 font-sans">
      <div className="text-center text-6xl font-mono font-bold text-slate-200">
        {formatTime(timeLeft)}
        <div className="flex justify-center mt-2 space-x-6 text-sm">
          <div className="flex items-center gap-1">
            <span className={`w-3 h-3 rounded-full ${possession === "teamA" ? "bg-blue-400" : "bg-gray-500"}`}></span>
            <span className="uppercase">Team A</span>
          </div>
          <div className="flex items-center gap-1">
            <span className={`w-3 h-3 rounded-full ${possession === "teamB" ? "bg-red-400" : "bg-gray-500"}`}></span>
            <span className="uppercase">Team B</span>
          </div>
        </div>
        <button
          className="mt-4 px-4 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded"
          onClick={switchPossession}
        >
          Switch Possession
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        {["teamA", "teamB"].map((team) => (
          <div
            key={team}
            className="bg-neutral-800 rounded-2xl shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4 uppercase">
              {team === "teamA" ? "Team A" : "Team B"}
            </h2>
            <p className="text-5xl font-bold text-slate-100 mb-4">
              {score[team as "teamA" | "teamB"]}
            </p>
            <div className="flex justify-center flex-wrap gap-2 mb-2">
              {[1, 2, 3].map((val) => (
                <button
                  key={val}
                  onClick={() => handleScore(team as "teamA" | "teamB", val)}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
                >
                  +{val}
                </button>
              ))}
            </div>
            <div className="flex justify-center flex-wrap gap-2">
              {[1, 2, 3].map((val) => (
                <button
                  key={val}
                  onClick={() => handleScore(team as "teamA" | "teamB", -val)}
                  className="px-3 py-1 text-sm bg-transparent border border-gray-600 text-white rounded hover:text-red-400"
                >
                  -{val}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {!isRunning && !isFinished && (
          <button onClick={handleStart} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded">
            Start
          </button>
        )}
        {isRunning && (
          <button onClick={handlePause} className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded">
            Pause
          </button>
        )}
        {!isFinished && (
          <button onClick={handleFinish} className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded">
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
