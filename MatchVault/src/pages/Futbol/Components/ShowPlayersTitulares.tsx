import type {jugador } from "../../../types/types"
import type { PropsShowPlayers } from "../../../interfaces/interfaces"
import { handleTitular } from "../handlers/FutbolExpress/handleTitular"
import { handleAmarilla } from "../handlers/FutbolExpress/handleAmarilla"
import { handleRoja } from "../handlers/FutbolExpress/handleRoja"
import { handleGol } from "../handlers/FutbolExpress/handleGol"


const ShowPlayersTitulares : React.FC<PropsShowPlayers> = ({
    titulo,
    jugadores,
    equipo,
    setEquipo,
    setScore, 
    montoAmarilla,
    montoRoja,
    setEventos,
    minuto,
}) => {
    return (
    <div className="p-4 bg-purple-400 text-white rounded shadow w-[22rem]">
        <h4 className="font-bold mb-3">{titulo}</h4>
            {jugadores
            .filter((player : jugador) => player.titular)
            .map((player: jugador) => (
              <div key={player.cedula} className="mb-4 border-b border-white pb-2">
                <p className="font-medium">#{player.nroCamiseta} - {player.nombre} {player.apellido}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <button onClick={() => handleTitular(player,equipo,setEquipo)}
                    disabled={(player.amarilla !== undefined && player.amarilla >2)  || ((player.roja !== undefined ) && player.roja == 1)}
                    className={`text-black px-2 py-1 rounded text-xs ${player.isEjected || !player.titular ? "bg-yellow-300 opacity-60 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"}`}>{`<->`}</button>
                  <button onClick={() => {
                    handleAmarilla(player,equipo,setEquipo,montoAmarilla)
                    setEventos( prev => [...prev, {minuto, tipo:"amarilla",jugador:`#${player.nroCamiseta}-${player.nombre}`}])
                  }} 
                    // si es que tiene dos amarillas o una roja se desactiva
                    disabled = {(player.amarilla !== undefined && player.amarilla >2)  || ((player.roja !== undefined ) && player.roja == 1) || player.isEjected}
                    // que sea mas opaco cuando este disabled
                    className={`px-2 py-1 rounded text-xs text-black ${player.isEjected? "bg-yellow-200 opacity-60 cursor-not-allowed":"bg-yellow-300 hover:bg-yellow-400"}`}>Amarilla</button>
                  <button onClick={() => {
                    handleRoja(player,equipo,setEquipo,montoRoja)
                    setEventos( prev => [...prev, {minuto, tipo:"roja",jugador:`#${player.nroCamiseta}-${player.nombre}`}])
                  }}
                    disabled={(player.amarilla !== undefined && player.amarilla >2)  || ((player.roja !== undefined ) && player.roja == 1)} 
                    className={`bg-red-500 text-white px-2 py-1 rounded text-xs ${player.isEjected ? "bg-red-300 opacity-60 cursor-not-allowed" : "bg-red-500 hover:bg-red-700"}`}>Roja</button>
                  <button onClick={() => {
                    handleGol(player,equipo,setEquipo,setScore) 
                    setEventos( prev => [...prev, {minuto, tipo:"gol",jugador:`#${player.nroCamiseta}-${player.nombre}`}])
                  }}
                    disabled={(player.amarilla !== undefined && player.amarilla >2)  || ((player.roja !== undefined ) && player.roja == 1)}
                    className={`bg-green-500 text-white px-2 py-1 rounded text-xs ${(player.isEjected|| player.titular == false)? "bg-green-300 opacity-60 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}>Gol</button>
                </div>
              </div>
            ))}
          </div>
    ) 
}

export default ShowPlayersTitulares