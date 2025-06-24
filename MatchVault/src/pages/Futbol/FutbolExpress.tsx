import React, { useState, useEffect, } from "react";
import { useJugadoresContext } from "./context/JugadoresContext";
import { guardarEventos, guardarLS, handleAmarilla, handleGol, handleRoja, handleTitular } from "./handlers/FutbolExpress/FutbolExpress";
import { useDatosDelPartidoContext } from "./context/DatosDelPartidoContext";
import ShowPlayersTitulares from "./Components/ShowPlayersTitulares";
import ShowPlayersSuplentes from "./Components/ShowPlayersSuplentes";
import ScoreTracker from "./Components/ScoreTracker";
import TimerButtons from "./Components/TimerButtons";
import type { EventoFutbol } from "../../types/types";
//import type { EventoFutbol } from "../../types/types";

const FutbolExpress: React.FC = () => {
    // consumiendo el context con los datos del partido
  const { 
    duracion,
    montoAmarilla, 
    montoRoja, 
   } = useDatosDelPartidoContext()




  const [scoreA, setScoreA] = useState<number>(0);
  const [scoreB, setScoreB] = useState<number>(0);
  const [minutos, setMinutos] = useState<number>(duracion-1); 
  const [seconds, setSeconds] = useState<number>(59); 
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [eventos, setEventos] = useState<EventoFutbol[]>(() => {
    const data = localStorage.getItem("futbol-eventos");
    return data ? JSON.parse(data) || [] : [];
  });
  

  // consumiendo los setState para cambiar a suplente
  const { setEquipoA, setEquipoB, equipoA, equipoB} = useJugadoresContext() 
  const ListaJugadoresA = equipoA;
  const ListaJugadoresB = equipoB;

  
// actualizar los segundos del minutero
  useEffect(() => {
    let interval: number;
    if (!isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }

    if (!isPaused && seconds == 0){
        setMinutos((prev) => prev -1)
        setSeconds(59)
    }

    return () => clearInterval(interval);
  }, [isPaused, seconds]);


// extrayendo formateando el tablero
const formatTime = `${minutos}:${String(seconds).padStart(2, "0")}`


    // guardando los cambios de equipos al cambiar de titular a suplente
  useEffect(() => {
    guardarLS(equipoA, equipoB)
  }, [equipoA,equipoB])

//    guardando los eventos
    useEffect(()=>{
        guardarEventos(eventos)
    }, [eventos])

 

  // cambiando a suplente

  return (
    <div className="w-full h-screen bg-purple-200 overflow-hidden grid grid-cols-3 grid-rows-3 gap-6 px-6 py-4">
      {/* IZQUIERDA ARRIBA: Marcador equipo A */}
      <ScoreTracker
        titulo={"Equipo A"}
        score={scoreA}
        setScore={setScoreA}
      />
      

      {/* CENTRO ARRIBA: Minutero */}
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold">{formatTime}</h1>
      </div>

      {/* DERECHA ARRIBA: Marcador equipo B */}
      <ScoreTracker
        titulo={"EquipoB"}
        score={scoreB}
        setScore={setScoreB}
      />
      

      {/* IZQUIERDA CENTRO: Jugadores equipo A */}
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Jugadores</h3>
        <div className="flex gap-6 mt-4">
          
            
            <ShowPlayersTitulares
                titulo={"titulares"}
                jugadores={ListaJugadoresA}
                equipo={equipoA}
                setEquipo={setEquipoA}
                setScore={setScoreA}
                handleTitular={handleTitular}
                handleAmarilla={handleAmarilla}
                handleRoja={handleRoja}
                handleGol={handleGol}
                montoAmarilla={montoAmarilla}
                montoRoja={montoRoja}
                setEventos={setEventos}
                minuto={minutos}
            />
          
          <ShowPlayersSuplentes
            titulo={"Suplentes"}
            jugadores={ListaJugadoresA}
            equipo={equipoA}
            setEquipo={setEquipoA}
            setScore={setScoreA}
            handleTitular={handleTitular}
            handleAmarilla={handleAmarilla}
            handleRoja={handleRoja}
            handleGol={handleGol}
            montoAmarilla={montoAmarilla}
            montoRoja={montoRoja}
          />
          
        </div>
      </div>

      {/* CENTRO CENTRO: Controles del reloj */}
      <TimerButtons
        isPaused={isPaused} 
        setMinutos={setMinutos}
        setIsPaused={setIsPaused}
        eventos={eventos}
      />
     

      {/* DERECHA CENTRO: Jugadores equipo B */}
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Jugadores</h3>
        <div className="flex gap-6 mt-4">
            <ShowPlayersTitulares 
            titulo={"titulares"}
                jugadores={ListaJugadoresB}
                equipo={equipoB}
                setEquipo={setEquipoB}
                setScore={setScoreB}
                handleTitular={handleTitular}
                handleAmarilla={handleAmarilla}
                handleRoja={handleRoja}
                handleGol={handleGol}
                montoAmarilla={montoAmarilla}
                montoRoja={montoRoja}
                setEventos={setEventos}
                minuto={minutos}
            />
          
          <ShowPlayersSuplentes
          titulo={"Suplentes"}
            jugadores={ListaJugadoresB}
            equipo={equipoB}
            setEquipo={setEquipoB}
            setScore={setScoreB}
            handleTitular={handleTitular}
            handleAmarilla={handleAmarilla}
            handleRoja={handleRoja}
            handleGol={handleGol}
            montoAmarilla={montoAmarilla}
            montoRoja={montoRoja}
          />
          
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
