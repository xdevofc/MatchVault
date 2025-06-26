import type { jugador } from "../../../../types/types"

export function guardarJugadoresLS(equipoA : jugador[], equipoB: jugador[]) : void{

    // guardamos en el local storage los equipos 
    localStorage.setItem("Lista-jugadores", JSON.stringify({
        equipoA,
        equipoB
    }))
    console.log("=====> CAMBIOS <=====")
    console.log({equipoA, equipoB})
}
