import type { EventoFutbol } from "../../../../types/types"

export function guardarEventos(eventos:EventoFutbol[]){
    localStorage.setItem('futbol-eventos', JSON.stringify(eventos))
    console.log("GUARDAR EVENTOS EN FUTBOL EXPRESS HANDLER", eventos)

}