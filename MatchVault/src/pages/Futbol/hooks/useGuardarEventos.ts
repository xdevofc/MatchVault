import { useEffect } from 'react';
import { guardarJugadoresLS } from '../handlers/FutbolExpress/guardarJugadoresLS';
import { guardarEventos } from '../handlers/FutbolExpress/guardarPilaEventos';
import type { useGuardarEventosProps } from './interface/useGuardarEventos';


export function useGuardarEventos({
    isFirstRender2,
    eventos,
    setEventos,
    equipoA,
    equipoB
}:useGuardarEventosProps){



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


}