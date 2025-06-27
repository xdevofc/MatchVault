import type { Dispatch } from "react";

export interface PropsScoreTracker {
    titulo: string,
    score: number,
    setScore: Dispatch<React.SetStateAction<number>>
    //evento: EventoFutbol
}

