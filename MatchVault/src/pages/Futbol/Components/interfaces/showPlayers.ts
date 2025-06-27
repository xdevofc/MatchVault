import type { Dispatch } from "react";
import type { EventoFutbol, jugador } from "../../../../types/types";

export interface PropsShowPlayers {
    titulo: string,
    jugadores: jugador[],
    equipo: jugador[],
    setEquipo: Dispatch<React.SetStateAction<jugador[]>>,
    setScore: Dispatch<React.SetStateAction<number>>,
    setEventos: Dispatch<React.SetStateAction<EventoFutbol[]>>
    minuto: number,

}