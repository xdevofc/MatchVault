import React, { useState, useEffect } from "react";
import type { jugador } from "../../types/types";

const FutbolExpress: React.FC = () => {
  const [scoreA, setScoreA] = useState<number>(0);
  const [scoreB, setScoreB] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(1800); // 30 minutos
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const ListaJugadoresA = JSON.parse(localStorage.getItem("Lista-jugadores")).equipoA
  const ListaJugadoresB = JSON.parse(localStorage.getItem("Lista-jugadores")).equipoB
  console.log(ListaJugadoresA)

  useEffect(() => {
    let interval: number;
    if (!isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, seconds]);

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-screen bg-purple-200 overflow-hidden grid grid-cols-3 grid-rows-3 gap-2 p-4">
      
      {/* IZQUIERDA ARRIBA: Marcador equipo A */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-2">Equipo A</h2>
        <div className="flex flex-col items-center space-y-2">
          <span className="text-6xl font-bold">{scoreA}</span>
          <div className="grid grid-cols-2 gap-2">
            <button className="px-4 py-2 bg-white rounded shadow" onClick={() => setScoreA(scoreA + 1)}>+</button>
            <button className="px-4 py-2 bg-white rounded shadow" onClick={() => setScoreA(scoreA - 1)}>-</button>
          </div>
        </div>
      </div>

      {/* CENTRO ARRIBA: Minutero */}
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold">{formatTime(seconds)}</h1>
      </div>

      {/* DERECHA ARRIBA: Marcador equipo B */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-2">Equipo B</h2>
        <div className="flex flex-col items-center space-y-2">
          <span className="text-6xl font-bold">{scoreB}</span>
          <div className="grid grid-cols-2 gap-2">
            <button className="px-4 py-2 bg-white rounded shadow" onClick={() => setScoreB(scoreB + 1)}>+</button>
            <button className="px-4 py-2 bg-white rounded shadow" onClick={() => setScoreB(scoreB - 1)}>-</button>
          </div>
        </div>
      </div>

      {/* IZQUIERDA CENTRO: Jugadores equipo A */}
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Jugadores</h3>
        <div className="flex gap-2 mt-2">
          <div className="p-2 bg-purple-400 text-white rounded shadow">Titulares
            {ListaJugadoresA.map((player: jugador) => <p key={player.cedula}> {player.nombre}</p> )}
          </div>
          <div className="p-2 bg-purple-100 rounded shadow">Suplentes</div>
        </div>
      </div>

      {/* CENTRO CENTRO: Controles del reloj */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-white rounded shadow" onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? "Continuar" : "Pausar"}
          </button>
          <button className="px-3 py-1 bg-white rounded shadow" onClick={() => setSeconds(seconds + 60)}>+1 min</button>
          <button className="px-3 py-1 bg-white rounded shadow" onClick={() => setSeconds(Math.max(seconds - 60, 0))}>-1 min</button>
        </div>
      </div>

      {/* DERECHA CENTRO: Jugadores equipo B */}
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Jugadores</h3>
        <div className="flex gap-2 mt-2">
          <div className="p-2 bg-purple-400 text-white rounded shadow">Titulares
            {ListaJugadoresB.map((player: jugador) => <p key={player.cedula}> {player.nombre}</p> )}
          </div>
          <div className="p-2 bg-purple-100 rounded shadow">Suplentes</div>
        </div>
      </div>

      {/* IZQUIERDA ABAJO: vacío */}
      <div></div>

      {/* CENTRO ABAJO: Botones adicionales */}
      <div className="flex flex-col items-center justify-center gap-4">
        <button className="px-4 py-2 bg-red-500 text-white rounded shadow">Finalizar Partido</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded shadow">Exportar Partido</button>
      </div>

      {/* DERECHA ABAJO: vacío */}
      <div></div>
    </div>
  );
};

export default FutbolExpress;
