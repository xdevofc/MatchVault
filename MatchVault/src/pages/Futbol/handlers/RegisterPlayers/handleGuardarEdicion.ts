import type { jugador } from "../../../../types/types";

export function handleGuardarEdicion(
        jugadores: jugador[],
        nombreJugador: string,
        apellido: string,
        nroCamiseta: string|number,
        carrera:string,
        cedula:string,
        titular:boolean,
        isEditing:boolean,
        setJugadores: (lista: jugador[]) => void,
        setNombreJugador:React.Dispatch<React.SetStateAction<string>>,
        setApellido:React.Dispatch<React.SetStateAction<string>>,
        setNroCamiseta:React.Dispatch<React.SetStateAction<string|number>>,
        setCarrera:React.Dispatch<React.SetStateAction<string>>,
        setCedula:React.Dispatch<React.SetStateAction<string>>,
        setTitular:React.Dispatch<React.SetStateAction<boolean>>,
        setIsEditing:React.Dispatch<React.SetStateAction<boolean>>,
        ): void{
    console.log("Guardando edicion")

    const jugadoresActuales = [...jugadores]; // Estado actual
    const index = jugadoresActuales.findIndex(j => j.cedula === cedula);

    if (index !== -1) {
        // Reemplaza el jugador con los nuevos datos
        jugadoresActuales[index] = {
        nombre: nombreJugador,
        apellido,
        nroCamiseta,
        carrera,
        cedula,
        titular
    };

    setJugadores(jugadoresActuales); // Actualiza el estado
        localStorage.setItem("Lista-jugadores", JSON.stringify(jugadoresActuales)); // Guarda en localStorage
    } else {
        console.warn("No se encontró el jugador a editar");
    }
    // salir del modo edicion
    setIsEditing(!isEditing)
    // limpiando los campos
    setNombreJugador("");
    setApellido("");
    setNroCamiseta("");
    setCarrera("");
    setCedula(""); 
    setTitular(true);
}
