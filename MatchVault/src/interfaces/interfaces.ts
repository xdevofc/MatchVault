import type { Dispatch } from "react";
import type { EventoFutbol, HandlerAmarilla, HandlerGol, HandlerRoja, HandlerTitular, jugador } from "../types/types";

export interface PropsScoreTracker {
    titulo: string,
    score: number,
    setScore: Dispatch<React.SetStateAction<number>>
    //evento: EventoFutbol
}


export interface PropsShowPlayers {
    titulo: string,
    jugadores: jugador[],
    equipo:jugador[],
    setEquipo: Dispatch<React.SetStateAction<jugador[]>>,
    setScore: Dispatch<React.SetStateAction<number>>,
    handleTitular: HandlerTitular,
    handleAmarilla: HandlerAmarilla,
    handleRoja: HandlerRoja,
    handleGol: HandlerGol,
    montoAmarilla:number,
    montoRoja:number,
    setEventos:Dispatch<React.SetStateAction<EventoFutbol[]>>
    minuto: number

}


export interface PropsShowPlayers {
    titulo: string,
    jugadores: jugador[],
    equipo:jugador[],
    setEquipo: Dispatch<React.SetStateAction<jugador[]>>,
    setScore: Dispatch<React.SetStateAction<number>>,
    handleTitular: HandlerTitular,
    handleAmarilla: HandlerAmarilla,
    handleRoja: HandlerRoja,
    handleGol: HandlerGol,
    montoAmarilla:number,
    montoRoja:number,
    setEventos:Dispatch<React.SetStateAction<EventoFutbol[]>>
    minuto:number,

}


export interface PropsTimerButtons {
    isPaused: boolean,
    setMinutos: Dispatch<React.SetStateAction<number>>
    setIsPaused: Dispatch<React.SetStateAction<boolean>>
    eventos: EventoFutbol[]
    setSeconds:Dispatch<React.SetStateAction<number>>

}
