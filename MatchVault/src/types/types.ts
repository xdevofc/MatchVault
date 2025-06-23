
export type jugador = {
    nombre: string,
    apellido: string,
    cedula: string,
    nroCamiseta: number | string,
    carrera: string,
    titular: boolean,
    goles?: number,
    amarilla?:number,
    roja?:number,
}


// Definimos que props recibe mi componente
export type definirEquipos = {
    nombreEquipo : string,
    onSubmit: (jugador:jugador) => void,
    jugadores: jugador[],
    setJugadores: (lista: jugador[]) => void
}


// definimos el tipo de contexto para los equipos 

export type EquiposContextType = {
    equipoA: jugador[],
    equipoB: jugador[]
}

