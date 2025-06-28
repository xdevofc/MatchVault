import React, { useState, useRef, } from "react";
import { useJugadoresContext } from "./context/JugadoresContext";
import { useDatosDelPartidoContext } from "./context/DatosDelPartidoContext";
import ShowPlayersTitulares from "./Components/ShowPlayersTitulares";
import ScoreTracker from "./Components/ScoreTracker";
import TimerButtons from "./Components/TimerButtons";
import { useNavigate } from "react-router-dom";
import ExportarPartido from "./Components/ExportarPartido";
import TandaPenalties from "./Components/TandaPenalties";
import Winner from "./Components/Winner";
import { useGuardarConfigPartido} from "./hooks/useGuardarConfigPartido";
import { useGuardarDatosPartido } from "./hooks/useGuardarDatosPartido";
import { useFlujoPartido } from "./hooks/useFlujoPartido";
import { useGuardarEventos } from "./hooks/useGuardarEventos";
import Prorroga from "./Components/Prorroga";
import BotonesFinalizacion from "./Components/btnFinalizacion";
import useGuardarCambiosSuplente from "./hooks/useGuardarCambiosSuplente";
//import type { EventoFutbol } from "../../types/types";

const FutbolExpress: React.FC = () => {

// =====> CONSUMIENDO DATOS DEL PROVIDER <======

  // consumiendo el context con los datos del partido
  const {
    nombreA,
    nombreB,
    scoreA,
    scoreB,
    eventos,
    setScoreA,
    setScoreB,
    setEventos,
    duracion,
    penalties,
    prorroga,
    setProrroga,
    setShowPenalties,
    showPenalties
  } = useDatosDelPartidoContext()

  // consumiendo los setState para cambiar a suplente
  const { setEquipoA, setEquipoB, equipoA, equipoB, } = useJugadoresContext()

  // usar el useRef's para indicar el primer render
  const isPastFirstRender = useRef(false);
  const isFirstRender2 = useRef(true);
  const isFirstRender3 = useRef(true);

  // ===> DECLARACION DE SETS <===
    // indicamos los datos para el tablero
  const [tableroMinutos, setTableroMinutos] = useState<number>(duracion)
  const [tableroSegundos, setTableroSegundos] = useState<number>(0)
    // Para mantener oculto la prorroga y penalties
  const [showExtraTime, setShowExtraTime] = useState(false)
  const [cantTiempoAgg, setCantidadTiempoAgg] = useState(0)
  const [isTie, setIsTie] = useState(false)
    // mostrarPopUPs
  const [showWinner, setShowWinner] = useState(false)
  const [showExport, setShowExport] = useState<boolean>(false)
    // indicar si el tablero esta parado o no
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [afterExtraTime, setAfterExtraTime] = useState<boolean>(false)


  // ===> CUSTOM HOOKS <====

    //hook para guardar 'futbol-configuracion-partido'
  
  useGuardarConfigPartido({setTableroMinutos,setTableroSegundos,isFirstRender3,duracion})
  
    // hook para 'futbol-datos-partido'

  useGuardarDatosPartido({isPastFirstRender,tableroMinutos,tableroSegundos,scoreA,scoreB,setIsTie})
 
    // hook para flujo partido (decidir si es prorroga o penalties o termino)
  useFlujoPartido({isPaused,tableroSegundos,tableroMinutos,setTableroSegundos,setTableroMinutos,
    setIsPaused,setShowExtraTime,prorroga,setProrroga,isTie,penalties,
    setShowPenalties,afterExtraTime,setAfterExtraTime
  })
    // hook para guardar eventos 
  useGuardarEventos({isFirstRender2,eventos,setEventos,equipoA,equipoB})
    // guardando los cambios de equipos al cambiar de titular a suplente
  useGuardarCambiosSuplente({equipoA,equipoB})

  // usar navigate para volver al inicio despues de finalizar el partido
  const navigate = useNavigate()

  // mostrar el pop up exportacion


  // TODO: REVISAR QUE KRAJOS HACE ESTO???? ME MAME LGMT
  const ListaJugadoresA = equipoA;
  const ListaJugadoresB = equipoB;


  // extrayendo formateando el tablero
  const formatTime = `${String(tableroMinutos).padStart(2, "0")}:${String(tableroSegundos).padStart(2, "0")}`


  return (


    <div className="min-h-screen bg-[#121212] text-[#EAEAEA] overflow-x-hidden">
      <div className="container mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* MOSTRAR EL WINNER */}
          {showWinner && (
            <Winner
              setShowWinner={setShowWinner}
              showWinner={showWinner}
            />
          )}

          {showExport && (
            <ExportarPartido
              setShowExport={setShowExport}
              showExport={showExport}
            />
          )}

          {/* MOSTRAR TANDA DE PENALES */}
          {showPenalties && (
            <TandaPenalties
              onClose={() => setShowPenalties(false)}
              setShowWinner={setShowWinner}
            />
          )}

          {/* MENU OCULTO PARA LA PRORROGA */}
          {(showExtraTime && isTie) && (
            <Prorroga
              cantTiempoAgg={cantTiempoAgg}
              setCantidadTiempoAgg={setCantidadTiempoAgg}
              setTableroMinutos={setTableroMinutos}
              setShowExtraTime={setShowExtraTime}
            />
          )}

          <ScoreTracker titulo={nombreA} score={scoreA} setScore={setScoreA} />

          <div className="flex items-center justify-center">
            <h1 className="text-5xl font-bold">{formatTime}</h1>
          </div>

          <ScoreTracker titulo={nombreB} score={scoreB} setScore={setScoreB} />

          {/* LISTANDO GENTE A */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold">Jugadores</h3>
            <div className="flex gap-6 mt-4 overflow-auto">
              <ShowPlayersTitulares
                titulo="Titulares"
                jugadores={ListaJugadoresA}
                equipo={equipoA}
                setEquipo={setEquipoA}
                setScore={setScoreA}
                setEventos={setEventos}
                minuto={tableroMinutos}
              />
             
            </div>
          </div>

          <TimerButtons
            isPaused={isPaused}
            setMinutos={setTableroMinutos}
            setIsPaused={setIsPaused}
            eventos={eventos}
            setSeconds={setTableroSegundos}
          />

          {/* LISTANDO GENTE B */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold">Jugadores</h3>
            <div className="flex gap-6 mt-4 overflow-auto">
              <ShowPlayersTitulares
                titulo="Titulares"
                jugadores={ListaJugadoresB}
                equipo={equipoB}
                setEquipo={setEquipoB}
                setScore={setScoreB}
                setEventos={setEventos}
                minuto={tableroMinutos}
              />
              
            </div>
          </div>
 

          {/* BOTONES DE TERMINADO */}
          <BotonesFinalizacion
            navigate={navigate}
            setShowExport={setShowExport}
          />


        </div>
      </div>
    </div>
  );

};

export default FutbolExpress;
