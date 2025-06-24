import type { Dispatch } from "react"
import type { jugador } from "../../../types/types"

interface PropsShowPlayers {
    titulo: string,
    jugadores: jugador[],
    equipo:jugador[],
    setEquipo: Dispatch<React.SetStateAction<jugador[]>>,
    setScore: Dispatch<React.SetStateAction<number>>,
    handleTitular: Function,
    handleAmarilla: Function,
    handleRoja: Function,
    handleGol: Function,
    montoAmarilla:number,
    montoRoja:number,

}





const ShowPlayersSuplentes : React.FC<PropsShowPlayers> = ({
    titulo,
    jugadores,
    equipo,
    setEquipo,
    setScore,
    handleTitular,
    handleAmarilla,
    handleRoja,
    handleGol,
    montoAmarilla,
    montoRoja
}) => {
    return (
     <div className="p-4 bg-purple-100 rounded shadow w-[22rem]">
            <h4 className="font-bold mb-3">{titulo}</h4>
            {jugadores
            .filter((player : jugador) => !player.titular)
            .map((player: jugador) => (
              <div key={player.cedula} className="mb-4 border-b border-white pb-2">
                <p className="font-medium">#{player.nroCamiseta} - {player.nombre} {player.apellido}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <button onClick={() => handleTitular(
                    player,
                    equipo,
                    setEquipo)} 
                    className={`text-black px-2 py-1 rounded text-xs ${player.isEjected  ? "bg-yellow-300 opacity-60 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"}`}
                    disabled={player.isEjected}
                    >{`<->`}</button>
                  <button onClick={() => handleAmarilla(
                    player,
                    equipo,
                    setEquipo, montoAmarilla)} 
                    className={`px-2 py-1 rounded text-xs text-black ${player.isEjected? "bg-yellow-200 opacity-60 cursor-not-allowed":"bg-yellow-300 hover:bg-yellow-400"}`}
                    disabled={player.isEjected}
                    >Amarilla</button>
                  <button onClick={() => handleRoja(
                    player,
                    equipo,
                    setEquipo,montoRoja)} 
                    className={`bg-red-500 text-white px-2 py-1 rounded text-xs ${player.isEjected ? "bg-red-300 opacity-60 cursor-not-allowed" : "bg-red-500 hover:bg-red-800"}`}
                    disabled={player.isEjected}
                    >Roja</button>
                  <button onClick={() => handleGol(
                    player,
                    equipo,
                    setEquipo,
                    setScore,
                  )} 
                    disabled={(player.amarilla !== undefined && player.amarilla >2)  || ((player.roja !== undefined ) && player.roja == 1) || player.titular == false || player.isEjected}
                    className={`bg-green-500 text-white px-2 py-1 rounded text-xs ${(player.isEjected|| player.titular == false)? "bg-green-300 opacity-60 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}>Gol</button>
                </div>
              </div>
            ))}
          </div>
    ) 
}

export default ShowPlayersSuplentes