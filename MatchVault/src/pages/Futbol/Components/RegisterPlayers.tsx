import type React from "react";
import { useEffect, useState } from "react";
import type { definirEquipos} from '../../../types/types';
import { handleEditarJugador } from "../handlers/RegisterPlayers/handleEditarJugador";
import { handleEliminarJugador } from "../handlers/RegisterPlayers/handleEliminarJugador";
import { handleSuplente } from "../handlers/RegisterPlayers/handleSuplente";
import { handleAgregarJugador } from "../handlers/RegisterPlayers/handleAgregarJugador";
import { handleGuardarEdicion } from "../handlers/RegisterPlayers/handleGuardarEdicion";



function RegisterPlayers({ nombreEquipo, onSubmit, jugadores, setJugadores }: definirEquipos): React.JSX.Element {
  const [nombreJugador, setNombreJugador] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [nroCamiseta, setNroCamiseta] = useState<string | number>("");
  const [carrera, setCarrera] = useState("");
  const [isEditing, setIsEditing] = useState(false)
  const [mensajeError, setMensajeError] = useState("");
  const [titular, setTitular] = useState(true)



  useEffect(() => {
    console.log("imprimiendo jugadores");
    console.log(jugadores);
  }, [jugadores]);

  return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[#121212] rounded-2xl shadow-inner text-[#EAEAEA] w-full max-w-6xl mx-auto">
  {/* Listado */}
  <div className="bg-[#1F1F1F] p-4 rounded-lg shadow border border-[#333]">
    <h2 className="text-lg font-bold mb-2">Titulares</h2>
    {jugadores.length > 0 ? (
      <div className="space-y-2">
        {jugadores.filter(p => p.titular).map(player => (
          <div key={player.cedula} className="flex justify-between items-center bg-[#2A2A2A] rounded p-2">
            <span className="text-sm">#{player.nroCamiseta} - {player.nombre} {player.apellido}</span>
            <div className="flex gap-2 flex-wrap justify-end">
              <button
                className="bg-[#D4AF37] hover:bg-[#BFA434] text-[#121212] text-xs px-2 py-1 rounded"
                onClick={() => handleEditarJugador(player.cedula, isEditing, jugadores, setIsEditing, setNombreJugador, setApellido, setNroCamiseta, setCarrera, setCedula, setTitular)}
              >Editar</button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                onClick={() => handleEliminarJugador(player.cedula, jugadores, setJugadores)}
              >Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-sm">Aún no hay jugadores.</p>
    )}

    <div className="mt-4 bg-[#2A2A2A] p-2 rounded text-center text-sm text-[#D4AF37]">
      Suplentes (pendiente)
      <div className="space-y-2 mt-2">
        {jugadores.filter(p => !p.titular).map(player => (
          <div key={player.cedula} className="flex justify-between items-center bg-[#1F1F1F] rounded p-2">
            <span className="text-sm">#{player.nroCamiseta} - {player.nombre} {player.apellido}</span>
            <div className="flex gap-2 flex-wrap justify-end">
              <button
                className="bg-[#D4AF37] hover:bg-[#BFA434] text-[#121212] text-xs px-2 py-1 rounded"
                onClick={() => handleEditarJugador(player.cedula, isEditing, jugadores, setIsEditing, setNombreJugador, setApellido, setNroCamiseta, setCarrera, setCedula, setTitular)}
              >Editar</button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                onClick={() => handleEliminarJugador(player.cedula, jugadores, setJugadores)}
              >Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Formulario */}
  <div className="bg-[#1F1F1F] p-4 rounded-lg shadow border border-[#333]">
    <h2 className="text-lg font-bold mb-4">{nombreEquipo}</h2>
    <form className="space-y-3">
      <div>
        <label htmlFor="cedula" className="block text-sm font-medium">Cédula</label>
        <input
          name="cedula"
          type="text"
          className={`border border-[#444] rounded px-2 py-1 w-full ${isEditing ? 'bg-[#333] text-[#777] cursor-not-allowed' : 'bg-[#121212] text-[#EAEAEA]'}`}
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
          className="border border-[#444] rounded px-2 py-1 w-full bg-[#121212] text-[#EAEAEA]"
          value={nombreJugador}
          onChange={e => setNombreJugador(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="apellido" className="block text-sm font-medium">Apellido</label>
        <input
          name="apellido"
          type="text"
          className="border border-[#444] rounded px-2 py-1 w-full bg-[#121212] text-[#EAEAEA]"
          value={apellido}
          onChange={e => setApellido(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="numero-camiseta" className="block text-sm font-medium">Número de camiseta</label>
        <input
          name="numero-camiseta"
          type="text"
          className="border border-[#444] rounded px-2 py-1 w-full bg-[#121212] text-[#EAEAEA]"
          value={nroCamiseta}
          onChange={e => {
            const val = parseInt(e.target.value);
            setNroCamiseta(isNaN(val) ? '' : val);
          }}
        />
      </div>

      <div>
        <label htmlFor="carrera" className="block text-sm font-medium">Carrera</label>
        <input
          name="carrera"
          type="text"
          className="border border-[#444] rounded px-2 py-1 w-full bg-[#121212] text-[#EAEAEA]"
          value={carrera}
          onChange={e => setCarrera(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm">Titular</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={titular}
            onChange={() => handleSuplente(titular, setTitular)}
          />
          <div className="w-11 h-6 bg-[#333] rounded-full peer-checked:bg-[#D4AF37]"></div>
          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
        </label>
      </div>

      <button
        className={`w-full transition-colors text-white px-4 py-2 rounded text-sm ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
        onClick={(e) => {
          e.preventDefault();
          if (isEditing) {
            handleGuardarEdicion(jugadores, nombreJugador, apellido, nroCamiseta, carrera, cedula, titular, isEditing, setJugadores, setNombreJugador, setApellido, setNroCamiseta, setCarrera, setCedula, setTitular, setIsEditing);
          } else {
            handleAgregarJugador(nombreJugador, apellido, cedula, nroCamiseta, carrera, titular, setMensajeError, setNombreJugador, setApellido, setNroCamiseta, setCarrera, setCedula, setTitular, onSubmit);
          }
        }}
      >
        {isEditing ? 'Guardar Cambios' : 'Agregar Jugador'}
      </button>

      {mensajeError && <p className="text-red-600 text-sm mb-2">{mensajeError}</p>}
    </form>
  </div>
</div>


  );
}

export default RegisterPlayers;
