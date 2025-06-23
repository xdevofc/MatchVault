import React from "react";
import type { jugador } from "../../../types/types";

interface Props {
  jugadores: jugador[];
  equipoA: jugador[];
  equipoB: jugador[];
  setEquipoA: React.Dispatch<React.SetStateAction<jugador[]>>;
  setEquipoB: React.Dispatch<React.SetStateAction<jugador[]>>;
  setScoreA?: React.Dispatch<React.SetStateAction<number>>;
  setScoreB?: React.Dispatch<React.SetStateAction<number>>;
  scoreA?: number;
  scoreB?: number;
  montoAmarilla: number;
  montoRoja: number;
  handleTitular: Function;
  handleAmarilla: Function;
  handleRoja: Function;
  handleGol: Function;
}

const ShowPlayers: React.FC<Props> = ({
  jugadores,
  equipoA,
  equipoB,
  setEquipoA,
  setEquipoB,
  setScoreA,
  setScoreB,
  scoreA,
  scoreB,
  montoAmarilla,
  montoRoja,
  handleTitular,
  handleAmarilla,
  handleRoja,
  handleGol,
}) => {
  return (
    <div className={`p-4 ${titular ? "bg-purple-400 text-white" : "bg-purple-100"} rounded shadow w-[22rem]`}>
      <h4 className="font-bold mb-3">{"Equipo"}</h4>
      {jugadores
        .filter((player) => player.titular === titular)
        .map((player) => {
          const isEjected = (player.amarilla ?? 0) > 2 || (player.roja ?? 0) === 1;

          return (
            <div key={player.cedula} className="mb-4 border-b border-white pb-2">
              <p className="font-medium">
                #{player.nroCamiseta} - {player.nombre} {player.apellido}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                <button
                  onClick={() => handleTitular(player, equipoA, equipoB, setEquipoA, setEquipoB)}
                  className="bg-yellow-500 text-black px-2 py-1 rounded text-xs"
                >
                  {"<->"}
                </button>
                <button
                  onClick={() => handleAmarilla(player, equipoA, equipoB, setEquipoA, setEquipoB, montoAmarilla)}
                  disabled={isEjected}
                  className={`px-2 py-1 rounded text-xs text-black ${isEjected ? "bg-yellow-200 opacity-60 cursor-not-allowed" : "bg-yellow-300 hover:bg-yellow-400"}`}
                >
                  Amarilla
                </button>
                <button
                  onClick={() => handleRoja(player, equipoA, equipoB, setEquipoA, setEquipoB, montoRoja)}
                  disabled={isEjected}
                  className={`px-2 py-1 rounded text-xs text-white ${isEjected ? "bg-red-300 opacity-60 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
                >
                  Roja
                </button>
                <button
                  onClick={() => handleGol(player, equipoA, equipoB, setEquipoA, setEquipoB, setScoreA!, setScoreB!, scoreA!, scoreB!)}
                  disabled={isEjected || !player.titular}
                  className={`px-2 py-1 rounded text-xs text-white ${isEjected || !player.titular ? "bg-green-300 opacity-60 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
                >
                  Gol
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ShowPlayers;
