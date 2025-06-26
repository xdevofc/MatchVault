import type React from "react";
import RegisterPlayers from "./RegisterPlayers";
import ConfiguracionPartido from "./ConfiguracionPartido";
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
  const {nombreEquipoA, nombreEquipoB} = useDatosDelPartidoContext()

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
  {/* Mostrando el pop up para definir el nombre de los equipo */}
  {mostrarDefinirNombres && (
       <DefinirNombres
        mostrarDefinirNombres={mostrarDefinirNombres}
        setMostrarDefinirNombres={setMostrarDefinirNombres}
       /> 
      )}

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
            nombreEquipo={nombreEquipoA}
            onSubmit={AgregarEquipoA}
            jugadores={equipoA}
            setJugadores={setEquipoA}
          />
        </div>

        {/* elementos del team#2 */}
        <div className="bg-white px-3 py-2 rounded-lg shadow border border-purple-300">
          <RegisterPlayers
            nombreEquipo={nombreEquipoB}
            onSubmit={AgregarEquipoB}
            jugadores={equipoB}
            setJugadores={setEquipoB}
          />
        </div>

        {/* Footer */}
        <footer className="col-span-2 bg-purple-700 text-white px-4 py-2 rounded-lg shadow">
                <ConfiguracionPartido />
                
        </footer>
      </div>
    </div>
  </>
  );
}

export default FutbolConfigExpress;
