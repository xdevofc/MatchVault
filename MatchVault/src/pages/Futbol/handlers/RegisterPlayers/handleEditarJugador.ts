import type { jugador } from "../../../../types/types";

export function handleEditarJugador(
    cedula:string,
    isEditing:boolean,
    jugadores:jugador[],
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
    setNombreJugador:React.Dispatch<React.SetStateAction<string>>,
    setApellido:React.Dispatch<React.SetStateAction<string>>,
    setNroCamiseta:React.Dispatch<React.SetStateAction<string|number>>,
    setCarrera:React.Dispatch<React.SetStateAction<string>>,
    setCedula:React.Dispatch<React.SetStateAction<string>>,
    setTitular:React.Dispatch<React.SetStateAction<boolean>>,

): void {

    setIsEditing(!isEditing)
    console.log(isEditing)

    // encontrando el jugador
    const jugadorEditando = jugadores.filter(jugador => jugador.cedula == cedula)
    // llenando los campos con los datos del jugador
    setNombreJugador(jugadorEditando[0].nombre);
    setApellido(jugadorEditando[0].apellido);
    setNroCamiseta(jugadorEditando[0].nroCamiseta);
    setCarrera(jugadorEditando[0].carrera);
    setCedula(jugadorEditando[0].cedula);  
    setTitular(jugadorEditando[0].titular);
}