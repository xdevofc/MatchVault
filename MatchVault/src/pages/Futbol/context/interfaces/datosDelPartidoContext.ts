import type { Dispatch, SetStateAction } from "react";
import type { EventoFutbol } from "../../../../types/types";

export interface DatosDelPartido {
    duracion: number,
    amonestaciones: boolean,
    montoAmarilla: number,
    montoRoja: number,
    penalties: boolean,
    prorroga: boolean,
    setDuracion: Dispatch<SetStateAction<number>>,
    setAmonestaciones: Dispatch<SetStateAction<boolean>>,
    setMontoAmarilla: Dispatch<SetStateAction<number>>,
    setMontoRoja: Dispatch<SetStateAction<number>>,
    setPenalties: Dispatch<SetStateAction<boolean>>,
    setProrroga: Dispatch<SetStateAction<boolean>>,
    setEventos: Dispatch<SetStateAction<EventoFutbol[]>>,
    eventos: EventoFutbol[],
    nombreA: string,
    setNombreA: Dispatch<SetStateAction<string>>,
    nombreB: string,
    setNombreB: Dispatch<SetStateAction<string>>,
    scoreA: number,
    setScoreA: Dispatch<SetStateAction<number>>,
    scoreB: number,
    setScoreB: Dispatch<SetStateAction<number>>,
    showPenalties: boolean,
    setShowPenalties: Dispatch<SetStateAction<boolean>>,

}
