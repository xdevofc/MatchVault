import type React from "react";
import { useEffect, useState } from "react";
import type { definirEquipos } from '../../types/types';

function RegisterPlayers({ nombreEquipo, onSubmit, jugadores, setJugadores }: definirEquipos): React.JSX.Element {
  const [nombreJugador, setNombreJugador] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [nroCamiseta, setNroCamiseta] = useState<string | number>("");
  const [carrera, setCarrera] = useState("");
  const [isEditing, setIsEditing] = useState(false)
  const [mensajeError, setMensajeError] = useState("");




function handleAgregarJugador(): void {
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
    carrera
  });

  // Limpiar campos
  setNombreJugador("");
  setApellido("");
  setNroCamiseta("");
  setCarrera("");
  setCedula("");
}


  function handleEliminarJugador(cedula : string) : void{

    const nuevaLista = jugadores.filter( jugador => cedula != jugador.cedula)
    console.log("nueva lista", nuevaLista)
    localStorage.setItem("Lista-jugadores", JSON.stringify(nuevaLista))
    setJugadores(nuevaLista)
    console.log("jugador eliminado con exito")
  }

  function handleEditarJugador(cedula:string): void {

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
}

function handleGuardarEdicion(): void{
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
        cedula
    };

    setJugadores(jugadoresActuales); // Actualiza el estado
        localStorage.setItem("jugadores", JSON.stringify(jugadoresActuales)); // Guarda en localStorage
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
}

  useEffect(() => {
    console.log("imprimiendo jugadores");
    console.log(jugadores);
  }, [jugadores]);

  return (
    <div className="grid grid-cols-2 gap-6 p-4 bg-purple-50 rounded-2xl shadow-inner">
      {/* Listado */}
      <div className="bg-white p-4 rounded-lg shadow border border-purple-300">
        <h2 className="text-lg font-bold mb-2">Titulares</h2>
        {jugadores.length > 0 ? (
          <div className="space-y-2">
            {jugadores.map(player => (
              <div
                key={player.cedula}
                className="flex justify-between items-center bg-purple-50 rounded p-2"
              >
                <span className="text-sm">
                  #{player.nroCamiseta} - {player.nombre} {player.apellido}
                </span>
                <div className="flex gap-2">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs px-2 py-1 rounded"
                  onClick={() => handleEditarJugador(player.cedula)}>
                    Editar
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                    onClick={() => handleEliminarJugador(player.cedula)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Aún no hay jugadores.</p>
        )}
        <div className="mt-4 bg-purple-100 p-2 rounded text-center text-sm text-purple-700">
          Suplentes (pendiente)
        </div>
      </div>

      {/* Formulario */}
      <div className="bg-white p-4 rounded-lg shadow border border-purple-300">
        <h2 className="text-lg font-bold mb-4">{nombreEquipo}</h2>
        <form className="space-y-3">
          <div>
            <label htmlFor="cedula" className="block text-sm font-medium">Cédula</label>
            <input
              name="cedula"
              type="text"
              // Si estas en modo edicion, no se puede modificar la cedula
              className={`border border-gray-300 rounded px-2 py-1 w-full ${isEditing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-black'} ` }
              value={cedula}
              disabled={isEditing}
              onChange={e => setCedula(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="nombre" className="block text-sm font-medium">Nombre</label>
            <input
              name="nombre"
              type="text"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={nombreJugador}
              onChange={e => setNombreJugador(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="apellido" className="block text-sm font-medium">Apellido</label>
            <input
              name="apellido"
              type="text"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={apellido}
              onChange={e => setApellido(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="numero-camiseta" className="block text-sm font-medium">Número de camiseta</label>
            <input
              name="numero-camiseta"
              type="text"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={nroCamiseta}
              onChange={e => {
                const val = parseInt(e.target.value);
                setNroCamiseta(isNaN(val) ? "" : val);
              }}
            />
          </div>

          <div>
            <label htmlFor="carrera" className="block text-sm font-medium">Carrera</label>
            <input
              name="carrera"
              type="text"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={carrera}
              onChange={e => setCarrera(e.target.value)}
            />
          </div>

            <button
                className={`w-full transition-colors text-white px-4 py-2 rounded text-sm 
                    ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}
                `}
               onClick={(e) => {
                    e.preventDefault();
                    if (isEditing) {
                        handleGuardarEdicion();
                    } else {
                        handleAgregarJugador();
                    }
                }}>
                {isEditing ? 'Guardar Cambios' : 'Agregar Jugador'}
            </button>

            {mensajeError && (
                <p className="text-red-600 text-sm mb-2">{mensajeError}</p>
            )}
    
        </form>
      </div>
    </div>
  );
}

export default RegisterPlayers;
