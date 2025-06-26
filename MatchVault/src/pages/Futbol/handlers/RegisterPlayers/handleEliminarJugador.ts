import type { jugador } from "../../../../types/types"

export function handleEliminarJugador(
    cedula : string, 
    jugadores: jugador[],
    setJugadores: (lista: jugador[]) => void, 
    ) : void{

    const nuevaLista = jugadores.filter( jugador => cedula != jugador.cedula)
    console.log("nueva lista", nuevaLista)
    localStorage.setItem("Lista-jugadores", JSON.stringify(nuevaLista))
    setJugadores(nuevaLista)
    console.log("jugador eliminado con exito")
  }