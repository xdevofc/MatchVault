import type React from "react"
import { JugadoresContext } from "./JugadoresContext";
import { DatosPartidoContext } from "./DatosDelPartidoContext";
import { useState } from "react";
import type { EventoFutbol, jugador } from "../../../types/types";


const ContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  // consumiendo los datos del local storage para que sean sus valores por defecto
  //const {} = localStorage.getItem()

  const [equipoA, setEquipoA] = useState<jugador[]>(() => {
    const data = localStorage.getItem('Lista-jugadores')
    return data ? JSON.parse(data).equipoA : []
  });

  const [equipoB, setEquipoB] = useState<jugador[]>(() => {
    const data = localStorage.getItem('Lista-jugadores')
    return data ? JSON.parse(data).equipoA : []
  });

  const [duracion, setDuracion] = useState<number>(30);
  const [amonestaciones, setAmonestaciones] = useState(false);
  const [montoAmarilla, setMontoAmarilla] = useState<number>(10000);
  const [montoRoja, setMontoRoja] = useState<number>(20000);
  const [penalties, setPenalties] = useState(false);
  const [prorroga, setProrroga] = useState(false);

  // agarrar el input de los usuarios
  const [nombreA, setNombreA] = useState<string>(() => {
    const data = localStorage.getItem('futbol-configuracion-partido')
    return data ? JSON.parse(data).nombreA : "EquipoA"
  })
  const [nombreB, setNombreB] = useState<string>(() => {
    const data = localStorage.getItem('futbol-configuracion-partido')
    return data ? JSON.parse(data).nombreB : "EquipoB"
  })



  const [eventos, setEventos] = useState<EventoFutbol[]>([]);

  const [scoreA, setScoreA] = useState<number>(() => {
    const data = localStorage.getItem('futbol-datos-partido')
    return data ? JSON.parse(data).scoreA : 0
  });


  const [scoreB, setScoreB] = useState<number>(() => {
    const data = localStorage.getItem('futbol-datos-partido')
    return data ? JSON.parse(data).scoreB : 0
  });

  const [showPenalties, setShowPenalties] = useState(false)

  return (
    <>
      <JugadoresContext.Provider value={{ setEquipoA, setEquipoB, equipoA, equipoB }}>
        <DatosPartidoContext.Provider value={
          {
            duracion,
            amonestaciones,
            montoAmarilla,
            montoRoja,
            penalties,
            prorroga,
            setDuracion,
            setAmonestaciones,
            setMontoAmarilla,
            setMontoRoja,
            setPenalties,
            setProrroga,
            setEventos,
            eventos,
            nombreA,
            setNombreA,
            nombreB,
            setNombreB,
            scoreA,
            setScoreA,
            scoreB,
            setScoreB,
            showPenalties,
            setShowPenalties
          }}>

          {children}
        </DatosPartidoContext.Provider>
      </JugadoresContext.Provider>
    </>
  )
}

export default ContextWrapper
