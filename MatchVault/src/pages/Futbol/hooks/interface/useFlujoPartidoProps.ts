import type { Dispatch, SetStateAction } from "react";

export interface useFlujoPartidoProps {

    isPaused: boolean,
    tableroSegundos: number,
    tableroMinutos: number,
    setTableroSegundos: Dispatch<SetStateAction<number>>,
    setTableroMinutos: Dispatch<SetStateAction<number>>,
    setIsPaused: Dispatch<SetStateAction<boolean>>,
    setShowExtraTime: Dispatch<SetStateAction<boolean>>,
    prorroga: boolean,
    setProrroga: Dispatch<SetStateAction<boolean>>,
    isTie: boolean,
    penalties: boolean,
    setShowPenalties: Dispatch<SetStateAction<boolean>>,
    afterExtraTime: boolean,
    setAfterExtraTime: Dispatch<SetStateAction<boolean>>,
}