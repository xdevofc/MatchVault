import { useEffect } from "react"
import { guardarJugadoresLS } from "../handlers/FutbolExpress/guardarJugadoresLS"
import type { guardarCambiosSuplenteProps } from "./interface/useGuardarCambiosSuplente"


export default function useGuardarCambiosSuplente({
    equipoA,
    equipoB
}:guardarCambiosSuplenteProps){

      useEffect(() => {
    guardarJugadoresLS(equipoA, equipoB)
  }, [equipoA, equipoB])



}