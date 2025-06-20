import type React from "react";
import { useEffect, useState } from "react";
import type { definirEquipos } from '../../types/types';

function RegisterPlayers({ nombreEquipo, onSubmit, jugadores }: definirEquipos): React.JSX.Element {
  const [nombreJugador, setNombreJugador] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [nroCamiseta, setNroCamiseta] = useState<string | number>("");
  const [carrera, setCarrera] = useState("");

  function handleAgregarJugador(): void {
    onSubmit({
      nombre: nombreJugador,
      apellido,
      cedula,
      nroCamiseta,
      carrera
    });

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
          jugadores.map(player => (
            <p key={player.cedula} className="text-sm">
              {player.nombre} {player.apellido} - #{player.nroCamiseta}
            </p>
          ))
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
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={cedula}
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
              onChange={e => setNroCamiseta(parseInt(e.target.value))}
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
            className="bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-2 rounded text-sm"
            onClick={e => {
              e.preventDefault();
              handleAgregarJugador();
            }}
          >
            Agregar Jugador
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPlayers;