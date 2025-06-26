import React, { useState, useEffect, useRef,  } from "react";
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
//import type { EventoFutbol } from "../../types/types";

const FutbolExpress: React.FC = () => {
  // usar el useRef's para indicar el primer render
  const isPastFirstRender = useRef(false);
  const isFirstRender2 = useRef(true);
  const isFirstRender3 = useRef(true);


  // consumiendo los providers 
  // consumiendo los setState para cambiar a suplente
  const { setEquipoA, setEquipoB, equipoA, equipoB, } = useJugadoresContext()

    // consumiendo el context con los datos del partido
  const {
    montoAmarilla,
    montoRoja,
    nombreEquipoA,
    nombreEquipoB,
    scoreA,
    scoreB,
    eventos,
    setScoreA,
    setScoreB,
    setEventos,
    duracion
  } = useDatosDelPartidoContext()



  // indicamos los datos para el tablero
  const [tableroMinutos, setTableroMinutos] = useState<number>(duracion)
  const [tableroSegundos, setTableroSegundos] = useState<number>(59)


  // usar navigate para volver al inicio despues de finalizar el partido
  const navigate = useNavigate()

  // mostrar el pop up exportacion

  const [showExport, setShowExport] = useState<boolean>(false)

  // indicar si el tablero esta parado o no
  const [isPaused, setIsPaused] = useState<boolean>(true);



  // TODO: REVISAR QUE KRAJOS HACE ESTO???? ME MAME LGMT
  const ListaJugadoresA = equipoA;
  const ListaJugadoresB = equipoB;



  useEffect(()=>{

    if (isFirstRender3.current){

      const dataPartidoTranscurrido = localStorage.getItem('futbol-datos-partido')
      

      if(dataPartidoTranscurrido){
        console.log("DATOS DEL PARTIDO IMPORTADO", dataPartidoTranscurrido)

    

        //verificamos las propiedades de futbol-config-partido
        if(!JSON.parse(dataPartidoTranscurrido).minutosJugados || !JSON.parse(dataPartidoTranscurrido).segundosJugados || 
          !JSON.parse(dataPartidoTranscurrido).scoreA || !JSON.parse(dataPartidoTranscurrido).scoreB){
            setTableroMinutos(duracion)
          }
        else{
          const {minutosJugados, segundosJugados} = JSON.parse(dataPartidoTranscurrido)
          setTableroMinutos(minutosJugados)
          setTableroSegundos(segundosJugados)
        }
      } 

    }else{
      return
    }
      
  },[])




  // guardar los datos del partido
  useEffect(() => {

    // traemos los datos del LS si los hay 

    if (isPastFirstRender.current){
      isPastFirstRender.current = true
      console.log("GUARDAMOS FUTBOL-DATOS-PARTIDO AL TRANSCURRIR TIEMPO ")


          localStorage.setItem('futbol-datos-partido', JSON.stringify({
              minutosJugados: tableroMinutos,
              segundosJugados: tableroSegundos,
              scoreA,
              scoreB,
          }))
    }
 

    
  }, [tableroSegundos, tableroMinutos, scoreA, scoreB])


  // actualizar los segundos del minutero
  useEffect(() => {
    //restando los segundos 
    let interval: number;
    if (!isPaused && tableroSegundos> 0) {
      interval = setInterval(() => {
        setTableroSegundos((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }


    // reiniciando segundos y restando minutos
    if (!isPaused && tableroSegundos== 0) {
      setTableroMinutos((prev) => prev - 1)
      setTableroSegundos(59)
    }

    return () => clearInterval(interval);
  }, [isPaused, tableroSegundos]);


  // extrayendo formateando el tablero
  const formatTime = `${String(tableroMinutos).padStart(2,"0")}:${String(tableroSegundos).padStart(2, "0")}`


  // guardando los cambios de equipos al cambiar de titular a suplente
  useEffect(() => {
    guardarJugadoresLS(equipoA, equipoB)
  }, [equipoA, equipoB])


  //    guardando los eventos 
  useEffect(() => {

    
    if (isFirstRender2.current){
      
      isFirstRender2.current = false
      const dataListaJugadores = localStorage.getItem("Lista-jugadores")
      const data = localStorage.getItem('futbol-eventos')

        // verificamos las propiedades de jugadores
        


      if (data !== null && dataListaJugadores){
        console.log("DATA LISTA JUGADORES: ",dataListaJugadores)
        guardarJugadoresLS(JSON.parse(dataListaJugadores).equipoA, JSON.parse(dataListaJugadores).equipoB)
        setEventos(JSON.parse(data)) 
      }
      console.log("SE LLAMAN LOS DATOS DE LA COLA DE EVENTOS DEL IMPORT", data)
      return
    }

    guardarJugadoresLS(equipoA,equipoB)
    guardarEventos(eventos)
    
      

    }, [eventos, equipoA, equipoB])



  return (

    <div className="w-full h-screen bg-purple-200 overflow-hidden grid grid-cols-3 grid-rows-3 gap-6 px-6 py-4">
      {showExport && (
        <ExportarPartido
          setShowExport={setShowExport}
          showExport={showExport}
        />
      )}
      {/* IZQUIERDA ARRIBA: Marcador equipo A */}
      <ScoreTracker
        titulo={nombreEquipoA}
        score={scoreA}
        setScore={setScoreA}
      />


      {/* CENTRO ARRIBA: Minutero */}
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold">{formatTime}</h1>
      </div>

      {/* DERECHA ARRIBA: Marcador equipo B */}
      <ScoreTracker
        titulo={nombreEquipoB}
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
            montoAmarilla={montoAmarilla}
            montoRoja={montoRoja}
            setEventos={setEventos}
            minuto={tableroMinutos}
          />

          <ShowPlayersSuplentes
            titulo={"Suplentes"}
            jugadores={ListaJugadoresA}
            equipo={equipoA}
            setEquipo={setEquipoA}
            setScore={setScoreA}
            montoAmarilla={montoAmarilla}
            montoRoja={montoRoja}
            setEventos={setEventos}
            minuto={tableroMinutos}
          />

        </div>
      </div>

      {/* CENTRO CENTRO: Controles del reloj */}
      <TimerButtons
        isPaused={isPaused}
        setMinutos={setTableroMinutos}
        setIsPaused={setIsPaused}
        eventos={eventos}
        setSeconds={setTableroSegundos}
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
            montoAmarilla={montoAmarilla}
            montoRoja={montoRoja}
            setEventos={setEventos}
            minuto={tableroMinutos}
          />

          <ShowPlayersSuplentes
            titulo={"Suplentes"}
            jugadores={ListaJugadoresB}
            equipo={equipoB}
            setEquipo={setEquipoB}
            setScore={setScoreB}
            montoAmarilla={montoAmarilla}
            montoRoja={montoRoja}
            setEventos={setEventos}
            minuto={tableroMinutos}
          />

        </div>
      </div>

      {/* IZQUIERDA ABAJO: vacío */}
      <div></div>

      {/* CENTRO ABAJO: Botones adicionales */}
      <div className="flex flex-col items-center justify-center gap-4">
        <button className="px-4 py-2 bg-red-500 text-white rounded shadow"
          onClick={(e) => {
            e.preventDefault()

            const allowDelete = confirm("Desea terminar el partido ? su progreso NO se guardara")
            finalizarPartido(allowDelete)

            if (allowDelete) {
              navigate('/')
            }

          }}
        >Finalizar Partido</button>


        {/* EXPORTAR PARTIDO */}
        <button
          onClick={(e) => {
            e.preventDefault()
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
