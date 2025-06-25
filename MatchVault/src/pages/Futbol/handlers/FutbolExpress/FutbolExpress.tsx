import type { EventoFutbol, jugador } from "../../../../types/types";

export function guardarLS(equipoA : jugador[], equipoB: jugador[]) : void{

    // guardamos en el local storage los equipos 
    localStorage.setItem("Lista-jugadores", JSON.stringify({
        equipoA,
        equipoB
    }))
    console.log("=====> CAMBIOS <=====")
    console.log({equipoA, equipoB})
}


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


export function guardarEventos(eventos:EventoFutbol[]){
    localStorage.setItem('futbol-eventos', JSON.stringify(eventos))
    console.log("Evento guardado")

}



export function FinalizarPartido(){
    console.log("Guardando partido")
    // liberando lo que habia en el local storage 
    localStorage.removeItem('Lista-jugadores')
    localStorage.removeItem('futbol-datos-partido')
    localStorage.removeItem('futbol-eventos')


}