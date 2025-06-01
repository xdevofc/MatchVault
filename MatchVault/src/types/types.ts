
export type jugador = {
    nombre: string,
    apellido: string,
    cedula: string,
    nroCamiseta: number | string,
    carrera: string
}


// Definimos que props recibe mi componente
export type definirEquipos = {
    nombreEquipo : string,
    onSubmit: (jugador:jugador) => void,
    jugadores: jugador[],
}


