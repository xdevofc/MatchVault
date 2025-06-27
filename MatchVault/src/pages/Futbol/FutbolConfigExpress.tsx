import type React from "react";
import RegisterPlayers from "./Components/RegisterPlayers";
import ConfiguracionPartido from "./Components/ConfiguracionPartido";
import { useEffect, useState,} from "react";
import { type jugador } from '../../types/types';
import { useJugadoresContext } from "./context/JugadoresContext";
import { useDatosDelPartidoContext } from "./context/DatosDelPartidoContext";
import DefinirNombres from "./Components/DefinirNombres";


function FutbolConfigExpress(): React.JSX.Element {

  // pop up para elegir los nombres de los equipos
  const [mostrarDefinirNombres, setMostrarDefinirNombres] = useState<boolean>(true);


  // usando el provider para definir la lista de los equipos con sus jugadores
  const {setEquipoA, setEquipoB, equipoA, equipoB} = useJugadoresContext()

  //extrayendo el nombre de los equipos
  const {nombreA, nombreB} = useDatosDelPartidoContext()

  // guardando a los jugadores en las listas (solo listas no LS)
    function AgregarEquipoA(jugadorNuevo: jugador): void {
    setEquipoA(prev => [...prev, jugadorNuevo]);
    console.log("Agregando al equipo A");
  }

  function AgregarEquipoB(jugadorNuevo: jugador): void {
    setEquipoB(prev => [...prev, jugadorNuevo]);
    console.log("Agregando al Equipo B");
  }

  // guardando las listas en el LS cada vez que se agrega un jugador
  useEffect(() => {
    localStorage.setItem("Lista-jugadores", JSON.stringify({ equipoA, equipoB }));
  }, [equipoA, equipoB]);

  return (
<>
{mostrarDefinirNombres && (
    <DefinirNombres
      mostrarDefinirNombres={mostrarDefinirNombres}
      setMostrarDefinirNombres={setMostrarDefinirNombres}
    />
  )}

  <div className="min-h-screen bg-[#121212] flex items-center justify-center overflow-hidden">
    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[auto,auto,auto] gap-4 p-4 bg-[#1F1F1F] rounded-xl shadow-lg w-full max-w-6xl">
      {/* Header */}
      <header className="col-span-1 md:col-span-2 bg-[#D4AF37] text-[#121212] px-4 py-2 rounded-lg shadow">
        <h1 className="text-xl font-bold leading-tight">Fútbol Configuración Express</h1>
        <p className="text-sm leading-snug">Elige la configuración que deseas</p>
      </header>

      {/* Team 1 */}
      <div className="bg-[#1F1F1F] px-3 py-2 rounded-lg shadow border border-[#333]">
        <RegisterPlayers
          nombreEquipo={nombreA}
          onSubmit={AgregarEquipoA}
          jugadores={equipoA}
          setJugadores={setEquipoA}
        />
      </div>

      {/* Team 2 */}
      <div className="bg-[#1F1F1F] px-3 py-2 rounded-lg shadow border border-[#333]">
        <RegisterPlayers
          nombreEquipo={nombreB}
          onSubmit={AgregarEquipoB}
          jugadores={equipoB}
          setJugadores={setEquipoB}
        />
      </div>

      {/* Footer */}
      <footer className="col-span-1 md:col-span-2 bg-[#BFA434] text-[#121212] px-4 py-2 rounded-lg shadow">
        <ConfiguracionPartido />
      </footer>
    </div>
  </div>
</>
  );
}

export default FutbolConfigExpress;
