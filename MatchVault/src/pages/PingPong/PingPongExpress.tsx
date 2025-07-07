import React, { useEffect, useState } from "react";
import checkSetEnd from "./handlers/checkSet";
import ControlBoard from "./components/ControlBoard";
import Footer from "./components/Footer";
import Table from "./components/Table";
import useEndMatch from "./hooks/useEndMatch";

export type Player = "playerA" | "playerB";

export type ScoreState = {
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

  //CUTSOM HOOK PARA CONTROLAR LA PARTIDA
useEndMatch({scores, setScores, setSetsWon, setCurrentSet, setGameOver})


  
 

  return (
    <div className="w-screen h-screen bg-neutral-900 text-white p-4 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold">Ping Pong Express</h1>
     <Table
     currentSet={currentSet}
     scores={scores}
     setsWon={setsWon}
     /> 

    <ControlBoard
      setScores={setScores}
      gameOver={gameOver}
    />

          <Footer
            gameOver={gameOver}
            setScores={setScores}
            setCurrentSet={setCurrentSet}
            setSetsWon={setSetsWon}
            setGameOver={setGameOver}
            setsWon={setsWon}
          />
    </div>
  );
};

export default PingPongExpress;