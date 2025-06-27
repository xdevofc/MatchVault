import { handleTitular } from "../handlers/FutbolExpress/handleTitular"
import { handleAmarilla } from "../handlers/FutbolExpress/handleAmarilla"
import { handleRoja } from "../handlers/FutbolExpress/handleRoja"
import { handleGol } from "../handlers/FutbolExpress/handleGol"
import { useDatosDelPartidoContext } from "../context/DatosDelPartidoContext"
import type { PropsShowPlayers } from "./interfaces/showPlayers"


const ShowPlayersTitulares: React.FC<PropsShowPlayers> = ({
  titulo,
  jugadores,
  equipo,
  setEquipo,
  setScore,
  setEventos,
  minuto,
}) => {

  const { montoAmarilla, montoRoja } = useDatosDelPartidoContext()

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-4 bg-[#2A2A2A] text-[#EAEAEA] rounded shadow mx-auto">
      <h4 className="font-bold mb-3">{titulo}</h4>
      {jugadores
        .filter(player => player.titular)
        .map(player => (
          <div key={player.cedula} className="mb-4 border-b border-[#444] pb-2">
            <p className="font-medium">#{player.nroCamiseta} - {player.apellido}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => handleTitular(player, equipo, setEquipo)}
                disabled={player.isEjected || !player.titular}
                className={`text-black px-2 py-1 rounded text-xs ${player.isEjected || !player.titular ? "bg-yellow-300 opacity-60 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"}`}
              >{`<->`}</button>

              <button
                onClick={() => {
                  handleAmarilla(player, equipo, setEquipo, montoAmarilla);
                  setEventos(prev => [...prev, { minuto, tipo: "amarilla", jugador: `#${player.nroCamiseta}-${player.nombre}` }]);
                }}
                disabled={player.isEjected || (player.amarilla ?? 0) > 2 || player.roja === 1}
                className={`px-2 py-1 rounded text-xs text-black ${player.isEjected ? "bg-yellow-200 opacity-60 cursor-not-allowed" : "bg-yellow-300 hover:bg-yellow-400"}`}
              >Amarilla</button>

              <button
                onClick={() => {
                  handleRoja(player, equipo, setEquipo, montoRoja);
                  setEventos(prev => [...prev, { minuto, tipo: "roja", jugador: `#${player.nroCamiseta}-${player.nombre}` }]);
                }}
                disabled={player.roja === 1 || (player.amarilla ?? 0) > 2}
                className={`bg-red-500 text-white px-2 py-1 rounded text-xs ${player.isEjected ? "bg-red-300 opacity-60 cursor-not-allowed" : "hover:bg-red-700"}`}
              >Roja</button>

              <button
                onClick={() => {
                  handleGol(player, equipo, setEquipo, setScore);
                  setEventos(prev => [...prev, { minuto, tipo: "gol", jugador: `#${player.nroCamiseta}-${player.nombre}` }]);
                }}
                disabled={player.isEjected || !player.titular || (player.amarilla ?? 0) > 2 || player.roja === 1}
                className={`bg-green-500 text-white px-2 py-1 rounded text-xs ${(player.isEjected || !player.titular) ? "bg-green-300 opacity-60 cursor-not-allowed" : "hover:bg-green-600"}`}
              >Gol</button>
            </div>
          </div>
        ))}
    </div>



  )
}

export default ShowPlayersTitulares
