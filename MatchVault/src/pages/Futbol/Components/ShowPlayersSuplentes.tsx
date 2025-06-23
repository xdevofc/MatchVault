import type { Dispatch } from "react"
import type { jugador } from "../../../types/types"

interface PropsShowPlayers {
    titulo: string,
    jugadores: jugador[],
    equipoA:jugador[],
    equipoB:jugador[],
    scoreA:number,
    scoreB:number,
    setEquipoA: Dispatch<React.SetStateAction<jugador[]>>,
    setEquipoB: Dispatch<React.SetStateAction<jugador[]>>,
    setScoreA: Dispatch<React.SetStateAction<number>>,
    setScoreB: Dispatch<React.SetStateAction<number>>,
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
    equipoA,
    equipoB,
    scoreA,
    scoreB,
    setEquipoA,
    setEquipoB,
    setScoreA,
    setScoreB,
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
                    equipoA,
                    equipoB,
                    setEquipoA,
                    setEquipoB)} className="bg-yellow-500 text-black px-2 py-1 rounded text-xs">{`<->`}</button>
                  <button onClick={() => handleAmarilla(
                    player,
                    equipoA,
                    equipoB,
                    setEquipoA,
                    setEquipoB, montoAmarilla)} className="bg-yellow-300 text-black px-2 py-1 rounded text-xs">Amarilla</button>
                  <button onClick={() => handleRoja(
                    player,
                    equipoA,
                    equipoB,
                    setEquipoA,
                    setEquipoB,montoRoja)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Roja</button>
                  <button onClick={() => handleGol(
                    player,
                    equipoA,
                    equipoB,
                    setEquipoA,
                    setEquipoB,
                    setScoreA,
                    setScoreB,
                    scoreA,
                    scoreB)} 
                    disabled={(player.amarilla !== undefined && player.amarilla >2)  || ((player.roja !== undefined ) && player.roja == 1) || player.titular == false}
                    className={`bg-green-500 text-white px-2 py-1 rounded text-xs ${(player.isEjected|| player.titular == false)? "bg-green-300 opacity-60 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}>Gol</button>
                </div>
              </div>
            ))}
          </div>
    ) 
}

export default ShowPlayersSuplentes