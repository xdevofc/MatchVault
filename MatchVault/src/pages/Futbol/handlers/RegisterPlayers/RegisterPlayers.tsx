import type { jugador } from '../../../../types/types';


export function handleAgregarJugador(
    nombreJugador:string,
    apellido:string,
    cedula:string,
    nroCamiseta:string|number,
    carrera:string,
    titular:boolean,
    setMensajeError:React.Dispatch<React.SetStateAction<string>>,
    setNombreJugador:React.Dispatch<React.SetStateAction<string>>,
    setApellido:React.Dispatch<React.SetStateAction<string>>,
    setNroCamiseta:React.Dispatch<React.SetStateAction<string|number>>,
    setCarrera:React.Dispatch<React.SetStateAction<string>>,
    setCedula:React.Dispatch<React.SetStateAction<string>>,
    setTitular:React.Dispatch<React.SetStateAction<boolean>>,
    onSubmit: (jugador: jugador) => void
    ): void {
    // validando que los campos no esten vacios
  if (
    nombreJugador === "" ||
    apellido === "" ||
    cedula === "" ||
    nroCamiseta === "" ||
    carrera === ""
  ){
    setMensajeError("⚠️ No se pueden dejar campos vacíos.");

     // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setMensajeError("");
    }, 1000);

    return;
  }

  // Limpiar error si estaba
  setMensajeError("");

  // Agregar jugador
  onSubmit({
    nombre: nombreJugador,
    apellido,
    cedula,
    nroCamiseta,
    carrera,
    titular 
  });

  // Limpiar campos
  setNombreJugador("");
  setApellido("");
  setNroCamiseta("");
  setCarrera("");
  setCedula("");
  setTitular(true);
}


export function handleEliminarJugador(
    cedula : string, 
    jugadores: jugador[],
    setJugadores: (lista: jugador[]) => void, 
    ) : void{

    const nuevaLista = jugadores.filter( jugador => cedula != jugador.cedula)
    console.log("nueva lista", nuevaLista)
    localStorage.setItem("Lista-jugadores", JSON.stringify(nuevaLista))
    setJugadores(nuevaLista)
    console.log("jugador eliminado con exito")
  }

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

export function handleSuplente(
    titular:boolean,
    setTitular:React.Dispatch<React.SetStateAction<boolean>>,
    ) : void{
    setTitular(!titular)
}