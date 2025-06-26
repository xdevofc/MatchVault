import type { jugador } from "../../../../types/types";

export function handleGol(
    player :jugador, 
    equipo:jugador[], 
    setEquipo : React.Dispatch<React.SetStateAction<jugador[]>>,
    setScore : React.Dispatch<React.SetStateAction<number>>,
) : void{
    console.log("gol de: ", player)
  // encontramos en donde esta el jugador

    const index = equipo.findIndex(j => j.cedula === player.cedula);
    // creamos una copia para no modificar el estado
    const nuevoEquipo = [...equipo]    

    // modificamos agregamos la tarjeta amarilla

    if (index !== -1){

        nuevoEquipo[index] = {
            ...player,
            goles: (player.goles !== undefined) ? player.goles + 1 : 1 
        }

    }else{
        throw new Error(`No se encontro dicho jugador y se podra hacer el cambio suplente: ${player}`)
    }
    
     // guardamos el nuevo equipo y actualizamos el marcador
    setEquipo(nuevoEquipo);
    setScore(prev => prev +1)

}