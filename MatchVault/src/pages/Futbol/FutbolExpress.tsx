import React, { useState, useEffect, useRef, } from "react";
import { useJugadoresContext } from "./context/JugadoresContext";
import { useDatosDelPartidoContext } from "./context/DatosDelPartidoContext";
import ShowPlayersTitulares from "./Components/ShowPlayersTitulares";
import ShowPlayersSuplentes from "./Components/ShowPlayersSuplentes";
import ScoreTracker from "./Components/ScoreTracker";
import TimerButtons from "./Components/TimerButtons";
import { useNavigate } from "react-router-dom";
import ExportarPartido from "./Components/ExportarPartido";
import { guardarJugadoresLS } from "./handlers/FutbolExpress/guardarJugadoresLS";
import { guardarEventos } from "./handlers/FutbolExpress/guardarPilaEventos";
import { finalizarPartido } from "./handlers/FutbolExpress/finalizarPartdio";
import TandaPenalties from "./Components/TandaPenalties";
import Winner from "./Components/Winner";
//import type { EventoFutbol } from "../../types/types";

const FutbolExpress: React.FC = () => {
  // usar el useRef's para indicar el primer render
  const isPastFirstRender = useRef(false);
  const isFirstRender2 = useRef(true);
  const isFirstRender3 = useRef(true);


  // Para mantener oculto la prorroga y penalties
  const [showExtraTime, setShowExtraTime] = useState(false)
  const [cantTiempoAgg, setCantidadTiempoAgg] = useState(0)
  const [isTie, setIsTie] = useState(false)
  const [showWinner, setShowWinner] = useState(false)


  // consumiendo los providers 
  // consumiendo los setState para cambiar a suplente
  const { setEquipoA, setEquipoB, equipoA, equipoB, } = useJugadoresContext()

  // consumiendo el context con los datos del partido
  const {
    montoAmarilla,
    montoRoja,
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



  // indicamos los datos para el tablero
  const [tableroMinutos, setTableroMinutos] = useState<number>(duracion)
  const [tableroSegundos, setTableroSegundos] = useState<number>(0)


  // usar navigate para volver al inicio despues de finalizar el partido
  const navigate = useNavigate()

  // mostrar el pop up exportacion

  const [showExport, setShowExport] = useState<boolean>(false)

  // indicar si el tablero esta parado o no
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const [afterExtraTime, setAfterExtraTime] = useState<boolean>(false)



  // TODO: REVISAR QUE KRAJOS HACE ESTO???? ME MAME LGMT
  const ListaJugadoresA = equipoA;
  const ListaJugadoresB = equipoB;



  useEffect(() => {

    if (isFirstRender3.current) {

      const dataPartidoTranscurrido = localStorage.getItem('futbol-datos-partido')


      if (dataPartidoTranscurrido) {
        console.log("DATOS DEL PARTIDO IMPORTADO", dataPartidoTranscurrido)



        //verificamos las propiedades de futbol-config-partido
        if (!JSON.parse(dataPartidoTranscurrido).minutosJugados || !JSON.parse(dataPartidoTranscurrido).segundosJugados ||
          !JSON.parse(dataPartidoTranscurrido).scoreA || !JSON.parse(dataPartidoTranscurrido).scoreB) {
          setTableroMinutos(duracion)
        }
        else {
          const { minutosJugados, segundosJugados } = JSON.parse(dataPartidoTranscurrido)
          setTableroMinutos(minutosJugados)
          setTableroSegundos(segundosJugados)
        }
      }

    } else {
      return
    }

  }, [])




  // guardar los datos del partido
  useEffect(() => {

    // traemos los datos del LS si los hay 

    if (isPastFirstRender.current) {
      console.log("GUARDAMOS FUTBOL-DATOS-PARTIDO AL TRANSCURRIR TIEMPO ")


      localStorage.setItem('futbol-datos-partido', JSON.stringify({
        minutosJugados: tableroMinutos,
        segundosJugados: tableroSegundos,
        scoreA,
        scoreB,
      }))
    }

    if (scoreA === scoreB) {
      setIsTie(true)
    } else {
      setIsTie(false)
    }


    isPastFirstRender.current = true


  }, [tableroSegundos, tableroMinutos, scoreA, scoreB])


  // actualizar los segundos del minutero
  useEffect(() => {
    let interval: number | undefined;

    if (!isPaused && (tableroMinutos > 0 || tableroSegundos > 0)) {
      interval = window.setInterval(() => {
        setTableroSegundos((prevSegundos) => {
          if (prevSegundos > 0) {
            return prevSegundos - 1;
          } else {
            return 59;
          }
        });

        setTableroMinutos((prevMinutos) => {
          if (tableroSegundos === 0) {
            return prevMinutos > 0 ? prevMinutos - 1 : 0;
          }
          return prevMinutos;
        });
      }, 1000);
    }

    if (!isPaused && tableroMinutos === 0 && tableroSegundos === 0) {
      // Evitamos que se ejecute múltiples veces
      clearInterval(interval);
      setIsPaused(true);

      if (prorroga && !afterExtraTime && isTie) {
        // Se activa la prórroga
        setShowExtraTime(true);
        setProrroga(false);
        setAfterExtraTime(true); // Marcamos que ya se usó la prórroga
        return;
      }

      if (penalties && (afterExtraTime || !prorroga) && isTie) {
        setShowPenalties(true);
        return;
      }


      // ✅ Solo se muestra el mensaje si NO hay prórroga ni penales pendientes
      if (!prorroga && !penalties && !afterExtraTime) {
        console.log("⏱ Se alcanzó 00:00, pausando reloj");
      }
    }

    return () => clearInterval(interval);
  }, [isPaused, tableroMinutos, tableroSegundos, prorroga, afterExtraTime, penalties]);


  // extrayendo formateando el tablero
  const formatTime = `${String(tableroMinutos).padStart(2, "0")}:${String(tableroSegundos).padStart(2, "0")}`


  // guardando los cambios de equipos al cambiar de titular a suplente
  useEffect(() => {
    guardarJugadoresLS(equipoA, equipoB)
  }, [equipoA, equipoB])


  //    guardando los eventos 
  useEffect(() => {


    if (isFirstRender2.current) {

      isFirstRender2.current = false
      const dataListaJugadores = localStorage.getItem("Lista-jugadores")
      const data = localStorage.getItem('futbol-eventos')

      // verificamos las propiedades de jugadores



      if (data !== null && dataListaJugadores) {
        console.log("DATA LISTA JUGADORES: ", dataListaJugadores)
        guardarJugadoresLS(JSON.parse(dataListaJugadores).equipoA, JSON.parse(dataListaJugadores).equipoB)
        setEventos(JSON.parse(data))
      }
      console.log("SE LLAMAN LOS DATOS DE LA COLA DE EVENTOS DEL IMPORT", data)
      return
    }

    guardarJugadoresLS(equipoA, equipoB)
    guardarEventos(eventos)



  }, [eventos, equipoA, equipoB])



  return (

    <div className="w-full h-screen bg-[#121212] overflow-hidden grid grid-cols-3 grid-rows-3 gap-6 px-6 py-4 text-[#EAEAEA]">
      {/* MOSTRAR EL WINNER*/}

      {
        showWinner && (
          <Winner
            setShowWinner={setShowWinner}
            showWinner={showWinner}
          />
        )
      }




      {showExport && (
        <ExportarPartido
          setShowExport={setShowExport}
          showExport={showExport}
        />
      )}

      {/* MOSTRAR TANDA DE PENALES */}
      {(showPenalties) ? (
        <TandaPenalties
          onClose={() => {
            setShowPenalties(false)
          }}
          setShowWinner={setShowWinner}
        />

      ) : null}


      {/* MENU OCULTO PARA LA PRORROGA */}

      {(showExtraTime && isTie) ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md text-center space-y-6 p-6">
            <h2 className="text-xl text-black font-semibold">Ingresa el tiempo extra!</h2>

            <label htmlFor="nombre" className="block text-lg font-medium text-black">Minutos</label>
            <input
              name="nombre"
              type="number"
              className="border border-gray-300 rounded px-2 py-1 w-full text-black"
              value={cantTiempoAgg}
              onChange={e => setCantidadTiempoAgg(Number(e.target.value))}
            />

            <button
              onClick={(e) => {
                e.preventDefault()
                setTableroMinutos(cantTiempoAgg)
                setShowExtraTime(false)
              }
              }
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded mt-4"
            >
              Ir a la prorroga
            </button>
          </div>
        </div>

      )
        :
        null

      }

      <ScoreTracker titulo={nombreA} score={scoreA} setScore={setScoreA} />

      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold">{formatTime}</h1>
      </div>

      <ScoreTracker titulo={nombreB} score={scoreB} setScore={setScoreB} />

      {/* LISTANDO GENTE A */}
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Jugadores</h3>
        <div className="flex gap-6 mt-4">
          <ShowPlayersTitulares
            titulo={"titulares"}
            jugadores={ListaJugadoresA}
            equipo={equipoA}
            setEquipo={setEquipoA}
            setScore={setScoreA}
            setEventos={setEventos}
            minuto={tableroMinutos}
          />
          <ShowPlayersSuplentes
            titulo={"Suplentes"}
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
        <div className="flex gap-6 mt-4">
          <ShowPlayersTitulares
            titulo={"titulares"}
            jugadores={ListaJugadoresB}
            equipo={equipoB}
            setEquipo={setEquipoB}
            setScore={setScoreB}
            setEventos={setEventos}
            minuto={tableroMinutos}
          />
          <ShowPlayersSuplentes
            titulo={"Suplentes"}
            jugadores={ListaJugadoresB}
            equipo={equipoB}
            setEquipo={setEquipoB}
            setScore={setScoreB}
            setEventos={setEventos}
            minuto={tableroMinutos}
          />
        </div>
      </div>

      <div></div>
      {/* BOTONES DE TERMINADO */}
      <div className="flex flex-col items-center justify-center gap-4">
        <button
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow"
          onClick={(e) => {
            e.preventDefault();
            const allowDelete = confirm("Desea terminar el partido ? su progreso NO se guardara");
            finalizarPartido(allowDelete);
            if (allowDelete) navigate('/');
          }}
        >
          Finalizar Partido
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setShowExport(true);
          }}
          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#BFA434] text-[#121212] rounded shadow"
        >
          Exportar Partido
        </button>
      </div>

      <div></div>
    </div>
  );
};

export default FutbolExpress;
