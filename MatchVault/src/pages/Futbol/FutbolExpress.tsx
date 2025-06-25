import React, { useState, useEffect, useRef, } from "react";
import { useJugadoresContext } from "./context/JugadoresContext";
import { finalizarPartido, guardarEventos, guardarLS, handleAmarilla, handleGol, handleRoja, handleTitular } from "./handlers/FutbolExpress/FutbolExpress";
import { useDatosDelPartidoContext } from "./context/DatosDelPartidoContext";
import ShowPlayersTitulares from "./Components/ShowPlayersTitulares";
import ShowPlayersSuplentes from "./Components/ShowPlayersSuplentes";
import ScoreTracker from "./Components/ScoreTracker";
import TimerButtons from "./Components/TimerButtons";
import { useNavigate } from "react-router-dom";
import ExportarPartido from "./Components/ExportarPartido";
//import type { EventoFutbol } from "../../types/types";

const FutbolExpress: React.FC = () => {
    // consumiendo el context con los datos del partido
  const { 
    duracion,
    montoAmarilla, 
    montoRoja, 
   } = useDatosDelPartidoContext()

// usar navigate para volver al inicio despues de finalizar el partido
   const navigate = useNavigate()
// mostrar exportacion

   const [showExport, setShowExport] = useState<boolean>(false)

const [scoreA, setScoreA] = useState<number>(() => {
  const data = localStorage.getItem("futbol-datos-partido");
  const parsed = data ? JSON.parse(data) : null;
  return parsed?.golesA ?? 0;
});

const [scoreB, setScoreB] = useState<number>(() => {
  const data = localStorage.getItem("futbol-datos-partido");
  const parsed = data ? JSON.parse(data) : null;
  return parsed?.golesB ?? 0;
});

const [minutos, setMinutos] = useState<number>(() => {
  const data = localStorage.getItem("futbol-datos-partido");
  const parsed = data ? JSON.parse(data) : null;
  return parsed?.minutosJugados ?? duracion - 1;
});

const [seconds, setSeconds] = useState<number>(() => {
  const data = localStorage.getItem("futbol-datos-partido");
  const parsed = data ? JSON.parse(data) : null;
  return parsed?.segundosJugados ?? 59;
});
  const [isPaused, setIsPaused] = useState<boolean>(true);

  // consumiendo los setState para cambiar a suplente
  const { setEquipoA, setEquipoB, equipoA, equipoB, } = useJugadoresContext()
  
  const {eventos, setEventos} = useDatosDelPartidoContext()

  const ListaJugadoresA = equipoA;
  const ListaJugadoresB = equipoB;

  // usar el useRef para evitar el primer cargado del componente 
  const isFirstRender = useRef(true)

  // guardar los datos del partido
useEffect(()=>{
    localStorage.setItem('futbol-datos-partido', JSON.stringify({
            minutosJugados: minutos,
            segundosJugados : seconds,
            golesA:scoreA,
            golesB:scoreB,
        }))
},[minutos, seconds,scoreA,scoreB])


// actualizar los segundos del minutero
  useEffect(() => {
    //restando los segundos 
    let interval: number;
    if (!isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }

    
    // reiniciando segundos y restando minutos
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

      if (isFirstRender.current) {
          isFirstRender.current = false;
          return; // evita guardar eventos vacíos en LS al inicio
        }

       guardarEventos(eventos)
    }, [eventos])

 

  // cambiando a suplente

  return (

    <div className="w-full h-screen bg-purple-200 overflow-hidden grid grid-cols-3 grid-rows-3 gap-6 px-6 py-4">
      { showExport &&  (
        <ExportarPartido
          setShowExport={setShowExport}
          showExport={showExport}
        />
         )}
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
            setEventos={setEventos}
            minuto={minutos}
          />
          
        </div>
      </div>

      {/* CENTRO CENTRO: Controles del reloj */}
      <TimerButtons
        isPaused={isPaused} 
        setMinutos={setMinutos}
        setIsPaused={setIsPaused}
        eventos={eventos}
        setSeconds={setSeconds}
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
            setEventos={setEventos}
            minuto={minutos}
          />
          
        </div>
      </div>

      {/* IZQUIERDA ABAJO: vacío */}
      <div></div>

      {/* CENTRO ABAJO: Botones adicionales */}
      <div className="flex flex-col items-center justify-center gap-4">
        <button className="px-4 py-2 bg-red-500 text-white rounded shadow"
        onClick={()=> {

            const allowDelete = confirm("Desea terminar el partido ? su progreso NO se guardara")
            finalizarPartido(allowDelete)

            if (allowDelete){
                navigate('/')
            }

        }}
        >Finalizar Partido</button>
        <button 
        onClick={() =>{
          setShowExport(true)
        }}
        className="px-4 py-2 bg-green-500 text-white rounded shadow">Exportar Partido</button>
      </div>

      {/* DERECHA ABAJO: vacío */}
      <div></div>
    </div>
  );
};

export default FutbolExpress;
