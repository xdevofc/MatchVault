import type { jugador } from "../../../../types/types";

export function handleTitular( 
    player :jugador, 
    equipo:jugador[], 
    setEquipo : React.Dispatch<React.SetStateAction<jugador[]>>,
    ): void{
   
      // encontramos en donde esta el jugador
    const index = equipo.findIndex(j => j.cedula === player.cedula);
    // creamos una copia para no modificar el estado
    const nuevoEquipo = [...equipo]    

    // modificamos agregamos la tarjeta amarilla

    if (index !== -1){
        nuevoEquipo[index] = {
            ...player,
            titular: !player.titular
        }

    }else{
        throw new Error(`No se encontro dicho jugador y se podra hacer el cambio suplente: ${player}`)
    } 
     // guardamos el nuevo equipo
    setEquipo(nuevoEquipo);

    
}