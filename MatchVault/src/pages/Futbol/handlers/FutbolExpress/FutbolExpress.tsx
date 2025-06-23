import type { jugador } from "../../../../types/types";

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
    equipoA:jugador[], 
    equipoB:jugador[], 
    setEquipoA : React.Dispatch<React.SetStateAction<jugador[]>>,
    setEquipoB: React.Dispatch<React.SetStateAction<jugador[]>>,
    ): void{
   
        // identificar de que equipo es 
        const indexA = equipoA.findIndex(j => j.cedula === player.cedula);
        const indexB = equipoB.findIndex(j => j.cedula === player.cedula);
        
        // creando una copia para no modificar directamente el estado
        const jugadoresActualesA = [...equipoA]
        const jugadoresActualesB = [...equipoB]
        
        
    if (indexA !== -1){
        console.log("Estan en el equipoA")
            
        // verificar que no haya sido expulsado
        if (player.isEjected) {
            jugadoresActualesA[indexA] = {
                ...player,
                titular: false
            }
        }else{
            jugadoresActualesA[indexA] = {
            // cambiar sus propiedades
                ...player, 
                titular: !player.titular,  
            }
        }
        
        
    }else if(indexB !== -1){
        console.log("Esta en el quipob")
        // cambiar sus propiedades

         // verificar que no haya sido expulsado
        if (player.isEjected) {
            jugadoresActualesB[indexB] = {
                ...player,
                titular: false
            }
        }else{
             jugadoresActualesB[indexB] = {
                ...player,
                titular: !player.titular, 
            }
        }
      }

      // guardando los nuevos jugadores
    setEquipoA(jugadoresActualesA)      
    setEquipoB(jugadoresActualesB)      


    
}

export function handleAmarilla(
    player :jugador, 
    equipoA:jugador[], 
    equipoB:jugador[], 
    setEquipoA : React.Dispatch<React.SetStateAction<jugador[]>>,
    setEquipoB: React.Dispatch<React.SetStateAction<jugador[]>>,
    multaAmarilla: number,
 ): void {

    const indexA = equipoA.findIndex(j => j.cedula === player.cedula);
    const indexB = equipoB.findIndex(j => j.cedula === player.cedula);

    // creando una copia para no modificar directamente el estado
    const jugadoresActualesA = [...equipoA]
    const jugadoresActualesB = [...equipoB]
    // ===> ESTA EN EL EQUIPO A<===
    if (indexA !== -1){

        // si ya tiene una amarilla entonces se va expulsado y se agrega multa
        if (player.amarilla == 1){
            // se suma multa y se le expulsa 
            jugadoresActualesA[indexA] = {
                ...player,
                amarilla: player.amarilla+1,
                isEjected: true,
                deuda: (player.deuda !== undefined) ? player.deuda + (player.amarilla*multaAmarilla) : multaAmarilla
            }
        }else{
            // en el caso de que sea la primera amonestacion la tarjeta a marilla 
            console.log("Estan en el equipoA")
            jugadoresActualesA[indexA] = {
            // cambiar sus propiedades
                ...player,
                amarilla: (player.amarilla !== undefined) ? multaAmarilla : 1,
                deuda: multaAmarilla 
            }
        }

    // ====> ESTA EN EL EQUIPO B   <====
    }else if(indexB !== -1){
        console.log("Esta en el equipob")
        // cambiar sus propiedades
        if (player.amarilla == 1){
            // se suma multa y se le expulsa 
            jugadoresActualesB[indexB] = {
                ...player,
                amarilla: player.amarilla+1,
                isEjected: true,
                deuda: (player.deuda !== undefined) ? player.deuda + (player.amarilla*multaAmarilla): multaAmarilla
            }
        }else{
            // en el caso de que sea la primera amonestacion la tarjeta a marilla 
            console.log("Estan en el equipoA")
            jugadoresActualesB[indexB] = {
            // cambiar sus propiedades
                ...player,
                amarilla: (player.amarilla ?? 0) + 1,
                deuda: multaAmarilla
            }
        }

      }

      // guardando los nuevos jugadores
    setEquipoA(jugadoresActualesA)      
    setEquipoB(jugadoresActualesB)      


}

export function handleRoja(
    player :jugador, 
    equipoA:jugador[], 
    equipoB:jugador[], 
    setEquipoA : React.Dispatch<React.SetStateAction<jugador[]>>,
    setEquipoB: React.Dispatch<React.SetStateAction<jugador[]>>,
    montoRoja: number,
) : void{
    console.log("Roja a: ",player)
    const indexA = equipoA.findIndex(j => j.cedula === player.cedula);
    const indexB = equipoB.findIndex(j => j.cedula === player.cedula);

    // creando una copia para no modificar directamente el estado
    const jugadoresActualesA = [...equipoA]
    const jugadoresActualesB = [...equipoB]
    if (indexA !== -1){
        console.log("Estan en el equipoA")
        jugadoresActualesA[indexA] = {
        // En el caso de que le saquen tarjeta roja, se le expulsta y se suma a la deuda
            ...player,
            roja: (player.roja ?? 0) + 1,
            deuda:(player.deuda !== undefined) ? player.deuda + montoRoja : montoRoja,
            isEjected: true
            
        }
    }else if(indexB !== -1){
        console.log("Esta en el quipob")
        // cambiar sus propiedades
        jugadoresActualesB[indexB] = {
            ...player,
            roja: (player.roja ?? 0 ) + 1,
            deuda: (player.deuda !== undefined) ? player.deuda + montoRoja : montoRoja, 
            isEjected: true
        }

      }

      // guardando los nuevos jugadores
    setEquipoA(jugadoresActualesA)      
    setEquipoB(jugadoresActualesB)      


}

export function handleGol(
    player :jugador, 
    equipoA:jugador[], 
    equipoB:jugador[], 
    setEquipoA : React.Dispatch<React.SetStateAction<jugador[]>>,
    setEquipoB: React.Dispatch<React.SetStateAction<jugador[]>>,
    setScoreA : React.Dispatch<React.SetStateAction<number>>,
    setScoreB: React.Dispatch<React.SetStateAction<number>>,
    scoreA:number,
    scoreB:number
) : void{
    console.log("gol de: ", player)

    // subir el contador de gol del jugador
    const indexA = equipoA.findIndex(j => j.cedula === player.cedula);
    const indexB = equipoB.findIndex(j => j.cedula === player.cedula);

    // creando una copia para no modificar directamente el estado
    const jugadoresActualesA = [...equipoA]
    const jugadoresActualesB = [...equipoB]
    if (indexA !== -1){
        console.log("Estan en el equipoA")
        //subir el contador del gol del tablero

        setScoreA(scoreA + 1);

        jugadoresActualesA[indexA] = {
        // cambiar sus propiedades
            ...player,
            goles: (player.goles ?? 0) + 1
            
        }
    }else if(indexB !== -1){
        console.log("Esta en el quipob")
        // subir el contador del tablero 

        setScoreB(scoreB + 1)
        // cambiar sus propiedades
        jugadoresActualesB[indexB] = {
            ...player,
            goles: (player.goles ?? 0 ) + 1, 
        }

      }

      // guardando los nuevos jugadores
    setEquipoA(jugadoresActualesA)      
    setEquipoB(jugadoresActualesB)      


}
