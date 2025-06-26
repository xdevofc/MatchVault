import type { jugador } from "../../../../types/types";

export function handleRoja(
    player :jugador, 
    equipo:jugador[], 
    setEquipo : React.Dispatch<React.SetStateAction<jugador[]>>,
    montoRoja: number,
) : void{

     // encontramos en donde esta el jugador
    const index = equipo.findIndex(j => j.cedula === player.cedula);

    if (index === -1){
        throw new Error(`No se encontro dicho jugador y se podra sacar roja: ${player}`)
    }

    // nos aseguramos de que la deuda exista o sea un numero
    const jugadorActual = equipo[index]
    const deudaActual = jugadorActual.deuda ?? 0;
    // creamos una copia para no modificar el estado
    const nuevoEquipo = [...equipo]    

    // modificamos agregamos la tarjeta amarilla
    

    nuevoEquipo[index] = {
        ...player,
        isEjected: true,
        deuda: deudaActual + montoRoja,
        titular: false
    }

    
    
     // guardamos el nuevo equipo
    setEquipo(nuevoEquipo); 


}
