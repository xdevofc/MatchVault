import type { jugador } from "../../../../types/types";

export function handleAmarilla(
    player :jugador, 
    equipo:jugador[],  
    setEquipo : React.Dispatch<React.SetStateAction<jugador[]>>,
    multaAmarilla: number,
 ): void {

    // encontramos en donde esta el jugador
    const index = equipo.findIndex(j => j.cedula === player.cedula);
    // creamos una copia para no modificar el estado
    const nuevoEquipo = [...equipo]    

    // modificamos agregamos la tarjeta amarilla

    if (index !== -1){

        // en el caso de que sea la primera amarilla 
        if(player.amarilla === undefined || player.amarilla === 0){
            nuevoEquipo[index] = {
                ...player,
                amarilla: 1,
                deuda: multaAmarilla
            }
        }else if (player.amarilla === 1 && player.deuda !== undefined){
            // en el caso de que sea la segunda amarilla
            nuevoEquipo[index] = {
                ...player,
                isEjected: true,
                titular: false,
                amarilla: 2,
                deuda:  player.deuda + multaAmarilla  
            }
        }

    }else{
        throw new Error(`No se encontro dicho jugador: ${player}`)
    }
    
     // guardamos el nuevo equipo
    setEquipo(nuevoEquipo);

}