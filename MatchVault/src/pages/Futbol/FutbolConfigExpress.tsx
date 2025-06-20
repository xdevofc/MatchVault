import type React from "react";
import RegisterPlayers from "./RegisterPlayers";
import ConfiguracionPartido from "./ConfiguracionPartido";
import { useEffect, useState } from "react";
import { type jugador } from '../../types/types';

function FutbolConfigExpress(): React.JSX.Element {
  const [equipoA, setEquipoA] = useState<jugador[]>(() => {
    const data = localStorage.getItem("Lista-jugadores");
    return data ? JSON.parse(data).equipoA || [] : [];
  });

  const [equipoB, setEquipoB] = useState<jugador[]>(() => {
    const data = localStorage.getItem("Lista-jugadores");
    return data ? JSON.parse(data).equipoB || [] : [];
  });

  function AgregarEquipoA(jugadorNuevo: jugador): void {
    setEquipoA(prev => [...prev, jugadorNuevo]);
    console.log("Agregando al equipo A");
  }

  function AgregarEquipoB(jugadorNuevo: jugador): void {
    setEquipoB(prev => [...prev, jugadorNuevo]);
    console.log("Agregando al Equipo B");
  }

  useEffect(() => {
    localStorage.setItem("Lista-jugadores", JSON.stringify({ equipoA, equipoB }));
  }, [equipoA, equipoB]);

  return (
    <div className="h-screen bg-purple-200 flex items-center justify-center overflow-hidden">
      <div className="grid grid-cols-2 grid-rows-[auto,auto,auto] gap-4 p-4 bg-white rounded-xl shadow-lg w-full max-w-[95%]">
        {/* Header */}
        <header className="col-span-2 bg-purple-500 text-white px-4 py-2 rounded-lg shadow">
          <h1 className="text-xl font-bold leading-tight">Fútbol Configuración Express</h1>
          <p className="text-sm leading-snug">Elige la configuración que deseas</p>
        </header>

        {/* elementos del team#1 */}
        <div className="bg-white px-3 py-2 rounded-lg shadow border border-purple-300">
          <RegisterPlayers
            nombreEquipo="Equipo A"
            onSubmit={AgregarEquipoA}
            jugadores={equipoA}
          />
        </div>

        {/* elementos del team#2 */}
        <div className="bg-white px-3 py-2 rounded-lg shadow border border-purple-300">
          <RegisterPlayers
            nombreEquipo="Equipo B"
            onSubmit={AgregarEquipoB}
            jugadores={equipoB}
          />
        </div>

        {/* Footer */}
        <footer className="col-span-2 bg-purple-700 text-white px-4 py-2 rounded-lg shadow">
          <ConfiguracionPartido />
        </footer>
      </div>
    </div>
  );
}

export default FutbolConfigExpress;
